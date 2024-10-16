
import Slider from "../Slider/slider.jsx";
import ImageLayout from "../Home/ImageLayout/ImageLayout.jsx";
import HotProducts from "../Home/HotProducts/HotProducts.jsx"
import HotCategories from "../Home/HotCategory/HotCategories.jsx"

const Home = () => {
    return (
        <>
            <Slider />
            <HotProducts />
            <ImageLayout />
            <HotCategories />
        </>
    )
}
export default Home;