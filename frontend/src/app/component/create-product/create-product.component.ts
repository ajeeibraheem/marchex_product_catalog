import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../model/Product';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.less'
})
export class CreateProductComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    unit: [0, [Validators.required, Validators.min(1)]],
    orders: [0, Validators.required],
    totalSales: [0, Validators.required],
    inventory: [0, Validators.required],
    imageURL: ['']
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  submit() {
    if (this.form.valid) {
      const product = this.form.value as Product;
      this.productService.createProduct(product).subscribe(() => {
        alert('Product created!');
        this.router.navigate(['/']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

