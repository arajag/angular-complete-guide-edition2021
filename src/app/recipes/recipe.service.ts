import {Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
      [
        new Ingredient('Buns', 1),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
