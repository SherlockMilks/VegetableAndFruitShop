import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    CommonModule,
    MatLabel
  ],
})
export class UpdateComponent{
  productId: string = '';
  name: string = '';
  price: number | null = null;
  description: string = '';
  error: string = '';
  

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const itemJson=localStorage.getItem('updateItem');
    if(itemJson!==null){
      const item=JSON.parse(itemJson);
      this.productId=item.id;
      this.name=item.name;
      this.price=item.price;
      this.description=item.description;
    }
  }

  updateProduct(): void {
    if(this.name == null || this.price == null || this.description == null){
      this.error="Please fill all of the fields!"
      return;
    }
    if(this.price<0 || this.price>10000){
      this.error="Please enter a valid price!"
      return;
    }


    const newProduct = {
      name: this.name,
      price: this.price,
      description: this.description,
      img: 'images/defaultimg.PNG',
    };
    this.productService.updateProduct(this.productId, newProduct).then(() => {
      this.router.navigate(['/shop']);
    });
  }
  

  goBack(): void {
    this.router.navigate(['/shop']);
  }
}
