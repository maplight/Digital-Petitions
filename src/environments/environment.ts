// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  awsExports: {
    aws_appsync_graphqlEndpoint:
      'https://v3kekzedizfebmdb2xsnpuhxpm.appsync-api.us-east-1.amazonaws.com/graphql',
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'AWS_IAM',
    // aws_appsync_apiKey: '',
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_qXaczdgDI',
      userPoolWebClientId: '2o281gcj1o7jlehien56q1o3b9',
      identityPoolId: 'us-east-1:0d9eacef-f064-47a8-9202-82365463a569',
    },
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
