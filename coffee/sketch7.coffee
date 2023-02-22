import _ from 'https://cdn.skypack.dev/lodash'
import {N,col,row,log,svg,Position,range,rect,text,signal,effect,r4r,div,g} from '/js/utils.js'

QUEEN = '♛'
KNIGHT = '♘'

S = 40 # square size
queens = []

[toggle,setToggle] = signal Array(N*N).fill false
[state,setState] = signal 0
[queen,setQueen] = signal 50
[knight,setKnight] = signal 23
[queens,setQueens] = signal []

makeQueens = => # anger de rutor som damen kan placeras på
	cx = 7 # board center x
	cy = 7 # board center y
	res = []
	for r in range N
		for c in range N
			dx = Math.abs 2*c - cx
			dy = Math.abs 2*r - cy
			if dx*dy not in [3,7,9,15] then res.push c+8*r
	res.sort (a,b) -> a-b
	res
setQueens makeQueens()

click = (index) ->
	setState 1 -state()
	log 'click',state()
	# arr = _.clone toggle() # OBS utan clone så uppfattas det inte som någon uppdatering
	# _.set arr,index, not arr[index] # _.set föreslogs av CoPilot!
	# setToggle arr

makeRects = =>
	for i in range N*N
		do (i) =>
			r = row i
			c = col i
			x = S + S*c
			y = S + S*r
			width = S
			height = S
			fill = ['brown','black'][(r+c) % 2]
			rect {x, y, width, height, fill, onClick: => click i}

makePieces = (pieces,PIECE) =>
	for piece in pieces
		r = row piece
		c = col piece
		x = S*(1.5+c)
		y = S*(1.85+r)
		text {x, y, "text-anchor":"middle", "font-size":S, fill:"white", onClick: => click piece}, PIECE

r4r => # Har ej förstått varför TVÅ loopar behövs.
	svg {viewBox:"0 0 400 400", width:320, height:320},
		makeRects()
		=> if state() == 0 then makePieces queens(),QUEEN
		=> if state() == 1 then makePieces [queen()],QUEEN
		=> if state() == 1 then makePieces [knight()],KNIGHT
