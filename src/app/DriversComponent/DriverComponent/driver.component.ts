import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { DriversService } from "../../_services/drivers.service";

@Component({
  templateUrl: './driver.component.html'
})

export class DriverComponent implements OnInit {
  driver: any;
  driver_id: string;
  constructor(
    private route: ActivatedRoute,
    private driverService: DriversService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => this.driver_id = params['id']
    )

    this.driverService.driver_details(this.driver_id).subscribe(
      driver => this.driver = driver
    )
  }
}
