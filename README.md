# Welcome to our Student Portal

## Starting the client

```bash
cd client
npm install
npm run dev
```

## Starting the server

```bash
cd server
npm install
npm run dev
```

## Environment variables

### Client

- `NEXT_PUBLIC_API_URL`: URL of the API server (default: `http://localhost:5000/api`)

### Server

- `PORT`: Port to listen on (default: `5000`)
- `MONGO_URI`: MongoDB connection string (default: `mongodb://localhost:27017/student-portal`)
