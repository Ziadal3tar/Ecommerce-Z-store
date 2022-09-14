import { SharedService } from 'src/app/services/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteProducts: any = [];

  allIds: any = [];

  index: any;

  sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

  cc = 'text-danger';

  constructor(
    private UserService: UserService,
    private ProductsService: ProductsService,
    private SharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.getFavoriteProduct();
  }

  getFavoriteProduct() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.allIds = data.userData.favoriteProducts;
      for (let i = 0; i < this.allIds.length; i++) {
        const element = this.allIds[i];
        this.ProductsService.getProductById(element.productId).subscribe(
          (data: any) => {
            this.favoriteProducts.push(data.product);
          },
        );
      }
    });
  }

  addToCart(id: any) {
    this.SharedService.addToCart(id);
  }

  AddToFavorites(id: any, i: any) {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.allIds = data.userData.favoriteProducts;

      const num1 = this.allIds.length;
      const num2 = this.allIds.filter(
        (item: any) => item.productId != id,
      ).length;
      if (num1 == num2) {
        this.SharedService.addFavorites(id);
        this.index = '0.1';
      } else {
        this.SharedService.deleteFromFavorites(id);
        this.index = i;
      }
    });
  }

  ondrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
