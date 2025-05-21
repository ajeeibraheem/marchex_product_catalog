import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Product } from '../../model/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-chart.component.html',
  styleUrl: './product-chart.component.less'
})
export class ProductChartComponent implements AfterViewInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() focusedProduct!: Product;

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  chart!: Highcharts.Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart();
  }

  private renderChart() {
    if (!this.products.length || !this.focusedProduct || !this.chartContainer) return;

    const categories = this.products.map(p => p.name);
    const data = this.products.map(p => ({
      y: p.totalSales,
      color: p.name === this.focusedProduct.name ? '#FF4081' : '#42A5F5'
    }));

    this.chart = Highcharts.chart(this.chartContainer.nativeElement, {
      chart: { type: 'column' },
      title: { text: `Sales Comparison for ${this.focusedProduct.name}` },
      xAxis: { categories, title: { text: 'Product' } },
      yAxis: { min: 0, title: { text: 'Total Sales' } },
      tooltip: { pointFormat: 'Sales: <b>{point.y}</b>' },
      series: [{ name: 'Total Sales', data, type: 'column' }]
    });
  }
}
