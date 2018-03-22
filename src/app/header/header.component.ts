import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute,Params,Router} from '@angular/router';

import {DefaultService} from '../services/default.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menus:any;
  ln:string;
  cn:string;
  countries:Array<any>=[];
  languages:Array<any>=[];

  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private router:Router,private defaultService:DefaultService) { }

  ngOnInit() {
    this.ln="en";
    this.defaultService.getCategories().subscribe(response=>{
      this.menus = response;
    });

    this.defaultService.getCountry().subscribe(response=>{
      this.countries = response;
    }); 
    
    this.defaultService.getLanuage().subscribe(response=>{
      this.languages=response;
    });

    
  }

  /**
   * 
   * @param country 
   */
  updateCountry(country){
    this.cn=country;
    Observable.combineLatest(this.activatedRoute.params,this.activatedRoute.queryParams,
      (params:Params,qParams:Params)=>({params, qParams})).subscribe(allParams=>{
        let obj=JSON.parse(JSON.stringify(allParams.qParams));
        let categoryId = 1;
        let subCategoryId = parseInt(allParams.params.subCategoryId)
        let routeUrl = "shop/"+this.cn+"/"+this.ln+"/"+categoryId;
        this.router.navigate([routeUrl], { queryParams: obj })
    });
  }

  /**
   * 
   * @param lang 
   * update Country Language
   */
  updateLanguage(lang) {
    this.ln=lang;
    if(typeof(this.cn)=="undefined") {
      this.cn="us";
    }
    console.log(this.cn);
    Observable.combineLatest(this.activatedRoute.params,this.activatedRoute.queryParams,
      (params:Params,qParams:Params)=>({params, qParams})).subscribe(allParams=>{
        let obj=JSON.parse(JSON.stringify(allParams.qParams));
        let categoryId = 1;
        let subCategoryId = parseInt(allParams.params.subCategoryId)
        let routeUrl = "shop/"+this.cn+"/"+this.ln+"/"+categoryId;
        this.router.navigate([routeUrl], { queryParams: obj })
    });
  }
}
