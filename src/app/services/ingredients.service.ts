import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

export class IngredientsService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.emit();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.emit();
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.emit();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emit();
  }

  private emit() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}