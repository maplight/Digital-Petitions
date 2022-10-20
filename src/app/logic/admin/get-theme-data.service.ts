import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  SiteConfiguration,
  SiteConfigurationQuery,
  UpdatedSiteConfigurationSubscription,
} from 'src/app/core/api/API';
import { Result } from 'src/app/shared/models/exports';
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
