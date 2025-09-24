import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  BarChart3, 
  Calendar,
  Filter,
  Eye,
  AlertTriangle,
  Shield,
  TrendingUp
} from 'lucide-react';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Dr. Smith',
  email: 'smith@health.gov',
  role: 'admin' as const, // Admin can see all data
};

interface ReportFilters {
  disease: string;
  dateFrom: string;
  dateTo: string;
  region: string;
  scope: string;
}

interface ReportStats {
  totalUploads: number;
  positiveDetections: number;
  averageConfidence: number;
  regionsAffected: number;
  houseIndex?: number;
  containerIndex?: number;
  rodentIndex?: number;
}

const Reports: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    disease: '',
    dateFrom: '',
    dateTo: '',
    region: '',
    scope: mockUser.role === 'admin' ? 'all' : 'own',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<ReportStats | null>(null);

  // Mock report data
  const getMockStats = (): ReportStats => {
    if (filters.disease === 'malaria') {
      return {
        totalUploads: 145,
        positiveDetections: 23,
        averageConfidence: 0.87,
        regionsAffected: 3,
        houseIndex: 8.2,
        containerIndex: 12.5,
      };
    } else if (filters.disease === 'leptospirosis') {
      return {
        totalUploads: 89,
        positiveDetections: 15,
        averageConfidence: 0.82,
        regionsAffected: 2,
        rodentIndex: 14.3,
      };
    } else {
      return {
        totalUploads: 234,
        positiveDetections: 38,
        averageConfidence: 0.85,
        regionsAffected: 4,
      };
    }
  };

  const handleGeneratePreview = () => {
    setIsGenerating(true);
    
    // Simulate data processing
    setTimeout(() => {
      setPreviewData(getMockStats());
      setIsGenerating(false);
    }, 1500);
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    const csvContent = `Disease,Date,Location,Status,Confidence,Uploader
Malaria,2024-01-15,East Region,Positive,92%,Dr. Smith
Malaria,2024-01-14,Central Region,Positive,85%,Dr. Johnson
Leptospirosis,2024-01-14,North Region,Positive,88%,Dr. Garcia`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `surveillance-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export with charts
    alert('PDF export functionality will generate a comprehensive report with charts and statistics.');
  };

  const updateFilter = (key: keyof ReportFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPreviewData(null); // Reset preview when filters change
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Surveillance Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate comprehensive reports and export surveillance data for analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Report Configuration
                </CardTitle>
                <CardDescription>
                  Configure your report parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="disease">Disease Type</Label>
                  <Select value={filters.disease} onValueChange={(value) => updateFilter('disease', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All diseases" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Diseases</SelectItem>
                      <SelectItem value="malaria">Malaria Only</SelectItem>
                      <SelectItem value="leptospirosis">Leptospirosis Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateFrom">From Date</Label>
                    <Input
                      id="dateFrom"
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => updateFilter('dateFrom', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateTo">To Date</Label>
                    <Input
                      id="dateTo"
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => updateFilter('dateTo', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={filters.region} onValueChange={(value) => updateFilter('region', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Regions</SelectItem>
                      <SelectItem value="north">North Region</SelectItem>
                      <SelectItem value="south">South Region</SelectItem>
                      <SelectItem value="east">East Region</SelectItem>
                      <SelectItem value="west">West Region</SelectItem>
                      <SelectItem value="central">Central Region</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {mockUser.role === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="scope">Data Scope</Label>
                    <Select value={filters.scope} onValueChange={(value) => updateFilter('scope', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="own">My Uploads Only</SelectItem>
                        <SelectItem value="all">All System Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button 
                  onClick={handleGeneratePreview}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Preview'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Report Preview and Actions */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="preview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="preview">Report Preview</TabsTrigger>
                <TabsTrigger value="export">Export Options</TabsTrigger>
              </TabsList>

              <TabsContent value="preview">
                {previewData ? (
                  <div className="space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{previewData.totalUploads}</div>
                          <p className="text-sm text-muted-foreground">Total Uploads</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-danger">{previewData.positiveDetections}</div>
                          <p className="text-sm text-muted-foreground">Positive Cases</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-success">
                            {Math.round(previewData.averageConfidence * 100)}%
                          </div>
                          <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">{previewData.regionsAffected}</div>
                          <p className="text-sm text-muted-foreground">Regions Affected</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Epidemiological Indices */}
                    {(previewData.houseIndex || previewData.rodentIndex) && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Epidemiological Indices
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {previewData.houseIndex && (
                              <div className="p-3 bg-muted rounded-lg text-center">
                                <div className="text-xl font-bold text-danger">{previewData.houseIndex}%</div>
                                <p className="text-sm text-muted-foreground">House Index</p>
                              </div>
                            )}
                            {previewData.containerIndex && (
                              <div className="p-3 bg-muted rounded-lg text-center">
                                <div className="text-xl font-bold text-warning">{previewData.containerIndex}%</div>
                                <p className="text-sm text-muted-foreground">Container Index</p>
                              </div>
                            )}
                            {previewData.rodentIndex && (
                              <div className="p-3 bg-muted rounded-lg text-center">
                                <div className="text-xl font-bold text-secondary">{previewData.rodentIndex}%</div>
                                <p className="text-sm text-muted-foreground">Rodent Index</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Sample Data Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Sample Data</CardTitle>
                        <CardDescription>
                          Preview of data that will be included in the report
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">malaria_sample_001.jpg</p>
                              <p className="text-sm text-muted-foreground">2024-01-15 • East Region</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-danger text-danger-foreground">Positive</Badge>
                              <span className="text-sm text-muted-foreground">92%</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">leptospira_culture_002.jpg</p>
                              <p className="text-sm text-muted-foreground">2024-01-14 • North Region</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-secondary text-secondary-foreground">Positive</Badge>
                              <span className="text-sm text-muted-foreground">88%</span>
                            </div>
                          </div>

                          <div className="text-center py-4 text-muted-foreground">
                            <p className="text-sm">... and {previewData.totalUploads - 2} more entries</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Preview Available</h3>
                      <p className="text-muted-foreground mb-4">
                        Configure your report parameters and click "Generate Preview" to see your data
                      </p>
                      <Button onClick={handleGeneratePreview} disabled={isGenerating}>
                        {isGenerating ? 'Generating...' : 'Generate Preview'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="export">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Export Options</CardTitle>
                      <CardDescription>
                        Download your surveillance data in various formats
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-success" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">CSV Export</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                Raw data in spreadsheet format for analysis
                              </p>
                              <Button 
                                onClick={handleExportCSV}
                                size="sm" 
                                variant="outline" 
                                className="w-full"
                                disabled={!previewData}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download CSV
                              </Button>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">PDF Report</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                Formatted report with charts and analysis
                              </p>
                              <Button 
                                onClick={handleExportPDF}
                                size="sm" 
                                className="w-full"
                                disabled={!previewData}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Generate PDF
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Export Features</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• All filtered surveillance data included</li>
                          <li>• Epidemiological indices calculations</li>
                          <li>• Time-series charts and visualizations</li>
                          <li>• Summary statistics and trends</li>
                          <li>• Metadata and data quality indicators</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Export Templates */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Export Templates</CardTitle>
                      <CardDescription>
                        Pre-configured reports for common use cases
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          updateFilter('disease', '');
                          updateFilter('dateFrom', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                          updateFilter('dateTo', new Date().toISOString().split('T')[0]);
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Weekly Summary Report
                      </Button>

                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          updateFilter('disease', 'malaria');
                          updateFilter('dateFrom', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                        }}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Malaria Monthly Report
                      </Button>

                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          updateFilter('disease', 'leptospirosis');
                          updateFilter('dateFrom', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                        }}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Leptospirosis Monthly Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;