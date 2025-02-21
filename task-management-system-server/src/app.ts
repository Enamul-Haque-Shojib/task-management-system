// import express, { Application } from "express";
// import cors from "cors";
// import taskRoutes from "./app/Modules/Task/Task.routes";

// const app: Application = express();

// app.use(cors());
// app.use(express.json());

// // Task routes
// app.use("/tasks", taskRoutes);

// export default app;


import express, { Application } from "express";
import cors from "cors";


import { Server } from "socket.io";
import http from "http";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

 const server = http.createServer(app);
    const io = new Server(server, {
      cors: { origin: ["http://localhost:5173"] },
    });

  app.use(
      cors({
        origin: ['http://localhost:5173'],
        credentials: true,
      }),
  );
app.use(express.json());

// Task routes
// app.use("/tasks", taskRoutes);
app.use('/api/', router);

app.use(globalErrorHandler);
app.use(notFound);

export {server, io};
