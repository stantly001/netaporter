import { Injectable } from '@angular/core';
import { DefaultService } from './default.service';

@Injectable()
export class UtilitiesService {

  constructor(private defaultService: DefaultService) { }

  /**
   * 
   * @param data 
   * Join Array of Array structure
   */
  joinArrayOfArray(data) {
    let arr = [].concat.apply([], data);
    return this.removeDuplicatesFromArray(arr);
  }

  /** 
    * @param arr
    * - Remove Duplicates from Comma seperated Arrays
  */
  removeDuplicatesFromArray(arr) {
    return Array.from(new Set(arr))
  }

  /**
    * @param data
    * - Remove duplicates from Array of Objects
    * x - value
    * i - index
    * a - array
  */
  removeDuplicatesFromArrayMap(data: any) {
    return data.filter((x, i, a) => x && a.indexOf(x) === i);
  }

  /**
   * 
   * @param arr 
   * Returns comma seperated Strings
   */
  convertArrayToString(arr: Array<any>) {
    return arr.join(",");
  }

  /**
   * get base url
   */
  getUrlBeforeQueryString() {
    return window.location.href.split('?')[0];
  }

  /**
   * 
   * @param arr 
   * @param obj 
   * Sort Object by Array index as object keys
   */
  sortObjectByArrayKeys(arr, obj) {
    let sortedMap: { [k: string]: any } = {};
    for (let i = 0; i < arr.length; i++) {
      sortedMap[arr[i]] = obj[arr[i]];
    }
    return sortedMap;
  }

  /**
   * 
   * @param arr 
   * @param type (asc/desc)
   * @param key
   * key exist consider as array object else consider as array
   */
  sortArrayByOrders(arr: Array<any>, type: string, key: string) {
    if (key) {
      return (type == "asc") ? arr.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key])) : arr.sort((a, b) => parseFloat(b[key]) - parseFloat(a[key]));
    } else {
      return (type == "asc") ? arr.sort((a, b) => parseFloat(a) - parseFloat(b)) : arr.sort((a, b) => parseFloat(b) - parseFloat(a));
    }
  }

  /**
   * 
   * @param arr 
   * @param key 
   * returns the map object from Array Object
   */
  mapArrayData(arr: Array<any>, key, value) {
    return arr.filter(data => data[key] == value)[0];
  }

  /**
   *
   * @param fromarr 
   * @param toArr 
   * @param key 
   * Compare Arrays with Array of Objects & Returns Matched Array objects by Mapping key
   */
  mapArrays(fromarr: Array<any>, toArr: Array<any>, key: string) {
    let arr: Array<any> = [];
    fromarr.forEach(element => {
      toArr.forEach(ele => {
        if (ele[key] == element) {
          arr.push(ele);
        }
      })
    });
    return arr;
  }

  /**
   *
   * @param arr
   * @param key
   * @param value
   * Returns Array Objects By Key and value
   */
  getArrayDataByKey(arr: Array<any>, key, value) {
    let response: Array<any> = [];
    arr.forEach(element => {
      (element[key].indexOf(value) !== -1) ? response.push(element) : '';
    });
    return response;
  }

  /**
   * 
   * @param arr 
   * @param key 
   * @param value
   * Returns Array of objects by key & value 
   */
  filterArrayByKey(arr: Array<any>, key: string, value: any) {
    let response: Array<any> = [];
    arr.forEach(element => {
      let index: number;
      index = element[key].indexOf(value);
      if (index !== -1) {
        response.push(element);
      }
    });
    return response;
  }

  /**
   * 
   * @param obj 
   * Build Routing Url rom Object
   */
  buildRoutingUrl(obj: Object) {
    let routeUrl: string;
    routeUrl = "shop/" + obj['cn'] + "/" + obj['ln'] + "/" + obj['menuId'] + "/" + obj['categoryId'];
    if (obj['subCategoryId']) {
      routeUrl = routeUrl + "/" + obj['subCategoryId'];
    }

    if (obj['subLevelId']) {
      routeUrl = routeUrl + "/" + obj['subLevelId'];
    }
    return routeUrl;
  }

  /**
   * 
   * @param type 
   * @param value
   * Build url on Page load. For Country & Language
   */
  buildUrl(type: string, value: string, params) {

    let paramsObj = JSON.parse(JSON.stringify(params));
    if (type == 'country') {
      paramsObj.cn = value;
    }
    if (type == "language") {
      paramsObj.ln = value;
    }
    let routeUrl = this.buildRoutingUrl(paramsObj);
    return routeUrl;
  }

  /**
   * 
   * @param arr 
   * @param value
   * Search By Product Name & Description 
   */
  searchFilter(arr: Array<any>, value: string) {
    let response: Array<any> = [];
    arr.forEach(element => {
      // ((element.name.toLowerCase().search(value) !== -1) || (element.description.toLowerCase().search(value) !== -1)) ? response.push(element) : ''
      (element.name.toLowerCase().search(value.toLocaleLowerCase()) !== -1) ? response.push(element) : ''
    });
    return response;
  }

  /**
  * 
  * @param data 
  * @param val 
  * @param filterKey 
  * filter by [] to {}
  */
  filterSelectedObj(data, val, filterKey) {
    return data.filter(x => x[filterKey] == val)[0];
  }

  /**
   * 
   * @param columnName 
   * @param fromArr 
   * @param toArr 
   * @param searchKey 
   */
  updateArrayObjectByURLKey(columnName, fromArr, toArr, searchKey, value) {
    fromArr.forEach(element => {
      toArr.forEach(ele => {
        if (ele[searchKey] == element) {
          element[columnName] = true;
        }
      });
    });
    return fromArr;
  }


  getProductObj(key, value) {
    let result: any;
    return this.defaultService.getProducts().map(response => {
      result = response.filter(product => product[key] == value)[0];
      if (Object.keys(result).length !== 0) {
        return result;
      }
    });
  }

}
