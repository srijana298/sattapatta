import 'reflect-metadata';
import { Users } from './src/users/entities/users.entity';
// Note: We're pretending there's a gender field for the purpose of this seed script
// In a real implementation, we would add this field to the Users entity
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

      // Nepali first names separated by gender
      const nepaliMaleNames = [
        'Aarav',
        'Siddharth',
        'Arjun',
        'Rohan',
        'Kabir',
        'Arun',
        'Amit',
        'Raj',
        'Krishna',
        'Prakash',
        'Bijay',
        'Dipak',
        'Ramesh',
        'Suresh',
        'Mahesh',
        'Dinesh',
        'Nabin',
        'Prabin',
        'Kamal',
        'Gopal',
        'Binod',
        'Milan',
        'Suman',
        'Manoj',
        'Bikash',
        'Mohan',
        'Bishnu',
        'Hari',
        'Shyam',
        'Raju',
      ];

      const nepaliFemaleNames = [
        'Asha',
        'Priya',
        'Sunita',
        'Gita',
        'Sita',
        'Anita',
        'Sarita',
        'Nisha',
        'Meera',
        'Deepa',
        'Rita',
        'Srijana',
        'Manisha',
        'Sabina',
        'Samjhana',
        'Rabina',
        'Rachana',
        'Sangita',
        'Menuka',
        'Puja',
      ];

      // Nepali last names
      const nepaliLastNames = [
        'Sharma',
        'Adhikari',
        'Poudel',
        'Khatri',
        'Thapa',
        'Shrestha',
        'Prajapati',
        'Karki',
        'Gurung',
        'Tamang',
        'Magar',
        'KC',
        'BK',
        'Rai',
        'Limbu',
        'Sherpa',
        'Regmi',
        'Pokharel',
        'Bhattarai',
        'Neupane',
        'Koirala',
        'Dahal',
        'Basnet',
        'Sapkota',
        'Chhetri',
        'Aryal',
        'Lamichhane',
        'Subedi',
        'Pradhan',
        'Maharjan',
        'Ghimire',
        'Joshi',
        'Acharya',
        'Gautam',
        'Bhandari',
        'Khadka',
        'Bohara',
        'Pandey',
        'Manandhar',
        'Bajracharya',
        'Hamal',
        'Baniya',
      ];

      // For regular users, randomly assign gender
      const isUserMale = Math.random() > 0.5;
      const userNameArray = isUserMale ? nepaliMaleNames : nepaliFemaleNames;
      const firstName =
        userNameArray[Math.floor(Math.random() * userNameArray.length)];
      const lastName =
        nepaliLastNames[Math.floor(Math.random() * nepaliLastNames.length)];
      const fullname = `${firstName} ${lastName}`;
      const emailName =
        firstName.toLowerCase() + '.' + lastName.toLowerCase() + i; // Add index to ensure uniqueness
      const domains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'meromail.com.np',
        'nepmail.com.np',
      ];
      const email = `${emailName}@${domains[Math.floor(Math.random() * domains.length)]}`;

      const user = AppDataSource.manager.create(Users, {
        fullname: fullname,
        email: email,
        role: 'student',
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }

    // Create mentor users
    const mentorUsers: Users[] = [];

    // Male and female first names separated for gender matching with profile photos
    const mentorMaleNames = [
      'Binod',
      'Ramesh',
      'Suresh',
      'Mahesh',
      'Dinesh',
      'Rajesh',
      'Naresh',
      'Umesh',
      'Ganesh',
      'Dipesh',
      'Bishnu',
      'Hari',
      'Kedar',
      'Rajan',
      'Bharat',
      'Govinda',
      'Narayan',
      'Krishna',
      'Ram',
    ];

    const mentorFemaleNames = [
      'Sarita',
      'Gita',
      'Sushila',
      'Kamala',
      'Indira',
      'Shanti',
      'Parbati',
      'Laxmi',
      'Sushma',
      'Radha',
      'Durga',
      'Saraswati',
      'Bhagwati',
      'Mina',
      'Janaki',
      'Renuka',
      'Devaki',
      'Jamuna',
      'Yasoda',
      'Tara',
      'Maya',
    ];

    const mentorLastNames = [
      'Acharya',
      'Bhattarai',
      'Khatiwada',
      'Neupane',
      'Koirala',
      'Dahal',
      'Basnet',
      'Sapkota',
      'Chhetri',
      'Aryal',
      'Lamichhane',
      'Subedi',
      'Pradhan',
      'Maharjan',
      'Shrestha',
      'Ghimire',
      'Sharma',
      'Adhikari',
      'Poudel',
      'Khatri',
      'Thapa',
      'Karki',
      'Gurung',
      'Tamang',
      'Regmi',
      'Pokharel',
      'Joshi',
      'Panta',
      'Gyawali',
      'Rimal',
      'Devkota',
      'Ojha',
      'Pandey',
      'Timalsina',
      'Rijal',
      'Giri',
      'Puri',
      'Niraula',
      'Dhakal',
      'Mishra',
    ];

    for (let i = 1; i <= 20; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);

      const isMale = i % 2 === 0;
      const nameArray = isMale ? mentorMaleNames : mentorFemaleNames;
      const firstName = nameArray[Math.floor(Math.random() * nameArray.length)];
      const lastName =
        mentorLastNames[Math.floor(Math.random() * mentorLastNames.length)];
      const fullname = `${firstName} ${lastName}`;
      const emailName =
        firstName.toLowerCase() + '.' + lastName.toLowerCase() + i; // Add index to ensure uniqueness
      const domains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'tu.edu.np',
        'ku.edu.np',
      ];
      const email = `${emailName}@${domains[Math.floor(Math.random() * domains.length)]}`;

      const user = AppDataSource.manager.create(Users, {
        fullname: fullname,
        email: email,
        role: 'mentor',
        password: hashedPassword,
        gender: isMale ? 'male' : 'female',
      });
      await user.save();
      users.push(user);
      mentorUsers.push(user);
    }

    // Create mentor profiles linked to users
    const countries = [
      'Nepal',
      'India',
      'United States',
      'United Kingdom',
      'Australia',
      'Canada',
      'Japan',
      'Singapore',
      'Malaysia',
      'Thailand',
    ];
    const universities = [
      'Tribhuvan University',
      'Kathmandu University',
      'Pokhara University',
      'Purbanchal University',
      'Nepal Engineering College',
      'Institute of Engineering',
      'Institute of Medicine',
      'Manipal College',
      'Apex College',
      'Delhi University',
      'IIT Mumbai',
      'Harvard University',
    ];
    const degrees = [
      'Computer Engineering',
      'Business Studies',
      'Civil Engineering',
      'BIT',
      'CSIT',
      'Education',
      'BBS',
      'MBBS',
      'BSc',
      'BCA',
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
      'IT Training Nepal',
      'Sagarmatha Engineering College',
      'Broadway Infosys',
      'Deerwalk Institute',
      'Nepal Telecom Training Center',
      'Leapfrog Academy',
      'Thamel.com Training Institute',
    ];
    const certificateNames = [
      'Certified Professional',
      'Associate Developer',
      'Expert Certification',
      'Bishesh Praman Patra',
      'Taalim Praman Patra',
      'Advanced Practitioner',
      'Professional Trainer',
      'Bishista Praman Patra',
      'Netritwa Praman Patra',
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

    // Review comment templates based on rating in romanized Nepali
    const reviewComments = {
      5: [
        'Kasto ramro padhaunu huncha sir/miss le! Dherai kura sikhna paaye.',
        'Ekdum ramro mentor. Sabai kura sajilo sanga bujhaunu huncha.',
        'Lastai ramro anubhav. Sir/Miss ko gyaan ra sikaune tarika ekdum babbal cha.',
        'Hajur jasto mentor paaunu nai thulo bhagya ho! Dherai dherai dhanyabaad.',
        'Sarai uttam siksak! Sabai prasna ko jawaf dinu huncha.',
        'Kasto dhami mentor, sabai kura milera sikaunu huncha.',
        'Sir/Miss ko padhaaune tarika ekdum mitho cha. Pheri linu paryo class.',
        'Aba sadhai sir/miss sangai padhchu. Kasto ramro sikaunu huncha!',
      ],
      4: [
        'Ramro mentor, dherai kura sikhna paiyo.',
        'Ramrai anubhav, sikaune tarika pani ramro cha.',
        'Dherai kura janeko ra ramrari bujhaunu huncha.',
        'Ekdum professional ra sajilo sanga bujhaune mentor.',
        'Ramro gyaan bhayeko mentor, practical kura pani sikaucha.',
        'Help garne khaalko mentor, ramrari bujhincha.',
        'Ramrai feedback dine mentor, sikhna sajilo huncha.',
        'Ramro anubhav, pheri pani padna man lagcha.',
      ],
      3: [
        'Thikai cha, kehi kura ta ramrari bujhaye.',
        'Madhyam kisim ko anubhav. Kehi naya kura sikhna paiyo.',
        'Thik thak cha, tara aru mentor jasto ramailo chaina.',
        'Sajilo kura matra sikaunu huncha, ali garo kura ma help chaina.',
        'Padhcha tara majale bujhinna kehi kehi.',
        'Sadhaaran khaalko mentor, na ramro na naramro.',
        'Kaam chalau kisim ko mentoring, teti impressed chaina.',
        'Sikaunu huncha tara majale bujhinna.',
      ],
      2: [
        'Ali naramro anubhav. Teti ramrari sikaunu bhayena.',
        'Khasai help bhayena. Dherai sajilo sanga bujhinna.',
        'Ekdum naramro anubhav. Aru mentor khojchu aba.',
        'Ekdum confuse hune gari sikaunu huncha.',
        'Malai chaheko kura sikna sakina.',
        'Sir/Miss lai sajilo sanga bujhauna aaudaina jasto cha.',
        'Mentor le ramrari padhcha jasto lagena.',
        'Dherai garo huncha bujhna, ali clear huna paryo.',
      ],
      1: [
        'Kasot hawa teacher! Ekdum time waste bhayo.',
        'Ekdum naramro anubhav. Paisa ra samaya barbad bhayo.',
        'Kei siknai bhayena. Mentor jasto lagdaina.',
        'Ekdum bekar mentor, sajilo kura pani bujhauna sakdainan.',
        'Hijo samma ko sabai bhanda naramro mentor.',
        'Kei help bhayena. Aru mentor khojdai chu.',
        'Ekdum saro naramro anubhav, ramrai English pani boldainan.',
        'Katro paisa tirera yesto class! Ekdum chichyaunu matra jancha.',
      ],
    };

    const createdMentors: Mentor[] = [];

    for (let i = 0; i < mentorUsers.length; i++) {
      const mentorUser = mentorUsers[i];
      const randomSkill = createdSkills[i % createdSkills.length]; // Distribute skills evenly
      const randomCategory = randomSkill.category;

      // Check first name to determine gender for profile photo
      const isMale = i % 2 === 0; // We already alternated gender when creating users

      const mentor = AppDataSource.manager.create(Mentor, {
        countryOfBirth: getRandomItem(countries),
        skill_category: randomCategory,
        skills: randomSkill,
        status: 'approved',
        subject: randomSkill.name,
        profilePhotoUrl: `https://randomuser.me/api/portraits/${isMale ? 'men' : 'women'}/${(i % 10) + 1}.jpg`,
        introduction: `Experienced ${randomSkill.name} professional with a passion for mentoring others in the field.`,
        experience: `Over ${Math.floor(Math.random() * 15) + 3} years of experience in ${randomSkill.name}, working with organizations such as ${getRandomItem(['F1Soft', 'Leapfrog', 'Deerwalk', 'Cotiviti', 'Yomari', 'Verisk', 'Infodev', 'Fusemachine', 'Kaamaa', 'Sastodeal'])}.`,
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
