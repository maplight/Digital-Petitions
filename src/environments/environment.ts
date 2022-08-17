// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  awsExports: {
    aws_appsync_graphqlEndpoint:
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'AWS_IAM',
    // aws_appsync_apiKey: '',
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_6rF4UWcQq',
      userPoolWebClientId: '3bsi69d23rrr878fd728vpt6t0',
      identityPoolId: 'us-east-1:f9e44ee7-da37-42a4-8514-ea66dc4bcb6d',
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
