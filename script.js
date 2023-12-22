const distance = 120;		// Distance between circles in rows 2 & 3

const r2 = 30,					// Default radius in row 2
			y2 = 140,					// Vertical position in row 2
			numCircles = 4;		// Number of circles in row 2	

const r3 = 20,				// Default radius in row 3
			y3= 280,				// Vertical position in row 3
		 	arrColor = ['yellow', 'pink', 'red', 'blue', 'cyan'],		// Array with Colors for row 3 when selected
			arrRadius = [10, 20, 30, 40, 50];												// Array with radius for row 3 when selected

// Create circles in the second row using for loop.
for (i = 0; i < numCircles; i++) {
	d3.select('g')
		.append('circle')
		.classed('row2', true)			// Assign class
		.attr('id', i + 5)					// Assign id
		.attr('r', r2)							// Assign default radius
		.attr('cx', distance * i )	// Center horizontal position
		.attr('cy', y2)							// Center vertical position
		.attr('selected', false)		// Default "non selected"
};

// Create circles in the third row from an array
d3.select('g')
	.selectAll('.row3')
	.data(arrRadius)						// Data to create circles (only used to assign the number of circles)
	.enter()										
	.append('circle')
	.classed('row3', true)																			// Assign class
	.attr('id', function(d, i) { return 5 + numCircles + i})		// Assign id	
	.attr('cx', function(d, i) {return distance * i})						// Center horizontal position
	.attr('cy', y3)																							// Center vertical position
	.attr('r', r3);																							// Assign default radius

// Function to define radius in selected / not selected conditions (row 1)
function getRadius(d, i) {
	switch(this.getAttribute('class')) {
		case	'row1':											// function to define radius in row1
			if (this.getAttribute('selected') == 'true') return (i + 1) * 5 ;
			else return 40;
			break;
		case	'row2':											// function to define radius in row2
			if (this.getAttribute('selected') == 'true') return (i + 6) * 6 ;
			else return r2;
			break;
		case 'row3':											// function to define radius in row3
			if (this.getAttribute('selected') == 'true') return arrRadius[i] ;
  		else return r3;
			break;
		default: return 40;
	}
}

function getColor(d, i) {
	switch(this.getAttribute('class')) {
		case	'row1':											// function to define color in row1
			if (this.getAttribute('selected') == 'true') return 'green';
			else return '#ddd';
			break;
		case	'row2':											// function to define color in row2
			if (this.getAttribute('selected') == 'true') return 'orange';
			else return '#ddd';
			break;
		case 'row3':											// function to define color in row3
			if (this.getAttribute('selected') == 'true') return arrColor[i];
			else return '#ddd';
			break;
		default: return '#ddd';
	}
}

// Dynamic operations
d3.selectAll('.row1, .row2, .row3')
	.on('click', function(e, d) {
// Change condition (selected / not selected) when the circle is clicked
		if (this.getAttribute('selected') == 'true') {
			d3.select(this).attr('selected', 'false');
		}
		else  d3.select(this).attr('selected', 'true');
	
// Check "as found" properties (style and attributes can be retrieved)
		const computedColor = window.getComputedStyle(this).fill, // -> returns "rgb" color.
		 			currentColor = this.style.fill,
		 			currentRadius = this.getAttribute('r');
	
// Update color and radius on the element that was clicked.
		d3.selectAll('.'+this.getAttribute('class'))
			.style('fill', getColor)
			.attr('r', getRadius);

// Check "as left" properties (styles or attributes) and log previous and new properties.
		const newColor = this.style.fill,
 					newRadius = this.getAttribute('r');

// Update text with details of the circle, and as found / as left color and radius.
		d3.select('#details')
			.text('id = ' + this.id + ' / active = ' + this.getAttribute('selected'));
		d3.select('#asFound')
			.text('color(computed) = ' + computedColor + ' / color(current) = ' + currentColor + ' / radius = ' + currentRadius);
		d3.select('#asLeft')
			.text('color = ' + newColor + ' / radius = ' + newRadius);
			
		console.log(this.id, this.getAttribute('selected'), " / ", computedColor, currentColor, currentRadius, '=>', newColor, newRadius);		
	}	);