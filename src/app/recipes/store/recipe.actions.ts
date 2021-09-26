import {Action} from '@ngrx/store';

import {Recipe} from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]){}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe){}
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe;
