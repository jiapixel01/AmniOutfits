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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'What types of products does Amani Outfits offer?',
    answer: 'Amani Outfits offers a premium lifestyle range including traditional sarees (Jamdani, Silk, Tangail), elegant menswear (Panjabis, Shirts, Pajamas), kids wear, handcrafted jewellery, home decor items (bedcovers, cushion covers), and unique gifts & crafts.',
    order: 1,
    isActive: true,
  },
  {
    question: 'What kind of fabrics and materials do you use?',
    answer: 'We use high-quality, authentic handloom cotton, Rajshahi silk, Jamdani fabrics, and genuine leather for our bags and footwear. Our jewellery is crafted from premium metals, oxidized silver, and freshwater pearls.',
    order: 2,
    isActive: true,
  },
  {
    question: 'How should I care for my silk sarees and embroidered Panjabis?',
    answer: 'We highly recommend dry cleaning for all silk sarees (Katan, Rajshahi silk, Jamdani) and heavily embroidered or zardozi-work Panjabis to preserve the delicate fabric, color, and intricate metal work.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Do you offer customization or custom sizing for wedding attire?',
    answer: 'Currently, our wedding collection comes in standard sizes as listed in the size chart. However, you can contact our customer care or visit our showroom for any minor adjustments or special orders.',
    order: 4,
    isActive: true,
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'We offer a hassle-free 7-day exchange policy. If you face any sizing or quality issues, you can exchange the item as long as it is unused, unwashed, and has all original tags and packaging intact.',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i + 1}] Question: "${f.question}"`);
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
