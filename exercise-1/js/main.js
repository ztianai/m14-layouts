/* Create a treemap of country level measures. Inspiration drawn from https://bl.ocks.org/mbostock/4063582.
*/
$(function() {
	// Read in your data. On success, run the rest of your code
	d3.csv('data/prepped_data.csv', function(error, data){
		// Setting defaults
		var margin = {top: 40, right: 10, bottom: 10, left: 10},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		// variable to visualize
		var measure = 'fertility_rate';
		var color = d3.scale.category10();

		// Wrapper div for the chart
		var div = d3.select('#vis')
								.append("div")
								.attr('height', 600)
								.attr('width', 600)
								.style("left", margin.left + "px")
								.style("top", margin.top + "px");

		// Function to arrange divs (will be called seperately for entering and updating)
		var position = function() {
			// Set the position of each div using the properties computed from the treemap function
			this.style("left", function(d,i) {return d.x + "px"; })
					.style("top", function(d) { return d.y + "px"; })
					.style('width', function(d){return d.dx + 'px'})
					.style("height", function(d) { return d.dy + "px"; })
					.style("background", function(d) {return !d.values ? color(d.region) : null; })
		}

		// Construct a nest function using `d3.nest`, and create a variable with your nested data
		var nestedData = d3.nest() // function that returns a function...
								 .key(function(d){return d.region;})
								 .entries(data);

		 // Construct a treemap function that sizes elements based on the current `measure`, and
		 // Make sure to specify how to retrieve the `children` from each element
		 var treemap = d3.layout.treemap() // function that returns a function!
		 		.size([width, height]) // set size: scaling will be done internally
		 		.sticky(true) // If data changes, keep elements in the same position
		 		.value(function(d) {return d[measure];}) // Assert value to be used to
		 		.children(function(d){return d.values;}); // Determine how the function will find the children of each node

		// Write your `draw` function to bind data, and position elements
		var draw = function() {
			// Set the `value` property of your `treemap` fucntion, as it may have changed
			treemap.value(function(d) {return d[measure];});

			// Bind your data to a selection of node elements
			var nodes = div.selectAll(".node").data(treemap.nodes({values:nestedData}));

			// Enter and append elements, then position them by using `.call`
			nodes.enter()
					 .append("div")
					 .attr('class', 'node')
					 .text(function(d){return d.country_code}) // Set text: a big advantage of using divs over rects
				   .call(position); // This prevents a strange transition on enter()

			// Update the nodes
			nodes.transition().duration(500).call(position);
		}

		// Call your draw function
		draw();

		// Listen to change events on the input elements
		$("input").on('change', function() {
			// Set your measure variable to the value (which is used in the draw funciton)
			measure = $(this).val();

			// Draw your elements
			draw();
		});

	});
});
