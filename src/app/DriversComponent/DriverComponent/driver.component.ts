import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DriversService } from "../../_services/drivers.service";
import { FormControl } from "@angular/forms";

@Component({
  templateUrl: './driver.component.html'
})

export class DriverComponent implements OnInit {
  driver: any;
  driver_id: string;
  enable: FormControl;
  constructor(
    private route: ActivatedRoute,
    private driverService: DriversService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => this.driver_id = params['id']
    )

    this.driverService.driver_details(this.driver_id).subscribe(
      driver => {
        this.driver = driver;
        this.enable = new FormControl(this.driver.enable)
      }
    )
  }

  changeEnable() {
    this.driverService.driver_update(this.driver_id, {enable: !this.driver.enable}).subscribe(
      driver => {
        this.driver.enable = driver.enable;
        this.enable.setValue(driver.enable);
      }
    )
  }

  deleteDriver(modal) {
    this.driverService.driver_delete(this.driver._id).subscribe(
      driver => {
        this.router.navigate(['/dashboard/drivers'])
        modal.hide();
      }
    )
  }
}
