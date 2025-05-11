import { ChevronDown, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { Education, educationSchema } from '../../lib/profile';
import { useMutation, useQuery } from 'react-query';
import { createEducation, getEducations } from '../../services/users';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function EducationUploadForm() {
  const { data, isLoading } = useQuery({
    queryFn: getEducations,
    queryKey: 'get_educations'
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      has_education: false,
      educations: [
        {
          university: '',
          degree: '',
          degree_type: '',
          start_year: '',
          end_year: ''
        }
      ]
    }
  });
  useEffect(() => {
    if (data) {
      const { has_education, educations } = data;
      reset({
        has_education,
        educations
      });
    }
  }, [data, reset]);

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'educations'
  });

  const addEducationSection = () => {
    append({
      university: '',
      degree: '',
      degree_type: '',
      start_year: '',
      end_year: ''
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: Partial<Education>) => createEducation(data)
  });

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

  const hasEducation = watch('has_education');

  const degreeTypes = ["Bachelor's", "Master's", 'PhD', "Associate's", 'Diploma', 'Certificate'];

  const onSubmit = async (values: Education) => {
    await mutateAsync(values);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form className="max-w-3xl mx-auto p-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold mb-6 text-center">Education Qualifications</h1>

      <p className="mb-4 text-gray-700">
        Do you have education qualifications ? If so, describe them to enhance your profile
        credibility and get more students.
      </p>

      <div className="mb-6">
        <label className="flex items-center">
          <Controller
            control={control}
            name="has_education"
            render={({ field }) => (
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <span className="ml-2">I don't have education qualifications</span>
        </label>
      </div>

      {!hasEducation &&
        fields.map((section, index) => (
          <div key={index} className="mb-8 pb-8 border-b border-b-gray-200">
            <div className="bg-gray-50 py-2 mb-4 rounded flex items-center justify-between">
              <h3 className="font-medium">Education #{index + 1}</h3>
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
              <label className="block mb-2">University</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register(`educations.${index}.university`)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Degree</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register(`educations.${index}.degree`)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Degree Type</label>
              <div className="relative w-1/2 mr-2">
                <Controller
                  control={control}
                  name={`educations.${index}.degree_type`}
                  render={({ field }) => (
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded appearance-none pr-10"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="">Select</option>
                      {degreeTypes.map((degree) => (
                        <option key={degree} value={degree}>
                          {degree}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={20} />
                </div>
              </div>{' '}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Years of study</label>
              <div className="flex items-center">
                <div className="relative w-1/2 mr-2">
                  <Controller
                    control={control}
                    name={`educations.${index}.start_year`}
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
                    name={`educations.${index}.end_year`}
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

      <button onClick={addEducationSection} className="text-blue-600 font-medium mb-6">
        Add another Education
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
