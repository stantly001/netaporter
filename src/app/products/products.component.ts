import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products:Array<any>=[];
  constructor() { }

  ngOnInit() {
  }

}
