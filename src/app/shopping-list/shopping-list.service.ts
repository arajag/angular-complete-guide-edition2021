import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngrediant(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngrediant(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
