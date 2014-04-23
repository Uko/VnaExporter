connections
connectAllUndirectedNoLoops
	
	connections := OrderedCollection new.
	model withIndexDo: [ :from :index |
		(model allButFirst: index) do: [ :to |
			connections add: from -> to ] ].
	^ connections