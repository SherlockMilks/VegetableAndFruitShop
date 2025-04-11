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

@Component({
  selector: 'app-basket',
  imports: [MatIconModule, MatTableModule, MatButtonModule, MatFormFieldModule, FormsModule, MatCardModule, MatInputModule, PricePerUnitPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  error: string='';
  user: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');


  constructor(private router: Router) {}
  

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'delete'];
  cartItems:Array<CartItem>=[
    {
      item: {id: 1, name: "Tomato", price: 999, description: "A ripe, red tomato, perfect for salads or sauces.", img: "images/tomatosss.PNG"},
      amount: 10
    },
    {
      item: {id: 2, name: "Carrot", price: 349, description: "A crunchy and sweet root vegetable, commonly used in soups and salads.", img: "images/carrot.PNG"},
      amount: 2
    },
    {
      item: {id: 5, name: "Orange", price: 649, description: "A citrus fruit packed with vitamin C, ideal for juicing or eating fresh.", img: "images/orange.PNG"},
      amount: 21
    }
  ]

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
        this.cartItems[index] = $event;
      }  
    }
  }

  deleteItem(cartItem: CartItem): void {
    this.cartItems = this.cartItems.filter(item => item.item.id !== cartItem.item.id);
    this.error = '';
  }

  buy(){
    this.error=''
    if(this.user){
      const order:Order={
        orderBy:this.user,
        orderedItems:this.cartItems
      }

      
    console.log('New order:', order);

    this.router.navigateByUrl('/home');
    }
    else{
      this.error='Sign in to order!'
    }
  }
  
}
