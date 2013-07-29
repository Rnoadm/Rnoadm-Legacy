package main

import (
	"log"
	"math/rand"
	"sort"
	"strings"
	"unicode"
)

var AdminLog *log.Logger

var adminCommands = map[string]func(*Player){
	"TP": func(p *Player) {
		p.hud = &AdminTeleportHUD{Player: p}
	},
	"CHANGE EXAMINE": func(p *Player) {
		p.hud = &AdminChangeExamineHUD{Player: p, Input: []rune(p.Examine())}
	},
	"CHANGE SKIN COLOR": func(p *Player) {
		p.lock.Lock()
		p.hud = &AdminChangeColorHUD{Player: p, Input: []rune(string(p.BaseColor))}
		p.lock.Unlock()
	},
	"DELETE THE ENTIRE ZONE": func(p *Player) {
		p.lock.Lock()
		z := p.zone
		p.lock.Unlock()

		z.Lock()
		for i := range z.Tiles {
			t := &z.Tiles[i]
			for j := 0; j < len(t.Objects); j++ {
				if _, ok := t.Objects[j].(*Player); !ok {
					t.Objects = append(t.Objects[:j], t.Objects[j+1:]...)
					j--
				}
			}
			if len(t.Objects) == 0 {
				t.Objects = nil
			}
		}
		z.Unlock()
		z.Save()
		z.Repaint()
	},
	"REGENERATE THE ENTIRE ZONE": func(p *Player) {
		p.lock.Lock()
		z := p.zone
		p.lock.Unlock()

		z.Lock()
		for i := range z.Tiles {
			t := &z.Tiles[i]
			for j := 0; j < len(t.Objects); j++ {
				if _, ok := t.Objects[j].(*Player); !ok {
					t.Objects = append(t.Objects[:j], t.Objects[j+1:]...)
					j--
				}
			}
			if len(t.Objects) == 0 {
				t.Objects = nil
			}
		}
		z.Unlock()
		z.Generate()
		z.Save()
		z.Repaint()
	},
}

func init() {
	for t := range rockTypeInfo {
		rt := RockType(t)
		adminCommands["SPAWN "+strings.ToUpper(rockTypeInfo[rt].Name)+" ROCK"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&Rock{Type: rt})
			p.lock.Unlock()
		}
		adminCommands["SPAWN "+strings.ToUpper(rockTypeInfo[rt].Name)+" STONE"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&Stone{Type: rt})
			p.lock.Unlock()
		}
		adminCommands["SPAWN "+strings.ToUpper(rockTypeInfo[rt].Name)+" WALL"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&WallStone{Type: rt})
			p.lock.Unlock()
		}
		for m := range metalTypeInfo {
			if m == 0 {
				continue
			}
			mt := MetalType(m)
			adminCommands["SPAWN "+strings.ToUpper(rockTypeInfo[rt].Name)+" ROCK WITH "+strings.ToUpper(metalTypeInfo[mt].Name)+" ORE"] = func(p *Player) {
				p.lock.Lock()
				p.GiveItem(&Rock{Type: rt, Ore: mt})
				p.lock.Unlock()
			}
		}
	}
	for t := range metalTypeInfo {
		if t == 0 {
			continue
		}
		mt := MetalType(t)
		adminCommands["SPAWN "+strings.ToUpper(metalTypeInfo[mt].Name)+" ORE"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&Ore{Type: mt})
			p.lock.Unlock()
		}
		adminCommands["SPAWN "+strings.ToUpper(metalTypeInfo[mt].Name)+" WALL"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&WallMetal{Type: mt})
			p.lock.Unlock()
		}
	}
	for t := range woodTypeInfo {
		wt := WoodType(t)
		adminCommands["SPAWN "+strings.ToUpper(woodTypeInfo[wt].Name)+" TREE"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&Tree{Type: wt})
			p.lock.Unlock()
		}
		adminCommands["SPAWN "+strings.ToUpper(woodTypeInfo[wt].Name)+" LOGS"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&Logs{Type: wt})
			p.lock.Unlock()
		}
		adminCommands["SPAWN "+strings.ToUpper(woodTypeInfo[wt].Name)+" WALL"] = func(p *Player) {
			p.lock.Lock()
			p.GiveItem(&WallWood{Type: wt})
			p.lock.Unlock()
		}
	}
	adminCommands["SPAWN PLANT"] = func(p *Player) {
		p.lock.Lock()
		p.GiveItem(&Flora{Type: 0})
		p.lock.Unlock()
	}
	adminCommands["SPAWN HERO"] = func(p *Player) {
		p.lock.Lock()
		p.GiveItem(&Hero{Name_: GenerateName(rand.New(rand.NewSource(rand.Int63())), NameHero)})
		p.lock.Unlock()
	}
}

type AdminHUD struct {
	Player *Player
	Input  []rune
}

func (h *AdminHUD) Paint(setcell func(int, int, string, string, Color)) {
	if !h.Player.Admin {
		h.Player.hud = nil
		return
	}

	setcell(0, 0, ">", "", "#00f")
	setcell(2, 0, string(h.Input), "", "#00f")
}

func (h *AdminHUD) Key(code int, special bool) bool {
	if !h.Player.Admin {
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	if !special {
		if code != 0 && code != '`' {
			h.Input = append(h.Input, unicode.ToUpper(rune(code)))
			h.Player.Repaint()
		}
		return true
	}
	switch code {
	case 37, 38, 39, 40: // arrow keys
		return false
	case 9, 16, 17, 18: // tab shift ctrl alt
		return false
	case 8: // backspace
		if len(h.Input) > 0 {
			h.Input = h.Input[:len(h.Input)-1]
			h.Player.Repaint()
		}
		return true
	case 13: // enter
		if f, ok := adminCommands[string(h.Input)]; ok {
			h.Player.lock.Lock()
			AdminLog.Printf("COMMAND:%q [%d:%q] (%d:%d, %d:%d)", string(h.Input), h.Player.ID, h.Player.Name(), h.Player.ZoneX, h.Player.TileX, h.Player.ZoneY, h.Player.TileY)
			h.Player.lock.Unlock()

			h.Player.hud = nil
			f(h.Player)
			h.Player.Repaint()
		}
		return true
	case 27: // esc
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	return true
}

type PlayerList []*Player

func (l PlayerList) Len() int {
	return len(l)
}
func (l PlayerList) Swap(i, j int) {
	l[i], l[j] = l[j], l[i]
}
func (l PlayerList) Less(i, j int) bool {
	return l[i].ID < l[j].ID
}

type AdminTeleportHUD struct {
	Player *Player
	List   PlayerList
	Offset int
}

func (h *AdminTeleportHUD) Paint(setcell func(int, int, string, string, Color)) {
	if !h.Player.Admin {
		h.Player.hud = nil
		h.Player.Repaint()
		return
	}
	if h.List == nil {
		onlinePlayersLock.Lock()
		for _, p := range OnlinePlayers {
			h.List = append(h.List, p)
		}
		onlinePlayersLock.Unlock()
		sort.Sort(h.List)
	}
	setcell(0, 0, "TELEPORT TO PLAYER", "", "#fff")
	for i, p := range h.List[h.Offset:] {
		if i == 8 {
			break
		}
		setcell(0, i+1, string(rune(i)+'1'), "", "#fff")
		id := p.ID
		for k := 0; k < 16; k++ {
			setcell(17-k, i+1, string(rune("0123456789ABCDEF"[id&15])), "", "#44f")
			id >>= 4
		}
		p.lock.Lock()
		setcell(19, i+1, p.Name(), "", "#00f")
		p.lock.Unlock()
	}
	if h.Offset > 0 {
		setcell(0, 9, "9", "", "#fff")
		setcell(2, 9, "previous", "", "#fff")
	}
	if len(h.List) > h.Offset+8 {
		setcell(0, 10, "0", "", "#fff")
		setcell(2, 10, "next", "", "#fff")
	}
}

func (h *AdminTeleportHUD) Key(code int, special bool) bool {
	if !h.Player.Admin {
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	if !special {
		return false
	}
	switch code {
	case '1', '2', '3', '4', '5', '6', '7', '8':
		i := code - '1' + h.Offset
		if i < len(h.List) {
			p := h.List[i]
			p.lock.Lock()
			zx, zy := p.ZoneX, p.ZoneY
			tx, ty := p.TileX, p.TileY
			name := p.Name()
			p.lock.Unlock()

			h.Player.lock.Lock()
			az := h.Player.zone
			azx, azy := h.Player.ZoneX, h.Player.ZoneY
			atx, aty := h.Player.TileX, h.Player.TileY
			aname := h.Player.Name()
			h.Player.lock.Unlock()

			AdminLog.Printf("TELEPORT [%d:%q] (%d:%d, %d:%d) => [%d:%q] (%d:%d, %d:%d)", h.Player.ID, aname, azx, atx, azy, aty, p.ID, name, zx, tx, zy, ty)

			az.Lock()
			az.Tile(atx, aty).Remove(h.Player)
			az.Repaint()
			az.Unlock()

			ReleaseZone(az)
			z := GrabZone(zx, zy)

			h.Player.lock.Lock()
			h.Player.zone = z
			h.Player.ZoneX, h.Player.ZoneY = zx, zy
			h.Player.TileX, h.Player.TileY = tx, ty
			h.Player.lock.Unlock()
			h.Player.Save()

			z.Lock()
			z.Tile(tx, ty).Add(h.Player)
			z.Repaint()
			z.Unlock()

			h.Player.hud = nil
			h.Player.Repaint()
		}
		return true
	case '9':
		if h.Offset > 0 {
			h.Offset--
			h.Player.Repaint()
		}
		return true
	case '0':
		if h.Offset+8 < len(h.List) {
			h.Offset++
			h.Player.Repaint()
		}
		return true

	case 27: // esc
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	return false
}

type AdminChangeExamineHUD struct {
	Player *Player
	Input  []rune
}

func (h *AdminChangeExamineHUD) Paint(setcell func(int, int, string, string, Color)) {
	if !h.Player.Admin {
		h.Player.hud = nil
		return
	}

	h.Player.lock.Lock()
	setcell(0, 0, strings.ToUpper(h.Player.Name()), "", "#fff")
	h.Player.lock.Unlock()

	setcell(0, 1, ">", "", "#00f")
	setcell(2, 1, string(h.Input), "", "#00f")
}

func (h *AdminChangeExamineHUD) Key(code int, special bool) bool {
	if !h.Player.Admin {
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	if !special {
		if code != 0 {
			h.Input = append(h.Input, rune(code))
			h.Player.Repaint()
		}
		return true
	}
	switch code {
	case 37, 38, 39, 40: // arrow keys
		return false
	case 9, 16, 17, 18: // tab shift ctrl alt
		return false
	case 8: // backspace
		if len(h.Input) > 0 {
			h.Input = h.Input[:len(h.Input)-1]
			h.Player.Repaint()
		}
		return true
	case 13: // enter
		h.Player.lock.Lock()
		AdminLog.Printf("CHANGEEXAMINE:%q [%d:%q] (%d:%d, %d:%d)", string(h.Input), h.Player.ID, h.Player.Name(), h.Player.ZoneX, h.Player.TileX, h.Player.ZoneY, h.Player.TileY)
		h.Player.Examine_ = string(h.Input)
		h.Player.lock.Unlock()

		h.Player.hud = nil
		h.Player.Repaint()
		return true
	case 27: // esc
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	return true
}

type AdminChangeColorHUD struct {
	Player *Player
	Input  []rune
}

func (h *AdminChangeColorHUD) Paint(setcell func(int, int, string, string, Color)) {
	if !h.Player.Admin {
		h.Player.hud = nil
		return
	}

	h.Player.lock.Lock()
	setcell(0, 0, "SKIN COLOR", "", "#fff")
	h.Player.lock.Unlock()

	setcell(0, 1, ">", "", "#00f")
	setcell(2, 1, string(h.Input), "", "#fff")
}

func (h *AdminChangeColorHUD) Key(code int, special bool) bool {
	if !h.Player.Admin {
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	if !special {
		if code != 0 {
			h.Input = append(h.Input, rune(code))
			h.Player.Repaint()
		}
		return true
	}
	switch code {
	case 37, 38, 39, 40: // arrow keys
		return false
	case 9, 16, 17, 18: // tab shift ctrl alt
		return false
	case 8: // backspace
		if len(h.Input) > 0 {
			h.Input = h.Input[:len(h.Input)-1]
			h.Player.Repaint()
		}
		return true
	case 13: // enter
		h.Player.lock.Lock()
		h.Player.BaseColor = Color(h.Input)
		h.Player.lock.Unlock()

		h.Player.hud = nil
		h.Player.Repaint()
		return true
	case 27: // esc
		h.Player.hud = nil
		h.Player.Repaint()
		return true
	}
	return true
}
