import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DriversService } from "../../../_services/drivers.service";

@Component({
  templateUrl: './comments.component.html'
})

export class CommentsComponent implements OnInit {
  private driver_id;
  public reviews: any[] = [];
  constructor(
    private driverService: DriversService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => this.driver_id = params['id']
    );

    this.driverService.driver_reviews(this.driver_id).subscribe(
      reviews => this.reviews = reviews
    )
  }
}
