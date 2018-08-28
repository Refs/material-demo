import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { catchError, tap, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { of } from 'rxjs/observable/of';

import * as fromModels from '../models';



@Injectable()
export class TopNavItemsService {

  constructor( private http: HttpClient ) { }

  getTopNavItems(): Observable<fromModels.TopNavItem[]> {
    return this.http
      .get<fromModels.LeftMenu>('http://localhost:3000/deviceplatform/getLeftMenu')
      .pipe(
        map((data) => {
          return data.data;
        }),
        catchError(error => of(error)
      ));
  }

}
