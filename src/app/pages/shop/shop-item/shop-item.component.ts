import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../shared/model/Item';
import { CartItem } from '../../../shared/model/CartItem';
import { MatCardModule } from '@angular/material/card';
import { PricePerUnitPipe } from '../../../shared/pipes/price-per-unit.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shop-item',
  imports: [MatCardModule, PricePerUnitPipe, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})

export class ShopItemComponent {
  db: number=1;
  error: string=''

  @Input() item!: Item;
  @Output() addToCartEvent = new EventEmitter<CartItem>();

  addToCart(): void {
    this.error=''
    if(this.db>0 && this.db<101){
      const cartItem: CartItem={
        item: this.item,
        amount: this.db
      }
      this.addToCartEvent.emit(cartItem);
      console.log('New cartItem:', cartItem);
    }
    else{
      this.error="Enter a valid number!"
    }

  }

}
