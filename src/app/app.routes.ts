import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsPersonComponent} from './person/details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Página de inicio',
  },
  {
    path: 'details/:id',
    component: DetailsPersonComponent,
    title: 'Detalles',
  },
];