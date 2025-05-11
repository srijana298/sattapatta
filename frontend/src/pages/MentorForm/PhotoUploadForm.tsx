import { useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useMentorForm } from '../../components/MentorFormContext';
import { useMutation, useQuery } from 'react-query';
import { getPicture, uploadPicture } from '../../services/users';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const users = [
  'https://randomuser.me/api/portraits/women/14.jpg',
  'https://randomuser.me/api/portraits/men/20.jpg',
  'https://randomuser.me/api/portraits/men/30.jpg',
  'https://randomuser.me/api/portraits/women/20.jpg'
];

const PhotoUploadForm = () => {
  const { currentUser } = useAuth();
  const { aboutUser } = useMentorForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryFn: getPicture
  });

  const { mutateAsync } = useMutation({
    mutationFn: uploadPicture,
    onSuccess: () => {
      refetch();
    }
  });

  const uploadImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await mutateAsync(formData);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="max-w-lg mx-auto px-4 py-8 font-sans">
      <h1 className="text-4xl font-bold mb-3">Profile photo</h1>
      <p className="text-xl mb-6">Choose a photo that will help learners get to know you.</p>
      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <div className="flex items-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 rounded-sm object-cover mr-6"
            />
          ) : data?.profilePhotoUrl ? (
            <img
              src={'http://localhost:3000/' + data?.profilePhotoUrl}
              alt="Selected profile"
              className="w-24 h-24 rounded-sm object-cover mr-6"
            />
          ) : null}{' '}
          {/* {selectedImage && (
          )} */}
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold mr-2">{currentUser?.fullname}</h2>
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
              <span>Teaches in the field of {aboutUser?.category}</span>
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
              <span>Skilled in {aboutUser?.skill}</span>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        id="photoUpload"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // for preview
          }
        }}
      />{' '}
      <button
        className="border-2 border-gray-800 text-gray-800 font-medium py-3 px-4 rounded-md w-full mb-10"
        onClick={() => document.getElementById('photoUpload')?.click()}
      >
        Upload new photo
      </button>
      <h2 className="text-3xl font-bold mb-6">What your photo needs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {users.map((src, index) => (
          <div key={index} className="bg-gray-50 rounded-sm p-1">
            <img
              src={src}
              alt={`Profile example ${index + 1}`}
              className="w-full h-36 object-cover rounded-sm cursor-pointer"
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
      <div className="pt-8">
        <button
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          type="button"
          onClick={uploadImage}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
