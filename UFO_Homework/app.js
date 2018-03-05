// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredSightings to sightingsData initially
var filteredSightings = sightingsData;

// renderTable renders the filteredSightings to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredSightings.length; i++) {
    // Get get the current sightings object and its fields
    var sighting = filteredSightings[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the sighting object, create a new cell and set its inner text to be the current value at the current sighting's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}
function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace
    var filterDate = $dateInput.value.trim();

        // Set filteredSightings to an array of all sighting whose "date" matches the filter
        filteredSightings = sightingsData.filter(function(sighting) {
            var sightingDate = sighting.date;
        
    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return sightingDate = filterDate;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();

  
