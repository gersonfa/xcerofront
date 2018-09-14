import { Component, OnInit } from "@angular/core";
import { DriversService } from "../_services/drivers.service";

@Component({
  templateUrl: './global.services.component.html'
})

export class GlobalServicesComponent implements OnInit {
  public dateTime: Date = new Date;
  public dateTime2: Date = new Date;

  public units: any[] = [{unit_number: '', services: []}];
  loading: boolean = false;
  unit_selected: any;

  constructor(
    private driversService: DriversService
  ) {}

  ngOnInit() {
    this.dateTime.setHours(0, 0, 0, 0);
    this.dateTime2.setHours(23, 59, 59, 59);
  }

  add_unit(value, i) {
    if (value === '' || value === undefined) { return; }
    if (i === 0) {
      this.units.push({ unit_number: value, services: []});
      this.units[i].unit_number = '';
      this.units[i].services = [];
    }
  }

  delete(value, i) {
    if (value === '' || value === null) {
      this.units.splice(i, 1);
    }
  }

  search() {
    this.loading = true;
    this.unit_selected = null;
    const init_date = this.dateTime.getTime();
    const end_date = this.dateTime2.getTime();
    const unit_numbers = this.units.filter(u => u.unit_number).map(u => u.unit_number);

    this.driversService.service_global({init_date, end_date, unit_numbers: JSON.stringify(unit_numbers)}).subscribe(
      services => {
        this.units = services;
        this.loading = false;
      }
    )
  }

  clean() {
    this.units = [{unit_number: '', services: []}];
  }

  calculateTotal(s) {
    let total = s.tariff ? s.tariff.cost : 0;
    s.fees.map(f => {
      total += f.price;
    })

    return total;
  }

  total() {
    let total = 0;
    this.units.map(u => {
      total += u.services.length;
    });

    return total;
  }
}
