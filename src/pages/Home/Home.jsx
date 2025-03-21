import { Helmet } from "react-helmet";
import Categories from "../../components/Home/Categories";
import DiscountProducts from "../../components/Home/DiscountProducts";
import Slider from "../../components/Home/Slider";
import CustomerSupport from "../../components/Home/CustomerSupport";
import HealthArticles from "../../components/Home/HealthArticles";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Medivendor</title>
            </Helmet>
            <Slider></Slider>
            <Categories></Categories>
            <DiscountProducts></DiscountProducts>
            <CustomerSupport />
            <HealthArticles />
        </div>
    );
};

export default Home;