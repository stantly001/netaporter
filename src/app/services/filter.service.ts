import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, CanLoad } from '@angular/router';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService implements CanLoad {

  colorFilter: Array<any> = [];
  brandFilter: Array<any> = [];
  sizeFilter: Array<any> = [];
  pricesFilter: Array<any> = [];
  subLevelFilter: Array<any> = [];
  queryStringArr: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService) { 
      
      
    }


  private categoryFilterData = new BehaviorSubject<Array<any>>([]);
  private brandFilterData = new BehaviorSubject<Array<any>>([]);
  private colorFilterData = new BehaviorSubject<Array<any>>([]);
  private sizeFiltersData = new BehaviorSubject<Array<any>>([]);

  category = this.categoryFilterData.asObservable();
  brand = this.brandFilterData.asObservable();
  color = this.colorFilterData.asObservable();
  size = this.sizeFiltersData.asObservable();

  canLoad():any {
    console.log("called Filter Service");
  }

  /**
   * 
   * @param arr 
   * Set Category Filter By URL
   */
  public setCategoryFilter(arr: any) {
    this.categoryFilterData.next(arr);
  }

  /**
   * 
   * @param arr 
   * Set BrandFilter By URL
   */
  public setBrandFilter(arr: any) {
    this.brandFilterData.next(arr);
  }

  /**
   * 
   * @param arr 
   * Set ColorFilters By URL
   */
  public setColorFilter(arr: any) {
    this.colorFilterData.next(arr);
  }

  /**
   * 
   * @param arr 
   * Set SizeFilters By URL
   */
  public setSizeFilter(arr: any) {
    this.sizeFiltersData.next(arr);
  }

  /**
   * 
   * @param params 
   * Create Filters Based on URL / User Selection
   */
  public createFilters(params:Object) {
    this.defaultService.getMappingFilters().subscribe(response=>{

      let categoryArr = response.filter(data=>data['categoryId']==params['categoryId'])[0];
      if(!(params['subCategoryId'] && params['subLevelId'])) {
        this.defaultService.getBrands();
        // this.utilitiesService.mapArrays(params['brandId']);
      }


      
    });
  }


  /**
  * 
  * @param filterObj 
  * @param isChecked 
  * @param type 
  * For QueryString filters
  */
  public filter(filterObj, isChecked, type, urlParams) {
    let sortedMap: { [k: string]: any } = {};

    if (type == 'brand') {
      console.log("brandId ==>", filterObj.brandId);
      isChecked ? this.brandFilter.push(filterObj.brandId) : this.brandFilter.splice(this.brandFilter.indexOf(filterObj.brandId))
      if (this.queryStringArr.indexOf("brandFilter") == -1 && (this.brandFilter.length > 0)) {
        this.queryStringArr.push("brandFilter");
      }
      if (this.queryStringArr.indexOf("brandFilter") != -1 && (this.brandFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("brandFilter"), 1);
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
      brandFilter: this.utilitiesService.convertArrayToString(this.brandFilter),
      sizeFilter: this.utilitiesService.convertArrayToString(this.sizeFilter),
      pricesFilter: this.utilitiesService.convertArrayToString(this.pricesFilter),
      subLevelFilter: this.utilitiesService.convertArrayToString(this.subLevelFilter)
    };

    sortedMap = this.utilitiesService.sortObjectByArrayKeys(this.queryStringArr, filters)
    let routeUrl = this.utilitiesService.buildRoutingUrl(urlParams);

    return {
      "queryParam": sortedMap,
      "url": routeUrl
    }

  }

}
