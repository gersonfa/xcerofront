import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Base } from "../../_models/base";
import { BaseService } from "../../_services/bases.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: './base.component.html'
})

export class BaseComponent implements OnInit {
  base: Base;
  base_id: string;

  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => this.base_id = params['id']
    )

    this.baseService.base_details(this.base_id).subscribe(
      base => this.base = base
    )
  }

  baseDelete(modal) {
    this.baseService.base_delete(this.base_id).subscribe(
      base => {
        modal.hide();
        this.router.navigate(['/dashboard/bases']);
      }
    )
  }

  empty_base() {
    this.baseService.base_empty(this.base_id).subscribe(
      base => {
        this.base.stack = [];
      }
    )
  }

}
