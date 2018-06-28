import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";
import { BaseService } from "../_services/bases.service";
import { Base } from "../_models/base";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import {} from "@types/googlemaps";

@Component({
  templateUrl: "./bases.component.html"
})
export class BasesComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;

  public bases: Base[] = [];
  markers: any[] = [];

  public baseForm: FormGroup;
  public name: FormControl;
  public address: FormControl;

  public loading: boolean = false;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private baseService: BaseService
  ) {}

  ngOnInit() {
    this.zoom = 12;
    this.latitude = 19.040034;
    this.longitude = -98.263005;

    this.baseService.base_list().subscribe(bases => {
      this.bases = bases;
      this.bases.map(b => {
        const marker = {
          longitude: Number(b.coords[0]),
          latitude: Number(b.coords[1]),
          label: b.name
        };

        this.markers.push(marker);
      });
    });

    this.name = this.fb.control("", Validators.required);
    this.address = this.fb.control("", Validators.required);

    this.baseForm = this.fb.group({
      name: this.name,
      address: this.address,
      lat: "",
      lng: ""
    });

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.address.setValue(place.formatted_address);
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
    this.baseService.base_create(this.baseForm.value).subscribe(base => {
      this.bases.push(base);

      const marker = {
        longitude: Number(base.coords[0]),
        latitude: Number(base.coords[1]),
        label: base.name
      };

      this.markers.push(marker);
      this.baseForm.reset();
    });
  }
}
