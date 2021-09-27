import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

const firebaseApi = 'https://ng-course-recipe-book-74da8-default-rtdb.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>
  ) {
  }

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

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => this.http.put(firebaseApi, recipesState.recipes)),
  );


}
