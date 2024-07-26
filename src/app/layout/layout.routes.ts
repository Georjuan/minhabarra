import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pub',
    pathMatch: 'full'
  },
  {
    path: 'pub',
    loadChildren: () => import('./pub/pub.module').then(m => m.PubModule)
  },
  {
    path: 'pvt',
    loadChildren: () => import('./pvt/pvt.module').then(m => m.PvtModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class LayoutRoutesModule { }
