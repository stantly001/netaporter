import {Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ProductViewComponent} from './product-view/product-view.component';
export const Approute:Routes=[
    {
        path:"shop/:cn/:ln/:categoryId",
        component:ViewComponent
    },
    {
        path:"shop/:cn/:ln/:categoryId/:subCategoryId",
        component:ViewComponent
    },
    {
        path:"product/:cn/:ln/:productId",
        component:ProductViewComponent
    },
    { 
        path: '',
        redirectTo: 'shop/us/en/1',
        pathMatch: 'full'
    }
]
