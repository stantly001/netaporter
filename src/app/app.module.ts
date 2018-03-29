import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Approute} from './app.routes';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './view/view.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { DataService } from './services/data.service';
import {DefaultService} from './services/default.service';
import { UtilitiesService} from './services/utilities.service';
import { ParamsService } from './services/params.service';
import { FilterService } from './services/filter.service';
import { PaginationService } from './services/index';
import * as $ from 'jquery';
import { ProductViewDirective } from './directives/product-view.directive';
import { ColorsComponent } from './colors/colors.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RelativesComponent } from './relatives/relatives.component';
import { BrandComponent } from './brand/brand.component';
import { SizeComponent } from './size/size.component';
import { PriceComponent } from './price/price.component';
import { CategoryComponent } from './category/category.component';
import { UrlComponent } from './url/url.component';
import { ProductAdsComponent } from './product-ads/product-ads.component';
import { SortComponent } from './sort/sort.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ViewComponent,
    ProductViewComponent,
    ProductViewDirective,
    ColorsComponent,
    NavigationComponent,
    RelativesComponent,
    BrandComponent,
    SizeComponent,
    PriceComponent,
    CategoryComponent,
    UrlComponent,
    ProductAdsComponent,
    SortComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
        RouterModule.forRoot(Approute)
  ],
  providers: [DataService,DefaultService,UtilitiesService,ParamsService,PaginationService,UrlComponent,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
