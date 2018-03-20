import { Component, OnInit,Input } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { forkJoin } from "rxjs/observable/forkJoin";
import { DataService } from '../services/data.service';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {DefaultService} from '../services/default.service';
import {UtilitiesService} from '../services/utilities.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  colors:Array<any>=[];
  designers:Array<any>;
  subCategories:Array<any>=[];
  sizes:Array<any>=[];
  products:Array<any>=[];
  sort:Array<any>=[];
  categoryId:number;
  subCategoryName:string;
  test:Array<any>=[];
  public designerFilter:Array<any>=[];
  public colorFilter:Array<any>=[];
  public sizeFilter:Array<any>=[];

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,
    private defaultService:DefaultService,private dataService:DataService,
    private router:Router,private utilitiesService:UtilitiesService,
    private location:Location) {
      this.categoryId = parseInt(this.activatedRoute.snapshot.params['categoryId']);
     }
  ngOnInit() {
    this.defaultService.getSortData().subscribe(response=>{
      this.sort=response;
    });
      if(!this.categoryId) {
        this.defaultService.getProducts().subscribe(response=>{
          this.products=response;
        });
      } else { 
        this.defaultService.getProducts().subscribe(response=>{
          let productResponse:any;
          let arr:Array<any>=[];
          productResponse=response;
          productResponse.forEach(element => {
            let index:number;
            index = element.categories.indexOf(this.categoryId);
            if(index !== -1) {
              arr.push(element);
            }
          }); 
          this.subCategories=this.dataService.getSubCategoriesByProduct(arr);
          this.designers = this.dataService.getDesignersByProduct(arr);
          this.colors=this.dataService.getColosByProduct(arr);
          this.sizes= this.dataService.getSizeByProduct(arr);
          this.products=arr;   
        });
      }
  }
  
 
  public filter(filterObj,isChecked,type) {
    if(type=='designer')
    { 
      isChecked ? this.designerFilter.push(filterObj.designerId) : this.designerFilter.splice(this.designerFilter.indexOf(filterObj.designerId))
    }
    if(type=='color') {
      isChecked ? this.colorFilter.push(filterObj.colorId) : this.colorFilter.splice(this.colorFilter.indexOf(filterObj.colorId),1);
    }
    if(type=="size") {
      isChecked ? this.sizeFilter.push(filterObj.sizeId) : this.sizeFilter.splice(this.sizeFilter.indexOf(filterObj.sizeId),1);
    }
    let fullUrl=this.router.url; // /home/2?colorFilter=&designer=
    let filters:Object={
      color:this.utilitiesService.convertArrayToString(this.colorFilter),
      designer:this.utilitiesService.convertArrayToString(this.designerFilter),
      size:this.utilitiesService.convertArrayToString(this.sizeFilter)
    };
    let filterUrl: {[k: string]: any} = {};
    let filterStr=this.createQueryFilter(fullUrl,filters);
    let domainUrl = this.utilitiesService.getUrlBeforeQueryString();
    let result = this.dataService.getFilterProduct(this.products,domainUrl,filterStr);    
    // this.router.navigate([domainUrl],{queryParams:{page1:1,page2:2}});
    console.log(filterStr);
  }

  public createQueryFilter(fullUrl,filters) {
    let filterStr:string="";
    let filter: {[k: string]: any} = {};
    if((fullUrl.indexOf('?' + "colorFilter" + '=') != -1 || 
       fullUrl.indexOf('&' + "colorFilter" + '=') != -1) || (filters.color!="")) {
        filter.colorFilter=filters.color;
        filterStr+="colorFilter="+filters.color+"&";
    }
    if((fullUrl.indexOf('?' + "designerFilter" + '=') != -1 || 
       fullUrl.indexOf('&' + "designerFilter" + '=') != -1)|| (filters.designer!="")) {
        filter.designerFilter=filters.designer;
        filterStr+="designerFilter="+filters.designer+"&";
    }
    if((fullUrl.indexOf('?' + "sizeFilter" + '=') != -1 || 
       fullUrl.indexOf('&' + "sizeFilter" + '=') != -1)|| (filters.size!="")) {
        filter.sizeFilter=filters.size;
        filterStr+="sizeFilter="+filters.size+"&";
    }
     filterStr.substring(0,filterStr.length-1);
          
     return filter;
    
    //  return this.http.get<filterStr>(currentLocation + filterStr);
  }

  

    



}
