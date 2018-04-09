import { Component, OnInit, Output, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-alternative-style',
  templateUrl: './alternative-style.component.html',
  styleUrls: ['./alternative-style.component.css']
})
export class AlternativeStyleComponent implements OnInit {
  isCategory: boolean;
  products: any;

  cn: string;
  ln: string;
  menuId: string;
  categoryId: string;

  public carouselOne: NgxCarousel;
  constructor(private router:Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.ln = params.ln;
      this.cn = params.cn;
      this.menuId = params.menuId;
      this.categoryId = params.categoryId;
      
    });
  }

  ngOnInit(): void {
    this.isCategory = false;
    this.carouselOne = {
      grid: { xs: 1, sm: 2, md: 2, lg: 5, all: 0 },
      slide: 1,
      speed: 900,
      interval: 4000,
      // animation: 'lazy',
      point: {
        visible: false
      },
      load: 1,
      touch: true,
      loop: false,
      // easing: 'ease'
      // custom: 'banner'
    }
  }

  @Input()
  set Products(products: any) {
    this.products = products
  }
  get Products() {
    return this.products;
  }

  ngAfterViewInit() {
    (<any>$('#myCarousel')).carousel({
      interval: 7000
    });
    $('.carousel[data-type="multi"] .item').each(function () {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      for (var i = 0; i < 2; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
      }
    });
  }

  public viewAlternateProduct(alternativeProduct) {
    let routingUrl = 'product/'+this.cn+"/"+this.ln+"/"+this.menuId+"/"+this.categoryId+"/"+alternativeProduct.id;
    console.log("routing url ==>",routingUrl);
    // window.location.href=routingUrl;
    this.router.navigate(["../",alternativeProduct.id],{relativeTo:this.activatedRoute});
  }

  public myfunc(event: Event) {
    console.log(event)
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
}
