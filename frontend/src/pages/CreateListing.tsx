import { Check, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCategories } from '../hooks/useCategories';
import { useSkills } from '../hooks/useSkills';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { CreateListingInput, createListingSchema } from '../lib/listings';
import { useMutation } from 'react-query';
import { createListing } from '../services/listings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SkillSwapForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(createListingSchema)
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: CreateListingInput) => createListing(values),
    mutationKey: ['createListing'],
    onSuccess: () => {
      toast.success('Listing created successfully');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error creating listing:', error);
    }
  });
  const { data: categories } = useCategories();

  const { data: skills } = useSkills();

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Skill Swap Request</h1>

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
              <form onSubmit={handleSubmit((values) => mutateAsync(values))} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Guitar Lessons for Cooking Skills"
                    {...register('title')}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Be specific about what skills you're exchanging
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>

                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <select
                        id="category"
                        name="category"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <option value="">Select a category</option>
                        {(categories || [])?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="offeringSkill"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Skill You're Offering <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="offering_skill"
                      control={control}
                      render={({ field }) => (
                        <select
                          id="offeringSkill"
                          name="offeringSkill"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        >
                          <option value="">Select a skill</option>
                          {(skills || [])?.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                              {skill.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="requestedSkill"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Skill You're Requesting <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="requested_skill"
                      render={({ field }) => (
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white"
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        >
                          <option value="">Select a skill</option>
                          {(skills || []).map((skill) => (
                            <option key={skill.id} value={skill.id}>
                              {skill.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Describe your experience with the skill you're offering and what you hope to learn..."
                    {...register('description')}
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
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      {...register('location')}
                    />
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., 1 hour weekly, 3-4 sessions, etc."
                      {...register('duration')}
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
    </>
  );
}
