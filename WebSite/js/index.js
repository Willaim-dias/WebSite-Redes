//list of objects
const cableData = [
    { "distance": 100, "connector": "RJ45", "standard": "10Base-T", "type": "Par trançado (CAT3 ou superior)", "maxDistance": "100 m", "speed": "10 Mbps" },
    { "distance": 100, "connector": "RJ45", "standard": "100Base-TX", "type": "Par trançado (CAT5 ou superior)", "maxDistance": "100 m", "speed": "100 Mbps" },
    { "distance": 100, "connector": "RJ45", "standard": "1000Base-T", "type": "Par trançado (CAT5e ou superior)", "maxDistance": "100 m", "speed": "1 Gbps" },
    { "distance": 100, "connector": "RJ45", "standard": "10GBase-T", "type": "Par trançado (CAT6a ou superior)", "maxDistance": "100 m", "speed": "10 Gbps" },
    { "distance": 2000, "connector": "SC ou LC", "standard": "100Base-FX", "type": "Fibra: Multimodo", "maxDistance": "2 km", "speed": "100 Mbps" },
    { "distance": 550, "connector": "SC ou LC", "standard": "1000Base-SX", "type": "Fibra: Multimodo", "maxDistance": "550 m", "speed": "1 Gbps" },
    { "distance": 550, "connector": "SC ou LC", "standard": "1000Base-LX", "type": "Fibra: Multimodo", "maxDistance": "550 m", "speed": "1 Gbps" },
    { "distance": 10000, "connector": "SC ou LC", "standard": "1000Base-LX", "type": "Fibra: Monomodo", "maxDistance": "10 km", "speed": "1 Gbps" },
    { "distance": 300, "connector": "LC", "standard": "10GBase-SR", "type": "Fibra: Multimodo", "maxDistance": "300 m", "speed": "10 Gbps" },
    { "distance": 10000, "connector": "LC", "standard": "10GBase-LR", "type": "Fibra: Monomodo", "maxDistance": "10 km", "speed": "10 Gbps" },
    { "distance": 150, "connector": "MPO", "standard": "40GBase-SR4", "type": "Fibra: Multimodo", "maxDistance": "150 m", "speed": "40 Gbps" },
    { "distance": 100, "connector": "MPO", "standard": "100GBase-SR10", "type": "Fibra: Multimodo", "maxDistance": "100 m", "speed": "100 Gbps" },
    { "distance": 10000, "connector": "MPO", "standard": "400GBase-ER8", "type": "Fibra: Monomodo", "maxDistance": "40 km", "speed": "400 Gbps" },
    { "distance": 40000, "connector": "LC", "standard": "10GBase-ER", "type": "Fibra: Monomodo", "maxDistance": "40 km", "speed": "10 Gbps" },
    { "distance": 10000, "connector": "MPO", "standard": "40GBase-LR4", "type": "Fibra: Monomodo", "maxDistance": "10 km", "speed": "40 Gbps" },
    { "distance": 10000, "connector": "MPO", "standard": "100GBase-LR4", "type": "Fibra: Monomodo", "maxDistance": "10 km", "speed": "100 Gbps" }
];

//Function to update the list of available connectors based on the selected distance
document.getElementById('distance').addEventListener('change', function () {
    //Gets the value of the selected distance and converts it to an integer
    const distance = parseInt(this.value);
    //Select the element from the connector dropdown
    const connectorSelect = document.getElementById('connector');
    //Resets the contents of the connectors dropdown
    connectorSelect.innerHTML = '<option value="">--Selecione o Conector--</option>';

    //Checks if the distance is a valid number
    if (!isNaN(distance)) {
        //Filters cable data to obtain connectors that match the selected distance 
        const connectors = [...new Set(cableData.filter(cable => cable.distance === distance).map(cable => cable.connector))];

        //Adds each filtered connector as an option in the connectors dropdown
        connectors.forEach(connector => {
            const option = document.createElement('option');
            option.value = connector;
            option.textContent = connector;
            connectorSelect.appendChild(option);
        });

        //Enables connector dropdown
        connectorSelect.disabled = false;
    } else {
        //Disables connector dropdown if the distance is not valid
        connectorSelect.disabled = true;
    }

    //Calls the updateTable function with an empty list to clear the displayed data
    updateTable([]);
});


//Function to update the data table based on connector and distance selection 
document.getElementById('connector').addEventListener('change', function () {
    //Gets the value of the selected distance and converts it to an integer
    const distance = parseInt(document.getElementById('distance').value);
    //Gets the value of the selected connector
    const connector = this.value;

    //Verifies that the distance is a valid number and that a connector was selected
    if (!isNaN(distance) && connector) {
        //Filters cable data to find those that match the selected distance and connector
        const filteredCables = cableData.filter(cable => cable.distance === distance && cable.connector === connector);
        //Update the table with filtered cables
        updateTable(filteredCables);
    } else {
        //If distance is not valid or no connector is selected, clears the table
        updateTable([]);
    }
});

//Function to update the results table with data from the supplied cables
function updateTable(cables) {
    //Selects the table body (tbody) within the element with the ID 'resultsTable'
    const tbody = document.getElementById('resultsTable').querySelector('tbody');
    //Clears the current contents of tbody, removing all existing lines
    tbody.innerHTML = '';

    //Iterates over each cable provided in the 'cables' list
    cables.forEach(cable => {
        //Creates a new table row element (tr)
        const row = document.createElement('tr');
        //Iterates over each value in the 'cable' object (cable properties) 
        Object.values(cable).forEach(value => {
            //Creates a new table cell element (td)
            const cell = document.createElement('td');
            //Sets the cell text to the current value
            cell.textContent = value;
            //Add the cell to the table row
            row.appendChild(cell);
        });
        //Adds the complete row to the tbody of the table
        tbody.appendChild(row);
    });
}

