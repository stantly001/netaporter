import {Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import { NavigationComponent } from './navigation/navigation.component';
export const Approute:Routes=[
    {
        path:"shop/:cn/:ln/:menuId/:categoryId",
        component:NavigationComponent,
        children:[
            {
                path:":subCategoryId",
                component:NavigationComponent,
                pathMatch: 'full'
            }
        ]
    },
    // {
    //     path:"shop/:cn/:ln/:menuId/:categoryId/:subCategoryId",
    //     component:ViewComponent
    // },
    // {
    //     path:"shop/:cn/:ln/:menuId/:categoryId/:subCategoryId/:subLevelId",
    //     component:ViewComponent
    // },
    {
        path:"product/:cn/:ln/:productId",
        component:ProductViewComponent
    },
    { 
        path: '',
        redirectTo: 'shop/us/en/1/1',
        pathMatch: 'full'
    }
]
