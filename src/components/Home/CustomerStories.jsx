import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const customerStories = [
  {
    name: "Dr. Sarah Thompson",
    role: "Cardiologist",
    story:
      "MediVendor has revolutionized the way I source medical equipment. The quality and delivery speed are unmatched!",
    image:
      "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg", // Replace with real images
  },
  {
    name: "Michael Carter",
    role: "Patient",
    story:
      "I found the best home-care medical devices on MediVendor. Their customer support is fantastic! Highly recommended.",
    image:
      "https://images.pexels.com/photos/3184613/pexels-photo-3184613.jpeg",
  },
  {
    name: "Dr. James Wilson",
    role: "Surgeon",
    story:
      "The surgical tools from MediVendor have exceeded my expectations. Premium quality at an affordable price!",
    image:
      "https://images.pexels.com/photos/5327646/pexels-photo-5327646.jpeg",
  },
];


const CustomerStories = () => {
    return (
<div className="py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl text-secondary font-bold mb-6">Customer Stories & Case Studies</h2>
        <p className="text-lg mb-10">
          See how MediVendor is transforming the healthcare industry with high-quality medical equipment.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {customerStories.map((story, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="shadow-lg rounded-xl overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <FaQuoteLeft className="text-primary text-4xl mb-3" />
                  <p className="italic mb-4">{story.story}</p>
                  <h3 className="font-semibold text-lg">{story.name}</h3>
                  <p className="text-sm">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default CustomerStories;