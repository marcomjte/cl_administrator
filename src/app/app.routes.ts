import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsPersonComponent} from './person/details/details.component';
import {CreatePersonComponent} from './person/create/create.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Página de inicio',
  },
  {
    path: 'create',
    component: CreatePersonComponent,
    title: 'Crear',
  },
  {
    path: 'details/:id',
    component: DetailsPersonComponent,
    title: 'Detalles',
  },
];