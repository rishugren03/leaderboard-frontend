# Leaderboard Frontend

This is the frontend for the Leaderboard application, built with React Native and Expo.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo Go](https://expo.dev/client) app on your iOS or Android device (for physical device testing)

## Installation

1.  Clone the repository (if you haven't already).
2.  Navigate to the `leaderboard-frontend` directory:
    ```bash
    cd leaderboard-frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Running the App

To start the development server, run:

```bash
npm start
```

This will start Metro Bundler. You can then:

-   **Run on Android:** Press `a` in the terminal (requires Android Studio/Emulator or a connected device with Expo Go).
-   **Run on iOS:** Press `i` in the terminal (requires Xcode/Simulator or a connected device with Expo Go).
-   **Run on Web:** Press `w` in the terminal.
-   **Scan QR Code:** Scan the QR code shown in the terminal with the Expo Go app on your phone.

## Project Structure

-   `App.tsx`: Main entry point of the application.
-   `app.json`: Configuration for Expo.
-   `components/`: Reusable UI components.
-   `screens/`: Application screens.
-   `api/`: API integration services.
-   `types/`: TypeScript definitions.
-   `assets/`: Images and other static assets.

## Scripts

-   `npm start`: Starts the Expo development server.
-   `npm run android`: Starts directly on Android.
-   `npm run ios`: Starts directly on iOS.
-   `npm run web`: Starts directly on valid web.

## Technologies Used

-   React Native
-   Expo
-   TypeScript
-   React Navigation

## License

[MIT](LICENSE)
