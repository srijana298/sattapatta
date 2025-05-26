import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { ChevronDown } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { AboutProfile, aboutProfileSchema } from '../../lib/profile';
import { useCategories } from '../../lib/hooks';
import { useEffect, useMemo } from 'react';
import { useMentorForm } from '../../components/MentorFormContext';
import { useAuth } from '../../components/AuthContext';


const AboutForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(aboutProfileSchema)
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      reset({
        fullname: currentUser.fullname,
        email: currentUser.email
      });
    }
  }, [currentUser, reset]);

  const { currentStep, setCurrentStep, setAboutUser } = useMentorForm();

  const { data: categories } = useCategories();

  const selectedCategory = watch('category');

  const skills = useMemo(() => {
    return categories?.find((c) => c.id === Number(selectedCategory))?.skills;
  }, [selectedCategory, categories]);

  const onSubmit = async (values: AboutProfile) => {
    setAboutUser(values);
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullname" className="block mb-2">
            Full name
          </label>
          <input
            type="text"
            id="fullname"
            className="w-full p-3 border border-gray-300 rounded-lg"
            {...register('fullname')}
            disabled
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            disabled
            {...register('email')}
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-2">
            Country of birth
          </label>
          <div className="relative">
            <Controller
              control={control}
              name="countryOfBirth"
              render={({ field }) => (
                <select
                  id="country"
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option>Select Country</option>
                  {countries.map((country) => (
                    <option value={country.code} key={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          {errors.countryOfBirth && <p className="text-red-500">{errors.countryOfBirth.message}</p>}
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
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <select
                    id="category"
                    name="category"
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option>Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
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
              <Controller
                name="skill"
                control={control}
                render={({ field }) => (
                  <select
                    id="skill"
                    name="skill"
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!selectedCategory}
                  >
                    <option>Select a skill</option>
                    {skills?.map((skill, index) => (
                      <option key={index} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                )}
              />

              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
            {errors.skill && <p className="text-red-500">{errors.skill.message}</p>}
          </div>
        </div>

        <div className="pt-4">
          <button
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutForm;
