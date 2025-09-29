import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-10">
                {/* Header */}
                <div className="border-b border-gray-200 pb-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-sm text-gray-500">kutmasterz</p>
                </div>

                {/* Intro */}
                <p className="text-gray-700 leading-relaxed mb-8">
                    At kutmasterz we are committed to protecting your privacy. This Privacy Policy outlines how we handle your information.
                </p>

                {/* Content */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                        <div className="bg-gray-50 border-l-4 border-gray-900 p-4 rounded">
                            <p className="text-gray-700 leading-relaxed">
                                We do not collect, store, or process any personal information from our users. Our Platform operates solely as a validation tool for ticketing purposes.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of Cookies</h2>
                        <p className="text-gray-700 leading-relaxed">
                            kutmasterz does not use cookies or any similar tracking technologies to access or store personal information. We do not track user behavior or collect data in any form.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Usage</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Since we do not collect any personal information or data, we do not use, sell, or share any user information with third parties.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Although we do not store personal information, we take reasonable measures to ensure the security of our Platform to prevent unauthorized access or misuse.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify this Privacy Policy at any time. Any changes will be effective immediately upon posting on the Platform.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions or concerns about this Privacy Policy, please contact us using contact form.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}