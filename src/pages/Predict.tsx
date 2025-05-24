
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Upload, FileUp, Download, RefreshCw, FileX, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const API_URL = "https://backendd-mg0r.onrender.com/";

const Predict = () => {
  const [file, setFile] = useState<File | null>(null);
  const [species, setSpecies] = useState<string>("sardine");
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        toast.success("CSV file selected successfully");
      } else {
        toast.error("Please select a CSV file");
        e.target.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
        toast.success("CSV file dropped successfully");
      } else {
        toast.error("Please drop a CSV file");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    setAnalysis(null);
    
    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("species", species);

    try {
      // Simulate upload progress (since fetch doesn't natively support progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to process data");
      }

      const data = await response.json();
      setImagePath(`${API_URL}/${data.image_path}`);
      toast.success(`${species.charAt(0).toUpperCase() + species.slice(1)} prediction map generated successfully`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePath) {
      toast.error("Please generate a map first");
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("species", species);

      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze data");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      toast.success("Analysis completed successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (imagePath) {
      // Convert the display URL to a download URL
      const downloadUrl = `${API_URL}/download/${species}`;
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight animate-slide-up">
              <span className="text-sky-600">Species Distribution</span> Prediction Tool
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Upload your CSV data to generate prediction maps for sardine and rails species distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-zoom-in" style={{ animationDelay: "0.2s" }}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-sky-100">
              <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
                <CardTitle>Upload Dataset</CardTitle>
                <CardDescription>
                  Select a CSV file containing the required parameters for species prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div 
                    className={`file-drop-area ${file ? 'border-sky-500 bg-sky-50' : 'border-dashed'}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                      disabled={isLoading}
                    />
                    
                    {!file ? (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <p className="font-medium">Drop your CSV file here or</p>
                        <Button 
                          type="button" 
                          variant="secondary" 
                          className="mt-2"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isLoading}
                        >
                          <FileUp className="mr-2 h-4 w-4" />
                          Browse
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="font-medium text-sky-700 mb-2">{file.name}</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={clearFile}
                          disabled={isLoading}
                        >
                          <FileX className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Select Species</Label>
                    <RadioGroup 
                      value={species} 
                      onValueChange={setSpecies}
                      className="grid grid-cols-2 gap-4"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-sky-100 hover:bg-sky-50">
                        <RadioGroupItem value="sardine" id="sardine" />
                        <Label htmlFor="sardine" className="cursor-pointer">Sardine</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-sky-100 hover:bg-sky-50">
                        <RadioGroupItem value="rails" id="rails" />
                        <Label htmlFor="rails" className="cursor-pointer">Rails</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {isLoading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        {uploadProgress < 100 ? 'Processing data...' : 'Generating map...'}
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 bg-gradient-to-r from-sky-50 to-blue-50">
                <Button 
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                  onClick={handleSubmit}
                  disabled={!file || isLoading}
                >
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate Map
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleAnalyze}
                  disabled={!imagePath || isAnalyzing}
                >
                  {isAnalyzing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                  Analyze Map
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-sky-100">
              <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>
                  Visualized prediction results and analysis for selected species
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="map" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="map">Map</TabsTrigger>
                    <TabsTrigger value="analysis" disabled={!analysis}>Analysis</TabsTrigger>
                  </TabsList>
                  <TabsContent value="map" className="mt-4">
                    <div className="image-container w-full h-[300px] bg-sky-50 border border-sky-100 flex items-center justify-center rounded-xl">
                      {isLoading ? (
                        <Skeleton className="w-full h-full rounded-xl" />
                      ) : imagePath ? (
                        <img 
                          src={imagePath} 
                          alt={`${species} prediction map`} 
                          className="w-full h-full object-contain animate-fade-in"
                          onError={() => toast.error("Failed to load image")}
                        />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <p>No map generated yet</p>
                          <p className="text-sm mt-2">Upload a CSV file and generate a prediction map</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="analysis" className="mt-4">
                    <ScrollArea className="h-[300px] w-full border rounded-xl bg-sky-50 p-4">
                      {analysis ? (
                        <div className="text-left whitespace-pre-line">
                          <h3 className="font-semibold mb-2">Analyse de distribution de {species}</h3>
                          <p className="text-sm">{analysis}</p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">
                            {isAnalyzing ? "Analyzing the data..." : "No analysis available yet"}
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center bg-gradient-to-r from-sky-50 to-blue-50">
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  disabled={!imagePath || isLoading}
                  className="border-sky-200 hover:bg-sky-100"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Map
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="animate-fade-in text-center text-sm text-muted-foreground" style={{ animationDelay: "0.3s" }}>
            <p>Upload CSV files with columns: LAT_DD, LONG_DD, Salinite, Temp, DO, pH</p>
            <p className="mt-1">The model will predict species distribution based on these parameters</p>
            <p className="mt-1 text-sky-600">New feature: AI-powered analysis of distribution patterns</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Predict;
