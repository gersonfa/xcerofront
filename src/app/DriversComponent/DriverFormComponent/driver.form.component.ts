import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { SnotifyService } from "ng-snotify";
import { Router } from "@angular/router";

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
  license_plate: FormControl;
  brand_car: FormControl;
  model_car: FormControl;

  public imageURL: string = "http://via.placeholder.com/250x300";

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private snotifyService: SnotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.account = this.fb.control("", Validators.required);
    this.password = this.fb.control("", Validators.required);
    this.email = this.fb.control("");
    this.full_name = this.fb.control("", Validators.required);
    this.unit_number = this.fb.control('', Validators.required);
    this.license_plate = this.fb.control('', Validators.required);
    this.brand_car = this.fb.control('', Validators.required);
    this.model_car = this.fb.control('', Validators.required);
    this.role = this.fb.control('Driver', Validators.required);
    //this.image = this.fb.control(this.imageURL, Validators.required);

    this.driverForm = this.fb.group({
      account: this.account,
      password: this.password,
      email: this.email,
      full_name: this.full_name,
      role: this.role,
      image: this.imageURL,
      unit_number: this.unit_number,
      license_plate: this.license_plate,
      brand_car: this.brand_car,
      model_car: this.model_car
    });
  }

  create_driver() {
    this.authenticationService.user_create(this.driverForm.value).subscribe(
      driver => {
        this.snotifyService.success(`Unidad ${driver.user.unit_number} creado correctamente`);
        this.router.navigate(['/dashboard/drivers'])
      }
    )
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
        this.driverForm.value.image = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
}
