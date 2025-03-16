import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';

const Discountmedicines = () => {
  const { data: medicines, isLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="py-10">
      <h2 className="text-3xl text-center text-accent dark:text-teal-400 py-5">Discount Medicines</h2>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper w-11/12 mx-auto p-5"
        breakpoints={{
          640: {
            slidesPerView: 2, // 2 items per view on small screens (tablets)
          },
          768: {
            slidesPerView: 2, // 3 items per view on medium screens (small laptops)
          },
          1024: {
            slidesPerView: 3, // 4 items per view on larger screens (desktops)
          },
        }}
      >
        {
          medicines?.map((medicine) => (
            medicine.discountPercent > 0 && (
              <SwiperSlide key={medicine._id}>
                <div className="card border-2 p-4 shadow-md rounded-lg overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="relative w-full h-48">
                    <img
                      src={medicine.image}
                      alt={medicine.itemName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{medicine.itemName}</h3>
                    <p className="text-gray-500 line-through dark:text-gray-400">
                      ${medicine.perUnitPrice.toFixed(2)}
                    </p>
                    <p className="text-red-500 font-bold">
                      $
                      {(
                        medicine.perUnitPrice -
                        (medicine.perUnitPrice * medicine.discountPercent) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="text-green-500">
                      Discount: {medicine.discountPercent}%
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            )
          ))
        }
      </Swiper>
    </div>
  );
};

export default Discountmedicines;
