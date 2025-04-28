const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share Your Skills, Grow Together
            </h1>
            <p className="text-lg mb-6 max-w-lg">
              SattaPatta connects people who want to exchange skills and knowledge. Teach what you
              know, learn what you don't.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Create Your Listing
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300">
                How It Works
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-orange-400 rounded-full opacity-20"></div>
              <div className="relative z-10 bg-white p-1 rounded-lg shadow-lg transform rotate-3">
                <img
                  src="/api/placeholder/400/300"
                  alt="People exchanging skills"
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-red-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
