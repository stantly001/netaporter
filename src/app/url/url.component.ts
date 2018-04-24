import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {


  orginalProduct: Array<any> = [];
  filteredProducts: Array<any> = [];
  tempProducts: Array<any> = [];
  prices: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService) {

    this.defaultService.getPrice().subscribe(response => {
      if (response.length !== 0) {
        this.prices = response;
      }
    })

  }

  obj: { [key: string]: string } = {};
  subscription: any;
  ngOnInit() {



  }

  /**
   * 
   * @param routeUrl 
   * @param obj 
   * updates url and get products
   */
  // loadUrl(routeUrl, obj, priceArr) {

  //   this.prices = priceArr;
  //   /**
  //    * Products By Category / SubCategory / SubLevel
  //    */
  //   this.paramsService.oProducts.subscribe(response => {
  //     this.orginalProduct = response;
  //   });

  //   /**
  //    * Filtered Products By Query Params
  //    */
  //   this.paramsService.fp.subscribe(response => {
  //     this.filteredProducts = response;
  //   });

  //   this.paramsService.tProducts.subscribe(response => {
  //     this.tempProducts = response;
  //   })
  // }


  /** 
  * 
  * @param params 
  * @param productObj 
  * @param level 
  * Filters By Levels done Here
  * Sorting by Products done Here
  */
  getProductByFilters(params, productArrObj) {

    console.log("parmas -->", params);
    console.log("productArrObj --->", productArrObj);

    let orginalProduct = productArrObj.orginalProduct;
    let filteredProduct = productArrObj.filteredProduct;
    let tempProduct = productArrObj.tempProduct;
    let priceArr = productArrObj.prices;

    let arr: Array<any> = [];
    let filters = this.dataService.stringKeyToArray(params);
    console.log("filters -->", filters);
    let filtersLength = Object.keys(filters).length;

    if (orginalProduct.length !== 0) {
      if (Object.keys(filters).length == 0) {
        filteredProduct = orginalProduct;
      }
      else { //more than one filters

        let len: Number;
        let arr: Array<any> = [];
        orginalProduct.forEach(product => {
          let counter = 0;
          for (let key in filters) {
            if (key !== "rangeId") {
              len = this.dataService.findExist(product[key], filters[key]);
              if (len > 0) {
                counter++;
              }
            } else {
              let orginalPrice = parseFloat(product['orginalPrice']);
              let tempArr = this.dataService.priceRanges(this.prices, filters.rangeId);
              if (orginalPrice >= parseFloat(tempArr[0]) && orginalPrice <= parseFloat(tempArr[1])) {
                counter++;
              }
            }
          }
          if (counter == filtersLength) {
            arr.push(product);
          }
        });
        console.log("final produsdfas arr ->", arr);
        filteredProduct = arr;
      }
    }
    if ("sortOrder" in params) {
      let sortType = params.sortType;
      if (sortType == "priceLowToHigh" || sortType == "priceHighToLow") {
        filteredProduct = this.utilitiesService.sortArrayByOrders(filteredProduct, params.sortOrder, "orginalPrice");
      } else {
        filteredProduct = this.utilitiesService.sortArrayByOrders(filteredProduct, params.sortOrder, params.sortType);
      }


    }
    return filteredProduct;
  }
}
