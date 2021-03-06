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



    this.defaultService.getBrands().subscribe(response => {
      let url = window.location.href;
      if (response.length != 0) {
        this.brandArr = response;
        this.activatedRoute.params.subscribe(routingUrl => {
          this.urlParams = routingUrl;

          this.defaultService.getMappingFilters().subscribe(response => {
            let arr = this.dataService.getFilterComponentsData(response, routingUrl, 'brandId');
            let tempArr = this.utilitiesService.mapArrays(arr, this.brandArr, 'brandId');
            if ((url.indexOf('?' + 'brandFilter' + '=') != -1) || (url.indexOf('&' + 'brandFilter' + '=') != -1)) {
              let brandFilterIds = this.activatedRoute.snapshot.queryParams['brandFilter'].split(",").map(Number);
              brandFilterIds.forEach(elementIdArr => {
                tempArr.forEach(element => {
                  if (element['brandId'] == elementIdArr) {
                    element.checked = true;
                  }
                });
              });
            } else {
              tempArr.forEach(element => {
                element.checked = false;
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
    let queryParams = this.activatedRoute.snapshot.queryParams;

    let filterData = this.filterService.filter(filterObj, isChecked, type, this.urlParams);
    filterData.queryParam.pageSize = queryParams.pageSize ? queryParams.pageSize : 5;
    filterData.queryParam.page = 1;
    this.router.navigate([filterData.url], { queryParams: filterData.queryParam });
  }

} 
