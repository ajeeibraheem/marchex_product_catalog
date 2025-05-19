// Angular core lifecycle hooks and dependency injection utilities
import { AfterViewInit, Component, OnInit } from '@angular/core';

// Angular routing modules for navigation
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Angular common utilities and reactive form support
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material modules for table features and inputs
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Service for fetching product data (or other shared responsibilities)
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // Register all Angular and Material modules needed for this root component
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private services: ProductService) {}

  /**
   * Lifecycle hook: Called once after the component is initialized.
   * Ideal for data fetching or component setup logic.
   */
  ngOnInit(): void {}

  /**
   * Lifecycle hook: Called once after the view and child views have been initialized.
   * Can be used to access view children or manipulate DOM elements.
   */
  ngAfterViewInit(): void {}

}
