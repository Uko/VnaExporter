initialization
initialize

	model := OrderedCollection new.
	connections := OrderedCollection new.
	idBlock := #yourself.
	nodeData := IdentityDictionary new.
	tieData := IdentityDictionary new.