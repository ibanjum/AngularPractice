import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  index: number;
  recipeDetail: Recipe;

  constructor(private ingredientsService: IngredientsService,
              private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) {} 

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.recipeDetail = this.recipesService.getRecipe(this.index);
      }
    )
  }

  onShoppingList() {
    this.ingredientsService.addIngredients(this.recipeDetail.ingredients);
  }

  onDelete() {
    if(confirm('Delete Recipe?')) {
      this.recipesService.deleteRecipe(this.index);
      this.router.navigate(['../']);
    }
  }
}
