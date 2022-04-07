// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseAPIURL = 'http://localhost:3000';
export const environment = {
  production: false,
  GOOGLE_CLIENT_ID:
    '1008431745336-smjbba8kv5hn0cuttmbm6s1bf8gnblhi.apps.googleusercontent.com',
  student_api: `${baseAPIURL}/students`,
  subject_api: `${baseAPIURL}/subjects`,
  quiz_api: `${baseAPIURL}`,
  firebase: {
    apiKey: 'AIzaSyBCmUS4QDe6F3oz8m1mxY-ppMR18dPgJFM',
    authDomain: 'we16301-angular-2c17f.firebaseapp.com',
    projectId: 'we16301-angular-2c17f',
    storageBucket: 'we16301-angular-2c17f.appspot.com',
    messagingSenderId: '890346717887',
    appId: '1:890346717887:web:39f3e2182af6c7306a7c0a',
    measurementId: 'G-0CG4BDHRN0',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
