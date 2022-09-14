import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule } from 'swiper/angular';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MaleComponent } from './component/male/male.component';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';
import { AdminComponent } from './component/admin/admin.component';
import { FrontBageComponent } from './component/front-bage/front-bage.component';
import { UserService } from './services/user.service';
import { FemaleComponent } from './component/female/female.component';
import { CartComponent } from './component/cart/cart.component';
import { AllproductComponent } from './component/allproduct/allproduct.component';
import { KidsComponent } from './component/kids/kids.component';
import { CartOnAllComponent } from './component/cart-on-all/cart-on-all.component';
import { ProductsService } from './services/products.service';
import { SharedService } from './services/shared.service';
import { OrdersComponent } from './component/orders/orders.component';
import { PersonalComponent } from './component/personal/personal.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { SettingsComponent } from './component/settings/settings.component';
import { UserinfoComponent } from './component/userinfo/userinfo.component';
import { FooterComponent } from './component/footer/footer.component';
import { ResNavComponent } from './component/res-nav/res-nav.component';
import { BlogComponent } from './component/blog/blog.component';
import { YourStoreComponent } from './component/your-store/your-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SroteSettingComponent } from './component/srote-setting/srote-setting.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ChatsComponent } from './component/chats/chats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    MaleComponent,
    ProductsDetailsComponent,
    AdminComponent,
    FrontBageComponent,
    FemaleComponent,
    CartComponent,
    AllproductComponent,
    KidsComponent,
    CartOnAllComponent,
    OrdersComponent,
    PersonalComponent,
    FavoritesComponent,
    SettingsComponent,
    UserinfoComponent,
    FooterComponent,
    ResNavComponent,
    BlogComponent,
    YourStoreComponent,
    SroteSettingComponent,
    AddProductComponent,
    ChatsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    Ng5SliderModule,
    SwiperModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    DragDropModule,


  ],
  providers: [UserService, ProductsService, SharedService],
  bootstrap: [AppComponent],
})
export class AppModule { }
