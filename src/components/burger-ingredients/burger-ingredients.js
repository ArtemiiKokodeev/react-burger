import { React } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientGroupTabs from './ingredients-group-tabs/ingredients-group-tabs';
import IngredientGroup from './ingredients-group/ingredients-group';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredients( { 
  ingredients, 
  selectedIngredientForOpen,
  onCloseModalWithOverlayClick,
  showModalIngredientDetails,
  onCloseAllModals,
  onIngredientClick
} ) {

  return (
    <section className="mt-10 mr-10">
      <h2 className="text text_type_main-large mb-5">
        Соберите бургер
      </h2>
      <IngredientGroupTabs />
      <div className={`${burgerIngredientsStyles.box} custom-scroll`}>
        <IngredientGroup typeEn="bun" typeRu="Булки" ingredients={ingredients} onIngredientClick={onIngredientClick}/>
        <IngredientGroup typeEn="sauce" typeRu="Соусы" ingredients={ingredients} onIngredientClick={onIngredientClick}/>
        <IngredientGroup typeEn="main" typeRu="Начинки" ingredients={ingredients} onIngredientClick={onIngredientClick}/>
      </div>

      {showModalIngredientDetails && 
        <Modal 
          title="Детали ингредиента"
          onClose={onCloseAllModals}
          onCloseModalWithOverlayClick={onCloseModalWithOverlayClick}
        >
          <IngredientDetails ingredient={selectedIngredientForOpen}/>
        </Modal>
      }

    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  selectedIngredientForOpen: PropTypes.shape(ingredientType),
  onCloseModalWithOverlayClick: PropTypes.func.isRequired,
  showModalIngredientDetails: PropTypes.bool.isRequired,
  onCloseAllModals: PropTypes.func.isRequired,
  onIngredientClick: PropTypes.func.isRequired
}; 

export default BurgerIngredients;
