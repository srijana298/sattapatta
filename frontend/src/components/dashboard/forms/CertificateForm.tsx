import React, { useState, useEffect } from 'react';
import { useUpdateCertificates, useDeleteCertificate } from '../../../lib/hooks';
import { Trash2, PlusCircle } from 'lucide-react';
import { MentorProfile } from '../../../services/users';

interface CertificateFormProps {
  mentor: MentorProfile | undefined;
  onClose: () => void;
}

interface Certificate {
  subject: string;
  name: string;
  description: string;
  issuedBy: string;
  start_year: string;
  end_year: string;
  id?: number;
}

const emptyCertificate: Certificate = {
  subject: '',
  name: '',
  description: '',
  issuedBy: '',
  start_year: '',
  end_year: ''
};

const CertificateForm: React.FC<CertificateFormProps> = ({ mentor, onClose }) => {
  const [hasTeachingCertificate, setHasTeachingCertificate] = useState<boolean>(mentor?.has_certificate || false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const updateCertificatesMutation = useUpdateCertificates();
  const deleteCertificateMutation = useDeleteCertificate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with existing data
  useEffect(() => {
    if (mentor?.certificates && mentor.certificates.length > 0) {
      setCertificates(mentor.certificates);
    } else {
      setCertificates([{ ...emptyCertificate }]);
    }
    setHasTeachingCertificate(mentor?.has_certificate || false);
  }, [mentor]);

  const handleAddCertificate = () => {
    setCertificates([...certificates, { ...emptyCertificate }]);
  };

  const handleRemoveCertificate = async (index: number) => {
    const certificate = certificates[index];

    // If certificate has an ID, it exists in the database and needs to be deleted
    if (certificate.id) {
      try {
        await deleteCertificateMutation.mutateAsync(certificate.id);
      } catch (err) {
        setError("Failed to delete certificate");
        return;
      }
    }

    const newCertificates = [...certificates];
    newCertificates.splice(index, 1);
    setCertificates(newCertificates.length ? newCertificates : [{ ...emptyCertificate }]);
  };

  const handleChange = (
    index: number,
    field: keyof Certificate,
    value: string
  ) => {
    const newCertificates = [...certificates];
    newCertificates[index][field] = value;
    setCertificates(newCertificates);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      const isValid = certificates.every(
        cert =>
          cert.subject.trim() !== '' &&
          cert.name.trim() !== '' &&
          cert.description.trim() !== '' &&
          cert.issuedBy.trim() !== '' &&
          cert.start_year.trim() !== '' &&
          cert.end_year.trim() !== ''
      );

      if (!isValid) {
        throw new Error("Please fill in all certificate fields");
      }

      await updateCertificatesMutation.mutateAsync({
        hasTeachingCertificate,
        certificates
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update certificates");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="has_certificate"
            checked={hasTeachingCertificate}
            onChange={(e) => setHasTeachingCertificate(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="has_certificate" className="ml-2 text-sm text-gray-700">
            I have certifications I want to showcase
          </label>
        </div>

        {hasTeachingCertificate && (
          <div className="space-y-6">
            {certificates.map((certificate, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium text-gray-700">Certificate #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertificate(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={certificates.length === 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      id={`name-${index}`}
                      value={certificate.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor={`subject-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id={`subject-${index}`}
                      value={certificate.subject}
                      onChange={(e) => handleChange(index, 'subject', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor={`issuedBy-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Issued By
                    </label>
                    <input
                      type="text"
                      id={`issuedBy-${index}`}
                      value={certificate.issuedBy}
                      onChange={(e) => handleChange(index, 'issuedBy', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`start_year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Issue Year
                      </label>
                      <input
                        type="text"
                        id={`start_year-${index}`}
                        value={certificate.start_year}
                        onChange={(e) => handleChange(index, 'start_year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                        placeholder="YYYY"
                        maxLength={4}
                      />
                    </div>

                    <div>
                      <label htmlFor={`end_year-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Year
                      </label>
                      <input
                        type="text"
                        id={`end_year-${index}`}
                        value={certificate.end_year}
                        onChange={(e) => handleChange(index, 'end_year', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                        placeholder="YYYY"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id={`description-${index}`}
                    value={certificate.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    required
                  ></textarea>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleAddCertificate}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Another Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default CertificateForm;
