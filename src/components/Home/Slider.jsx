import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <div className="relative w-full overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full relative"
      >
        {banners?.map((banner) => (
          banner.Status === 'approved' && (
            <SwiperSlide key={banner._id}>
              {/* Dynamic background image */}
              <div
  className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-top bg-cover flex items-center justify-center"
  style={{
    backgroundImage: `url(${banner.image})`,
  }}
>
                {/* Blue overlay for healthcare feel */}
                <div className="absolute inset-0 bg-blue-900/30"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-20 space-y-6 animate-fadeIn">
                  <h2 className="text-2xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-md md:text-xl text-white p-4 rounded-xl shadow-md max-w-2xl">
                    {banner.description}
                  </p>
                  <button
                    className="px-8 py-3 bg-secondary transition-all duration-300 text-white font-semibold rounded-full shadow-lg"
                    aria-label="Explore More"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          )
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
