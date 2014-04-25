tests
testPrintVnaOn
	self
		assert:
			(String streamContents: [ :stream |
				'hello' printVnaOn: stream ])
		equals: '"hello"'