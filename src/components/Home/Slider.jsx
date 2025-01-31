import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'react-awesome-slider/dist/styles.css';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';

const Slider = () => {
  const { data: banners = [] } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/banners`);
      return data;
    },
   
  });
  
    return (
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-11/12 mx-auto p-5 my-10"
        >
          {
  banners?.map((banner) => (
    banner.Status === 'approved' && (
      <SwiperSlide key={banner._id}>
       <div className="relative">
       <img className="w-full h-[100vh] rounded-xl filter" src={banner.image} alt="" />
       <p className="text-gray-100 absolute -mt-[20%] ml-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 p-4 rounded-lg">{banner.description}</p>
       </div>
      </SwiperSlide>
    )
  ))
}
  </Swiper>
    );
};

export default Slider;