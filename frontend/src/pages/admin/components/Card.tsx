import React from 'react';
import { cn } from '../lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className 
}: CardProps) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  children, 
  className 
}: CardProps) => {
  return (
    <h3 className={cn("text-lg font-semibold leading-none", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ 
  children, 
  className 
}: CardProps) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
};

export const CardContent = ({ 
  children, 
  className 
}: CardProps) => {
  return (
    <div className={cn("pt-0", className)}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className 
}: CardProps) => {
  return (
    <div className={cn("flex items-center pt-4", className)}>
      {children}
    </div>
  );
};

export default Card;