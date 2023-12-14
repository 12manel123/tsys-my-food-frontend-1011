import { Routes } from '@angular/router';


import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { HomeComponent } from './view/landing-page/home/home.component';
import { AboutComponent } from './view/landing-page/about/about.component';
import { DashboardPageComponent } from './view/dashboard-page/dashboard-page.component';
import { TableUsersComponent } from './view/dashboard-page/table-users/table-users.component';
import { TableOrdersComponent } from './view/dashboard-page/table-orders/table-orders.component';
import { TableDishesComponent } from './view/dashboard-page/table-dishes/table-dishes.component';
import { TableMenuComponent } from './view/dashboard-page/table-menu/table-menu.component';
import { TableSlotsComponent } from './view/dashboard-page/table-slots/table-slots.component';
import { ChefPageComponent } from './view/chef-page/chef-page.component';
import { ErrorPageComponent } from './view/error-page/error-page.component';
import { LoginComponent } from './view/landing-page/login/login.component';
import { RegisterComponent } from './view/landing-page/register/register.component';
import { UserPageComponent } from './view/user-page/user-page.component';
import { InitialComponent } from './view/user-page/initial/initial.component';
import { OrderComponent } from './view/user-page/order/order.component';
import { userGuard } from './controllers/user.guard';
import { adminGuard } from './controllers/admin.guard';
import { chefGuard } from './controllers/chef.guard';


export const routes: Routes = [
    { path: 'landing', component: LandingPageComponent },
    { path: '', component: LandingPageComponent ,children: [
       {path:'', component: HomeComponent},
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]},

    { path: 'admin', component: DashboardPageComponent, canActivate : [adminGuard]  ,children: [
        {path:'users', component: TableUsersComponent ,   },
        {path:'orders', component: TableOrdersComponent },
        {path:'dishes', component: TableDishesComponent },
        {path:'menus', component: TableMenuComponent },
        {path:'slots', component: TableSlotsComponent },

      ]
    },
    { path: 'user', component: UserPageComponent, canActivate: [userGuard] , children: [
      {path:'initial', component: InitialComponent  },
      {path:'order', component: OrderComponent },
      ]
    },

    { path: 'chef', component: ChefPageComponent , canActivate : [chefGuard]},
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error' }

];
