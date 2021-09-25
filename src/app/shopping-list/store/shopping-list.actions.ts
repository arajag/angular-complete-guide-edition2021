import {ActionCreator} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class  AddIngredient implements ActionCreator {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}
