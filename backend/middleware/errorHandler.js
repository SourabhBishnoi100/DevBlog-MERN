const errorHandler = (err, req, res, next ) => {

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    if (err.name === "CastError") {
        statusCode = 404;
        err.message = "Resource not found";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        err.message = Object.values(err.errors).map(val => val.messaage).join(", ");
    }

    res.status(statusCode).json({
        success : false,
        message : err.message || "An unexpected server error has occured !",
        stack : process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export default errorHandler;