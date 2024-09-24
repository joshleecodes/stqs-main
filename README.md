# Space Traders Web Application
## Overview
This project is a Space Traders web application built using React, TypeScript, and the Space Traders API. The app allows users to sign up or log in to manage their space trading journey, view contracts, access markets, shipyards, and mine resources, all while managing their agent's details such as credits and ships.

## Features
1. User Authentication:
- Users can sign up where they will be assigned a new token or log in with an existing token.
- Tokens are stored securely in local storage and are used for API authentication.
- Automatic token verification on app launch (token persistence).

2. Hub:
- Displays agent details (credits, headquarters, account ID).
- Users can refresh agent data from the Space Traders API.
- Users can refresh starting location data from the Space Traders API.

3. Contracts:
- Fetch and display contracts available for the agent.
- Users can view contract details such as deadlines, payment terms, and delivery requirements.
- Contracts can be accepted via the UI.

## Project Structure
- Pages folder: Contains page-specific logic, styles and testing.
- Components folder: Contains reusable components found on multiple pages.
- API wrapper: Dedicated file for API calls interacting with the Space Traders API.

## Technologies and Libraries
- React with TypeScript: For building the front-end components.
- SASS: For writing and organizing styles.
- React Router: For page navigation.
- Vite: As the build tool.
- Vitest: For testing the API requests.

## Error Handling/State Management
### Error Handling: 
Every API call uses a utility function `checkAPIResponse` to handle and log errors. API responses are checked for success, and appropriate errors are thrown and logged when API calls fail.
### State Management:
Local state management is handled using useState in components, with shared state (like token and agent details) managed in the `App.tsx` component and passed down as props. This ensures updates in one component reflect across others.

## Performance Considerations
- Token Persistence: Tokens are stored in localStorage to persist user sessions, reducing the need for repeated logins.
- API Requests: Data like agent details and contracts are cached in state after the first API call to avoid redundant requests when populating pages.

## Testing
API calls in the project are tested using Vitest. This ensures that the API wrapper behaves as expected, verifying both the success and failure states of the API interactions.

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
2. Explore the Hub: Once logged in, the hub will display your agent details including account ID, credits, ship count, and headquarters location.
3. Contracts: Navigate to the Contracts page to view available contracts. You can accept contracts to start fulfilling trade or delivery missions.
4. Market, Shipyard, and Mining: These sections allow you to interact with other game elements like purchasing items, ships, or gathering resources.

## Future Enhancements
Here are some features that can be added to improve the app:

- Further implmentation of pages such as Market, Shipyard, Mining to allow the user to interact with more features of the Space Traders API.
- Hub Improvments: A more comprehensive Hub that shows a general overview of agent activities in one place. For example active contracts.
- Polling on pages such as the Hub to ensure up to date data.
- Limit API requests to prevent user spamming refresh buttons and protentially exceeding API request limitations.
- More extensive testing of features and components.
