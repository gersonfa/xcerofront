import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { SnotifyService } from "ng-snotify";

@Component({
  templateUrl: "./driver.form.component.html"
})
export class DriverFormComponent implements OnInit {
  driverForm: FormGroup;
  account: FormControl;
  password: FormControl;
  email: FormControl;
  full_name: FormControl;
  unit_number: FormControl;
  role: FormControl;
  image: FormControl;

  public imageURL: string = "http://via.placeholder.com/250x300";

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.account = this.fb.control("", Validators.required);
    this.password = this.fb.control("", Validators.required);
    this.email = this.fb.control("");
    this.full_name = this.fb.control("", Validators.required);
    this.unit_number = this.fb.control('', Validators.required);
    this.role = this.fb.control('Driver', Validators.required);
    this.image = this.fb.control(this.imageURL, Validators.required);

    this.driverForm = this.fb.group({
      account: this.account,
      password: this.password,
      email: this.email,
      full_name: this.full_name,
      role: this.role,
      image: this.image,
      unit_number: this.unit_number
    });
  }

  create_driver() {
    this.authenticationService.user_create(this.driverForm.value).subscribe(
      driver => {
        this.driverForm.reset();
        console.log(this.driverForm.value)
        this.role.setValue('Driver');
        this.image.setValue("http://via.placeholder.com/250x300");
        this.snotifyService.success(`Unidad ${driver.user.unit_number} creado correctamente`);
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
