import _ from 'https://cdn.skypack.dev/lodash'
import {abs,N,col,row,log,Position,range,signal,effect,r4r} from '/js/utils.js'
import {svg,rect,text,circle,g} from '/js/utils.js'

QUEEN = '♛'
KNIGHT = '♘'
S = 40 # square size

[state,setState] = signal -1 # 0 or 1
[queens,setQueens] = signal [] # indexes
[queen,setQueen] = signal -1 # index
[knight,setKnight] = signal -1 # index 
[illegals, setIllegals] = signal [] # indexes
[targets, setTargets] = signal [] # indexes
[taken, setTaken] = signal -1 # count
[target, setTarget] = signal -1 # index
[knightHops, setKnightHops] = signal [] # indexes
[count,setCount] = signal 0 # count
[counts, setCounts] = signal [] # counts moves per square
[mask,setMask] = signal 0 # 0,1,2 or 3

show = (a,b) =>
	log a,b
	b

makeState = (state) => show 'state', state

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
	show 'queens', res

makeQueen = (queen) => show 'queen', queen

makeMask = (queen) => show 'mask', (row(queen)+col(queen)) % 4

makeIllegals = (queen) =>
	if queen==-1 then return []
	show 'illegals', _.filter range(N*N), (i) =>
		ci = col i
		ri = row i
		cq = col queen
		rq = row queen
		dc = abs ci - cq
		dr = abs ri - rq
		queen != i and (ci == cq or ri == rq or dc == dr)

makeTargets = (illegals)=>
	if illegals==[] then return []
	res = range(N*N).filter (i) => not illegals.includes i
	res.sort (a,b) -> b-a
	show 'targets', res

makeTaken = (taken) =>
	if taken==64 then res -1 else res = taken
	show 'taken', res

makeTarget = (target) => show 'target', target
makeCount = (count) => show 'count', count
makeCounts = (counts) => show 'counts', counts

makeKnight = (targets) =>
	if targets.length==64 then return -1
	show 'knight', targets[0]

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
	show 'knightHops', res

click = (index) ->
	if state() == 0 then state0 index
	else state1 index

state0 = (index) => # handle queen clicks
	if index in queens()
		setQueen makeQueen index
		setMask makeMask queen()
		setIllegals makeIllegals queen()
		setTargets makeTargets illegals()
		setTaken makeTaken 1
		setTarget makeTarget targets()[taken()]
		setKnight => makeKnight targets()
		setKnightHops makeKnightHops knight()
		setState makeState 1
		setCount makeCount 0
		setCounts makeCounts []
	else log 'not a valid queen position'
		
state1 = (index) => # handle knight clicks
	if index in knightHops()
		setKnight index
		setKnightHops makeKnightHops knight()
		setCount makeCount count() + 1
		if target() == index
			setTaken makeTaken taken() + 1
			setTarget makeTarget targets()[taken()]
			setCounts makeCounts _.concat counts(), count()
			setCount makeCount 0
	else log 'not a valid knight position'

showRects = =>
	for i in range N*N
		do (i) =>
			r = 7 - row i
			c = col i
			x = S + S*c
			y = S + S*r
			width = S
			height = S
			fill = ['brown','gray'][(r+c) % 2]
			rect {x, y, width, height, fill, onClick: => click i}

showPieces = (pieces,PIECE,props) =>
	for piece in pieces
		if piece != -1
			r = 7 - row piece
			c = col piece
			x = S*(1.5+c)
			y = S*(1.9+r)
			do (piece) =>
				props1 = _.merge {x, y, "text-anchor":"middle", "font-size":S, fill:"white", onClick: => click piece},props
				text props1, PIECE

showCircles = (circles,CIRCLE) =>
	for circ in circles
		if circ == -1 then continue
		r = 7 - row circ
		c = col circ
		cx = S*(1.5+c)
		cy = S*(1.5+r)
		do (circ) =>
			circle _.merge {cx, cy, r:10, "stroke-width":4, onClick: => click circ}, CIRCLE

showCounts = (counts) =>
	for index in range counts.length
		counter = counts[index] # count
		t = targets()[index] # target
		r = 7 - row t
		c = col t
		x = S*(1.5+c)
		y = S*(1.8+r)
		do (counter) =>
			text {x, y, "text-anchor":"middle", "font-size":0.7*S, fill:"black", onClick: => click counter}, counter

setState makeState 0
setQueens makeQueens()

TARGET      = {stroke:"yellow", fill:"none"}
ILLEGALS    = {stroke:"none",   fill:"black"}
KNIGHT_HOPS = {stroke:"none",   fill:"white", r:5}

r4r => # Har ej förstått varför TVÅ loopar behövs.
	svg {viewBox:"0 0 400 400", width:320, height:320},
		showRects()
		=> if state() == 0 then showPieces queens(),QUEEN, {fill:"black"}
		=> if state() == 1
			g {},
				showCounts counts()
				showPieces [queen()], QUEEN, {fill:"black"}
				showPieces [knight()], KNIGHT, {fill:"white"}
				showCircles [target()],TARGET
				if mask() & 1 then showCircles illegals(),ILLEGALS
				if mask() & 2 then showCircles knightHops(),KNIGHT_HOPS
