
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