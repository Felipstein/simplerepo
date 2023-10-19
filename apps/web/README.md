## Real-Time Cursor Tracker - Web

The web frontend of the Real-Time Cursor Tracker allows you to visualize the cursor movements of connected users in real-time, leveraging the power of NextJS, WebSockets, TailwindCSS, and Shadcn UI.

Powered by NextJS.

### Features

- **Real-time Visualization**: See the cursor movements of users as they happen.
- **Server-Side Rendering**: Utilizes NextJS for optimal performance and SEO benefits.

### Setup & Running

1. Install the dependencies:
   ```bash
   yarn
   ```

2. Create a `.env.local` file in the root of the `web` directory. Specify the server's URL:
   ```bash
   NEXT_PUBLIC_SERVER_URL=[YOUR_SERVER_URL]
   ```

3. Build the project:
   ```bash
   yarn build
   ```

4. Start the application:
   ```bash
   yarn start
   ```

5. Access it at: `http://localhost:3000`
