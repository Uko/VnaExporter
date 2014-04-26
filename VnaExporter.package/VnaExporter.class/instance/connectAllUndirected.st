connections
connectAllUndirected
	
	edges := OrderedCollection new.
	model withIndexDo: [ :from :index |
		(model allButFirst: index - 1) do: [ :to |
			edges add: from -> to ] ].
	^ edges