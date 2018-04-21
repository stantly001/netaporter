import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';

import { BreadcrumbService } from '../services/breadcrumb.service';
import { ParamsService } from '../services/params.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  cn: any;
  ln: any;
  subLevelId: number;
  subCategoryId: number;
  categoryId: number;
  menuId: number;
  breadCrumnSubLevelName: String;
  breadCrumbSubCategoryName: String;
  breadCrumbCategoryName: String;
  breadCrumbMenuName: String;
  params: any;
  length: Number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, private paramsService: ParamsService) {
    this.activatedRoute.params.subscribe(response => {
      this.params = response;
      this.breadcrumbService.generateBreadCrumb(response).subscribe(response => {
        this.breadCrumbMenuName = response.menuName;
        this.breadCrumbCategoryName = response.categoryName;
        this.breadCrumbSubCategoryName = response.subCategory;
        this.breadCrumnSubLevelName = response.subLevel;
      });

      this.menuId = parseInt(response.menuId);
      this.categoryId = parseInt(response.categoryId);
      this.subCategoryId = parseInt(response.subCategoryId);
      this.subLevelId = parseInt(response.subLevelId);

      this.ln = response.ln;
      this.cn = response.cn;

    });
    this.paramsService.fp.subscribe(response => {
      this.length = response.length;
    })
  }



  ngOnInit() { }

  /**
  * 
  * @param cn 
  * @param ln 
  * @param menuId 
  * @param categoryId
  * Load When BreadCrumb Menu clicked 
  */
  loadMenuClick(cn, ln, menuId, categoryId) {
    this.router.navigate(["/shop", cn, ln, menuId, categoryId]);
  }



}
