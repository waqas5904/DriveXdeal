import mongoose from "mongoose";

const amountWithRateSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 }, // e.g. 23234
    rate: { type: Number, required: true, min: 0 }, // conversion rate
    totalAmount: { type: Number, required: true, min: 0 }, // amount × rate
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    // Basic Car Information
    carName: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    carModel: { type: String, required: true, trim: true },
    carType: {
      type: String,
      enum: ["SUV", "Sedan", "Hatchback", "Truck", "Van", "Other"],
      required: true,
    },

    engineNumber: { type: String, required: true, trim: true },
    chasisNumber: { type: String, required: true, trim: true , unique: true},
    auctionGrade: { type: Number, required: true, min: 1, max: 5 },
    importYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    assembly: { type: String, enum: ["local", "import"], required: true },
    engineCapacity: { type: String, required: true, trim: true },
    interiorColor: { type: String, required: true, trim: true },
    mileage: { type: String, required: true, trim: true },
    keywords: [{ type: String, trim: true }],

    // Car Status
    status: {
      type: String,
      enum: ["sold", "transit", "warehouse", "showroom"],
      default: "warehouse",
    },
    color: { type: String, required: true, trim: true },
    deliveryTimeframe: { type: String, required: true, trim: true },
    batchNo: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    // Financing (with amount + currency + rate)
    financing: {
      originCity: { type: String, required: true, trim: true },
      destinationCity: { type: String, required: true, trim: true },

      auctionPrice: { type: amountWithRateSchema, required: true },
      auctionTaxes: { type: amountWithRateSchema, required: true },
      inlandCharges: { type: amountWithRateSchema, required: true },
      loadingCharges: { type: amountWithRateSchema, required: true },
      containerCharges: { type: amountWithRateSchema, required: true },
      freightSea: { type: amountWithRateSchema, required: true },

      // Simple PKR values
      variantDuty: { type: Number, required: true, min: 0 },
      passportCharges: { type: Number, required: true, min: 0 },
      serviceCharges: { type: Number, required: true, min: 0 },
      transportCharges: { type: Number, required: true, min: 0 },
      repairCharges: { type: Number, required: true, min: 0 },
      miscellaneousCharges: { type: Number, required: true, min: 0 },
    },

    // Sale Info
    saleInfo: {
      soldPrice: { type: Number, min: 0 },
      soldDate: { type: Date },
      buyerInfo: {
        name: { type: String, trim: true },
        contactNumber: { type: String, trim: true },
        emailAddress: { type: String, trim: true, lowercase: true },
        cnic: { type: String, trim: true },
      },
    },

    // Images and Documents
    images: {
      invoiceReceipt: { type: String, required: true, trim: true },
      coverPhoto: { type: String, required: true, trim: true },
      auctionSheet: { type: String, required: true, trim: true },
      carPictures: [{ type: String, required: true, trim: true }],
    },

    // Extra
    notes: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Virtual: total cost calculation
carSchema.virtual("totalCost").get(function () {
  const f = this.financing;
  if (!f) return 0;

  return (
    (f.auctionPrice?.totalAmount || 0) +
    (f.auctionTaxes?.totalAmount || 0) +
    (f.inlandCharges?.totalAmount || 0) +
    (f.loadingCharges?.totalAmount || 0) +
    (f.containerCharges?.totalAmount || 0) +
    (f.freightSea?.totalAmount || 0) +
    f.variantDuty +
    f.passportCharges +
    f.serviceCharges +
    f.transportCharges +
    f.repairCharges +
    f.miscellaneousCharges
  );
});

// Validation: minimum 4 car images
carSchema.pre("save", function (next) {
  if (this.images?.carPictures?.length < 4) {
    next(new Error("At least 4 car pictures are required"));
  } else {
    next();
  }
});

// Force model recompilation to ensure latest schema
if (mongoose.models.Car) {
  delete mongoose.models.Car;
}
const Car = mongoose.model("Car", carSchema);
export default Car;
