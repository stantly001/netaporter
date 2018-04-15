import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  
  accordion: boolean;
  paginationSize: any;
  queryStringArr: Array<any> = [];

  subCategories: Array<any> = [];
  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;
  isCategory: boolean;
  urlParams: Object;

  categoryArr: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) {

    this.isCategory = false;
    this.activatedRoute.params.subscribe(response => {
      this.urlParams = response;
      this.subCategories = this.dataService.getSubCategory(response);
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
