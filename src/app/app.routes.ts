import {Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import { ParamsService } from './services/params.service';
export const Approute:Routes=[
    {
        path:"shop/:cn/:ln/:menuId/:categoryId",
        component:ViewComponent,
        children : [
            {
                path :":subCategoryId",
                component:ViewComponent
            }
        ]
    },
    // {
    //     path:"shop/:cn/:ln/:menuId/:categoryId/:subCategoryId",
    //     component:ViewComponent,
    //     data: {
    //         // Uses static text (Home)
    //       //  breadcrumbs: McBreadcrumbsResolver
    //       } 
    // },
    // {
    //     path:"shop/:cn/:ln/:menuId/:categoryId/:subCategoryId/:subLevelId",
    //     component:ViewComponent,
    //     data: {
    //         // Uses static text (Home)
    //      //   breadcrumbs: McBreadcrumbsResolver
    //       } 
    // },
    {
        path:"product/:cn/:ln/:productId",
        component:ProductViewComponent,
        data: {
            // Uses static text (Home)
           // breadcrumbs: McBreadcrumbsResolver
          } 
    },
    { 
        path: '',
        redirectTo: 'shop/us/en/1/1',
        pathMatch: 'full',
         data: {
            // Uses static text (Home)
           // breadcrumbs: McBreadcrumbsResolver
          } 
    }
]


