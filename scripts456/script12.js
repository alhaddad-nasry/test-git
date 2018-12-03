//Running this simulator, virtualize a conduit call to the quick start app ingest api.
var http = require("http");

// Load user subdomains
var listSubdomainsResult =  apsdb.callApi("ListSubdomains", {}, null);

if(listSubdomainsResult.metadata && listSubdomainsResult.metadata.status == "success") {
    if(listSubdomainsResult.result && listSubdomainsResult.result.length > 0) {
        
        //Build the url of the ingest api
        const  api= "https://"+ listSubdomainsResult.result[0].name + ".scriptrapps.io/script11";

        //Generate random data to simulate the device data
        var dataSnap=
            {
                "temperature": getRandomInt(0,50),
                "luminosity": getRandomArbitrary(200,3000),
                "pressure": getRandomInt(0,100000),
                "location":{
                    "lat": 1.909,
                    "lon":19.00
                }
            };
        
        //Call the ingest api, with randomly generated data
        var callResult = http.request({
            "url" : api,
            "method":"POST",
            "bodyString":JSON.stringify(dataSnap),
            "headers":{
                "Content-Type":"application/json"
            }
        });
        
        return callResult;
        
    } else {
        return "No subdomain set for your account. Please setup a subdomain in order to run the simulator.";
    }
} else {
    	return "Unable to call the quick start application [\"/MultiTechStarterKitApp/api/ingest\"] api. Failure to load your account subdomain property."
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
