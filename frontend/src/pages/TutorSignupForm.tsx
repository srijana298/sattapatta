import { useState, useMemo, useEffect } from 'react';
import { useForm, FormProvider, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronDown,
  Trash2,
  Clock,
  Check,
  Upload,
  User,
  Award,
  GraduationCap,
  FileText,
  Camera,
  Calendar,
  Plus
} from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { countries } from '../data/countries';
import { useCategories } from '../lib/hooks';
import { Profile, profileSchema } from '../lib/profile';
import { useMutation } from 'react-query';
import { uploadPicture } from '../services/users';
import toast from 'react-hot-toast';
import { createMentor } from '../services/mentor';
import { useNavigate } from 'react-router-dom';

const yearOptions = Array.from({ length: 16 }, (_, i) => (2025 - i).toString());
const degreeTypes = ["Bachelor's", "Master's", 'PhD', "Associate's", 'Diploma', 'Certificate'];
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
const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM'
];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Rupees = ({ className }: { className?: string }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text x="10" y="70" fontSize="60" fontFamily="Arial, sans-serif">
        रु
      </text>
    </svg>
  );
};

export default function TutorSignupForm() {
  const [isSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: _upload_picture } = useMutation({
    mutationFn: (formData: FormData) => {
      return uploadPicture(formData);
    },
    onError: (error) => {
      toast.error('Error uploading picture');
    }
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: Profile) => {
      const formData = new FormData();
      formData.append('file', values.profile_picture);
      const filePath = await _upload_picture(formData);
      const profileData = {
        ...values,
        profile_picture: filePath
      };
      return createMentor(profileData);
    },
    onSuccess: () => {
      toast.success('Mentor Profile created successfully');
      navigate('/');
    },
    onError: () => {
      toast.error('Error creating mentor profile');
    }
  });
  const { data: categories, isLoading } = useCategories();
  const methods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: '',
      email: '',
      has_certificate: false,
      certificates: [],
      has_education: false,
      educations: [],
      hourly_rate: 250,
      trial_rate: 150,
      availability: []
    }
  });

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors }
  } = methods;

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role !== 'mentor') {
        toast.error('You must be a mentor to access this form');
        navigate('/');
      } else if (currentUser.mentor_profile?.status === 'pending') {
        navigate('/');
      } else {
        setValue('fullname', currentUser.fullname || '');
        setValue('email', currentUser.email || '');
      }
    }
  }, [currentUser, setValue , navigate]);
  const certificatesArray = useFieldArray({ control, name: 'certificates' });
  const educationsArray = useFieldArray({ control, name: 'educations' });

  const has_certificate = watch('has_certificate');
  const has_education = watch('has_education');
  const selectedCategory = watch('category');
  const profilePhoto = watch('profile_picture');

  const skills = useMemo(() => {
    return categories?.find((c) => c.id === Number(selectedCategory))?.skills;
  }, [selectedCategory, categories]);

  const addCertificationSection = () => {
    certificatesArray.append({
      subject: '',
      name: '',
      issuedBy: '',
      description: '',
      start_year: '',
      end_year: ''
    });
  };

  const addEducationSection = () => {
    educationsArray.append({
      university: '',
      degree: '',
      degree_type: '',
      start_year: '',
      end_year: ''
    });
  };
  const availabilityArray = useFieldArray({
    control,
    name: 'availability'
  });

  const isTimeSlotSelected = (day: string, time: string) => {
    return availabilityArray.fields.some(
      (field) => field.day_of_week === day && field.start_time === time
    );
  };

  const toggleAvailability = (day: string, time: string) => {
    const existingIndex = availabilityArray.fields.findIndex(
      (field) => field.day_of_week === day && field.start_time === time
    );

    if (existingIndex >= 0) {
      availabilityArray.remove(existingIndex);
    } else {
      const timeComponents = time.split(':');
      const hour = parseInt(timeComponents[0], 10);
      const ampm = time.includes('AM') ? 'AM' : 'PM';
      const nextHour = hour + 1;
      const endTime = `${nextHour}:00 ${ampm}`;

      availabilityArray.append({
        day_of_week: day,
        start_time: time,
        end_time: endTime,
        is_available: true
      });
    }
  };

  const onSubmit = async (formData: Profile) => {
    console.log('Form Data:', formData);
    await mutateAsync(formData);
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'photo', label: 'Photo', icon: Camera },
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'pricing', label: 'Pricing', icon: Rupees },
    { id: 'availability', label: 'Availability', icon: Calendar }
  ];

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading categories...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Progress</h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all ${
                          activeSection === section.id
                            ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div
                  id="personal"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                      <p className="text-gray-600">Tell us about yourself</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                      <input
                        {...register('fullname')}
                        disabled
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none"
                      />
                      {errors.fullname && (
                        <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Email</label>
                      <input
                        {...register('email')}
                        disabled
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Country of Birth
                      </label>
                      <div className="relative">
                        <Controller
                          control={control}
                          name="countryOfBirth"
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.countryOfBirth && (
                        <p className="text-red-500 text-sm">{errors.countryOfBirth.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Category</label>
                      <div className="relative">
                        <select
                          {...register('category', { valueAsNumber: true })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                        >
                          <option value="">Select Category</option>
                          {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Skill</label>
                      <div className="relative">
                        <select
                          {...register('skill', { valueAsNumber: true })}
                          disabled={!selectedCategory}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white disabled:bg-gray-50"
                        >
                          <option value="">Select Skill</option>
                          {skills?.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                              {skill.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.skill && (
                        <p className="text-red-500 text-sm">{errors.skill.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Photo */}
                <div
                  id="photo"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <Camera className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Profile Photo</h2>
                      <p className="text-gray-600">Help students get to know you</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0">
                      {profilePhoto ? (
                        <img
                          src={URL.createObjectURL(profilePhoto)}
                          alt="Preview"
                          className="w-32 h-32 rounded-2xl object-cover border-4 border-orange-200"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-2xl bg-linear-to-br from-orange-100 to-orange-200 flex items-center justify-center border-4 border-orange-200">
                          <User className="w-12 h-12 text-orange-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            setValue('profile_picture', e.target.files[0]);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('photoUpload')?.click()}
                        className="flex items-center justify-center px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Photo
                      </button>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          Face forward and look at the camera
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          Frame your head and shoulders
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          Use good lighting and clear image
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div
                  id="description"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Profile Description</h2>
                      <p className="text-gray-600">Tell students about your teaching style</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        1. Introduce Yourself
                      </label>
                      <p className="text-gray-600 text-sm">
                        Share your teaching experience and passion for education
                      </p>
                      <textarea
                        {...register('introduction')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
                        placeholder="Tell students about yourself..."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        2. Teaching Experience
                      </label>
                      <p className="text-gray-600 text-sm">
                        Describe your teaching methodology and expertise
                      </p>
                      <textarea
                        {...register('experience')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
                        placeholder="Describe your teaching experience..."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        3. Motivate Students
                      </label>
                      <p className="text-gray-600 text-sm">
                        Encourage students to book their first lesson
                      </p>
                      <textarea
                        {...register('motivation')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
                        placeholder="What makes learning with you special?"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        4. Profile Headline
                      </label>
                      <p className="text-gray-600 text-sm">
                        Write a catchy headline for your profile
                      </p>
                      <input
                        {...register('headline')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        placeholder="Your teaching motto..."
                      />
                    </div>
                  </div>
                </div>

                {/* Certificates */}
                <div
                  id="certificates"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <Award className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Teaching Certificates</h2>
                      <p className="text-gray-600">Showcase your qualifications</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <Controller
                        control={control}
                        name="has_certificate"
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <span className="ml-3 text-gray-700">I don't have teaching certificates</span>
                    </label>
                  </div>

                  {!has_certificate && (
                    <div className="space-y-6">
                      {certificatesArray.fields.map((section, index) => (
                        <div
                          key={section.id}
                          className="p-6 bg-linear-to-r from-orange-50 to-orange-25 rounded-xl border border-orange-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-orange-800">
                              Certificate #{index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => certificatesArray.remove(index)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Subject
                              </label>
                              <Controller
                                control={control}
                                name={`certificates.${index}.subject`}
                                render={({ field }) => (
                                  <select
                                    {...field}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
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
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Certificate Name
                              </label>
                              <input
                                {...register(`certificates.${index}.name`)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                              />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Description
                              </label>
                              <textarea
                                {...register(`certificates.${index}.description`)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Issued By
                              </label>
                              <input
                                {...register(`certificates.${index}.issuedBy`)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Year Range
                              </label>
                              <div className="flex items-center space-x-2">
                                <Controller
                                  control={control}
                                  name={`certificates.${index}.start_year`}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                                    >
                                      <option value="">Start Year</option>
                                      {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                                <span className="text-gray-400">to</span>
                                <Controller
                                  control={control}
                                  name={`certificates.${index}.end_year`}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                                    >
                                      <option value="">End Year</option>
                                      {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addCertificationSection}
                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certificate
                      </button>
                    </div>
                  )}
                </div>
                <div
                  id="education"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <GraduationCap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                      <p className="text-gray-600">Your academic background</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <Controller
                        control={control}
                        name="has_education"
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <span className="ml-3 text-gray-700">
                        I don't have higher education qualifications
                      </span>
                    </label>
                  </div>

                  {!has_education && (
                    <div className="space-y-6">
                      {educationsArray.fields.map((section, index) => (
                        <div
                          key={section.id}
                          className="p-6 bg-linear-to-r from-orange-50 to-orange-25 rounded-xl border border-orange-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-orange-800">
                              Education #{index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => educationsArray.remove(index)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              disabled={educationsArray.fields.length <= 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                University/Institution
                              </label>
                              <input
                                {...register(`educations.${index}.university`)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                placeholder="e.g., Harvard University"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Degree
                              </label>
                              <input
                                {...register(`educations.${index}.degree`)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                placeholder="e.g., Computer Science"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Degree Type
                              </label>
                              <div className="relative">
                                <Controller
                                  control={control}
                                  name={`educations.${index}.degree_type`}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                                    >
                                      <option value="">Select type</option>
                                      {degreeTypes.map((degree) => (
                                        <option key={degree} value={degree}>
                                          {degree}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Year Range
                              </label>
                              <div className="flex items-center space-x-2">
                                <Controller
                                  control={control}
                                  name={`educations.${index}.start_year`}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                                    >
                                      <option value="">Start Year</option>
                                      {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                                <span className="text-gray-400">to</span>
                                <Controller
                                  control={control}
                                  name={`educations.${index}.end_year`}
                                  render={({ field }) => (
                                    <select
                                      {...field}
                                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                                    >
                                      <option value="">End Year</option>
                                      {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addEducationSection}
                        className="flex items-center justify-center px-5 py-3 w-full border-2 border-dashed border-orange-300 text-orange-600 font-medium rounded-xl hover:bg-orange-50 transition-colors"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Another Education
                      </button>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div
                  id="pricing"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <Rupees className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
                      <p className="text-gray-600">Set your lesson rates</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Rate Setting */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Hourly rate for 1-on-1 lessons
                        </label>
                        <div className="relative">
                          <Rupees className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            {...register('hourly_rate', { valueAsNumber: true })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-lg font-semibold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Trial lesson (30 min)
                        </label>
                        <div className="relative">
                          <Rupees className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            {...register('trial_rate', { valueAsNumber: true })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-orange-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">
                        How students will see your rates
                      </h3>
                      <div className="bg-white rounded-lg p-5 shadow-sm">
                        <div className="flex items-center space-x-3 mb-5 pb-4 border-b">
                          <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {currentUser?.fullname?.[0] || 'T'}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Your Profile</h4>
                            <p className="text-sm text-gray-500">Tutor since May 2025</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Trial lesson (30 min)</span>
                            <span className="font-semibold text-orange-600">
                              NRS.{watch('trial_rate')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">1-on-1 lesson</span>
                            <span className="font-semibold text-gray-800">
                              NRS.{watch('hourly_rate')}/hour
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="availability"
                  className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Availability</h2>
                      <p className="text-gray-600">Set when you're available to teach</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-8 gap-2 mb-4">
                        <div className="p-2 text-center bg-orange-50 rounded-lg"></div>
                        {weekDays.map((day) => (
                          <div key={day} className="p-2 text-center bg-orange-50 rounded-lg">
                            <div className="font-semibold text-gray-700">{day.slice(0, 3)}</div>
                          </div>
                        ))}
                      </div>

                      {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                          <div className="p-2 text-sm text-gray-600 font-medium flex items-center justify-center bg-orange-50 rounded-lg">
                            {time}
                          </div>
                          {weekDays.map((day) => {
                            const isSelected = isTimeSlotSelected(day, time);
                            return (
                              <button
                                key={`${day}-${time}`}
                                type="button"
                                onClick={() => toggleAvailability(day, time)}
                                className={`p-2 rounded-lg border transition-all ${
                                  isSelected
                                    ? 'bg-orange-500 border-orange-500 text-white'
                                    : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                                }`}
                              >
                                <Clock className="w-5 h-5 mx-auto" />
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Show selected availability slots in a list for validation */}
                  {availabilityArray.fields.length > 0 && (
                    <div className="mt-6 border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Selected Time Slots</h3>
                      <div className="max-h-40 overflow-y-auto">
                        {availabilityArray.fields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center justify-between py-1 border-b last:border-0"
                          >
                            <span className="text-sm text-gray-700">
                              {field.day_of_week}, {field.start_time} - {field.end_time}
                            </span>
                            <button
                              type="button"
                              onClick={() => availabilityArray.remove(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.availability && (
                    <p className="text-red-500 mt-2">{errors.availability.message}</p>
                  )}

                  <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <div className="p-1 bg-blue-100 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-blue-800">Pro tip</h4>
                        <p className="text-blue-700 text-sm">
                          Teachers with more availability get 3x more lesson requests. You can
                          always update your schedule later.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium text-lg rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Complete Profile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
