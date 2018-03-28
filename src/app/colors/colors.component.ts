import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent} from '../url/url.component';

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

  colors: Array<any> = [];
  colorFilter: Array<any> = [];
  queryStringArr: Array<any> = [];

  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  urlParams:Object;

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService,private urlComponent:UrlComponent,private filterService:FilterService) { }

    

  ngOnInit() {

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
      this.colors = data.colors;
      console.log(this.colors);
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
    let filterData=this.filterService.filter(filterObj, isChecked, type,this.urlParams);
    this.urlComponent.loadUrl(filterData.url,filterData.queryParam,'');
  }

}
