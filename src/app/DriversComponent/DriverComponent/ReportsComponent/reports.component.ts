import { Component, OnInit } from "@angular/core";
import { DriversService } from "../../../_services/drivers.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './reports.component.html'
})

export class ReportsComponent implements OnInit {
  private driver_id;
  public reports: any[] = [];
  constructor(
    private driversService: DriversService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => this.driver_id = params['id']
    );

    this.driversService.driver_reports(this.driver_id).subscribe(
      reports => this.reports = reports
    )
  }
}
