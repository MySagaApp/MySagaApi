const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

app.use("/users",userRoutes)

app.get("/",(req,res)=>{
    res.send("API STARTS")
});

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{

    app.listen(PORT,()=>{
        console.log("server start at "+PORT);
    });
})
.catch((error)=>{
    console.log(error);
});

