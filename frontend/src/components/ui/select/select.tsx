import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  defaultValue: string;
  disabled?: boolean;
  disabledValue?: string;
  showRemoveButton?: boolean;
  onChange?: (value: Option) => void;
}

export const Select = ({
  label,
  options,
  defaultValue,
  disabled = false,
  disabledValue = '',
  showRemoveButton = false,
  onChange = () => {}
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onChange(option);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (options.length > 0) {
      setSelectedOption(options[0].label);
      onChange(options[0]);
    }
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        className={`border rounded-lg p-3 flex flex-col cursor-pointer ${disabled ? 'bg-gray-50' : 'hover:border-gray-800'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <label className="text-xs text-gray-500 mb-1">{label}</label>
        <div className="flex justify-between items-center">
          <span className="font-medium">{selectedOption}</span>
          <div className="flex items-center">
            {showRemoveButton && selectedOption === disabledValue && (
              <button className="text-gray-400 hover:text-gray-600 mr-2" onClick={handleRemove}>
                ×
              </button>
            )}
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer hover:bg-orange-50 ${
                option.value === selectedOption ? 'bg-orange-50 text-orange-600 font-medium' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
