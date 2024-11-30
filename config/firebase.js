const admin = require('firebase-admin');
const serviceAccountPath = "/etc/secrets/firebase-service-account.json";
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));// Replace with your Firebase service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
