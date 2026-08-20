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
  },
  { timestamps: true }
);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    purchasePrice: { type: Number },
    discountRate: { type: Number },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, default: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    images: [{ type: String }],
    attributes: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
    variants: [
      {
        color: { type: String },
        size: { type: String },
        price: { type: Number, required: true },
        salePrice: { type: Number },
        purchasePrice: { type: Number },
        discountRate: { type: Number },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isFlashSale: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.pre('validate', function() {
  if (this.salePrice !== undefined && this.salePrice !== null && this.salePrice > this.price) {
    throw new Error(`Sale price should be lower than or equal to regular price`);
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Category Mapping Function
function getCategorySlug(filename) {
  const name = filename.toLowerCase();
  if (name.includes('kids')) return 'kids';
  if (name.includes('wedding') || name.includes('bridal') || name.includes('groom')) return 'wedding';
  if (
    name.includes('necklace') || 
    name.includes('pendant') || 
    name.includes('choker') || 
    name.includes('pearl') || 
    name.includes('jewellery') || 
    name.includes('bead') || 
    name.includes('stone')
  ) {
    return 'jewellery';
  }
  if (name.includes('bedcover') || name.includes('cushion')) return 'home-decor';
  if (name.includes('bag') || name.includes('clutch') || name.includes('tote') || name.includes('craft')) return 'gifts-crafts';
  if (name.includes('skin') || name.includes('hair') || name.includes('beauty') || name.includes('cosmetic')) return 'beauty';
  if (
    name.includes('panjabi') || 
    name.includes('shirt') || 
    name.includes('nagra') ||
    (name.includes('pajama') && !name.includes('kameez'))
  ) {
    return 'men';
  }
  return 'women';
}

// Title generator
function getTitle(filename) {
  const nameWithoutExt = filename.replace('.webp', '');
  return nameWithoutExt
    .split('-')
    .map(word => {
      if (word === 'taaga') return 'Taaga';
      if (word === 'benarasi') return 'Benarasi';
      if (word === 'kolhapuri') return 'Kolhapuri';
      if (word === 'nagra') return 'Nagra';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Realistic description generator
function getDescription(title, slug) {
  const name = title.toLowerCase();
  if (name.includes('saree')) {
    return `An exquisite ${title} highlighting premium Bangladeshi heritage. Handcrafted with fine thread-work and traditional motifs, this saree offers an elegant drape and a luxurious feel. Perfect for festive celebrations, cultural programs, and weddings.`;
  }
  if (name.includes('panjabi')) {
    return `Elevate your ethnic wardrobe with this premium ${title}. Expertly tailored from comfortable, breathable fabric, it features intricate embroidery around the collar and placket. Ideal for Eid, weddings, and traditional gatherings.`;
  }
  if (name.includes('shirt')) {
    return `A modern casual ${title} designed for day-long comfort. Made from lightweight, breathable fabric, it showcases subtle prints/texture, a sharp collar, and a smart fit. Perfect for smart-casual wear and summer outings.`;
  }
  if (name.includes('bedcover')) {
    return `Enhance your bedroom decor with this stunning ${title}. Featuring beautiful traditional block prints and fine hand-stitched detailing, it is crafted from 100% premium cotton for ultimate softness and durability.`;
  }
  if (name.includes('cushion')) {
    return `Add a touch of heritage and color to your living room with this ${title}. Made from high-quality durable fabric with intricate Nakshi Kantha embroidery/applique details. Features a concealed zipper.`;
  }
  if (name.includes('necklace') || name.includes('choker') || name.includes('pendant')) {
    return `A statement accessory that speaks of pure elegance. This ${title} is handcrafted with meticulous detail, blending traditional ethnic charm with a contemporary aesthetic. Pairs beautifully with any festive attire.`;
  }
  if (name.includes('sandal') || name.includes('heel') || name.includes('nagra') || name.includes('slide')) {
    return `Handcrafted ethnic footwear designed for the perfect blend of traditional elegance and modern comfort. Features a cushioned footbed and durable sole, making it suitable for weddings and festive occasions.`;
  }
  if (name.includes('bag') || name.includes('clutch') || name.includes('tote')) {
    return `A beautiful and practical handcrafted ${title}. Made from premium materials and featuring ethnic motifs, it offers ample space for your essentials while adding a sophisticated traditional touch to your look.`;
  }
  if (slug.includes('kids')) {
    return `A comfortable and adorable outfit for your little one. Made from ultra-soft, breathable cotton, it features vibrant colors and kid-friendly textures, ensuring style and comfort for festive wear or play.`;
  }
  return `A beautifully crafted ${title} from our exclusive collection. Features high-quality materials, premium stitching, and a classic design that seamlessly blends traditional style with modern fashion trends.`;
}

// Realistic Price generator
function getPrice(filename) {
  const name = filename.toLowerCase();
  if (name.includes('benarasi') || name.includes('bridal') || name.includes('wedding')) {
    return 12500 + Math.floor(Math.random() * 12500); // ৳12,500 - ৳25,000
  }
  if (name.includes('jamdani')) {
    return 4500 + Math.floor(Math.random() * 5500); // ৳4,500 - ৳10,000
  }
  if (name.includes('saree')) {
    return 1800 + Math.floor(Math.random() * 3200); // ৳1,800 - ৳5,000
  }
  if (name.includes('panjabi')) {
    return 1800 + Math.floor(Math.random() * 3000); // ৳1,800 - ৳4,800
  }
  if (name.includes('shirt')) {
    return 1100 + Math.floor(Math.random() * 1100); // ৳1,100 - ৳2,200
  }
  if (name.includes('bedcover')) {
    return 2200 + Math.floor(Math.random() * 2300); // ৳2,200 - ৳4,500
  }
  if (name.includes('cushion')) {
    return 350 + Math.floor(Math.random() * 450); // ৳350 - ৳800
  }
  if (name.includes('kids')) {
    return 800 + Math.floor(Math.random() * 1200); // ৳800 - ৳2,000
  }
  if (name.includes('necklace') || name.includes('choker') || name.includes('jewellery') || name.includes('pendant')) {
    return 700 + Math.floor(Math.random() * 3300); // ৳700 - ৳4,000
  }
  if (name.includes('bag') || name.includes('tote') || name.includes('clutch')) {
    return 1200 + Math.floor(Math.random() * 2300); // ৳1,200 - ৳3,500
  }
  if (name.includes('sandal') || name.includes('heel') || name.includes('nagra') || name.includes('slide')) {
    return 950 + Math.floor(Math.random() * 1550); // ৳950 - ৳2,500
  }
  return 1500 + Math.floor(Math.random() * 1500); // ৳1,500 - ৳3,000
}

// Colors list
function getColors(filename) {
  const name = filename.toLowerCase();
  const colors = [];
  const colorKeywords = [
    'beige', 'black', 'burgundy', 'charcoal', 'crimson', 'deep-navy', 'deep-teal', 'emerald', 'golden-beige', 'indigo', 'ivory', 'lemon', 'lilac', 'mustard', 'navy', 'ochre', 'off-white', 'olive', 'peach', 'pink', 'plum', 'royal-golden', 'ruby', 'rust', 'sage', 'scarlet', 'silver', 'terracotta', 'turquoise', 'white'
  ];
  for (const c of colorKeywords) {
    if (name.includes(c)) {
      colors.push(c.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    }
  }
  if (colors.length === 0) colors.push('Multicolor');
  return colors;
}

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing products
    const delResult = await Product.deleteMany({});
    console.log(`Cleared ${delResult.deletedCount} existing products.`);

    // Load categories
    const dbCategories = await Category.find({});
    const categoryMap = {};
    dbCategories.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    const productsDir = path.join(__dirname, '../public/assets/images/products/arong');
    const filenames = fs.readdirSync(productsDir).filter(f => f.endsWith('.webp'));

    console.log(`Found ${filenames.length} product images in ${productsDir}`);

    const finalProducts = [];

    // Indices for sections:
    // We want:
    // - 10 Flash Sale items (indices 0 to 9)
    // - 10 Featured items (indices 10 to 19)
    // - 10 New Arrival items (indices 20 to 29)
    // - 10 Discounted items (indices 30 to 39)
    
    filenames.forEach((filename, index) => {
      const title = getTitle(filename);
      const categorySlug = getCategorySlug(filename);
      const categoryId = categoryMap[categorySlug];

      if (!categoryId) {
        console.error(`Category ${categorySlug} not found in DB!`);
        return;
      }

      const price = getPrice(filename);
      const purchasePrice = Math.round(price * 0.4); // 40% purchase price

      let isFlashSale = false;
      let isFeatured = false;
      let isNewArrival = false;
      let discountRate = undefined;
      let salePrice = undefined;

      // Assign sections as requested
      if (index >= 0 && index < 10) {
        isFlashSale = true;
        discountRate = 20 + (index % 4) * 5; // 20%, 25%, 30%, 35%
        salePrice = Math.round((price * (100 - discountRate)) / 100);
      } else if (index >= 10 && index < 20) {
        isFeatured = true;
      } else if (index >= 20 && index < 30) {
        isNewArrival = true;
      } else if (index >= 30 && index < 40) {
        // Standard discounted items (not flash sale)
        discountRate = 10 + (index % 3) * 5; // 10%, 15%, 20%
        salePrice = Math.round((price * (100 - discountRate)) / 100);
      }

      // Sizes configuration
      let sizes = ['Free Size'];
      const nameLower = filename.toLowerCase();
      if (
        nameLower.includes('panjabi') || 
        nameLower.includes('shirt') || 
        nameLower.includes('kurta') || 
        nameLower.includes('kameez') || 
        nameLower.includes('top') || 
        nameLower.includes('tunic') || 
        nameLower.includes('dress')
      ) {
        sizes = ['S', 'M', 'L', 'XL', 'XXL'];
      } else if (nameLower.includes('kids')) {
        sizes = ['4-5Y', '6-7Y', '8-9Y', '10-11Y'];
      } else if (nameLower.includes('bedcover')) {
        sizes = ['Double', 'King', 'Queen'];
      } else if (nameLower.includes('sandal') || nameLower.includes('heel') || nameLower.includes('nagra') || nameLower.includes('slide')) {
        if (categorySlug === 'men') {
          sizes = ['39', '40', '41', '42', '43', '44'];
        } else {
          sizes = ['36', '37', '38', '39', '40'];
        }
      }

      const colors = getColors(filename);
      const sku = `AM-${categorySlug.toUpperCase().slice(0, 3)}-${String(index + 1).padStart(3, '0')}`;
      const stock = 20 + Math.floor(Math.random() * 40);

      // Attributes
      const attributes = [
        { key: 'Brand', value: 'Amani Outfits' },
        { key: 'Colors', value: colors.join(', ') },
      ];

      if (nameLower.includes('cotton')) attributes.push({ key: 'Material', value: '100% Fine Cotton' });
      else if (nameLower.includes('silk')) attributes.push({ key: 'Material', value: 'Premium Silk' });
      else if (nameLower.includes('leather')) attributes.push({ key: 'Material', value: 'Genuine Leather' });

      // Variants
      const variants = [];
      sizes.forEach(sz => {
        colors.forEach(col => {
          variants.push({
            color: col,
            size: sz,
            price: price,
            salePrice: salePrice,
            purchasePrice: purchasePrice,
            discountRate: discountRate,
            stock: Math.floor(stock / (sizes.length * colors.length)) || 5,
            sku: `${sku}-${sz}-${col.toUpperCase().slice(0, 3)}`,
          });
        });
      });

      finalProducts.push({
        name: title,
        slug: filename.replace('.webp', ''),
        description: getDescription(title, categorySlug),
        price,
        salePrice,
        purchasePrice,
        discountRate,
        sku,
        stock,
        categories: [categoryId],
        tags: [title.toLowerCase(), categorySlug],
        images: [`/assets/images/products/arong/${filename}`],
        attributes,
        variants,
        isFeatured,
        isNewArrival,
        isFlashSale,
        isPublished: true,
        ratings: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)),
        numReviews: 5 + Math.floor(Math.random() * 45),
        views: 100 + Math.floor(Math.random() * 500),
        totalSales: 10 + Math.floor(Math.random() * 50),
      });
    });

    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Successfully seeded ${insertResult.length} products!`);

    const flashCount = insertResult.filter(p => p.isFlashSale).length;
    const featCount = insertResult.filter(p => p.isFeatured).length;
    const newCount = insertResult.filter(p => p.isNewArrival).length;
    const discCount = insertResult.filter(p => p.discountRate && !p.isFlashSale).length;

    console.log(`Seeding Breakdown:`);
    console.log(`- Flash Sale: ${flashCount}`);
    console.log(`- Featured: ${featCount}`);
    console.log(`- New Arrival: ${newCount}`);
    console.log(`- Standard Discounted: ${discCount}`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
