import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = '';

  favorites = '';

  personal = '';

  constructor(private SharedService:SharedService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

  }
}
