import { BrowserModule } from '@angular/platform-browser';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BarRatingModule } from "ngx-bar-rating";
import {NgxPaginationModule} from 'ngx-pagination';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './LoginComponent/login.component';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/authentication.guard';
import { DashboardComponent } from './DashboradComponent/dashboard.component';
import { BasesComponent } from './BasesComponent/bases.component';
import { BaseCreateComponent } from './BasesComponent/BaseCreateComponent/base.create.component';
import { BaseService } from './_services/bases.service';
import { BaseComponent } from './BasesComponent/BaseComponent/base.component';
import { GroupService } from './_services/group.service';
import { ColonyService } from './_services/colony.service';
import { TariffComponent } from './TariffComponent/tariff.component';
import { TariffService } from './_services/tariff.service';
import { DriversComponent } from './DriversComponent/drivers.component';
import { DriverFormComponent } from './DriversComponent/DriverFormComponent/driver.form.component';
import { DriversService } from './_services/drivers.service';
import { PlacesService } from './_services/places.service';
import { PlacesComponent } from './PlacesComponent/places.component';
import { SiteService } from './_services/site.service';
import { GroupsComponent } from './BasesComponent/BaseComponent/GroupsComponent/groups.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify'
import { DriverComponent } from './DriversComponent/DriverComponent/driver.component';
import { ServicesComponent } from './DriversComponent/DriverComponent/ServicesComponent/services.component';
import { MessagesComponent } from './DriversComponent/DriverComponent/MessagesComponent/messages.component';
import { CheckTariffComponent } from './TariffComponent/CheckTariffComponent/check.tariff.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'BEARER',
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'drivers', pathMatch: 'full'},
    { path: 'bases', component: BasesComponent},
    { path: 'bases/new', component: BaseCreateComponent},
    { path: 'base/:id', component: BaseComponent, children: [
      { path: '', redirectTo: 'groups', pathMatch: 'full' },
      { path: 'groups', component: GroupsComponent },
      { path: 'places', component: PlacesComponent }
    ]},
    { path: 'tariff', component: TariffComponent },
    { path: 'drivers', component: DriversComponent },
    { path: 'drivers/create', component: DriverFormComponent },
    { path: 'driver/:id', component: DriverComponent, children: [
      {path: '', redirectTo: 'services', pathMatch: 'full'},
      {path: 'services', component: ServicesComponent},
      { path: 'inbox', component: MessagesComponent}
    ]},
    { path: 'places', component: PlacesComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BasesComponent,
    BaseCreateComponent,
    BaseComponent,
    TariffComponent,
    DriversComponent,
    DriverFormComponent,
    DriverComponent,
    PlacesComponent,
    GroupsComponent,
    ServicesComponent,
    MessagesComponent,
    CheckTariffComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    SnotifyModule,
    BarRatingModule,
    RouterModule.forRoot(routes, {useHash: true}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAogodmHuA-P4Ais69knDP1HBlLOWCrCdg',
      libraries: ['places']
    })
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthenticationService,
    AuthGuard,
    BaseService,
    GroupService,
    ColonyService,
    TariffService,
    DriversService,
    PlacesService,
    SiteService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
