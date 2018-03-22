import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {UtilitiesService} from './utilities.service';
import {DefaultService} from './default.service';

import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import 'rxjs/Rx';
@Injectable()
export class DataService {

  productData : Array<any> =[];

  constructor(private http:HttpClient,private utilitiesService:UtilitiesService,
        private defaultService:DefaultService,private activatedRoute:ActivatedRoute) { }

    /**
     * 
     * @param products 
     * @param categoryId
     * Returns Products By Categories 
     */
    getProductByCategory(products,categoryId){
      console.log(typeof categoryId)
      console.log(products);
      let arr:Array<any>=[];
      products.forEach(element => {
        let index:number;
        index = element.categories.indexOf(categoryId);
        if(index !== -1) {
          arr.push(element);
        }
      }); 
      console.log(arr);
      return arr;
    }

    /**
     * 
     * @param products 
     * @param subCategoryId
     * Returns Products by category & Sub Category 
     */
    getProductBySubCategory(products,id) {
      let arr:Array<any>=[];
      products.forEach(element => {
        let index:number;
        index = element.subCategoryId.indexOf(id);
        if(index !== -1) {
          arr.push(element);
        }
      }); 
      return arr;
    }


    /**
     * 
     * @param products 
     * Returns subCategory filters By Product Category
     */
    getSubCategoriesByProductCategory(products:Array<any>,key:string) { 
      let categories:Array<any>=[];
      let productCategories=products.map(response=>response[key]);
      let categoriesArr= this.utilitiesService.joinArrayOfArray(productCategories);
      categoriesArr.forEach(parent=>{
        this.defaultService.getCategories().subscribe(response=>{
          response.forEach(children => {
            if(parent==children.id) {
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
  getDesignersByProductCategory(products:Array<any>,key:string) {
    let designers:Array<any>=[];
    let productDesigner=products.map(response=>response[key]);
    let designer=this.utilitiesService.joinArrayOfArray(productDesigner);
    designer.forEach(parent=>{
      this.defaultService.getDesigners().subscribe(response=>{
        response.forEach(children => {
            if(parent == children[key]) {
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
  getColosByProductCategory(products:Array<any>,key:string){
    let colorArr:Array<any>=[];
    let productColors=products.map(response=>response[key]);
    let color = this.utilitiesService.joinArrayOfArray(productColors);
    color.forEach(parent=>{
      this.defaultService.getColors().subscribe(response=>{
        response.forEach(children => {
          if(parent == children[key]) {
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
  getSizeByProductCategory(products:Array<any>,key:string) {
    let sizeArr:Array<any>=[];
    let productSize = products.map(response=>response[key]);
    let size= this.utilitiesService.joinArrayOfArray(productSize);  
    size.forEach(parent=>{
      this.defaultService.getSizes().subscribe(response=>{
        response.forEach(children => { 
          if(parent == children[key]) {
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
  public findExist(productArr,filterArr) {
    return productArr.filter(element=>filterArr.includes(element)).length;
  }

  /**
   * 
   * @param filters 
   * Convert string values to Arrays with Number Return type
   */
  public stringKeyToArray(filters) {
    let Obj: {[k: string]: any} = {};
    for(var key in filters) {
      if(key=="designerFilter"){
        Obj.designerId = filters[key].split(",").map(Number);
      }
      if(key=="colorFilter") {
        Obj.colorId = filters[key].split(",").map(Number);
      }
      if(key=="sizeFilter") {
        Obj.sizeId = filters[key].split(",").map(Number);
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



}
