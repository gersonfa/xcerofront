import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  templateUrl: "./driver.form.component.html"
})
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup;
  account: FormControl;
  password: FormControl;
  email: FormControl;
  full_name: FormControl;

  public imageURL: string = "http://via.placeholder.com/250x300";

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.account = this.fb.control("", Validators.required);
    this.password = this.fb.control("", Validators.required);
    this.email = this.fb.control("");
    this.full_name = this.fb.control("", Validators.required);

    this.driverForm = this.fb.group({
      account: this.account,
      password: this.password,
      email: this.email,
      full_name: this.full_name,
      role: "Driver",
      image: this.imageURL
    });
  }

  create_driver() {
    this.authenticationService.user_create(this.driverForm.value).subscribe(
      driver => {
        this.driverForm.reset();
      }
    )
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}
