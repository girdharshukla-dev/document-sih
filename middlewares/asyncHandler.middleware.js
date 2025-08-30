export const asyncHandler = fn => (req , resp , next) =>{
    Promise.resolve(fn(req,resp,next)).catch(next);
}