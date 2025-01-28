import Categories from "../../components/Home/Categories";
import DiscountProducts from "../../components/Home/DiscountProducts";
import Slider from "../../components/Home/Slider";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <DiscountProducts></DiscountProducts>
        </div>
    );
};

export default Home;