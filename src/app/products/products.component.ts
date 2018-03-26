import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ViewComponent } from '../view/view.component';

import { ParamsService } from '../services/params.service';
import { UtilitiesService} from '../services/utilities.service';
import { PaginationService } from '../services/index';
import { DefaultService } from '../services/default.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: Array<any> = [];
  @Input() ImageView: string;
  pager: any = {};
  pagedProducts: any[];
  sort:Array<any>=[];
  params:Object;
  cn:string;
  ln:string;

  constructor(private paramsService: ParamsService, private paginationService: PaginationService,
    private defaultService:DefaultService,private router:Router,private activatedRoute:ActivatedRoute,
    private utilitiesService:UtilitiesService,private viewComponent:ViewComponent) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
      this.cn = response.cn;
      this.ln = response.ln;
    });

    /**
     * Sorting Call 
     */
    this.defaultService.getSortData().subscribe(response => {
      this.sort = response;
    });

    this.paramsService.getFilteredProducts().subscribe(response => {
      this.products = response;
      (response.length !==0) ? this.setPage(1,response.length) : '';
    });
    
   
  }

  /**
   * 
   * @param type 
   * Sort Method for Product
   */
  sortProduct(type) {
    let routeUrl = this.utilitiesService.buildRoutingUrl(this.params);
    let sortOrder: string;
    if (type == "priceLowToHigh") {
      sortOrder = "asc";
    }
    if (type == "priceHighToLow") {
      sortOrder = "desc";
    }
    Observable.combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
      (params: Params, qParams: Params) => ({ params, qParams })).subscribe(allParams => {
        let obj = JSON.parse(JSON.stringify(allParams.qParams));
        (type == "all") ? delete obj["sortOrder"] : (obj["sortOrder"] = sortOrder);
        this.viewComponent.loadUrl(routeUrl, obj);
      });
  }


  selectPageSize(number){
console.log(number)
  }

  /**
   * 
   * @param page 
   * Pagination code
   */
  setPage(page: number,len:number) {
    this.router.navigate([], {
    relativeTo: this.activatedRoute,
    queryParams: {
    page: page
    },
    queryParamsHandling: 'merge',
    // preserve the existing query params in the route
    // skipLocationChange: true
    });
    if (page < 1 || page > this.pager.totalPages) {
    return;
    }
    // get pager object from service
    this.pager = this.paginationService.getPager(this.products.length, page);
    // get current page of items
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}
