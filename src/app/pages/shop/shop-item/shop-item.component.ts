import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../shared/model/Item';
import { CartItem } from '../../../shared/model/CartItem';
import { MatCardModule } from '@angular/material/card';
import { PricePerUnitPipe } from '../../../shared/pipes/price-per-unit.pipe';
import { FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-shop-item',
  imports: [MatCardModule, PricePerUnitPipe, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgStyle],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})

export class ShopItemComponent {
  db: number=1;
  error: string=''
  isError: boolean=true

  @Input() item!: Item;
  @Input() admin_e: boolean = false;

  @Output() addToCartEvent = new EventEmitter<CartItem>();
  @Output() deleteItemEvent = new EventEmitter<Item>();
  @Output() updateItemEvent = new EventEmitter<Item>();

  addToCart(): void {
    this.error=''
    if(this.db>0 && this.db<101){
      const cartItem: CartItem={
        item: this.item,
        amount: this.db
      }
      this.addToCartEvent.emit(cartItem);
      this.isError=false
      this.error="Product added to cart!"
      console.log('New cartItem:', cartItem);
    }
    else{
      this.isError=true
      this.error="Enter a valid number!"
    }

  }

  onDelete(): void {
    this.deleteItemEvent.emit(this.item);
  }

  onUpdate(): void {
    this.updateItemEvent.emit(this.item);
  }

}
