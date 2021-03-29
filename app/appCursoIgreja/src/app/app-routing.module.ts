import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CursoMenuComponent } from './pages/curso/curso-menu/curso-menu.component';
import { AuthorizedGuard } from './pages/guards/authorized.guard';
import { FramePage } from './pages/shared/frame/frame.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/account/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/account/reset/reset.module').then(m => m.ResetPageModule)
  },
  {
    path: 'curso',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./pages/curso/curso.module').then(m => m.CursoPageModule)
  },
  {
    path: '',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./pages/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/account/reset/reset.module').then( m => m.ResetPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
