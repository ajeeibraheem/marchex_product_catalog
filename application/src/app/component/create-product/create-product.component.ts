// Angular core and common module imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Reactive form modules and validators
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Custom service to handle product creation
import { ProductService } from '../../services/product.service';

// Angular Router for navigation and linking
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

// Product model interface
import { Product } from '../../model/Product';

// Directive to restrict number inputs to positive integers only
import { PositiveIntegerOnlyDirective } from '../../positive-integer-only.directive';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PositiveIntegerOnlyDirective
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.less'
})
export class CreateProductComponent {

  /**
   * Reactive form for capturing product input.
   * Includes validations:
   * - name: required
   * - unit: required, must be > 0
   * - orders, totalSales, inventory: required
   * - imageURL: optional
   */
  form = this.fb.group({
    name: ['', Validators.required],
    unit: [0, [Validators.required, Validators.min(1)]],
    orders: [0, Validators.required],
    totalSales: [0, Validators.required],
    inventory: [0, Validators.required],
    imageURL: ['']
  });

  constructor(
    private fb: FormBuilder,                  // FormBuilder for constructing form group
    private productService: ProductService,   // Service to handle product API calls
    private router: Router                    // Router for navigation after submission
  ) {}

  /**
   * Submit handler for the form.
   * If valid, creates the product and navigates to the home page.
   * If invalid, triggers validation messages by marking all fields as touched.
   */
  submit() {
    if (this.form.valid) {
      const product = this.form.value as Product;

      // Submit the product to the backend via the ProductService
      this.productService.createProduct(product).subscribe(() => {
        alert('Product created!');
        this.router.navigate(['/home']); // Redirect to home page after success
      });

    } else {
      // Mark all form fields as touched to display validation errors
      this.form.markAllAsTouched();
    }
  }
}
