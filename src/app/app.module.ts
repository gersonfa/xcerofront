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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SearchTariffComponent } from './TariffComponent/SearchTariff/search.tariff.component';
import { EditTariffComponent } from './TariffComponent/EditTariffComponent/edit.tariff.component';
import { CommentsComponent } from './DriversComponent/DriverComponent/CommentsComponent/comments.component';
import { ReportsComponent } from './DriversComponent/DriverComponent/ReportsComponent/reports.component';
import { NoticeComponent } from './NoticeComponent/notice.component';
import { ReportDriversComponent } from './ReportDriversComponent/report.driver.component';
import { AreasComponent } from './BasesComponent/BaseComponent/AreasComponent/areas.component';
import { ColoniesComponent } from './BasesComponent/BaseComponent/ColoniesComponent/colonies.component';
import { GroupComponent } from './BasesComponent/BaseComponent/GroupComponent/group.component';
import { AreaService } from './_services/area.service';
import { GlobalServicesComponent } from './GlobalServicesComponent/global.services.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl  } from 'ng-pick-datetime';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'BEARER',
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

export class DefaultInit extends OwlDateTimeIntl {
  setBtnLabel = 'Establecer';
  cancelBtnLabel = 'Cancelar';
  rangeFromLabel = 'Desde';
  rangeToLabel = 'A';
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
      { path: 'groups', component: GroupsComponent, children: [
        { path: 'group/:id', component: GroupComponent, children: [
          { path: '', redirectTo: 'colonies', pathMatch: 'full' },
          { path: 'colonies', component: ColoniesComponent },
          { path: 'areas', component: AreasComponent }
        ]}
      ] },
      //  Esta ruta se deja de usar
      { path: 'places', component: PlacesComponent }
    ]},
    { path: 'tariff', component: TariffComponent },
    { path: 'drivers', component: DriversComponent },
    { path: 'drivers/create', component: DriverFormComponent },
    { path: 'driver/:id', component: DriverComponent, children: [
      {path: '', redirectTo: 'services', pathMatch: 'full'},
      {path: 'services', component: ServicesComponent},
      { path: 'inbox', component: MessagesComponent},
      { path: 'comments', component: CommentsComponent },
      {path: 'reports', component: ReportsComponent}
    ]},
    { path: 'notices', component: NoticeComponent },
    { path: 'reports', component: ReportDriversComponent },
    {path: 'services', component: GlobalServicesComponent }
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
    CheckTariffComponent,
    SearchTariffComponent,
    EditTariffComponent,
    CommentsComponent,
    ReportsComponent,
    NoticeComponent,
    ReportDriversComponent,
    AreasComponent,
    ColoniesComponent,
    GroupComponent,
    GlobalServicesComponent
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
      apiKey: 'AIzaSyAn1XlqM5ds_ZrPavxj-Nh-rpJ3z5hBdXI',
      libraries: ['places']
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
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
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    AreaService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'mx' },
    { provide: OwlDateTimeIntl, useClass: DefaultInit },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
