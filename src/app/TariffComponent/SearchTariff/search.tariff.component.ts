import { Component, Input } from "@angular/core";
import { TariffService } from "../../_services/tariff.service";

@Component({
  templateUrl: './search.teriff.component.html',
  selector: 'search-tariff'
})

export class SearchTariffComponent {
  @Input() groups_places: any[] = [];

  group_selected = '';
  group_selected2 = '';
  tariff: any;
  loading: boolean = false;

  constructor(
    private tariffService: TariffService
  ) {}

  selectGroup() {
    if (this.group_selected && this.group_selected2) {
      this.loading = true;
      this.tariffService.tariff_check_groups(this.group_selected, this.group_selected2).subscribe(
        tariff => {
          this.tariff = tariff;
          this.loading = false;
        }
      )
    }
  }

  deleted() {
    this.tariff = null;
    this.group_selected = this.group_selected2 = '';
  }

  edited(tariff) {
    this.tariff = tariff;
  }
}
