import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';
import { PaginationService } from '../services/index';
import { DefaultService } from '../services/default.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageNumber: any;
  pageSize: any;
  @Input() products: Array<any> = [];
  @Input() ImageView: string;
  pager: any = {};
  pagedProducts: any[];
  sort:Array<any>=[];
  params:Object;
  cn:string;
  ln:string;

  constructor(private paramsService: ParamsService, private paginationService: PaginationService,
    private defaultService: DefaultService, private router: Router, private activatedRoute: ActivatedRoute,
    private utilitiesService: UtilitiesService, private urlComponent: UrlComponent) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
      this.cn = response.cn;
      this.ln = response.ln;
    });

    this.paramsService.getFilteredProducts().subscribe(response => {
      this.products = response;
      (response.length !== 0) ? this.setPage(1, response.length) : '';
    });


  }

  /**
   * 
   * @param number 
   */
  selectPageSize(number) {
    this.pageSize = number;
    console.log(number)
    // get pager object from service
    this.pager = this.paginationService.getPager(this.products.length, 1, this.pageSize);
    // get current page of items
    console.log(this.pager)
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  /**
   * 
   * @param page 
   * Pagination code
   */
  setPage(page: number, len: number) {
    console.log(page)
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
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
    console.log(this.products.length)
    console.log(len)
    this.pager = this.paginationService.getPager(this.products.length, page, len);
    // get current page of items
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex+1);

  }

}
