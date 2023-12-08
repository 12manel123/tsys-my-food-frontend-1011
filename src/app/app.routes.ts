import { Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { AboutComponent } from './pages/landing-page/about/about.component';


export const routes: Routes = [
    { path: 'landing', component: LandingPageComponent },
    { path: '', component: LandingPageComponent ,children: [
        {path:'', component: HomeComponent},
        {path:'about', component: AboutComponent}
    ]},
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error' }

];
