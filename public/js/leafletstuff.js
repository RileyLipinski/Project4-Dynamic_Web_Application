var mymap;
var globalLat = 44.953;
var globalLong = -93.090;
var neighborhoods;
function neighborhoods(crime_api_url)
{
    $.getJSON(crime_api_url + "/neighborhoods", (data) =>
            {
                neighborhoods = 
                {
                    "N1": [44.938043, -93.005395, 0, data["N1"], null],
                    "N2": [44.977413, -93.025156, 0, data["N2"], null],
                    "N3": [44.931244, -93.079578, 0, data["N3"], null],
                    "N4": [44.956192, -93.060189, 0, data["N4"], null],
                    "N5": [44.978883, -93.068163, 0, data["N5"], null],
                    "N6": [44.975766, -93.113887, 0, data["N6"], null],
                    "N7": [44.959639, -93.121271, 0, data["N7"], null],
                    "N8": [44.947700, -93.128505, 0, data["N8"], null],
                    "N9": [44.930276, -93.119911, 0, data["N9"], null],
                    "N10": [44.982752, -93.147910, 0, data["N10"], null],
                    "N11": [44.963631, -93.167548, 0, data["N11"], null],
                    "N12": [44.973971, -93.197965, 0, data["N12"], null],
                    "N13": [44.949043, -93.178261, 0, data["N13"], null],
                    "N14": [44.934848, -93.176736, 0, data["N14"], null],
                    "N15": [44.913106, -93.170779, 0, data["N15"], null],
                    "N16": [44.937705, -93.136997, 0, data["N16"], null],
                    "N17": [44.949203, -93.093739, 0, data["N17"], null]
                }
            });
}

function mapUpdate(location)
{
    globalLat = parseFloat(location.split(",")[0]);
    globalLong = parseFloat(location.split(",")[1]);
    mymap.panTo(new L.LatLng(globalLat, globalLong), 13);
    console.log(mymap.getCenter());

}
function mapInit()
{
    mymap = L.map('mymap').setView([globalLat, globalLong], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 11,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoicmlsZXlsaXBpbnNraSIsImEiOiJjazN0Y3llOHAwMWxmM21wdzB4YmFxamIyIn0.UecD85_LszkZr2u0-12zSg'
    }).addTo(mymap);
    mymap.setMaxBounds([[44.890,-93.255], [45.024,-92.949]]);
    for(var key in crime_data)
    {
        neighborhoods["N" + crime_data[key].neighborhood_number][2]++; 
    }
    for(var key2 in neighborhoods)
    {
        let marker =  L.marker([neighborhoods[key2][0], neighborhoods[key2][1]], {title: neighborhoods[key2][3] + ""}).addTo(mymap);
        neighborhoods[key2][4] = marker;
        //console.log(JSON.stringify(neighborhoods));
        marker.bindPopup(neighborhoods[key2][2] + "").openPopup();
    }
    // neighborhoods["N17"][2] = 0;
    // neighborhoods["N17"][4].bindPopup(neighborhoods[key2][2] + "").openPopup();
    // console.log(neighborhoods);
    mapUpdate("44.952,-93.090");

}

function updatePan()
{
    mymap.on("move", function() {   
        globalLat = mymap.getCenter().lat.toFixed(3);
        globalLong = mymap.getCenter().lng.toFixed(3);
        mapInput.Location = globalLat + "," + globalLong;
        //console.log(mymap.getBounds());
    });

    mymap.on("moveend", function() {
        //console.log(mapTable.ready);   
        mapTable.crimes = {};
        for(var key in crime_data)
        {
           // console.log(neighborhoods["N" + crime_data[key].neighborhood_number][0]);
        //    console.log(mymap.getBounds()._northEast.lat);
        //    console.log(mymap.getBounds()._southWest.lat);
        //    console.log(mymap.getBounds()._northEast.lng);
        //    console.log(mymap.getBounds()._southWest.lng);
            //console.log(crime_data[key].neighborhood_number);
            if(neighborhoods["N" + crime_data[key].neighborhood_number][0] < parseFloat(mymap.getBounds()._northEast.lat) && neighborhoods["N" + crime_data[key].neighborhood_number][0] > parseFloat(mymap.getBounds()._southWest.lat) && neighborhoods["N" + crime_data[key].neighborhood_number][1] < parseFloat(mymap.getBounds()._northEast.lng) && neighborhoods["N" + crime_data[key].neighborhood_number][1] > parseFloat(mymap.getBounds()._southWest.lng))
            {
                
                mapTable.crimes[key] = 
                {
                    date: crime_data[key].date,
                    time: crime_data[key].time,
                    incident: crime_data[key].incident,
                    police_grid: crime_data[key].police_grid,
                    neighborhood: neighborhoods["N" + crime_data[key].neighborhood_number][3],
                    block: crime_data[key].block
                }
            }
        }
        //mapTable.changeReady(true);
        //console.log(mapTable.ready);
        //console.log(crime_in_view);
        //console.log(mymap.getBounds());
    });
}
