import { useState } from "react";
import axiosSecure from "../../lib/axiosSecure";
import { toast } from "sonner";

const RequestDemo = () => {
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleRequestDemo = () => {
        setShowForm(true);
        setSubmitted(false);
    };

    const handleSubmitDemo = async () => {
        if (!email || !phone) {
            alert('Please fill in both email and phone number');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await axiosSecure.post('api/v1/email/send', { email, phone, requestType: "demo" });

            if (!result.data.success) {
                toast.error(result.data.message || 'Error Sending Email')
            }

            setSubmitted(true);
            setTimeout(() => {
                setEmail('');
                setPhone('');
                setShowForm(false);
                setSubmitted(false);
            }, 2000);
        } catch (error) {
            console.log('Error Sending Demo Request: ', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEmail('');
        setPhone('');
        setSubmitted(false);
    };


    return (
        < div id="contact" className="space-y-4" >

            {
                !showForm ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-5 justify-center mt-8">
                            <button
                                onClick={handleRequestDemo}
                                className="w-[200px] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-black font-medium py-3 px-6 rounded-md transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                            >
                                Request Demo
                            </button>

                             <button
                                onClick={()=> window.location = 'https://www.kutmasterz.co.uk/'}
                                className="w-[200px] bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-black font-medium py-3 px-6 rounded-md transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                            >
                                Buy tickets
                            </button>
                        </div>
                    </div>
                ) : submitted ? (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">
                                        Demo Request Submitted!
                                    </h3>
                                    <div className="mt-2 text-sm text-green-700">
                                        <p>Thank you for your interest. We'll contact you within 24 hours.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed mt-8">
                            Fill in your details and we'll get back to you soon.
                        </p>

                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />

                            <input
                                type="tel"
                                placeholder="Your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={isSubmitting}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />

                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSubmitDemo}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-black font-medium py-2 px-4 rounded-md transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded-md transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default RequestDemo