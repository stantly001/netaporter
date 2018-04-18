import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  paginationSize: any;
  isCategory: boolean;
  prices: Array<any> = [];
  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  urlParams: Object;

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) {
    /**
      * Price Option Call
    */
    let url = window.location.href;
    this.defaultService.getPrice().subscribe(response => {

      if (response.length != 0) {
        if ((url.indexOf('?' + 'pricesFilter' + '=') != -1) || (url.indexOf('&' + 'pricesFilter' + '=') != -1)) {
          let priceFilterIds = this.activatedRoute.snapshot.queryParams['pricesFilter'].split(",").map(Number);
          priceFilterIds.forEach(elementIdArr => {
            response.forEach(element => {
              if (element['rangeId'] == elementIdArr) {
                element.checked = true;
              }
            });
          });
        }
      }


      this.prices = response;


    });

  }

  ngOnInit() {

    this.isCategory = false;
    this.activatedRoute.params.subscribe(response => {
      this.urlParams = response;
    });


  }

  /**
  * 
  * @param filterObj 
  * @param isChecked 
  * @param type 
  * 
  */
  public filter(filterObj, isChecked, type) {
    filterObj.checked = isChecked;
    this.activatedRoute.queryParams.subscribe(response => {
      this.paginationSize = response.pageSize;
    });
    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    filterData.queryParam.pageSize = this.paginationSize;
    this.urlComponent.loadUrl(filterData.url, filterData.queryParam, this.prices);
  }

} 
