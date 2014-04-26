connections
connectAllNoLoops
	
	^ edges := model flatCollect: [ :from |
		model
			reject: [ :to | to == from ]
			thenCollect: [ :to |
				from -> to ] ]