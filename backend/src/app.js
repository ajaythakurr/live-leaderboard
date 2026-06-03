import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import userRoutes from "./routes/user.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Live LeaderBoard API Running..."
    });
});


//Routes
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);


//404 handler
app.use((req,res)=>{
    res.status(404).json({
        success: false,
        message: "route not found..."
    });
});

//Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
