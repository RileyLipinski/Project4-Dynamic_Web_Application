
var mapInput = new Vue({
    el: "#mapInput",
    data: {
        Location: "44.953,-93.090"
    },
    methods: {
        sendLocation: function(event) {
            mapUpdate(this.Location);
        }
    }

});

var mapTable = new Vue({
    el: "#mapTable",
    data:
    {
        crimes: {}
        
    },
    methods: 
    {
        addMarker: function(item)
        {
            addMapMarker(item);
        }
    }
});

var checkboxes = new Vue({
    el: "#checkboxes",
    data: {
        checkedIncidents: [],
        checkedNeighborhoods: [],
        checked_date: [],
        checked_time: []
    },
    methods:
    {
        updateJSON: function()
        {
            
            let query = crime_url + "/incidents?";
            //start_date=2019-10-01&end_date=2019-10-31
            let dates = dateRange.Date.split(",");
            let times = timeRange.Time.split(",");
            let dateStart;
            let dateEnd;
            dateStart = dates[0] + "T" + times[0];
            dateEnd = dates[1] + "T" + times[1];
            query = query + "start_date=" + dateStart + "&end_date=" + dateEnd + "&"; 
            let started = false;
            for(let i in this.checkedIncidents)
            {
                if(!started)
                {
                    query = query + "code=";
                    started = true;
                }
                if(this.checkedIncidents[i] == "MURDER")
                {
                    query = query + "110,120,";
                }
                else if(this.checkedIncidents[i] =="RAPE")
                {
                    query = query + "210,220,";
                }
                else if(this.checkedIncidents[i] == "THEFT")
                {
                    for(let j = 300; j <= 374; j++)
                    {
                        query = query + j + ",";
                    }
                    for(let j = 500; j <= 722; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(this.checkedIncidents[i] == "ASSAULT")
                {
                    for(let j = 400; j <= 453; j++)
                    {
                        query = query + j + ",";
                    }
                    for(let j = 810; j <= 863; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(this.checkedIncidents[i] == "PROPERTY_DAMAGE")
                {
                    for(let j = 900; j <= 1436; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(this.checkedIncidents[i] == "NARCOTICS")
                {
                    for(let j = 1800; j <= 1885; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(this.checkedIncidents[i] == "OTHER")
                {
                    query = query + "2619,9954,9959";
                }
            }
            query = query.substring(0, query.length - 1);
            query = query + "&";
            started = false;
            for(let i in this.checkedNeighborhoods)
            {
                if(!started)
                {
                    query = query + "id=";
                    started = true;
                }
                if(this.checkedNeighborhoods[i] == "N1")
                {
                    query = query + "1,";
                }
                else if(this.checkedNeighborhoods[i] == "N2")
                {
                    query = query + "2,";
                }
                else if(this.checkedNeighborhoods[i] == "N3")
                {
                    query = query + "3,";
                }
                else if(this.checkedNeighborhoods[i] == "N4")
                {
                    query = query + "4,";
                }
                else if(this.checkedNeighborhoods[i] == "N5")
                {
                    query = query + "5,";
                }
                else if(this.checkedNeighborhoods[i] == "N6")
                {
                    query = query + "6,";
                }
                else if(this.checkedNeighborhoods[i] == "N7")
                {
                    query = query + "7,";
                }
                else if(this.checkedNeighborhoods[i] == "N8")
                {
                    query = query + "8,";
                }
                else if(this.checkedNeighborhoods[i] == "N9")
                {
                    query = query + "9,";
                }
                else if(this.checkedNeighborhoods[i] == "N10")
                {
                    query = query + "10,";
                }
                else if(this.checkedNeighborhoods[i] == "N11")
                {
                    query = query + "11,";
                }
                else if(this.checkedNeighborhoods[i] == "N12")
                {
                    query = query + "12,";
                }
                else if(this.checkedNeighborhoods[i] == "N13")
                {
                    query = query + "13,";
                }
                else if(this.checkedNeighborhoods[i] == "N14")
                {
                    query = query + "14,";
                }
                else if(this.checkedNeighborhoods[i] == "N15")
                {
                    query = query + "15,";
                }
                else if(this.checkedNeighborhoods[i] == "N16")
                {
                    query = query + "16,";
                }
                else if(this.checkedNeighborhoods[i] == "N17")
                {
                    query = query + "17,";
                }


            }
            query = query.substring(0, query.length - 1);
            console.log(query);
            $.getJSON(query, (data) =>
            {
                console.log("hello");
                crime_data = data;
                updateMarkers();
                mapUpdate("" + (parseFloat(globalLat) + .0000001) + "," + globalLong);
            });
        }
    }
});

var dateRange = new Vue({
    el: "#dateRange",
    data: {
        Date: "2019-10-01,2019-10-31"
    },
    methods:
    {
        sendDate: function(event)
        {
            checkboxes.updateJSON();
        }
    }
});

var timeRange = new Vue({
    el: "#timeRange",
    data: {
        Time: ""
    },
    methods:
    {
        sendTime: function(event)
        {
            checkboxes.updateJSON();
        }
    }
})