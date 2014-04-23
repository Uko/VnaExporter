connections
connectAllNoLoops
	
	^ connections := model flatCollect: [ :from |
		model
			reject: [ :to | to == from ]
			thenCollect: [ :to |
				from -> to ] ]