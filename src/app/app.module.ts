import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {HttpClientModule} from '@angular/common/http';
import {NotificationsModule} from './modules/utils/modules/notification/components/notifications/notifications.module';
import {NotificationFacadeService} from './modules/utils/modules/notification/services/notification-facade.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ApiService} from './services/api.service';
import {AppEffects} from './store/app.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot({}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
        NotificationsModule,
    ],
    providers: [NotificationFacadeService, ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
