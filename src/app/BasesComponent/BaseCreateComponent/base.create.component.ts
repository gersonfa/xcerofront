import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { } from "@types/googlemaps";
import { BaseService } from "../../_services/bases.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './base.create.component.html'
})

export class BaseCreateComponent implements OnInit {

  public baseForm: FormGroup
  public name: FormControl
  public address: FormControl

  public loading: boolean = false

  public lat: number = 51.678418
  public lng: number = 7.809007
  public zoom: number = 12

  public latitude: number;
  public longitude: number;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private baseService: BaseService,
    private route: Router
  ) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    })


  }

}
