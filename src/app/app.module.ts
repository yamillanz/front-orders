import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderListComponent } from './orders/components/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/components/order-details/order-details.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, OrderListComponent, OrderDetailsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
