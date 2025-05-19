// Accessibility tool for screen readers to announce sorting changes
import { LiveAnnouncer } from '@angular/cdk/a11y';

// Angular core lifecycle and decorator tools
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';

// Angular Router for navigation and route link handling
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// Angular common utilities and form modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material components for data table, sorting, and pagination
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Custom service to fetch products from backend
import { ProductService } from '../../services/product.service';

// Model interface for product entity
import { Product } from '../../model/Product';

// Custom directive to restrict numeric input to positive integers
import { PositiveIntegerOnlyDirective } from '../../positive-integer-only.directive';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatSort, MatSortModule,
    MatFormFieldModule, MatInputModule,
    PositiveIntegerOnlyDirective
  ],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.less'
})
export class ProductCatalogComponent implements OnInit, AfterViewInit {

  // Accessibility announcer for sort changes
  private _liveAnnouncer = inject(LiveAnnouncer);

  // Full product list fetched from the backend
  productList: Product[] = [];

  // Data source for the Angular Material table
  dataSource!: MatTableDataSource<Product>;

  // Columns displayed in the table
  displayedColumns: string[] = ['name', 'unit', 'orders', 'totalSales', 'inventory'];

  // Angular Material ViewChild references for sorting and pagination
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Filter operators and input values for dynamic filtering
  unitCostOperator: '>' | '<' = '>';
  unitCostValue: number = 0;

  totalSalesOperator: '>' | '<' = '>';
  totalSalesValue: number = 0;

  constructor(private services: ProductService) {}

  // Fetch products on component initialization
  ngOnInit(): void {
    this.GetAllProducts();
  }

  // Bind sort and paginator once view has initialized
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  /**
   * Fetches product data from the backend service,
   * then binds the result to the Material table's data source.
   */
  GetAllProducts() {
    this.services.GetAll().subscribe(item => {
      this.productList = item;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Filters the table based on the entered product name.
   */
  applyNameFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Product, filter: string) =>
      data.name.toLowerCase().includes(filter.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Applies advanced filters to show only products that match
   * the selected criteria for unit cost and total sales.
   */
  applyAdvancedFilter() {
    this.dataSource.filterPredicate = (data: Product) => {
      const unitCheck = this.unitCostOperator === '>'
        ? data.unit > this.unitCostValue
        : data.unit < this.unitCostValue;
      const salesCheck = this.totalSalesOperator === '>'
        ? data.totalSales > this.totalSalesValue
        : data.totalSales < this.totalSalesValue;
      return unitCheck && salesCheck;
    };

    // Trigger re-filtering by setting a dummy value
    this.dataSource.filter = `${Math.random()}`;
  }

  /**
   * Announces the sorting direction change using screen reader-friendly messages.
   */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
