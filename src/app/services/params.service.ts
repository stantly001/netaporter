import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ParamsService {


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }

  private urlQueryParams = new BehaviorSubject<Object>('');
  public urlParams = new BehaviorSubject<Object>('');
  private filteredProducts = new BehaviorSubject<Array<any>>([]);
  private orginalProducts = new BehaviorSubject<Array<any>>([]);
  private tempProducts = new BehaviorSubject<Array<any>>([]);
  private paginationProducts = new BehaviorSubject<Array<any>>([]);
  private menus = new BehaviorSubject<Array<any>>([]);

  urlParameters = this.urlParams.asObservable();
  urlQueryParameters = this.urlQueryParams.asObservable();
  fp = this.filteredProducts.asObservable();
  oProducts = this.orginalProducts.asObservable();
  tProducts = this.tempProducts.asObservable();
  pagination = this.paginationProducts.asObservable();
  menu = this.menus.asObservable();

  
  private categoryIdStr:string;
  private params:Object;
  private queryParams:Object;


  public setTempProductData(arr:Array<any>){
    this.tempProducts.next(arr);
  }

  /**
   * 
   * @param arr 
   * Pagination products collection will be set here
   */
  public setPaginationProducts(arr:Array<any>){
    this.paginationProducts.next(arr);
  }


  /**
   * 
   * @param arr 
   * Set Menu Initial
   */
  public setMenus(arr:Array<any>){
    this.menus.next(arr);
  }


  /**
   * 
   * @param arr 
   * This Collection is based on Category / SubCategory / SubLevel
   */
  public setOrginalProducts(arr: Array<any>) {
    this.orginalProducts.next(arr);
  }

  /**
   * 
   * @param arr 
   * This is a filtered product based on user filter selection
   */
  public setFilteredProducts(arr: Array<any>) {
    this.filteredProducts.next(arr);
  }

  public setCategoryId(categoryId:string){
    this.categoryIdStr=categoryId;
  }

  public setParams(paramsStr: Object) {
    this.params = paramsStr;
    this.urlParams.next(paramsStr);
  }

  public setQueryParams(queryParamsStr: Object) {
    this.queryParams = queryParamsStr;
    this.urlQueryParams.next(queryParamsStr);
  }

  public getQueryParams() {
    return this.queryParams;
  }


}
