import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/model/User';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {OrderService} from '../../shared/services/order.service';
import { Order } from '../../shared/model/Order';
import { Observable } from 'rxjs';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [MatCardModule,
    MatListModule,
    DateFormatPipe,
    AsyncPipe
  ]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.user = JSON.parse(userJson);
          if(this.user!==null){
          this.orders$ = this.orderService.getOrdersByUser(this.user.id);
        }
    }
  }
}
