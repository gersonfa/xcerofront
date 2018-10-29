import { Component, OnInit } from '@angular/core'
import { DriversService } from '../_services/drivers.service'

@Component({
  templateUrl: './analysis.component.html'
})
export class AnalysisComponent implements OnInit {
  public dateTime: Date = new Date()
  public dateTime2: Date = new Date()

  loading: boolean = false
  counter: any = []
  services = []
  markers = []
  zoom = 12
  latitude = 19.040034
  longitude = -98.263005
  counter_analysis = {
    negated: 0,
    completed: 0,
    canceled: 0,
    unavailable: 0
  };

  analysis;

  constructor(private driversService: DriversService) {}

  ngOnInit() {
    this.dateTime.setHours(0, 0, 0, 0)
    this.dateTime2.setHours(23, 59, 59, 59)
  }

  search() {
    this.loading = true

    const init_date = this.dateTime.getTime()
    const end_date = this.dateTime2.getTime()

    this.driversService
      .service_count({ init_date: init_date - 20000000, end_date })
      .subscribe(count => (this.counter = count))

    this.driversService
      .analysis_list({ init_date: init_date - 20000000, end_date })
      .subscribe(res => {
        this.counter_analysis = {
          negated: 0,
          completed: 0,
          canceled: 0,
          unavailable: 0
        };
        this.services = res;
        this.services.map(s => {
          if (s.drivers.length === 0) {
            this.counter_analysis.unavailable += 1;
          } else if (s.service.state === 'negated') {
            this.counter_analysis.negated += 1;
          } else if (s.service.state === 'completed') {
            this.counter_analysis.completed += 1;
          } else if (s.service.state === 'canceled') {
            this.counter_analysis.canceled += 1;
          }
        })
        this.loading = false;
        this.markers = this.services.map(d => {
          return {
            longitude: Number(d.service.origin_coords[0]),
            latitude: Number(d.service.origin_coords[1]),
            icon:
              d.drivers.length === 0
                ? 'assets/unavailable.png'
                : d.service.state === 'negated'
                  ? 'assets/red.png'
                  : d.service.state === 'canceled'
                  ? 'assets/canceled.png'
                  : 'assets/completed.png'
          }
        })
      })
  }

  total_request() {
    let total = 0
    this.counter.map(c => (total += c.count))
    return total;
  }

  get_analysis(a) {
    this.driversService.analysis_details(a).subscribe(
      res => {
        this.analysis = res;
      }
    )
  }
}
