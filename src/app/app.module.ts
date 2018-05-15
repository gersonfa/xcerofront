import { BrowserModule } from '@angular/platform-browser';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
    { path: 'bases', component: BasesComponent},
    { path: 'bases/new', component: BaseCreateComponent},
    { path: 'base/:id', component: BaseComponent},
    { path: 'tariff', component: TariffComponent }
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BasesComponent,
    BaseCreateComponent,
    BaseComponent,
    TariffComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
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
    TariffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
