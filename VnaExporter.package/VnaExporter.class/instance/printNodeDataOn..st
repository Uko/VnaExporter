printing
printNodeDataOn: aStream
	| props |
	props := nodeData keys asArray.
	aStream nextPutAll: '*node data'; cr.
	aStream nextPutAll: 'ID'; tab.
	props do: [ :prop | aStream nextPutAll: prop ] separatedBy: [ aStream tab ].
	aStream cr.
	model do: [ :item |
		(idBlock value: item) printVnaOn: aStream.
		props do: [ :prop |
			aStream tab.
			((nodeData at: prop) value: item) printVnaOn: aStream ].
		aStream cr ].
	aStream cr.