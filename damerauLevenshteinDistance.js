function damerauLevenshteinDistance(a, b)
{
	var aLength = a.length;
	var bLength = b.length;

	// "infinite" distance is just the max possible distance
	var INF = aLength + bLength;

	// make and initialize the character map indices
	var DA = {};

	var i, j;

	// make the distance matrix H[0..aLength+1][0..bLength+1]
	var H = new Array(aLength+2);
	for (i=0; i<aLength+2; i++) {
		H[i] = new Array(bLength+2);
	}

	// initialize the left and top edges of H
	H[0][0] = INF;
	for (i = 0; i <= aLength; ++i)
	{
		H[i+1][0] = INF;
		H[i+1][1] = i;
	}
	for (j = 0; j <= bLength; ++j)
	{
		H[0][j+1] = INF;
		H[1][j+1] = j;
	}

	// fill in the distance matrix H
	// look at each character in a
	for (i = 1; i <= aLength; ++i)
	{
		var DB = 0;
		// look at each character in b
		for (j = 1; j <= bLength; ++j)
		{
			var i1 = DA[b[j-1]] || 0;
			var j1 = DB;
			var cost;
			if (a[i-1] === b[j-1])
			{
				cost = 0;
				DB = j;
			} else {
				cost = 1;
			}

			H[i+1][j+1] = Math.min(
				H[i][j] + cost,  					// substitution
				H[i+1][j] + 1,     					// insertion
				H[i][j+1] + 1,     					// deletion
				H[i1][j1] + (i-i1-1) + 1 + (j-j1-1) // transposition
			);
		}
		DA[a[i-1]] = i;
	}

	var dist = H[aLength+1][bLength+1];

	return { dist: dist, score: 1 - dist/Math.max(aLength, bLength) };
}

module.exports = damerauLevenshteinDistance;
