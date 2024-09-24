# Space Traders Web Application
## Overview
This project is a Space Traders web application built using React, TypeScript, and the Space Traders API. The app allows users to sign up or log in to manage their space trading journey, view contracts, access markets, shipyards, and mine resources, all while managing their agent's details such as credits and ships.

## Features
1. User Authentication:
- Users can sign up where they will be assigned a new token or sign in with an existing token.
- Tokens are stored in local storage and are used for API authentication.
- Automatic token verification on app launch.

2. Hub:
- Displays agent details (credits, headquarters, account ID).
- Users can refresh agent data.
- Users can refresh starting location data.

3. Contracts:
- Display contracts available for the agent. Users can refresh contract list
- Users can view contract details such as deadlines, payment terms, and delivery requirements.
- Contracts can be accepted via the UI.

## Project Structure
The project structure includes a Pages folder, which houses page-specific logic, styles, and testing to maintain organization for each individual page. Additionally, a Components folder to store reusable components that can be found across multiple pages, promoting code reuse and consistency throughout the application. Finally, there is an API folder, containing a dedicated file that manages all API calls interacting with the Space Traders API, ensuring a centralized approach to handling data requests and responses.

## Tech Stack
- React/TypeScript: Building the front-end components.
- SASS: Writing and organizing styles.
- React Router: Page navigation.
- Vite: Build tool.
- Vitest: Testing API requests and .tsx files.

## Error Handling/State Management
### Error Handling: 
Every API call uses a utility function `checkAPIResponse` to handle and log errors. API responses are checked for success, and appropriate errors are thrown and logged when API calls fail.
### State Management:
Local state management is handled using useState in components, with shared state (like token and agent details) managed in the `App.tsx` component and passed down as props. This ensures updates in one component reflect across others. States which are specific to a component are stored in the component itself.

## Performance/UX Considerations
- Token Persistence: Tokens are stored in localStorage to persist user sessions, reducing the need for repeated logins.
- API Requests: Data like agent details and contracts are cached in state after the first API call to avoid redundant requests when populating pages.

## Styling
The project uses SASS for styling. Each page has a corresponding .scss file, and shared styles are located in the index.scss file. SASS allows for better organization with styling variables, a single location for stylesheet imports, and co-located stylesheets with corresponding pages/components to keep the styling modular and maintainable.

## Installation and Setup
To run this project locally:

- Clone the repository: `git clone https://github.com/joshleecodes/stqs-main.git`

- Install dependencies: `npm ci` or `pnpm install`

- Run the app: `npm run dev` or `pnpm dev`

- Testing can be run using Vitest: `npm run test` or `pnpm test`

## Usage
1. Sign Up or Log In: Start by registering with a new agent symbol and faction, or log in using your existing API token.
2. Explore the Hub: Once logged in, the hub will display your agent details including account ID, and headquarters location. Users can also see their starting location.
- Users can refresh all Hub data.
3. Contracts: Navigate to the Contracts page to view available contracts. You can accept contracts to start fulfilling trade or delivery missions.
4. Market, Shipyard, and Mining: These sections allow you to interact with other game elements like purchasing items, ships, or gathering resources.

Once logged in, the header is visable on all pages which display information such as username (Users can copy their API token by clicking on username), credits, ship count. The header also provides app navigation to other pages.

## Future Development
- Further implmentation of pages such as Market, Shipyard, Mining to allow the user to interact with more features of the Space Traders API.
- Hub Improvments: A more comprehensive Hub that shows a general overview of agent activities in one place. For example active contracts, mining activity, ship details.
- Polling on pages such as the Hub to ensure up to date data.
- Limit API requests to prevent user spamming refresh buttons and protentially exceeding API request limitations.
- Testing for features/components to ensure behaviour is as predicted.
- Testing for API wrapper to ensures that the API wrapper behaves as expected, verifying both the success and failure states of the API interactions.
- Developing the `checkAPIResponse` function in spaceRaidersAPI to be more comprehensive.
- More secure way of storing API tokens.