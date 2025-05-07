import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function EducationUploadForm() {
  const [educationSections, setEducationSections] = useState([
    {
      id: 1,
      hasHigherEducation: true,
      university: '',
      degree: '',
      degreeType: '',
      specialization: '',
      startYear: '',
      endYear: ''
    }
  ]);

  const addEducationSection = () => {
    const newId = educationSections.length + 1;
    setEducationSections([
      ...educationSections,
      {
        id: newId,
        hasHigherEducation: true,
        university: '',
        degree: '',
        degreeType: '',
        specialization: '',
        startYear: '',
        endYear: ''
      }
    ]);
  };

  const handleCheckboxChange = (id) => {
    setEducationSections(
      educationSections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            hasHigherEducation: !section.hasHigherEducation
          };
        }
        return section;
      })
    );
  };

  const handleInputChange = (id, field, value) => {
    setEducationSections(
      educationSections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            [field]: value
          };
        }
        return section;
      })
    );
  };

  const yearOptions = [
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010'
  ];

  const degreeTypes = ["Bachelor's", "Master's", 'PhD', "Associate's", 'Diploma', 'Certificate'];

  return (
    <div className="max-w-3xl mx-auto p-6">
      {educationSections.map((section, index) => (
        <div key={section.id} className="mb-8 pb-8 border-b border-gray-200">
          {index > 0 && <h2 className="text-xl font-bold mb-6">Education #{index + 1}</h2>}
          {index === 0 && <h1 className="text-2xl font-bold mb-6 text-center">Education</h1>}

          <p className="mb-4 text-gray-700">
            Tell students more about the higher education that you've completed or are working on
          </p>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded"
                checked={!section.hasHigherEducation}
                onChange={() => handleCheckboxChange(section.id)}
              />
              <span className="ml-2">I don't have a higher education degree</span>
            </label>
          </div>

          {section.hasHigherEducation && (
            <>
              <div className="mb-4">
                <label className="block mb-2">University</label>
                <input
                  type="text"
                  placeholder="E.g. Mount Royal University"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={section.university}
                  onChange={(e) => handleInputChange(section.id, 'university', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Degree</label>
                <input
                  type="text"
                  placeholder="E.g. Bachelor's degree in the English Language"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={section.degree}
                  onChange={(e) => handleInputChange(section.id, 'degree', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Degree type</label>
                <div className="relative">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                    value={section.degreeType}
                    onChange={(e) => handleInputChange(section.id, 'degreeType', e.target.value)}
                  >
                    <option value="">Choose degree type...</option>
                    {degreeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Specialization</label>
                <input
                  type="text"
                  placeholder="E.g. Teaching English as a Foreign Language"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={section.specialization}
                  onChange={(e) => handleInputChange(section.id, 'specialization', e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Years of study</label>
                <div className="flex items-center">
                  <div className="relative w-1/2 mr-2">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                      value={section.startYear}
                      onChange={(e) => handleInputChange(section.id, 'startYear', e.target.value)}
                    >
                      <option value="">Select</option>
                      {yearOptions.map((year) => (
                        <option key={`start-${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  <span className="mx-2">-</span>

                  <div className="relative w-1/2 ml-2">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                      value={section.endYear}
                      onChange={(e) => handleInputChange(section.id, 'endYear', e.target.value)}
                    >
                      <option value="">Select</option>
                      {yearOptions.map((year) => (
                        <option key={`end-${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded mt-6 mb-4">
                <h3 className="font-semibold mb-2">Get a "Diploma verified" badge</h3>
                <p className="text-sm mb-4">
                  Upload your diploma to boost your credibility! Our team will review it and add the
                  badge to your profile. Once reviewed, your files will be deleted.
                </p>
                <p className="text-sm mb-4">JPG or PNG format; maximum size of 20MB.</p>
                <button className="border border-gray-300 rounded px-4 py-2 text-sm">Upload</button>
              </div>
            </>
          )}
        </div>
      ))}

      <button onClick={addEducationSection} className="text-blue-600 font-medium mb-6">
        Add another education
      </button>

      <div className="flex justify-between mt-4">
        <button className="border border-gray-300 rounded px-6 py-2">Back</button>
        <button className="bg-pink-500 text-white rounded px-6 py-2">Save and continue</button>
      </div>
    </div>
  );
}
