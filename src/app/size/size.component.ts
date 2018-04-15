import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  isCategory: boolean;
  paginationSize: any;
  sizes: Array<any> = [];
  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  sizeArr: Array<any> = [];

  urlParams: Object;

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) {
    this.isCategory = false;
    let url = window.location.href;

    this.defaultService.getSizes().subscribe(response => {
      if (response.length != 0) {
        this.sizeArr = response;
        this.activatedRoute.params.subscribe(routingUrl => {
          this.urlParams = routingUrl;
          this.defaultService.getMappingFilters().subscribe(response => {
            let arr = this.dataService.getFilterComponentsData(response, routingUrl, 'sizeId');
            let tempArr = this.utilitiesService.mapArrays(arr, this.sizeArr, 'sizeId');

            if ((url.indexOf('?' + 'sizeFilter' + '=') != -1) || (url.indexOf('&' + 'sizeFilter' + '=') != -1)) {
              let sizeFilterIds = this.activatedRoute.snapshot.queryParams['sizeFilter'].split(",").map(Number);
              sizeFilterIds.forEach(elementIdArr => {
                tempArr.forEach(element => {
                  if (element['sizeId'] == elementIdArr) {
                    element.checked = true;
                  }
                });
              });
            }
            this.sizes = tempArr;

          });
        });
      }
    });
  }

  ngOnInit() { }

  /**
  * 
  * @param filterObj 
  * @param isChecked 
  * @param type 
  * 
  */
  public filter(filterObj, isChecked, type) {
    this.activatedRoute.queryParams.subscribe(response => {
      this.paginationSize = response.pageSize;
    });
    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    // filterData.queryParam.pageSize = this.paginationSize;
    this.urlComponent.loadUrl(filterData.url, filterData.queryParam, '');
  }

}
