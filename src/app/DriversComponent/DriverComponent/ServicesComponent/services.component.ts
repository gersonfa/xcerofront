import { Component, OnInit } from "@angular/core";
import { DriversService } from "../../../_services/drivers.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './services.component.html'
})

export class ServicesComponent implements OnInit {
  driver_id: string;
  services: any[] = [];
  constructor(
    private driversService: DriversService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => this.driver_id = params['id']
    )

    this.driversService.driver_services(this.driver_id).subscribe(
      services => this.services = services
    )
  }
}
