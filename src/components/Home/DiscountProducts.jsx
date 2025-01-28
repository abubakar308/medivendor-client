import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';

const Discountmedicines = () => {
    const {data: medicines, isLoading } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`)
          return data
        },
      })
      if(isLoading) return <Loading />;
    return (
        <div>
            <h2 className="text-2xl text-center text-teal-700">Discount medicine</h2>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper w-11/12 mx-auto p-5 my-10"
        >
          {
  medicines?.map((medicine) => (
    medicine.discountPercent>0 && (
      <SwiperSlide key={medicine._id}>
       <div className="card border rounded-lg overflow-hidden shadow-md">
              <img
                src={medicine.image}
                alt={medicine.itemName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{medicine.itemName}</h3>
                <p className="text-gray-500 line-through">${medicine.
perUnitPrice}</p>
                <p className="text-red-500 font-bold">${medicine.
perUnitPrice - medicine.discountPercent*0.1}</p>
                <p className="text-green-500">Discount: {medicine.discountPercent}%</p>
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