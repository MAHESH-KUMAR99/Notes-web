const moongoose =require("mongoose");

const MONGO_URI = "mongodb+srv://mk766263:mahesh987@cluster0.xhewhnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
    const connection = await moongoose.connect(MONGO_URI);
    if (connection) console.log("Database connected");
    else console.log("Database connection failed");
}

module.exports = {
    connectDB
}