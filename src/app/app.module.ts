import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './containers/app/app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// ngrx modules - START
import {EffectsModule} from '@ngrx/effects';
import {MetaReducer, Store, StoreModule} from '@ngrx/store';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
import {LoggerService} from './services/logger/logger.service';
// enforces immutability
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];
// ngrx modules - END

// APP store
import { CustomSerializer, reducers } from './store/reducers';
import { effects } from './store/effects';

import { initApplication } from './app-initilizer';

// common provider
import { ProvidersModule } from './providers/providers.module';
// app routes
import { ROUTES } from './app.routes';
import { CookieModule } from 'ngx-cookie';
import {SharedModule} from './shared/shared.module';
import { ConsoleLoggerService } from './services/logger/console-logger.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import {LoggerModule as XuiLoggerModule} from './services/logger/logger.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    HttpClientModule,
    ProvidersModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    SharedModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false
    }),
    XuiLoggerModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [Store],
      multi: true
    },
    {
      provide: LoggerService,
      useClass: ConsoleLoggerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
