# Real-Time Cursor Tracker

Real-Time Cursor Tracker is an innovative test project designed to track the cursor movements of connected users in real-time using WebSockets. The project is structured as a monorepo, consisting of a web application and a server.

![Real-Time Cursor Tracker Example](https://i.imgur.com/QSeFg3z.gif)

## Features
- **Real-time Cursor Movement**: View live cursor movements of any connected user.
- **NextJS**: For server-side rendering and optimal frontend performance.

## Project Structure
- `apps/web`: Contains the NextJS frontend application.
- `apps/server`: Houses the ExpressJS server.

### Server Endpoints
- **GET /**: To check the server's liveliness.
- **GET /users_connected**: Retrieve information on connected users and their cursor positions.

## Getting Started

### Prerequisites
1. Ensure you have [Yarn](https://yarnpkg.com/) installed.
2. Clone this repository:
   ```
   git clone https://github.com/Felipstein/simplerepo.git
   ```

## Setup & Running with Monorepo Scripts

You can build and run both the web and server applications using the monorepo's central scripts.

1. Install the dependencies:
   ```
   yarn
   ```

2. Create the necessary environment files as specified in the web and server READMEs.

3. Build both projects with a single command:
   ```
   yarn build
   ```

4. Start both the web application and the server simultaneously:
   ```
   yarn start
   ```

Access the web application at `http://localhost:3000` and the server at `http://localhost:3333`.

### Monorepo Scripts

Here are the scripts that allow you to build and run both parts of the project efficiently:

```json
{
    "build": "yarn build:server && yarn build:web",
    "build:server": "yarn workspace @simplerepo/server build",
    "build:web": "yarn workspace @simplerepo/web build",
    "start": "concurrently \"yarn start:server\" \"yarn start:web\"",
    "start:server": "yarn workspace @simplerepo/server start",
    "start:web": "yarn workspace @simplerepo/web start"
}
```

---

Happy tracking! If you find any issues or have suggestions, please open an issue or submit a pull request.

---
