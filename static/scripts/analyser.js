// TODO : ajouter cette ligne en haut du fichier ejs pour importer le script
// <script src="/static/scripts/login.js"></script>

let analyserTags;

function statusTemplate(status) {
    if (status) {
        return `<div class="analyser-status me-2 btn-success">
    <p class="mb-0">En marche</p>
</div>`;
    } else {
        return `<div class="analyser-status me-2 btn-danger">
        <p class="mb-0">Arrêté</p>
    </div>`;
    }
}
function templateAnalyser(analyser) {
    return (
        `
            <div class="d-flex mb-4">
                    <div class="analyser-type me-auto">
                        <p class="mb-0">` +
        analyser.type +
        `</p>
                    </div>
                    ` +
        statusTemplate(analyser.running) +
        `
                    <button  type="button" class="start-analyser-btn btn-tplm btn btn-block me-2">Lancer</button>
                    <button  type="button" class="stop-analyser-btn btn-tplm btn btn-block">Arrêter</button>
                </div>
    `
    );
}

function loadAnalyserElements() {
    analyserTags = {
        getAnalyserButton: $("#getAnalyserButton"),
        analyserContainer: $("#analyserContainer"),
    };
}

const getAnalyser = () => {
    return new Promise(function (resolve, reject) {
        getAnalyserEndpoint = "/api/analyser/status";

        apiCall(getAnalyserEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const startAnalyser = (type) => {
    return new Promise(function (resolve, reject) {
        startAnalysertEndpoint = "/api/analyser/start";

        body = JSON.stringify({
            type: type,
        });

        apiCall(startAnalysertEndpoint, "POST", body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const stopAnalyser = (type) => {
    return new Promise(function (resolve, reject) {
        stopAnalyserEndpoint = "/api/analyser/kill";

        body = JSON.stringify({
            type: type,
        });

        apiCall(stopAnalyserEndpoint, "POST", body)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const checkAnalyser = () => {
    return new Promise(function (resolve, reject) {
        stopAnalyserEndpoint = "/api/analyser/check";

        apiCall(stopAnalyserEndpoint, "GET")
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// const addWhitelistClient = (ip) => {
//     return new Promise(function (resolve, reject) {
//         let whitelistEndpoint = "/api/client/create";

//         body = JSON.stringify({
//             ip: ip,
//             whitelisted: true,
//         });

//         apiCall(whitelistEndpoint, "POST", body)
//             .then((response) => {
//                 resolve(response);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// };

const parseAnalyserResponse = (response) => {
    return new Promise(function (resolve, reject) {
        if (response.statusCode == 401) {
            // TODO : en cas d'erreur
        }
        if (response.statusCode == 200 || response.statusCode == 304) {
            analyserTags.analyserContainer.empty();

            response.analyser.forEach((analyser) => {
                let html = $(templateAnalyser(analyser));

                html.find(".start-analyser-btn").click(() => {
                    console.log("start " + analyser.type);

                    startAnalyser(analyser.type)
                        .then(() => {
                            analyserTags.getAnalyserButton.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

                html.find(".stop-analyser-btn").click(() => {
                    console.log("stop " + analyser.type);

                    stopAnalyser(analyser.type)
                        .then(() => {
                            analyserTags.getAnalyserButton.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                analyserTags.analyserContainer.append(html);
            });
        }
        resolve();
    });
};

function autoRefreshAnalyser() {
    wait(10000).then(() => {
        analyserTags.getAnalyserButton.click();
        checkAnalyser().then(() => {
            autoRefreshAnalyser();
        });
    });
}

function autoCheckAnalyser() {
    wait(10000).then(() => {
        analyserTags.getAnalyserButton.click();
        autoRefreshAnalyser();
    });
}

$(document).ready(() => {
    loadAnalyserElements();

    analyserTags.getAnalyserButton.click(() => {
        getAnalyser()
            .then(apiResponseParser)
            .then(parseAnalyserResponse)
            .catch((error) => {
                console.log(error);
            });
    });

    // clientTags.getAddWhitelistButton.click(() => {
    //     addWhitelistClient(clientTags.getAddWhitelistInput.val())
    //         .then(() => {
    //             clientTags.getButton.click();
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // });

    analyserTags.getAnalyserButton.click();
    autoRefreshAnalyser();
});
