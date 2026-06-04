import { Routes } from '@angular/router';
import { ProductComponent } from './product/product';
import { CustomerComponent } from './customer/customer';


export const routes: Routes = [

    {path:'product', component:ProductComponent},
    {path:'customer',component:CustomerComponent},
   
];
