import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderListComponent } from './orders/components/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/components/order-details/order-details.component';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
