# Campus Study Room Finder

Campus Study Room Finder is a modern React application for discovering and requesting study rooms across campus buildings. It demonstrates a clean, filter-driven interface with simulated availability and a responsive, mobile-friendly layout.

## Project overview

This app helps students and staff browse study spaces by building, capacity, and room features. Users can select a date and time range, then view only rooms that are available based on deterministic client-side availability rules. Room details can be opened in a modal, and booking requests are simulated with a front-end confirmation.

## Key features

- Search and filter rooms by building, capacity, and feature set
- Select a date, start time, and end time to view available rooms
- Deterministic availability simulation for example scheduling behavior
- Room detail modal with booking request flow
- Responsive layout for desktop and mobile screens
- Clean UI with accessible interactive elements

## Technology stack

- React
- TypeScript
- Vite
- ESLint

## Application architecture

The application is structured as a small component-driven SPA:

- `App.tsx` — Main entry point. Manages application state, filters, availability rules, room selection, and booking simulation.
- `RoomFilters.tsx` — Filter panel. Handles building, capacity, and feature selections, then reports changes back to the parent.
- `RoomDetails.tsx` — Modal card for selected room details. Displays room metadata and booking action controls.
- `rooms.ts` — Mock room dataset and `StudyRoom` type definition.
- `main.tsx` — Bootstraps the React application.

Data flow is top-down: `App.tsx` owns the primary state and passes rooms and callbacks into child components. Filter changes are computed in `App.tsx`, and available rooms are derived through reusable helper functions.

## How availability is simulated

Availability is simulated entirely on the client side with deterministic rules in `App.tsx`.

The app evaluates each room against the selected date/time range using simple conditions such as:

- early-morning restrictions for library rooms
- afternoon restrictions for engineering hall rooms
- odd-day availability rules for science center rooms
- after-hours restrictions for business school rooms

These rules are intentionally simple so the application can demonstrate availability filtering without a backend schedule service.

## Install and run locally

```bash
cd campus-study-rooms
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, typically `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Folder structure

```text
campus-study-rooms/
├── public/              # Static assets
├── src/
│   ├── App.tsx          # Application root and page layout
│   ├── App.css          # App styling and responsive layout
│   ├── RoomFilters.tsx  # Room filter panel component
│   ├── RoomDetails.tsx  # Room details modal component
│   ├── rooms.ts         # Sample room data and type definitions
│   ├── index.css        # Global base styles
│   └── main.tsx         # React application bootstrap
├── package.json         # Project scripts and dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## Future enhancements

Potential improvements include:

- Add real backend availability and booking APIs
- Persist user selections and booking history
- Add search keywords and advanced filtering
- Support room thumbnails or building maps
- Implement user authentication and role-based access
- Add calendar integration and booking reminders

## Contribution guidelines

Contributions are welcome. If you want to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Add your changes and update any relevant documentation.
4. Run `npm run lint` and verify the app with `npm run dev`.
5. Open a pull request with a clear summary of the change.

Keep contributions small and focused. Prefer readable TypeScript and consistent styling.

## License

This repository is provided as example code. Add a license here when the project is published.
