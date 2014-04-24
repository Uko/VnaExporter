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
		aStream nextPutAll: (idBlock value: item).
		(props do: [ :prop |
			aStream
				tab;
				nextPutAll: ((self instVarNamed: prop) value: item) asString ]).
		aStream cr ].
	aStream cr.