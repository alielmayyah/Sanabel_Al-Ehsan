import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
require("dotenv").config();
import { sequelize, connectToDb, rundb } from "./config/db_connection";

// Define CORS options
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    callback(null, true);
  },
};

// Import routes
const user_route = require("../src/routes/user_routes");
const student_route = require("../src/routes/student_routes");
const organization_routes = require("../src/routes/organization_routes");
const class_routes = require("../src/routes/class_routes");
const teacher_routes = require("../src/routes/teacher_routes");
const app = express();
const PORT = process.env.SERVER_PORT;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.use("/users", user_route);
app.use("/students", student_route);
app.use("/organization", organization_routes);
app.use("/class", class_routes);
app.use("/teachers", teacher_routes);

app.get("/", (req, res) => {
  res.send("welcome snable");
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Snable Elahssan API",
      version: "1.0.0",
      description: "API documentation for Snable Elahssan project",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Adjust the path based on your folder structure
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  await connectToDb();
});
