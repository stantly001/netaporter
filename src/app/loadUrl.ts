import { ActivatedRoute, Params, Router } from '@angular/router';

import { UtilitiesService } from './services/utilities.service';
import { ParamsService } from './services/params.service';
import { DefaultService } from './services/default.service';
import { DataService } from './services/data.service';

export class LoadUrl {

    products:Array<any>=[];
    productObj:Object;
    prices:Array<any>=[];

    private router:Router;
    private activatedRoute:ActivatedRoute;
    private paramsService:ParamsService;
    private dataService:DataService;
    private utilitiesService:UtilitiesService;

   /**
   * 
   * @param routeUrl 
   * @param obj 
   * updates url and get products
   */
    loadUrl(routeUrl, obj) {
        this.router.navigate([routeUrl], { queryParams: obj }).then(() => {
            this.activatedRoute.queryParams.subscribe((params: Params) => {
                this.paramsService.setQueryParams(params);
                this.getProductByFilters(params, this.productObj);
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
    getProductByFilters(params, productObj) {
        let arr: Array<any> = [];
        let filters = this.dataService.stringKeyToArray(params);
        if (Object.keys(filters).length == 0) {
            this.products = productObj.products;
        }
        else if (Object.keys(filters).length == 1) { //first level filter
            let key = Object.keys(filters)[0];
            productObj.filterProduct = this.getData(productObj.products, key, filters[key]);
            this.products = productObj.filterProduct;
        } else { //more than one filters
            for (let key in filters) {
                productObj.filterProduct = this.getData(productObj.filterProduct, key, filters[key]);
                this.products = productObj.filterProduct;
            }
        }
        ("sortOrder" in params) ? this.utilitiesService.sortArrayByOrders(productObj.filterProduct, params.sortOrder, "orginalPrice") : this.products;
        this.paramsService.setFilteredProducts(this.products);
    }

    getData(products, key, value) {
        let arr: Array<any> = [];
        if (key !== "rangeId") {
            products.forEach(element => {
                (key == "subLevelFilter") ? (key = 'subLevelId') : key;
                let length = this.dataService.findExist(element[key], value);
                (length > 0) ? arr.push(element) : '';
            });
        } else {
            arr = this.dataService.priceFilter(products, this.prices, key, value);
        }
        return arr;
    }



}