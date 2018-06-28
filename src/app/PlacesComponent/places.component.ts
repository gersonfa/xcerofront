import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { PlacesService } from "../_services/places.service";
import { MapsAPILoader } from "@agm/core";
import {} from "@types/googlemaps";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./places.component.html"
})
export class PlacesComponent implements OnInit {
  base_id: string;
  places: any[] = [];
  markers: any[] = [];

  public latitude: number;
  public longitude: number;
  public zoom: number;

  public place_name: string;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private placeService: PlacesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.zoom = 9;
    this.latitude = 18.703139;
    this.longitude = -97.911509;

    this.route.parent.params.subscribe(
      params => this.base_id = params['id']
    );

    this.placeService.places_by_base(this.base_id).subscribe(places => {
      this.places = places;

      this.places.map(place => {
        const marker = {
          longitude: Number(place.coords[0]),
          latitude: Number(place.coords[1]),
          label: place.name
        };

        this.markers.push(marker);
      });
    });


    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place);

          const new_place = {
            name: this.place_name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
            place_id: place.id,
            base: this.base_id
          };

          this.placeService.place_create(this.base_id, new_place).subscribe(place_created => {
            const marker = {
              longitude: place.geometry.location.lng(),
              latitude: place.geometry.location.lat(),
              label: place.name
            };

            this.markers.push(marker);
            this.places.push(place_created);

            this.place_name = "";
            this.searchElementRef.nativeElement.value = "";
          });
        });
      });
    });
  }
}
