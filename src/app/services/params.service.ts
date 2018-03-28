import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ParamsService {
  
  constructor() { }
  
  private urlQueryParams = new BehaviorSubject<Object>('');
  private urlParams = new BehaviorSubject<Object>('');
  private products = new BehaviorSubject<Array<any>>([]);

  urlParameters = this.urlParams.asObservable();
  urlQueryParameters = this.urlQueryParams.asObservable();
  fp = this.products.asObservable();
  
  private categoryIdStr:string;
  private params:Object;
  private queryParams:Object;
  //private filteredProducts:Array<any>=[];

  @Input()
  public setFilteredProducts(arr:Array<any>) {
    this.products.next(arr);
  }

  public getFilteredProducts() {
    return this.products.asObservable();
  }

  public setCategoryId(categoryId:string){
    this.categoryIdStr=categoryId;
  }

  public getCategoryId(){
    return this.categoryIdStr;
  }
  
  @Input()
  public setParams(paramsStr:Object){
    this.params=paramsStr;
    this.urlParams.next(paramsStr);
  }

  public getParams() {
    return this.params;
  }
  
  @Input()
  public setQueryParams(queryParamsStr:Object){
    this.queryParams=queryParamsStr;
    this.urlQueryParams.next(queryParamsStr);
  }

  public getQueryParams() {
    return this.queryParams;
  }

}


