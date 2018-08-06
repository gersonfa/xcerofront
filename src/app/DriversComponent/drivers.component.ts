import { Component, OnInit, OnDestroy } from "@angular/core";
import { DriversService } from "../_services/drivers.service";
import 'rxjs/add/observable/interval';
import { Observable } from "rxjs";

@Component({
  templateUrl: './drivers.component.html'
})

export class DriversComponent implements OnInit, OnDestroy {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  sub: any;

  drivers: any[] = [];
  driver_markers: any[] = [];

  driver_selected: string;

  constructor(
    private driversService: DriversService
  ) {}

  ngOnInit() {
    this.zoom = 12;
    this.latitude = 19.040034;
    this.longitude = -98.263005;

    this.driversService.drivers_list().subscribe(
      drivers => {
        this.drivers = drivers.sort(this.sort);
      }
    )

    this.mapDrivers();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  mapDrivers() {
    this.driversService.drivers_location().subscribe(
      drivers => {
        this.driver_markers = drivers.filter(d => d.coords).map(d => {
          if (d.coords) {
            return {
              longitude: Number(d.coords[0]),
              latitude: Number(d.coords[1]),
              label: d.unit_number.toString(),
              icon: d.emergency ? 'assets/car-emergency.png' : 'assets/car.png'
            };
          }
        });
      }
    )
    this.sub = Observable.interval(10000)
    .subscribe((val) => {
      this.driversService.drivers_location().subscribe(
        drivers => {
          this.driver_markers = drivers.filter(d => d.coords).map(d => {
            if (d.coords) {
              return {
                longitude: Number(d.coords[0]),
                latitude: Number(d.coords[1]),
                label: d.unit_number.toString(),
                icon: d.emergency ? 'assets/car-emergency.png' : 'assets/car.png'
              };
            }
          });
          console.log(this.driver_markers);
        }
      )
     })
  }

  selectDriver(driver) {
    this.driver_selected = this.drivers.find(d => driver.label == d.unit_number)._id;
  }

  zoomDriver(driver) {
    const driver_s = this.driver_markers.find(d => d.label == driver.unit_number.toString());
    this.longitude = driver_s.longitude;
    this.latitude = driver_s.latitude;

    this.zoom = 18;
  }

  sort(a, b) {
    if (a.unit_number < b.unit_number) { return -1; }
    if (a.unit_number > b.unit_number) { return 1; }

    return 0;

  }
}
