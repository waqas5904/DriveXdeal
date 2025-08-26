import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Car } from '@/lib/models';
import { CreateCarInput } from '@/lib/models/types';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Helper function to save uploaded files
async function saveUploadedFile(file: File, folder: string): Promise<string> {
  if (!file) return '';
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(uploadsDir, { recursive: true });
  
  // Generate unique filename
  const timestamp = Date.now();
  const originalName = file.name;
  const extension = path.extname(originalName);
  const filename = `${timestamp}_${originalName}`;
  
  // Save file
  const filePath = path.join(uploadsDir, filename);
  await writeFile(filePath, buffer);
  
  // Return public URL
  return `/uploads/${folder}/${filename}`;
}

// GET /api/cars - Get all cars with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const batchNo = searchParams.get('batchNo');
    const status = searchParams.get('status');
    const company = searchParams.get('company');
    const auctionGrade = searchParams.get('auctionGrade');
    const isFeatured = searchParams.get('isFeatured');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (batchNo) {
      filter.batchNo = batchNo;
    }
    
    if (status) {
      // Handle new status values
      const validStatuses = ['sold', 'transit', 'warehouse', 'showroom'];
      if (validStatuses.includes(status)) {
        filter.status = status;
      }
    }
    
    if (company) {
      filter.company = { $regex: company, $options: 'i' };
    }
    
    if (auctionGrade) {
      filter.auctionGrade = parseInt(auctionGrade);
    }
    
    if (isFeatured !== null) {
      filter.isFeatured = isFeatured === 'true';
    }

    // Execute query with pagination
    const cars = await Car.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Car.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}

// POST /api/cars - Create a new car
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Handle FormData for file uploads
    const formData = await request.formData();
    
    // Extract file data
    const coverPhoto = formData.get('coverPhoto') as File;
    const invoiceReceipt = formData.get('invoiceReceipt') as File;
    const auctionSheet = formData.get('auctionSheet') as File;
    const carPictures = formData.getAll('carPictures') as File[];
    
    // Extract JSON data
    const carDataJson = formData.get('carData') as string;
    const body: CreateCarInput = JSON.parse(carDataJson);
    
    console.log('Received car data:', JSON.stringify(body, null, 2));
    console.log('Files received:', {
      coverPhoto: coverPhoto?.name,
      invoiceReceipt: invoiceReceipt?.name,
      auctionSheet: auctionSheet?.name,
      carPictures: carPictures.map(f => f.name)
    });

    // Save uploaded files and get their paths
    const coverPhotoPath = await saveUploadedFile(coverPhoto, 'cover-photos');
    const invoiceReceiptPath = await saveUploadedFile(invoiceReceipt, 'invoices');
    const auctionSheetPath = await saveUploadedFile(auctionSheet, 'auction-sheets');
    
    const carPicturesPaths = await Promise.all(
      carPictures.map(file => saveUploadedFile(file, 'car-pictures'))
    );
    
    // Update body with file paths
    body.images = {
      coverPhoto: coverPhotoPath,
      invoiceReceipt: invoiceReceiptPath,
      auctionSheet: auctionSheetPath,
      carPictures: carPicturesPaths.filter(path => path !== '')
    };
    
    // Validate required fields
    const requiredFields = [
      'carName', 'company', 'carModel', 'carType', 'engineNumber', 'chasisNumber', 
      'auctionGrade', 'importYear', 'assembly', 'engineCapacity',
      'interiorColor', 'mileage', 'color', 'deliveryTimeframe',
      'batchNo', 'description', 'financing', 'images'
    ];
    
    for (const field of requiredFields) {
      if (!body[field as keyof CreateCarInput]) {
        return NextResponse.json(
          { success: false, error: `Missing required field in car discreiption: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate financing fields
    const simpleFinancingFields = [
      'originCity', 'destinationCity', 'variantDuty', 'passportCharges', 
      'serviceCharges', 'transportCharges', 'repairCharges', 'miscellaneousCharges'
    ];
    
    for (const field of simpleFinancingFields) {
      if (!body.financing[field as keyof typeof body.financing]) {
        return NextResponse.json(
          { success: false, error: `Missing required financing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate complex financing fields (objects with amount, currency, rate, totalAmount)
    const complexFinancingFields = [
      'auctionPrice', 'auctionTaxes', 'inlandCharges', 'loadingCharges', 
      'containerCharges', 'freightSea'
    ];
    
    for (const field of complexFinancingFields) {
      const fieldData = body.financing[field as keyof typeof body.financing];
      if (!fieldData || typeof fieldData !== 'object') {
        return NextResponse.json(
          { success: false, error: `Missing required financing field: ${field}` },
          { status: 400 }
        );
      }
      
      const requiredSubFields = ['amount', 'rate', 'totalAmount'];
      for (const subField of requiredSubFields) {
        if (!(subField in fieldData)) {
          return NextResponse.json(
            { success: false, error: `Missing required sub-field: ${field}.${subField}` },
            { status: 400 }
          );
        }
      }
    }

    // Validate images
    if (!body.images.carPictures || body.images.carPictures.length < 4) {
      return NextResponse.json(
        { success: false, error: 'At least 4 car pictures are required' },
        { status: 400 }
      );
    }

    // Validate other required images
    const requiredImages = ['invoiceReceipt', 'coverPhoto', 'auctionSheet'];
    for (const imageField of requiredImages) {
      if (!body.images[imageField as keyof typeof body.images]) {
        return NextResponse.json(
          { success: false, error: `Missing required image: ${imageField}` },
          { status: 400 }
        );
      }
    }

    // Find the batch by batch number and add car to it
    const Batch = (await import('@/lib/models')).Batch;
    const existingBatch = await Batch.findOne({ batchNo: body.batchNo });
    
    if (!existingBatch) {
      return NextResponse.json(
        { success: false, error: `Batch with number "${body.batchNo}" not found. Please create the batch first.` },
        { status: 404 }
      );
    }

    // Create new car
    console.log('Creating car with data:', JSON.stringify(body, null, 2));
    const car = new Car(body);
    console.log('Car instance created:', car);
    
    const savedCar = await car.save();
    console.log('Car saved successfully:', savedCar);

    // Add the car to the batch's cars array
    await Batch.findByIdAndUpdate(
      existingBatch._id,
      { $push: { cars: savedCar._id } }
    );

    console.log(`Car ${savedCar._id} added to batch ${existingBatch.batchNo}`);

    return NextResponse.json({
      success: true,
      data: savedCar,
      message: 'Car created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating car:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      if (field === 'chasisNumber') {
        return NextResponse.json(
          { success: false, error: 'A car with this chassis number already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Car with this engine number or chassis number already exists' },
        { status: 409 }
      );
    }

    // Handle cast errors
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid data format provided' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Failed to create car: ${error.message}` },
      { status: 500 }
    );
  }
}
