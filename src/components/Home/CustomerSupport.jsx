import { useState } from "react";


const CustomerSupport = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        { question: "How can I track my order?", answer: "You can track your order in the Order Tracking section." },
        { question: "What is the return policy?", answer: "We accept returns within 7 days of delivery. Please check our Return Policy page for more details." },
        { question: "How can I contact customer support?", answer: "You can contact us via live chat or email us at support@medivendor.com." },
      ];
    
    return (
        <div className="p-6 max-w-3xl mx-auto border rounded-xl mb-10">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Customer Support</h2>
      
      {/* FAQ Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-white p-4 rounded-xl shadow mb-2">
            <input type="checkbox" checked={activeIndex === index} onChange={() => setActiveIndex(activeIndex === index ? null : index)} />
            <div className="collapse-title text-lg font-medium">{faq.question}</div>
            <div className="collapse-content text-gray-600">{faq.answer}</div>
          </div>
        ))}
      </div>

      {/* Live Chat (Dummy) */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
        <p className="text-gray-600">Live chat feature is coming soon! Stay tuned.</p>
      </div>
    </div>
    );
};

export default CustomerSupport;