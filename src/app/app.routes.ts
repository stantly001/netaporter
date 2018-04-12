import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppBreadCrumbsResolver } from './app.breadcrumb.resolver';
export const Approute: Routes = [
    // {
    //     path:"shop/:cn/:ln/:menuId/:categoryId",
    //     component:ViewComponent,
    //     children : [
    //         {
    //             path :":subCategoryId",
    //             component:ViewComponent
    //         }
    //     ]
    // },
    {
        path: "shop/:cn/:ln/:menuId",
        redirectTo: 'shop/us/en/1/1',
        pathMatch: "full",
        data: {
            // Uses static text (Home)
            //breadcrumbs: AppBreadCrumbsResolver
        }
    },
    {
        path: "shop/:cn/:ln/:menuId/:categoryId",
        component: ViewComponent,
        // data : {
        //     breadCrumbs:":menuId/:categoryId"
        // }
        data: {
            // Uses static text (Home)
            // breadcrumbs: AppBreadCrumbsResolver
        }
    },
    {
        path: "shop/:cn/:ln/:menuId/:categoryId/:subCategoryId",
        component: ViewComponent,
        data: {
            // Uses static text (Home)
            breadcrumbs: AppBreadCrumbsResolver
        }
    },
    {
        path: "shop/:cn/:ln/:menuId/:categoryId/:subCategoryId/:subLevelId",
        component: ViewComponent,
        data: {
            // Uses static text (Home)
            //breadcrumbs: AppBreadCrumbsResolver
        }
    },
    {
        path: "product/:cn/:ln/:menuId/:categoryId/:productId",
        component: ProductViewComponent,
        data: {
            // Uses static text (Home)
           // breadcrumbs: AppBreadCrumbsResolver
        }
    },
    {
        path: '',
        redirectTo: 'shop/us/en/1/1',
        pathMatch: 'full',
        data: {
            // Uses static text (Home)
            text:"Home",
            // breadcrumbs:true
            //breadcrumbs: AppBreadCrumbsResolver
        }
    }
]


