import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './core/core.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { MaterialDesignModule } from './material-design/material-design.module';
import { LayoutComponent } from './layout/layout.component';
import { UserInMemoryDataService } from './features/user/shared/user-in-memory-data-service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MaterialDesignModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Atlas Client DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   UserInMemoryDataService, { dataEncapsulation: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
