var svgWidth = 650;
var svgHeight = 650;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = svg.append("g");

// Append a div to the body to create tooltips, assign it a class
d3.select(".chart")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("data/data.csv", function(err, povertyDepress) {
  if (err) throw err;

  povertyDepress.forEach(function(data) {
    data.below_poverty = +data.below_poverty;
    data.depression_affirmed = +data.depression_affirmed;
  });


  // Create scale functions
  var yLinearScale = d3.scaleLinear()
    .range([height, 0]);

  var xLinearScale = d3.scaleLinear()
    .range([0, width]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Scale the domain
  xLinearScale.domain([8, d3.max(povertyDepress, function(data) {
    return +data.below_poverty;
  })]);
  yLinearScale.domain([8, d3.max(povertyDepress, function(data) {
    return +data.depression_affirmed;
  })]);

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(data) {
      var stateName = data.state_name;
      var belowPoverty = +data.below_poverty;
      var depressionAffirmed = +data.depression_affirmed;
      return (stateName + "<br> Below Poverty: " + belowPoverty + " %" + "<br> Depressed: " + depressionAffirmed + " %");
    });

  chart.call(toolTip);

  chart.selectAll("circle")
    .data(povertyDepress)
    .enter().append("circle")
      .attr("cx", function(data, index) {
        console.log(data.below_poverty);
        return xLinearScale(data.below_poverty);
      })
      .attr("cy", function(data, index) {
        return yLinearScale(data.depression_affirmed);
      })
      .attr("r", "10")
      .attr("fill", "#7595bd")
      .attr("stroke", "#223247")
      .on("click", function(data) {
        toolTip.show(data);
      })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

  chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chart.append("g")
    .call(leftAxis);

  chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Est. % Affirmed Depression (last 12 months)");

// Append x-axis labels
  chart.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 30) + ")")
    .attr("class", "axisText")
    .text("% Living Below Poverty Level");
});

