import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }

   /*
      * - Join Array of Array structure
   */
  joinArrayOfArray(data) {
    let arr = [].concat.apply([],data);
    return this.removeDuplicatesFromArray(arr);
  }

  /*
    * - Remove Duplicates from Comma seperated Arrays
  */
  removeDuplicatesFromArray(arr) {
    return Array.from(new Set(arr))
  }

  /*
    * - Remove duplicates from Array of Objects
    * x - value
    * i - index
    * a - array
  */
  removeDuplicatesFromArrayMap(data:any) {
    return data.filter((x,i,a)=>x && a.indexOf(x)===i);
  }

  convertArrayToString(arr:Array<any>) {
    return arr.join(",");
  }

  getUrlBeforeQueryString() {
    return window.location.href.split('?')[0];
  }

}
