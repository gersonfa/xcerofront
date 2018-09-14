import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DriversService } from "../../../_services/drivers.service";

@Component({
  templateUrl: './messages.component.html'
})

export class MessagesComponent implements OnInit {
  body: string;
  driver_id: string;

  inboxs: any[] = []

  constructor(
    private route: ActivatedRoute,
    private driversService: DriversService
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => this.driver_id = params['id']
    )

    this.driversService.driver_inbox_list(this.driver_id).subscribe(
      inboxs => this.inboxs = inboxs
    )
  }

  send() {
    if (this.body != null && this.body !== '') {
      const inbox = {
        date: (new Date).getTime(),
        body: this.body
      }
      this.driversService.driver_inbox_create(this.driver_id, inbox).subscribe(
        inbox_c => {
          this.inboxs.unshift(inbox_c);
          this.body = '';
        }
      )
    }
  }
}
