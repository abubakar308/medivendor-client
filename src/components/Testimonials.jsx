import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Md Abu Bakar",
      feedback: "The medicine quality is excellent and delivery was fast. Highly recommend MediVendor!",
      image: "https://i.ibb.co/Xk3TC456/IMG-20220318-181819.jpg",
    },
    {
      name: "Nusrat Jahan",
      feedback: "Very useful platform for healthcare professionals. Clean UI and reliable service.",
      image: "https://i.ibb.co/VWWy4Nb1/images-q-tbn-ANd9-Gc-SXLAaw-Nfs-Rm17-NQf-O8f-Cah-Y2y-R36w-Jfs8acg-s.jpg",
    },
    {
      name: "Samiul Hasan",
      feedback: "Affordable pricing and verified medicines. I’ve been a regular buyer.",
      image: "https://i.ibb.co/W47QDr2v/preview16.jpg",
    },
  ];

  return (
    <div className="text-center p-6 container mx-auto">
      <h2 className="text-3xl font-bold text-secondary mb-2">What Our Customers Say</h2>
      <p className="text-lg mb-6">Real stories from real people. Trusted by thousands across the country.</p>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-base-100 rounded-xl p-6 shadow-lg"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />
              <p className="text-xl font-semibold">{testimonial.name}</p>
              <p className="max-w-xl  italic">{testimonial.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
