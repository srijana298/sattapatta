import { Mentor } from '../types/mentor';

// Generate 15 mock mentors
export const mockMentors: Mentor[] = [
  {
    id: '1',
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    countryOfBirth: 'United States',
    category: 1,
    skill: 1,
    profile_picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    has_certificate: true,
    certificates: [
      {
        subject: 'Mathematics',
        name: 'Advanced Calculus',
        description: 'Mastery in advanced calculus concepts',
        issuedBy: 'MIT',
        start_year: '2018',
        end_year: '2019'
      }
    ],
    has_education: true,
    educations: [
      {
        university: 'Harvard University',
        degree: 'Mathematics',
        degree_type: 'Bachelor',
        start_year: '2010',
        end_year: '2014'
      },
      {
        university: 'MIT',
        degree: 'Applied Mathematics',
        degree_type: 'Master',
        start_year: '2014',
        end_year: '2016'
      }
    ],
    introduction: 'I am a mathematician with over 6 years of teaching experience.',
    experience: 'I have taught at various universities and have mentored students for competitive exams.',
    motivation: 'I love helping students understand complex mathematical concepts in simple ways.',
    headline: 'Mathematics Expert | Harvard & MIT Alumnus',
    hourly_rate: 50,
    trial_rate: 25,
    availability: [
      {
        day_of_week: 'Monday',
        start_time: '09:00',
        end_time: '17:00',
        is_available: true
      },
      {
        day_of_week: 'Wednesday',
        start_time: '09:00',
        end_time: '17:00',
        is_available: true
      },
      {
        day_of_week: 'Friday',
        start_time: '09:00',
        end_time: '17:00',
        is_available: true
      }
    ],
    status: 'pending',
    created_at: '2023-09-15T10:30:00Z'
  },
  {
    id: '2',
    fullname: 'Jane Smith',
    email: 'jane.smith@example.com',
    countryOfBirth: 'United Kingdom',
    category: 4,
    skill: 3,
    profile_picture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    has_certificate: true,
    certificates: [
      {
        subject: 'Programming',
        name: 'Full Stack Web Development',
        description: 'Comprehensive web development certification',
        issuedBy: 'Udacity',
        start_year: '2019',
        end_year: '2020'
      },
      {
        subject: 'Programming',
        name: 'Advanced React',
        description: 'Deep dive into React ecosystem',
        issuedBy: 'Frontend Masters',
        start_year: '2020',
        end_year: '2021'
      }
    ],
    has_education: true,
    educations: [
      {
        university: 'University of London',
        degree: 'Computer Science',
        degree_type: 'Bachelor',
        start_year: '2012',
        end_year: '2016'
      }
    ],
    introduction: 'I am a software developer specializing in web technologies.',
    experience: '7+ years of industry experience working with React, Node.js, and other modern web technologies.',
    motivation: 'I enjoy sharing my knowledge and helping others become successful developers.',
    headline: 'Full Stack Developer | React Expert',
    hourly_rate: 60,
    trial_rate: 30,
    availability: [
      {
        day_of_week: 'Tuesday',
        start_time: '18:00',
        end_time: '22:00',
        is_available: true
      },
      {
        day_of_week: 'Thursday',
        start_time: '18:00',
        end_time: '22:00',
        is_available: true
      },
      {
        day_of_week: 'Saturday',
        start_time: '10:00',
        end_time: '15:00',
        is_available: true
      }
    ],
    status: 'approved',
    created_at: '2023-08-20T14:45:00Z'
  },
  {
    id: '3',
    fullname: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    countryOfBirth: 'Canada',
    category: 3,
    skill: 8,
    profile_picture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    has_certificate: true,
    certificates: [
      {
        subject: 'Music',
        name: 'Advanced Piano Performance',
        description: 'Classical piano performance certification',
        issuedBy: 'Royal Conservatory of Music',
        start_year: '2015',
        end_year: '2017'
      }
    ],
    has_education: true,
    educations: [
      {
        university: 'Juilliard School',
        degree: 'Music Performance',
        degree_type: 'Bachelor',
        start_year: '2008',
        end_year: '2012'
      },
      {
        university: 'Berklee College of Music',
        degree: 'Music Production',
        degree_type: 'Master',
        start_year: '2012',
        end_year: '2014'
      }
    ],
    introduction: 'I am a classically trained pianist and music producer.',
    experience: '10+ years of performance experience and 8+ years teaching piano to students of all levels.',
    motivation: 'I believe music is a universal language that everyone should have access to learning.',
    headline: 'Classical Pianist | Music Production Expert',
    hourly_rate: 55,
    trial_rate: 25,
    availability: [
      {
        day_of_week: 'Monday',
        start_time: '14:00',
        end_time: '20:00',
        is_available: true
      },
      {
        day_of_week: 'Wednesday',
        start_time: '14:00',
        end_time: '20:00',
        is_available: true
      },
      {
        day_of_week: 'Friday',
        start_time: '14:00',
        end_time: '20:00',
        is_available: true
      }
    ],
    status: 'rejected',
    created_at: '2023-09-05T09:15:00Z'
  },
  {
    id: '4',
    fullname: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    countryOfBirth: 'Spain',
    category: 2,
    skill: 5,
    profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    has_certificate: true,
    certificates: [
      {
        subject: 'Marketing',
        name: 'Digital Marketing Specialist',
        description: 'Comprehensive digital marketing certification',
        issuedBy: 'Google',
        start_year: '2019',
        end_year: '2020'
      }
    ],
    has_education: true,
    educations: [
      {
        university: 'Universidad de Barcelona',
        degree: 'Business Administration',
        degree_type: 'Bachelor',
        start_year: '2011',
        end_year: '2015'
      },
      {
        university: 'IE Business School',
        degree: 'Marketing Management',
        degree_type: 'Master',
        start_year: '2015',
        end_year: '2017'
      }
    ],
    introduction: 'I am a marketing professional with expertise in digital strategies.',
    experience: '6+ years working with global brands on their marketing campaigns.',
    motivation: 'I want to help businesses and individuals understand the power of effective marketing.',
    headline: 'Digital Marketing Strategist | Brand Expert',
    hourly_rate: 65,
    trial_rate: 30,
    availability: [
      {
        day_of_week: 'Tuesday',
        start_time: '10:00',
        end_time: '18:00',
        is_available: true
      },
      {
        day_of_week: 'Thursday',
        start_time: '10:00',
        end_time: '18:00',
        is_available: true
      }
    ],
    status: 'pending',
    created_at: '2023-09-18T11:20:00Z'
  },
  {
    id: '5',
    fullname: 'David Chen',
    email: 'david.chen@example.com',
    countryOfBirth: 'Singapore',
    category: 5,
    skill: 10,
    profile_picture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    has_certificate: true,
    certificates: [
      {
        subject: 'Finance',
        name: 'Certified Financial Planner',
        description: 'Professional certification in financial planning',
        issuedBy: 'CFP Board',
        start_year: '2016',
        end_year: '2017'
      }
    ],
    has_education: true,
    educations: [
      {
        university: 'National University of Singapore',
        degree: 'Finance',
        degree_type: 'Bachelor',
        start_year: '2009',
        end_year: '2013'
      },
      {
        university: 'London School of Economics',
        degree: 'Financial Management',
        degree_type: 'Master',
        start_year: '2013',
        end_year: '2015'
      }
    ],
    introduction: 'I am a financial advisor with expertise in personal finance and investment strategies.',
    experience: '8+ years helping individuals and families achieve financial freedom through strategic planning.',
    motivation: 'I believe financial literacy is a crucial life skill that everyone should have access to.',
    headline: 'Certified Financial Planner | Investment Specialist',
    hourly_rate: 70,
    trial_rate: 35,
    availability: [
      {
        day_of_week: 'Monday',
        start_time: '18:00',
        end_time: '21:00',
        is_available: true
      },
      {
        day_of_week: 'Wednesday',
        start_time: '18:00',
        end_time: '21:00',
        is_available: true
      },
      {
        day_of_week: 'Saturday',
        start_time: '09:00',
        end_time: '15:00',
        is_available: true
      }
    ],
    status: 'approved',
    created_at: '2023-08-25T08:40:00Z'
  }
];

// Calculate counts by status
export const getStatusCounts = () => {
  const counts = {
    total: mockMentors.length,
    pending: mockMentors.filter(m => m.status === 'pending').length,
    approved: mockMentors.filter(m => m.status === 'approved').length,
    rejected: mockMentors.filter(m => m.status === 'rejected').length
  };
  
  return counts;
};

// Calculate average rates
export const getAverageRates = () => {
  const approvedMentors = mockMentors.filter(m => m.status === 'approved');
  
  if (approvedMentors.length === 0) {
    return {
      avgHourlyRate: 0,
      avgTrialRate: 0
    };
  }
  
  const avgHourlyRate = approvedMentors.reduce((sum, mentor) => sum + mentor.hourly_rate, 0) / approvedMentors.length;
  const avgTrialRate = approvedMentors.reduce((sum, mentor) => sum + mentor.trial_rate, 0) / approvedMentors.length;
  
  return {
    avgHourlyRate,
    avgTrialRate
  };
};

// Get categories distribution
export const getCategoryDistribution = () => {
  const categoryCount = mockMentors.reduce((acc, mentor) => {
    acc[mentor.category] = (acc[mentor.category] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  return categoryCount;
};

// Get skills distribution
export const getSkillDistribution = () => {
  const skillCount = mockMentors.reduce((acc, mentor) => {
    acc[mentor.skill] = (acc[mentor.skill] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  return skillCount;
};

// Get mentor by id
export const getMentorById = (id: string) => {
  return mockMentors.find(mentor => mentor.id === id);
};

// Update mentor status
export const updateMentorStatus = (id: number | string, status: 'pending' | 'approved' | 'rejected') => {
  const mentorIndex = mockMentors.findIndex(mentor => mentor.id === id);
  
  if (mentorIndex !== -1) {
    mockMentors[mentorIndex].status = status;
    return true;
  }
  
  return false;
};