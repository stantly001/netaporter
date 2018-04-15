import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';


import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';
import { PaginationService } from '../services/index';
// import { PaginationService } from '../services/index';
import { DefaultService } from '../services/default.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  rows: number[];
  itemsPerRow: number;
  pageNo: any;
  page: any;
  pageNumber: any;
  pageSize: any;
  products: Array<any> = [];
  // @Input() ImageView: string;
  pager: any = {};
  pagedProducts: any[];
  sort: Array<any> = [];
  params: Object;
  cn: string;
  ln: string;
  menuId: string;
  categoryId: string;

  constructor(private paramsService: ParamsService,
    private defaultService: DefaultService, private router: Router, private activatedRoute: ActivatedRoute,
    private utilitiesService: UtilitiesService, private paginationService: PaginationService, private urlComponent: UrlComponent) {

    this.activatedRoute.params.subscribe(response => {
      this.params = response;
      this.cn = response.cn;
      this.ln = response.ln;
      this.menuId = response.menuId;
      this.categoryId = response.categoryId;
    });
    this.activatedRoute.queryParams.subscribe(response => {
      this.pageNo = response.page;
      this.pageSize = response.pageSize;
    })

    this.paramsService.fp.subscribe(response => {
      if (response.length !== 0) {
        this.products = response;
        console.log(this.products);
        this.itemsPerRow = 4
        this.rows = Array.from(Array(Math.ceil(this.products.length / this.itemsPerRow)).keys());
        let pageSize
        if (this.pageSize) {
          pageSize = this.pageSize;
        } else {
          this.pageSize=5;
          pageSize = this.pageSize;
        }
        let pageNo = this.pageNo
        if (!pageNo) {
          pageNo = 1;
          this.setPage(pageNo, pageSize);
          console.log("+++++++++++++++++");
        } else {
          console.log("____________________________");
          this.setPage(pageNo, pageSize)
        }
      } else {
        this.products = response;
      }
    });

  } 

  ngOnInit() {


  }


  selectPageSize(number) {
    this.pageSize = number;
    // get pager object from service
    this.pager = this.paginationService.getPager(this.products.length, 1, this.pageSize);
    // get current page of items
    // console.log(this.pager)
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: 1,
        pageSize: number
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      // skipLocationChange: true

    });
    this.paramsService.setPaginationProducts(this.pagedProducts);
  }

  setPage(page: number, len: number) {
    console.log(page)
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page,
        pageSize: len
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      // skipLocationChange: true
    });
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
  
    this.pager = this.paginationService.getPager(this.products.length, page, len);
   
    // get current page of items
    this.pagedProducts = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.paramsService.setPaginationProducts(this.pagedProducts);
    // this.utilitiesService.sortArrayByOrders(this.pagedProducts, 'asc', "orginalPrice");

  }





}
