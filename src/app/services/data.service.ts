import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {UtilitiesService} from './utilities.service';
import {DefaultService} from './default.service';
import 'rxjs/Rx';
import { filter } from 'rxjs/operators';
@Injectable()
export class DataService {

  productData : Array<any> =[];

  constructor(private http:HttpClient,private utilitiesService:UtilitiesService,
        private defaultService:DefaultService) { }

    getSubCategoriesByProduct(products:Array<any>) { 
      let categories:Array<any>=[];
      let productCategories=products.map(response=>response.categories);
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

  getDesignersByProduct(products:Array<any>) {
    let designers:Array<any>=[];
    let productDesigner=products.map(response=>response.designerId);
    let designer=this.utilitiesService.joinArrayOfArray(productDesigner);
    designer.forEach(parent=>{
      this.defaultService.getDesigners().subscribe(response=>{
        response.forEach(children => {
            if(parent == children.designerId) {
              designers.push(children);
            }
        });
      });
    });
    return designers;
  }

  getColosByProduct(products:Array<any>){
    let colorArr:Array<any>=[];
    let productColors=products.map(response=>response.colorId);
    let color = this.utilitiesService.joinArrayOfArray(productColors);
    color.forEach(parent=>{
      this.defaultService.getColors().subscribe(response=>{
        response.forEach(children => {
          if(parent == children.colorId) {
            colorArr.push(children);
          }
        });
      });
    });
    return colorArr;
  }

  getSizeByProduct(products:Array<any>) {
    let sizeArr:Array<any>=[];
    let productSize = products.map(response=>response.sizeId);
    let size= this.utilitiesService.joinArrayOfArray(productSize);  
    size.forEach(parent=>{
      this.defaultService.getSizes().subscribe(response=>{
        response.forEach(children => { 
          if(parent == children.sizeId) {
            sizeArr.push(children);
          }
        });
      });
    });
    return sizeArr;
  }

  public getFilterProduct(products,url,filters) {
    let keys=this.getkeys(filters);
    
    products.forEach(product => {
         keys.forEach(key=>{
           if(product.hasOwnProperty(key)){

           }
         })
    });
  }

  public getkeys(filter) {
    return Object.keys(filter);
  }

}
