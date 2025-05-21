import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { ProductCatalogComponent } from './component/product-catalog/product-catalog.component';
import { ChartPageComponent } from './component/chart-page/chart-page.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'home', component: ProductCatalogComponent },
    { path: 'create', component: CreateProductComponent },
    { path: 'chart', component: ChartPageComponent },
    { path: 'edit/:id', component: EditProductComponent }

];


