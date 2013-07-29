package main

type WallStone struct {
	Type RockType
}

func (w *WallStone) Name() string {
	return rockTypeInfo[w.Type].Name + " wall"
}

func (w *WallStone) Examine() string {
	return "a wall made of " + rockTypeInfo[w.Type].Name + "."
}

func (w *WallStone) Paint() (rune, Color) {
	return '\u2588', rockTypeInfo[w.Type].Color
}

func (w *WallStone) Blocking() bool {
	return true
}

func (w *WallStone) InteractOptions() []string {
	return nil
}

type WallMetal struct {
	Type MetalType
}

func (w *WallMetal) Name() string {
	return metalTypeInfo[w.Type].Name + " wall"
}

func (w *WallMetal) Examine() string {
	return "a wall made of " + metalTypeInfo[w.Type].Name + "."
}

func (w *WallMetal) Paint() (rune, Color) {
	return '\u2588', metalTypeInfo[w.Type].Color
}

func (w *WallMetal) Blocking() bool {
	return true
}

func (w *WallMetal) InteractOptions() []string {
	return nil
}

type WallWood struct {
	Type WoodType
}

func (w *WallWood) Name() string {
	return woodTypeInfo[w.Type].Name + " wall"
}

func (w *WallWood) Examine() string {
	return "a wall made of " + woodTypeInfo[w.Type].Name + "."
}

func (w *WallWood) Paint() (rune, Color) {
	return '\u2588', woodTypeInfo[w.Type].Color
}

func (w *WallWood) Blocking() bool {
	return true
}

func (w *WallWood) InteractOptions() []string {
	return nil
}
