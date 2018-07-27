import { Component, OnInit } from "@angular/core";
import { GroupService } from "../_services/group.service";
import { TariffService } from "../_services/tariff.service";
import { Tariff } from "../_models/tariff";

@Component({
  templateUrl: "./tariff.component.html"
})
export class TariffComponent implements OnInit {
  private groups_places: any[] = [];
  private group_selected: string = "";

  private groups_places_available: any[] = [];

  private second_group_selected: string = "";
  public cost: number;

  private loading_available: boolean;
  private loading_all: boolean;

  private selected_tariff: Tariff;

  public select_percentage: boolean = false;
  public select_quantity: boolean = false;
  public update_type: any = {};

  public tariffs: Tariff[] = [];

  constructor(
    private groupService: GroupService,
    private tariffService: TariffService
  ) {}

  ngOnInit() {
    this.groupService.group_place_list().subscribe(groups_places => {
      this.groups_places = groups_places.sort(this.sort);
    });

    this.tariffService.tariff_list().subscribe(tariffs => {
      this.tariffs = tariffs.sort(this.sortTariffs);
    });
  }

  sortTariffs(a, b) {
    const aproperty1 = a.origin_group ? a.origin_group : a.origin_place;
    const aproperty2 = aproperty1.base.name;

    const bproperty1 = b.origin_group ? b.origin_group : b.origin_place;
    const bproperty2 = bproperty1.base.name;

    if (aproperty1.name < bproperty1.name) {
      return -1;
    }
    if (aproperty1.name > bproperty1.name) {
      return 1;
    }

    if (aproperty1.name === bproperty1.name) {
      if (aproperty2 < bproperty2) {
        return -1;
      }
      if (aproperty2 > bproperty2) {
        return 1;
      }
      return 0;
    }
  }

  selectGroup() {
    if (this.group_selected === "") {
      return;
    }
    const gp = this.groups_places.find(g => g._id === this.group_selected);
    let params = {};
    if (gp.type === "group") {
      params = { group_id: gp._id };
    } else {
      params = { place_id: gp._id };
    }
    this.loading_available = true;
    this.groupService.group_list_available(params).subscribe(groups_places => {
      this.groups_places_available = groups_places.sort(this.sort);
      this.loading_available = false;
    });
  }

  saveTariff() {
    console.log(this.group_selected);

    const gp1 = this.groups_places.find(gp => gp._id === this.group_selected);
    const gp2 = this.groups_places_available.find(
      gp => gp._id === this.second_group_selected
    );
    let tariff = {};

    if (gp1.type === "group") {
      if (gp2.type === "group") {
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
      if (gp2.type === "group") {
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

    console.log(tariff);

    this.tariffService
      .tariff_create(tariff as Tariff)
      .subscribe(tariff_created => {
        this.tariffs.push(tariff_created);
        this.tariffs = this.tariffs.sort(this.sortTariffs);
        this.cost = null;
        this.selectGroup()
        this.second_group_selected = '';
      });
  }

  deleteTariff(tariffId) {
    this.tariffService.tariff_delete(tariffId).subscribe(tariff => {
      this.tariffs = this.tariffs.filter(t => t._id !== tariff._id);
    });
  }

  editTariff(modal) {
    this.tariffService.tariff_update(this.selected_tariff).subscribe(tariff => {
      this.tariffs = this.tariffs.map(t => {
        if (t._id === tariff._id) {
          t = tariff;
        }
        return t;
      });
      modal.hide();
    });
  }

  updateAll(modal) {
    this.loading_all = true;
    this.tariffService
      .tariff_update_all(this.update_type)
      .subscribe(tariffs => {
        this.tariffs = tariffs;
        this.tariffs = tariffs.sort(this.sortTariffs);
        this.select_percentage = false;
        this.select_quantity = false;
        this.update_type = {};
        this.loading_all = false;
        modal.hide();
      });
  }

  sort(a, b) {
    if (a.base < b.base) { return -1; }
    if (a.base > b.base) { return 1; }

    return 0;

  }
}
