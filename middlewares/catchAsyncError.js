// function ko accept kr raha hia
export const catchAsyncError = (thefunction)=>{
    // ab hm return kra rahe hai function ke andar ki sari value agar error aaye vo catch handle kr lega
    return(req,res,next)=>{
     Promise.resolve(thefunction(req,res,next)).catch(next);
    }
}