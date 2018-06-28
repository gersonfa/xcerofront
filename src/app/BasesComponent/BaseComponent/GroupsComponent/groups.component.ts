import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Group } from "../../../_models/group";
import { GroupService } from "../../../_services/group.service";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { } from "@types/googlemaps";
import { ColonyService } from "../../../_services/colony.service";

@Component({
  templateUrl: './groups.component.html'
})

export class GroupsComponent implements OnInit, OnDestroy {
  public groups: Group[] = [];
  public base_id: string;
  public subscription: any;

  public new_group_name: string = '';

  public latitude: number;
  public longitude: number;
  public zoom: number;

  @ViewChild("search") public searchElementRef: ElementRef;
  public group_selected: Group;

  public colonyForm: FormGroup;
  public name: FormControl;

  public colonies: any[] = [];

  constructor(
    private groupService: GroupService,
    private colonyService: ColonyService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.zoom = 9;
    this.latitude = 18.703139;
    this.longitude = -97.911509;

    this.subscription = this.route.parent.params.subscribe(params => {
      this.base_id = params['id'];
    });

    this.groupService.group_by_base(this.base_id).subscribe(
      groups => {
        this.groups = groups;
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
          console.log(place)

          //set latitude, longitude and zoom
          this.name.setValue(place.name);
          this.colonyForm.value.place_id = place.place_id;
          this.colonyForm.value.lat = place.geometry.location.lat();
          this.colonyForm.value.lng = place.geometry.location.lng();

          this.colonyService.colony_create(this.group_selected._id, this.colonyForm.value).subscribe(
            colony => {
              const marker = {
                longitude: Number(colony.coords[0]),
                latitude: Number(colony.coords[1]),
                label: colony.name
              }

              this.colonies.push(marker);
              this.colonyForm.reset();
            }
          )
        });
      });
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  create_group() {
    this.groupService.group_create(this.base_id, { name: this.new_group_name }).subscribe(
      group => {
        this.groups.push(group)
        this.new_group_name = ''
      }
    )
  }

  selecte_group(group) {
    this.group_selected = group;
    this.colonyService.colony_by_group(this.group_selected._id).subscribe(
      colonies => {
        this.colonies = []
        colonies.map(colony => {
          const marker = {
            longitude: Number(colony.coords[0]),
            latitude: Number(colony.coords[1]),
            label: colony.name,
            _id: colony._id
          }
          this.colonies.push(marker)
        });


      }
    )
  }

  delete_colony(colony_id) {

  }
}
