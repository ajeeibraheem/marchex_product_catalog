import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './component/create-product/create-product.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'create', component: CreateProductComponent }
];


