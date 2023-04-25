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

let portTags;
var rowTemplatePortWhitelist =
    '<div class="client-row"><p class="port-row-number"></p><button id="deletePortFromWhitelist" type="button" class=" port-row-button-delete-whitelist btn btn-danger"><img src="/static/images/close.png" alt="Close X" width="13" height="13" /></button></div>';
var rowTemplatePortConnection =
    '<div class="client-row"><p class="port-row-number"></p><button id="portToWhitelistButton" type="button" class=" port-row-button-to-whitelist btn btn-warning"><img src="/static/images/arrow.png" alt="Close X" width="13" height="13" /></button></p><button id="removePortConnectionButton" type="button" class=" client-row-button-remove-connection btn btn-danger"><img src="/static/images/close.png" alt="Close X" width="13" height="13" /></button></div>';

function loadPortElements() {
    portTags = {
        getButton: $("#refreshButtonLists"),
        getPortWhiteList: $("#whitelist-port-table"),
        getPortIntrusions: $("#intrusion-port-table"),
        getAddOpenButton: $("#submitButtonPort"),
        getAddOpenInput: $("#inputPortNumber"),
    };
}

const getPorts = () => {
    return new Promise(function (resolve, reject) {
        let getPortsEndpoint = "api/port/read";

        apiCall(getPortsEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const changeWhitelistPort = (number) => {
    return new Promise(function (resolve, reject) {
        let whitelistEndpoint = "api/port/open";

        body = JSON.stringify({
            number: number,
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

const addOpenPort = (number) => {
    return new Promise(function (resolve, reject) {
        let whitelistEndpoint = "/api/port/create";

        body = JSON.stringify({
            number: number,
            open: true,
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

const deletePort = (number) => {
    return new Promise(function (resolve, reject) {
        let deleteEndpoint = "api/port/delete";

        body = JSON.stringify({
            number: number,
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

const parsePortResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            // TODO : en cas d'erreur
        }
        if (response.statusCode == 200 || response.statusCode == 304) {
            const nonIntrusions = response.ports.filter((port) => port.open === true);
            const intrusions = response.ports.filter((port) => port.open === false);

            portTags.getPortWhiteList.empty();
            portTags.getPortIntrusions.empty();

            portTags.getPortWhiteList.innerHTML = "";
            portTags.getPortIntrusions.innerHTML = "";
            nonIntrusions.forEach((port) => {
                let row = $(rowTemplatePortWhitelist);
                row.find(".port-row-number").text(port.number);
                row.find(".port-row-button-delete-whitelist").click(() => {
                    deletePort(port.number)
                        .then(() => {
                            portTags.getButton.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                portTags.getPortWhiteList.append(row);
            });
            intrusions.forEach((port) => {
                let row = $(rowTemplatePortConnection);
                row.find(".port-row-number").text(port.number);
                row.find(".port-row-button-to-whitelist").click(() => {
                    changeWhitelistPort(port.number)
                        .then(() => {
                            portTags.getButton.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                row.find(".port-row-button-remove-connection").click(() => {
                    deletePort(port.number)
                        .then(() => {
                            portTags.getButton.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                portTags.getPortIntrusions.append(row);
            });
        }
        resolve();
    });
};

function autoRefreshPorts() {
    wait(10000).then(() => {
        portTags.getButton.click();
        autoRefreshPorts();
    });
}

$(document).ready(() => {
    loadPortElements();

    portTags.getButton.click(() => {
        console.log("refreshing");
        getPorts()
            .then(apiResponseParser)
            .then(parsePortResponse)
            .catch((error) => {
                console.log(error);
            });
    });

    portTags.getAddOpenButton.click(() => {
        console.log("adding");

        addOpenPort(parseInt(portTags.getAddOpenInput.val()))
            .then(() => {
                portTags.getButton.click();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    portTags.getButton.click();
    autoRefreshPorts();
});
