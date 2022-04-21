// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseAPIURL = 'http://localhost:3000';
export const environment = {
  production: false,
  GOOGLE_CLIENT_ID:
    '',
  student_api: `${baseAPIURL}/students`,
  subject_api: `${baseAPIURL}/subjects`,
  quiz_api: `${baseAPIURL}`,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: 'we16301-angular-2c17f.appspot.com',
    messagingSenderId: '',
    appId: '',
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
