import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../model/Product';
// Angular common utilities and form modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Router for navigation and route link handling
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.less'
})
export class EditProductComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form!: FormGroup;
  productId!: string;

  constructor() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.GetById(this.productId).subscribe((product: Product) => {
      this.form = this.fb.group({
        name: [product.name, Validators.required],
        unit: [product.unit, [Validators.required, Validators.min(1)]],
        orders: [product.orders, Validators.required],
        totalSales: [product.totalSales, Validators.required],
        inventory: [product.inventory, Validators.required],
        imageURL: [product.imageURL || '']
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const updatedProduct = this.form.value as Product;
      this.productService.Update(this.productId, updatedProduct).subscribe(() => {
        alert('Product updated successfully');
        this.router.navigate(['/home']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
