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
    this.defaultService.getSizes().subscribe(response => {
      if (response.length != 0) {
        this.sizeArr = response;
      }
    });

    this.activatedRoute.params.subscribe(routingUrl => {
      this.urlParams = routingUrl;
      this.menuId = parseInt(routingUrl.menuId);
      this.categoryId = parseInt(routingUrl.categoryId);
      this.subCategoryId = parseInt(routingUrl.subCategoryId);
      this.subLevelId = parseInt(routingUrl.subLevelId);

      this.defaultService.getMappingFilters().subscribe(response => {
        let arr = this.dataService.getFilterComponentsData(response, routingUrl, 'sizeId');
        this.sizes = this.utilitiesService.mapArrays(arr, this.sizeArr, 'sizeId');
      });
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
    filterData.queryParam.pageSize = this.paginationSize;
    this.urlComponent.loadUrl(filterData.url, filterData.queryParam, '');
  }

}
