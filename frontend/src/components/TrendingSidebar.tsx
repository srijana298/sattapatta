const TrendingSidebar = ({ popularData, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 sticky top-4 transition-shadow hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">People are also looking for</h2>

      {isLoading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-5">
            <div className="relative w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
              <img
                src="/api/placeholder/120/120"
                alt="People exchanging skills"
                className="rounded-full"
              />
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-orange-200 to-transparent opacity-60"></div>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {popularData?.popularSkills?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-2 hover:bg-orange-50 rounded-md transition-colors duration-300"
              >
                <span className="text-gray-700 hover:text-orange-600 cursor-pointer">
                  {item.name}
                </span>
                <span className="text-sm text-gray-400">{item.count || ''}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-4">Popular Categories</h3>
            <div className="flex justify-center mb-5">
              <div className="relative w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                <img src="/api/placeholder/100/100" alt="Categories" className="rounded" />
                <div className="absolute inset-0 rounded bg-linear-to-br from-gray-200 to-transparent opacity-60"></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularData?.popularCategories?.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 px-4 rounded-lg mt-6 font-medium transition-colors duration-300 flex items-center justify-center">
            Create Your Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendingSidebar;
