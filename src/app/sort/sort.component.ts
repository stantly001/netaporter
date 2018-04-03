import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  sort: Array<any> = [];
  params: Object;
  pagedProducts: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
    });

    /**
     * Sorting Call 
     */
    this.defaultService.getSortData().subscribe(response => {
      this.sort = response;
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
    this.paramsService.pagination.subscribe(response => {
      if (response.length !== 0) {
        this.pagedProducts = response;
        
        Observable.combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
          (params: Params, qParams: Params) => ({ params, qParams })).subscribe(allParams => {
            let obj = JSON.parse(JSON.stringify(allParams.qParams));
            (type == "all") ? delete obj["sortOrder"] : (obj["sortOrder"] = sortOrder);
            //this.urlComponent.loadUrl(routeUrl, obj,'');

            this.utilitiesService.sortArrayByOrders(this.pagedProducts, sortOrder, "orginalPrice");
            this.router.navigate([routeUrl], { queryParams: obj });
          });
      }
    });

  }

}
