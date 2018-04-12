import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, CanLoad, NavigationEnd } from '@angular/router';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService  {

  colorFilter: Array<any> = [];
  brandFilter: Array<any> = [];
  sizeFilter: Array<any> = [];
  pricesFilter: Array<any> = [];
  subLevelFilter: Array<any> = [];
  queryStringArr: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService) {

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
      console.log(isChecked)
      console.log(this.pricesFilter);
      isChecked ? this.pricesFilter.push(filterObj.rangeId) : this.pricesFilter.splice(this.pricesFilter.indexOf(filterObj.rangeId, 1));
      console.log("1t",this.pricesFilter.push(filterObj.rangeId))
      console.log("gh",this.pricesFilter.splice(this.pricesFilter.indexOf(filterObj.rangeId, 1)));
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
