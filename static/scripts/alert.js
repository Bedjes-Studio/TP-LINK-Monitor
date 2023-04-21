// TODO : ajouter cette ligne en haut du fichier ejs pour importer le script
// <script src="/static/scripts/alert.js"></script>


let alertTags;

function loadElements() {
    alertTags = {
        getButton: $("#usernameInput"), // TODO : mettre l'id du bouton pour cherche les alertes
        // TODO : ajouter l'id de la div dans laquelle mettre les alertes
    };
}

const getAlerts = () => {
    return new Promise(function (resolve, reject) {
        getAlertEndpoint = "/api/alert/read";

        apiCall(getAlertEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const parseAlertResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            // TODO : en cas d'erreur
        }
        if (response.statusCode == 200) {
            // TODO : en cas de réussite
            // ajouter dans le html une div avec les infos
            // tu peux acceder aux alertes avec response.alerts (c'est un tableau)
            // données dispo : type/description/date
            // ex : response.alerts[0].type
        }
        resolve();
    });
};

$(document).ready(() => {
    loadElements();

    alertTags.getButton.click(() => {
        getAlerts()
            .then(apiResponseParser)
            .then(parseAlertResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
