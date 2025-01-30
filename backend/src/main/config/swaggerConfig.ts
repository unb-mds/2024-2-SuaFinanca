import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the project",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
      {
        url: "https://your-app-name.onrender.com",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/**/*.ts"], // Caminho para os arquivos que contêm as anotações JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
