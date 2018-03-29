import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ParamsService {


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }

  private urlQueryParams = new BehaviorSubject<Object>('');
  private urlParams = new BehaviorSubject<Object>('');
  private filteredProducts = new BehaviorSubject<Array<any>>([]);
  private orginalProducts = new BehaviorSubject<Array<any>>([]);
 

  urlParameters = this.urlParams.asObservable();
  urlQueryParameters = this.urlQueryParams.asObservable();
  fp = this.filteredProducts.asObservable();
  oProducts = this.orginalProducts.asObservable();
 

  private categoryIdStr: string;
  private params: Object;
  private queryParams: Object;


  /**
   * 
   * @param arr 
   * This Collection is based on Category / SubCategory / SubLevel
   */
  @Input()
  public setOrginalProducts(arr: Array<any>) {
    this.orginalProducts.next(arr);
  }

  public getOrginalProducts() {
    return this.orginalProducts;
  }

  /**
   * 
   * @param arr 
   * This is a filtered product based on user filter selection
   */
  @Input()
  public setFilteredProducts(arr: Array<any>) {
    this.filteredProducts.next(arr);
  }

  public getFilteredProducts() {
    return this.filteredProducts.asObservable();
  }



  public setCategoryId(categoryId: string) {
    this.categoryIdStr = categoryId;
  }

  public getCategoryId() {
    return this.categoryIdStr;
  }

  @Input()
  public setParams(paramsStr: Object) {
    this.params = paramsStr;
    this.urlParams.next(paramsStr);
  }

  public getParams() {
    return this.params;
  }

  @Input()
  public setQueryParams(queryParamsStr: Object) {
    this.queryParams = queryParamsStr;
    this.urlQueryParams.next(queryParamsStr);
  }

  public getQueryParams() {
    return this.queryParams;
  }

 

}
