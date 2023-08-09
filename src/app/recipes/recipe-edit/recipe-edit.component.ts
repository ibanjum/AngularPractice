import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;
  @ViewChild('f') rForm: NgForm;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>  {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        if(this.editMode) {
          this.recipe = this.recipesService.getRecipe(this.id);
        }
        //this.initForm();
      }
    )
  }
}
