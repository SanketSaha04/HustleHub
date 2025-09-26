import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions</h1>
        <div className="prose prose-indigo">
          <p>
            This is a placeholder for your Terms and Conditions agreement. This agreement sets the rules and guidelines that users must agree to in order to use your website or service.
          </p>
          <h2 className="mt-4">User Responsibilities</h2>
          <p>
            [Placeholder Content] Outline what is expected of users, such as acceptable use, account security, and prohibitions.
          </p>
          <h2 className="mt-4">Limitation of Liability</h2>
          <p>
            [Placeholder Content] Include clauses that limit your liability for damages that may arise from the use of your service.
          </p>
          <p className="mt-8 text-sm text-gray-500">
            This page is a template. Please replace this content with your official Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;