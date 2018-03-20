import {Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
export const Approute:Routes=[
    {
        path:"home",
        component:ViewComponent
    },
    {
        path:"home/:categoryId",
        component:ViewComponent
    },
    {
        path:"home/:categoryId/:subCategoryId?",
        component:ViewComponent
    },
    { 
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
]
