as yet unclassified
testConnectAllUndirectedNoLoops 
	exporter model: #(1 2 3 4).
	
	self
		assert: (exporter connectAllUndirectedNoLoops 
		hasEqualElements: {
			1 -> 2 .
			1 -> 3 .
			1 -> 4 .
			2 -> 3 .
			2 -> 4 .
			3 -> 4 })