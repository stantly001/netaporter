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
  sortTypeName: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) { }

  ngOnInit() {
    let url = window.location.href;

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
    });

    /**
     * Sorting Call 
     */
    this.defaultService.getSortData().subscribe(response => {
      // this.sort = response;
      if (response.length != 0) {
        if ((url.indexOf('?' + 'sortType' + '=') != -1) || (url.indexOf('&' + 'sortType' + '=') != -1)) {
          let sortFilterIds = this.activatedRoute.snapshot.queryParams['sortType'];
          response.forEach(element => {
            if (element['sortTypeName'] == sortFilterIds) {
              this.sortTypeName = sortFilterIds;
            }
          });
        }
      }

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
    let key: string;
    if (type == "priceLowToHigh") {
      sortOrder = "asc";
      key = "orginalPrice"
    }
    if (type == "priceHighToLow") {
      sortOrder = "desc";
      key = "orginalPrice"
    }
    if (type == "suggested") {
      sortOrder = "desc";
      key = "suggested"
    }
    if (type == "mostPopularity") {
      sortOrder = "desc";
      key = "mostPopularity";
    }
    this.paramsService.fp.subscribe(response => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        let obj = JSON.parse(JSON.stringify(queryParams));
        obj["sortOrder"] = sortOrder;
        obj['sortType'] = type;
        let result = this.utilitiesService.sortArrayByOrders(response, sortOrder, key);
        this.router.navigate([routeUrl], { queryParams: obj });
      })
    });







  }

}
