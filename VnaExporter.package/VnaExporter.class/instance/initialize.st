initialization
initialize

	model := OrderedCollection new.
	connections := OrderedCollection new.
	idBlock := #asString.
	nodeData := IdentityDictionary new.
	tieData := IdentityDictionary new.