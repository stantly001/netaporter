import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from "rxjs/observable/forkJoin";
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';
import { Location } from '@angular/common';
import { ParamsService } from '../services/params.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  colors: Array<any> = [];
  designers: Array<any> = [];
  subCategories: Array<any> = [];
  sizes: Array<any> = [];
  categoryProducts: Array<any> = [];
  products: Array<any> = [];
  sort: Array<any> = [];
  ads: Array<any> = [];
  designerFilter: Array<any> = [];
  colorFilter: Array<any> = [];
  sizeFilter: Array<any> = [];
  pricesFilter: Array<any> = [];
  subLevelFilter:Array<any>=[];
  queryStringArr: Array<any> = [];
  prices: Array<any> = [];

  menuId:number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  ln: string;
  cn: string;
  subCategoryName: string
  menuName:string;
  categoryName:string;

  productObj: { [k: string]: any } = {};
  params:Object;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,
    private defaultService: DefaultService, private dataService: DataService,
    private router: Router, private utilitiesService: UtilitiesService,
    private location: Location, private paramsService: ParamsService) {

  }


  ngOnInit() {

    /**
     * Get BreadCrumb Details
     */

    this.defaultService.getCategories().subscribe(response => {
      console.log(response);
      console.log(this.activatedRoute.snapshot.params['menuId'])
      let urlObj= this.utilitiesService.mapArrayData(response,'menuId',this.activatedRoute.snapshot.params['menuId']);
      this.menuName = urlObj['menuName'];
      let categoryObj = this.utilitiesService.mapArrayData(urlObj.categories,'categoryId',this.activatedRoute.snapshot.params['categoryId']);
      this.categoryName =categoryObj.categoryName;

    });
    

    /**
     * Ads in Section Bottom Call
     */
    this.defaultService.getAds().subscribe(response => {
      this.ads = response;
    });

    /**
     * Price Option Call
     */
    this.defaultService.getPrice().subscribe(response => {
      this.prices = response;
    });

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
      this.paramsService.setParams(response);
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
        this.products = data.products;
        this.subCategories = data.subCategories;
        this.designers = data.designers;
        this.colors = data.colors;
        this.sizes = data.sizes;
        this.productObj.products = data.products;
        this.productObj.filterProduct = data.products;
        this.paramsService.setFilteredProducts(this.products);
      });
    });
  }

  /**
   * 
   * @param filterObj 
   * @param isChecked 
   * @param type 
   * 
   */
  public filter(filterObj, isChecked, type) {
    console.log("filterobj -->",filterObj);
    if (type == 'designer') {
      isChecked ? this.designerFilter.push(filterObj.designerId) : this.designerFilter.splice(this.designerFilter.indexOf(filterObj.designerId))
      if (this.queryStringArr.indexOf("designerFilter") == -1 && (this.designerFilter.length > 0)) {
        this.queryStringArr.push("designerFilter");
      }
      if (this.queryStringArr.indexOf("designerFilter") != -1 && (this.designerFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("designerFilter"), 1);
      }
    }
    if (type == 'color') {
      isChecked ? this.colorFilter.push(filterObj.colorId) : this.colorFilter.splice(this.colorFilter.indexOf(filterObj.colorId), 1);
      if (this.queryStringArr.indexOf("colorFilter") == -1 && (this.colorFilter.length > 0)) {
        this.queryStringArr.push("colorFilter");
      }
      if (this.queryStringArr.indexOf("colorFilter") != -1 && (this.colorFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("colorFilter"), 1);
      }
    }
    if (type == "size") {
      isChecked ? this.sizeFilter.push(filterObj.sizeId) : this.sizeFilter.splice(this.sizeFilter.indexOf(filterObj.sizeId), 1);
      if (this.queryStringArr.indexOf("sizeFilter") == -1 && (this.sizeFilter.length > 0)) {
        this.queryStringArr.push("sizeFilter");
      }
      if (this.queryStringArr.indexOf("sizeFilter") != -1 && (this.sizeFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("sizeFilter"), 1);
      }
    }

    if (type == "price") {
      isChecked ? this.pricesFilter.push(filterObj.rangeId) : this.pricesFilter.splice(this.pricesFilter.indexOf(filterObj.rangeId, 1));
      if (this.queryStringArr.indexOf("pricesFilter") == -1 && (this.pricesFilter.length > 0)) {
        this.queryStringArr.push("pricesFilter");
      }
      if (this.queryStringArr.indexOf("pricesFilter") != -1 && (this.pricesFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("pricesFilter"), 1);
      }
    }

    if (type == "subLevel") {
      isChecked ? this.subLevelFilter.push(filterObj.subLevelCategoryId) : this.subLevelFilter.splice(this.subLevelFilter.indexOf(filterObj.subLevelCategoryId, 1));
      if (this.queryStringArr.indexOf("subLevelFilter") == -1 && (this.subLevelFilter.length > 0)) {
        this.queryStringArr.push("subLevelFilter");
      }
      if (this.queryStringArr.indexOf("subLevelFilter") != -1 && (this.subLevelFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("subLevelFilter"), 1);
      }
    }

    let filters: Object = {
      colorFilter: this.utilitiesService.convertArrayToString(this.colorFilter),
      designerFilter: this.utilitiesService.convertArrayToString(this.designerFilter),
      sizeFilter: this.utilitiesService.convertArrayToString(this.sizeFilter),
      pricesFilter: this.utilitiesService.convertArrayToString(this.pricesFilter),
      subLevelFilter :this.utilitiesService.convertArrayToString(this.subLevelFilter)
    };

    let sortedMap: { [k: string]: any } = {};
    sortedMap = this.utilitiesService.sortObjectByArrayKeys(this.queryStringArr, filters)
    let routeUrl = this.utilitiesService.buildRoutingUrl(this.params);
    // let routeUrl = (this.categoryId && this.subCategoryId) ? "shop/" + this.cn + "/" + this.ln + "/" + this.menuId + "/" + this.categoryId + "/" + this.subCategoryId : "shop/" + this.cn + "/" + this.ln + "/" + 1 + "/" + this.categoryId;
    this.loadUrl(routeUrl, sortedMap);
  }

  /**
   * 
   * @param routeUrl 
   * @param obj 
   * updates url and get products
   */
  loadUrl(routeUrl, obj) {
    this.router.navigate([routeUrl], { queryParams: obj }).then(() => {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.paramsService.setQueryParams(params);
        this.getProductByFilters(params, this.productObj);
      });
    });
  }

  /**
   * 
   * @param params 
   * @param productObj 
   * @param level 
   * Filters By Levels done Here
   * Sorting by Products done Here
   */
  getProductByFilters(params, productObj) {
    let arr: Array<any> = [];
    let filters = this.dataService.stringKeyToArray(params);
    if (Object.keys(filters).length == 0) {
      this.products = productObj.products;
    }
    else if (Object.keys(filters).length == 1) { //first level filter
      let key = Object.keys(filters)[0];
      productObj.filterProduct = this.getData(productObj.products, key, filters[key]);
      this.products = productObj.filterProduct;
    } else { //more than one filters
      for (let key in filters) {
        productObj.filterProduct = this.getData(productObj.filterProduct, key, filters[key]);
        this.products = productObj.filterProduct;
      }
    }
    ("sortOrder" in params) ? this.utilitiesService.sortArrayByOrders(productObj.filterProduct, params.sortOrder, "orginalPrice") : this.products;
    this.paramsService.setFilteredProducts(this.products);
  }

  getData(products, key, value) {
    let arr: Array<any> = [];
    if (key !== "rangeId") {
      products.forEach(element => {
        console.log("element -->",element);
        console.log("key -->",key);
        (key == "subLevelFilter") ? (key ='subLevelId') : key;
        console.log("element key -->",element[key]);
        console.log("value -->",value);
        let length = this.dataService.findExist(element[key], value);
        (length > 0) ? arr.push(element) : '';
      });
    } else {
     arr= this.dataService.priceFilter(products,this.prices,key,value);
    }
    return arr;
  }

  /**
   * 
   * @param type 
   * Sort Method for Product
   */
  sortProduct(type) {
    let routeUrl = this.utilitiesService.buildRoutingUrl(this.params);
    // let routeUrl = (this.categoryId && this.subCategoryId) ? "shop/" + this.cn + "/" + this.ln + "/" + this.categoryId + "/" + this.subCategoryId : "shop/" + this.cn + "/" + this.ln + "/" + this.categoryId;
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
        this.loadUrl(routeUrl, obj);
      });
  }

  /**
   * 
   * @param imageType 
   * Display product based on Image Type
   * This functionality is currently disabled in this release as per client requirement.
   */
  /*
   imageView(imageType) {
    this.productImageView = imageType;
  }
  */




}
