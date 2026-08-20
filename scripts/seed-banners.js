const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://Amani Outfits:S4Epscw0SOkd5ZtG@cluster0.e5n1hnl.mongodb.net/Amani Outfits';
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'ELEGANCE IN MOTION',
    image: '/assets/images/Banner/photo_2026-08-20_17-59-24.webp',
    link: '/shop',
    primaryBtnText: 'SHOP COLLECTION',
    primaryBtnLink: '/shop',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 1,
    isActive: true,
  },
  {
    title: 'EXCLUSIVE FESTIVE WEAR',
    image: '/assets/images/Banner/photo_2026-08-20_17-59-25.webp',
    link: '/shop',
    primaryBtnText: 'EXPLORE NOW',
    primaryBtnLink: '/shop',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 2,
    isActive: true,
  },
  {
    title: 'TRADITIONAL MODERNITY',
    image: '/assets/images/Banner/photo_2026-08-20_17-59-25 (3).webp',
    link: '/shop',
    primaryBtnText: 'DISCOVER TRENDS',
    primaryBtnLink: '/shop',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 3,
    isActive: true,
  },
  {
    title: 'STUNNING SUMMER STYLES',
    image: '/assets/images/Banner/photo_2026-08-20_17-59-26.webp',
    link: '/shop',
    primaryBtnText: 'SHOP NOW',
    primaryBtnLink: '/shop',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 4,
    isActive: true,
  },
  {
    title: 'UNVEILING LUXURY OUTFITS',
    image: '/assets/images/Banner/WhatsApp Image 2026-08-18 at 18.02.34.webp',
    link: '/shop',
    primaryBtnText: 'VIEW LOOKBOOK',
    primaryBtnLink: '/shop',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
