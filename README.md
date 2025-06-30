# Carbon-footprint-calculator
# Current Progress
This is a bare HTML carbon footprint calculator.
In the carbon footprint calculator, you can input your lifestyle for a typical week, month or year. Then, the calculator outputs your yearly carbon footprint.
Check it out with this link: https://electricwapiti.github.io/Carbon-footprint-calculator/

## Goal:
My goal is to completely rework this website so it can be used throughout the world, has accurate data on carbon intensity of electricity, & looks modern.

## Stack:
Frontend framework: React with Material Design 3 via MUI
Localization: Use i18next for internationalization and localization.
User locale/currency detection: Use Intl.Locale, navigator.language, and Intl.NumberFormat to get language and currency.
Visualization: Use Chart.js for pie charts and comparisons
Domain: Buy via Google Domains, Cloudflare or namecheap. Buy footprintcalc.com ($10/year)
Design: Google Material Design. Use MUI with Material 3 mode.

# Features:
## Measurement system support:
Add a US Customary toggle that starts in metric for US locales. Hide this from people outside the US as it's embarrassing XD.
TODO: Find locale of user.
TODO: Find if locale is in US.
TODO: Build toggle.
TODO: Add US Customary support in calculations and user input.
TODO: Set the UI to use US customary if the toggle is selected. Change calculations as necessary.


## Language support:
Guess language with locale, but provide a way to change the language if the person using my website doesn't want to view the content in the dominant language of their locale.
TODO: Find locale of user.
TODO: Find dominant language of locale.
TODO: Write translations for the ten-twenty most used languages with i18next.
TODO: Add dropdown menu for user selection of language.
TODO: Set language on UI to guessed language or manually selected language.


## Currency support:
Guess currency with locale, but provide a way to change the currency if the person using my website doesn't want to input currency in the dominant currency of their locale.
TODO: Find locale of user.
TODO: Find dominant currency of locale.
TODO: Add dropdown menu for user selection of currency.
TODO: Set currency on UI to guessed currency or manually selected currency.

## GHG footprint modelling:

Transport (car, flights)    --- Car done, TODO: flights
Energy (home electricity/gas) --TODO: Electricity (factor in location's carbon intensity with JSON first, then Electricity Maps API call later)
Diet (meat vs veg, dairy, etc.) - TODO: break it up into "how much ___ do you eat per week? Make a dropdown menu for each type.
Purchases (electronics, fashion) --TODO: Dropdown menu for how often you buy certain new electronics (phone, computer, tv, etc.) as well as how many extra electronic devices you buy annually.
                                -- TODO: Dropdown menu for how much clothing & shoes you buy per year


## Carbon offset modelling:
TODO: Ask how much user offsets their emissions already if they know the amount.
TODO: Research carbon offset charities and their effectiveness per USD.
TODO: Change that data to be displayed the right currency guessed by locale or selected by user.
TODO: Allow user to type in an amount per year given to each of the charities I curate.

## Recalculate with cuts: 
I want to allow user to edit their choices. When they recalculate it, I'll give them a % change from the baseline and output a congratulatory note if it's in the direction that lowers emissions as compared to the baseline first calculation.
TODO: Store the first carbon footprint for each user.
TODO: Output the difference between current selections and the first selections.

## Visualization:
TODO: Graph a pie chart with Chart.js. The area of the pie is linearly proportional to the size of the footprint.
TODO: Collect data to make pie charts of the average GHG emissions in each sector for members of each rough income level in each major country. Fall back to the average GHG emissions per household if the country isn't included in the income stratifications in the json file I make. Incomes: {$0-1000, $1,000-$5000, $5000-$20,000, $20,000 - $50,000, $50,000-$100,000, $100,000-$250,000, $250,000-$1,000,000, $1,000,000-$10,000,000, $10,000,000+}
TODO: Compare user's footprint to their baseline footprint.
TODO: Add a set of two dropdown menus to allow the user to compare their emissions to the average of a certain income level in a certain country.

# Development Plan
## MVP (done by July 15th):
Metric-only.
English-only.
Core categories: transport, electricity, diet.
Static JSON for emissions factors.
Basic pie chart.
Buy footprintcalc.com for $10/yr.

## Incremental Releases:
<br>Phase 2: July 17th: Add flights, purchases, & offset textbox if user knows offset amount.
Phase 3: July 19th: Make it global. Measurement system support, language support and currency support.
Phase 4: July 24th: Add local comparisons, Electricity Maps API, and offset integration.
Phase 5: July 28th: Add footprint reduction analysis and debug major issues.
Phase 6: July 30th: Buy Railway for the website for $5/mo and deploy the website so anyone worldwide can use it.
