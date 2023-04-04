let form;

function loadElements() {
    form = {
        username: $("#usernameInput"),
        password: $("#passwordInput"),
        submit: $("#sumitButton"),
        messages: $("#errorMessages"),
    };
}

const login = (username, password) => {
    return new Promise(function (resolve, reject) {
        loginEndpoint = "/api/user/login";
        body = JSON.stringify({
            username: username,
            password: password,
        });

        apiCall(loginEndpoint, "POST", body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const parseLoginResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            form.messages.text(response.error);
        }
        if (response.statusCode == 200) {
            window.location.replace("/");
        }
        resolve();
    });
};

$(document).ready(() => {
    loadElements();

    form.submit.click(() => {
        login(form.username.val(), form.password.val())
            .then(apiResponseParser)
            .then(parseLoginResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
