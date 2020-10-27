import * as admin from 'firebase-admin';
import config from './config';

admin.initializeApp({
    credential: admin.credential.cert(config as any),
    databaseURL: `https://${config.project_id}.firebaseio.com`,
});

const { project_id } = config;

console.log('project id is', project_id);