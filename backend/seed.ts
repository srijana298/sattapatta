import 'reflect-metadata';
import { Users } from './src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import AppDataSource from './src/datasource';
import { Skill } from './src/skills/entities/skill.entity';
import { Category } from './src/categories/entities/category.entity';
import { Mentor } from './src/mentor/entities/mentor.entity';
import { MentorEducation } from './src/mentor/entities/education.entity';
import { MentorCertificate } from './src/mentor/entities/certificate.entity';
import { MentorReview } from './src/mentor/entities/rating.entity'; // Add this import
import { faker } from '@faker-js/faker';

async function seed(): Promise<void> {
  try {
    await AppDataSource.initialize();

    console.log('Existing data cleared.');

    // Create categories
    const categories = [
      {
        name: 'Technology',
        description:
          'Technology-related skills including programming, data science, and IT infrastructure',
      },
      {
        name: 'Business',
        description:
          'Business skills including management, marketing, entrepreneurship, and finance',
      },
      {
        name: 'Arts & Design',
        description:
          'Creative skills including visual arts, design, music, and performing arts',
      },
      {
        name: 'Science',
        description:
          'Science disciplines including physics, chemistry, biology, and mathematics',
      },
      {
        name: 'Languages',
        description:
          'Language learning and teaching in various world languages',
      },
      {
        name: 'Personal Development',
        description:
          'Skills for personal growth including leadership, communication, and emotional intelligence',
      },
      {
        name: 'Health & Wellness',
        description:
          'Health-related skills including nutrition, fitness, and mental health',
      },
      {
        name: 'Education',
        description:
          'Teaching methods, curriculum development, and educational theory',
      },
      {
        name: 'Finance',
        description:
          'Financial skills including investing, personal finance, and financial analysis',
      },
      {
        name: 'Engineering',
        description:
          'Engineering disciplines including mechanical, electrical, civil, and chemical engineering',
      },
    ];

    const createdCategories: Category[] = [];
    for (const category of categories) {
      const newCategory = AppDataSource.manager.create(Category, category);
      await newCategory.save();
      createdCategories.push(newCategory);
    }

    const skills = [
      {
        name: 'JavaScript Programming',
        description:
          'Web development with JavaScript, including frameworks like React, Angular, and Node.js',
        category: createdCategories.find((cat) => cat.name === 'Technology'),
      },
      {
        name: 'Data Science',
        description:
          'Analysis and interpretation of complex data using statistical methods and machine learning',
        category: createdCategories.find((cat) => cat.name === 'Technology'),
      },
      {
        name: 'Digital Marketing',
        description:
          'Online marketing strategies including SEO, social media, and content marketing',
        category: createdCategories.find((cat) => cat.name === 'Business'),
      },
      {
        name: 'Project Management',
        description:
          'Planning, organizing, and overseeing projects to accomplish specific goals',
        category: createdCategories.find((cat) => cat.name === 'Business'),
      },
      {
        name: 'Graphic Design',
        description:
          'Visual communication and problem-solving through typography, photography, and illustration',
        category: createdCategories.find((cat) => cat.name === 'Arts & Design'),
      },
      {
        name: 'UX/UI Design',
        description:
          'Creating user-friendly digital interfaces with focus on usability and user experience',
        category: createdCategories.find((cat) => cat.name === 'Arts & Design'),
      },
      {
        name: 'Physics',
        description:
          'Understanding the fundamental principles governing the natural world and universe',
        category: createdCategories.find((cat) => cat.name === 'Science'),
      },
      {
        name: 'Biology',
        description:
          'Study of living organisms and their interactions with each other and the environment',
        category: createdCategories.find((cat) => cat.name === 'Science'),
      },
      {
        name: 'English Language',
        description:
          'English language instruction for non-native speakers, including grammar, vocabulary, and conversation',
        category: createdCategories.find((cat) => cat.name === 'Languages'),
      },
      {
        name: 'Spanish Language',
        description:
          'Spanish language instruction including speaking, reading, writing, and cultural context',
        category: createdCategories.find((cat) => cat.name === 'Languages'),
      },
      {
        name: 'Leadership Development',
        description:
          'Developing leadership skills including decision-making, delegation, and team motivation',
        category: createdCategories.find(
          (cat) => cat.name === 'Personal Development',
        ),
      },
      {
        name: 'Public Speaking',
        description:
          'Effective communication in public settings including presentations and speeches',
        category: createdCategories.find(
          (cat) => cat.name === 'Personal Development',
        ),
      },
      {
        name: 'Nutrition',
        description:
          'Principles of healthy eating and dietary planning for optimal health',
        category: createdCategories.find(
          (cat) => cat.name === 'Health & Wellness',
        ),
      },
      {
        name: 'Mindfulness & Meditation',
        description:
          'Practices for mental clarity, stress reduction, and emotional well-being',
        category: createdCategories.find(
          (cat) => cat.name === 'Health & Wellness',
        ),
      },
      {
        name: 'Teaching Methods',
        description:
          'Effective instructional strategies for various learning styles and educational contexts',
        category: createdCategories.find((cat) => cat.name === 'Education'),
      },
      {
        name: 'Curriculum Design',
        description:
          'Development of educational programs with clear learning objectives and assessment strategies',
        category: createdCategories.find((cat) => cat.name === 'Education'),
      },
      {
        name: 'Investment Strategies',
        description:
          'Approaches to investing in stocks, bonds, real estate, and other financial instruments',
        category: createdCategories.find((cat) => cat.name === 'Finance'),
      },
      {
        name: 'Financial Planning',
        description:
          'Comprehensive planning for financial goals including retirement, education, and wealth management',
        category: createdCategories.find((cat) => cat.name === 'Finance'),
      },
      {
        name: 'Civil Engineering',
        description:
          'Design and construction of infrastructure including buildings, roads, and bridges',
        category: createdCategories.find((cat) => cat.name === 'Engineering'),
      },
      {
        name: 'Electrical Engineering',
        description:
          'Study and application of electricity, electronics, and electromagnetism',
        category: createdCategories.find((cat) => cat.name === 'Engineering'),
      },
    ];

    const createdSkills: Skill[] = [];
    for (const skill of skills) {
      const newSkill = AppDataSource.manager.create(Skill, skill);
      await newSkill.save();
      createdSkills.push(newSkill);
    }

    // Create users (20 mentors and 100 regular users for reviews)
    const users: Users[] = [];

    // Create 100 regular users to have enough reviewers
    for (let i = 1; i <= 100; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = AppDataSource.manager.create(Users, {
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        role: 'student',
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }

    // Create mentor users
    const mentorUsers: Users[] = [];
    for (let i = 1; i <= 20; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = Users.create({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        role: 'mentor',
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
      mentorUsers.push(user);
    }

    // Create mentor profiles linked to users
    const countries = [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'India',
      'Japan',
      'Brazil',
      'Singapore',
    ];
    const universities = [
      'Harvard University',
      'Stanford University',
      'MIT',
      'University of Oxford',
      'University of Cambridge',
      'ETH Zurich',
      'National University of Singapore',
      'University of Tokyo',
      'University of Toronto',
      'Technical University of Munich',
    ];
    const degrees = [
      'Computer Science',
      'Business Administration',
      'Engineering',
      'Psychology',
      'Education',
      'Design',
      'Finance',
      'Medicine',
      'Physics',
      'Biology',
    ];
    const degreeTypes = [
      'Bachelor',
      'Master',
      'PhD',
      'Associate',
      'Certificate',
    ];
    const certificateIssuers = [
      'Microsoft',
      'Google',
      'Amazon Web Services',
      'Adobe',
      'Project Management Institute',
      'Cisco',
      'CompTIA',
      'Salesforce',
      'Oracle',
      'International Finance Corporation',
    ];
    const certificateNames = [
      'Certified Professional',
      'Associate Developer',
      'Expert Certification',
      'Master Certification',
      'Foundation Certificate',
      'Advanced Practitioner',
      'Professional Trainer',
      'Specialist Certification',
      'Leadership Certification',
      'Technical Expert',
    ];

    const getRandomItem = <T>(array: T[]): T =>
      array[Math.floor(Math.random() * array.length)];

    // Helper function to get random year
    const getRandomYear = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    // Helper function to get weighted random rating (more likely to be 4-5)
    const getWeightedRating = (): number => {
      const rand = Math.random();
      if (rand < 0.5) return 5; // 50% chance of 5 stars
      if (rand < 0.75) return 4; // 25% chance of 4 stars
      if (rand < 0.9) return 3; // 15% chance of 3 stars
      if (rand < 0.97) return 2; // 7% chance of 2 stars
      return 1; // 3% chance of 1 star
    };

    // Review comment templates based on rating
    const reviewComments = {
      5: [
        'Absolutely fantastic mentor! Exceeded all my expectations.',
        'Amazing experience! Highly knowledgeable and very supportive.',
        'Outstanding mentor with excellent communication skills.',
        "Best mentor I've worked with. Highly recommend!",
        'Incredible knowledge and teaching ability. Five stars!',
        'Exceptional mentor who goes above and beyond.',
        "Perfect sessions every time. Couldn't ask for better guidance.",
        'Brilliant mentor with deep expertise and patience.',
      ],
      4: [
        'Great mentor with solid knowledge and good teaching skills.',
        'Very helpful and knowledgeable. Would recommend.',
        'Good experience overall. Learned a lot.',
        'Professional and effective mentoring sessions.',
        'Knowledgeable mentor with practical insights.',
        'Helpful guidance and clear explanations.',
        'Good mentor who provides valuable feedback.',
        'Solid mentoring experience with good results.',
      ],
      3: [
        'Decent mentor with adequate knowledge.',
        'Average experience. Some helpful insights.',
        'Okay mentoring sessions. Could be more engaging.',
        'Fair mentor with basic knowledge sharing.',
        'Reasonable guidance but room for improvement.',
        'Standard mentoring experience.',
        'Adequate support but not exceptional.',
        'Good enough for basic learning needs.',
      ],
      2: [
        'Below expectations. Limited engagement.',
        'Not very helpful. Lacks depth in explanations.',
        'Disappointing experience. Could be much better.',
        'Struggling to provide clear guidance.',
        'Not meeting my learning expectations.',
        'Needs improvement in communication and knowledge sharing.',
        'Unsatisfactory mentoring experience.',
        'Difficult to follow and understand.',
      ],
      1: [
        'Very poor experience. Not recommended.',
        'Completely unsatisfactory. Waste of time.',
        'Terrible mentor with no helpful guidance.',
        'Extremely disappointing and unprofessional.',
        "Worst mentoring experience I've had.",
        'No value provided. Avoid this mentor.',
        'Completely ineffective mentoring sessions.',
        'Unacceptable quality of mentoring.',
      ],
    };

    const createdMentors: Mentor[] = [];

    for (let i = 0; i < mentorUsers.length; i++) {
      const mentorUser = mentorUsers[i];
      const randomSkill = createdSkills[i % createdSkills.length]; // Distribute skills evenly
      const randomCategory = randomSkill.category;

      const mentor = AppDataSource.manager.create(Mentor, {
        countryOfBirth: getRandomItem(countries),
        skill_category: randomCategory,
        skills: randomSkill,
        subject: randomSkill.name,
        profilePhotoUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
        introduction: `Experienced ${randomSkill.name} professional with a passion for mentoring others in the field.`,
        experience: `Over ${Math.floor(Math.random() * 15) + 3} years of experience in ${randomSkill.name}, working with organizations such as ${getRandomItem(['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'IBM', 'Oracle', 'Adobe', 'Salesforce', 'Twitter'])}.`,
        motivation: `I believe in empowering others through knowledge sharing and personalized guidance. My goal is to help mentees achieve their full potential in ${randomSkill.name}.`,
        headline: `${getRandomItem(['Expert', 'Professional', 'Specialist', 'Passionate'])} ${randomSkill.name} Mentor`,
        has_education: true,
        has_certificate: Math.random() > 0.3, // 70% chance of having certificates
        isVerified: Math.random() > 0.2, // 80% chance of being verified
        isActive: Math.random() > 0.1, // 90% chance of being active
        user: mentorUser,
      });

      await mentor.save();
      createdMentors.push(mentor);

      const educationCount = Math.floor(Math.random() * 2) + 1; // 1-2 education records per mentor
      for (let j = 0; j < educationCount; j++) {
        const startYear = getRandomYear(2000, 2015).toString();
        const endYear = getRandomYear(parseInt(startYear) + 2, 2023).toString();

        const education = AppDataSource.manager.create(MentorEducation, {
          university: getRandomItem(universities),
          degree: getRandomItem(degrees),
          degree_type: getRandomItem(degreeTypes),
          start_year: startYear,
          end_year: endYear,
          mentor: mentor,
        });

        await education.save();
      }

      // Create certificate records if mentor has certificates
      if (mentor.has_certificate) {
        const certificateCount = Math.floor(Math.random() * 3) + 1; // 1-3 certificates per mentor
        for (let j = 0; j < certificateCount; j++) {
          const startYear = getRandomYear(2010, 2020).toString();
          const endYear =
            Math.random() > 0.3
              ? getRandomYear(parseInt(startYear) + 1, 2025).toString()
              : ''; // Some certificates don't expire

          const name = `${getRandomItem(certificateNames)} in ${randomSkill.name}`;

          const certificate = AppDataSource.manager.create(MentorCertificate, {
            subject: randomSkill.name,
            name,
            description: `Professional certification demonstrating expertise in ${randomSkill.name} principles and applications.`,
            issuedBy: getRandomItem(certificateIssuers),
            start_year: startYear,
            end_year: endYear,
            mentor,
          });

          await certificate.save();
        }
      }
    }

    // Create reviews for each mentor (40-50 reviews per mentor)
    console.log('Creating mentor reviews...');
    const studentUsers = users.filter((user) => user.role === 'student');

    for (const mentor of createdMentors) {
      const reviewCount = Math.floor(Math.random() * 11) + 40; // 40-50 reviews

      // Shuffle student users to get random reviewers
      const shuffledStudents = [...studentUsers].sort(
        () => Math.random() - 0.5,
      );

      for (let i = 0; i < reviewCount; i++) {
        const reviewer = shuffledStudents[i % shuffledStudents.length];
        const rating = getWeightedRating();
        const comment = getRandomItem(
          reviewComments[rating as keyof typeof reviewComments],
        );

        // Random date within the last 2 years
        const reviewDate = faker.date.between({
          from: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000),
          to: new Date(),
        });

        const review = new MentorReview();
        Object.assign(review, {
          mentor,
          reviewer,
          rating,
          comment,
          reply:
            Math.random() > 0.7
              ? "Thank you for your feedback! I'm glad I could help you in your learning journey."
              : null,
          repliedAt:
            Math.random() > 0.7
              ? faker.date.between({ from: reviewDate, to: new Date() })
              : null,
          createdAt: reviewDate,
          updatedAt: reviewDate,
        });

        await review.save();
      }
    }

    console.log('Seeding completed successfully!');
    console.log(`Created ${createdMentors.length} mentors with reviews`);
    console.log(`Total users created: ${users.length}`);
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error: Error) => console.error('Fatal error:', error));
