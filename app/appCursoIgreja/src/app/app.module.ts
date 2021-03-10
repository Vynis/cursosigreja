import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FramePage } from './pages/shared/frame/frame.page';
import { AuthorizedGuard } from './pages/guards/authorized.guard';
import { ComponentsModule } from './components/components.module';
import { InterceptService } from './core/utils/intercept.service';

@NgModule({
  declarations: [AppComponent,FramePage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ComponentsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthorizedGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		}],
  bootstrap: [AppComponent],
})
export class AppModule {}
