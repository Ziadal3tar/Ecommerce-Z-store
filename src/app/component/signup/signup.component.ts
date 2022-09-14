import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // providers: [NavbarComponent,FemaleComponent],
})
export class SignupComponent {
  constructor(
    private UserService: UserService,
    private router: Router,
    private http:HttpClient,

  ) {}

  firstName: any;

  lastName:any

  email: any;

  password: any;

  cPassword: any;

  phone: any;

  image: any;

  nameerr = 'd-none';

  emailerr = 'd-none';

  passworderr = 'd-none';

  Cpassworderr = 'd-none';

  phoneerr = 'd-none';

  errmessage = '';

  upload(event:any) {
    const file = event.target.files[0];
    this.image = file;
  }

  sendUser() {


    const formdata = new FormData();

    formdata.append('file', this.image);
    formdata.append('firstName', this.firstName);
    formdata.append('lastName', this.lastName);

    formdata.append('email', this.email);
    formdata.append('password', this.password);
    formdata.append('cPassword', this.cPassword);
    formdata.append('phone', this.phone);

    this.UserService.addUser(formdata).subscribe((data: any) => {
      if (data.message == 'error') {
        this.errmessage = data.validationError[0][0].message;
        if (
          this.errmessage
            .split(' ')[0]
            .slice(1, this.errmessage.split(' ')[0].length - 1) == 'email'
        ) {
          this.emailerr = '';
          this.nameerr = 'd-none';
          this.passworderr = 'd-none';
          this.Cpassworderr = 'd-none';
          this.phoneerr = 'd-none';
        } else if (
          this.errmessage
            .split(' ')[0]
            .slice(1, this.errmessage.split(' ')[0].length - 1) == 'password'
        ) {
          this.passworderr = '';
          this.nameerr = 'd-none';
          this.emailerr = 'd-none';
          this.Cpassworderr = 'd-none';
          this.phoneerr = 'd-none';
        } else if (
          this.errmessage
            .split(' ')[0]
            .slice(1, this.errmessage.split(' ')[0].length - 1) == 'cPassword'
        ) {
          this.Cpassworderr = '';
          this.nameerr = 'd-none';
          this.emailerr = 'd-none';
          this.passworderr = 'd-none';
          this.phoneerr = 'd-none';
        } else if (
          this.errmessage
            .split(' ')[0]
            .slice(1, this.errmessage.split(' ')[0].length - 1) == 'phone'
        ) {
          this.phoneerr = '';
          this.nameerr = 'd-none';
          this.emailerr = 'd-none';
          this.passworderr = 'd-none';
          this.Cpassworderr = 'd-none';
        } else if (
          this.errmessage
            .split(' ')[0]
            .slice(1, this.errmessage.split(' ')[0].length - 1) == 'userName'
        ) {
          this.nameerr = '';
          this.emailerr = 'd-none';
          this.passworderr = 'd-none';
          this.Cpassworderr = 'd-none';
          this.phoneerr = 'd-none';
        } else {
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
