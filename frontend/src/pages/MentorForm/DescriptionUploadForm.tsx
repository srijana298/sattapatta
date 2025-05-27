import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useForm } from 'react-hook-form';
import { Description, descriptionSchema } from '../../lib/profile';
import { useMutation, useQuery } from 'react-query';
import { createDescription, getDescription } from '../../services/users';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const DescriptionUploadForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(descriptionSchema)
  });

  const { data, isLoading, refetch } = useQuery({
    queryFn: getDescription
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: Partial<Description>) => createDescription(data),
    onSuccess: () => {
      refetch();
    }
  });
  const onSubmit = async (values: Description) => {
    await mutateAsync(values);
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form className="max-w-lg mx-auto px-4 py-8 font-sans" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center mb-4">Profile description</h1>

      <p className="mb-2">This info will go on your public profile.</p>

      <div className="mt-8 mb-6">
        <h2 className="text-xl font-bold mb-4">1. Introduce yourself</h2>

        <p className="mb-4">
          Show potential students who you are! Share your teaching experience and passion for
          education and briefly mention your interests and hobbies.
        </p>

        <textarea
          className="w-full border rounded p-3 min-h-[100px]"
          {...register('introduction')}
        />

        <div className="bg-blue-100 p-3 mt-3 flex items-start rounded">
          <svg
            className="w-5 h-5 text-blue-800 mt-0.5 mr-2 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-sm text-blue-800">
            Don't include your last name or present your information in a CV format
          </p>
        </div>
      </div>

      <div className="mt-8 mb-6">
        <h2 className="text-xl font-bold mb-4">2. Teaching experience</h2>

        <p className="mb-4">
          Provide a detailed description of your relevant teaching experience. Include
          certifications, teaching methodology, education, and subject expertise.
        </p>

        <textarea className="w-full border rounded p-3 min-h-[100px]" {...register('experience')} />
      </div>

      <div className="mt-8 mb-6">
        <h2 className="text-xl font-bold mb-4">3. Motivate potential students</h2>

        <p className="mb-4">
          Encourage students to book their first lesson. Highlight the benefits of learning with
          you!
        </p>

        <textarea className="w-full border rounded p-3 min-h-[100px]" {...register('motivation')} />

        <div className="bg-blue-100 p-3 mt-3 flex items-start rounded">
          <svg
            className="w-5 h-5 text-blue-800 mt-0.5 mr-2 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-sm text-blue-800">
            Do not include any information regarding free trial lessons or discounts, or any of your
            personal contact details
          </p>
        </div>
      </div>

      <div className="mt-8 mb-6">
        <h2 className="text-xl font-bold mb-4">4. Write a catchy headline</h2>

        <p className="mb-4">
          Your headline is the first thing students see about you. Make it attention-grabbing,
          mention your specific teaching language and encourage students to read your full
          description.
        </p>

        <textarea className="w-full border rounded p-3 min-h-[100px]" {...register('headline')} />
      </div>

      {/* Character count warning */}
      <div className="bg-red-100 p-4 my-6 rounded">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-red-800 mt-0.5 mr-2 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <p className="text-sm text-red-800">
            Make your combined description from steps 1, 2 and 3 at least 400 characters long in
            total to submit successfully
          </p>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="flex gap-3">
          <button className="bg-orange-500 text-white font-medium py-2 px-5 rounded" type="submit">
            Save and continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default DescriptionUploadForm;
