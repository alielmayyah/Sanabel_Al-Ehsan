import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db_connection";
import { Request, Response, NextFunction } from "express";
// Import routes
import { router as user_route } from "./routes/user_routes";
import { router as student_route } from "./routes/student_routes";
import { router as organization_routes } from "./routes/organization_routes";
import { router as class_routes } from "./routes/class_routes";
import { router as teacher_routes } from "./routes/teacher_routes";
import { router as parent_route } from "./routes/parent_routes";

dotenv.config();
// Define CORS options
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    callback(null, true);
  },
};

const app = express();
const PORT = process.env.SERVER_PORT;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.use("/users", user_route);
app.use("/students", student_route);
app.use("/organization", organization_routes);
app.use("/parents", parent_route);

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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err instanceof Error ? err.message : JSON.stringify(err),
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  await connectToDb();
});
