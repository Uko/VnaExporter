printing
printNodeDataOn: aStream
	| props |
	props := nodeData keys asArray.
	aStream nextPutAll: '*node data'; cr.
	aStream nextPutAll: 'ID'; tab.
	props do: [ :prop | aStream nextPutAll: prop ] separatedBy: [ aStream tab ].
	aStream cr.
	model do: [ :item |
		aStream nextPutAll: (idBlock value: item); tab.
		(props collect: [ :prop |
			(nodeData at: prop) value: item ])
				printOn: aStream
				delimiter: String tab.
		aStream cr ].
	aStream cr.