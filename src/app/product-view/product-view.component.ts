import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';
import 'ngx-popover';

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

  @ViewChild('videoPlayer') videoplayer: any;

  constructor(private activatedRoute: ActivatedRoute, private defaultService: DefaultService, private utilitiesService: UtilitiesService) {
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
    })
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
