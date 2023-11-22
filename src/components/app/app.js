import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientData } from '../../utils/data';

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={IngredientData}/>
        <BurgerConstructor ingredients={IngredientData}/>
      </main>
    </div>
  );
}

export default App;
