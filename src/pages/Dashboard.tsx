import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Camera,
  AlertTriangle,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  avatar?: string;
}

interface DashboardStats {
  totalUploads: number;
  recentUploads: number;
  pendingReviews: number;
  activeDiscussions: number;
  malariaPositives: number;
  leptospirosisPositives: number;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalUploads: 234,
    recentUploads: 12,
    pendingReviews: 8,
    activeDiscussions: 5,
    malariaPositives: 23,
    leptospirosisPositives: 15,
  });

  useEffect(() => {
    // Get user from localStorage (in a real app, this would come from auth context)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground mt-1">
            {user.role === 'admin' ? 'System Administrator' : 'Healthcare Staff'} • 
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUploads}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.recentUploads} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Malaria Positives</CardTitle>
              <AlertTriangle className="h-4 w-4 text-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.malariaPositives}</div>
              <p className="text-xs text-muted-foreground">
                Cases detected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leptospirosis Cases</CardTitle>
              <Shield className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.leptospirosisPositives}</div>
              <p className="text-xs text-muted-foreground">
                Cases detected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDiscussions}</div>
              <p className="text-xs text-muted-foreground">
                Team threads
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/malaria">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-8 w-8 text-danger mx-auto mb-2" />
                      <h3 className="font-medium">Upload Malaria Image</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Submit microscopy images for analysis
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/leptospirosis">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h3 className="font-medium">Upload Leptospirosis Image</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Submit bacterial culture images
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/reports">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="font-medium">Generate Report</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Create surveillance reports
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/discussion">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <MessageSquare className="h-8 w-8 text-warning mx-auto mb-2" />
                      <h3 className="font-medium">Team Discussion</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Collaborate with your team
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest uploads and updates in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-danger rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Malaria sample uploaded by Dr. Smith</p>
                      <p className="text-xs text-muted-foreground">2 hours ago • High confidence detection</p>
                    </div>
                    <Badge variant="secondary">Malaria</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Leptospirosis survey completed</p>
                      <p className="text-xs text-muted-foreground">4 hours ago • East Region</p>
                    </div>
                    <Badge variant="outline">Survey</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New discussion thread started</p>
                      <p className="text-xs text-muted-foreground">6 hours ago • Prevention Strategies</p>
                    </div>
                    <Badge variant="outline">Discussion</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Panel (if admin) */}
            {user.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Admin Panel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link to="/manage-users">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Link>
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>Pending Reviews: {stats.pendingReviews}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">ML Model</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge variant="outline" className="text-success">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Status</span>
                  <Badge variant="outline" className="text-success">Online</Badge>
                </div>
                
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Uploads</span>
                      <span className="font-medium">{stats.recentUploads}</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Reviews</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;