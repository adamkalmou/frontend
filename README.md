
# Species Distribution Prediction

A fullstack application for predicting and visualizing species distribution based on environmental parameters.

## Project Overview

This project consists of:

1. **React Frontend**: A modern UI built with React, TypeScript, and Tailwind CSS
2. **Flask Backend**: A Python Flask API for data processing and prediction

The application allows users to upload CSV data containing environmental parameters, and generates prediction maps for sardine and rails species distribution.

## Project Info

## Frontend Setup

To run the frontend:

```sh
# Install dependencies
npm i

# Start the development server
npm run dev
```

## Backend Setup

The backend requires Python and several data science libraries.

```sh
# Navigate to the backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

### Required Data Files

To run the backend, you need the following data files:

- Machine learning models in the `MODEL` folder:
  - `species_prediction_ESP1_optimized.pkl` (for sardines)
  - `species_prediction_ESP2_optimized.pkl` (for rails)
- Shapefiles:
  - `VF/T_cote_Maroc_MAJ_MAI_06_2021.shp` (Morocco coastline)
  - `GRILLE/grill_adam.shp` (Grid for visualization)

## CSV Data Format

The application accepts CSV files with the following columns:
- LAT_DD: Latitude in decimal degrees
- LONG_DD: Longitude in decimal degrees
- Salinite: Salinity
- Temp: Temperature
- DO: Dissolved Oxygen
- pH: pH level

## How to Use

1. Start both the frontend and backend servers
2. Open the frontend in your browser (typically at http://localhost:5173)
3. Upload a CSV file with the required parameters
4. Select the species (sardine or rails)
5. Click "Generate Map" to create the prediction visualization
6. Download the generated map if needed
