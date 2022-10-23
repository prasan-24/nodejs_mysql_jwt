//Success Respone Model

exports.success = (message, results, statusCode) => {
    return {
        message,
        isSuccess: true,
        code: statusCode,
        results
    };
};

//Error Response Model

exports.error = (message, statusCode) => {

    return {
        message,
        code: statusCode,
        isSuccess: false
    };
};

//Validation Response Model

exports.validation = (errors) => {
    return {
        message: "Validation errors",
        isSuccess: false,
        code: 422,
        errors
    };
};