import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';
import { BreadcrumbService } from '../services/breadcrumb.service';

declare var jQuery: any;

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  availableColors: any;
  sizes: any;
  images: any;
  alternateProducts: any;
  isOn: boolean;
  productId: number;
  productsArr: any;
  current: number = 0;
  items: Array<any>;

  cn:string;
  ln:string;

  breadCrumbMenuName: string;
  breadCrumbMenuId:number;

  breadCrumbCategoryName: string;
  breadCrumbCategoryId:number;

  breadCrumbSubCategoryName: string;
  breadCrumbSubCategoryId:number;

  breadCrumbSubLevelName: string;
  breadCrumbSubLevelId:number;
  
  breadCrumbProductName: string;

  @ViewChild('videoPlayer') videoplayer: any;

  constructor(private activatedRoute: ActivatedRoute, private defaultService: DefaultService, private utilitiesService: UtilitiesService, private paramsService: ParamsService, private breadCrumbService: BreadcrumbService) {
    this.productId = parseInt(this.activatedRoute.snapshot.params["productId"]);
  }

  ngOnInit() {
    let result;
    this.isOn = true;
    this.defaultService.getProducts().subscribe(response => {
      this.productsArr = response.filter(product => product.id === this.productId)[0];
      let categoryId = response.filter(product => product.id === this.productId)[0].categories[0];
      this.alternateProducts = this.utilitiesService.getArrayDataByKey(response, "categories", categoryId);
      this.images = this.productsArr.images[0].image;
      this.availableColors = this.productsArr.availableColors;
    });
    this.defaultService.getProducts().subscribe(response => {
      this.productsArr = response.filter(product => product.id === this.productId)[0];
    });
    this.defaultService.getSizes().subscribe(response => {
      this.sizes = response;
    });

    this.activatedRoute.params.subscribe(params => {

      this.ln = params.ln;
      this.cn = params.cn;

      this.breadCrumbService.generateBreadCrumb(params).subscribe(response => {
        this.breadCrumbMenuName = response.menuName;
        this.breadCrumbMenuId = response.menuId;
        this.breadCrumbCategoryName = response.categoryName;
        this.breadCrumbCategoryId = response.categoryId;
        this.breadCrumbSubCategoryName = response.subCategory;
        this.breadCrumbSubCategoryId=response.subCategoryId;
        this.breadCrumbSubLevelName = response.subLevel;
        this.breadCrumbSubLevelId = response.subLevelId;
        this.breadCrumbProductName = this.productsArr.name;
      });
    });

  }

  imageColorSelection(color) {
    this.productsArr.images.forEach(element => {
      if (element.id == color.id) {
        this.images = element.image;
      }
      console.log(element);
    });
  }

  ngAfterViewInit() {
  }

  toggleVideo(event: any) {
    this.isOn = false;
    this.videoplayer.nativeElement.play();
  }

}
