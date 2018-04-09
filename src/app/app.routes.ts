import {Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FilterService } from './services/filter.service';
export const Approute:Routes=[
    {
        path:"shop/:cn/:ln/:menuId",
        redirectTo:'shop/us/en/1/1',
        pathMatch:"full"
    },
    {
        path:"shop/:cn/:ln/:menuId/:categoryId",
        component:ViewComponent,
        canLoad:[FilterService]
    },
    {
        path:"shop/:cn/:ln/:menuId/:categoryId/:subCategoryId",
        component:ViewComponent
    },
    {
        path:"shop/:cn/:ln/:menuId/:categoryId/:subCategoryId/:subLevelId",
        component:ViewComponent
    },
    {
        path:"product/:cn/:ln/:menuId/:categoryId/:productId",
        component:ProductViewComponent
    },  
    { 
        path: '',
        redirectTo: 'shop/us/en/1/1',
        pathMatch: 'full'
    }
]
