import { React, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// import ingredientGroupStyles from './ingredients-group.module.css';

function IngredientGroupTabs() {
  const [current, setCurrent] = useState('one')

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинка
      </Tab>
    </div>
  );
}

export default IngredientGroupTabs;
