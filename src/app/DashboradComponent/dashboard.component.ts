import { Component } from "@angular/core";
import { AuthenticationService } from "../_services/authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logOut() {
    this.authenticationService.logOut()
    this.router.navigate(['/login'])
  }
}
