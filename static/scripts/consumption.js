// TODO : ajouter cette ligne en haut du fichier ejs pour importer le script
// <script src="/static/scripts/consumption.js"></script>

let consumptionTags;
// add chart management

function loadConsumptionElements() {
    consumptionTags = {
        refreshButton: $("#refreshButton"),
        consumptionChart: $("#consumptionChart"),
    };
}

const getConsumption = () => {
    return new Promise(function (resolve, reject) {
        getConsumptionsEndpoint = "/api/consumption/read";

        apiCall(getConsumptionsEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const parseConsumptionResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            // TODO : en cas d'erreur
        }
        if (response.statusCode == 200) {
            // TODO : en cas de réussite
            // Mettre a jour le graph
            console.log("Consumption data:" + response);
            updateChart(response.result.values, response.result.timestamps);
        }
        resolve();
    });
};

function autoRefreshConsumption() {
    wait(10000).then(() => {
        consumptionTags.refreshButton.click();
        autoRefreshConsumption();
    });
}

$(document).ready(() => {
    loadConsumptionElements();

    consumptionTags.refreshButton.click(() => {
        console.log("Refreshing electric consumption data");
        getConsumption()
            .then(apiResponseParser)
            .then(parseConsumptionResponse)
            .catch((error) => {
                console.log(error);
            });
    });

    consumptionTags.refreshButton.click();
    autoRefreshConsumption();
});
