printing
printNodeDataOn: aStream
	| props |
	props := nodeData keys asArray.
	aStream nextPutAll: '*node data'; cr.
	aStream nextPutAll: 'ID'; tab.
	props do: [ :prop | aStream nextPutAll: prop ] separatedBy: [ aStream tab ].
	aStream cr.
	model do: [ :item |
		aStream nextPutAll: (idBlock value: item) asString.
		props do: [ :prop |
			aStream
				tab;
				nextPutAll: ((nodeData at: prop) value: item) asString ].
		aStream cr ].
	aStream cr.