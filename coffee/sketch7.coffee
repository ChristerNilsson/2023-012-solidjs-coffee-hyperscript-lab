import _ from 'https://cdn.skypack.dev/lodash'
import {abs,N,col,row,log,svg,Position,range,rect,text,signal,effect,r4r,div,g} from '/js/utils.js'

QUEEN = '♛'
KNIGHT = '♘'
S = 40 # square size

[state,setState] = signal -1
[queens,setQueens] = signal []
[queen,setQueen] = signal -1
[knight,setKnight] = signal -1
[illegals, setIllegals] = signal []
[targets, setTargets] = signal []
[knightHops, setKnightHops] = signal []

makeQueens = => # anger de rutor som damen kan placeras på
	cx = 7 # board center x
	cy = 7 # board center y
	res = []
	for r in range N
		for c in range N
			dx = abs 2*c - cx
			dy = abs 2*r - cy
			if dx * dy not in [3,7,9,15] then res.push c+8*r
	res.sort (a,b) -> a-b
	res

makeIllegals = (queen) =>
	if queen==-1 then return []
	_.filter range(N*N), (i) =>
		ci = col i
		ri = row i
		cq = col queen
		rq = row queen
		dc = abs ci - cq
		dr = abs ri - rq
		ci == cq or ri == rq or dc == dr

makeTargets = (illegals)=>
	if illegals==[] then return []
	range(N*N).filter (i) => not illegals.includes i

makeKnight = (targets) =>
	if targets.length==64 then return -1
	targets[0]

makeKnightHops = (knight) =>
	if knight==-1 then return []
	res = []
	c = col knight
	r = row knight
	for dc in [-2,-1,1,2]
		for dr in [-2,-1,1,2]
			if abs(dc) == abs(dr) then continue
			c2 = c + dc
			r2 = r + dr
			index = c2+8*r2
			if c2 in range(8) and r2 in range(8) and index in targets()
				res.push index
	res.sort (a,b) -> a-b
	res

click = (index) ->
	if state() == 0
		if index in queens()

			setQueen index
			log 'queen',index

			setIllegals makeIllegals queen()
			log 'illegals',illegals()

			setTargets makeTargets illegals()
			log 'targets', targets()

			setKnight => makeKnight targets()
			log 'knight', knight()
			
			setKnightHops makeKnightHops knight()
			log 'knightHops', knightHops()

			setState 1
		else log 'not a valid queen position'
		return
	if state() == 1
		if index in knightHops()
			setKnight index
			setKnightHops makeKnightHops knight()
			log 'knightHops', index, '=>',knightHops()
		else log 'not a valid knight position'

	# arr = _.clone toggle() # OBS utan clone så uppfattas det inte som någon uppdatering
	# _.set arr,index, not arr[index] # _.set föreslogs av CoPilot!
	# setToggle arr

showRects = =>
	for i in range N*N
		do (i) =>
			r = 7 - row i
			c = col i
			x = S + S*c
			y = S + S*r
			width = S
			height = S
			fill = ['brown','black'][(r+c) % 2]
			rect {x, y, width, height, fill, onClick: => click i}

showPieces = (pieces,PIECE) =>
	for piece in pieces
		if piece != -1
			r = 7 - row piece
			c = col piece
			x = S*(1.5+c)
			y = S*(1.85+r)
			text {x, y, "text-anchor":"middle", "font-size":S, fill:"white", onClick: => click piece}, PIECE

setState 0
setQueens makeQueens()
log 'queens',  queens()

r4r => # Har ej förstått varför TVÅ loopar behövs.
	svg {viewBox:"0 0 400 400", width:320, height:320},
		showRects()
		=> if state() == 0 then showPieces queens(),QUEEN
		=> if state() == 1 then showPieces [queen()],QUEEN
		=> if state() == 1 then showPieces [knight()],KNIGHT
