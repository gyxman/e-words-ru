import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AuthModule} from './modules/auth/auth.module';
import {LoaderModule} from './modules/utils/loader/loader.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase),
        AuthModule,
        LoaderModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
