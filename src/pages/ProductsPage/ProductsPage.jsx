import TitlePage from '../../components/TitlePage/TitlePage'
import ProductsList from '../../components/ProductsList/ProductsList'
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter'
import ProductsBackgroundImage from '../../components/BackgroundImage/Products/ProductsBackgroundImage'
import css from './../../components/ExercisesList/ExercisesList.module.css'

const ProductsPage = () => {
  return (
    <>
      <div className={css.containerProducts}>
        <TitlePage title="Products" />
        <ProductsFilter />
      </div>
      <ProductsList />
      <ProductsBackgroundImage />
    </>
  )
}

export default ProductsPage
