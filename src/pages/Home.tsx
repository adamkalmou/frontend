
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, PlayCircle, Fish, Database, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const Home = () => {
  // Scroll to section if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518877593221-1f28583780b4')",
            backgroundAttachment: "fixed",
            filter: "brightness(0.3)",
          }}
        />
        <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-up">
            Marine Species <span className="text-sky-400">Distribution Prediction</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Advanced machine learning models to predict and visualize the distribution 
            of sardines and rails species in Moroccan waters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700">
              <Link to="/predict">
                Test Model
                <PlayCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="#about">
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About the <span className="text-sky-600">Project</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Understanding marine ecosystems through advanced predictive models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-sky-500 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-sky-100 p-3 rounded-full w-fit mb-4">
                  <Fish className="h-6 w-6 text-sky-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Marine Conservation</h3>
                <p className="text-muted-foreground">
                  Our models help conservationists identify key areas for marine species 
                  protection and understand environmental factors affecting their distribution.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-sky-500 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-sky-100 p-3 rounded-full w-fit mb-4">
                  <Database className="h-6 w-6 text-sky-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
                <p className="text-muted-foreground">
                  Leveraging environmental parameters like temperature, salinity, pH, and 
                  dissolved oxygen to create accurate predictive models.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-sky-500 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-sky-100 p-3 rounded-full w-fit mb-4">
                  <Award className="h-6 w-6 text-sky-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scientific Excellence</h3>
                <p className="text-muted-foreground">
                  Developed through rigorous research and validation, our models achieve 
                  high accuracy in predicting species presence in Moroccan waters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Models Section with Image */}
      <section id="models" className="py-20 px-4 bg-gradient-to-r from-sky-900 to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Prediction <span className="text-sky-300">Models</span>
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <div className="bg-sky-800 p-2 rounded-full mr-3">
                      <Fish className="h-5 w-5" />
                    </div>
                    Sardine Distribution Model
                  </h3>
                  <p className="text-sky-100 mb-4">
                    Our sardine model predicts the presence of sardines based on 
                    environmental parameters. Sardines are critical indicators of ecosystem 
                    health and important for commercial fisheries.
                  </p>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Key parameters:</strong> Water temperature, salinity, pH, dissolved oxygen
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <div className="bg-sky-800 p-2 rounded-full mr-3">
                      <Fish className="h-5 w-5" />
                    </div>
                    Rails Distribution Model
                  </h3>
                  <p className="text-sky-100 mb-4">
                    The rails model focuses on predicting rails species distribution. 
                    These species play a unique role in coastal ecosystems and are sensitive 
                    to environmental changes.
                  </p>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Key parameters:</strong> Water temperature, salinity, pH, dissolved oxygen, geographical coordinates
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
                alt="Ocean waves" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research <span className="text-sky-600">Methodology</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our scientific approach to species distribution prediction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="border-l-4 border-sky-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                <p className="text-muted-foreground">
                  Environmental data is collected across Moroccan waters, including geographical 
                  coordinates, temperature, salinity, pH, and dissolved oxygen measurements.
                </p>
              </div>
              
              <div className="border-l-4 border-sky-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Model Training</h3>
                <p className="text-muted-foreground">
                  Machine learning models are trained on historical data to identify patterns 
                  and correlations between environmental parameters and species presence.
                </p>
              </div>
              
              <div className="border-l-4 border-sky-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Validation</h3>
                <p className="text-muted-foreground">
                  Models are validated against observed data to ensure high prediction accuracy 
                  and reliability before being deployed for research use.
                </p>
              </div>
              
              <div className="border-l-4 border-sky-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Visualization</h3>
                <p className="text-muted-foreground">
                  Results are visualized through geospatial mapping, providing researchers with 
                  intuitive and informative representations of predicted species distribution.
                </p>
              </div>
            </div>
            
            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-sky-700" />
                How to Use Our Model
              </h3>
              
              <ol className="space-y-4 list-decimal pl-5">
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Prepare your data:</span> Organize 
                  your environmental measurements in a CSV file with the required parameters.
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Choose a species model:</span> Select 
                  either the sardine or rails prediction model.
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Upload and process:</span> Use our 
                  web interface to upload your data and generate prediction maps.
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Analyze results:</span> Download 
                  and examine the generated maps showing predicted species presence.
                </li>
              </ol>
              
              <div className="mt-8 text-center">
                <Button asChild className="bg-sky-600 hover:bg-sky-700">
                  <Link to="/predict">
                    Try the Model Now
                    <PlayCircle className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-sky-800 to-blue-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Test Our Models?</h2>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto mb-8">
            Upload your environmental data and generate prediction maps for marine species distribution.
          </p>
          <Button asChild size="lg" className="bg-white text-sky-800 hover:bg-sky-100">
            <Link to="/predict">
              Go to Prediction Tool
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
