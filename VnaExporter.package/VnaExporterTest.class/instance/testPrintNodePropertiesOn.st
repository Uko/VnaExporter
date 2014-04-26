tests
testPrintNodePropertiesOn
	exporter
		model: #(1 2 3);
		xBlock: [ :item | (item / 2) asFloat ];
		yBlock: [ :item | item * 2 ].
	
	self
		assert:
			(String streamContents: [ :stream |
				exporter printNodePropertiesOn: stream ])
		equals:
'*node properties
ID	x	y
1	0.5	2
2	1.0	4
3	1.5	6

'