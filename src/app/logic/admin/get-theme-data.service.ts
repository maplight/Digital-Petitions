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

    /*
    try {
      let resultado: Observable<any> = (await API.graphql({
        ...graphqlOperation(updatedSiteConfiguration),
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })) as Observable<any>;
      if (resultado) {
        console.log(resultado);
      } else {
        console.log('resultado');
      }
    } catch (error) {
      console.log(error);
    }*/
  }
}
