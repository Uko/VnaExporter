connecting
connectAllUndirectedNoLoops
	
	edges := OrderedCollection new.
	model withIndexDo: [ :from :index |
		(model allButFirst: index) do: [ :to |
			edges add: from -> to ] ].
	^ edges