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
  mongodbUri = 'mongodb+srv://Amani Outfits:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/Amani Outfits';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const fashionCategories = [
  {
    name: 'Women',
    slug: 'women',
    image: '/assets/images/cagetory/D1-Women-Dp-Thumb-Summer26-02-07-2026-SM.webp',
    isActive: true,
  },
  {
    name: 'Men',
    slug: 'men',
    image: '/assets/images/cagetory/D2-Men-Dp-Thumb-Summer26-02-07-2026-SM.webp',
    isActive: true,
  },
  {
    name: 'Kids',
    slug: 'kids',
    image: '/assets/images/cagetory/D-Dept-Thumb-KIDS-Sum26-08-07-2026-SM.webp',
    isActive: true,
  },
  {
    name: 'Jewellery',
    slug: 'jewellery',
    image: '/assets/images/cagetory/d-jewellery-eid2-dept-thum-30-04-2026-sm.webp',
    isActive: true,
  },
  {
    name: 'Wedding',
    slug: 'wedding',
    image: '/assets/images/cagetory/200-8-D-aarong-wedding-dept-thumb-19-07-2025.webp',
    isActive: true,
  },
  {
    name: 'Home Decor',
    slug: 'home-decor',
    image: '/assets/images/cagetory/D-HD-Dept-Thumb-EID2-Full-Launch-23-04-2026-SM.webp',
    isActive: true,
  },
  {
    name: 'Gifts & Crafts',
    slug: 'gifts-crafts',
    image: '/assets/images/cagetory/d-gift-crafts-dept-thumb-10-09-2025-sm.webp',
    isActive: true,
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    image: '/assets/images/cagetory/D-AE-Skin-and-Hair-Dept-Thumb-10-05-2026-SM.webp',
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing categories
    const deleteResult = await Category.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing categories.`);

    // Insert new fashion categories
    const insertResult = await Category.insertMany(fashionCategories);
    console.log(`Seeded ${insertResult.length} fashion categories successfully:`);
    insertResult.forEach((cat, idx) => {
      console.log(`[Category ${idx + 1}] Name: "${cat.name}", Slug: "${cat.slug}", Image: "${cat.image}"`);
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
