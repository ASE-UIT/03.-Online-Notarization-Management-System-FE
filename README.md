## CongChungOnline Frontend

This repository contains the frontend code for **CongChungOnline**, a platform for online notarization services that leverages blockchain and NFT for document storage. This frontend interacts with the provided backend to facilitate the user experience.

## Features

- **User Authentication:** Users can sign in or register to access platform services.
- **Notarization Profile Creation:** Users can create a notarization profile to store their document information.
- **Notarization Service & Field Selection:** Users can choose the appropriate notary service and field for their documents.
- **Document Upload:** Users can upload their documents for notarization.
- **Session Creation:** Users can create sessions to notarize multiple documents together.
- **Notarization Status Tracking:** Users can track the progress of their notarization requests.
- **User Guide:** Provides detailed instructions and visual guidance for using the platform.
- **Responsive Design:** Ensures a seamless user experience across different devices.

## Technologies

- **Frontend:** React, Material-UI, React Router, React Intersection Observer, React Toastify
- **State Management:** Redux Toolkit
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint, Prettier
- **Version Control:** Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ASE-UIT/congchungonline-fe.git
   cd congchungonline-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Copy the `.env.example` file to `.env` and update the values as needed.

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Environment Variables

```bash
# Backend API base URL
REACT_APP_API_BASE_URL=http://localhost:3000
```

## Running the Application

1. Make sure the backend is running.
2. Run `npm start` to start the development server.
3. The application will be accessible at `http://localhost:3000`.

## Testing

To run the unit tests:

```bash
npm run test
```

## Contribution

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.
```
