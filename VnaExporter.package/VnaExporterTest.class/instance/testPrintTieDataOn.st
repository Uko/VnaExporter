tests
testPrintTieDataOn
	exporter
		model: #(1 2 3);
		connectAllNoLoops;
		tieData: #product computeAs: [ :from :to | 
			from * to ].
	
	self
		assert:
			(String streamContents: [ :stream |
				exporter printTieDataOn: stream ])
		equals:
'*tie data
from	to	product
1	2	2
1	3	3
2	1	2
2	3	6
3	1	3
3	2	6
'