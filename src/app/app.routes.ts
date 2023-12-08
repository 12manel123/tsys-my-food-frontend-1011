import { Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error' },
    { path: 'landing', component: LandingPageComponent },
];
