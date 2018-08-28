import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

// import storeModule
import { StoreModule, MetaReducer, ReducerObservable } from '@ngrx/store';
// import router store module
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
// import store devtools module
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import effects module
import { EffectsModule } from '@ngrx/effects';




// import ngx-store-freeze
import { storeFreeze } from 'ngrx-store-freeze';
// import angular-cli environments
import { environment } from '../environments/environment';


// import containers
import * as fromContainers from './containers';
// import components
import * as fromComponents from './components';
// import services
import * as fromServices from './services';
// import pipes

// import appModule reducers
import { reducers, CustomSerializer, effects, RootState } from './store';


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer',
    }),
    EffectsModule.forRoot(effects),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    ...fromServices.services,
    { provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule { }
