import { ChevronDown, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { Certificate, certificateSchema } from '../../lib/profile';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useEffect } from 'react';
import { useMentorForm } from '../../components/MentorFormContext';

export default function TeachingCertification() {
  const { register, handleSubmit, control, watch, reset } = useForm({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      has_certificate: false,
      certificates: []
    }
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'certificates'
  });

  const hasTeachingCertificate = watch('has_certificate');

  const addCertificationSection = () => {
    append({
      subject: '',
      name: '',
      issuedBy: '',
      description: '',
      start_year: '',
      end_year: ''
    });
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

  const subjectOptions = [
    'English',
    'Mathematics',
    'Science',
    'History',
    'Geography',
    'Art',
    'Music',
    'Physical Education',
    'Computer Science',
    'Foreign Languages'
  ];

  const { setCurrentStep, currentStep } = useMentorForm();

  const onSubmit = async (values: Certificate) => {
    console.log({ values });
    setCurrentStep(currentStep + 1);
  };
  return (
    <form className="max-w-3xl mx-auto p-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold mb-6 text-center">Teaching certification</h1>

      <p className="mb-4 text-gray-700">
        Do you have teaching certificates? If so, describe them to enhance your profile credibility
        and get more students.
      </p>

      <div className="mb-6">
        <label className="flex items-center">
          <Controller
            control={control}
            name="has_certificate"
            render={({ field }) => (
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <span className="ml-2">I don't have a teaching certificate</span>
        </label>
      </div>

      {!hasTeachingCertificate &&
        fields.map((section, index) => (
          <div key={index} className="mb-8 pb-8 border-b border-b-gray-200">
            <div className="bg-gray-50 py-2 mb-4 rounded flex items-center justify-between">
              <h3 className="font-medium">Certificate #{index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete certificate"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Subject</label>
              <div className="relative">
                <Controller
                  control={control}
                  name={`certificates.${index}.subject`}
                  render={({ field }) => (
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="">Choose subject...</option>
                      {subjectOptions.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Certificate</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register(`certificates.${index}.name`)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded h-24"
                {...register(`certificates.${index}.description`)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Issued by</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register(`certificates.${index}.issuedBy`)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Years of study</label>
              <div className="flex items-center">
                <div className="relative w-1/2 mr-2">
                  <Controller
                    control={control}
                    name={`certificates.${index}.start_year`}
                    render={({ field }) => (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Select</option>
                        {yearOptions.map((year) => (
                          <option key={`start-${year}`} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={20} />
                  </div>
                </div>

                <span className="mx-2">-</span>

                <div className="relative w-1/2 ml-2">
                  <Controller
                    control={control}
                    name={`certificates.${index}.end_year`}
                    render={({ field }) => (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">Select</option>
                        {yearOptions.map((year) => (
                          <option key={`end-${year}`} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <button onClick={addCertificationSection} className="text-blue-600 font-medium mb-6">
        Add another certificate
      </button>

      <div className="flex justify-between mt-4">
        <button className="border border-gray-300 rounded px-6 py-2" type="button">
          Back
        </button>
        <button className="bg-orange-500 text-white rounded px-6 py-2">Save and continue</button>
      </div>
    </form>
  );
}
