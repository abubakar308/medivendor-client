
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials = () => {

    // const testimonials = [
    //     {
    //         "name": "Abubakarr",

    //     }
    // ]
    return (
        <div className="text-center p-4 container mx-auto">
            <h2 className="text-2xl text-secondary">What Our Customers Say</h2>
        <h2 className="text-2xl">Real stories from real people. Trusted by thousands across the country</h2>
        
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-gray-300 rounded-xl p-4"
      >
        <SwiperSlide>
           <div>
             <img src="" alt="" />
        <p>Md abubakar</p>
        <p>good medicine</p>
           </div>
        </SwiperSlide>
        <SwiperSlide>
             <div>
             <img src="" alt="" />
        <p>Md abubakar</p>
        <p>good medicine</p>
           </div>
        </SwiperSlide>
        <SwiperSlide>
             <div>
             <img src="" alt="" />
        <p>Md abubakar</p>
        <p>good medicine</p>
           </div>
        </SwiperSlide>
       
      </Swiper>
        </div>
    );
};

export default Testimonials;