import { Component, OnInit } from "@angular/core";
import { DriversService } from "../../../_services/drivers.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './services.component.html'
})

export class ServicesComponent implements OnInit {
  driver_id: string;
  services: any[] = [];

  time: string = 'day';
  constructor(
    private driversService: DriversService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => this.driver_id = params['id']
    )

    this.driversService.driver_services(this.driver_id, 'day').subscribe(
      services => this.services = services
    )
  }

  getServices() {
    this.driversService.driver_services(this.driver_id, this.time).subscribe(
      services => this.services = services
    )
  }

  getTotal() {
    let total = 0;
    this.services.map(s => {
      if (s.state == 'completed') {
        total++;
      }
    });
    return total;
  }

  getCost(service) {
    let total = 0;
    service.fees.map(f => total += f.price);
    total += service.tariff ? service.tariff.cost : 0;
    return total;
  }
}
