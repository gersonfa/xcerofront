import { Component, OnInit } from "@angular/core";
import { BaseService } from "../_services/bases.service";
import { Base } from "../_models/base";

@Component({
  templateUrl: './bases.component.html'
})

export class BasesComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;

  public bases: Base[] = []
  markers: any[] = []

  constructor(
    private baseService: BaseService
  ) {}

  ngOnInit() {
    this.zoom = 8;
    this.latitude = 18.703139;
    this.longitude = -97.911509;

    this.baseService.base_list().subscribe(
      bases => {
        this.bases = bases;
        this.bases.map(b => {
          const marker = {
            longitude: Number(b.coords[0]),
            latitude: Number(b.coords[1]),
            label: b.name
          }

          this.markers.push(marker)
        })
      }
    )
  }
}
