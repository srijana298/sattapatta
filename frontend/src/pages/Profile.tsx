import { Star, Play, Info, MessageSquare, Smile, Gauge, ClipboardCheck, Code } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function TutorProfile() {
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white pb-10 flex flex-col md:flex-row gap-6 px-6 mt-4">
        <div className="md:flex-1">
          <div className="flex items-start gap-4 mb-10 pt-6">
            <div className="w-24 h-24 rounded overflow-hidden relative">
              <img
                src="/api/placeholder/96/96"
                alt="David"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">David R.</h1>
                <span className="text-2xl">🇪🇸</span>
              </div>
              <p className="text-gray-700 mb-4">
                Senior Software Engineer with 10 years of experience
              </p>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Code size={18} />
                </div>
                <div>
                  <div className="font-medium">Teaches</div>
                  <div className="text-gray-600">JavaScript, React, Node.js</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-2">About me</h2>
            <p className="text-gray-700 mb-1">
              Hello, my name is David! I'm thrilled to share my journey with you. As a seasoned
              software developer with a decade of experience across various tech stacks, I
              specialize in modern JavaScript frameworks, particularly React and Node.js. My career
              has taken me through startups in Barcelona, enterprise companies in Dublin, and now
              tech giants in Sydney, Australia. I've guided junior developers, mentored bootcamp
              graduates, and helped experienced developers level up their skills throughout my
              career.
            </p>
            <button className="text-blue-600 font-medium">Show more</button>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">JavaScript</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">TypeScript</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">React</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">Node.js</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">Next.js</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">Express</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">MongoDB</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">PostgreSQL</div>
              <div className="bg-gray-100 py-1 px-3 rounded-md text-sm">AWS</div>
            </div>
          </div>

          {/* Lesson Rating Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Lesson rating</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Mentorship</div>
                </div>
                <Smile className="text-gray-600" size={24} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Code Quality</div>
                </div>
                <MessageSquare className="text-gray-600" size={24} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Progress</div>
                </div>
                <Gauge className="text-gray-600" size={24} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Preparation</div>
                </div>
                <ClipboardCheck className="text-gray-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4 gap-1 text-gray-600 text-sm">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
              <span>Based on 3 anonymous student reviews</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 font-medium text-sm ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`py-3 px-4 font-medium text-sm ${activeTab === 'education' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                Education & Qualifications
              </button>
              <button
                onClick={() => setActiveTab('conversation')}
                className={`py-3 px-4 font-medium text-sm ${activeTab === 'conversation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                Conversation Topics
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'reviews' && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  What my students say
                  <Info size={16} className="ml-1 text-gray-400" />
                </h2>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="text-4xl font-bold">5</div>
                <div className="text-2xl">⭐</div>
              </div>

              <div className="text-sm text-gray-600 mb-6">Based on 3 student reviews</div>

              {/* Review 1 */}
              <div className="mb-8 border-b pb-6">
                <div className="flex gap-4 mb-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src="/api/placeholder/40/40"
                      alt="Marco"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Marco</div>
                    <div className="text-gray-500 text-sm">April 22, 2025</div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-black fill-black" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">
                  David helped me solve a complex React state management issue. He explained
                  everything clearly and showed me best practices that made my code much more
                  maintainable.
                </p>
                <button className="flex items-center gap-1 text-gray-600 text-sm">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                  Show original
                </button>
              </div>

              {/* Review 2 */}
              <div className="mb-8 border-b pb-6">
                <div className="flex gap-4 mb-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src="/api/placeholder/40/40"
                      alt="Jordi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Jordi</div>
                    <div className="text-gray-500 text-sm">March 18, 2025</div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-black fill-black" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">
                  Super professional! David tailored the lessons to my specific Node.js backend
                  needs. The custom project we built helped me understand microservices
                  architecture.
                </p>
                <button className="flex items-center gap-1 text-gray-600 text-sm">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                  Show original
                </button>
              </div>

              {/* Review 3 */}
              <div className="mb-8">
                <div className="flex gap-4 mb-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img
                      src="/api/placeholder/40/40"
                      alt="Sandra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Sandra</div>
                    <div className="text-gray-500 text-sm">October 23, 2024</div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-black fill-black" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">
                  David helped me understand TypeScript fundamentals and how to integrate it into my
                  React applications. He's very patient and adapts his teaching to your knowledge
                  level. I was able to confidently refactor my entire project after our sessions.
                </p>
                <button className="flex items-center gap-1 text-gray-600 text-sm">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                  Show original
                </button>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-6">Education & Qualifications</h2>

              {/* Education */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Education</h3>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">Master's in Computer Science</div>
                  <div className="text-gray-600">Technical University of Madrid • 2012-2014</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Specialized in Software Engineering
                  </div>
                </div>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">Bachelor's in Computer Engineering</div>
                  <div className="text-gray-600">University of Barcelona • 2008-2012</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Certifications</h3>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">AWS Certified Solutions Architect</div>
                  <div className="text-gray-600">Amazon Web Services • 2023</div>
                </div>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">MongoDB Certified Developer</div>
                  <div className="text-gray-600">MongoDB Inc. • 2021</div>
                </div>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">React Advanced Certification</div>
                  <div className="text-gray-600">Meta • 2022</div>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="font-medium text-lg mb-2">Work Experience</h3>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">Senior Software Engineer</div>
                  <div className="text-gray-600">Tech Sydney • 2021-Present</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Leading the frontend team building React applications
                  </div>
                </div>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">Full Stack Developer</div>
                  <div className="text-gray-600">Dublin Tech • 2017-2021</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Worked on Node.js and React applications
                  </div>
                </div>
                <div className="mb-4 border-l-2 border-gray-200 pl-4">
                  <div className="font-medium">Frontend Developer</div>
                  <div className="text-gray-600">Barcelona Startup • 2014-2017</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conversation' && (
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4">Topics I can help with</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code size={18} className="text-blue-500" />
                    JavaScript Fundamentals
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    ES6+, closures, prototypes, promises, async/await
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code size={18} className="text-blue-500" />
                    React Ecosystem
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Hooks, context, Redux, React Query, Next.js
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code size={18} className="text-blue-500" />
                    Backend Development
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Node.js, Express, RESTful APIs, GraphQL
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code size={18} className="text-blue-500" />
                    Database Design
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    MongoDB, PostgreSQL, data modeling, querying
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code size={18} className="text-blue-500" />
                    DevOps & Deployment
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">Docker, CI/CD, AWS, Netlify, Vercel</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2">
                    <Code size={18} className="text-blue-500" />
                    Testing Strategies
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Jest, React Testing Library, Cypress, TDD
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side UI */}
        <div className="md:w-80">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            {/* Video Preview */}
            <div className="relative rounded-lg overflow-hidden mb-6 h-48 bg-gray-100">
              <div className="absolute bottom-4 right-4">
                <div className="bg-pink-300 rounded-full p-4">
                  <Play size={24} className="text-black" />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between items-start mb-6 px-2">
              <div className="text-center">
                <div className="flex items-center text-2xl font-bold">
                  <span className="text-black">★</span>
                  <span>5</span>
                </div>
                <div className="text-gray-500">3 reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">97</div>
                <div className="text-gray-500">lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$45</div>
                <div className="text-gray-500">50-min lesson</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-black py-3 px-4 rounded-full font-medium flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Book trial lesson
              </button>

              <button className="w-full bg-white hover:bg-gray-50 text-black py-3 px-4 rounded-full font-medium border flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
