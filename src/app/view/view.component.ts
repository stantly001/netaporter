import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  categoryProducts:Array<any>=[];
  products:Array<any>=[];
  sort:Array<any>=[];
  categoryId:number;
  subCategoryId:number;
  ln:string;
  cn:string;
  subCategoryName:string;
  designerFilter:Array<any>=[];
  colorFilter:Array<any>=[];
  sizeFilter:Array<any>=[];
  productObj: {[k: string]: any} = {};
  header:Object;
  productImageView:string;
  queryStringArr:Array<any>=[];

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,
    private defaultService:DefaultService,private dataService:DataService,
    private router:Router,private utilitiesService:UtilitiesService,
    private location:Location) {
    
    }


  ngOnInit() {    
    this.productImageView="product";
    
    this.defaultService.getSortData().subscribe(response=>{
      this.sort=response;
    });

    this.activatedRoute.params.subscribe(response=>{
      console.log(response);
      this.categoryId=parseInt(response.categoryId);
      this.subCategoryId=parseInt(response.subCategoryId);
      this.ln=response.ln;
      this.cn=response.cn;
      let category = this.defaultService.getCategories().subscribe(response=>{
        this.header=this.utilitiesService.mapArrayData(response,'id',this.categoryId);
      });

      if(this.categoryId && this.subCategoryId){
        let arr:Array<any>=[];
        this.defaultService.getProducts().subscribe(response=>{
          let productResponse:any;
          productResponse=response;
          
          let productCategory = this.dataService.getProductByCategory(productResponse,this.categoryId);
          arr= this.dataService.getProductBySubCategory(productCategory,this.subCategoryId);
          
          this.subCategories=this.dataService.getSubCategoriesByProductCategory(arr,'subCategoryId');
          this.designers=this.dataService.getDesignersByProductCategory(arr,'subCategoryDesignerId');
          this.colors=this.dataService.getColosByProductCategory(arr,"subCategoryColorId");
          this.sizes=this.dataService.getSizeByProductCategory(arr,"subCategorySizeId");
          this.products=arr;
          this.productObj.products=arr;
          this.productObj.filterProduct=arr;
        });
      }
      else {
        this.defaultService.getProducts().subscribe(response=>{
          let productResponse:any;
          let arr:Array<any>=[];
          productResponse=response;

          arr=this.dataService.getProductByCategory(productResponse,this.categoryId);

          this.subCategories=this.dataService.getSubCategoriesByProductCategory(arr,'subCategoryId');
          this.designers = this.dataService.getDesignersByProductCategory(arr,'designerId');
          this.colors=this.dataService.getColosByProductCategory(arr,"colorId");
          this.sizes= this.dataService.getSizeByProductCategory(arr,"sizeId");
          this.products=arr; // to display in UI

          this.productObj.products=arr; //used for query string filters
          this.productObj.filterProduct=arr; //used for query string filters
        });
      }
    });
  }
  
  /**
   * 
   * @param filterObj 
   * @param isChecked 
   * @param type 
   * 
   */
  public filter(filterObj,isChecked,type) {
    if(type=='designer')
    { 
      isChecked ? this.designerFilter.push(filterObj.designerId) : this.designerFilter.splice(this.designerFilter.indexOf(filterObj.designerId))
      if(this.queryStringArr.indexOf("designerFilter") == -1 && (this.designerFilter.length > 0)) {
        this.queryStringArr.push("designerFilter");
      }
      if(this.queryStringArr.indexOf("designerFilter") != -1 && (this.designerFilter.length==0)){
        this.queryStringArr.splice(this.queryStringArr.indexOf("designerFilter"),1);
      }
    }
    if(type=='color') {
      isChecked ? this.colorFilter.push(filterObj.colorId) : this.colorFilter.splice(this.colorFilter.indexOf(filterObj.colorId),1);
      if(this.queryStringArr.indexOf("colorFilter") == -1 && (this.colorFilter.length > 0)) {
        this.queryStringArr.push("colorFilter");
      }
      if(this.queryStringArr.indexOf("colorFilter") != -1 && (this.colorFilter.length==0)){
        this.queryStringArr.splice(this.queryStringArr.indexOf("colorFilter"),1);
      }
    }
    if(type=="size") {
      isChecked ? this.sizeFilter.push(filterObj.sizeId) : this.sizeFilter.splice(this.sizeFilter.indexOf(filterObj.sizeId),1);
      if(this.queryStringArr.indexOf("sizeFilter") == -1 && (this.sizeFilter.length > 0)) {
        this.queryStringArr.push("sizeFilter");
      }
      if(this.queryStringArr.indexOf("sizeFilter") != -1 && (this.sizeFilter.length==0)){
        this.queryStringArr.splice(this.queryStringArr.indexOf("sizeFilter"),1);
      }
    }
    
    let filters:Object={
      colorFilter:this.utilitiesService.convertArrayToString(this.colorFilter),
      designerFilter:this.utilitiesService.convertArrayToString(this.designerFilter),
      sizeFilter:this.utilitiesService.convertArrayToString(this.sizeFilter)
    };

    let sortedMap: {[k: string]: any} = {};
    sortedMap=this.utilitiesService.sortObjectByArrayKeys(this.queryStringArr,filters);
    let routeUrl = (this.categoryId && this.subCategoryId) ? "shop/"+this.cn+"/"+this.ln+"/"+this.categoryId+"/"+this.subCategoryId:"shop/"+this.cn+"/"+this.ln+"/"+this.categoryId;
    this.loadUrl(routeUrl,sortedMap);
  }
  
  /**
   * 
   * @param routeUrl 
   * @param obj 
   * updates url and get products
   */
  loadUrl(routeUrl,obj){
    this.router.navigate([routeUrl], { queryParams: obj }).then(()=>{
      this.activatedRoute.queryParams.subscribe((params:Params)=>{
        this.getProductByFilters(params,this.productObj);
      });
    });
  }

  /**
   * 
   * @param params 
   * @param productObj 
   * @param level 
   * Filters By Levels done Here
   * Sorting by Products done Here
   */
  getProductByFilters(params,productObj){
    let arr:Array<any>=[];
    let filters=this.dataService.stringKeyToArray(params);
    if(Object.keys(filters).length==0){
      this.products=productObj.products;
    }
    else if(Object.keys(filters).length==1) { //first level filter
      let key=Object.keys(filters)[0];
      productObj.filterProduct=this.getData(productObj.products,key,filters[key]);
      this.products=productObj.filterProduct;
    } else { //more than one filters
      for(let key in filters){
        productObj.filterProduct=this.getData(productObj.filterProduct,key,filters[key]);
        this.products=productObj.filterProduct;
      }
    }
    ("sortOrder" in params) ? this.utilitiesService.sortArrayByOrders(productObj.filterProduct,params.sortOrder,"price") : this.products;
  }

  getData(products,key,value){ 
    let arr:Array<any>=[];
    products.forEach(element => {
      let length=this.dataService.findExist(element[key],value);
      (length >0) ? arr.push(element) :'';
    });
    return arr;
  }
 
  /**
   * 
   * @param type 
   * Sort Method for Product
   */
  sortProduct(type) {
    let routeUrl = (this.categoryId && this.subCategoryId) ? "shop/"+this.cn+"/"+this.ln+"/"+this.categoryId+"/"+this.subCategoryId:"shop/"+this.cn+"/"+this.ln+"/"+this.categoryId;
    let sortOrder:string;
    if(type=="priceLowToHigh") {
      sortOrder="asc";
    }
    if(type=="priceHighToLow"){
      sortOrder="desc";
    }
    Observable.combineLatest(this.activatedRoute.params,this.activatedRoute.queryParams,
      (params:Params,qParams:Params)=>({params,qParams})).subscribe(allParams=>{
        let obj=JSON.parse(JSON.stringify(allParams.qParams));
        (type=="all") ? delete obj["sortOrder"] : (obj["sortOrder"]=sortOrder);
        this.loadUrl(routeUrl,obj);
    });
  }

  /**
   * 
   * @param imageType 
   * Display product based on Image Type
   */
  imageView(imageType){
    this.productImageView = imageType;
  }




}
