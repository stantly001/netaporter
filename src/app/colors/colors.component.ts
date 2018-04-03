import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})

export class ColorsComponent implements OnInit {

  isCategory: boolean;
  paginationSize: any;
  colors: Array<any> = [];
  colorFilter: Array<any> = [];
  queryStringArr: Array<any> = [];

  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  urlParams: Object;
  colorArr:Array<any>=[];

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) {

    this.isCategory = false;
    this.defaultService.getColors().subscribe(response => {
      if (response.length != 0) {
        this.colorArr = response;
      }
    });

    this.activatedRoute.params.subscribe(routingUrl => {
      this.urlParams = routingUrl;
      this.menuId = parseInt(routingUrl.menuId);
      this.categoryId = parseInt(routingUrl.categoryId);
      this.subCategoryId = parseInt(routingUrl.subCategoryId);
      this.subLevelId = parseInt(routingUrl.subLevelId);

      this.defaultService.getMappingFilters().subscribe(response => {
        let arr = this.dataService.getFilterComponentsData(response, routingUrl,'colorId');
        this.colors = this.utilitiesService.mapArrays(arr, this.colorArr, 'colorId');
      });
    });

  }



  ngOnInit() {}

  /**
  * 
  * @param filterObj 
  * @param isChecked 
  * @param type 
  * 
  */




  public filter(filterObj, isChecked, type) {
    this.activatedRoute.queryParams.subscribe(response => {
      console.log(response);
      this.paginationSize = response.pageSize;
    });
    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    filterData.queryParam.pageSize = this.paginationSize;
    this.urlComponent.loadUrl(filterData.url, filterData.queryParam, '');
  }

}
