import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DefaultService } from './default.service';
@Injectable()
export class BreadcrumbService {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private defaultService: DefaultService) { }


  generateBreadCrumb(urlParams: Object): any {

    return this.defaultService.getCategories().map(response => {

      let subCategoryObj: { [key: string]: any } = {};
      let subLevelObj: { [key: string]: any } = {};
      let obj: { [key: string]: any } = {};

      let menuObj = response.filter(data => data['menuId'] === urlParams['menuId'])[0];
      obj.menuName = menuObj['menuName'];
      obj.menuId = urlParams["menuId"];

      let categoryObj = menuObj['categories'].filter(data => data['categoryId'] === parseInt(urlParams['categoryId']))[0];
      obj.categoryName = categoryObj['categoryName'];
      obj.categoryId= urlParams['categoryId'];

      if (urlParams['subCategoryId']) {
        subCategoryObj = categoryObj['subCategory'].filter(data => data["id"] === parseInt(urlParams['subCategoryId']))[0];
        obj.subCategory = subCategoryObj["name"];
        obj.subCategoryId = urlParams['subCategoryId'];
      }

      if (urlParams['subLevelId']) {
        subLevelObj = subCategoryObj['subLevelCategory'].filter(data => data["subLevelCategoryId"] === parseInt(urlParams['subLevelId']))[0];
        obj.subLevel = subLevelObj['subLevelCategoryName'];
        obj.subLevelId = urlParams['subLevelId'];
      }
      return obj;


    });














  }
}
