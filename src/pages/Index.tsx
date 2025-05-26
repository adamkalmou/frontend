
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Upload, FileUp, Download, RefreshCw, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const API_URL = "https://backendd-88820583523.europe-west9.run.app";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [species, setSpecies] = useState<string>("sardine");
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

      const response = await fetch(`${API_URL}/`, {
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

  const handleDownload = () => {
    if (imagePath) {
      // Convert the display URL to a download URL
      const downloadUrl = `${API_URL}/download/${species}`;
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight animate-slide-up">
            <span className="text-primary">Species Distribution</span> Prediction
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Upload your CSV data to generate prediction maps for sardine and rails species distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-zoom-in" style={{ animationDelay: "0.2s" }}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Upload Dataset</CardTitle>
              <CardDescription>
                Select a CSV file containing the required parameters for species prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div 
                  className={`file-drop-area ${file ? 'border-primary bg-primary/5' : ''}`}
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
                      <p className="font-medium text-primary mb-2">{file.name}</p>
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
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sardine" id="sardine" />
                      <Label htmlFor="sardine" className="cursor-pointer">Sardine</Label>
                    </div>
                    <div className="flex items-center space-x-2">
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
            <CardFooter className="flex justify-between">
              <Button 
                className="animated-gradient-button" 
                onClick={handleSubmit}
                disabled={!file || isLoading}
              >
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Map
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Prediction Map</CardTitle>
              <CardDescription>
                Visualized prediction results for selected species
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="image-container w-full h-[350px] bg-muted/30 flex items-center justify-center">
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
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="outline"
                onClick={handleDownload}
                disabled={!imagePath || isLoading}
                className="transition-all duration-200 hover:bg-primary/10"
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
        </div>
      </div>
    </div>
  );
};

export default Index;
