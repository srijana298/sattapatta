import React from 'react';
import { cn, getStatusColor } from '../lib/utils';

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;