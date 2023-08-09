import { NgFor } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private ingredientsService: IngredientsService) {}

  ngOnInit(): void {
    this.subscription = this.ingredientsService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.ingredientsService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAdd(form: NgForm) {
    const value = form.value;
    var ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.ingredientsService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.ingredientsService.addIngredient(ingredient);
    }

    this.onClear();
  }

  onDelete() {
    this.ingredientsService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
}
