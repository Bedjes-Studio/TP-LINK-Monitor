// TODO : ajouter cette ligne en haut du fichier ejs pour importer le script
// <script src="/static/scripts/login.js"></script>

/*
 * qjouter le script q l qpqge monitor
 * crer un bouton pour telechqrger/chqrger
 * ajouter une bqlise dqns la liste jsute une bqlise p
 * boucle for pour ajouter le bon nobre de ligne
 * qjouter le template qvec les donnes qu lieur dun simple p
 * 
 * 
 * */

let clientTags;

function loadElements() {
    clientTags = {
        getButton: $("#usernameInput"), // TODO : mettre l'id du bouton
        // TODO : ajouter les blocs whitelist/inconnu
    };
}

const getClients = () => {
    return new Promise(function (resolve, reject) {
        getClientsEndpoint = "/api/client/read";

        apiCall(loginEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const parseClientResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            // TODO : en cas d'erreur
        }
        if (response.statusCode == 200) {
            // TODO : en cas de réussite
        }
        resolve();
    });
};

$(document).ready(() => {
    loadElements();

    clientTags.getButton.click(() => {
        getClients()
            .then(apiResponseParser)
            .then(parseClientResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
