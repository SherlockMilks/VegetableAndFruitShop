import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../shared/model/CartItem';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { PricePerUnitPipe } from '../../shared/pipes/price-per-unit.pipe';
import { User } from '../../shared/model/User';
import { Order } from '../../shared/model/Order';
import { Router } from '@angular/router';
import {OrderService} from '../../shared/services/order.service'

@Component({
  selector: 'app-basket',
  imports: [MatIconModule, MatTableModule, MatButtonModule, MatFormFieldModule, FormsModule, MatCardModule, MatInputModule, PricePerUnitPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  error: string='';
  user: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
  cartItems: CartItem[] = [];

  constructor(private router: Router, private orderService: OrderService) {}

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'delete'];

  ngOnInit(): void {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  onItemAmountChange($event: CartItem):void {
    this.error=''
    const index = this.cartItems.findIndex(ci => ci.item.id === $event.item.id);
    if (index !== -1) {
      if($event.amount<0){
        this.deleteItem($event);
      }
      else if($event.amount>100){
        this.error="Please use a valid number!"
      }
      else{
        const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
        this.cartItems[index] = $event;
        existingCart[index].amount = $event.amount;
        localStorage.setItem('cartItems', JSON.stringify(existingCart));
      }  
    }
  }

  deleteItem(cartItem: CartItem): void {
    this.cartItems = this.cartItems.filter(item => item.item.id !== cartItem.item.id);

    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    const updatedCart = existingCart.filter(ci => ci.item.id !== cartItem.item.id);

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    this.error = '';
  }

  buy(){
    this.error=''
    if(this.user){
      if(this.cartItems.length==0){
        this.error='Empty cart!';
        return;
      }

      const order:Order={
        orderBy:this.user,
        orderedItems:this.cartItems,
        orderDate: new Date()
      }
      
      this.orderService.saveOrder(order)
      .then(() => console.log('New order:', order))
      .catch(err => console.error('Error saving order:', err));
      
      localStorage.removeItem('cartItems');
      this.router.navigateByUrl('/profile');
      }
    else{
      this.error='Sign in to order!'
    }
  }
  
}
