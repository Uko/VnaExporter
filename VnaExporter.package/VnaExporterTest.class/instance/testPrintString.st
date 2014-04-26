tests
testPrintString
	exporter
		model: #(1 2 3);
		nodeData: #square computeAs: [ :item |
			item squared asString ];
		xBlock: [ :item | (item / 2) asFloat ];
		yBlock: [ :item | item * 2 ];
		connectAllNoLoops;
		tieData: #product computeAs: [ :from :to | 
			from * to ].
	
	self
		assert: exporter printString
		equals:
'*node data
ID	square
1	"1"
2	"4"
3	"9"

*node properties
ID	x	y
1	0.5	2
2	1.0	4
3	1.5	6

*tie data
from	to	product
1	2	2
1	3	3
2	1	2
2	3	6
3	1	3
3	2	6
'