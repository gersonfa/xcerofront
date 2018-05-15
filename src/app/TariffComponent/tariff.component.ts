import { Component, OnInit } from "@angular/core";
import { GroupService } from "../_services/group.service";
import { Group } from "../_models/group";
import { TariffService } from "../_services/tariff.service";
import { Tariff } from "../_models/tariff";

@Component({
  templateUrl: './tariff.component.html'
})

export class TariffComponent implements OnInit {
  private groups: Group[] = []
  private groups_available: Group[] = []
  private group_selected: string;
  private second_group_selected: string;
  public cost: number;

  public tariffs: Tariff[] = []
  constructor(
    private groupService: GroupService,
    private tariffService: TariffService
  ) {}

  ngOnInit() {
    this.groupService.group_list().subscribe(
      groups => {
        this.groups = groups;
      }
    )

    this.tariffService.tariff_list().subscribe(
      tariffs => {
        this.tariffs = tariffs;
      }
    )
  }

  selectGroup(group_id) {
    this.groupService.group_list_available(group_id).subscribe(
      groups => {
        this.groups_available = groups;
      }
    )
  }

  saveTariff() {
    let tariff = {
      groups: [this.group_selected, this.second_group_selected],
      cost: this.cost
    }

    this.tariffService.tariff_create(tariff).subscribe(
      tariff => {
        this.tariffs.push(tariff);
        this.cost = null;
        this.groups_available = this.groups_available.filter(g => g._id !== this.second_group_selected)
        this.second_group_selected = null;
      }
    )
  }

}
