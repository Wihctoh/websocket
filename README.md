# WebSocket Chat Application

A real-time chat application built with WebSocket technology, featuring a TypeScript-based frontend and backend.

## Technologies Used

### Frontend

- TypeScript
- React
- Vite
- Mantine UI
- WebSocket client

### Backend

- TypeScript
- Express.js
- MongoDB
- WebSocket server

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/Wihctoh/websocket.git
cd websocket
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV = project_mode
PORT = our_port_number
MONGODB_URI = your_mongodb_connection_string
```

4. Start the backend server for dev mode:

```bash
npm run dev
```
or start for production mode

```bash
npm run build
npm run start
```

### Frontend Setup

1. Navigate to the client directory from the project root:

```bash
cd ..
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the client directory with the following variable:

```env
VITE_BASE_URL = your_server_url
VITE_WS_BASE_URL = your_websocket_server_url
```

4. Start the frontend application:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Usage

Once both the frontend and backend servers are running, you can:

- Open the application in your browser
- Start chatting in real-time with other connected users
- Experience instant message delivery through WebSocket connection

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
