
import Slider from "../Slider/slider.jsx";
import BrandList from "./BrandList.jsx";
import ImageLayout from "./ImageLayout.jsx";
import ProductList from "./ProductList.jsx";

const Home = () => {
    return (
        <>
            <Slider />
            
            <BrandList/>
            <ProductList/>
           <ImageLayout/>
        </>
    )
}
export default Home;