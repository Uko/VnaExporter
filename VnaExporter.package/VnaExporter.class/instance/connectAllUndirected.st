connections
connectAllUndirected
	
	connections := OrderedCollection new.
	model withIndexDo: [ :from :index |
		(model allButFirst: index - 1) do: [ :to |
			connections add: from -> to ] ].
	^ connections