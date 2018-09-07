import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, OnChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Group } from "../../../_models/group";
import { GroupService } from "../../../_services/group.service";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { } from "@types/googlemaps";
import { ColonyService } from "../../../_services/colony.service";
import {SnotifyService} from 'ng-snotify'

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

  public selected_group: any;
  public url: string = '';

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.subscription = this.route.parent.params.subscribe(params => {
      this.base_id = params['id'];
    });

    this.groupService.group_by_base(this.base_id).subscribe(
      groups => {
        this.groups = groups;
        if (this.groups.length > 0) {
          //this.group_selected = groups[0];
          this.router.navigate([`/dashboard/base/${this.base_id}/groups/group/${this.groups[0]._id}`]);
        }
      }
    )

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

  delete_group() {
    this.groupService.group_delete(this.base_id, this.group_selected._id).subscribe(
      group => {
        this.groups = this.groups.filter(g => g._id != group._id);
        if (this.groups.length > 0) {

        } else {
          this.colonies = []
        }
      }
    );
  }



}
