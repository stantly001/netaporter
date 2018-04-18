import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, CanLoad, NavigationEnd } from '@angular/router';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {

  colorFilter: Array<any> = [];
  brandFilter: Array<any> = [];
  sizeFilter: Array<any> = [];
  pricesFilter: Array<any> = [];
  subLevelFilter: Array<any> = [];
  queryStringArr: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService) {
    console.log(" CONSTRUCTOR IS CALLED .....");
    let url = window.location.href;
    if ((url.indexOf('?' + 'brandFilter' + '=') != -1) || (url.indexOf('&' + 'brandFilter' + '=') != -1)) {
      let brandFilterIds = this.activatedRoute.snapshot.queryParams['brandFilter'].split(",").map(Number);
      if (this.brandFilter.length == 0) {
        this.brandFilter = brandFilterIds;
      }
      this.queryStringArr.push('brandFilter');
    }

    if ((url.indexOf('?' + 'colorFilter' + '=') != -1) || (url.indexOf('&' + 'colorFilter' + '=') != -1)) {
      let colorFilterIds = this.activatedRoute.snapshot.queryParams['colorFilter'].split(",").map(Number);
      console.log("Color Filtered -->", this.colorFilter);
      if (this.colorFilter.length == 0) {
        this.colorFilter = colorFilterIds;
      }
      this.queryStringArr.push('colorFilter');
    }

    if ((url.indexOf('?' + 'sizeFilter' + '=') != -1) || (url.indexOf('&' + 'sizeFilter' + '=') != -1)) {
      this.queryStringArr.push('sizeFilter');
    }


  }

  /**
  * 
  * @param filterObj 
  * @param isChecked 
  * @param type 
  * For QueryString filters
  */
  public filter(filterObj, isChecked, type, urlParams) {

    console.log("filter Service -->", type);

    let url = window.location.href;
    let sortedMap: { [k: string]: any } = {};



    if (type == 'brand') {
      /**
       * For Page Load with Query Params
       */
      if ((url.indexOf('?' + 'brandFilter' + '=') != -1) || (url.indexOf('&' + 'brandFilter' + '=') != -1)) {
        let brandFilterIds = this.activatedRoute.snapshot.queryParams['brandFilter'].split(",").map(Number);
        if (this.brandFilter.length == 0) {
          this.brandFilter = brandFilterIds;
        }
      }
      isChecked ? this.brandFilter.push(filterObj.brandId) : this.brandFilter.splice(this.brandFilter.indexOf(filterObj.brandId), 1);

      if (this.queryStringArr.indexOf("brandFilter") == -1 && (this.brandFilter.length > 0)) {
        this.queryStringArr.push("brandFilter");
      }
      if (this.queryStringArr.indexOf("brandFilter") != -1 && (this.brandFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("brandFilter"), 1);
      }

    }
    if (type == 'color') {

      /**
       * For Page Load with Query Params
       */
      if ((url.indexOf('?' + 'colorFilter' + '=') != -1) || (url.indexOf('&' + 'colorFilter' + '=') != -1)) {
        let colorFilterIds = this.activatedRoute.snapshot.queryParams['colorFilter'].split(",").map(Number);
        console.log("Color Filtered -->", this.colorFilter);
        if (this.colorFilter.length == 0) {
          this.colorFilter = colorFilterIds;
        }
      }
      console.log("Color Filtered AFter -->", this.colorFilter);
      isChecked ? this.colorFilter.push(filterObj.colorId) : this.colorFilter.splice(this.colorFilter.indexOf(filterObj.colorId), 1);

      if (this.queryStringArr.indexOf("colorFilter") == -1 && (this.colorFilter.length > 0)) {
        this.queryStringArr.push("colorFilter");
      }
      if (this.queryStringArr.indexOf("colorFilter") != -1 && (this.colorFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("colorFilter"), 1);
      }

      console.log("query string -->", this.queryStringArr);
    }

    if (type == "size") {

      /**
       * For Page Load with Query Params
       */
      if ((url.indexOf('?' + 'sizeFilter' + '=') != -1) || (url.indexOf('&' + 'sizeFilter' + '=') != -1)) {
        let sizeFilterIds = this.activatedRoute.snapshot.queryParams['sizeFilter'].split(",").map(Number);
        if (this.colorFilter.length == 0) {
          this.sizeFilter = sizeFilterIds;
        }
      }

      isChecked ? this.sizeFilter.push(filterObj.sizeId) : this.sizeFilter.splice(this.sizeFilter.indexOf(filterObj.sizeId), 1);
      if (this.queryStringArr.indexOf("sizeFilter") == -1 && (this.sizeFilter.length > 0)) {
        this.queryStringArr.push("sizeFilter");
      }
      if (this.queryStringArr.indexOf("sizeFilter") != -1 && (this.sizeFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("sizeFilter"), 1);
      }
    }

    if (type == "price") {

      /**
       * For Page Load with Query Params
       */
      if ((url.indexOf('?' + 'subLevelFilter' + '=') != -1) || (url.indexOf('&' + 'pricesFilter' + '=') != -1)) {
        let priceFilterIds = this.activatedRoute.snapshot.queryParams['pricesFilter'].split(",").map(Number);
        if (this.pricesFilter.length == 0) {
          this.pricesFilter = priceFilterIds;
        }
      }

      isChecked ? this.pricesFilter.push(filterObj.rangeId) : this.pricesFilter.splice(this.pricesFilter.indexOf(filterObj.rangeId, 1));
      if (this.queryStringArr.indexOf("pricesFilter") == -1 && (this.pricesFilter.length > 0)) {
        this.queryStringArr.push("pricesFilter");
      }
      if (this.queryStringArr.indexOf("pricesFilter") != -1 && (this.pricesFilter.length == 0)) {
        this.queryStringArr.splice(this.queryStringArr.indexOf("pricesFilter"), 1);
      }
    }

    if (type == "subLevel") {

      /**
       * For Page Load with Query Params
       */
      if ((url.indexOf('?' + 'subLevelFilter' + '=') != -1) || (url.indexOf('&' + 'subLevelFilter' + '=') != -1)) {
        let subLevelFilterIds = this.activatedRoute.snapshot.queryParams['subLevelFilter'].split(",").map(Number);
        if (this.colorFilter.length == 0) {
          this.sizeFilter = subLevelFilterIds;
        }
      }

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
