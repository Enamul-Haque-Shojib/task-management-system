
// import express, { Application } from "express";
// import cors from "cors";


// import { Server } from "socket.io";
// import http from "http";
// import globalErrorHandler from "./app/middlewares/globalErrorhandler";
// import notFound from "./app/middlewares/notFound";
// import router from "./app/routes";

// const app: Application = express();

//  const server = http.createServer(app);
//     const io = new Server(server, {
//       cors: { origin: ["http://localhost:5173"] },
//     });

//   app.use(
//       cors({
//         origin: ['http://localhost:5173'],
//         credentials: true,
//       }),
//   );
// app.use(express.json());

// // Task routes
// // app.use("/tasks", taskRoutes);
// app.use('/api/', router);

// app.use(globalErrorHandler);
// app.use(notFound);

// export {server, io};



import express, { Application } from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
const server = http.createServer(app);

// Allow frontend domains for WebSocket & API
const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://task-management-system-89c6e.web.app", // Firebase hosted frontend

];

const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true },
});

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use("/api/", router);
app.use(globalErrorHandler);
app.use(notFound);

export { server, io };

