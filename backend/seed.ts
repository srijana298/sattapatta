import 'reflect-metadata';
import { Users } from './src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import AppDataSource from './src/datasource';
import { Listings } from './src/listings/entities/listing.entity';
import { Skill } from './src/skills/entities/skill.entity';
import { Category } from './src/categories/entities/category.entity';

// Type definitions
type GeneratorFunction = () => string;
type TemplateFunction1 = (param1: string) => string;
type TemplateFunction2 = (param1: string, param2: string) => string;
type TemplateFunction = TemplateFunction1 | TemplateFunction2 | (() => string);
type NoisyTemplateFunction =
  | TemplateFunction1
  | TemplateFunction2
  | (() => string);

// Helper function to generate unique skills and categories
function generateUniqueItems(
  count: number,
  generator: GeneratorFunction,
  existingNames: Set<string> = new Set(),
): string[] {
  const items: string[] = [];
  while (items.length < count) {
    const name = generator();
    if (!existingNames.has(name)) {
      existingNames.add(name);
      items.push(name);
    }
  }
  return items;
}

// Category generators
const categoryTypes: GeneratorFunction[] = [
  // Main categories
  () => `${faker.commerce.department()}`,
  () => `${faker.word.adjective()} Studies`,
  () => `${faker.science.chemicalElement().name} Sciences`,
  () => `${faker.commerce.productAdjective()} Arts`,

  // Specialize categories
  () => `Digital ${faker.commerce.department()}`,
  () => `Advanced ${faker.commerce.product()}`,
  () => `${faker.company.buzzNoun()} Management`,
  () => `${faker.company.buzzAdjective()} Skills`,
  () => `${faker.commerce.productAdjective()} Techniques`,
  () => `${faker.music.genre()} Education`,
];

// Skill generators
const skillTypes: GeneratorFunction[] = [
  // Technical skills
  () => `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
  () => `${faker.hacker.verb()} ${faker.hacker.noun()}`,
  () => `${faker.commerce.productAdjective()} Programming`,

  // Creative skills
  () => `${faker.commerce.productAdjective()} Photography`,
  () => `${faker.music.genre()} Composition`,
  () => `${faker.commerce.productAdjective()} Design`,

  // Languages
  () => `${faker.location.country()} Language`,

  // Business skills
  () => `${faker.company.buzzAdjective()} Marketing`,
  () => `${faker.company.buzzVerb()} Management`,

  // Miscellaneous skills
  () => `Professional ${faker.person.jobType()}`,
  () => `${faker.commerce.productAdjective()} Cooking`,
  () => `${faker.vehicle.type()} Maintenance`,
  () => `${faker.commerce.productAdjective()} Fitness`,
];

// Titles for listings
const titleTemplates: TemplateFunction2[] = [
  // Original templates
  (offer: string, request: string) => `I can teach ${offer}`,
  (offer: string, request: string) => `Looking to swap my ${offer} skills`,
  (offer: string, request: string) =>
    `Happy to mentor in ${offer} — in return, I'd love to learn ${request}.`,
  (offer: string, request: string) =>
    `Can offer ${offer} tips and tricks, seeking guidance in ${request}!`,

  // New templates
  (offer: string, request: string) =>
    `${offer} expert seeking ${request} lessons`,
  (offer: string, request: string) => `Trade: My ${offer} for your ${request}`,
  (offer: string, request: string) =>
    `${offer} skills to share, want to learn ${request}`,
  (offer: string, request: string) =>
    `Experienced in ${offer}, beginner at ${request}`,
  (offer: string, request: string) => `Skill exchange: ${offer} ↔ ${request}`,
  (offer: string, request: string) =>
    `${offer} mentor looking for ${request} guidance`,
  (offer: string, request: string) =>
    `Let's learn together: my ${offer} for your ${request}`,
  (offer: string, request: string) => `${offer} pro seeking ${request} tutor`,
  (offer: string, request: string) =>
    `Let me help with ${offer}, you help with ${request}`,
  (offer: string, request: string) =>
    `Knowledge exchange: ${offer} for ${request}`,
];

// Duration options for listings
const durationTemplates: string[] = [
  // Original templates
  '1-2 hours daily',
  '1-2 hours weekly',
  '1-2 hours monthly',

  // New templates
  '30 minutes twice a week',
  '1 hour every weekend',
  '3 hours weekly',
  '45 minutes, three times a week',
  'Flexible, 2-3 hours weekly',
  '4 hours monthly',
  'Twice monthly, 2 hours each',
  'One intensive weekend session',
  '20-30 minutes daily',
  'Bi-weekly 90-minute sessions',
  'Once a week, duration flexible',
  '2-3 hours every two weeks',
];

// Descriptions for listings
const sentenceTemplates: TemplateFunction2[] = [
  // Original templates
  (offer: string, request: string) =>
    `I can teach ${offer} if someone helps me with ${request}.`,
  (offer: string, request: string) =>
    `Looking to swap my ${offer} skills for some lessons in ${request}.`,
  (offer: string, request: string) =>
    `Happy to mentor in ${offer} — in return, I'd love to learn ${request}.`,
  (offer: string, request: string) =>
    `Can offer ${offer} tips and tricks, seeking guidance in ${request}!`,

  // New templates
  (offer: string, request: string) =>
    `I've been practicing ${offer} for years and would love to share my knowledge while picking up some ${request} skills.`,
  (offer: string, request: string) =>
    `Expert in ${offer} looking to expand my horizons with ${request} - let's help each other grow!`,
  (offer: string, request: string) =>
    `I believe in the power of skill exchange - my ${offer} expertise for your ${request} knowledge.`,
  (offer: string, request: string) =>
    `Passionate about teaching ${offer} and equally enthusiastic about learning ${request}.`,
  (offer: string, request: string) =>
    `Let's create a win-win situation: I'll share everything I know about ${offer} while you teach me ${request}.`,
  (offer: string, request: string) =>
    `I've mastered ${offer} and now want to challenge myself with ${request} - can you help?`,
  (offer: string, request: string) =>
    `Ready to exchange skills? I'm proficient in ${offer} and eager to learn ${request}.`,
  (offer: string, request: string) =>
    `My journey with ${offer} has been rewarding, and I'm ready to start a new one with ${request}.`,
  (offer: string, request: string) =>
    `${offer} has been my passion for years - would love to trade lessons for ${request} instruction.`,
  (offer: string, request: string) =>
    `Seeking a mutually beneficial arrangement: my ${offer} knowledge for your ${request} expertise.`,
  (offer: string, request: string) =>
    `I can guide you through the intricacies of ${offer} while you introduce me to ${request}.`,
  (offer: string, request: string) =>
    `Let's build skills together - I'll share my ${offer} techniques while learning your ${request} methods.`,
];

// "Bad data" templates that break the clear exchange pattern
const noisyDescriptionTemplates: NoisyTemplateFunction[] = [
  (offer: string): string =>
    `I'm really good at ${offer} but not sure what I want to learn.`,
  (request: string): string =>
    `I'm desperately seeking to learn ${request}, open to any exchange.`,
  (offer: string, request: string): string =>
    `${offer} expert available. By the way, someday I'd like to learn ${request}.`,
  (offer: string, request: string): string =>
    `Can teach ${offer} or ${request}, flexible with what I learn in return.`,
  (offer: string): string => `Free ${offer} lessons for anyone interested!`,
  (request: string): string =>
    `Looking for ${request} tutoring, willing to pay or barter.`,
  (): string =>
    `Open to various skill exchanges, contact me to discuss possibilities.`,
  (offer: string, request: string): string =>
    `Primarily offering ${offer}, but also know ${request}. Let's talk!`,
];

// Noise generation functions
const generateNoisySkillRequests = (
  skill1: Skill,
  skill2: Skill,
  skill3: Skill,
): string => {
  const templates: (() => string)[] = [
    () => `${skill1.name} or maybe ${skill2.name}`,
    () => `either ${skill1.name} or ${skill3.name}`,
    () => `${skill1.name}, ${skill2.name}, or ${skill3.name}`,
    () => `primarily ${skill1.name}, but also interested in ${skill2.name}`,
  ];
  return faker.helpers.arrayElement(templates)();
};

// Interface for createListing parameters
interface CreateListingParams {
  user: Users;
  offeringSkill: Skill;
  requestedSkill: Skill;
  category: Category;
  isNoisy?: boolean;
}

// Helper to create listings with potentially "noisy" data
const createListing = async ({
  user,
  offeringSkill,
  requestedSkill,
  category,
  isNoisy = false,
}: CreateListingParams): Promise<Listings> => {
  const listing = new Listings();

  if (isNoisy) {
    // 30% chance to have a completely different approach
    if (Math.random() < 0.3) {
      const noisyTemplate = faker.helpers.arrayElement<NoisyTemplateFunction>(
        noisyDescriptionTemplates,
      );

      // Check function arity to determine how to call it
      if (noisyTemplate.length === 0) {
        listing.description = (noisyTemplate as () => string)();
      } else if (noisyTemplate.length === 1) {
        listing.description = (noisyTemplate as TemplateFunction1)(
          offeringSkill.name,
        );
      } else {
        listing.description = (noisyTemplate as TemplateFunction2)(
          offeringSkill.name,
          requestedSkill.name,
        );
      }

      // Sometimes make the title vague or not clearly matching the offering/requesting pattern
      if (Math.random() < 0.5) {
        listing.title = `Looking to connect over ${offeringSkill.name}`;
      } else {
        listing.title = faker.helpers.arrayElement<string>([
          `Skill sharing opportunity`,
          `Let's learn together!`,
          `${offeringSkill.name} enthusiast here`,
          `Teaching and learning journey`,
        ]);
      }
    } else {
      // Normal title but slightly ambiguous description
      listing.title = faker.helpers.arrayElement<TemplateFunction2>(
        titleTemplates,
      )(offeringSkill.name, requestedSkill.name);
      listing.description = faker.helpers.arrayElement<TemplateFunction2>(
        sentenceTemplates,
      )(offeringSkill.name, requestedSkill.name);

      // Add some noise to the description
      if (Math.random() < 0.4) {
        listing.description += ` Also, I'm somewhat familiar with other topics like ${faker.hacker.noun()} and ${faker.music.genre()}.`;
      }
    }

    // Randomize duration (sometimes leaving it empty)
    if (Math.random() < 0.15) {
      listing.duration = '';
    } else if (Math.random() < 0.2) {
      listing.duration = `Variable, depends on our schedules`;
    } else {
      listing.duration = faker.helpers.arrayElement<string>(durationTemplates);
    }

    // Occasionally use invalid locations
    if (Math.random() < 0.1) {
      listing.location = 'Remote only';
    } else if (Math.random() < 0.05) {
      listing.location = '';
    } else {
      listing.location = faker.location.city();
    }
  } else {
    // Standard clean listing
    listing.title = faker.helpers.arrayElement<TemplateFunction2>(
      titleTemplates,
    )(offeringSkill.name, requestedSkill.name);
    listing.description = faker.helpers.arrayElement<TemplateFunction2>(
      sentenceTemplates,
    )(offeringSkill.name, requestedSkill.name);
    listing.duration = faker.helpers.arrayElement<string>(durationTemplates);
    listing.location = faker.location.city();
  }

  // Set standard fields
  listing.user = user;
  listing.category = category;
  listing.offering_skill = offeringSkill;
  listing.requested_skill = requestedSkill;

  return await AppDataSource.manager.save(listing);
};

// Helper function to generate a unique email
const generateUniqueEmail = (existingEmails: Set<string>): string => {
  let email: string;
  do {
    email = faker.internet.email();
  } while (existingEmails.has(email));

  existingEmails.add(email);
  return email;
};

async function seed(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Database connected.');

    // Create 20 categories
    const existingCategoryNames: Set<string> = new Set();
    const categoryNames: string[] = generateUniqueItems(
      20,
      (): string => {
        const generator =
          faker.helpers.arrayElement<GeneratorFunction>(categoryTypes);
        return generator();
      },
      existingCategoryNames,
    );

    for (const name of categoryNames) {
      const category = new Category();
      category.name = name;
      await AppDataSource.manager.save(category);
    }
    console.log('Created 20 categories');

    // Create 20 skills
    const existingSkillNames: Set<string> = new Set();
    const skillNames: string[] = generateUniqueItems(
      20,
      (): string => {
        const generator =
          faker.helpers.arrayElement<GeneratorFunction>(skillTypes);
        return generator();
      },
      existingSkillNames,
    );

    for (const name of skillNames) {
      const skill = new Skill();
      skill.name = name;
      await AppDataSource.manager.save(skill);
    }
    console.log('Created 20 skills');

    // Fetch all categories and skills
    const skills: Skill[] = await AppDataSource.manager.find(Skill);
    const categories: Category[] = await AppDataSource.manager.find(Category);

    // Track existing emails to ensure uniqueness
    const existingEmails: Set<string> = new Set();

    // Create 500 listing pairs with their users
    for (let i = 0; i < 200; i++) {
      // Select skills and categories
      const skillA: Skill = faker.helpers.arrayElement<Skill>(skills);
      let skillB: Skill = faker.helpers.arrayElement<Skill>(skills);

      while (skillA.id === skillB.id) {
        skillB = faker.helpers.arrayElement<Skill>(skills);
      }

      const skillC: Skill = faker.helpers.arrayElement<Skill>(
        skills.filter((s: Skill) => s.id !== skillA.id && s.id !== skillB.id),
      );

      const categoryA: Category =
        faker.helpers.arrayElement<Category>(categories);
      const categoryB: Category =
        faker.helpers.arrayElement<Category>(categories);

      // First user: offers A, requests B
      const userA = new Users();
      userA.fullname = faker.person.fullName();
      userA.email = generateUniqueEmail(existingEmails);
      userA.password = bcrypt.hashSync('password', 10);
      await AppDataSource.manager.save(userA);

      // Second user: offers B, requests A
      const userB = new Users();
      userB.fullname = faker.person.fullName();
      userB.email = generateUniqueEmail(existingEmails);
      userB.password = bcrypt.hashSync('password', 10);
      await AppDataSource.manager.save(userB);

      // Determine if these listings should have "noisy" data
      const isNoisyA: boolean = Math.random() < 0.2; // 20% chance for noisy data
      const isNoisyB: boolean = Math.random() < 0.2;

      // Create listings with potential noise
      await createListing({
        user: userA,
        offeringSkill: skillA,
        requestedSkill: skillB,
        category: categoryA,
        isNoisy: isNoisyA,
      });

      await createListing({
        user: userB,
        offeringSkill: skillB,
        requestedSkill: skillA,
        category: categoryB,
        isNoisy: isNoisyB,
      });

      // Create some one-sided listings that don't have matches (about 15% of the total)
      if (Math.random() < 0.15) {
        // Random user who only offers without matching request
        const randomUser = new Users();
        randomUser.fullname = faker.person.fullName();
        randomUser.email = generateUniqueEmail(existingEmails);
        randomUser.password = bcrypt.hashSync('password', 10);
        await AppDataSource.manager.save(randomUser);

        // Pick a random skill and category
        const randomSkill: Skill = faker.helpers.arrayElement<Skill>(skills);
        const randomRequestSkill: Skill = faker.helpers.arrayElement<Skill>(
          skills.filter((s: Skill) => s.id !== randomSkill.id),
        );
        const randomCategory: Category =
          faker.helpers.arrayElement<Category>(categories);

        // Create listing with high chance of noise
        await createListing({
          user: randomUser,
          offeringSkill: randomSkill,
          requestedSkill: randomRequestSkill,
          category: randomCategory,
          isNoisy: Math.random() < 0.6,
        });
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error: Error) => console.error('Fatal error:', error));
