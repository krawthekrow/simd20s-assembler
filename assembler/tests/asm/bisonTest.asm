alias tt_AND 0b0001
alias tt_OR 0b0111
alias tt_XOR 0b0110
alias tt_XNOT 0b1001
macro test(x){
	gpu g1 x g1 tt_XOR
}
alias y g2
test(y[u])

