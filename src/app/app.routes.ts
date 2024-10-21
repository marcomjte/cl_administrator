import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsPersonComponent} from './person/details/details.component';
import {CreatePersonComponent} from './person/create/create.component';
import {EditPersonComponent} from './person/edit/edit.component';

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
    path: 'edit/:id',
    component: EditPersonComponent,
    title: 'Editar contacto',
  },
  {
    path: 'details/:id',
    component: DetailsPersonComponent,
    title: 'Detalles',
  },
];