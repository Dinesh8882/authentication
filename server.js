import app from "./src/app.js";
import dotenv from 'dotenv'
import connectedDB from "./src/db/db.js";

dotenv.config()

const PORT = process.env.PORT || 3000

connectedDB()

app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`);
})