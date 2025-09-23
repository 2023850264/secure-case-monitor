import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/medical-hero.jpg';
import malariaIcon from '@/assets/malaria-icon.jpg';
import leptospirosisIcon from '@/assets/leptospirosis-icon.jpg';
import { 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Microscope, 
  AlertTriangle 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                Malaria & Leptospirosis
                <span className="block text-2xl md:text-4xl mt-2">Surveillance System</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Advanced disease monitoring and epidemiological surveillance platform for healthcare professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/login">Access System</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20" asChild>
                  <Link to="#learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Disease Surveillance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform provides healthcare professionals with the tools needed for effective disease monitoring, 
              data collection, and epidemiological analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Microscope className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Image Analysis</CardTitle>
                <CardDescription>
                  Upload and analyze microscopic images with AI-powered detection capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Epidemiological Indices</CardTitle>
                <CardDescription>
                  Calculate and track key surveillance metrics including House Index and Container Index
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-warning" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Coordinate with your surveillance team through integrated discussion forums
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Disease Information Section */}
      <section id="learn-more" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Disease Information & Prevention
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn about the diseases we monitor and prevention strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Malaria Card */}
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={malariaIcon} 
                  alt="Malaria vector" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  Malaria
                </CardTitle>
                <CardDescription>
                  A life-threatening disease transmitted by Anopheles mosquitoes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Malaria is caused by Plasmodium parasites and remains a major global health concern. 
                  Early detection and proper surveillance are crucial for prevention and control.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Prevention Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use insecticide-treated bed nets</li>
                    <li>• Eliminate standing water sources</li>
                    <li>• Use appropriate repellents</li>
                    <li>• Seek immediate medical care for fever</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Leptospirosis Card */}
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={leptospirosisIcon} 
                  alt="Leptospirosis bacteria" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  Leptospirosis
                </CardTitle>
                <CardDescription>
                  A bacterial infection transmitted through contaminated water and soil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Leptospirosis is caused by bacteria of the genus Leptospira and is commonly transmitted 
                  through contact with contaminated water or soil.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Prevention Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Avoid contact with contaminated water</li>
                    <li>• Wear protective clothing in risk areas</li>
                    <li>• Control rodent populations</li>
                    <li>• Practice good hygiene and sanitation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Join Our Surveillance Network
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Healthcare professionals can request access to contribute to our disease surveillance efforts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Request Access</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">MS</span>
              </div>
              <span className="text-muted-foreground">Medical Surveillance System</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Medical Surveillance System. For healthcare professionals.</p>
              <p className="mt-1">Contact: surveillance@health.gov | Emergency: +1-555-HEALTH</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;