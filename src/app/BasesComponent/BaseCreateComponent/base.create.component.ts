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

    this.name = this.fb.control('', Validators.required)
    this.address = this.fb.control('', Validators.required)

    this.baseForm = this.fb.group({
      name: this.name,
      address: this.address,
      lat: '',
      lng: ''
    })

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.address.setValue(place.formatted_address)
          this.latitude = place.geometry.location.lat();
          this.baseForm.value.lat = this.latitude;

          this.longitude = place.geometry.location.lng();
          this.baseForm.value.lng = this.longitude;
          this.zoom = 12;
        });
      });
    });
  }

  base_save() {
    this.baseService.base_create(this.baseForm.value).subscribe(
      base => {
        this.route.navigate(['/dashboard/bases'])
      }
    )
  }
}
