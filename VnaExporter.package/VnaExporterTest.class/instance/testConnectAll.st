tests
testConnectAll
	exporter model: #(1 2 3).
	
	self
		assert: (exporter connectAll
		hasEqualElements: {
			1 -> 1 .
			1 -> 2 .
			1 -> 3 .
			2 -> 1 .
			2 -> 2 .
			2 -> 3 .
			3 -> 1 .
			3 -> 2 .
			3 -> 3 })