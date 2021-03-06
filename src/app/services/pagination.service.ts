import * as _ from 'underscore';
import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PaginationService implements CanLoad {

    canLoad(route: Route): any {
        console.log("called canload")
    }
    constructor() { }
    getPager(totalItems: number, currentPage, pageSize) {
        let pagesiz = parseInt(pageSize);
        let currPage = parseInt(currentPage);
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pagesiz);
        let startPage: number, endPage: number;


        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currPage - 2;
                endPage = currPage + 2;
            }
        }


        // if (totalPages <= 10) {
        // less than 10 total pages so show all
        //     startPage = 1;
        //     endPage = totalPages;
        // } else {
        // more than 10 total pages so calculate start and end pages
        //     if (currentPage <= 6) {
        //         startPage = 1;
        //         endPage = 10;
        //     } else if (currentPage + 4 >= totalPages) {
        //         startPage = totalPages - 9;
        //         endPage = totalPages;
        //     } else {
        //         startPage = currentPage - 5;
        //         endPage = currentPage + 4;
        //     }
        // }

        // calculate start and end item indexes
        let startIndex = (currPage - 1) * pagesiz;
        let endIndex = Math.min(startIndex + pagesiz - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currPage,
            pageSize: pagesiz,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };


    }
}
