## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/nhatlinhle/Core-NodeJS.git
cd Core-NodeJS
npm install
```
```
Copy .env.example to .env and set config your local
```
Run local:
```bash
npm run dev
```

## Folder Structure
```
src\
  |--config\         # Environment variables and configuration-related things
  |--constants\      # Contansts
  |--controllers\    # Route controllers (controller layer)
  |--interfaces\     # Interfaces for typed
  |--exceptions\     # Error Handlers
  |--listeners\      # Listener event for real-time
  |--loaders\        # Loading environments (DB, Socket, ...)
  |--locales\        # Multiple languages
  |--middlewares\    # Custom express middlewares
  |--models\         # Mongoose models (data layer)
  |--routes\         # Routes
  |--services\       # Business logic (service layer)
  |--utils\          # Utility classes and functions
  |--uploads\        # Save files uploaded or use the cloud
  |--validations\    # Request data validation schemas
  |--index.ts        # App entry point
  tests\
  |--unit            # Files test for unit test
```
