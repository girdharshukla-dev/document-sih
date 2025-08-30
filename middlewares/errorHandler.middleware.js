export const errorHandler = (err , req , resp, next)=>{
    console.log(err.stack);
    return resp.status(err.status || 500).json({
        success : false,
        message : err.message || "Internal server error" 
    })
}
