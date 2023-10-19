## Real-Time Cursor Tracker - Server

The backend server for the Real-Time Cursor Tracker, built using ExpressJS and WebSockets, ensures efficient tracking and retrieval of live cursor movements.

### Endpoints

- **GET /**: Health check endpoint to verify server status.
- **GET /users_connected**: Fetches details of connected users and their cursor positions.

### Setup & Running

1. Install the dependencies:
   ```bash
   yarn
   ```

2. Create a `.env` file in the root of the `server` directory. Specify the desired port and origin:
   ```bash
   PORT=[YOUR_PORT]
   ORIGIN=[YOUR_ORIGIN]
   ```

3. Build the project:
   ```bash
   yarn build
   ```

4. Start the server:
   ```bash
   yarn start
   ```

5. By default, access the server at: `http://localhost:3333`
