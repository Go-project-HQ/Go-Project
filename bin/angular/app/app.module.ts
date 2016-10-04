
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// pages

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component/dashboard.component';
import { HeroesComponent }      from './heroes.component/heroes.component';
import { HeroDetailComponent }  from './hero-detail.component/hero-detail.component';
import { LoginComponent }       from './login.component/login.component';
import { SignUpComponent }      from './sign-up.component/sign-up.component';
import { SettingsComponent }    from './settings.component/settings.component';

// services

import { HeroService }          from './hero.service/hero.service';
import { routing }              from './app.routing/app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent,
        LoginComponent,
        SignUpComponent,
        SettingsComponent,
    ],
    providers: [
        HeroService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}