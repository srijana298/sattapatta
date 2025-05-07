import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const AboutForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'James',
    email: 'aj4984715@gmail.com',
    country: 'Nepal',
    category: '',
    skill: '',
    subject: 'English',
    language: 'Afrikaans',
    level: 'Native'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Sample data for categories and skills
  const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Art' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'Languages' },
    { id: 5, name: 'Music' }
  ];

  const skills = {
    Technology: [
      'Web Development',
      'Mobile App Development',
      'Data Science',
      'Machine Learning',
      'Cybersecurity'
    ],
    Art: ['Drawing', 'Painting', 'Sculpture', 'Digital Art', 'Photography'],
    Science: ['Physics', 'Chemistry', 'Biology', 'Astronomy', 'Environmental Science'],
    Languages: ['English', 'Spanish', 'French', 'German', 'Mandarin'],
    Music: ['Piano', 'Guitar', 'Violin', 'Singing', 'Music Theory']
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="mb-8 text-gray-700">
        Start creating your public tutor profile. Your progress will be automatically saved as you
        complete each section. You can return at any time to finish your registration.
      </p>
      <div className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block mb-2">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-2">
            Country of birth
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
            >
              <option value="Nepal">Nepal</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Skills You Teach</h2>
          <p className="mb-6 text-gray-700">
            Let students know what specific skills or topics you can help them with. Start typing to
            search and select from the available options. You can add multiple skills.
          </p>

          {/* Category Field */}
          <div className="mb-6">
            <label htmlFor="category" className="block mb-2 font-medium">
              Category
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Choose the general domain you want to teach in (e.g., Technology, Art, Science).
            </p>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Skill Field */}
          <div className="mb-6">
            <label htmlFor="skill" className="block mb-2 font-medium">
              Skill
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Choose a specific skill or subject within your selected category (e.g., Web
              Development, Drawing, Physics).
            </p>
            <div className="relative">
              <select
                id="skill"
                name="skill"
                value={formData.skill}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
                disabled={!formData.category}
              >
                <option value="" disabled>
                  Select a skill
                </option>
                {formData.category &&
                  skills[formData.category]?.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutForm;
