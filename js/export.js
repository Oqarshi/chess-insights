
function writeExportButton() {

    let insights = document.getElementById("insights");
    // let title = table.firstElementChild;

    let exportButton = document.createElement("button"); 


    exportButton.setAttribute("id","exportButton");
    exportButton.setAttribute("class","btn");
    exportButton.setAttribute("onclick","exportToCSV()");

    exportButton.innerText = "Export All Data To CSV";

    insights.prepend(exportButton);

}

function exportToCSV() {

    let headers = ["userAccuracy", "opponentAccuracy", "gameUrl", "gameId", 
                    "timeClass", "fen", "userColor", "userRating", 
                    "opponent", "opponentRating", "opponentUrl", "result", 
                    "date", "openingUrl", "opening", "startTime", "endTime","pgn"];

    let csv_data = [headers]

    let archivedGames = getArchivedGames();

    for (var i=0; i<archivedGames.length; i++ ) {
        var row = [];
        let gameNode = archivedGames[i];
        let parsedGameNode = parseGameNode(gameNode);

        row.push(parsedGameNode.userAccuracy);
        row.push(parsedGameNode.opponentAccuracy);
        row.push(parsedGameNode.gameUrl);
        row.push(parsedGameNode.gameId);
        row.push(parsedGameNode.timeClass);
        row.push(parsedGameNode.fen);
        row.push(parsedGameNode.userColor);
        row.push(parsedGameNode.userRating);
        row.push(parsedGameNode.opponent);
        row.push(parsedGameNode.opponentRating);
        row.push(parsedGameNode.opponentUrl);
        row.push(parsedGameNode.result);
        row.push(parsedGameNode.date);
        row.push(parsedGameNode.openingUrl);
        row.push(parsedGameNode.opening);
        row.push(parsedGameNode.startTime);
        row.push(parsedGameNode.endTime);
        row.push(parsedGameNode.pgn);

        csv_data.push(row);
    }

 
    // TODO: find a way to cache the data in browser so we don't have to parse out the table like this
    // Get each row data

    // for (var i = 0; i < rows.length; i++) {
 
        // Get each column data
        // var cols = rows[i].querySelectorAll('td,th');
 
        // Stores each csv row data
        // var csvrow = [];
        // for (var j = 0; j < cols.length; j++) {
 
            // cell = cols[j].innerHTML;
            // Get the text data of each cell of
            // if (cols[j].firstElementChild != null){
                // console.log("here");
                // csvrow.push(cols[j].firstElementChild.getAttribute("href"));
            // }
            // else {
                // a row and push it to csvrow
                // csvrow.push(cell);
            // }

        // }
 
        // Combine each column value with comma
        // csv_data.push(csvrow.join(","));
    // }
    // combine each row data with new line character
    csv_data = csv_data.join('\n');
    csvFile = new Blob([csv_data], {type: 'text/csv'})

    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(csvFile);


    // let today = new Date().format('Y-m-d');   //  07-06-2016 06:38:34
    let today = new Date().toISOString().slice(0, 10)
    let uname = document.getElementById("title").textContent;
    let fname = `chess_com_${uname}_${today.replace("-","_")}.csv`;

    a.download = fname;
    // Append anchor to body.
    document.body.appendChild(a);
    a.click();

    // Remove anchor from body
    document.body.removeChild(a);

}