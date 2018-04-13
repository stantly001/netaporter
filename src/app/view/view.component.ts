import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from "rxjs/observable/forkJoin";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { DataService } from '../services/data.service';
import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';
import { BreadcrumbService } from '../services/breadcrumb.service';

import { Location } from '@angular/common';
import { ParamsService } from '../services/params.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  categoryProducts: Array<any> = [];
  products: Array<any> = [];
  sort: Array<any> = [];
  ads: Array<any> = [];
  designerFilter: Array<any> = [];
  colorFilter: Array<any> = [];
  sizeFilter: Array<any> = [];
  pricesFilter: Array<any> = [];
  subLevelFilter: Array<any> = [];
  queryStringArr: Array<any> = [];
  prices: Array<any> = [];

  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  ln: string;
  cn: string;
  subCategoryName: string

  breadCrumbMenuName: string;
  breadCrumbCategoryName: string;
  breadCrumbSubCategoryName: string;
  breadCrumnSubLevelName: string;

  productObj: { [k: string]: any } = {};
  params: Object;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,
    private defaultService: DefaultService, private dataService: DataService,
    private router: Router, private utilitiesService: UtilitiesService,
    private location: Location, private paramsService: ParamsService, private urlComponent: UrlComponent,
    private breadCrumbService: BreadcrumbService) {
  }

  menus: Array<any> = [];

  ngOnInit() {

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
      this.breadCrumbService.generateBreadCrumb(response).subscribe(response => {
          this.breadCrumbMenuName = response.menuName;
          this.breadCrumbCategoryName = response.categoryName;
          this.breadCrumbSubCategoryName = response.subCategory;
          this.breadCrumnSubLevelName = response.subLevel;
        });


      this.menuId = parseInt(response.menuId);
      this.categoryId = parseInt(response.categoryId);
      this.subCategoryId = parseInt(response.subCategoryId);
      this.subLevelId = parseInt(response.subLevelId);

      this.ln = response.ln;
      this.cn = response.cn;

      this.defaultService.getProducts().subscribe(response => {
        let arr: Array<any> = [];
        let params: { [k: string]: any } = {};
        let productResponse: any;
        productResponse = response;

        this.menuId ? (params['menuId'] = this.menuId) : (params["menuId"] = null)
        this.categoryId ? (params['categoryId'] = this.categoryId) : (params["categoryId"] = null);
        this.subCategoryId ? (params['subCategoryId'] = this.subCategoryId) : (params["subCategoryId"] = null);
        this.subLevelId ? (params['subLevelId'] = this.subLevelId) : (params['subLevelId'] = null);

        let data = this.dataService.getProductsByArrayMap(productResponse, params);
        console.log("product Response ==>", data);
        this.products = data.products;
        this.paramsService.setOrginalProducts(data.products);
        this.paramsService.setFilteredProducts(this.products);
      });
    });
  }


  /**
   * 
   * @param type 
   * Sort Method for Product
   */
  sortProduct(type) {
    let routeUrl = this.utilitiesService.buildRoutingUrl(this.params);
    let sortOrder: string;
    if (type == "priceLowToHigh") {
      sortOrder = "asc";
    }
    if (type == "priceHighToLow") {
      sortOrder = "desc";
    }
    Observable.combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
      (params: Params, qParams: Params) => ({ params, qParams })).subscribe(allParams => {
        let obj = JSON.parse(JSON.stringify(allParams.qParams));
        (type == "all") ? delete obj["sortOrder"] : (obj["sortOrder"] = sortOrder);
        this.urlComponent.loadUrl(routeUrl, obj, '');
      });
  }

}
