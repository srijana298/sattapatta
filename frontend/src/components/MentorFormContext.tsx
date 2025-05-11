import { createContext, useContext, useState } from 'react';
import { AboutProfile, Description } from '../lib/profile';

interface Context {
  aboutUser: Partial<AboutProfile> | null;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setAboutUser: (value: Partial<AboutProfile>) => void;
}

const MentorFormContext = createContext<Context>({
  aboutUser: null,
  currentStep: 1,
  setAboutUser: () => {},
  setCurrentStep: () => {}
});

export const MentorFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [aboutUser, setAboutUser] = useState<Partial<AboutProfile> | null>(null);
  const [description, setDescription] = useState<Description | null>(null);
  return (
    <MentorFormContext.Provider
      value={{
        currentStep,
        aboutUser,
        setAboutUser,
        setCurrentStep
      }}
    >
      {children}
    </MentorFormContext.Provider>
  );
};

export function useMentorForm() {
  const context = useContext(MentorFormContext);

  if (!context) {
    throw new Error('useAuth should be within a AuthProvider');
  }
  return context;
}
export default MentorFormContext;
