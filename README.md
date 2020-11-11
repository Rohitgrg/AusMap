## Map of Australia with population data in it's significant urban areas

#### Description:

Significant Urban Areas by population

An application used to show data of Significant Urban Areas by population in Australia, built with React and leaflet.

## Project Status

Completed - Submitted - Awaiting Feedback

## Installation and Setup Instructions

#### Example:

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

You can download node from: `https://nodejs.org/en/download/current/`

Installation:

`yarn install`

To Start Server:

`yarn start`

To Visit App:

`localhost:3000/`

## Features:

- Zooming in will hide the population in percentage by state and show the location of the significant urban areas.
- Location marker's can be clicked to see the name of the location and its populaton.
- The Markers will be red if the population is more than 1.5 million and it will be green if it is under
- The circle at the bottom of the marker will be bigger in correspond to the population of the area.

## Assumptions:

- Instead of the marker being Red, it was attempted to make the geographical area red, however, some of the areas intersected with different cities and data on the exact geographical bounds were not available which led to the current solution of the marker being Red or green with respect to the population of the area.
- Data of states and cites such as their latitude and longitude were stored in a json file rather than fetching it from external apis for the following reasons

* most of the api services such as "google map api" needed account creation
* api calls were limited per day
* to run it on other devices needed me to share my api token which was non-ethical

## Dependencies:

- Leaflet was used mapping features. It was chosen against famous mapping services such as google and mapbox because it is free and open source.
