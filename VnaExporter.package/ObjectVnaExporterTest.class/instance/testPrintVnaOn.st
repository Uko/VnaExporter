tests
testPrintVnaOn
	self
		assert:
			(String streamContents: [ :stream |
				Object new printVnaOn: stream ])
		equals: '"an Object"'