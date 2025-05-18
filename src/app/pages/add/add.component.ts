import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
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

export class AddComponent {
  name: string = '';
  price: number | null = null;
  description: string = '';
  error: string = '';
  

  constructor(private productService: ProductService, private router: Router) {}

  saveProduct(): void {
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
    this.productService.addProduct(newProduct).then(() => {
      this.router.navigate(['/shop']);
    });
  }
  

  goBack(): void {
    this.router.navigate(['/shop']);
  }
}
