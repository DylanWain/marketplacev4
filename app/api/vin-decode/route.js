// VIN Decode API - Uses real NHTSA data
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { vin } = await request.json();
    
    if (!vin || vin.length !== 17) {
      return NextResponse.json({ error: 'VIN must be 17 characters' }, { status: 400 });
    }
    
    // Call NHTSA API
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
    );
    const data = await response.json();
    
    if (!data.Results?.[0]) {
      return NextResponse.json({ error: 'No data from NHTSA' }, { status: 404 });
    }
    
    const r = data.Results[0];
    
    // Get recalls for this vehicle
    let recalls = [];
    if (r.Make && r.Model && r.ModelYear) {
      try {
        const recallRes = await fetch(
          `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(r.Make)}&model=${encodeURIComponent(r.Model)}&modelYear=${r.ModelYear}`
        );
        const recallData = await recallRes.json();
        recalls = (recallData.results || []).map(rec => ({
          campaign: rec.NHTSACampaignNumber,
          component: rec.Component,
          summary: rec.Summary,
          remedy: rec.Remedy,
        }));
      } catch (e) {
        console.log('Recall fetch failed:', e);
      }
    }
    
    return NextResponse.json({
      success: true,
      source: 'NHTSA',
      vehicle: {
        vin: vin.toUpperCase(),
        year: r.ModelYear,
        make: r.Make,
        model: r.Model,
        trim: r.Trim || r.Series,
        bodyStyle: r.BodyClass,
        driveType: r.DriveType,
        fuelType: r.FuelTypePrimary,
        engine: r.DisplacementL ? `${r.DisplacementL}L ${r.EngineCylinders || ''}-cyl` : null,
        transmission: r.TransmissionStyle,
        manufacturer: r.Manufacturer,
        plantCountry: r.PlantCountry,
      },
      safety: {
        abs: r.ABS === 'Standard',
        airbagsFront: !!r.AirBagLocFront,
        airbagsside: !!r.AirBagLocSide,
        esc: r.ESC === 'Standard',
        backupCamera: r.BackupCamera === 'Standard',
        blindSpot: r.BlindSpotMon === 'Standard',
      },
      recalls: recalls,
      recallCount: recalls.length,
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
