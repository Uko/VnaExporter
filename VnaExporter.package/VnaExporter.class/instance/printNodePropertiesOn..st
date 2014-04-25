printing
printNodePropertiesOn: aStream 
	| props |
	props := #(x y color shape size shortlabel) select: [ :prop |
		(self instVarNamed: prop , 'Block') notNil ].

	aStream nextPutAll: '*node properties'; cr.
	aStream nextPutAll: 'ID'.
	props do: [ :prop | aStream tab; nextPutAll: prop ].
	aStream cr.
	props := props collect: [ :prop | prop , 'Block' ].
	
	model do: [ :item |
		(idBlock value: item) printVnaOn: aStream.
		props do: [ :prop |
			aStream tab.
			((self instVarNamed: prop) value: item) printVnaOn: aStream ].
		aStream cr ].
	aStream cr.