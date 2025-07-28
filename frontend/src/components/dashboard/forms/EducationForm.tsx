import React, { useState, useEffect } from 'react';
import { useUpdateEducations } from '../../../lib/hooks';
import { Trash2, PlusCircle } from 'lucide-react';
import { MentorProfile } from '../../../services/users';

interface EducationFormProps {
  mentor: MentorProfile | undefined;
  onClose: () => void;
}

interface Education {
  university: string;
  degree: string;
  degree_type: string;
  start_year: string;
  end_year: string;
  id?: number;
}

const emptyEducation: Education = {
  university: '',
  degree: '',
  degree_type: '',
  start_year: '',
  end_year: ''
};

const EducationForm: React.FC<EducationFormProps> = ({ mentor, onClose }) => {
  const [has_education, setHasEducation] = useState<boolean>(mentor?.has_education || false);
  const [educations, setEducations] = useState<Education[]>([]);
  const updateEducationMutation = useUpdateEducations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with existing data
  useEffect(() => {
    if (mentor?.educations && mentor.educations.length > 0) {
      setEducations(mentor.educations);
    } else {
      setEducations([{ ...emptyEducation }]);
    }
    setHasEducation(mentor?.has_education || false);
  }, [mentor]);

  const handleAddEducation = () => {
    setEducations([...educations, { ...emptyEducation }]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducations = [...educations];
    newEducations.splice(index, 1);
    setEducations(newEducations.length ? newEducations : [{ ...emptyEducation }]);
  };

  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      const isValid = educations.every(
        ed =>
          ed.university.trim() !== '' &&
          ed.degree.trim() !== '' &&
          ed.degree_type.trim() !== '' &&
          ed.start_year.trim() !== '' &&
          ed.end_year.trim() !== ''
      );

      if (!isValid) {
        throw new Error("Please fill in all education fields");
      }

      await updateEducationMutation.mutateAsync({
        has_education,
        educations
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update education");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="has_education"
            checked={has_education}
            onChange={(e) => setHasEducation(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="has_education" className="ml-2 text-sm text-gray-700">
            I have formal education I want to showcase
          </label>
        </div>

        {has_education && (
          <div className="space-y-6">
            {educations.map((education, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium text-gray-700">Education #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={educations.length === 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`university-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      University/Institution
                    </label>
                    <input
                      type="text"
                      id={`university-${index}`}
                      value={education.university}
                      onChange={(e) => handleChange(index, 'university', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      id={`degree-${index}`}
                      value={education.degree}
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor={`degree_type-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Degree Type
                    </label>
                    <select
                      id={`degree_type-${index}`}
                      value={education.degree_type}
                      onChange={(e) => handleChange(index, 'degree_type', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select a degree type</option>
                      <option value="Bachelors">Bachelors</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`start_year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Start Year
                      </label>
                      <input
                        type="text"
                        id={`start_year-${index}`}
                        value={education.start_year}
                        onChange={(e) => handleChange(index, 'start_year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                        placeholder="YYYY"
                        maxLength={4}
                      />
                    </div>

                    <div>
                      <label htmlFor={`end_year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        End Year
                      </label>
                      <input
                        type="text"
                        id={`end_year-${index}`}
                        value={education.end_year}
                        onChange={(e) => handleChange(index, 'end_year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                        placeholder="YYYY"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleAddEducation}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Another Education
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
