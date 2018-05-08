import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';


import { UrlComponent } from '../url/url.component';

import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';
import { DataService } from '../services/data.service';
import { FilterService } from "../services/filter.service";
import { PaginationService } from '../services/index';
import { DefaultService } from '../services/default.service';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productFlag: boolean;
  pageCount: any;
  queryParams: any;
  rows: number[];
  itemsPerRow: number;
  pageNo: any;
  page: any;
  pageNumber: any;
  pageSize: any;
  products: Array<any> = [];
  // @Input() ImageView: string;
  pager: any = {};
  pagedProducts: any[];
  sort: Array<any> = [];
  params: Object;
  cn: string;
  ln: string;
  menuId: Number;
  categoryId: Number;
  subCategoryId: Number;
  subLevelId: Number;

  // private paramsSubscripiton: ISubscription;

  constructor(private filterService: FilterService, private paramsService: ParamsService,
    private defaultService: DefaultService, private router: Router, private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService, private urlComponent: UrlComponent, private utilitiesService: UtilitiesService, private dataService: DataService) {

    this.pageSize = 5;

    var obsComb = Observable.combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
      (params, qparams) => ({ params, qparams }));


    obsComb.subscribe(response => {
      this.params = response.params;
      this.cn = response.params.cn;
      this.ln = response.params.ln;
      this.menuId = parseInt(response.params.menuId);
      this.categoryId = parseInt(response.params.categoryId);
      this.subCategoryId = parseInt(response.params.subCategoryId);
      this.subLevelId = parseInt(response.params.subLevelId);
      this.queryParams = response.qparams;

      this.newMethod();

    });

    this.paramsService.fp.skip(1).subscribe(response => {
      if (response.length !== 0) {
        this.products = response;
        this.itemsPerRow = 4
        this.rows = Array.from(Array(Math.ceil(this.products.length / this.itemsPerRow)).keys());
        this.pageCount = this.queryParams.page ? this.queryParams.page : 1;
        this.pageSize = this.queryParams.pageSize ? this.queryParams.pageSize : 5;
        this.pager = this.paginationService.getPager(this.products.length, (this.queryParams.page ? this.queryParams.page : 1), (this.queryParams.pageSize ? this.queryParams.pageSize : 5));
        this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
      } else {
        this.products = response;
      }
    });

  }

  ngOnInit() {
    this.productFlag = false;
  }

  private newMethod() {
    this.defaultService.getProducts().subscribe(response => {
      if (response.length != 0) {
        this.productFlag = true;
        let params: {
          [k: string]: any;
        } = {};
        let queryParamObj: {
          [k: string]: any;
        } = {};
        let productResponse = JSON.parse(JSON.stringify(response));
        this.menuId ? (params['menuId'] = this.menuId) : (params["menuId"] = null);
        this.categoryId ? (params['categoryId'] = this.categoryId) : (params["categoryId"] = null);
        this.subCategoryId ? (params['subCategoryId'] = this.subCategoryId) : (params["subCategoryId"] = null);
        this.subLevelId ? (params['subLevelId'] = this.subLevelId) : (params['subLevelId'] = null);
        let data = this.dataService.getProductsByArrayMap(productResponse, params);

        queryParamObj.orginalProduct = data.products;
        queryParamObj.filteredProduct = data.products;
        queryParamObj.tempProduct = data.products;
        queryParamObj.prices = [];
        console.log("product component this.queryparams -->", this.queryParams);
        if (Object.keys(this.queryParams).length !== 0) {
          let req = this.urlComponent.getProductByFilters(this.queryParams, queryParamObj);
          this.paramsService.setFilteredProducts(req);
        }
        else {
          this.filterService.resetQueryParams();
          this.paramsService.setOrginalProducts(data.products);
          this.paramsService.setFilteredProducts(data.products);
        }
      }
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
        this.router.navigate([routeUrl], { queryParams: obj });
      });
  }

  callPaginatedProduct(page: number, len: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page,
        pageSize: len
      },
      queryParamsHandling: 'merge',
    });
  }

}
