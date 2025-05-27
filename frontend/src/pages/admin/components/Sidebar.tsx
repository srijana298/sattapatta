import { NavLink } from 'react-router-dom';
import {  GraduationCap, LayoutDashboard, Menu, Users, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobile && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobile(false)}
        />
      )}

      {/* Mobile toggle */}
      <button
        onClick={toggleMobile}
        className="fixed bottom-4 right-4 lg:hidden z-50 rounded-full p-3 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      >
        {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-card border-r border-border h-screen z-50 transition-all duration-300 ease-in-out',
          expanded ? 'w-64' : 'w-20',
          mobile ? 'fixed inset-y-0 left-0' : 'relative',
          !mobile && !expanded && 'hidden sm:block'
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              <GraduationCap className="h-6 w-6" />
            </div>
            {expanded && <h1 className="text-xl font-bold">MentorAdmin</h1>}
          </div>

          <button
            onClick={toggleSidebar}
            className="hidden sm:flex p-1.5 rounded-md hover:bg-secondary transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4">
          <div className="space-y-1">
            <NavLink
              to="/admin/"
              className={({ isActive }) => cn('sidebar-item', isActive && 'active')}
              end
            >
              <LayoutDashboard className="h-5 w-5" />
              {expanded && <span>Dashboard</span>}
            </NavLink>

            <NavLink
              to="/admin/mentors"
              className={({ isActive }) => cn('sidebar-item', isActive && 'active')}
            >
              <Users className="h-5 w-5" />
              {expanded && <span>Mentors</span>}
            </NavLink>
          </div>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
