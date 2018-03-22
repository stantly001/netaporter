import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Approute} from './app.routes';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './view/view.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { DataService } from './services/data.service';
import {DefaultService} from './services/default.service';
import { UtilitiesService} from './services/utilities.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ViewComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(Approute)
  ],
  providers: [DataService,DefaultService,UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
