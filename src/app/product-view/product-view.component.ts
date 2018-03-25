import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DefaultService } from '../services/default.service';
import * as $ from 'jquery';
// import * as zoom from 'jquery-zoom';
// declare var jQuery: any;
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {
  isOn: boolean;
  productId: number;
  productsArr: any;
  current: number = 0;
  items: Array<any>;
  @ViewChild('videoPlayer') videoplayer: any;  

  constructor(private activatedRoute: ActivatedRoute, private defaultService: DefaultService) {
    this.productId = parseInt(this.activatedRoute.snapshot.params["productId"]);
  }

  ngOnInit() {    
    this.isOn=true;
    this.defaultService.getProducts().subscribe(response => {
      this.productsArr = response.filter(product => product.id === this.productId)[0];
      console.log(this.productsArr);
    });
    
 }
  
  toggleVideo(event: any) {
    this.isOn=false;
    this.videoplayer.nativeElement.play();
  }

}
