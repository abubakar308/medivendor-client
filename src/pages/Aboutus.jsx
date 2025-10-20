
import mission from "../assets/our_mission.webp";
import abubakar from "../assets/abubakar (2).jpg"
const Aboutus = () => {
    return (
        <div className="">
        {/* Hero */}
        <div className="py-16 text-center px-4">
          <h1 className="text-3xl text-secondary font-bold mb-4">About MediVendor</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            MediVendor is committed to making quality medical equipment accessible, affordable, and trustworthy for healthcare providers, clinics, and individuals across the globe.
          </p>
        </div>
  
        {/* Mission */}
        <div className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src={mission}
            alt="mission"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl text-secondary mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              At MediVendor, we aim to simplify and modernize the process of purchasing medical devices. Whether you're a hospital or a home care provider, we offer a secure, seamless, and supportive experience backed by a dedicated team of healthcare tech professionals.
            </p>
          </div>
        </div>
  
        {/* Core Values */}
        <div className="py-16 px-4">
          <h2 className="text-3xl text-secondary text-center mb-12">What We Stand For</h2>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Trust & Safety", desc: "We verify and ensure every product meets healthcare standards." },
              { title: "Customer-Centric", desc: "Fast delivery, responsive support, and easy returns." },
              { title: "Innovation", desc: "We blend technology with healthcare to improve lives." },
            ].map((val, i) => (
              <div key={i} className="p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-bold mb-2">{val.title}</h4>
                <p className="">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Optional: Team Section */}
        {/* <div className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl text-secondary text-center mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { name: "Abubakar Siddique", role: "Founder & Lead Developer", img: abubakar },
              { name: "Abubakar Siddique", role: "Product Manager", img: abubakar },
              { name: "Abubakar Siddique", role: "Operations & Support", img:abubakar },
            ].map((person, i) => (
              <div key={i} className="p-6 rounded-lg shadow text-center">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="">{person.role}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    );
};

export default Aboutus;