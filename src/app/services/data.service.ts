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


  response: Array<any>=[];

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
   * 
   * @param products 
   * Returns subCategory filters By Product Category
   */
  getSubCategoriesByProductCategory(products: Array<any>, key: string,menuId:number) {
    let categories: Array<any> = [];
    let productCategories = products.map(response => response[key]);
    let categoriesArr = this.utilitiesService.joinArrayOfArray(productCategories);//final categories
    categoriesArr.forEach(parent => {
      this.defaultService.getCategories().subscribe(response => {
        response.forEach(children => {
          if (parent == children.id) {
            categories.push(children);
          }
        });
      });
    });
    return categories;
  }

  /**
   * 
   * @param products 
   * @param key
   * Returns Designer filter By Product Category
   */
  getDesignersByProductCategory(products: Array<any>, key: string) {
    let designers: Array<any> = [];
    let productDesigner = products.map(response => response[key]);
    let designer = this.utilitiesService.joinArrayOfArray(productDesigner);
    designer.forEach(parent => {
      this.defaultService.getDesigners().subscribe(response => {
        response.forEach(children => {
          if (parent == children[key]) {
            designers.push(children);
          }
        });
      });
    });
    return designers;
  }

  /**
   * 
   * @param products 
   * @param key 
   * Returns Color By Product Category / Both
   */
  getColosByProductCategory(products: Array<any>, key: string) {
    let colorArr: Array<any> = [];
    let productColors = products.map(response => response[key]);
    let color = this.utilitiesService.joinArrayOfArray(productColors);
    color.forEach(parent => {
      this.defaultService.getColors().subscribe(response => {
        response.forEach(children => {
          if (parent == children[key]) {
            colorArr.push(children);
          }
        });
      });
    });
    return colorArr;
  }

  /**
   * 
   * @param products 
   * @param key
   * Returns size filter by Product Category
   */
  getSizeByProductCategory(products: Array<any>, key: string) {
    let sizeArr: Array<any> = [];
    let productSize = products.map(response => response[key]);
    let size = this.utilitiesService.joinArrayOfArray(productSize);
    size.forEach(parent => {
      this.defaultService.getSizes().subscribe(response => {
        response.forEach(children => {
          if (parent == children[key]) {
            sizeArr.push(children);
          }
        });
      });
    });
    return sizeArr;
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
      if (key == "designerFilter") {
        Obj.designerId = filters[key].split(",").map(Number);
      }
      if (key == "colorFilter") {
        Obj.colorId = filters[key].split(",").map(Number);
      }
      if (key == "sizeFilter") {
        Obj.sizeId = filters[key].split(",").map(Number);
      }
      if(key == "pricesFilter") {
        Obj.rangeId = filters[key].split(",").map(Number)
      }
      if(key =="subLevelFilter"){
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
    let menuId = params['menuId'];
    this.defaultService.getCategories().subscribe(response=>{
      let menus = this.utilitiesService.mapArrayData(response,'menuId',menuId);
       this.response.push(this.utilitiesService.mapArrayData(menus['categories'],'categoryId',params['categoryId']));
      });
    return this.response;
  }

  /**
   * 
   * @param products 
   * @param params 
   * Returns Products By Query Params
   */
  public getProductsByArrayMap(products: Array<any>, params: Object) {
    let arr: Array<any> = [];
    let response: { [k: string]: any } = {};
    let designer: Array<any> = [];
    let colors: Array<any> = [];
    let sizes: Array<any> = [];
    let subCategories:Array<any>=[];
    let menuId = params['menuId'];
    let menus:Array<any>=[];
    
    if (params['categoryId']) {
      arr = this.getProductByCategory(products, params['categoryId']);
      subCategories = this.getSubCategory(params);
      designer=this.getDesignersByProductCategory(arr, 'designerId');
      colors= this.getColosByProductCategory(arr, "colorId");
      sizes = this.getSizeByProductCategory(arr, "sizeId");
    }
    if (params['subCategoryId']) {
      arr = this.getProductBySubCategory(arr, params['subCategoryId']);
      designer=this.getDesignersByProductCategory(arr, 'subCategoryDesignerId');
      colors= this.getColosByProductCategory(arr, "subCategoryColorId");
      sizes = this.getSizeByProductCategory(arr, "subCategorySizeId");
    }
    if (params['subLevelId']) {
      arr = this.getProductBySubLevel(arr, params['subLevelId']);
    }
    response['products'] = arr;
    response['subCategories']=subCategories;
    response['designers'] = designer;
    response['colors'] = colors;
    response['sizes'] = sizes;
    return response;
  }

  public priceFilter(products:Array<any>,priceArr:Array<any>,key:string,value:Array<any>) {
    let arr:Array<any>=[];
    let response:Array<any>=[];
    priceArr.forEach(element=>{
      if(value.indexOf(element.rangeId)!==-1){
        arr.push(element.rangeFrom);
        arr.push(element.rangeTo);
      }
    });
    arr = arr.map(parseFloat);
    let min = Math.min.apply(Math,arr);
    let max = Math.max.apply(Math,arr);
    arr = [];
    arr.push(min);
    arr.push(max);
    products.forEach(element=>{
      let productPrice = element.orginalPrice;
      if(productPrice >= min && productPrice <= max){
        response.push(element);
      }
    });
    return response;
  }


}