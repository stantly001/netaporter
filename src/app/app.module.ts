import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Approute } from './app.routes';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './view/view.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { DataService } from './services/data.service';
import { DefaultService } from './services/default.service';
import { UtilitiesService } from './services/utilities.service';
import { ParamsService } from './services/params.service';
import { PaginationService } from './services/index';
import * as $ from 'jquery';
import { ProductViewDirective } from './directives/product-view.directive';
import { AlternativeStyleComponent } from './alternative-style/alternative-style.component';
import { WaysToShopComponent } from './ways-to-shop/ways-to-shop.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ViewComponent,
    ProductViewComponent,
    ProductViewDirective,
    AlternativeStyleComponent,
    WaysToShopComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(Approute),
    NgxCarouselModule
  ],
  providers: [DataService, DefaultService, UtilitiesService, ParamsService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
