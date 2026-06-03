import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Live Leaderboard API",
      version: "1.0.0",
      description:
        "REST API for a Live Leaderboard application built using Node.js, Express, MongoDB, and Redis.",
      contact: {
        name: "Ajay Thakur",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5050}`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
