const apiCall = (endPoint, method, body = {}) => {
    return new Promise(function (resolve, reject) {
        fetch(endPoint, {
            method: method,
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: body,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const apiResponseParser = (response) => {
    return new Promise(function (resolve, reject) {
        response
            .json()
            .then((data) => {
                resolve({
                    status: response.status,
                    body: data,
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
};
