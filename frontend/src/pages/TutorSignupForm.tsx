import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import PhotoUploadForm from './MentorForm/PhotoUploadForm';
import TeachingCertification from './MentorForm/CertificateUploadForm';
import EducationUploadForm from './MentorForm/EducationUploadForm';
import DescriptionUploadForm from './MentorForm/DescriptionUploadForm';
import AvailabilityUploadForm from './MentorForm/AvailabilityUploadForm';
import AboutForm from './MentorForm/AboutForm';

const steps = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Photo' },
  { id: 3, name: 'Certification' },
  { id: 4, name: 'Education' },
  { id: 5, name: 'Description' },
  { id: 6, name: 'Availability' }
];

export default function TutorMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-4 px-4 overflow-x-auto bg-gray-100">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-center cursor-pointer"
              onClick={() => handleStepChange(step.id)}
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
          <AvailabilityUploadForm />
        )}
        {/* Form Content */}
      </div>
    </>
  );
}
