import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as RecipesActions from './recipe.actions';
import {map, switchMap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';

const firebaseApi = 'https://ng-course-recipe-book-74da8-default-rtdb.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(firebaseApi);
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient
  ) {}
}
