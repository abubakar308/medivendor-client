import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'react-awesome-slider/dist/styles.css';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const Slider = () => {
  const { data: banners = [], isLoading, error } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/banners`);
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-lg text-indigo-600">Loading banners...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error loading banners</div>;
  }

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {
        banners?.map((banner) => (
          banner.Status === 'approved' && (
            <SwiperSlide key={banner._id}>
             
                <img className="w-full md:h-[100vh] filter" src={banner.image} alt="Banner" />
                <p className="text-white absolute -mt-[20%] ml-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 bg-opacity-50 p-4 rounded-lg">
                  {banner.description}
                </p>
            </SwiperSlide>
          )
        ))
      }
    </Swiper>
  );
};

export default Slider;
