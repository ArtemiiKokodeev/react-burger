import { React, useRef, useState, useEffect } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientGroupTabs from './ingredients-group-tabs/ingredients-group-tabs';
import IngredientGroup from './ingredients-group/ingredients-group';

function BurgerIngredients() {

  const [currentTab, setCurrentTab] = useState('bun');
  const [tabsPosition, setTabPosition] = useState({});

  const tabsRef = useRef();
  const bunTabRef = useRef();
  const sauceTabRef = useRef();
  const mainTabRef = useRef();

  function ingredientsScroll() {
    Math.abs(bunTabRef.current.getBoundingClientRect().y) - tabsPosition.y <= 100  && setCurrentTab('bun');
    Math.abs(sauceTabRef.current.getBoundingClientRect().y) - tabsPosition.y <= 100  && setCurrentTab('sauce');
    Math.abs(mainTabRef.current.getBoundingClientRect().y) - tabsPosition.y <= 100  && setCurrentTab('main');
  }

  useEffect(() => {
    setTabPosition(tabsRef.current.getBoundingClientRect());
  }, []);

  function handleBunTabClick(e) {
    setCurrentTab('bun');
    bunTabRef.current.scrollIntoView({ behavior: "smooth" })
  }

  function handleSauceTabClick(e) {
    setCurrentTab('sauce');
    sauceTabRef.current.scrollIntoView({ behavior: "smooth" })
  }

  function handleMainTabClick(e) {
    setCurrentTab('main');
    mainTabRef.current.scrollIntoView({ behavior: "smooth" })
  }
  
  return (
    <section className="mt-10 mr-10">
      <h2 className="text text_type_main-large mb-5">
        Соберите бургер
      </h2>
      <IngredientGroupTabs ref={tabsRef} currentTab={currentTab}
        onBunTabClick={handleBunTabClick}
        onBunSauceClick={handleSauceTabClick}
        onBunMainClick={handleMainTabClick}
      />
      <div onScroll={ingredientsScroll} className={`${burgerIngredientsStyles.box} custom-scroll`}>
        <IngredientGroup typeEn="bun" typeRu="Булки" ref={bunTabRef}/>
        <IngredientGroup typeEn="sauce" typeRu="Соусы" ref={sauceTabRef}/>
        <IngredientGroup typeEn="main" typeRu="Начинки" ref={mainTabRef}/>
      </div>
    </section>
  );
}

export default BurgerIngredients;