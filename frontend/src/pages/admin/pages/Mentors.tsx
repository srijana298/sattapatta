import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Card from '../components/Card';
import Button from '../components/Button';
import { cn, formatDate } from '../lib/utils';
import { useMentors } from '../../../lib/hooks';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const { data: mentors, isLoading } = useMentors();

  const filteredMentors = useMemo(() => {
    return mentors?.filter((mentor) => {
      const matchesSearch =
        mentor.user?.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.headline?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || mentor.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [mentors, searchQuery, statusFilter]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h1 className="text-3xl font-bold">Mentors</h1>
        <p className="text-muted-foreground mt-1">Review and manage mentor applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search mentors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 w-full pl-10 pr-4 py-2 text-sm rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
            >
              <span>Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            {isStatusOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-card border border-border z-10">
                <div className="py-1">
                  {(['all', 'pending', 'approved', 'rejected'] as FilterType[]).map((status) => (
                    <button
                      key={status}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors',
                        statusFilter === status ? 'bg-primary/10 text-primary font-medium' : ''
                      )}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsStatusOpen(false);
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters - Hidden by default */}
      {isFilterOpen && (
        <Card className="p-4 animate-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select className="w-full bg-muted/50 rounded-md border border-border p-2 text-sm">
                <option value="">All Categories</option>
                <option value="1">Academic</option>
                <option value="2">Professional</option>
                <option value="3">Creative</option>
                <option value="4">Technical</option>
                <option value="5">Personal Development</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Skill</label>
              <select className="w-full bg-muted/50 rounded-md border border-border p-2 text-sm">
                <option value="">All Skills</option>
                <option value="1">Mathematics</option>
                <option value="2">Physics</option>
                <option value="3">Programming</option>
                <option value="4">Design</option>
                <option value="5">Marketing</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Country</label>
              <select className="w-full bg-muted/50 rounded-md border border-border p-2 text-sm">
                <option value="">All Countries</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Sort By</label>
              <select className="w-full bg-muted/50 rounded-md border border-border p-2 text-sm">
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm">
              Apply Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Mentors List */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Name</th>
                <th className="text-left p-4 font-medium text-sm">Category/Skill</th>
                <th className="text-left p-4 font-medium text-sm">Rates</th>
                <th className="text-left p-4 font-medium text-sm">Date Applied</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-right p-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMentors?.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img
                          src={
                            mentor.profilePhotoUrl.startsWith('http')
                              ? mentor.profilePhotoUrl
                              : 'http://localhost:3000/' + mentor.profilePhotoUrl
                          }
                          alt={mentor.user.fullname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{mentor.user.fullname}</div>
                        <div className="text-sm text-muted-foreground">{mentor.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{mentor.skill_category.name}</div>
                      <div className="text-xs text-muted-foreground">{mentor.skills.name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">₹ {mentor.hourly_rate}</span> /hour
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span>₹ {mentor.trial_rate}</span> trial
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{formatDate(mentor.createdAt)}</td>
                  <td className="p-4">
                    <StatusBadge status={mentor.status} />
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/mentors/${mentor.id}`}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMentors?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No mentors found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredMentors?.length}</span> of{' '}
          <span className="font-medium">{mentors?.length}</span> mentors
        </div>

        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary/5 text-primary">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
