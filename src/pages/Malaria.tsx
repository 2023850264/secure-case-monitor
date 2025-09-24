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
  AlertTriangle,
  CheckCircle,
  Clock,
  X
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

const Malaria: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    gpsLat: '',
    gpsLon: '',
    notes: '',
  });
  
  // Survey data for indices calculation
  const [surveyData, setSurveyData] = useState({
    housesSurveyed: '',
    positiveHouses: '',
    containersInspected: '',
    positiveContainers: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock uploaded images
  const [uploadedImages] = useState<UploadedImage[]>([
    {
      id: '1',
      filename: 'malaria_sample_001.jpg',
      uploadDate: '2024-01-15',
      status: 'analyzed',
      confidence: 0.92,
      detection: 'Plasmodium falciparum',
      uploader: 'Dr. Smith'
    },
    {
      id: '2',
      filename: 'malaria_sample_002.jpg',
      uploadDate: '2024-01-14',
      status: 'reviewed',
      confidence: 0.85,
      detection: 'Plasmodium vivax',
      uploader: 'Dr. Johnson'
    },
    {
      id: '3',
      filename: 'malaria_sample_003.jpg',
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
    const houses = parseInt(surveyData.housesSurveyed) || 0;
    const positiveHouses = parseInt(surveyData.positiveHouses) || 0;
    const containers = parseInt(surveyData.containersInspected) || 0;
    const positiveContainers = parseInt(surveyData.positiveContainers) || 0;

    const houseIndex = houses > 0 ? (positiveHouses / houses) * 100 : 0;
    const containerIndex = containers > 0 ? (positiveContainers / containers) * 100 : 0;
    const breteauIndex = houses > 0 ? (positiveContainers / houses) * 100 : 0;

    return {
      houseIndex: houseIndex.toFixed(1),
      containerIndex: containerIndex.toFixed(1),
      breteauIndex: breteauIndex.toFixed(1),
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
            <AlertTriangle className="h-8 w-8 text-danger" />
            Malaria Surveillance
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload microscopic images, calculate epidemiological indices, and track malaria surveillance data
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
                    Upload Malaria Image
                  </CardTitle>
                  <CardDescription>
                    Submit microscopic images for AI-powered analysis and detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-4">
                    {uploadSuccess && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Image uploaded successfully! Analysis will be available shortly.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="image">Microscopic Image *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        {selectedFile ? (
                          <div className="space-y-2">
                            <Camera className="h-8 w-8 text-primary mx-auto" />
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
                              <Label htmlFor="image" className="cursor-pointer text-primary hover:underline">
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
                        placeholder="Additional notes about the sample..."
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={!selectedFile || isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* AI Detection Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    AI Detection System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Detection Capabilities</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Plasmodium falciparum identification</li>
                      <li>• Plasmodium vivax detection</li>
                      <li>• Parasitemia percentage calculation</li>
                      <li>• Ring, trophozoite, and schizont stages</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-2 text-warning-foreground">
                      Integration Point
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      AI detection integration point — model endpoint returns JSON with:
                      class, confidence, bbox/mask, version. Currently in development phase.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Sample Detection Results:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>P. falciparum</span>
                        <Badge variant="outline" className="text-danger">92% confidence</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>P. vivax</span>
                        <Badge variant="outline" className="text-success">85% confidence</Badge>
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
                  <CardTitle>Epidemiological Survey</CardTitle>
                  <CardDescription>
                    Enter survey data to calculate malaria indices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="housesSurveyed">Houses Surveyed</Label>
                      <Input
                        id="housesSurveyed"
                        type="number"
                        placeholder="0"
                        value={surveyData.housesSurveyed}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, housesSurveyed: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="positiveHouses">Positive Houses</Label>
                      <Input
                        id="positiveHouses"
                        type="number"
                        placeholder="0"
                        value={surveyData.positiveHouses}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, positiveHouses: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="containersInspected">Containers Inspected</Label>
                      <Input
                        id="containersInspected"
                        type="number"
                        placeholder="0"
                        value={surveyData.containersInspected}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, containersInspected: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="positiveContainers">Positive Containers</Label>
                      <Input
                        id="positiveContainers"
                        type="number"
                        placeholder="0"
                        value={surveyData.positiveContainers}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, positiveContainers: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calculated Indices */}
              <Card>
                <CardHeader>
                  <CardTitle>Calculated Indices</CardTitle>
                  <CardDescription>
                    Real-time calculation of epidemiological indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">House Index</p>
                          <p className="text-xs text-muted-foreground">
                            % of houses with positive containers
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{indices.houseIndex}%</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Container Index</p>
                          <p className="text-xs text-muted-foreground">
                            % of containers with larvae/pupae
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-secondary">{indices.containerIndex}%</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Breteau Index</p>
                          <p className="text-xs text-muted-foreground">
                            Positive containers per 100 houses
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-warning">{indices.breteauIndex}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Risk Assessment</h4>
                      <div className="space-y-2">
                        {parseFloat(indices.houseIndex) > 5 && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              High risk: House Index above 5% threshold
                            </AlertDescription>
                          </Alert>
                        )}
                        {parseFloat(indices.breteauIndex) > 20 && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              High risk: Breteau Index above 20 threshold
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
                  View and manage your uploaded malaria images
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
                            <p className="text-sm text-success mt-1">
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

export default Malaria;