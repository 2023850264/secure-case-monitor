import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Camera, 
  MapPin, 
  Calendar,
  BarChart3,
  Shield,
  CheckCircle,
  Clock,
  X,
  AlertTriangle
} from 'lucide-react';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Dr. Smith',
  email: 'smith@health.gov',
  role: 'staff' as const,
};

interface UploadedImage {
  id: string;
  filename: string;
  uploadDate: string;
  status: 'pending' | 'analyzed' | 'reviewed';
  confidence?: number;
  detection?: string;
  uploader: string;
}

const Leptospirosis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    gpsLat: '',
    gpsLon: '',
    notes: '',
  });
  
  // Survey data for rodent index calculation
  const [surveyData, setSurveyData] = useState({
    areasInspected: '',
    rodentSightings: '',
    trapsSet: '',
    rodentsCaught: '',
    waterSamplesCollected: '',
    contaminatedSamples: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock uploaded images
  const [uploadedImages] = useState<UploadedImage[]>([
    {
      id: '1',
      filename: 'leptospira_culture_001.jpg',
      uploadDate: '2024-01-15',
      status: 'analyzed',
      confidence: 0.88,
      detection: 'Leptospira interrogans',
      uploader: 'Dr. Smith'
    },
    {
      id: '2',
      filename: 'leptospira_culture_002.jpg',
      uploadDate: '2024-01-14',
      status: 'reviewed',
      confidence: 0.91,
      detection: 'Leptospira borgpetersenii',
      uploader: 'Dr. Garcia'
    },
    {
      id: '3',
      filename: 'water_sample_003.jpg',
      uploadDate: '2024-01-14',
      status: 'pending',
      uploader: 'Dr. Smith'
    }
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual upload to Supabase storage
      console.log('Uploading file:', selectedFile.name);
      console.log('Form data:', formData);
      
      setUploadSuccess(true);
      setSelectedFile(null);
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        location: '',
        gpsLat: '',
        gpsLon: '',
        notes: '',
      });
      
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const calculateIndices = () => {
    const areas = parseInt(surveyData.areasInspected) || 0;
    const sightings = parseInt(surveyData.rodentSightings) || 0;
    const trapsSet = parseInt(surveyData.trapsSet) || 0;
    const rodentsCaught = parseInt(surveyData.rodentsCaught) || 0;
    const waterSamples = parseInt(surveyData.waterSamplesCollected) || 0;
    const contaminated = parseInt(surveyData.contaminatedSamples) || 0;

    const rodentIndex = areas > 0 ? (sightings / areas) * 100 : 0;
    const trapSuccessRate = trapsSet > 0 ? (rodentsCaught / trapsSet) * 100 : 0;
    const waterContaminationRate = waterSamples > 0 ? (contaminated / waterSamples) * 100 : 0;

    return {
      rodentIndex: rodentIndex.toFixed(1),
      trapSuccessRate: trapSuccessRate.toFixed(1),
      waterContaminationRate: waterContaminationRate.toFixed(1),
    };
  };

  const indices = calculateIndices();

  const getStatusIcon = (status: UploadedImage['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'analyzed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'reviewed':
        return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: UploadedImage['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'analyzed':
        return <Badge className="bg-success text-success-foreground">Analyzed</Badge>;
      case 'reviewed':
        return <Badge>Reviewed</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="h-8 w-8 text-secondary" />
            Leptospirosis Surveillance
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload bacterial culture images, track rodent populations, and monitor leptospirosis surveillance data
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="survey">Survey Data</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Leptospirosis Sample
                  </CardTitle>
                  <CardDescription>
                    Submit bacterial culture or environmental samples for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-4">
                    {uploadSuccess && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Sample uploaded successfully! Analysis will be available shortly.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="image">Sample Image *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        {selectedFile ? (
                          <div className="space-y-2">
                            <Camera className="h-8 w-8 text-secondary mx-auto" />
                            <div className="flex items-center justify-center gap-2">
                              <p className="text-sm font-medium">{selectedFile.name}</p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFile(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                            <div>
                              <Label htmlFor="image" className="cursor-pointer text-secondary hover:underline">
                                Click to upload
                              </Label>
                              <p className="text-sm text-muted-foreground">or drag and drop</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG up to 5MB
                            </p>
                          </div>
                        )}
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Collection Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            placeholder="Sample location"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gpsLat">GPS Latitude</Label>
                        <Input
                          id="gpsLat"
                          placeholder="e.g., 14.5995"
                          value={formData.gpsLat}
                          onChange={(e) => setFormData(prev => ({ ...prev, gpsLat: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gpsLon">GPS Longitude</Label>
                        <Input
                          id="gpsLon"
                          placeholder="e.g., 120.9842"
                          value={formData.gpsLon}
                          onChange={(e) => setFormData(prev => ({ ...prev, gpsLon: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Sample type, culture conditions, environmental factors..."
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="secondary"
                      className="w-full" 
                      disabled={!selectedFile || isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Sample'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* AI Detection Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Detection System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Detection Capabilities</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Leptospira species identification</li>
                      <li>• Bacterial count estimation</li>
                      <li>• Morphology analysis</li>
                      <li>• Environmental contamination level</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-secondary/20 bg-secondary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-2 text-secondary-foreground">
                      Integration Point
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      AI detection integration point — model endpoint returns JSON with:
                      species, confidence, count, version. Currently in development phase.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Sample Detection Results:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>L. interrogans</span>
                        <Badge variant="outline" className="text-secondary">88% confidence</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>L. borgpetersenii</span>
                        <Badge variant="outline" className="text-success">91% confidence</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="survey">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Survey Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Survey</CardTitle>
                  <CardDescription>
                    Enter surveillance data to calculate leptospirosis risk indices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="areasInspected">Areas Inspected</Label>
                      <Input
                        id="areasInspected"
                        type="number"
                        placeholder="0"
                        value={surveyData.areasInspected}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, areasInspected: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rodentSightings">Rodent Sightings</Label>
                      <Input
                        id="rodentSightings"
                        type="number"
                        placeholder="0"
                        value={surveyData.rodentSightings}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, rodentSightings: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trapsSet">Traps Set</Label>
                      <Input
                        id="trapsSet"
                        type="number"
                        placeholder="0"
                        value={surveyData.trapsSet}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, trapsSet: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rodentsCaught">Rodents Caught</Label>
                      <Input
                        id="rodentsCaught"
                        type="number"
                        placeholder="0"
                        value={surveyData.rodentsCaught}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, rodentsCaught: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="waterSamplesCollected">Water Samples</Label>
                      <Input
                        id="waterSamplesCollected"
                        type="number"
                        placeholder="0"
                        value={surveyData.waterSamplesCollected}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, waterSamplesCollected: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contaminatedSamples">Contaminated Samples</Label>
                      <Input
                        id="contaminatedSamples"
                        type="number"
                        placeholder="0"
                        value={surveyData.contaminatedSamples}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, contaminatedSamples: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calculated Indices */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Indices</CardTitle>
                  <CardDescription>
                    Real-time calculation of leptospirosis risk indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Rodent Index</p>
                          <p className="text-xs text-muted-foreground">
                            % of areas with rodent activity
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-secondary">{indices.rodentIndex}%</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Trap Success Rate</p>
                          <p className="text-xs text-muted-foreground">
                            % of successful traps
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{indices.trapSuccessRate}%</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Water Contamination</p>
                          <p className="text-xs text-muted-foreground">
                            % of contaminated water samples
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-warning">{indices.waterContaminationRate}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Risk Assessment</h4>
                      <div className="space-y-2">
                        {parseFloat(indices.rodentIndex) > 10 && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              High risk: Rodent Index above 10% threshold
                            </AlertDescription>
                          </Alert>
                        )}
                        {parseFloat(indices.waterContaminationRate) > 15 && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              High risk: Water contamination above 15% threshold
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>
                  View and manage your uploaded leptospirosis samples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(image.status)}
                        <div>
                          <p className="font-medium">{image.filename}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Uploaded: {image.uploadDate}</span>
                            <span>•</span>
                            <span>By: {image.uploader}</span>
                          </div>
                          {image.detection && image.confidence && (
                            <p className="text-sm text-secondary mt-1">
                              {image.detection} • {Math.round(image.confidence * 100)}% confidence
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(image.status)}
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leptospirosis;