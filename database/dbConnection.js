import mongoose from "mongoose";

 export const dbConnection =()=>{ 
    mongoose.connect(process.env.MONGO_URI
    ,{
        dbName:"HOSPITAL_APPOINTSYSTEM"
    }).then(()=>{
       console.log("Connecting to the database is done")
    }).catch(err=>{
        console.log(`Error while connecting at the database: ${err}`)
    })
};