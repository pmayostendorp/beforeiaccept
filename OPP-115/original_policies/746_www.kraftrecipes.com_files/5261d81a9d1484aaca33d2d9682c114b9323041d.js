function turnTraffic(trafficSource,match) {
    
    var table = [];
    table.push(
        ["google.com","20603"],
        ["bing.com","20603"],
        ["twitter.com","20602"],
        ["t.co","20602"],
        ["facebook.com","20601"],
        ["pinterest.com","20600"]
        );
        
    for (i=0;i<table.length;i++) {
        if (match == "exact") {
            if (trafficSource == table[i][0]) {
                return table[i][1];
            }
        } else {
            if (trafficSource.indexOf(table[i][0]) >= 0) {
                return table[i][1];
            }
        }
    }
    
}