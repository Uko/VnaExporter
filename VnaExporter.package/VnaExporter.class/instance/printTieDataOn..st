printing
printTieDataOn: aStream 
	| props |
	props := tieData keys asArray.
	aStream nextPutAll: '*tie data'; cr.
	aStream
		nextPutAll: 'from'; tab;
		nextPutAll: 'to'; tab.
	props do: [ :prop | aStream nextPutAll: prop ] separatedBy: [ aStream tab ].
	aStream cr.
	edges do: [ :tie |
		(idBlock value: tie key) printVnaOn: aStream.
		aStream tab.
		(idBlock value: tie value) printVnaOn: aStream..
		props do: [ :prop |
			aStream tab.
			((tieData at: prop) value: tie key value: tie value) printVnaOn: aStream.
		aStream cr ] ]