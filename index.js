// Carbon Footprint Calculator JavaScript Code

/**
 * Adds a new transport entry form to the DOM.
 *
 * This function dynamically creates a new div element containing input fields for transport mode,
 * distance, and fuel efficiency, and appends it to the "transportEntriesContainer".
 * It also initializes a new transport entry object and adds it to the `transportEntries` array.
 *
 * param: None
 *
 * return: void
 **/
let transportEntries = [];
let nextTransportId = 0;
function addTransportEntry() {
    const container = document.getElementById("transportEntriesContainer");
    const id = nextTransportId++;

    // Default entry object
    const entry = {
        id,
        mode: "car",
        distance: 0,
        fuelEfficiency: 0,
    };
    transportEntries.push(entry);

    const entryDiv = document.createElement("div");
    entryDiv.className = "transport-entry";
    entryDiv.id = `transport-${id}`;
    entryDiv.innerHTML = `
        <div class="transport-row">
            <label>
                <select onchange="updateTransportMode(${id}, this.value)">
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="bike">Bicycle</option>
                    <option value="walk">Walking</option>
                </select>
            </label>

            <label>
                km last
                <span class="timeframe" id="timeframe-${id}" data-for="transport_timeframe"></span>:
                <input type="number" onchange="updateTransportDistance(${id}, this.value)">
            </label>

            <label id="fuel-eff-${id}">Fuel Efficiency (L/100km):
                <input type="number" onchange="updateTransportFuel(${id}, this.value)">
            </label>

            <button type="button" class="button delete-button" onclick="removeTransportEntry(${id})">X</button>
        </div>
    `;
    container.appendChild(entryDiv);

    //Set the correct time length text for new entries
    const timeframeValue = document.getElementById(
        "transport_timeframe"
    ).value;
    let text = "week";
    if (timeframeValue === "monthly") text = "month";
    else if (timeframeValue === "yearly") text = "year";
    document.getElementById(`timeframe-${id}`).textContent = text;
}

/**
 * Updates the transport mode for a given entry and adjusts UI visibility.
 *
 * param: id The unique identifier of the transport entry to update.
 * param: mode The new transport mode to set (e.g., "car", "bike", "public_transport").
 *
 * return: void
 **/
function updateTransportMode(id, mode) {
    const entry = transportEntries.find((e) => e.id === id);
    if (entry) entry.mode = mode;

    const fuelLabel = document.getElementById(`fuel-eff-${id}`);
    fuelLabel.style.display = mode === "car" ? "inline-block" : "none";
}

/**
 * Updates the transport distance for a given entry.
 *
 * param: id The unique identifier of the transport entry.
 * param: value The new distance value to set, which will be parsed as a float.
 *
 * return: This function does not explicitly return a value. It updates the `distance` property of the `transportEntry` in place if found.
 **/
function updateTransportDistance(id, value) {
    const entry = transportEntries.find((e) => e.id === id);
    if (entry) entry.distance = parseFloat(value) || 0;
}

/**
 * Updates the fuel efficiency for a specific transport entry.
 *
 * param: id The unique identifier of the transport entry to update.
 * param: value The new fuel efficiency value. This will be parsed as a float.
 *
 * return: void
 **/
function updateTransportFuel(id, value) {
    const entry = transportEntries.find((e) => e.id === id);
    if (entry) entry.fuelEfficiency = parseFloat(value) || 0;
}

/**
 * Removes a transport entry from the list and the DOM.
 *
 * param: id The unique identifier of the transport entry to remove.
 *
 * return: void
 **/
function removeTransportEntry(id) {
    transportEntries = transportEntries.filter((e) => e.id !== id);
    const entryDiv = document.getElementById(`transport-${id}`);
    if (entryDiv) entryDiv.remove();
}

/**
 * Toggles the visibility of car-specific input fields based on the selected transport type.
 *
 * This function checks the value of the "transportType" element. If it's "car", the "carInputs"
 * element is displayed; otherwise, it's hidden.
 */
function updateTransportInputs() {
    const transportType = document.getElementById("transportType").value;
    const carInputs = document.getElementById("carInputs");
    if (transportType === "car") {
        carInputs.style.display = "block";
    } else {
        carInputs.style.display = "none";
    }
}

// Diet entries management.

/**
 * Adds a new diet entry to the application, both in the data array and in the UI.
 *
 * param: None
 *
 * return: void
 **/
let dietEntries = [];
let dietIdCounter = 0;
function addDietEntry() {
    // Create a new default diet entry in the array
    const container = document.getElementById("dietEntriesContainer");
    const id = dietIdCounter++;
    const entry = {
        id,
        type: "average",
        name: "",
        calories: 0,
    };
    dietEntries.push(entry);

    // Create a new diet entry in the UI with a div
    const entryDiv = document.createElement("div");
    entryDiv.className = "diet-entry";
    entryDiv.id = `diet-${id}`;
    entryDiv.innerHTML = `
    <div class="diet-row">
        <label>Name:
        <input type="text" placeholder="Name" onchange="updateDietName(${id}, this.value)">
        </label>
            <label>Diet:
            <select onchange="updateDietType(${id}, this.value)">
                <option value="high_meat">High Meat Eater</option>
                <option value="average" selected>Average</option>
                <option value="pescitarian_w_s">Pescitarian w/ shrimp</option>
                <option value="pescitarian_wo_s">Pescitarian w/o shrimp</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
            </select>
            </label>

            <label>
                Calories/day (kcal):
                <input type="number" onchange="updateDietCalories(${id}, this.value)">
            </label>

            <button type="button" class="button delete-button" onclick="removeDietEntry(${id})">X</button>
    </div>
    `;
    container.appendChild(entryDiv);
}

/**
 * Updates the diet type for a specific entry.
 *
 * param: id The unique identifier of the diet entry to update.
 * param: value The new diet type to assign to the entry.
 *
 * return: void
 **/
function updateDietType(id, value) {
    const entry = dietEntries.find(e => e.id === id);
    if (entry) {
        entry.type = value;
    }
}

/**
 * Updates the name of a diet entry.
 *
 * param: id The unique identifier of the diet entry to update.
 * param: value The new name to assign to the diet entry.
 *
 * return: void This function does not return a value.
 **/
function updateDietName(id, value) {
    const entry = dietEntries.find(e => e.id === id);
    if (entry) {
        entry.name = value;
    }
}

/**
 * Updates the calorie count for a specific diet entry.
 *
 * param: id The unique identifier of the diet entry to update.
 * param: value The new calorie value to set for the entry.
 *
 * return: void
 **/
function updateDietCalories(id, value) {
    const entry = dietEntries.find(e => e.id === id);
    if (entry) {
        entry.calories = parseFloat(value) || 0;
    }
}

/**
 * Removes a diet entry from the DOM.
 *
 * param: id The unique identifier of the diet entry to be removed.
 *
 * return: void
 **/
function removeDietEntry(id) {
    const el = document.getElementById(`diet-${id}`);
    if (el) el.remove();
}

/**
 * Updates the displayed timeframe based on the selected value.
 *
 * param: selectElement The HTML select element that triggered the update.
 *
 * return: void
 **/
function updateTimeframe(selectElement) {
    const value = selectElement.value;
    let text = "week";
    if (value === "monthly") text = "month";
    else if (value === "yearly") text = "year";
    const relatedSpan = document
        .querySelectorAll(`.timeframe[data-for="${selectElement.id}"]`)
        .forEach((span) => {
        span.textContent = text;
        });
}

/**
 * Calculates the total CO2e emissions for a given set of diet entries.
 *
 * param: dietEntries An array of objects, where each object represents a diet entry
 * that contains 'type' (e.g., 'high_meat', 'vegan') and 'calories' (number) properties.
 *
 * return: The total CO2e emissions (in kg CO2e) for all provided diet entries, calculated on a yearly basis.
 **/
function calcDiet() {
    // Timeframe is 1 day in the UI & 1 wk in the default emissions map.
    const dietEmissionsMap = {
        high_meat: 40,
        average: 25,
        pescitarian_w_s: 22,
        pescitarian_wo_s: 18,
        vegetarian: 15,
        vegan: 12,
    };

    // Calculate and sum the total CO2e emissions for each diet entry.
    let dietCO2e = 0;
    for (const entry of dietEntries) {
        const dietType = entry.type;
        const calories = entry.calories || 0;
        const dietEmissions = dietEmissionsMap[dietType] || 0;
        const yearlyEmissions = convertToYearly("weekly", dietEmissions);
        dietCO2e += (yearlyEmissions * calories) / 2000;
    }
    return dietCO2e;
}

/**
 * Calculates the estimated CO2e emissions from transportation.
 *
 * param: timeframe The timeframe for the calculation (e.g., "daily", "weekly", "monthly", "yearly").
 * param: transportEntries An array of objects, each containing details about a mode of transport.
 * Each object should have 'mode' (string, e.g., "car", "bus", "train", "bike", "walk"),
 * 'distance' (number, in km), and optionally 'fuelEfficiency' (number, for 'car' mode, in liters per 100km).
 *
 * return: The total CO2e emissions from transportation for the specified timeframe, in kg CO2e.
 **/
function calcTransit() {
    const timeframe = document.getElementById("transport_timeframe").value;

    // Emissions factors in kg CO2e per km
    const emissionsPerKm = {
        bus: 0.105,
        train: 0.041,
        bike: 0,
        walk: 0,
    };

    let transportCO2e = 0;

    for (const entry of transportEntries) {
        const km = entry.distance || 0;
        if (entry.mode === "car") {
        const litersUsed = (km / 100) * (entry.fuelEfficiency || 0);
        transportCO2e += litersUsed * 2.31;
        } else {
        transportCO2e += (emissionsPerKm[entry.mode] || 0) * km;
        }
    }

    transportCO2e = convertToYearly(timeframe, transportCO2e);
    return transportCO2e;
}

/**
 * Calculates the total CO2e emissions from food waste, considering both landfill and composting.
 *
 * param: N/A This function does not take direct parameters but retrieves values from the DOM.
 *
 * return: The total CO2e emissions from food waste in kilograms of CO2 equivalent (kg CO2e).
 **/
function calcFoodWaste() {
    // Collect the values from user input
    const breadTrash = parseFloat(document.getElementById("trash-bread-h").value) || 0;
    const produceTrash = parseFloat(document.getElementById("trash-produce-h").value) || 0;
    const meatTrash = parseFloat(document.getElementById("trash-meat-h").value) || 0;
    const breadCompost = parseFloat(document.getElementById("compost-bread-h").value) || 0;
    const produceCompost = parseFloat(document.getElementById("compost-produce-h").value) || 0;
    const meatCompost = parseFloat(document.getElementById("compost-meat-h").value) || 0;

    // Anaerobic decomposition of food waste:
    const CH4_PRODUCE = 0.25;
    const CH4_BREAD = 0.375;
    const CH4_MEAT = 0.7;

    // Aerobic decomposition of food waste:
    const CO2_FOODWASTE = 0.06; // kg CO2 emitted per kg of food waste

    // CO2e emissions from food waste trash
    const ESCAPE_FACTOR = 0.61; // 61% of landfilled methane escapes to atmosphere
    const GWP_100yr = 28;
    const trashCO2e = (breadTrash * CH4_BREAD + produceTrash * CH4_PRODUCE + meatTrash * CH4_MEAT) * ESCAPE_FACTOR * GWP_100yr;

    // CO2e emissions from food waste compost
    const propAnaerobic = 0.03;
    const carbonStorage = 0.1; //kg CO2e of compost applied per kg of food waste composted (compost is half of the mass of food waste)
    const compost_CH4_CO2e = (breadCompost * CH4_BREAD + produceCompost * CH4_PRODUCE + meatCompost * CH4_MEAT) * GWP_100yr * ESCAPE_FACTOR * propAnaerobic;
    const compostCO2e = (breadCompost + produceCompost + meatCompost) * (CO2_FOODWASTE - carbonStorage) + compost_CH4_CO2e;
    const foodwasteCO2e = trashCO2e + compostCO2e;
    
    // Convert CO2e to yearly CO2e
    const foodwasteTimeframe = document.getElementById("foodwaste_timeframe").value; 
    const yearlyCO2e = convertToYearly(foodwasteTimeframe, foodwasteCO2e);
    return yearlyCO2e;
}


//TODO: add more societal emission reduction opportunities (e.g. activism, lobbying, voting, donating, etc.).
/**
 * Calculates the avoided CO2e emissions from composting food waste from outside the household.
 *
 * param: N/A This function does not take direct parameters but retrieves values from the DOM.
 *
 * return: The yearly avoided CO2e emissions from composting, in kg CO2e per year.
 **/
function calcCompostAvoided() {
    const breadCompostOH = parseFloat(document.getElementById("trash-bread-oh").value) || 0;
    const produceCompostOH = parseFloat(document.getElementById("trash-produce-oh").value) || 0;
    const meatCompostOH = parseFloat(document.getElementById("trash-meat-oh").value) || 0;

    // Landfill anaerobic decomposition of food waste
    const CH4_BREAD = 0.375;
    const CH4_PRODUCE = 0.25;
    const CH4_MEAT = 0.7;
    const ESCAPE_FACTOR = 0.61; // 61% escapes
    const GWP_100yr = 28;

    // CO2e emissions from food waste compost
    const CO2_FOODWASTE = 0.06; // kg CO2 emitted per kg of food waste composted
    const propAnaerobic = 0.03;
    const carbonStorage = 0.1; //kg CO2e of compost applied per kg of food waste composted (compost is half of the mass of food waste)
    const compost_CH4_CO2e = (breadCompostOH * CH4_BREAD + produceCompostOH * CH4_PRODUCE + meatCompostOH * CH4_MEAT) * GWP_100yr * ESCAPE_FACTOR * propAnaerobic;
    const compostCO2e = (breadCompostOH + produceCompostOH + meatCompostOH) * (CO2_FOODWASTE - carbonStorage) + compost_CH4_CO2e;

    // CO2e emissions from diversion from landfill
    const noTrashCO2e = - (breadCompostOH * CH4_BREAD + produceCompostOH * CH4_PRODUCE + meatCompostOH * CH4_MEAT) * ESCAPE_FACTOR * GWP_100yr;

    // total CO2e avoided per user-specified timeframe via extra composting
    const avoidedCO2e = noTrashCO2e + compostCO2e;

    // Convert avoided CO2e to yearly CO2e
    const foodwasteTimeframe = document.getElementById("foodwaste_timeframe").value;
    const yearlyAvoidedCO2e = convertToYearly(foodwasteTimeframe, avoidedCO2e);
    console.log("the food waste avoided yearly emissions is" + yearlyAvoidedCO2e);
    return yearlyAvoidedCO2e;
}

/**
 * Calculates the total yearly CO2e emissions from utility consumption (electricity, gas, and water).
 *
 * param: N/A This function retrieves all necessary values directly from the DOM.
 *
 * return: The total yearly CO2e emissions from utilities, in kg CO2e per year.
 **/
function calcUtilities() {
    //get the values from the inputs
    //get the location selected for sources
    //read the specific region's CO2e intensity for each utility type from the JSON file
    //convert the input into kg CO2e
    //add & return the total emissions

    //get the values from the inputs
    const timeframe = document.getElementById("utilities_timeframe").value;
    const kWh = parseFloat(document.getElementById("electricity").value) || 0;
    const m3Gas = parseFloat(document.getElementById("gas").value) || 0;
    const litersWater = parseFloat(document.getElementById("water").value) || 0;

    // Get country and region from the DOM
    const country = document.getElementById("country").value;
    const region = document.getElementById("region").value;

    //Convert inputs to yearly emissions
    const yearlykWh = convertToYearly(timeframe, kWh);
    const yearlyGas = convertToYearly(timeframe, m3Gas);
    const yearlyWater = convertToYearly(timeframe, litersWater);
    console.log(
        `Yearly kWh: ${yearlykWh}, Yearly Gas: ${yearlyGas}, Yearly Water: ${yearlyWater}`
    );
    //Get region's electricity, gas, and water CO2e intensities
    const regionInfo = regionData[country]?.regions?.[region];
    const electricityIntensity = regionInfo.gCO2e_kWh * 0.001;
    const electricityCO2e = yearlykWh * electricityIntensity;
    //TODO:Find gas and water intensities, put em in the JSON file 

    //Calculate water emissions: 
    // CO2e intensity for H2O = H2O energy intensity * electricity carbon intensity + 30 g/m^3 (additives)
    const yearlyM3Water = yearlyWater * 0.001;
    //I had to ask for user input as its highly local :( 
    // TODO: compile a list of water EI values for different regions
    const waterEI = parseFloat(document.getElementById("waterEI").value) || 0; 
    const waterCO2e = yearlyM3Water * (waterEI * electricityIntensity + 0.03);


    //const gasIntensity = regionData[country].regions[region].gas;
    //const waterIntensity = regionData[country].regions[region].water;
    //For now, use placeholder values of "0.5" for gas and "0.1" for water
    const gasIntensity = 0.5; // kg CO2e per m3
    const waterIntensity = 0.1; // kg CO2e per liter
    const gasCO2e = yearlyGas * gasIntensity; //TODO: THIS IS A PLACEHOLDER VALUE, DO NOT USE IT IN PRODUCTION


    const totalUtilityCO2e = electricityCO2e + waterCO2e + gasCO2e;
    return totalUtilityCO2e;
}

/**
 * Converts a given input value to its yearly equivalent based on a specified timeframe.
 *
 * param: timeframeElement The string indicating the timeframe of the input value (e.g., "weekly", "monthly").
 * param: inputValue The numeric value to be converted.
 *
 * return: The converted yearly equivalent of the input value.
 **/
function convertToYearly(timeframeElement, inputValue) {
    let yearlyEmissions = inputValue;
    if (timeframeElement === "weekly") {
        yearlyEmissions *= 52;
    } else if (timeframeElement === "monthly") {
        yearlyEmissions *= 12;
    }
    return yearlyEmissions;
}

/**
 * Updates the food footprint emissions based on the selected diet.
 *
 * param: N/A This function does not take direct parameters but retrieves the diet value from the DOM.
 *
 * return: N/A This function does not explicitly return a value, but it updates the 'emissions' variable internally.
 **/
function updateFoodFootprint() {
    const diet = document.getElementById("diet").value;
    let emissions = 0;
    switch (diet) {
        //TODO: do research about actual values
        case "high_meat":
        emissions = 40; //kg C02e per week
        break;
        case "average":
        emissions = 25; //kg C02e per week
        break;
        case "pescitarian_w_shrimp":
        emissions = 22; //kg C02e per week
        break;
        case "pescitarian_wo_shrimp":
        emissions = 18; //kg C02e per week
        break;
        case "vegetarian":
        emissions = 15; //kg C02e per week
        break;
        case "vegan":
        emissions = 12; //kg C02e per week
        break;
    }
}

/** CalcFootprint is the main fxn for calculating the footprint.
 *  It runs when the user presses the main calc footprint button.
 *  It calls other fxns for each sector before calling another fxn to output the data.
 * 
 * param: N/A
 * 
 * return: void
 **/
function calcFootprint() {
    //Verify that the user set enough data to calculate a footprint
    if (
        transportEntries.length === 0 ||
        dietEntries.length === 0 ||
        document.getElementById("utilities_timeframe").value === "" ||
        document.getElementById("country").value === "" ||
        document.getElementById("region").value === ""
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    transportCO2e = calcTransit();
    dietCO2e = calcDiet();
    // Water CO2e/L
    // Electricity CO2e/kWh
    // Gas CO2e/m3

    utilitiesCO2e = calcUtilities();
    console.log("Utilities CO2e: " + utilitiesCO2e);
    foodwasteCO2e = calcFoodWaste();
    compostAvoidedCO2e = calcCompostAvoided();

    const totalEmissions =
        transportCO2e +
        utilitiesCO2e +
        dietCO2e +
        foodwasteCO2e +
        compostAvoidedCO2e;
    document.getElementById("result").innerHTML = `
        <section class="result-section">
            Emissions from transportation: <span class="calc-value">${transportCO2e.toFixed(
                2
            )} kg CO₂e</span><br/>
            Emissions from utilities: <span class="calc-value">${utilitiesCO2e.toFixed(
                2
            )} kg CO₂e</span><br/>
            Emissions from food waste: <span class="calc-value">${foodwasteCO2e.toFixed(
                2
            )} kg CO₂e</span><br/>
            Emissions from extra composting: <span class="calc-value">${compostAvoidedCO2e.toFixed(
                2
            )} kg CO₂e</span><br/>
            Emissions from diet: <span class="calc-value">${dietCO2e.toFixed(
                2
            )} kg CO₂e</span><br/>
            <hr>
            <strong>Total carbon footprint: <span class="calc-value">${totalEmissions.toFixed(
                2
            )} kg CO₂e</span></strong>
        </section>
    `;
}

function getRegionData() {
// TODO: Implement a function to fetch and return region data
}

//Load & manage region CO2e emissions for utilities
let regionData = {};
window.addEventListener("DOMContentLoaded", () => {
fetch("./intensities.json")
    .then((response) => response.json())
    .then((data) => {
    regionData = data.countries;
    })
    .catch(error => console.log("Error loading the JSON:", error))
});

/**
 * Updates the region dropdown based on the selected country.
 *
 * param: N/A This function does not take direct parameters but retrieves values from the DOM.
 *
 * return: void
 **/
function updateRegions() {
    const countrySelect = document.getElementById("country");
    const regionSelect = document.getElementById("region");
    const selectedCountry = countrySelect.value;
    regionSelect.innerHTML = "";
    // Add each region to the dropdown
    const regions = regionData[selectedCountry].regions;
    Object.keys(regions).forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

/**
 * Fills various input fields and dynamic sections of the web page with test data.
 * This function is useful for quickly populating the form for testing purposes without manual entry.
 *
 * param: N/A 
 *
 * return: void
 **/
function fillTestData() {
    // Transport
    transportEntries = [];
    document.getElementById("transportEntriesContainer").innerHTML = "";
    addTransportEntry();
    const entry = transportEntries[0];
    updateTransportMode(entry.id, "car");
    updateTransportDistance(entry.id, 100);
    updateTransportFuel(entry.id, 10);
    document.querySelector(`#transport-${entry.id} input[type="number"]`).value = 100;
    document.querySelector(`#fuel-eff-${entry.id} input[type="number"]`).value = 10;

    // Diet
    dietEntries = [];
    document.getElementById("dietEntriesContainer").innerHTML = "";
    addDietEntry();
    const dietEntry = dietEntries[0];
    updateDietName(dietEntry.id, "U. N. Owen");
    updateDietType(dietEntry.id, "high_meat");
    updateDietCalories(dietEntry.id, 3900);
    document.querySelector(`#diet-${dietEntry.id} input[type="text"]`).value = "U. N. Owen";
    document.querySelector(`#diet-${dietEntry.id} select`).value = "high_meat";
    document.querySelector(`#diet-${dietEntry.id} input[type="number"]`).value = 3900;

    // Food Waste
    document.getElementById("trash-bread-h").value = 3;
    document.getElementById("trash-produce-h").value = 1;
    document.getElementById("trash-meat-h").value = 5;
    document.getElementById("compost-bread-h").value = 0;
    document.getElementById("compost-produce-h").value = 0;
    document.getElementById("compost-meat-h").value = 0;
    document.getElementById("trash-bread-oh").value = 0;
    document.getElementById("trash-produce-oh").value = 0;
    document.getElementById("trash-meat-oh").value = 0;

    // Utilities
    document.getElementById("utilities_timeframe").value = "monthly";
    updateTimeframe(document.getElementById("utilities_timeframe"));

    document.getElementById("electricity").value = 3000;
    document.getElementById("gas").value = 3;
    document.getElementById("water").value = 3000;
    document.getElementById("waterEI").value = 1;

    // Country and Region
    document.getElementById("country").value = "USA";
    updateRegions();

    // Delay region selection slightly to allow updateRegions() to populate the list
    setTimeout(() => {
    const regionSelect = document.getElementById("region");
    if (regionSelect.options.length > 1) {
        regionSelect.selectedIndex = 1; // Select the first actual region
    }
    }, 100); // May need to adjust this depending on region data load time
}

// TODO: Delete later
function testFunction(){
    console.log("Test function called");

    const buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.color = "red";
    }

    document.querySelectorAll("button").forEach(button => {
        button.style.backgroundColor = "black";
    });
    
    document.querySelectorAll("h2").forEach(item => {
        if(item.style.color === "gray") {
            item.style.color = "black";
        } else {
            item.style.color = "gray";
            item.style.backgroundColor = "lightgray";
        }
    });

    btns = document.querySelector("button").classList;
    console.log("Button classes: ", btns);
    btns.forEach(btn => {
        console.log("Button class: ", btn);
    }
    );

    document.querySelectorAll("button").forEach( btn => {
        console.log("this is another button:");
        console.log(btn);
    });

    document.querySelectorAll("h1").forEach(div => {
        div.classList.add("huge");
    });

    document.querySelectorAll("p").forEach(div => {
        if(div.classList.contains("invisible")) {
            div.classList.remove("invisible");
        }
        else {
            div.classList.add("invisible");
        }
    });

    document.querySelector("h1").innerHTML = "<em>Good Bye</em>";
    document.querySelector("p").setAttribute("href", "https://www.bing.com");
}