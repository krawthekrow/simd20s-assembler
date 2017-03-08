alias temp g15
alias ip c15
alias xp c14

// Reset screen
macro reset_screen()
{
	gmv temp 0
	screen 0
	screen 1
	screen 2
}
reset_screen

//Test screen
gmv g0 0xFFFF
screen 0

gmv g1 0x5555
screen 1

gmv g2 0x1111
screen 2

reset_screen

//Test writeback mask
gmv g0 0
wb pc gmv g0 0xFFFF
screen 0

mv c0 0x5555
gmv g0 0
wb c0 gmv g0 0xFFFF
screen 1

reset_screen
