import { Component} from '@angular/core';
import { Item } from '../../shared/model/Item';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { MatCardModule } from '@angular/material/card';
import { CartItem } from '../../shared/model/CartItem';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, FormsModule, MatFormFieldModule, ShopItemComponent, MatInputModule, MatButtonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})

export class ShopComponent {


  items: Item[] = [
    { id: 1, name: "Tomato", price: 999, description: "A ripe, red tomato, perfect for salads or sauces.", img: "images/tomatosss.PNG" },
    { id: 2, name: "Carrot", price: 349, description: "A crunchy and sweet root vegetable, commonly used in soups and salads.", img: "images/carrot.PNG" },
    { id: 3, name: "Apple", price: 549, description: "A sweet and tangy fruit, great for snacking or baking.", img: "images/apple.PNG" },
    { id: 4, name: "Pear", price: 799, description: "A juicy and soft fruit, perfect for desserts or eaten fresh.", img: "images/pear.PNG" },
    { id: 5, name: "Orange", price: 649, description: "A citrus fruit packed with vitamin C, ideal for juicing or eating fresh.", img: "images/orange.PNG" },
    { id: 6, name: "Watermelon", price: 399, description: "A refreshing and sweet melon, perfect for hot summer days.", img: "images/watermelon.PNG" }
  ];


  onAddToCart(cartItem: CartItem): void {
    console.log('Item added to cart:', cartItem);
  }


}
