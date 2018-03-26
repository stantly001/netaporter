import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DefaultService } from '../services/default.service';
import * as $ from 'jquery';
import { UtilitiesService } from '../services/utilities.service';
//import 'jquery-zoom';
declare var jQuery: any;
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  providers:[UtilitiesService]
})

export class ProductViewComponent implements OnInit {
  alternateCategories: any;
  alternateProducts: any;
  category: any;
  sizes: any;
  images: any;
  isOn: boolean;
  productId: number;
  productsArr: any;
  current: number = 0;
  items: Array<any>;

  @ViewChild('videoPlayer') videoplayer: any;

  constructor(private activatedRoute: ActivatedRoute, private defaultService: DefaultService,private utilitiesService:UtilitiesService) {
    this.productId = parseInt(this.activatedRoute.snapshot.params["productId"]);
  }
  ngAfterViewInit() {
       // (<any>$('.zoom'))
    // .wrap('<span style="display:inline-block"></span>')
    // .css('display', 'block')
    // .parent()
    // .zoom();
   
  }

  ngOnInit() {
    
    let result;
    this.isOn = true;
    this.defaultService.getProducts().subscribe(response => {
      this.productsArr = response.filter(product => product.id === this.productId)[0];
      console.log(response.filter(product => product.id === this.productId)[0].categories[0]);
      let categoryId=response.filter(product => product.id === this.productId)[0].categories[0];
      this.alternateProducts=this.utilitiesService.getArrayDataByKey(response,"categories",categoryId);
      this.images = this.productsArr.images.black;
      // this.category=this.productsArr.categories[0];
      console.log(this.category);
    });

    this.defaultService.getSizes().subscribe(response => {
      this.sizes = response;
      console.log(this.sizes)
    })


  }
  imageColorSelection(color) {
    if (color == "black") {
      this.images = this.productsArr.images.black;
    } else if (color == "blue") {
      this.images = this.productsArr.images.blue;
    }
    else if (color == "red") {
      this.images = this.productsArr.images.red;
    }
  }

  toggleVideo(event: any) {
    this.isOn = false;
    this.videoplayer.nativeElement.play();
  }

}
