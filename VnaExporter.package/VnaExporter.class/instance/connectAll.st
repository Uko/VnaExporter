connecting
connectAll
	
	^ edges := model flatCollect: [ :from |
		model collect: [ :to |
			from -> to ] ]