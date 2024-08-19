# Pokémon App

This project is a single-page React application that lists Pokémon using the PokeAPI. It allows users to search, filter, and paginate through Pokémon. Clicking on a Pokémon opens a modal displaying detailed information about the selected Pokémon. The project uses React 18, Redux for state management, Axios for network requests, and Ant Design for UI components.

## Features Implemented

- **Pokémon Listing**: Displays a list of Pokémon with pagination. Supports searching and filtering Pokémon by name. Pokémon cards are displayed with proper alignment and spacing.
- **Pagination**: Allows users to navigate through Pokémon pages with options for 10, 20, or 30 Pokémon per page.
- **Search Functionality**: Provides a search field to filter Pokémon by name.
- **Modal**: Displays detailed information about a selected Pokémon, including its image, height, weight, and base experience. Shows a loading spinner while fetching Pokémon details and handles errors gracefully.

## Project Setup

### Clone the Repository


git clone https://github.com/yucelozalp/sisal-pokemon-app.git
cd pokemon-app

### Install Dependencies

npm install

### Start the Development Server


This command starts the development server and opens the application in your default browser. The application will be available at [http://localhost:3000](http://localhost:3000).

## Running Tests

### Run Unit Tests

npm test

This command runs the unit tests for the project using Jest and React Testing Library. It will check the functionality of components like `PokemonList` and `PokemonModal`.

### Test Coverage

To check the test coverage, use:

npm test -- --coverage

## File Structure

- **`src/`**: Contains all the source code.
  - **`components/`**: Contains React components including `PokemonList.jsx`, `PokemonModal.jsx`, `Search.jsx`, and `Pagination.jsx`.
  - **`redux/`**: Contains Redux slices and store configuration.
  - **`services/`**: Contains API service functions like `pokemonService.js`.
  - **`App.jsx`**: Main application component.
  - **`index.js`**: Entry point for React, sets up the application and renders it to the DOM.

## Key Code Sections

### `index.js`

This file sets up the React application and renders it to the DOM using `ReactDOM.createRoot` for React 18 compatibility.

### `PokemonList.jsx`

Handles fetching, searching, filtering, and displaying Pokémon. Integrates pagination and manages user interactions.

### `PokemonModal.jsx`

Fetches and displays detailed information about a selected Pokémon. Displays a loading spinner and handles errors.

### `PokemonList.css` and `PokemonModal.css`

Contains custom CSS for styling Pokémon cards, pagination, and modal spinner.
