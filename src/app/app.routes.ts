import { Routes } from '@angular/router';
import { ErrorPageComponent } from './view/error-page/error-page.component';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { HomeComponent } from './view/landing-page/home/home.component';
import { AboutComponent } from './view/landing-page/about/about.component';
import { ChefPageComponent } from './view/chef-page/chef-page.component';


export const routes: Routes = [
    { path: 'landing', component: LandingPageComponent },
    { path: '', component: LandingPageComponent ,children: [
        {path:'', component: HomeComponent},
        {path:'about', component: AboutComponent}
    ]},
    { path: 'chef', component: ChefPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error' }

];
