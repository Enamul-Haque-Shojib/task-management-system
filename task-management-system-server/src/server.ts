

// import mongoose from "mongoose";

// import config from "./app/config";


// import { io, server } from "./app";
// import { TaskModel } from "./app/Modules/Task/Task.model";


// async function main() {
//   try {
//     mongoose.set("debug", true);
//     await mongoose.connect(config.database_url as string);
//     console.log("Connected to MongoDB");

//     const taskStream = TaskModel.watch();
//     taskStream.on("change", (change) => {
//       io.emit("taskUpdated", change);
//     });

//     io.on("connection", (socket) => {
//       console.log("Client connected");
//       socket.on("disconnect", () => console.log("Client disconnected"));
//     });

//     server.listen(config.port, () => {
//       console.log(`Server running on port ${config.port}`);
//     });

//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// main();



// import mongoose from "mongoose";

// import config from "./app/config";

// import Task from "./app/Modules/Task/Task.model";
// import { io, server } from "./app";


// async function main() {
//   try {
//     mongoose.set("debug", true);

//     await mongoose.connect(config.database_url as string);
//     console.log("Connected to MongoDB");

//     function watchTasks() {
//       const taskStream = Task.watch();

//       taskStream.on("change", (change) => {
//         io.emit("taskUpdated", change);
//       });

//       taskStream.on("error", (error) => {
//         console.error("Change Stream Error:", error);
//         console.log("Restarting Change Stream...");

//         setTimeout(() => {
//           watchTasks(); // Restart the stream after a delay
//         }, 5000);
//       });
//     }

//     watchTasks(); // Start watching tasks

//     io.on("connection", (socket) => {
//       console.log("Client connected");
//       socket.on("disconnect", () => console.log("Client disconnected"));
//     });

//     server.listen(config.port, () => {
//       console.log(`Server running on port ${config.port}`);
//     });

//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }


// main();


import mongoose from "mongoose";
import config from "./app/config";
import { io, server } from "./app";
import { TaskModel } from "./app/Modules/Task/Task.model";

async function main() {
  try {
    // mongoose.set("debug", true);
    await mongoose.connect(config.database_url as string);
    console.log("✅ Connected to MongoDB");

    // Watch MongoDB for real-time changes
    const taskStream = TaskModel.watch();
    taskStream.on("change", (change) => {
      console.log("🟢 MongoDB Change Event:", change);
      io.emit("taskUpdated", change);
    });

    io.on("connection", (socket) => {
      console.log("⚡ Client connected:", socket.id);
      socket.on("disconnect", () => console.log("❌ Client disconnected"));
    });

    // Start the server
    server.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

main();







