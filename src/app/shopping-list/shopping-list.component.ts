import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientsService } from '../services/ingredients.service';
import { Ingredient } from '../shared/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private ingredientsChangedSubscription: Subscription;
  
  constructor(private ingredentsService: IngredientsService) {}

  ngOnInit(): void {
    this.ingredients = this.ingredentsService.getIngredients();
    
    this.ingredientsChangedSubscription = this.ingredentsService.ingredientsChanged.subscribe(
      (changedIngredients: Ingredient[]) => {
        this.ingredients = changedIngredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this,this.ingredentsService.startedEditing.next(index);
  }
}
