import { Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { HomeComponent } from './view/landing-page/home/home.component';
import { AboutComponent } from './view/landing-page/about/about.component';
import { DashboardPageComponent } from './view/dashboard-page/dashboard-page.component';
import { TableUsersComponent } from './view/dashboard-page/table-users/table-users.component';
import { TableOrdersComponent } from './view/dashboard-page/table-orders/table-orders.component';
import { TableDishesComponent } from './view/dashboard-page/table-dishes/table-dishes.component';
import { TableListOrderComponent } from './view/dashboard-page/table-list-order/table-list-order.component';
import { TableMenuComponent } from './view/dashboard-page/table-menu/table-menu.component';
import { TableSlotsComponent } from './view/dashboard-page/table-slots/table-slots.component';
import { ChefPageComponent } from './view/chef-page/chef-page.component';
import { ErrorPageComponent } from './view/error-page/error-page.component';
import { LoginComponent } from './view/landing-page/login/login.component';
import { RegisterComponent } from './view/landing-page/register/register.component';
import { UserPageComponent } from './view/user-page/user-page.component';
import { InitialComponent } from './view/user-page/initial/initial.component';


export const routes: Routes = [
    { path: 'landing', component: LandingPageComponent },
    { path: '', component: LandingPageComponent ,children: [
       {path:'', component: HomeComponent},
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]},
    { path: 'admin', component: DashboardPageComponent ,children: [
        {path:'users', component: TableUsersComponent},
        {path:'orders', component: TableOrdersComponent},
        {path:'dishes', component: TableDishesComponent},
        {path:'listorder', component: TableListOrderComponent},
        {path:'menus', component: TableMenuComponent},
        {path:'slots', component: TableSlotsComponent},
      ]
    },
    { path: 'user', component: UserPageComponent ,children: [
      {path:'initial', component: InitialComponent },
      ]
    },

    { path: 'chef', component: ChefPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error' }

];
