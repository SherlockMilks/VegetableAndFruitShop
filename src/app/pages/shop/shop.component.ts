import { Component} from '@angular/core';
import { Item } from '../../shared/model/Item';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { MatCardModule } from '@angular/material/card';
import { CartItem } from '../../shared/model/CartItem';
import { FormsModule, NgModel } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, FormsModule, MatFormFieldModule, ShopItemComponent, MatInputModule, MatButtonModule, AsyncPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})

export class ShopComponent {
  maxPrice: number | null = null;
  admin_e: boolean = false;
  name: string = "";

  constructor(private productService: ProductService, private router: Router) {}

  items$!: Observable<Item[]>;

  ngOnInit(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.admin_e = !!user?.admin_e;
    }
    console.log('Admin jog:', this.admin_e);

    this.items$ = this.productService.getProducts();
  }

  filterByPrice(): void{
    if(this.maxPrice!==null && this.maxPrice>0 && this.maxPrice<10000){
      this.items$ = this.productService.getProductsWithLimit(this.maxPrice);
    }
  }

  
  filterByName(): void{
    if(this.name!==""){
      this.items$ = this.productService.getProductsWithName(this.name);
    }
  }

  onAddToCart(cartItem: CartItem): void {
    console.log('Item added to cart:', cartItem);

    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];

    const index = existingCart.findIndex(ci => ci.item.id === cartItem.item.id);
    if (index !== -1) {
    existingCart[index].amount += cartItem.amount;} 
    else {
    existingCart.push(cartItem);}
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
  }


  onDeleteItem(item: Item): void {
    this.productService.deleteProduct(item.id).then(() => {
    console.log('Product deleted', item.name);
    this.items$ = this.productService.getProducts();
  });}

  onUpdateItem(item: Item): void {
    localStorage.setItem('updateItem', JSON.stringify(item));
    this.router.navigateByUrl('/update')
  }

  add(): void {
    this.router.navigateByUrl('/add')
  }


}
