const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const globalErrorHandler = require("./utils/globalErrorHandler");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: [
        process.env.LOCAL_CLIENT,
        process.env.CLIENT,
    ],
    credentials: true
}));
app.use(express.json());





app.get("/soulMate", (req, res) => {
    res.send("soulMate is running....");
});


// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
});

// error handling middleware
app.use(globalErrorHandler);



(async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Soulmate  Server is running on port ${port}`);
    });
})()