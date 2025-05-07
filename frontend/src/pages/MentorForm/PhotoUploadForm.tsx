import { useState, useEffect } from 'react';

const PhotoUploadForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=4')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        // Set the first user as selected by default
        setSelectedUser(data.results[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching random users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 font-sans">
      <h1 className="text-4xl font-bold mb-3">Profile photo</h1>

      <p className="text-xl mb-6">Choose a photo that will help learners get to know you.</p>

      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <div className="flex items-center">
          {selectedUser && (
            <img
              src={selectedUser.picture.large}
              alt="Selected profile"
              className="w-24 h-24 rounded-sm object-cover mr-6"
            />
          )}

          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold mr-2">Alexander J.</h2>
              <img
                src="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/np.svg"
                alt="Nepal Flag"
                className="w-6 h-4 object-cover"
              />
            </div>

            <div className="flex items-center mt-3 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>Teaches English lessons</span>
            </div>

            <div className="flex items-center mt-3 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span>Speaks Afrikaans (Native), English (B2)</span>
            </div>
          </div>
        </div>
      </div>

      <button className="border-2 border-gray-800 text-gray-800 font-medium py-3 px-4 rounded-md w-full mb-10">
        Upload new photo
      </button>

      <h2 className="text-3xl font-bold mb-6">What your photo needs</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {users.map((user, index) => (
          <div key={index} className="bg-gray-50 rounded-sm p-1">
            <img
              src={user.picture.large}
              alt={`Profile example ${index + 1}`}
              className="w-full h-36 object-cover rounded-sm cursor-pointer"
              onClick={() => setSelectedUser(user)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-7 h-7 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-lg">You should be facing forward</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-center w-7 h-7 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-lg">Frame your head and shoulders</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-center w-7 h-7 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-lg">You should be centered and upright</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
