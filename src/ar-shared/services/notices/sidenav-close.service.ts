import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// import * as fromSharedServices from '../../../ar-shared/services';


@Injectable()
export class SidenavCloseService {

  private _behaviorSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public cast: Observable<number> = this._behaviorSubject.asObservable();

  constructor() {}

  dispatch () {
    this._behaviorSubject.next(1);
  }
}

