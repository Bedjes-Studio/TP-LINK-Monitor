// TODO : ajouter cette ligne en haut du fichier ejs pour importer le script
// <script src="/static/scripts/alert.js"></script>


let alertTags;
var rowTemplateAlertlist = '<div class="client-row"><p class="alert-row-type"></p><p class="alert-row-description"></p><p class="alert-row-date"></p><button id="deleteAlert" type="button" class="alert-row-button-delete btn btn-danger"><img src="/static/images/close.png" alt="Close X" width="13" height="13" /></button></div>';
let alerts = [{ type: 'Objet 1', description: 'Test1', date: new Date('01/01/2001') },
{ type: 'Objet 2', description: 'Test2', date: new Date('02/02/2001') }];

function loadAlertElements() {
    alertTags = {
        getButton: $("#refreshButtonAlert"), // TODO : mettre l'id du bouton pour cherche les alertes
        getAlertList: $("#alert-list")
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

const deleteAlert = (id) => {
    return new Promise(function (resolve, reject) {
        let deleteEndpoint = "/api/alert/delete";

        body = JSON.stringify({
            id: id,
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

const parseAlertResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            // TODO : en cas d'erreur
        }
        if (response.statusCode == 200) {
            alerts = response.alerts;
            alertTags.getAlertList.empty();
            alertTags.getAlertList.innerHTML = '';
            alerts.forEach((alert) => {
                let row = $(rowTemplateAlertlist);
                row.find('.alert-row-type').text(alert.type);
                row.find('.alert-row-description').text(alert.description);
                row.find('.alert-row-date').text(alert.date.toString());
                row.find('.alert-row-button-delete').click(() => {
                    deleteAlert(alert._id)
                        .then(alertTags.getButton.click())
                        .catch((error) => {
                            console.log(error);
                        });
                });
                alertTags.getAlertList.append(row);
            });
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
    loadAlertElements();

    alertTags.getButton.click(() => {
        getAlerts()
            .then(apiResponseParser)
            .then(parseAlertResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
