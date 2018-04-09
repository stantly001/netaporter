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
      (<any>$(this.el.nativeElement))
      .wrap('<span style="display:inline-block"></span>')
      .css('display', 'block')
      .parent()
      .zoom({url:this.el.nativeElement.dataset.zoomImage});
  }

}
