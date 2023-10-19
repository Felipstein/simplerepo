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

### Web
1. Navigate to the web directory:
   ```
   cd apps/web
   ```

2. Install the dependencies:
   ```
   yarn
   ```

3. Create a `.env.local` file in the root of the web directory. Specify the server's URL:
   ```
   NEXT_PUBLIC_SERVER_URL=[YOUR_SERVER_URL]
   ```

4. Build the project:
   ```
   yarn build
   ```

5. Start the web application:
   ```
   yarn start
   ```

6. Access the web application at: `http://localhost:3000`

### Server
1. Navigate to the server directory:
   ```
   cd apps/server
   ```

2. Install the dependencies:
   ```
   yarn
   ```

3. Create a `.env` file in the root of the server directory. Specify the port and origin:
   ```
   PORT=[YOUR_PORT]
   ORIGIN=[YOUR_ORIGIN]
   ```

4. Build the project:
   ```
   yarn build
   ```

5. Start the server:
   ```
   yarn start
   ```

6. Access the server at: `http://localhost:3333`

---

Happy tracking! If you find any issues or have suggestions, please open an issue or submit a pull request.

--- 
