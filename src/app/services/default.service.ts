import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DefaultService {

  constructor(private http:HttpClient) { }

  private BASE_URL="../assets/datas/";

  getCategories():any {
    return this.http.get(this.BASE_URL+"menu.json").map((res:Response)=>res);
  }

  getDesigners():any {
    return this.http.get(this.BASE_URL+"designer.json").map((res:Response)=>res);
  }

  getSizes():any {
    return this.http.get(this.BASE_URL+"size.json").map((res:Response)=>res);
  }

  getColors():any {
    return this.http.get(this.BASE_URL+"color.json").map((res:Response)=>res);
  }

  getProducts():any {
    return this.http.get(this.BASE_URL+'product.json')
       .map((res:Response) => res);
  }

  getSortData():any {
    return this.http.get(this.BASE_URL+"sort.json").map((res:Response)=>res);
  }

  getLanuage():any {
    return this.http.get(this.BASE_URL+"language.json").map((res:Response)=>res);
  }

  getCountry():any {
    return this.http.get(this.BASE_URL+"country.json").map((res:Response)=>res);
  }

  getAds():any {
    return this.http.get(this.BASE_URL+"ads.json").map((res:Response)=>res);
  }

  getPrice():any {
    return this.http.get(this.BASE_URL+"price.json").map((res:Response)=>res);
  }

  getBrands():any {
    return this.http.get(this.BASE_URL+"brand.json").map((res:Response)=>res);
  }

}
