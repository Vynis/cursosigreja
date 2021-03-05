import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CursoMenuComponent } from './pages/curso/curso-menu/curso-menu.component';
import { AuthorizedGuard } from './pages/guards/authorized.guard';
import { FramePage } from './pages/shared/frame/frame.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: FramePage,
  //   canActivate: [AuthorizedGuard],
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  //     },
  //     {
  //       path: 'inscricoes-abertas',
  //       loadChildren: () => import('./pages/inscricoes-abertas/inscricoes-abertas.module').then(m => m.InscricoesAbertasPageModule)
  //     },
  //     {
  //       path: 'meus-cursos',
  //       loadChildren: () => import('./pages/meus-cursos/meus-cursos.module').then(m => m.MeusCursosPageModule)
  //     },
  //   ]
  // },
  {
    path: 'login',
    loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'curso',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./pages/curso/curso.module').then(m => m.CursoPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
