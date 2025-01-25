import AwesomeSlider from "react-awesome-slider";
import 'react-awesome-slider/dist/styles.css';

const Slider = () => {
    return (
        <AwesomeSlider
        play={true}
        interval={3000}
        >
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </AwesomeSlider>
    );
};

export default Slider;