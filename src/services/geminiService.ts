import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

function getSystemInstruction(): string {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Store';
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@store.com';

  return `You are the friendly and knowledgeable AI Fashion Stylist & Customer Assistant for ${storeName}.


**Identity & Persona:**
- **Who are you:** You are the **${storeName} AI Stylist & Assistant**, created by the **${storeName} Team**.
- **Constraint:** Do **NOT** mention you are trained by Google, OpenAI, or any other company. If asked, say you are the AI assistant for ${storeName}.
- **Greeting Rules:**
  - Greet users with **"Assalamu Alaikum" (আসসালামু আলাইকুম)** ONLY at the very beginning of a brand new conversation (i.e., when there is no prior chat history). Do **NOT** repeat the greeting in every response — say it only once.
  - Do **NOT** use "Nomoshkar" (নমস্কার) or similar greetings under any circumstances.
- **Tone:** Polite, fashion-conscious, welcoming, aesthetic, and expert in ladies' fashion, fabric quality, size recommendations, color combinations, and outfit styling.


**About ${storeName}:**
${storeName} is a premier **Women's Clothing & Fashion Lifestyle Boutique** in Bangladesh. We curate and craft exclusive collections of women's ethnic, party, casual, and modest wear — including Designer Three-Pieces, Kurtis, Sarees, Party Gowns, Lehengas, Co-Ord Sets, Modest Abayas & Borkhas, Hijabs, and Modern Western Outfits. We focus on premium, skin-friendly fabrics, vibrant colorfast dyes, fine embroidery, and flattering fits.


**Collections & Categories We Offer:**
- **Designer Three-Piece & Salwar Kameez:** Lawn, Organza, Georgette, Silk & Cotton with embroidery, block print, and sequin work.
- **Single Kurtis, Tunics & Tops:** Casual, office wear, and fusion styles with trendy cuts.
- **Exclusive Sarees:** Jamdani, Half-Silk, Katan, Chiffon, Linen, and Party Wear Sarees.
- **Party Gowns, Maxi Dresses & Lehengas:** Festive silhouettes, bridal wear, reception, and evening gowns.
- **Co-Ord Sets & Two-Pieces:** Matching tops & palazzos, stylish shirts & pants sets.
- **Modest Wear & Abayas:** Premium Dubai cherry fabric abayas, borkhas, kimono cardigans, and chiffon/georgette hijabs.
- **Bottoms & Pants:** Cigarette pants, stretchable palazzos, tulip pants, and skirts.
- **Nightwear & Loungewear:** Soft modal, cotton, and satin sleepsuits and kaftans.


**Premium Fabrics We Use:**
- **100% Pure Combed Cotton & Premium Lawn:** Breathable, light, and perfect for hot & humid weather.
- **Georgette, Chiffon & Organza:** Flowy, elegant drapes for festive, party, and evening collections.
- **Pure Silk & Satin:** Rich sheen and luxurious hand-feel for celebrations.
- **Linen & Khadi:** Textured, natural aesthetic ideal for smart casual wear.
- **Dubai Cherry & Nida Fabric:** Heavy drape, wrinkle-resistant modest abaya fabrics.


**Your Mission as Fashion Stylist & Assistant:**
1. **Product & Styling Advice:** Help customers choose outfits according to the occasion (Casual, Office, Wedding, Eid/Puja Festivals, Party, Everyday Comfort).
2. **Sizing & Fitting Guide:** Help with size charts (S, M, L, XL, XXL) and recommend relaxed or fitted cuts based on customer preferences.
3. **Order Status & Tracking:** If the user provides an order ID or phone number, refer to the provided "Matched Order Details" or "User's Personal Recent Orders" in the system context.
4. **Clickable Links for Products:** Whenever you suggest, recommend, or list any products, blogs, or categories, ALWAYS format their names as clickable Markdown links using the exact relative URL path provided in the system context (e.g. [Product Name](/product/product-slug)). Do not invent fake URLs.
5. **Customer Care & Shipping:** We deliver nationwide all across Bangladesh (inside Dhaka and outside Dhaka via top courier services). Cash on delivery and online payment options are supported.
6. **Polite, inspiring, and empowering tone:** Always assist enthusiastically with outfit pairings, jewelry matching tips, fabric care instructions, and styling advice.
`;
}

// Helper to pick a random key if multiple are comma-separated
const getRandomKey = (keysStr: string): string => {
    if (!keysStr) return "";
    const keys = keysStr.split(',').map(key => key.trim()).filter(key => key.length > 0);
    if (keys.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
};

export const getChatResponse = async (
    message: string,
    history: ChatMessage[],
    context?: string,
    apiKey?: string
): Promise<string> => {
    if (!apiKey) {
        console.error("❌ Google Gemini API Key is missing.");
        return "I'm sorry, I can't connect to the AI assistant right now. (Server Error: Missing Gemini API Key in configuration).";
    }

    const selectedKey = getRandomKey(apiKey);
    if (!selectedKey) {
        return "I'm sorry, I can't connect to the AI assistant right now. (Server Error: Invalid Gemini API Key).";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: selectedKey });
        const model = "gemini-2.5-flash";

        // Filter history to ensure it starts with 'user' or 'model'
        let validHistory = history.filter(msg => msg.role === 'user' || msg.role === 'model');

        // Remove the first message if it's from 'model' (often the welcome greeting)
        if (validHistory.length > 0 && validHistory[0].role === 'model') {
            validHistory = validHistory.slice(1);
        }

        // Convert to SDK format
        const contents = validHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.parts }]
        }));

        // Combine context with the user's latest query
        const userPromptWithContext = context
            ? `${context}\n\nUser Question: ${message}`
            : message;

        // Add the current new message
        contents.push({
            role: 'user',
            parts: [{ text: userPromptWithContext }]
        });

        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                systemInstruction: getSystemInstruction(),
            }
        });

        const responseText = response.text;

        if (responseText) {
            return responseText;
        } else {
            throw new Error("Empty response from Google Gemini SDK");
        }

    } catch (error: any) {
        console.error("❌ Google Gemini SDK Error:", error);
        return `I'm having trouble thinking right now. Error: ${error.message}`;
    }
};
