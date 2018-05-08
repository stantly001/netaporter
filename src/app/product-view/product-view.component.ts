import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';
import 'ngx-popover';
import { ParamsService } from '../services/params.service';
import { BreadcrumbService } from '../services/breadcrumb.service';

declare var jQuery: any;

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  breadCrumbProductDescripton: any;
  countryName: any;
  countries: any;
  i: number;
  favourite: boolean;
  shipping: any;
  availableColors: any;
  sizes: any;
  images: any;
  alternateProducts: any;
  isOn: boolean;
  productId: number;
  productsArr: any;
  current: number = 0;
  currentIndex: number = 0;
  currentColIndex: number = 0;
  items: Array<any>;

  cn: string;
  ln: string;

  breadCrumbMenuName: string;
  breadCrumbMenuId: number;

  breadCrumbCategoryName: string;
  breadCrumbCategoryId: number;

  breadCrumbSubCategoryName: string;
  breadCrumbSubCategoryId: number;

  breadCrumbSubLevelName: string;
  breadCrumbSubLevelId: number;

  breadCrumbProductName: string;

  @ViewChild('videoPlayer') videoplayer: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private activatedRoute: ActivatedRoute, private defaultService: DefaultService, private utilitiesService: UtilitiesService, private paramsService: ParamsService, private breadCrumbService: BreadcrumbService) {
    this.shipping = this.storage.get("shipping");
    this.activatedRoute.params.subscribe(response => {
      this.productId = parseInt(response.productId);
      let result;
      this.isOn = true;
      this.defaultService.getProducts().subscribe(response => {
        this.productsArr = response.filter(product => product.id === this.productId)[0];
        let categoryId = response.filter(product => product.id === this.productId)[0].categories[0];
        this.alternateProducts = this.utilitiesService.getArrayDataByKey(response, "categories", categoryId);
        this.images = this.productsArr.images[0].image;
        this.availableColors = this.productsArr.availableColors;
        this.activatedRoute.params.subscribe(params => {
          this.ln = params.ln;
          this.cn = params.cn;
        });

      });
      this.defaultService.getSizes().subscribe(response => {
        this.sizes = response;
      });
    });

    this.paramsService.shipment.subscribe(response => {
      this.countryName = response['countryName'];
    });


  }

  ngOnInit() {
    this.favourite = false;
    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
      let countryName = this.storage.get("shipping");
      if (countryName) {
        this.countryName = countryName;
      } else {
        this.countryName = response[0].countryName;
        this.storage.set("shipping", this.countryName);
      }
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

  toggleVideo(event: any) {
    this.isOn = false;
    this.videoplayer.nativeElement.play();
  }

  shipTo(country) {
    this.countryName = country.countryName;
    this.paramsService.setShipTo(country);
    this.storage.set("shipping", this.countryName);
  }

  
}
