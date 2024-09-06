import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors'

require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Backend nodejs is running on the port: " + port)
});