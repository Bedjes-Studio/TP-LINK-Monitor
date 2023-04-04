exports.errorHandler = (error, res) => {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
};

exports.wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};
