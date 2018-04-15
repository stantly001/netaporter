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
    private utilitiesService: UtilitiesService) { }

  obj: { [key: string]: string } = {};
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

    this.paramsService.tProducts.subscribe(response => {
      this.tempProducts = response;
    })

    this.router.navigate([routeUrl], { queryParams: obj }).then(() => {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.paramsService.setQueryParams(params);
        obj.orginalProduct = this.orginalProduct;
        obj.filteredProduct = this.filteredProducts;
        obj.tempProduct = this.tempProducts;
        obj.prices = this.prices;
        this.getProductByFilters(params, obj);
      });
    })



  }

  /** 
  * 
  * @param params 
  * @param productObj 
  * @param level 
  * Filters By Levels done Here
  * Sorting by Products done Here
  */
  getProductByFilters(params, productArrObj) {

    console.log("parmas -->",params);

    let orginalProduct = productArrObj.orginalProduct;
    let filteredProduct = productArrObj.filteredProduct;
    let tempProduct = productArrObj.tempProduct;
    let priceArr = productArrObj.prices;

    let arr: Array<any> = [];
    let filters = this.dataService.stringKeyToArray(params);
    if (Object.keys(filters).length == 0) {
      this.filteredProducts = orginalProduct;
    }
    else { //more than one filters
      for (let key in filters) {
        if (this.filteredProducts.length == 0) {
          this.filteredProducts = this.getData(tempProduct, key, filters[key], priceArr);
        } else {
          this.filteredProducts = this.getData(orginalProduct, key, filters[key], priceArr);
        }
      }
    }

    ("sortOrder" in params) ? this.utilitiesService.sortArrayByOrders(this.filteredProducts, params.sortOrder, "orginalPrice") : this.orginalProduct;
    this.paramsService.setFilteredProducts(this.filteredProducts);

    console.log("filtered products -->",this.filteredProducts);

    if (this.orginalProduct.length == 0) { // will be called page loaded with query params
      this.paramsService.setOrginalProducts(this.filteredProducts);
    }
  }

  getData(products, key, value, priceArr) {
    let arr: Array<any> = [];
    let status: boolean;
    if (key !== "rangeId") {
      products.forEach(element => {
        (key == "subLevelFilter") ? (key = 'subLevelId') : key;
        let length = this.dataService.findExist(element[key], value);
        (length > 0) ? arr.push(element) : '';
      });
    } else {
      arr = this.dataService.priceFilter(products, priceArr, key, value);
    }
    if (arr.length != 0) {
      this.paramsService.setTempProductData(arr);
    }
    return arr;
  }
}
