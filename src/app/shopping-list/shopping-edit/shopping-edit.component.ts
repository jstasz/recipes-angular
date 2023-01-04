import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as ShoppingListAction from '../store/shopping-list-action'
import { State } from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<{shoppingList: State}>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false
      }
    }
  )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.store.dispatch(new ShoppingListAction.UpdateIngredient(newIngredient))
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient))
    }
    this.onClear()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit())
  }

  onDelete() {
    this.store.dispatch(new ShoppingListAction.DeleteIngredient())
    this.onClear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(),
    this.store.dispatch(new ShoppingListAction.StopEdit())
  }

}
