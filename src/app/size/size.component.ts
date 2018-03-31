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

  urlParams: Object;

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) { }

  ngOnInit() {
    this.isCategory = false;
    this.activatedRoute.params.subscribe(response => {
      this.urlParams = response;
      this.menuId = parseInt(response.menuId);
      this.categoryId = parseInt(response.categoryId);
      this.subCategoryId = parseInt(response.subCategoryId);
      this.subLevelId = parseInt(response.subLevelId);
    });

    this.defaultService.getProducts().subscribe(response => {
      let arr: Array<any> = [];
      let params: { [k: string]: any } = {};
      let productResponse: any;
      productResponse = response;

      this.menuId ? (params['menuId'] = this.menuId) : (params["menuId"] = null)
      this.categoryId ? (params['categoryId'] = this.categoryId) : (params["categoryId"] = null);
      this.subCategoryId ? (params['subCategoryId'] = this.subCategoryId) : (params["subCategoryId"] = null);
      this.subLevelId ? (params['subLevelId'] = this.subLevelId) : (params['subLevelId'] = null);
      let data = this.dataService.getProductsByArrayMap(productResponse, params);
      this.sizes = data.sizes;
      console.log(this.sizes);
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
    this.activatedRoute.queryParams.subscribe(response=>{
      console.log(response);
      this.paginationSize = response.pageSize;
    });
    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    filterData.queryParam.pageSize = this.paginationSize;
    this.urlComponent.loadUrl(filterData.url, filterData.queryParam,'');
  }

}
