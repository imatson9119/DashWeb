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
        //let licensePlate = request.plateNumber;
        let alertsRef = db.collection('alerts');
        
        alertsRef.get().then((alerts: any) => {
            response.send(JSON.stringify(alerts));
        });
    });
});