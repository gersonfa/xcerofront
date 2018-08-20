import { Component, OnInit } from "@angular/core";
import { DriversService } from "../_services/drivers.service";

@Component({
  templateUrl: './notice.component.html'
})

export class NoticeComponent implements OnInit {
  body: string = '';
  public notices: any[] = [];
  constructor(
    private driversService: DriversService
  ) {}

  ngOnInit() {
    this.driversService.notice_list().subscribe(
      notices => this.notices = notices
    )
  }

  create() {
    const notice = {
      body: this.body,
      date: (new Date).getTime()
    }

    this.driversService.notice_create(notice).subscribe(
      response => {
        this.notices.unshift(response);
        this.body = '';
      }
    )
  }

  delete(id) {
    this.driversService.notice_delete(id).subscribe(
      notice => this.notices = this.notices.filter(n => id !== n._id)
    )
  }
}
