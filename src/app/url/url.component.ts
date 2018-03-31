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
  prices: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService) { }

  ngOnInit() { }

  /**
   * 
   * @param routeUrl 
   * @param obj 
   * updates url and get products
   */
  loadUrl(routeUrl, obj, priceArr) {
    this.prices = priceArr;
    /**
     * Products By Category / SubCategory / SubLevel
     */
    this.paramsService.oProducts.subscribe(response => {
      this.orginalProduct = response;
    });

    /**
     * Filtered Products By Query Params
     */
    this.paramsService.fp.subscribe(response => {
      this.filteredProducts = response;
    });

    this.router.navigate([routeUrl], { queryParams: obj }).then(() => {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.paramsService.setQueryParams(params);
        this.getProductByFilters(params);
      });
    });
  }

  /** 
  * 
  * @param params 
  * @param productObj 
  * @param level 
  * Filters By Levels done Here
  * Sorting by Products done Here
  */
  getProductByFilters(params) {
    let arr: Array<any> = [];
    let filters = this.dataService.stringKeyToArray(params);
    if (Object.keys(filters).length == 0) {
      this.filteredProducts = this.orginalProduct;
    }
    else if (Object.keys(filters).length == 1) { //first level filter
      let key = Object.keys(filters)[0];
      this.filteredProducts = this.getData(this.orginalProduct, key, filters[key]);
    } else { //more than one filters
      for (let key in filters) {
        this.filteredProducts = this.getData(this.filteredProducts, key, filters[key]);
      }
    }
    ("sortOrder" in params) ? this.utilitiesService.sortArrayByOrders(this.filteredProducts, params.sortOrder, "orginalPrice") : this.orginalProduct;
    this.paramsService.setFilteredProducts(this.filteredProducts);
  }

  getData(products, key, value) {
    let arr: Array<any> = [];
    let status: boolean;
    if (key !== "rangeId") {
      products.forEach(element => {
        (key == "subLevelFilter") ? (key = 'subLevelId') : key;
        console.log("==> element[key]",element[key]);
        let length = this.dataService.findExist(element[key], value);
        (length > 0) ? arr.push(element) : '';
      });
    } else {
      arr = this.dataService.priceFilter(products, this.prices, key, value);
    }
    return arr;
  }
}