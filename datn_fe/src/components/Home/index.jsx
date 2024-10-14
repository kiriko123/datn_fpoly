
import Slider from "../Slider/slider.jsx";
import BrandList from "./BrandList.jsx";
import ImageLayout from "./ImageLayout.jsx";
import ProductList from "./ProductList.jsx";
import CategoryList from "./CategoryList.jsx";

const Home = () => {
    return (
        <>
            <Slider />
            
            <BrandList/>
            <CategoryList/>
            <ProductList/>
           <ImageLayout/>
        </>
    )
}
export default Home;