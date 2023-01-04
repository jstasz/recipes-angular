import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients()
    // this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients })
  }

  // ngOnDestroy() {
  //   this.ingChangeSub.unsubscribe()
  // }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }
}
