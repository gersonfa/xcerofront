import { Component, OnInit } from "@angular/core";
import { DriversService } from "../_services/drivers.service";

@Component({
  templateUrl: './drivers.component.html'
})

export class DriversComponent implements OnInit {

  drivers: any[] = [];

  constructor(
    private driversService: DriversService
  ) {}

  ngOnInit() {
    this.driversService.drivers_list().subscribe(
      drivers => {
        this.drivers = drivers;
      }
    )
  }
}
