import React, { useRef, useState, useEffect } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientGroupTabs from './ingredients-group-tabs/ingredients-group-tabs';
import IngredientGroup from './ingredients-group/ingredients-group';

function BurgerIngredients(): React.JSX.Element {

  const [currentTab, setCurrentTab] = useState<string>('bun');
  const [tabsPosition, setTabPosition] = useState<DOMRect | undefined>(undefined);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const bunTabRef = useRef<HTMLDivElement | null>(null);
  const sauceTabRef = useRef<HTMLDivElement | null>(null);
  const mainTabRef = useRef<HTMLDivElement | null>(null);

  function ingredientsScroll() {
    if (tabsPosition) {
      const bunTabRect = bunTabRef.current?.getBoundingClientRect();
      if (bunTabRect && Math.abs(bunTabRect.y - tabsPosition.y) <= 100) {
        setCurrentTab('bun');
      } else if (sauceTabRef.current?.getBoundingClientRect() && Math.abs(sauceTabRef.current?.getBoundingClientRect().y - tabsPosition.y) <= 100) {
        setCurrentTab('sauce');
      } else if (mainTabRef.current?.getBoundingClientRect() && Math.abs(mainTabRef.current?.getBoundingClientRect().y - tabsPosition.y) <= 100) {
        setCurrentTab('main');
      }
    }
  }

  useEffect(() => {
    tabsRef.current && setTabPosition(tabsRef.current.getBoundingClientRect());
  }, []);

  function handleBunTabClick() {
    setCurrentTab('bun');
    bunTabRef.current && bunTabRef.current.scrollIntoView({ behavior: "smooth" })
  }

  function handleSauceTabClick() {
    setCurrentTab('sauce');
    sauceTabRef.current && sauceTabRef.current.scrollIntoView({ behavior: "smooth" })
  }

  function handleMainTabClick() {
    setCurrentTab('main');
    mainTabRef.current && mainTabRef.current.scrollIntoView({ behavior: "smooth" })
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