import 'reflect-metadata';
import { Users } from './src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import AppDataSource from './src/datasource';
import { Skill } from './src/skills/entities/skill.entity';
import { Category } from './src/categories/entities/category.entity';
import { Mentor } from './src/mentor/entities/mentor.entity';

import { MentorEducation } from './src/mentor/entities/education.entity';
import { MentorCertificate } from './src/mentor/entities/certificate.entity';

// Category generators
// Interface for createListing parameters
// Helper function to generate a unique email
async function seed(): Promise<void> {
  try {
    await AppDataSource.initialize();
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

    // Create users (20 mentors and 5 regular users)
    const users: Users[] = [];

    // Create 5 regular users
    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = AppDataSource.manager.create(Users, {
        fullname: `Student User ${i}`,
        email: `student${i}@example.com`,
        role: 'student',
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }

    // Create 20 mentor users
    for (let i = 1; i <= 20; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = Users.create({
        fullname: `Mentor User ${i}`,
        email: `mentor${i}@example.com`,
        role: 'mentor',
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
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

    const mentorUsers = users.filter((user) => user.role === 'mentor');
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
            // subject: randomSkill.name,
            // name: `${getRandomItem(certificateNames)} in ${randomSkill.name}`,
            // description: `Professional certification demonstrating expertise in ${randomSkill.name} principles and applications.`,
            // issuedBy: getRandomItem(certificateIssuers),
            // start_year: startYear,
            // end_year: endYear,
            // mentor: mentor,
          });

          await certificate.save();
        }
      }
    }

    console.log('Seeding completed successfully');
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error: Error) => console.error('Fatal error:', error));
