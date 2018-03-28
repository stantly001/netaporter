import { Component, OnInit, Input,Injector } from '@angular/core';
import * as _ from 'underscore';
import { PaginationService } from '../services/index';
import {DefaultService} from '../services/default.service';
import {ParamsService} from '../services/params.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
  })
export class ProductsComponent implements OnInit {
  @Input() products: Array<any> = [];
  @Input() ImageView: string;
  pageNum:any;
  constructor(private pagerService: PaginationService,private defaultService:DefaultService,private router: Router,private route:ActivatedRoute,private paramsService:ParamsService) { }
  pager: any = {};

  // paged items
  pagedItems: any[];


  ngOnInit() {
    console.log(this.products)
    this.defaultService.getProducts().subscribe(response => {
      this.products = response;

      console.log(this.products)
      this.setPage(1);
    })

    
  }
 
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge', 
      // preserve the existing query params in the route
      // skipLocationChange: true
    });
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.products.length, page);

    // get current page of items
    this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}


