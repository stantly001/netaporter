import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { IBreadcrumb, McBreadcrumbsResolver } from 'ngx-breadcrumbs';
import { BreadcrumbService } from './services/breadcrumb.service';

@Injectable()
export class AppBreadCrumbsResolver extends McBreadcrumbsResolver {

    constructor(private service: BreadcrumbService, private activatedRoute: ActivatedRoute) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBreadcrumb[]> {
        console.log("parent",route.params)
        let obj: { [k: string]: any } = {};
        return this.service.generateBreadCrumb(route.params).subscribe(response => {
            console.log("Breadcri", response);
            obj.text = response.menuName;
            obj.path = "/shop/us/en/1/1?pageSize=10&page=1"
            console.log("breadcrumn===============>",obj);
        })
        // .map((folders) =>
        //     folders.map((folder) =>
        //         ({
        //             text: folder.name,
        //             path: super.getFullPath(route.parent)
        //         })
        //     ));

    }
}