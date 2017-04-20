/* Create a treemap of country level measures. Inspiration drawn from https://bl.ocks.org/mbostock/4063582.
 */
$(function() {
    // Read in your data. On success, run the rest of your code
    d3.csv('data/prepped_data.csv', function(error, data) {

        // Setting defaults
        var margin = {
                top: 40,
                right: 10,
                bottom: 10,
                left: 10
            },
            width = 960,
            height = 500,
            drawWidth = width - margin.left - margin.right,
            drawHeight = height - margin.top - margin.bottom,
            measure = 'fertility_rate'; // variable to visualize

        // Append a wrapper div for the chart
        var div = d3.select('#vis')
            .append("div")
            .attr('height', height)
            .attr('width', width)
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");

        /* ********************************** Create hierarchical data structure & treemap function  ********************************** */

        // Nest your data *by region* using d3.nest()


        // Define a hierarchy for your data



        // Create a *treemap function* that will compute your layout given your data structure


        /* ********************************** Create an ordinal color scale  ********************************** */

        // Get list of regions for colors


        // Set an ordinal scale for colors


        /* ********************************** Write a function to perform the data-join  ********************************** */

        // Write your `draw` function to bind data, and position elements
        var draw = function() {

            // Redefine which value you want to visualize in your data by using the `.sum()` method


            // (Re)build your treemap data structure by passing your `root` to your `treemap` function


            // Bind your data to a selection of elements with class node
            // The data that you want to join is array of elements returned by `root.leaves()`


            // Enter and append elements, then position them using the appropriate *styles*

        };

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