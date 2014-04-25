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
	connections do: [ :tie |
		aStream
			nextPutAll: (idBlock value: tie key); tab;
			nextPutAll: (idBlock value: tie value); tab.
		(props collect: [ :prop |
			(tieData at: prop) value: tie key value: tie value ])
				printOn: aStream
				delimiter: String tab.
		aStream cr ]