import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';
import { DefaultService } from './default.service';

import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import 'rxjs/Rx';
@Injectable()
export class DataService {

  productData: Array<any> = [];

  constructor(private http: HttpClient, private utilitiesService: UtilitiesService,
    private defaultService: DefaultService, private activatedRoute: ActivatedRoute) { }


  response: Array<any> = [];

  /**
   * 
   * @param products 
   * @param categoryId
   * Returns Products By Categories 
   */
  getProductByCategory(products, categoryId) {
    return this.utilitiesService.filterArrayByKey(products, 'categories', categoryId);
  }

  /**
   * 
   * @param products 
   * @param subCategoryId
   * Returns Products by category & Sub Category 
   */
  getProductBySubCategory(products, id) {
    return this.utilitiesService.filterArrayByKey(products, 'subCategoryId', id);
  }

  /**
   * 
   * @param products 
   * @param id 
   * Returns Products By Category, SubCategory & Sub Level Category
   */
  getProductBySubLevel(products, id) {
    return this.utilitiesService.filterArrayByKey(products, 'subLevelId', id);
  }


  /** 
    *   @param productArr 
    *   @param filterArr 
    * - Checks filter exist in product
    * - Returns length 
  */
  public findExist(productArr, filterArr) {
    return productArr.filter(element => filterArr.includes(element)).length;
  }

  /**
   * 
   * @param filters 
   * Convert string values to Arrays with Number Return type
   */
  public stringKeyToArray(filters) {
    let Obj: { [k: string]: any } = {};
    for (var key in filters) {
      if (key == "brandFilter") {
        Obj.brandId = filters[key].split(",").map(Number);
      }
      if (key == "colorFilter") {
        Obj.colorId = filters[key].split(",").map(Number);
      }
      if (key == "sizeFilter") {
        Obj.sizeId = filters[key].split(",").map(Number);
      }
      if (key == "pricesFilter") {
        Obj.rangeId = filters[key].split(",").map(Number)
      }
      if (key == "subLevelFilter") {
        Obj.subLevelFilter = filters[key].split(",").map(Number);
      }
    }
    return Obj;
  }

  /**
   * 
   * @param filter 
   * results all keys in an object
   */
  public getkeys(filter) {
    return Object.keys(filter);
  }

  public getSubCategory(params: Object) {
    let arr: Array<any> = [];
    let menuId = params['menuId'];
    this.defaultService.getCategories().subscribe(response => {
      let menus = this.utilitiesService.mapArrayData(response, 'menuId', menuId);
      arr.push(this.utilitiesService.mapArrayData(menus['categories'], 'categoryId', params['categoryId']));
    });
    return arr;
  }

  /**
   * 
   * @param products 
   * @param params 
   * Returns Products By  Params
   */
  public getProductsByArrayMap(products: Array<any>, params: Object) {
    let arr: Array<any> = [];
    let response: { [k: string]: any } = {};
    let subCategories: Array<any> = [];
    let brand: Array<any> = [];
    let colors: Array<any> = [];
    let sizes: Array<any> = [];

    let menuId = params['menuId'];
    let menus: Array<any> = [];

    if (params['categoryId']) {
      arr = this.getProductByCategory(products, params['categoryId']);
    }
    if (params['subCategoryId']) {
      arr = this.getProductBySubCategory(arr, params['subCategoryId']);
    }
    if (params['subLevelId']) {
      arr = this.getProductBySubLevel(arr, params['subLevelId']);
    }
    response['products'] = arr;
    return response;
  }

  /**
   * 
   * @param products 
   * @param priceArr 
   * @param key 
   * @param value 
   * Returns Unique Price Range as arrays.e.g.,when user selects 100-200 & 200-300 
   * Result will be  : [100,300]
   */
  public priceFilter(products: Array<any>, priceArr: Array<any>, key: string, value: Array<any>) {
    console.log("price Arr -->",priceArr);
    let arr: Array<any> = [];
    let response: Array<any> = [];
    priceArr.forEach(element => {
      if (value.indexOf(element.rangeId) !== -1) {
        arr.push(element.rangeFrom);
        arr.push(element.rangeTo);
      }
    });

    arr = arr.map(parseFloat);

    let min = Math.min.apply(Math, arr);
    let max = Math.max.apply(Math, arr);
    arr = [];
    arr.push(min);
    arr.push(max);
    console.log("min value -->", min);
    console.log("max -->", max);


    products.forEach(element => {
      let productPrice = parseFloat(element.orginalPrice);
      if (productPrice >= min && productPrice <= max) {
        response.push(element);
      }
    });
    return response;
  }

  /**
   * 
   * @param response 
   * @param routingUrl 
   */
  getFilterComponentsData(response: Array<any>, routingUrl: Object, key: string) {
    let arr = response.filter(data => data['categoryId'] == routingUrl['categoryId'])[0];
    if (routingUrl['subCategoryId'] && !routingUrl['subLevelId']) {
      console.log("cond1");
      arr = arr['subCategory'].filter(data => data['subCategoryId'] == parseInt(routingUrl['subCategoryId']))[0];
    }
    if (routingUrl['subCategoryId'] && routingUrl['subLevelId']) {
      console.log("cond2");
      arr = arr['subCategory'].filter(data => data['subCategoryId'] == parseInt(routingUrl['subCategoryId']))[0];
      arr = arr['subLevelCategory'].filter(data => data['subLevelId'] == parseInt(routingUrl['subLevelId']))[0];
    }
    return arr[key];
  }
}