import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from './services/product.service';
import { Product } from './model/Product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, MatTableModule,MatPaginatorModule, MatSort, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})

export class AppComponent implements OnInit, AfterViewInit {

  private _liveAnnouncer = inject(LiveAnnouncer);

  title = 'frontend';
  productList:Product[]=[];
  dataSource!:MatTableDataSource<Product>;
  displayedColumns:string[]=['name','unit',
    'orders','totalSales','inventory']

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  unitCostOperator: '>' | '<' = '>';
  unitCostValue: number = 0;
  totalSalesOperator: '>' | '<' = '>';
  totalSalesValue: number = 0;

  constructor(private services:ProductService) { }
  
  ngOnInit(): void {
    this.GetAllProducts();
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void { }
  
  GetAllProducts() {
    this.services.GetAll().subscribe(item =>{
      this.productList = item;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyNameFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Product, filter: string) =>
      data.name.toLowerCase().includes(filter.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
    this.dataSource.filter = `${Math.random()}`;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
