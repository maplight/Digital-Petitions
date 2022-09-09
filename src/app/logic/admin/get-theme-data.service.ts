import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { updatedSiteConfiguration } from 'src/graphql/subscriptions';
import { Observable } from 'zen-observable-ts';
@Injectable({
  providedIn: 'root',
})
export class GetThemeDataService {
  constructor() {}
  fun() {
    console.log('todoData');
    const subscription = (
      API.graphql(graphqlOperation(updatedSiteConfiguration)) as Observable<any>
    ).subscribe((data) => console.log(data));

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
