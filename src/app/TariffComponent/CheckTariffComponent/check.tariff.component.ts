import { Component, OnInit } from "@angular/core";
import { PlacesService } from "../../_services/places.service";
import { ColonyService } from "../../_services/colony.service";
import { Observable } from "rxjs/Rx";
import { FormControl } from "@angular/forms";
import { TariffService } from "../../_services/tariff.service";

@Component({
  templateUrl: './check.tariff.component.html',
  selector: 'check-tariff'
})

export class CheckTariffComponent implements OnInit {
  sites: any[] = [];
  site1: FormControl;
  site2: FormControl;
  tariff: any;
  loading: boolean = false;
  constructor(
    private placeService: PlacesService,
    private colonyService: ColonyService,
    private tariffService: TariffService
  ) {}

  ngOnInit() {
    this.site1 = new FormControl();
    this.site2 = new FormControl();

    const places$ = this.placeService.places_list();
    const colonies$ = this.colonyService.colony_list();

    Observable.zip(
      places$,
      colonies$,
      (
        places: any[],
        colonies: any[]
      ) => ({ places, colonies })
    ).subscribe( data => {
      this.sites = [...data.places, ...data.colonies];
      console.log(this.sites)
    })
  }

  selectSites(site) {
    if (this.site1.value && this.site2.value) {
      this.loading = true;
      let site1 = this.sites.find(s => this.site1.value == s._id)
      let site2 = this.sites.find(s => this.site2.value == s._id)

      let check = {};

      if (site1.group || site2.group) {
        check = {
          colony_one: site1.group ? site1._id : site2._id,
          colony_two: site1.group && site2.group ? site2._id : '',
          place_two: site1.base ? site1._id : site2._id
        }
      } else {
        check = {
          place_one: site1._id,
          place_two: site2._id
        }
      }

      this.tariffService.tariff_check(check).subscribe(
        tariff => {
          this.tariff = tariff;
          this.loading = false;
        }
      )
    }
  }
}
