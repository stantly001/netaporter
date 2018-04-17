import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';
import { UtilitiesService } from '../services/utilities.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  pageNo: any;
  isCategory: boolean;
  paginationSize: any;
  brands: Array<any> = [];

  menuId: number;
  categoryId: number;
  subCategoryId: number;
  subLevelId: number;

  urlParams: Object;

  brandArr: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private paramsService: ParamsService,
    private defaultService: DefaultService, private dataService: DataService,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent, private filterService: FilterService) {

    this.isCategory = false;

    let url = window.location.href;

    this.defaultService.getBrands().subscribe(response => {
      if (response.length != 0) {
        this.brandArr = response;
        this.activatedRoute.params.subscribe(routingUrl => {
          this.urlParams = routingUrl;

          this.defaultService.getMappingFilters().subscribe(response => {
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
            let arr = this.dataService.getFilterComponentsData(response, routingUrl, 'brandId');
            let tempArr = this.utilitiesService.mapArrays(arr, this.brandArr, 'brandId');

            if ((url.indexOf('?' + 'brandFilter' + '=') != -1) || (url.indexOf('&' + 'brandFilter' + '=') != -1)) {
              let brandFilterIds = this.activatedRoute.snapshot.queryParams['brandFilter'].split(",").map(Number);
              // this.brands = this.utilitiesService.updateArrayObjectByURLKey('checked', brandFilterIds, tempArr, 'brandId', true);
              brandFilterIds.forEach(elementIdArr => {
                tempArr.forEach(element => {
                  if (element['brandId'] == elementIdArr) {
                    element.checked = true;
                  }
                });
              });
            }
            this.brands = tempArr;



          }); //end of getMappingFilter
        }); // End of Params Subscribe
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
    this.activatedRoute.queryParams.subscribe(response => {
      console.log("brandQuery",response)
      this.pageNo=response.pageNo;
      this.paginationSize = response.pageSize;
    });
    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    console.log(filterData)
    filterData.queryParam.pageSize = this.paginationSize;
    filterData.queryParam.pageNo = this.pageNo;
    this.urlComponent.loadUrl(filterData.url, filterData.queryParam, '');
  }

} 
