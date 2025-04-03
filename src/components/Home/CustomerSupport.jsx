import { useState } from "react";

const CustomerSupport = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        { question: "How can I track my order?", answer: "You can track your order in the Order Tracking section." },
        { question: "What is the return policy?", answer: "We accept returns within 7 days of delivery. Please check our Return Policy page for more details." },
        { question: "How can I contact customer support?", answer: "You can contact us via live chat or email us at support@medivendor.com." },
    ];

    return (
        <div id="faq" className="p-6 max-w-3xl mx-auto bg-background rounded-xl shadow-lg mb-10">
            <h2 className="text-3xl text-center text-secondary py-3 mb-4">Customer Support</h2>

            {/* FAQ Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-secondary mb-3">Frequently Asked Questions</h3>
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-300 rounded-xl mb-2 overflow-hidden">
                        <button 
                            className="w-full text-left px-4 py-3  hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary" 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        >
                            <span className="text-lg font-medium ">{faq.question}</span>
                        </button>
                        {activeIndex === index && (
                            <div className="px-4 py-2">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Live Chat (Dummy) */}
            <div className="p-4 rounded-xl shadow border border-gray-300">
                <h3 className="text-xl font-semibold text-secondary mb-3">Live Chat</h3>
                <p>Live chat feature is coming soon! Stay tuned.</p>
            </div>
        </div>
    );
};

export default CustomerSupport;