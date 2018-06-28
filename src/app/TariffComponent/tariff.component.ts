import { Component, OnInit } from "@angular/core";
import { GroupService } from "../_services/group.service";
import { Group } from "../_models/group";
import { TariffService } from "../_services/tariff.service";
import { Tariff } from "../_models/tariff";

@Component({
  templateUrl: './tariff.component.html'
})

export class TariffComponent implements OnInit {
  private groups_places: any[] = []

  private groups_places_available: any[] = []
  private group_selected: any;
  private second_group_selected: any;
  public cost: number;

  public tariffs: Tariff[] = []
  constructor(
    private groupService: GroupService,
    private tariffService: TariffService
  ) {}

  ngOnInit() {
    this.groupService.group_place_list().subscribe(
      groups_places => {
        this.groups_places = groups_places;
      }
    );

    this.tariffService.tariff_list().subscribe(
      tariffs => {
        this.tariffs = tariffs;
      }
    );
  }

  selectGroup(gp) {
    console.log(gp)
    this.groupService.group_place_list().subscribe(
      groups_places => {
        this.groups_places_available = groups_places;
      }
    )
  }

  saveTariff() {
    console.log(this.group_selected)

    const gp1 = this.groups_places.find(gp => gp._id === this.group_selected);
    const gp2 = this.groups_places_available.find(gp => gp._id === this.second_group_selected);
    let tariff = {};

    if (gp1.type === 'group') {
      if (gp2.type === 'group') {
        tariff = {
          origin_group: gp1._id,
          destiny_group: gp2._id,
          cost: this.cost
        };
      } else {
        tariff = {
          origin_group: gp1._id,
          destiny_place: gp2._id,
          cost: this.cost
        };
      }
    } else {
      if (gp2.type === 'group') {
        tariff = {
          origin_group: gp2._id,
          destiny_place: gp1._id,
          cost: this.cost
        };
      } else {
        tariff = {
          origin_place: gp1._id,
          destiny_place: gp2._id,
          cost: this.cost
        };
      }
    }

    console.log(tariff)

    /* this.tariffService.tariff_create(tariff).subscribe(
      tariff => {
        this.tariffs.push(tariff);
        this.cost = null;
        this.group_selected = null;
        this.second_group_selected = null;
      }
    ) */
  }

}
