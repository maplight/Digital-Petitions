import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';

import { updatedSiteConfiguration } from 'src/graphql/subscriptions';
import { Observable } from 'zen-observable-ts';
@Injectable({
  providedIn: 'root',
})
export class GetThemeDataService {
  constructor() {}
  updatedThemeData(): Observable<any> {
    return API.graphql(
      graphqlOperation(updatedSiteConfiguration)
    ) as Observable<any>;
  }
}
