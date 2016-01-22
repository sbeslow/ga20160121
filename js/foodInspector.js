function foodInspectRecord(storeName) {

    var groomedName = encodeURIComponent(storeName) + " ";
    $("#restName").html("");

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json?dba_name=" + groomedName,
        timeout: 5000,
        success: function (data, textStatus) {
            processResult(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}

function processResult(data) {
    if (data.length == 0) {
        alert("Can't find this establishment: Error Code: This app will self destruct");
        return null;
    }
    
    var mostRecent = data[0];
    retVal = {"name": mostRecent.dba_name, "address": mostRecent.address, "risk": mostRecent.risk, "result": mostRecent.results,
             "inspection_date": mostRecent.inspection_date};
    
    updateScreen(retVal);

}

function updateScreen(restaraunt) {
    $("#restName").html("<br>" + restaraunt.name + "<br>" + restaraunt.address + "<br>" +
                       "Inspected on: " + restaraunt.inspection_date + "<br>" +
                       "Risk: " + restaraunt.risk + "<br> Result: " + restaraunt.result);
}