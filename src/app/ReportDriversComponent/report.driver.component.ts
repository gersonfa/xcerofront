import { Component, OnInit } from "@angular/core";
import { DriversService } from "../_services/drivers.service";

@Component({
  templateUrl: './report.drivers.component.html'
})

export class ReportDriversComponent implements OnInit {
  public reports: any[] = []
  constructor(
    private driversService: DriversService
  ) {}

  ngOnInit() {
    this.driversService.reports_list().subscribe(
      reports => this.reports = reports
    )
  }
}
