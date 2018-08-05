import { Component, OnInit } from "@angular/core";
import { GroupService } from "../_services/group.service";
import { TariffService } from "../_services/tariff.service";
import { Tariff } from "../_models/tariff";
import { BaseService } from "../_services/bases.service";

@Component({
  templateUrl: "./tariff.component.html"
})
export class TariffComponent implements OnInit {
  private groups_places: any[] = [];
  private group_selected: string = "";
  public base_selected: string = '';

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

  public pages: any = [];
  public current: number;
  public count: number;
  public loading_tariffs: boolean = false;

  public bases: any[] = [];

  constructor(
    private groupService: GroupService,
    private tariffService: TariffService,
    private baseService: BaseService
  ) {}

  ngOnInit() {
    this.loading_tariffs = true;

    this.groupService.group_place_list().subscribe(groups_places => {
      this.groups_places = groups_places.sort(this.sort);
    });

    this.tariffService.tariff_list().subscribe(response => {
      this.tariffs = response.tariffs.sort(this.sortTariffs);
      this.pages = response.pages;
      this.current = response.current;
      this.count = response.count;
      this.loading_tariffs = false;
    });

    this.baseService.base_list().subscribe(
      bases => this.bases = bases.sort(this.sortBases)
    )
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

  sortBases(a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }

    return 0;

  }

  selectGroup(last_gp?) {
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
      if (last_gp) {
        const last_item = this.groups_places_available.find(gp_last => gp_last.base === last_gp.base);
        if (last_item) {
          this.second_group_selected = last_item._id;
        } else {
          this.second_group_selected = '';
        }
      }
      this.loading_available = false;
    });
  }

  pageChanged(page) {
    this.loading_tariffs = true;
    this.tariffService.tariff_list(page, this.base_selected ? this.base_selected : '').subscribe(response => {
      this.tariffs = response.tariffs.sort(this.sortTariffs);
      if (this.base_selected) {
        this.tariffs = this.tariffs.map(t => this.orderBaseName(t));
      }
      this.pages = response.pages;
      this.current = response.current;
      this.loading_tariffs = false;
    });
  }

  saveTariff() {

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

    this.tariffService
      .tariff_create(tariff as Tariff)
      .subscribe(tariff_created => {
        this.tariffs.push(tariff_created);
        this.tariffs = this.tariffs.sort(this.sortTariffs);
        this.cost = null;
        this.selectGroup(gp2);
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

  reload() {
    this.loading_tariffs = true;
    this.tariffService.tariff_list().subscribe(response => {
      this.tariffs = response.tariffs.sort(this.sortTariffs);
      this.pages = response.pages;
      this.current = response.current;
      this.count = response.count;
      this.loading_tariffs = false;
    });
  }

  sort(a, b) {
    if (a.base < b.base) { return -1; }
    if (a.base > b.base) { return 1; }

    return 0;

  }

  selectBase(base_id) {
    console.log(base_id)
    this.loading_tariffs = true;
    if (base_id === '') {
      this.tariffService.tariff_list().subscribe(
        response => {
          this.tariffs = response.tariffs.sort(this.sortTariffs)
          this.pages = response.pages;
          this.current = response.current;
          this.count = response.count;
          this.loading_tariffs = false;
        }
      )
    } else {
      this.tariffService.tariff_list(1, base_id).subscribe(
        response => {
          this.tariffs = response.tariffs.sort(this.sortTariffs).map(t => this.orderBaseName(t));
          this.pages = response.pages;
          this.current = response.current;
          this.count = response.count;
          this.loading_tariffs = false;
        }
      )
    }
  }

  orderBaseName(a) {

    console.log(a)

    if (a.origin_group && a.origin_group.base._id !== this.base_selected ) {
      if (a.destiny_place) {
        a.origin_place = a.destiny_place;
        a.destiny_group = a.origin_group;

        delete a.origin_group;
        delete a.destiny_place;
      } else {
        let copy = a.origin_group;
        a.origin_group = a.destiny_group;
        a.destiny_group = copy;
      }
    }

    if (a.origin_place && a.origin_place.base._id !== this.base_selected) {
      if (a.destiny_group) {
        let copy = a.destiny_group;
        a.destiny_place = a.origin_place;
        a.origin_group = copy;
        delete a.destiny_group;
        delete a.origin_place;
      } else {
        let copy = a.destiny_place;
        a.destiny_place = a.origin_place;
        a.origin_place = copy;
      }

    }

    return a;
  }
}
