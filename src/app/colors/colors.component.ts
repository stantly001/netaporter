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

  urlParams: Object;
  colorArr: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) {

    this.isCategory = false;
    let url = window.location.href;

    this.defaultService.getColors().subscribe(response => {
      if (response.length != 0) {
        this.colorArr = response;
        this.activatedRoute.params.subscribe(routingUrl => {
          this.urlParams = routingUrl;
          this.defaultService.getMappingFilters().subscribe(response => {
            let arr = this.dataService.getFilterComponentsData(response, routingUrl, 'colorId');
            let tempArr = this.utilitiesService.mapArrays(arr, this.colorArr, 'colorId');
            if ((url.indexOf('?' + 'colorFilter' + '=') != -1) || (url.indexOf('&' + 'colorFilter' + '=') != -1)) {
              let colorFilterIds = this.activatedRoute.snapshot.queryParams['colorFilter'].split(",").map(Number);
              colorFilterIds.forEach(elementIdArr => {
                tempArr.forEach(element => {
                  if (element['colorId'] == elementIdArr) {
                    element.checked = true;
                  }
                });
              });
            }
            this.colors = tempArr;
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
    filterObj.checked = isChecked;
    let queryParams = this.activatedRoute.snapshot.queryParams;

    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    filterData.queryParam.pageSize = queryParams.pageSize ? queryParams.pageSize : 5;
    filterData.queryParam.page = 1;
    this.router.navigate([filterData.url], { queryParams: filterData.queryParam });
  }

}
