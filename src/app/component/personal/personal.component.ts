import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  @Input() personal: any;

  userdata :any;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.userdata = data.userData;
    });
  }
}
