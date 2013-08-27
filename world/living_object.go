package world

import (
	"fmt"
	"sync"
)

type Living interface {
	Visible

	HasSchedule() bool
	SetSchedule(Schedule)
	ClearSchedule()
}

type LivingObject struct {
	VisibleObject

	delay    uint
	schedule Schedule

	mtx sync.Mutex
}

func init() {
	Register("livingobj", Living((*LivingObject)(nil)))
}

func (o *LivingObject) Save() (uint, interface{}, []ObjectLike) {
	schedule := o.schedule
	if schedule == nil || !schedule.ShouldSave() {
		schedule = &cancelSchedule{}
	}
	return 0, map[string]interface{}{
		"d": o.delay,
	}, []ObjectLike{&o.VisibleObject, schedule}
}

func (o *LivingObject) Load(version uint, data interface{}, attached []ObjectLike) {
	switch version {
	case 0:
		dataMap := data.(map[string]interface{})
		o.VisibleObject = *attached[0].(*VisibleObject)
		o.delay = dataMap["d"].(uint)
		o.schedule = attached[1].(Schedule)
	default:
		panic(fmt.Sprintf("version %d unknown", version))
	}
}

func (o *LivingObject) HasSchedule() bool {
	o.mtx.Lock()
	defer o.mtx.Unlock()

	return o.schedule != nil
}

func (o *LivingObject) SetSchedule(s Schedule) {
	o.mtx.Lock()
	defer o.mtx.Unlock()

	o.schedule = s
}

func (o *LivingObject) ClearSchedule() {
	o.mtx.Lock()
	defer o.mtx.Unlock()

	o.schedule = nil
}

func (o *LivingObject) Think() {
	o.VisibleObject.Think()

	if o.delay > 0 {
		o.delay--
		return
	}

	o.mtx.Lock()
	sched := o.schedule
	o.mtx.Unlock()

	if sched == nil {
		return
	}

	var ok bool
	o.delay, ok = sched.Act(o.Outer().(Living))
	if !ok {
		o.ClearSchedule()
	}
}

func (o *LivingObject) Actions(player CombatInventoryMessageAdminHUD) []string {
	if player == o.Outer() {
		return o.VisibleObject.Actions(player)
	}
	return append([]string{"follow"}, o.VisibleObject.Actions(player)...)
}

func (o *LivingObject) Interact(player CombatInventoryMessageAdminHUD, action string) {
	switch action {
	default:
		o.VisibleObject.Interact(player, action)

	case "follow":
		pos := o.Position()
		if pos == nil {
			return
		}
		x, y := pos.Position()
		player.SetSchedule(&ScheduleSchedule{
			Schedules: []Schedule{
				NewWalkSchedule(x, y, true, 0),
				&DelaySchedule{Delay: 1},
				&ActionSchedule{Target: o.Outer().(Living), Action: action},
			},
		})
	}
}
