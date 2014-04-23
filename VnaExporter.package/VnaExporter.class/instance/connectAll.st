connections
connectAll
	
	^ connections := model flatCollect: [ :from |
		model collect: [ :to |
			from -> to ] ]