import { Directive, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Directive({
  selector: '[appProductView]'
})
export class ProductViewDirective implements OnInit {

  // @ViewChild('elevatezoomBig') container : ElementRef;
  @Input() productView: String;

  ngOnInit(): void {

  }
  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    // /$('#zoom_01').elevateZoom();
    // $(document).ready(function () {
    // (<any>$(this.el.nativeElement)).elevateZoom({
    //   // tint:true, tintColour:'#F90', tintOpacity:0.5,
    //   zoomType: "inner",
    //   cursor: "crosshair",
    //   zoomWindowFadeIn: 500,
    //   zoomWindowFadeOut: 750
    //   // zoomWindowFadeIn: 500,
    //   // zoomWindowFadeOut: 500,
    //   // lensFadeIn: 500,
    //   // lensFadeOut: 500
    // });
    // }



      (<any>$(this.el.nativeElement))
      .wrap('<span style="display:inline-block"></span>')
      .css('display', 'block')
      .parent()
      .zoom();
  }

}
