import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductChartComponent } from '../product-chart/product-chart.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-chart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductChartComponent],
  templateUrl: './chart-page.component.html',
  styleUrl: './chart-page.component.less'
})
export class ChartPageComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  products: Product[] = [];
  focusedProduct!: Product;

  constructor() {
    const selectedName = this.route.snapshot.queryParamMap.get('name');
    this.productService.GetAll().subscribe(items => {
      this.products = items;
      this.focusedProduct = items.find(p => p.name === selectedName) || items[0];
    });
  }
}
