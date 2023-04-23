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
var rowTemplateWhitelist ='<div class="client-row"><p class="client-row-adress"></p><button id="deleteFromWhitelist" type="button" class=" client-row-button-delete-whitelist btn btn-danger"><img src="/static/images/close.png" alt="Close X" width="13" height="13" /></button></div>';
var rowTemplateConnection = '<div class="client-row"><p class="client-row-adress"></p><button id="toWhitelistButton" type="button" class=" client-row-button-to-whitelist btn btn-warning"><img src="/static/images/arrow.png" alt="Close X" width="13" height="13" /></button></p><button id="removeConnectionButton" type="button" class=" client-row-button-remove-connection btn btn-success"><img src="/static/images/check.png" alt="Close X" width="13" height="13" /></button></div>';

let objets = [{ ip: 'Objet 2', whitelisted: false },
    { ip: 'Objet 3', whitelisted: false },
    { ip: 'Objet 4', whitelisted: false },
    { ip: 'Objet 5', whitelisted: true },
    { ip: 'Objet 6', whitelisted: true },
    { ip: 'Objet 7', whitelisted: false }
]; //Pour l'exemple

function loadElements() {
    clientTags = {
        getButton: $("#refreshButtonLists"),
        getWhiteList: $("#whitelist-table"),
        getIntrusions: $("#intrusion-table"),
    };
}

const getClients = () => {
    return new Promise(function (resolve, reject) {
        getClientsEndpoint = "/api/client/read";

        apiCall(getClientsEndpoint, "GET")
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
            const nonIntrusions = objets.filter(objet => objet.whitelisted === true);
            const intrusions = objets.filter(objet => objet.whitelisted === false);

            clientTags.getWhiteList.empty(); // A enlever si besoin selon le modèle d'import de données
            clientTags.getIntrusions.empty(); // A enlever si besoin selon le modèle d'import de données

            clientTags.getWhiteList.innerHTML = '';
            clientTags.getIntrusions.innerHTML = '';
            nonIntrusions.forEach((objet) => {
                let row = $(rowTemplateWhitelist);
                row.find('.client-row-adress').text(objet.ip);
                row.find('.client-row-button-delete-whitelist').click(() => {
                    // CHANGE L'ELEMENT en whitelisted=false DANS LA BDD
                    //row.remove();
                });
                clientTags.getWhiteList.append(row);
            });
            intrusions.forEach((objet) => {
                let row = $(rowTemplateConnection);
                row.find('.client-row-adress').text(objet.ip);
                row.find('.client-row-button-to-whitelist').click(() => {
                    // CHANGE L'ELEMENT en whitelisted=true DANS LA BDD
                    //row.remove();
                });
                row.find('.client-row-button-remove-connection').click(() => {

                })
                clientTags.getIntrusions.append(row);
            });
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
