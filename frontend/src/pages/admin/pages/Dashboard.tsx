import { ArrowRight, ArrowUpRight, Clock, ThumbsDown, ThumbsUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle } from '../components/Card';
import { getAverageRates, getCategoryDistribution, getStatusCounts, mockMentors } from '../data/mockData';
import { categoryOptions } from '../types/mentor';
import StatusBadge from '../components/StatusBadge';

const Dashboard = () => {
  const statusCounts = getStatusCounts();
  const { avgHourlyRate, avgTrialRate } = getAverageRates();
  const categoryDistribution = getCategoryDistribution();
  
  // Get recent applications (last 5)
  const recentApplications = [...mockMentors]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your mentors.
        </p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Mentors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{statusCounts.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All registered mentors
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-warning/5 border-warning/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{statusCounts.pending}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting review
                </p>
              </div>
              <div className="p-2 bg-warning/10 rounded-full text-warning">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success/5 border-success/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Mentors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{statusCounts.approved}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active on platform
                </p>
              </div>
              <div className="p-2 bg-success/10 rounded-full text-success">
                <ThumbsUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{statusCounts.rejected}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Did not meet criteria
                </p>
              </div>
              <div className="p-2 bg-destructive/10 rounded-full text-destructive">
                <ThumbsDown className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Link 
                to="/mentors" 
                className="text-sm text-primary flex items-center hover:underline"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map(mentor => (
                <div 
                  key={mentor.id}
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={mentor.profile_picture} 
                      alt={mentor.fullname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{mentor.fullname}</h4>
                      <StatusBadge status={mentor.status} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {mentor.headline}
                    </p>
                  </div>
                  
                  <Link 
                    to={`/admin/mentors/${mentor.id}`}
                    className="flex-shrink-0 rounded-full p-1.5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Rates */}
              <div>
                <h4 className="text-sm font-medium mb-2">Average Rates</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/40 rounded-md">
                    <p className="text-xs text-muted-foreground">Hourly Rate</p>
                    <p className="text-lg font-bold">${avgHourlyRate.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-md">
                    <p className="text-xs text-muted-foreground">Trial Rate</p>
                    <p className="text-lg font-bold">${avgTrialRate.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium mb-2">Categories Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(categoryDistribution).map(([categoryId, count]) => {
                    const category = categoryOptions.find(c => c.id === parseInt(categoryId));
                    const percentage = (count / statusCounts.total) * 100;
                    
                    return (
                      <div key={categoryId} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{category?.name || `Category ${categoryId}`}</span>
                          <span className="text-muted-foreground">{count} mentors</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;