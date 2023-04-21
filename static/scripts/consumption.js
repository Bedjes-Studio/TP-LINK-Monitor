// TODO : ajouter cette ligne en haut du fichier ejs pour importer le script
// <script src="/static/scripts/consumption.js"></script>


let consumptionTags;
// add chart management

function loadElements() {
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
            updateChart();
        }
        resolve();
    });
};

$(document).ready(() => {
    loadElements();

    consumptionTags.refreshButton.click(() => {
        getConsumption()
            .then(apiResponseParser)
            .then(parseConsumptionResponse)
            .catch((error) => {
                console.log(error);
            });
    });
});
