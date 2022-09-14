import { ChatService } from './../../services/chat.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, NavbarComponent,ChatService],
})
export class LoginComponent implements OnInit {
  email: any;

  password: any;

  errmessage: any;

  emailerr = 'd-none';

  passworderr = 'd-none';

  constructor(
    private UserService: UserService,
    private Router: Router,
    private NavbarComponent: NavbarComponent,
    private ChatService:ChatService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }
  login() {
    const user = {
      email: this.email,
      password: this.password,
    };
    this.UserService.login(user).subscribe((data: any) => {
      if (data.message.split(' ')[0] == 'password') {
        this.emailerr = 'd-none';
        this.errmessage = data.message;

        this.passworderr = '';
      } else if (data.message.split(' ')[0] == 'email') {
        this.passworderr = 'd-none';
        this.errmessage = data.message;
        this.emailerr = '';
      } else if (data.message == 'welcome') {
        localStorage.setItem('userToken', data.token);

        this.Router.navigate(['/home']);
      }
      // this.router.navigate(['/login']);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
  }
}
