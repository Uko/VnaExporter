tests
testPrintVnaOn
	self
		assert:
			(String streamContents: [ :stream |
				201 printVnaOn: stream ])
		equals: '201'