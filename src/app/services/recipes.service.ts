import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/Ingredient.model";

export class RecipesService {
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe', 
            'This is a test', 
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'A Test Recipe 2', 
            'This is a test 2', 
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ]

    recipesChanged = new Subject<Recipe[]>();

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    getrecipes() {
        return this.recipes.slice();
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.emit();
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.emit();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.emit();
    }
    
    private emit() {
        this.recipesChanged.next(this.recipes.slice());
    }
}