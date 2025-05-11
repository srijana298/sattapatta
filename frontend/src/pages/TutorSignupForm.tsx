import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import PhotoUploadForm from './MentorForm/PhotoUploadForm';
import TeachingCertification from './MentorForm/CertificateUploadForm';
import EducationUploadForm from './MentorForm/EducationUploadForm';
import DescriptionUploadForm from './MentorForm/DescriptionUploadForm';
import AboutForm from './MentorForm/AboutForm';
import { MentorFormProvider, useMentorForm } from '../components/MentorFormContext';
import { useQuery } from 'react-query';
import { getMentorProfile } from '../services/users';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useEffect } from 'react';
import {
  aboutProfileSchema,
  certificateSchema,
  descriptionSchema,
  educationSchema
} from '../lib/profile';
import { useNavigate } from 'react-router-dom';
import PreplyPricingPage from './MentorForm/PricingForm';

const steps = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Photo' },
  { id: 3, name: 'Certification' },
  { id: 4, name: 'Education' },
  { id: 5, name: 'Description' },
  { id: 6, name: 'Pricing' }
];

const MultiStepForm = () => {
  const { currentStep, setCurrentStep } = useMentorForm();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getMentorProfile,
    queryKey: 'get_mentor_profile'
  });

  useEffect(() => {
    if (data) {
      let currentStep = 1;
      const aboutResult = aboutProfileSchema.safeParse({
        fullname: data.user.fullname,
        email: data.user.email,
        countryOfBirth: data.countryOfBirth,
        category: data.skill_category?.id.toString(),
        skill: data.skills?.id.toString()
      });

      const certificateResult = certificateSchema.safeParse({
        hasTeachingCertificate: data.has_certificate,
        certificates: data.certificates.map(
          ({ subject, name, description, issuedBy, start_year, end_year }) => {
            return {
              subject,
              name,
              description,
              issuedBy,
              start_year,
              end_year
            };
          }
        )
      });

      const educationResult = educationSchema.safeParse({
        has_education: data.has_education,
        educations: data.educations.map(
          ({ university, degree, degree_type, start_year, end_year }) => {
            return {
              university,
              degree,
              degree_type,
              start_year,
              end_year
            };
          }
        )
      });

      const descriptionResult = descriptionSchema.safeParse({
        introduction: data.introduction,
        experience: data.experience,
        motivation: data.motivation,
        headline: data.headline
      });
      if (descriptionResult.success) {
        currentStep = 6;
      } else {
        if (aboutResult.success) {
          currentStep = 2;
        }

        if (data.profilePhotoUrl) {
          currentStep = 3;
        }

        if (certificateResult.success) {
          currentStep = 4;
        }

        if (educationResult.success) {
          currentStep = 5;
        }
        setCurrentStep(currentStep);
      }
    }
  }, [data, setCurrentStep, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-4 px-4 overflow-x-auto bg-gray-100">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center cursor-pointer"
            onClick={() => {
              setCurrentStep(step.id);
            }}
          >
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                step.id === currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {step.id}
            </div>
            <span className={`mr-1 ${step.id === currentStep ? 'font-medium' : ''}`}>
              {step.name}
            </span>
            {step.id < steps.length && <ChevronRight className="mx-2 text-gray-400" size={16} />}
          </div>
        ))}
      </div>

      {currentStep == 1 ? (
        <AboutForm />
      ) : currentStep == 2 ? (
        <PhotoUploadForm />
      ) : currentStep == 3 ? (
        <TeachingCertification />
      ) : currentStep == 4 ? (
        <EducationUploadForm />
      ) : currentStep == 5 ? (
        <DescriptionUploadForm />
      ) : (
        <PreplyPricingPage />
      )}
      {/* Form Content */}
    </div>
  );
};

export default function TutorMultiStepForm() {
  return (
    <>
      <Navbar />
      <MentorFormProvider>
        <MultiStepForm />
      </MentorFormProvider>
    </>
  );
}
