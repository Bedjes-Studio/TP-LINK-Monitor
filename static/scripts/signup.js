let form;

function loadSignupElements() {
    form = {
        username: $("#usernameInput"),
        email: $("#emailInput"),
        password: $("#passwordInput"),
        submit: $("#signupButton"),
        messages: $("#signupMessages"),
    };
}

const signup = (username, password, email) => {
    return new Promise(function (resolve, reject) {
        signupEndpoint = "/api/user/signup";
        body = JSON.stringify({
            username: username,
            password: password,
            email: email,
        });

        apiCall(signupEndpoint, "POST", body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const parseSignupResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            form.messages.text(response.error);
        }
        if (response.statusCode == 201) {
            form.messages.text("Utilisateur créé");
        }
        resolve();
    });
};

$(document).ready(() => {
    loadSignupElements();

    form.submit.click(() => {
        signup(form.username.val(), form.password.val(), form.email.val())
            .then(apiResponseParser)
            .then(parseSignupResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
