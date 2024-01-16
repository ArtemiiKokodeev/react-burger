import { React, forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientGroupTabsStyles from './ingredients-group-tabs.module.css';

const IngredientGroupTabs = forwardRef(({ 
  currentTab, onBunTabClick, onBunSauceClick, onBunMainClick }, ref) => {

  return (
    <div ref={ref} className={ingredientGroupTabsStyles.container}>
      <Tab value="bun" active={currentTab === 'bun'} onClick={onBunTabClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentTab === 'sauce'} onClick={onBunSauceClick}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} onClick={onBunMainClick}>
        Начинка
      </Tab>
    </div>
  );
})

export default IngredientGroupTabs;
