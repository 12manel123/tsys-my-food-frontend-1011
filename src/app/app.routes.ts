import { Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { AboutComponent } from './pages/landing-page/about/about.component';
import { ChefPageComponent } from './pages/chef-page/chef-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TableUsersComponent } from './pages/dashboard-page/table-users/table-users.component';
import { TableOrdersComponent } from './pages/dashboard-page/table-orders/table-orders.component';
import { TableDishesComponent } from './pages/dashboard-page/table-dishes/table-dishes.component';
import { TableListOrderComponent } from './pages/dashboard-page/table-list-order/table-list-order.component';
import { TableMenuComponent } from './pages/dashboard-page/table-menu/table-menu.component';
import { TableSlotsComponent } from './pages/dashboard-page/table-slots/table-slots.component';


export const routes: Routes = [
    { path: 'landing', component: LandingPageComponent },
    { path: '', component: LandingPageComponent ,children: [
        {path:'', component: HomeComponent},
        {path:'about', component: AboutComponent}
    ]},
    { path: 'admin', component: DashboardPageComponent ,children: [
        {path:'users', component: TableUsersComponent},
        {path:'orders', component: TableOrdersComponent},
        {path:'dishes', component: TableDishesComponent},
        {path:'listorder', component: TableListOrderComponent},
        {path:'menus', component: TableMenuComponent},
        {path:'slots', component: TableSlotsComponent},
    ]},
    { path: 'chef', component: ChefPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error' }

];
