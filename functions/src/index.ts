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
                arr.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            
            let res = {
                alerts: arr
            };

            response.send(JSON.stringify(res));
        });
    });
});

export const pingLocation = functions.https.onRequest((request: any, response: any) => {
    cors(request, response, () => {
        response.send("test");
        /*let plateNumber = request.plateNumber;
        
        let alertsRef = db.collection('alerts');

        alertsRef.doc(plateNumber + '').set({
            location: {
                latitude: request.latitude,
                longitude: request.longitude
            } 
        }).then((docRef: any) => {
            response.status(200).send("Location updated for plate " + plateNumber);
        });*/
    });
});

/*
curl -X POST -H "Content-Type: application/json" -d "{ \"plateNumber\": \"CKJ4091\", \"latitude\": \"50\", \"plateNumber\": \"CKJ4091\" }" http://localhost:3000/api/method
curl --header "Content-Type: application/json" --request POST --data '{"plateNumber":"CKJ4091","latitude":"50", "longitude": "51"}' https://us-central1-dash-66822.cloudfunctions.net/updateLocation
*/