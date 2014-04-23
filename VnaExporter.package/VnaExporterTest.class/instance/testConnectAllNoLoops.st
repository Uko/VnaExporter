as yet unclassified
testConnectAllNoLoops
	exporter model: #(1 2 3).
	
	self
		assert: (exporter connectAllNoLoops
		hasEqualElements: {
			1 -> 2 .
			1 -> 3 .
			2 -> 1 .
			2 -> 3 .
			3 -> 1 .
			3 -> 2})