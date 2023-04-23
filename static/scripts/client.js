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
var rowTemplateWhitelist =
    '<div class="client-row"><p class="client-row-adress"></p><button id="deleteFromWhitelist" type="button" class=" client-row-button-delete-whitelist btn btn-danger"><img src="/static/images/close.png" alt="Close X" width="13" height="13" /></button></div>';
var rowTemplateConnection =
    '<div class="client-row"><p class="client-row-adress"></p><button id="toWhitelistButton" type="button" class=" client-row-button-to-whitelist btn btn-warning"><img src="/static/images/arrow.png" alt="Close X" width="13" height="13" /></button></p><button id="removeConnectionButton" type="button" class=" client-row-button-remove-connection btn btn-danger"><img src="/static/images/close.png" alt="Close X" width="13" height="13" /></button></div>';

function loadClientElements() {
    clientTags = {
        getButton: $("#refreshButtonLists"),
        getWhiteList: $("#whitelist-table"),
        getIntrusions: $("#intrusion-table"),
    };
}

const getClients = () => {
    return new Promise(function (resolve, reject) {
        let getClientsEndpoint = "/api/client/read";

        apiCall(getClientsEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const changeWhitelistClient = (ip) => {
    return new Promise(function (resolve, reject) {
        let whitelistEndpoint = "/api/client/whitelist";

        body = JSON.stringify({
            ip: ip,
        });

        apiCall(whitelistEndpoint, "POST", body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const deleteClient = (ip) => {
    return new Promise(function (resolve, reject) {
        let deleteEndpoint = "/api/client/delete";

        body = JSON.stringify({
            ip: ip,
        });

        apiCall(deleteEndpoint, "POST", body)
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
        if (response.statusCode == 200 || response.statusCode == 304) {
            const nonIntrusions = response.clients.filter((client) => client.whitelisted === true);
            const intrusions = response.clients.filter((client) => client.whitelisted === false);

            clientTags.getWhiteList.empty();
            clientTags.getIntrusions.empty();

            clientTags.getWhiteList.innerHTML = "";
            clientTags.getIntrusions.innerHTML = "";
            nonIntrusions.forEach((client) => {
                let row = $(rowTemplateWhitelist);
                row.find(".client-row-adress").text(client.ip);
                row.find(".client-row-button-delete-whitelist").click(() => {
                    deleteClient(client.ip)
                        .then(clientTags.getButton.click())
                        .catch((error) => {
                            console.log(error);
                        });
                });
                clientTags.getWhiteList.append(row);
            });
            intrusions.forEach((client) => {
                let row = $(rowTemplateConnection);
                row.find(".client-row-adress").text(client.ip);
                row.find(".client-row-button-to-whitelist").click(() => {
                    changeWhitelistClient(client.ip)
                        .then(clientTags.getButton.click())
                        .catch((error) => {
                            console.log(error);
                        });
                });
                row.find(".client-row-button-remove-connection").click(() => {
                    deleteClient(client.ip)
                        .then(clientTags.getButton.click())
                        .catch((error) => {
                            console.log(error);
                        });
                });
                clientTags.getIntrusions.append(row);
            });
        }
        resolve();
    });
};

$(document).ready(() => {
    loadClientElements();

    clientTags.getButton.click(() => {
        getClients()
            .then(apiResponseParser)
            .then(parseClientResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
