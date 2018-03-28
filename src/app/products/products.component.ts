import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { UrlComponent } from '../url/url.component';

import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';
// import { PaginationService } from '../services/index';
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

  constructor(private paramsService: ParamsService,
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
    });
  }

}
