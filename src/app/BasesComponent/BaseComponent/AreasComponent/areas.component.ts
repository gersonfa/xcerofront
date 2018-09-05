import { Component } from "@angular/core";
import { LatLngLiteral } from "@agm/core";

@Component({
  templateUrl: './areas.component.html'
})

export class AreasComponent {
  zoom = 9;
  latitude = 18.703139;
  longitude = -97.911509;

  polygon: LatLngLiteral[] = [
    {lat: 18.994334, lng: -98.212743 },
    {lat: 18.999015, lng: -98.209808},
    {lat: 18.996578, lng: -98.219326}
  ]

  constructor() {}



}
