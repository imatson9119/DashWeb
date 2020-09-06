const functions = require('firebase-functions');
const cors = require('cors')({origin:true});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


//Example POST vs GET
let db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


export const getAlerts = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        let alertsRef = db.collection('alerts');
        
        alertsRef.get().then(function(alerts: any) {
            let arr: Array<any> = [];
            alerts.forEach(function(doc: any) {
                if(doc.data().locations) { // Make sure it has been seen at least once to show up
                    arr.push({
                        id: doc.id,
                        data: doc.data()
                    });

                    //Sort events by time (soonest first)
                    arr[arr.length - 1].data.locations.sort(function(a : any, b : any) {
                        return parseInt(b.time) - parseInt(a.time);
                    });
                }
            });
            


            let res = {
                alerts: arr
            };
            response.set('Access-Control-Allow-Origin', '*');

            response.send(JSON.stringify(res));
        });
    });
});

export const getAlerts2 = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        let alertsRef = db.collection('alerts');
        
        alertsRef.get().then(function(alerts: any) {
            let arr: Array<any> = [];
            alerts.forEach(function(doc: any) {
                if(doc.data().locations) { // Make sure it has been seen at least once to show up
                    arr.push({
                        id: doc.id,
                        data: doc.data()
                    });

                    //Sort events by time (soonest first)
                    /*arr[arr.length - 1].data.locations.sort(function(a : any, b : any) {
                        return parseInt(b.time) - parseInt(a.time);
                    });*/
                }
            });
            


            let res = {
                alerts: arr
            };
            response.set('Access-Control-Allow-Origin', '*');

            response.send(JSON.stringify(res));
        });
    });
});

export const getPlates = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        let alertsRef = db.collection('alerts');
        
        let plateString = "";

        alertsRef.get().then(function(alerts: any) {
            alerts.forEach(function(doc: any) {
                    plateString += doc.id + ",";
            });
            response.set('Access-Control-Allow-Origin', '*');

            response.send(plateString);
        });
    });
});

export const pingLocation = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        let plateNumber = request.query.plateNumber.toString();
        //response.send(request);
        db.collection('alerts').where("plateNumber", "==", plateNumber).get().then((res: any) => {
            res.forEach(function(doc: any) {
                let arr = doc.data().locations;
                
                arr.push({
                    latitude: Number.parseFloat(request.query.latitude),
                    longitude: Number.parseFloat(request.query.longitude),
                    time: Number.parseInt(request.query.time),
                });

                doc.ref.update({locations: arr});
            });
            response.set('Access-Control-Allow-Origin', '*');

            response.send(request.query);
        });
    });
});

export const pingLocation2 = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        let plateNumber = request.query.plateNumber.toString();
        //response.send(request);
        db.collection('alerts').where("plateNumber", "==", plateNumber).get().then((res: any) => {
            res.forEach(function(doc: any) {
                let arr = doc.data().locations;
                
                arr.push({
                    latitude: Number.parseFloat(request.query.latitude),
                    longitude: Number.parseFloat(request.query.longitude),
                    time: Number.parseInt(request.query.time),
                });

                doc.ref.update({locations: arr});
            });
            response.set('Access-Control-Allow-Origin', '*');

            response.send(JSON.stringify(request.query));
        });
    });
});

/*
curl -X POST -H "Content-Type: application/json" -d "{ \"plateNumber\": \"CKJ4091\", \"latitude\": \"50\", \"plateNumber\": \"CKJ4091\" }" http://localhost:3000/api/method
curl --header "Content-Type: application/json" --request POST --data '{"plateNumber":"CKJ4091","latitude":"50", "longitude": "51"}' https://us-central1-dash-66822.cloudfunctions.net/updateLocation
*/