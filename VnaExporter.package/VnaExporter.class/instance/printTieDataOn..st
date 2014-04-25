printing
printTieDataOn: aStream 
	| props |
	props := tieData keys asArray.
	aStream nextPutAll: '*tie data'; cr.
	aStream nextPutAll: 'from	to'; tab.
	props do: [ :prop | aStream nextPutAll: prop ] separatedBy: [ aStream tab ].
	aStream cr.