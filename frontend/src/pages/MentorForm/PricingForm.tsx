import { useState } from 'react';
import { CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function PreplyPricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('recommended');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for new tutors getting started',
      price: 15,
      commission: '25%',
      features: [
        'Up to 5 new students per month',
        'Basic profile visibility',
        'Standard support',
        'Basic analytics'
      ]
    },
    {
      id: 'recommended',
      name: 'Professional',
      description: 'Our most popular plan for active tutors',
      price: 25,
      commission: '18%',
      features: [
        'Up to 15 new students per month',
        'Enhanced profile visibility',
        'Priority support',
        'Detailed analytics',
        'Priority in search results',
        'Custom lesson materials'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For established tutors with growing practices',
      price: 40,
      commission: '15%',
      features: [
        'Unlimited new students',
        'Maximum profile visibility',
        'Premium support with dedicated manager',
        'Advanced analytics and insights',
        'Featured placement in search results',
        'Custom branding options',
        'Exclusive marketing opportunities'
      ]
    }
  ];

  const FAQ = [
    {
      question: 'How is the commission calculated?',
      answer:
        'The commission is calculated as a percentage of your hourly rate. For example, if you set your hourly rate at $20 and your plan has an 18% commission, Preply will retain $3.60 from each hour taught.'
    },
    {
      question: 'Can I change my plan later?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the beginning of your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, all new tutors get a 30-day free trial on the Professional plan to help them get started.'
    },
    {
      question: 'What happens after I select a plan?',
      answer:
        "After selecting a plan, you'll complete your profile setup and be ready to start accepting students on the Preply platform."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Tutor Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that works best for your teaching style and goals. You can change your
            plan at any time.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
          {['Profile', 'Availability', 'Photo', 'Video', 'Pricing'].map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  index < 4 ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                }`}
              >
                {index < 4 ? '✓' : '5'}
              </div>
              <div className="text-sm mt-2 font-medium">{step}</div>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'border-2 border-orange-500 transform scale-105'
                  : 'border border-gray-200'
              }`}
            >
              <div className="bg-white p-6">
                {selectedPlan === plan.id && (
                  <div className="bg-orange-500 text-white text-xs font-bold uppercase py-1 px-2 rounded mb-4 inline-block">
                    Selected
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 h-12">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="mb-6 p-3 bg-gray-50 rounded">
                  <p className="text-gray-700 font-medium">Commission: {plan.commission}</p>
                </div>
                <ul className="mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-white text-orange-500 border border-orange-500 hover:bg-orange-50'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 bg-white">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center">
            Continue to Final Step
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            By continuing, you agree to Preply's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
