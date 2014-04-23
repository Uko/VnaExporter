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
		aStream nextPutAll: (idBlock value: item); tab.
		(props collect: [ :prop |
			(self instVarNamed: prop) value: item ])
				printOn: aStream
				delimiter: String tab.
		aStream cr ].
	aStream cr.