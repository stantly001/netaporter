import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent} from '../url/url.component';

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

  prices:Array<any>=[];
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

     /**
     * Price Option Call
     */
    this.defaultService.getPrice().subscribe(response => {
      this.prices = response;
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
  this.urlComponent.loadUrl(filterData.url,filterData.queryParam);
}

}
