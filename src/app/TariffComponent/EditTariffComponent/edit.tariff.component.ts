import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TariffService } from "../../_services/tariff.service";

@Component({
  templateUrl: './edit.tariff.component.html',
  selector: 'edit-tariff'
})

export class EditTariffComponent implements OnInit {
  @Input() tariff_id;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  new_cost: number;
  tariff: any;

  constructor(
    private tariffService: TariffService
  ) {}

  ngOnInit() {
    this.tariffService.tariff_details(this.tariff_id).subscribe(
      tariff => this.tariff = tariff
    )
  }

  deleteTariff() {
    this.tariffService.tariff_delete(this.tariff._id).subscribe(tariff => {
      this.delete.emit(tariff._id);
    });
  }

  editTariff(modal) {
    const tariff = Object.assign({}, this.tariff);
    tariff.cost = this.new_cost;

    this.tariffService.tariff_update(tariff).subscribe(tariff_update => {
      this.update.emit(tariff_update);
      modal.hide();
    });
  }

}
