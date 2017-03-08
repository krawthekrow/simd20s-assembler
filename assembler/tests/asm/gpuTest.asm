alias tt_AND 0b0001
alias tt_OR 0b0111
alias tt_XOR 0b0110
alias tt_XNOT 0b1001
alias tt_FIRST 0b0011
alias tt_SECOND 0b0101
alias tt_NOTFIRST 0b1100
alias tt_NOTSECOND 0b1010
alias tt_NOTFIRSTANDSECOND 0b0100

alias col_WHITE 0x0
alias col_ORANGE 0x1
alias col_MAGENTA 0x2
alias col_LIGHTBLUE 0x3
alias col_YELLOW 0x4
alias col_LIME 0x5
alias col_PINK 0x6
alias col_GRAY 0x7
alias col_LIGHTGRAY 0x8
alias col_CYAN 0x9
alias col_PURPLE 0xA
alias col_BLUE 0xB
alias col_BROWN 0xC
alias col_GREEN 0xD
alias col_RED 0xE
alias col_BLACK 0xF

gpu fill g0
gpu mov g0 g0[l]
screen _ col_RED flush
