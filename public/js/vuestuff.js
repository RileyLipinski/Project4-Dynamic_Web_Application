
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
        
    }
});

var checkboxes = new Vue({
    el: "#checkboxes",
    data: {
        checkedIncidents: [],
        checked_neighborhoods: [],
        checked_date: [],
        checked_time: []
    },
    methods:
    {
        updateJSON: function(checks)
        {
            //date loop here
            let query = crime_url + "/incidents?start_date=2019-10-01&end_date=2019-10-31&";
            let started = false;
            for(let i in checks)
            {
                if(!started)
                {
                    query = query + "code=";
                    started = true;
                }
                if(checks[i] == "MURDER")
                {
                    query = query + "110,120,";
                }
                else if(checks[i] =="RAPE")
                {
                    query = query + "210,220,";
                }
                else if(checks[i] == "THEFT")
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
                else if(checks[i] == "ASSAULT")
                {
                    for(let j = 400; j <= 453; j++)
                    {
                        query = query + j + ",";
                    }
                    for(let j = 861; j <= 863; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(checks[i] == "PROPERTY_DAMAGE")
                {
                    for(let j = 900; j <= 1436; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(checks[i] == "NARCOTICS")
                {
                    for(let j = 1800; j <= 1885; j++)
                    {
                        query = query + j + ",";
                    }
                }
                else if(checks[i] == "OTHER")
                {
                    query = query + "2619,9954,9959";
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
})