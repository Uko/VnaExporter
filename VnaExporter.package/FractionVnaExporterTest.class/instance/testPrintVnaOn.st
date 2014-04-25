tests
testPrintVnaOn
	self
		assert:
			(String streamContents: [ :stream |
				1/2 printVnaOn: stream ])
		equals: '0.5'