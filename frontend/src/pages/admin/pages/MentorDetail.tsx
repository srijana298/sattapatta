import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  GraduationCap,
  MapPin,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  XCircle
} from 'lucide-react';
import Button from '../components/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { cn, formatDate, getImageUrl } from '../lib/utils';
import Dialog from '../components/Dialog';
import { useMentor } from '../../../lib/hooks';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { updateMentorStatus } from '../data/mockData';
import { updateStatus } from '../../../services/mentor';

const MentorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useMentor(id);

  const [activeTab, setActiveTab] = useState('profile');
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">Mentor Not Found</h3>
        <p className="text-muted-foreground mt-2">
          The mentor you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="default" className="mt-6" onClick={() => navigate('/admin/mentors')}>
          Back to Mentors
        </Button>
      </div>
    );
  }

  const handleApprove = async () => {
    try {
      if (data.id) {
        await updateStatus(data.id, 'approved');
        refetch();
      }
      setShowApproveDialog(false);
    } catch (error) {}
  };

  const handleReject = () => {
    if (data.id) {
      updateMentorStatus(data.id, 'rejected');
    }
    setShowRejectDialog(false);
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/mentors')}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Mentor Profile</h1>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={data.status} className="px-3 py-1 text-sm" />

          {data.status === 'pending' && (
            <>
              <Button variant="outline" onClick={() => setShowRejectDialog(true)} className="gap-2">
                <ThumbsDown className="h-4 w-4" />
                <span>Reject</span>
              </Button>
              <Button
                variant="default"
                onClick={() => setShowApproveDialog(true)}
                className="gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Approve</span>
              </Button>
            </>
          )}

          {data.status === 'approved' && (
            <Button variant="outline" onClick={() => setShowRejectDialog(true)} className="gap-2">
              <ThumbsDown className="h-4 w-4" />
              <span>Revoke Approval</span>
            </Button>
          )}

          {data.status === 'rejected' && (
            <Button variant="outline" onClick={() => setShowApproveDialog(true)} className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Reconsider</span>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                  src={getImageUrl(data.profilePhotoUrl)}
                  alt={data.user.fullname}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl font-bold">{data.user.fullname}</h2>
              <p className="text-muted-foreground mt-1">{data.introduction}</p>

              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{data.countryOfBirth}</span>
              </div>

              <div className="mt-6 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 rounded-md p-3 text-center">
                    <p className="text-xs text-muted-foreground">Hourly Rate</p>
                    <p className="text-lg font-bold">रु {data.hourly_rate}</p>
                  </div>
                  {/* <div className="bg-muted/40 rounded-md p-3 text-center">
                    <p className="text-xs text-muted-foreground">Trial Rate</p>
                    <p className="text-lg font-bold">रु {data.trial_rate}</p>
                  </div> */}
                </div>
              </div>

              <div className="mt-6 w-full text-left">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Category & Skill</h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{data.skill_category.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skill:</span>
                    <span className="font-medium">{data.skills.name}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Applied On</h3>
                </div>

                <p className="text-sm">{formatDate(new Date(data.createdAt))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex space-x-6">
              {['profile', 'education', 'certificates', 'availability'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'py-3 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-in">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{data.introduction}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{data.experience}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Motivation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{data.motivation}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Education History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data.has_education ? (
                      <div className="space-y-6">
                        {data.educations?.map((education, index) => (
                          <div
                            key={index}
                            className={cn(
                              'border-l-4 border-primary/60 pl-4 py-1',
                              index !== data.educations!.length - 1 && 'pb-6'
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <GraduationCap className="h-4 w-4 text-primary" />
                              <h3 className="font-medium">
                                {education.degree_type} in {education.degree}
                              </h3>
                            </div>
                            <p className="text-sm">{education.university}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {education.start_year} - {education.end_year}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No education information provided</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {data.has_certificate && data.certificates && data.certificates.length > 0 ? (
                      <div className="space-y-6">
                        {data.certificates.map((certificate, index) => (
                          <div key={index} className="flex border rounded-lg overflow-hidden">
                            <div className="w-2 bg-primary/60" />
                            <div className="p-4 flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{certificate.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {certificate.subject} • {certificate.issuedBy}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm mt-3">{certificate.description}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {certificate.start_year} - {certificate.end_year}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No certificates provided</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'
                      ].map((day) => {
                        const dayAvailability = data.availabilities.find(
                          (a) => a.day_of_week === day && a.is_available
                        );

                        return (
                          <div
                            key={day}
                            className={cn(
                              'border rounded-lg p-4',
                              dayAvailability ? 'border-primary/20 bg-primary/5' : 'border-muted'
                            )}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{day}</h3>
                              {dayAvailability ? (
                                <div className="flex items-center text-xs text-success">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span>Available</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  <span>Unavailable</span>
                                </div>
                              )}
                            </div>

                            {dayAvailability && (
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {dayAvailability.start_time} - {dayAvailability.end_time}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog
        isOpen={showApproveDialog}
        onClose={() => setShowApproveDialog(false)}
        title="Approve Mentor"
        description="This will approve the mentor's profile and they will be visible on the platform."
      >
        <div className="space-y-4">
          <div className="bg-success/10 border border-success/20 rounded-md p-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-success">Confirm Approval</h4>
                <p className="text-sm mt-1">
                  This mentor will be able to receive bookings and interact with students on the
                  platform.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleApprove}>
              Approve Mentor
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        title="Reject Application"
        description="This mentor will not be able to receive bookings and interact with students on the platform."
      >
        <div className="space-y-4">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {}}>
              Reject Application
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MentorDetail;
