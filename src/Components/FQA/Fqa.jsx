import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import RequestDemo from '../RequestDemo/RequestDemo';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "What is the ticket validation web app?",
      answer: "A ticket validation web-based application allows organizations to verify the authenticity of tickets sold for events or access control."
    },
    {
      question: "How does the ticket validation process work?",
      answer: "The web app scans ticket barcodes or QR codes and checks them against a database to confirm their validity."
    },
    {
      question: "Can the web app be used for multiple events?",
      answer: "Yes, our ticket validation app can be configured to handle multiple events simultaneously."
    },
    {
      question: "What types of tickets can be validated?",
      answer: "The app supports two ticket formats: digital e-tickets and printed tickets."
    },
    {
      question: "Is there a limit to the number of tickets I can validate?",
      answer: "No, the web app can handle large volumes of ticket validations from as few as 50 guests to 20000 attendees."
    },
    {
      question: "Can I integrate the web app with my existing ticketing system?",
      answer: "No, our app is designed to integrate only with our system to avoid collisions and ensure safer operation."
    },
    {
      question: "Can I block a ticket if a customer cancelled the booking and asked for a refund?",
      answer: "Yes, if a customer requests a refund, you can block the ticket in our validation app to prevent it from being used again. This typically involves marking the ticket as blocked in the system, ensuring it cannot be scanned for entry."
    },
    {
      question: "What happens if a ticket is invalid?",
      answer: "if the ticket is invalid , the validator will be notified. preventing entry or access associated with the ticket."
    },
    {
      question: "What support is available if I encounter issues?",
      answer: "We provide customer support from 8 am to 8 pm, including online resources, tutorials, and direct assistance."
    },
    {
      question: "Can I integrate my custom design into the ticket?",
      answer: "Yes, you can fully customize your ticket to your specifications within the given size of 190mm x 66mm. Templates are available for download."
    },
    {
      question: "Can I have a custom size or shape for my physical paper ticket?",
      answer: "No, the sizes are fixed to 66mm height; however, the width can be changed from 100mm to 190mm."
    },
    {
      question: "Is the app user-friendly?",
      answer: "Yes, the interface is designed for easy navigation, allowing staff to validate tickets quickly and efficiently."
    },
    {
      question: "Do I need an external scanner to scan my tickets?",
      answer: "No, you don't need an external scanner, but you can use your phone camera to scan the tickets."
    },
    {
      question: "What is the cancellation policy?",
      answer: "We have a free cancellation policy that allows you to cancel without any charges before your order is confirmed. Any tickets once printed won't be given a refund."
    },
    {
      question: "Can I add more tickets to the already existing batch of tickets?",
      answer: "Yes, you can add more tickets to your existing batch. We'll ensure they are added to the last batch in sequence, maintaining continuity."
    },
    {
      question: "Is there a free trial available?",
      answer: "You don't need to register for a free trial, but we can offer you a free demo to explore the features and benefits. Simply click on the get free demo link."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="FAQ" className="max-w-2xl mx-auto px-4 py-12 lg:mt-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-600">
          Everything you need to know about the ticket validation system.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
            >
              <span className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                {faq.question}
              </span>
              <div className="ml-4 flex-shrink-0">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-500" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>

            {openIndex === index && (
              <div className="pb-5 pr-12">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      {/* <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-4">
          Can't find the answer you're looking for? Please contact our support team from 8 AM to 8 PM.
        </p>
        <button className="bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] hover:from-blue-500 hover:to-cyan-500 text-black px-6 py-2 rounded-lg font-medium transition-colors">
          Get Support
        </button>
      </div> */}
      <RequestDemo />
    </div>
  );
}

export default FAQ;