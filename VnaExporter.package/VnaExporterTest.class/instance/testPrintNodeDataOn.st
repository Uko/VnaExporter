tests
testPrintNodeDataOn
	exporter
		model: #(1 2 3);
		nodeData: #square computeAs: #squared.
	
	self
		assert:
			(String streamContents: [ :stream |
				exporter printNodeDataOn: stream ])
		equals:
'*node data
ID	square
1	1
2	4
3	9

'