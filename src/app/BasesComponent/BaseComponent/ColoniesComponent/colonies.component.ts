import { Component, OnInit, NgZone, ElementRef, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { SnotifyService } from "ng-snotify";
import { ColonyService } from "../../../_services/colony.service";
import { Group } from "../../../_models/group";

@Component({
  templateUrl: './colonies.component.html'
})

export class ColoniesComponent implements OnInit, OnDestroy {
  public groups: Group[] = [];
  public base_id: string;
  public subscription: any;

  public new_group_name: string = '';

  public latitude: number;
  public longitude: number;
  public zoom: number;

  @ViewChild("search") public searchElementRef: ElementRef;

  public colonyForm: FormGroup;
  public name: FormControl;

  public colonies: any[] = [];

  public group_id: any;

  constructor(
    private colonyService: ColonyService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.zoom = 9;
    this.latitude = 18.703139;
    this.longitude = -97.911509;

    this.subscription = this.route.parent.params.subscribe(params => {
      this.group_id = params['id'];
      console.log(this.group_id)
    });

    this.colonyService.colony_by_group(this.group_id).subscribe(
      colonies => {
        this.colonies = []
        colonies.map(colony => {
          const marker = {
            longitude: Number(colony.coords[0]),
            latitude: Number(colony.coords[1]),
            label: colony.name,
            _id: colony._id
          }
          this.colonies.push(marker);
        });


      }
    )



    this.name = this.fb.control('', Validators.required);

    this.colonyForm = this.fb.group({
      name: this.name,
      place_id: '',
      lat: '',
      lng: ''
    })

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["(regions)"]
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

          this.name.setValue(place.name);
          this.colonyForm.value.place_id = place.place_id;
          this.colonyForm.value.lat = place.geometry.location.lat();
          this.colonyForm.value.lng = place.geometry.location.lng();

          this.colonyService.colony_create(this.group_id, this.colonyForm.value).subscribe(
            colony => {
              const marker = {
                longitude: Number(colony.coords[0]),
                latitude: Number(colony.coords[1]),
                label: colony.name,
                _id: colony._id
              }

              this.colonies.push(marker);
              this.colonyForm.reset();
            },
            error => {
              const body = JSON.parse(error._body);
              console.log(body)
              if (body.error.includes('duplicate key')) {
                this.snotifyService.error('La colonia ya esta registrada.');
              }
            }
          )
        });
      });
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete_colony(colony) {
    this.colonyService.colony_delete(colony._id).subscribe(
      colony_deleted => this.colonies = this.colonies.filter(c => c._id !== colony_deleted._id)
    )
  }
}
