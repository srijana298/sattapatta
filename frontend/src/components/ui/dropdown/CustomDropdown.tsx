import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// export default function SortDropdownDemo() {
//   return (
//     <div className="max-w-md mx-auto p-6 space-y-6 bg-gray-100">
//       <h2 className="text-2xl font-bold text-gray-900 mb-4">Sort Dropdown Component</h2>

//       <div className="bg-white p-4 rounded">
//         <SortDropdown
//           options={[
//             { id: 'top-picks', label: 'Our top picks' },
//             { id: 'popularity', label: 'Popularity' },
//             { id: 'price-high', label: 'Price: highest first' },
//             { id: 'price-low', label: 'Price: lowest first' },
//             { id: 'reviews', label: 'Number of reviews' },
//             { id: 'rating', label: 'Best rating' }
//           ]}
//           defaultValue="popularity"
//           onChange={(value) => console.log('Selected:', value)}
//         />
//       </div>
//     </div>
//   );
// }

type SortOption = {
  id: string;
  label: string;
};

type SortDropdownProps = {
  options: SortOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const CustomDropdown = ({
  options,
  defaultValue = '',
  onChange = () => {},
  className = ''
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption | null>(
    options.find((opt) => opt.id === defaultValue) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.id);
  };

  return (
    <div className={`relative`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        className={`w-full flex items-center justify-between px-6 py-2 text-gray-700 bg-white border gap-5 ${className} ${
          isOpen ? 'border-gray-800' : 'border-gray-300'
        } rounded-lg hover:bg-gray-50 focus:outline-none transition-all duration-150`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">
          Sort by: {selectedOption?.label || 'Select option'}
        </span>
        <ChevronDown
          size={24}
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
          role="listbox"
        >
          <div className="py-2">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={selectedOption?.id === option.id}
              >
                <span className="text-lg">{option.label}</span>
                {selectedOption?.id === option.id && <Check size={24} className="text-black" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
