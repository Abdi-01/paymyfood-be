const { join } = require("path");
require("dotenv").config({ path: join(__dirname, ".env") });
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(bearerToken());
// #destination file storage(image/pdf/document)
app.use("/", express.static(__dirname + "/src/public"));

// DB Check Connection

app.get("/", (req, res) => {
    res.status(200).send("<h1>PAYMYFOOD V1.0</h1>");
});

// Routing Config
const userRouter = require("./src/routers/userRouter");
const productRouter = require("./src/routers/productRouter");
const categoryRouter = require("./src/routers/categoryRouter");
const tableRouter = require("./src/routers/tableRouter");
const transactionRouter = require("./src/routers/transactionRouter");
const orderRouter = require("./src/routers/orderRouter");
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/table", tableRouter);
app.use("/transaction", transactionRouter);
app.use("/order", orderRouter);

// Error Handling
app.use((err, req, res, next) => {
    // Error handling middleware functionality
    console.log(err); // log the error
    const status = err.status || 500;
    // send back an easily understandable error message to the caller
    res.status(status).send(err);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(`ERROR:`, err);
    } else {
        console.log(`APP RUNNING at ${PORT} ✅`);
    }
});
