tests
testConnectAllUndirected
	exporter model: #(1 2 3 4).
	
	self
		assert: (exporter connectAllUndirected
		hasEqualElements: {
			1 -> 1 .
			1 -> 2 .
			1 -> 3 .
			1 -> 4 .
			2 -> 2 .
			2 -> 3 .
			2 -> 4 .
			3 -> 3 .
			3 -> 4 .
			4 -> 4})