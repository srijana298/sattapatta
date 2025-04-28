import { useState } from 'react';
import { Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { useSkills } from '../hooks/useSkills';

export default function Listings() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offeringSkill: '',
    requestedSkill: '',
    location: '',
    duration: '',
    category: ''
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const { data: categories } = useCategories();

  const { data: skills } = useSkills();

  const locations = ['Online', 'San Francisco', 'Chicago', 'Boston', 'New York', 'Los Angeles'];
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = [];

    // Validation checks
    if (!formData.title.trim()) {
      newErrors.push('Title is required');
    } else if (formData.title.length > 100) {
      newErrors.push('Title must be less than 100 characters');
    }

    if (!formData.description.trim()) {
      newErrors.push('Description is required');
    }

    if (!formData.offeringSkill) {
      newErrors.push('You must specify what skill you are offering');
    }

    if (!formData.requestedSkill) {
      newErrors.push('You must specify what skill you are requesting');
    }

    if (formData.offeringSkill === formData.requestedSkill && formData.offeringSkill !== '') {
      newErrors.push('Offering and requested skills must be different');
    }

    if (!formData.location) {
      newErrors.push('Location is required');
    }

    if (!formData.duration.trim()) {
      newErrors.push('Duration is required');
    }

    if (!formData.category) {
      newErrors.push('Category is required');
    }

    // Update errors state
    setErrors(newErrors);

    // If no errors, process the form
    if (newErrors.length === 0) {
      // In a real application, you would make an API call here
      console.log('Form submitted:', formData);
      setSuccess(true);

      // Optional: Reset form after successful submission
      // setFormData({
      //   title: '',
      //   description: '',
      //   offeringSkill: '',
      //   requestedSkill: '',
      //   location: '',
      //   duration: '',
      //   category: ''
      // });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Skill Swap Request</h1>

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">Your skill swap request has been created successfully!</p>
                  <div className="mt-2">
                    <a href="/" className="text-sm font-medium text-green-700 underline">
                      Return to home page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Please fix the following errors:</h3>
                  <ul className="mt-1 text-sm list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-3">
              Tips for a great skill swap request:
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <Check className="h-4 w-4 mt-1 mr-2 text-blue-500" />
                <span>
                  Be specific about your skill level and what exactly you can teach others
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mt-1 mr-2 text-blue-500" />
                <span>Mention how much time you can commit to the exchange</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mt-1 mr-2 text-blue-500" />
                <span>Describe what you're hoping to learn and at what level</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mt-1 mr-2 text-blue-500" />
                <span>
                  Be clear about your availability and preferred meeting method (online/in-person)
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Guitar Lessons for Cooking Skills"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Be specific about what skills you're exchanging
                </p>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skill Offering */}
                <div>
                  <label
                    htmlFor="offeringSkill"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Skill You're Offering <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="offeringSkill"
                    name="offeringSkill"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                    value={formData.offeringSkill}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a skill</option>
                    {(skills || []).map((skill) => (
                      <option key={`offer-${skill}`} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="requestedSkill"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Skill You're Requesting <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="requestedSkill"
                    name="requestedSkill"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                    value={formData.requestedSkill}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a skill</option>
                    {(skills || []).map((skill) => (
                      <option key={`request-${skill}`} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe your experience with the skill you're offering and what you hope to learn..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">
                  Be detailed about your skill level and what you're looking to exchange
                </p>
              </div>

              {/* Location and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., 1 hour weekly, 3-4 sessions, etc."
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4">
                <a href="/" className="flex items-center text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Cancel
                </a>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
