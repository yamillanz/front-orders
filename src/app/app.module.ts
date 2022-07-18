import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderListComponent } from './orders/components/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/components/order-details/order-details.component';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSelectComponent } from './users/components/user-select/user-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    UserSelectComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
