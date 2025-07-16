// --- A flag to easily enable/disable default data ---
export const USE_DEFAULT_DATA_FOR_TESTING = true; // Set to false to disable

// --- Default Data for Calculator Inputs ---
export const defaultCalculatorInputs = {
    // Transportation Section
    transport_timeframe: 'monthly', // weekly, monthly, yearly
    transportEntries: [
        { mode: 'car', distance: 500, fuelEfficiency: 8.5 }, // 500 km/month, 8.5 L/100km
        { mode: 'bus', distance: 150 }, // 150 km/month by bus
        { mode: 'train', distance: 300 } // 300 km/month by train
        // Note: bike and walk entries have 0 emissions, so less critical for testing calculation
    ],

    // Diet Section
    diet: 'vegetarian', // high_meat, average, pescitarian_w_s, pescitarian_wo_s, vegetarian, vegan

    // Food Waste Section
    foodwaste_timeframe: 'weekly', // weekly, monthly, yearly
    trash: {
        bread: 0.5, // kg thrown away weekly
        produce: 1.2,
        meat: 0.3
    },
    compostHousehold: { // Renamed to match the label in your HTML
        bread: 0.2, // kg composted weekly from household
        produce: 0.8,
        meat: 0.1
    },
    compostOutsideHousehold: { // Renamed to match the label in your HTML
        bread: 0.1, // kg composted weekly from outside household
        produce: 0.3,
        meat: 0.05
    },

    // Utilities Section
    utilities_timeframe: 'monthly', // weekly, monthly, yearly
    electricity: 350, // kW per month
    gas: 50, // m3 per month
    water: 8000, // liters per month
    waterEI: 0.5, // kWh for 1 m^3 of water (example value)
    country: 'USA', // USA, CAN, MEX, TAI, NET
    region: 'Illinois', // Specific region within the country (will be updated dynamically)
};

// You can add other types of default data here if needed for future sections
// For example, if you implement Appliances, Electronics, Furniture, Cars sections:
/*
export const defaultApplianceData = [
    // ...
];
export const defaultElectronicData = [
    // ...
];
export const defaultFurnitureData = [
    // ...
];
export const defaultCarData = [
    // ...
];
*/
