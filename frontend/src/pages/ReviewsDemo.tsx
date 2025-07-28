import React, { useState } from 'react';
import MentorReviews from '../components/MentorReviews';

const ReviewsDemo: React.FC = () => {
  const [mentorId, setMentorId] = useState<number | undefined>(undefined);
  return (
    <div className="container mx-auto py-8 px-4">
      <MentorReviews mentorId={showAllReviews ? undefined : mentorId} />
    </div>
  );
};

export default ReviewsDemo;
