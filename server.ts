import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini instance
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are Saniffy, the intelligent and friendly AI assistant for PetConnect (Nepal's pet adoption and welfare network across Kathmandu, Lalitpur, and Bhaktapur).
You assist users with any questions regarding:
1. The PetConnect website and features:
   - Browsing and searching for adoptable dogs, puppies, cats, and kittens.
   - Featured breeds like Japanese Spitz (Yuki in Lazimpat, Koko in Thamel), Persian Cats (Luna), Golden Retrievers (Charlie), Nepali Indies (Maya & Simba), Beagles, German Shepherds, and Siamese cats.
   - How to filter by location (Kathmandu, Lalitpur/Patan, Bhaktapur, Baneshwor, Jhamsikhel, Boudha, Baluwatar, etc.).
   - Posting a free pet adoption or rehoming ad.
   - Online payments & donations (supports eSewa, Khalti, Fonepay, Mobile Banking, and Cards).
   - Dr. Shreya Karki's Valley Veterinary Desk for free pre-adoption triage, core vaccines, rabies timelines, monsoon skin care, and 24/7 Kathmandu Valley animal rescue hotlines.
   - Sponsoring shelters and rescue groups across Nepal.
2. Tone & Personality:
   - Warm, compassionate, helpful, concise, and pet-loving.
   - Include relevant emojis (🐾, 🐶, 🐱, 💖, 🩺, 🇳🇵).
   - If users ask how to do something on the site, provide direct step-by-step guidance.
   - Keep answers clear and formatted with neat bullet points or short paragraphs.`;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PetConnect Saniffy AI' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    if (ai) {
      // Use Gemini API
      const formattedHistory = Array.isArray(history)
        ? history.slice(-8).map((h: { role: string; text: string }) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          }))
        : [];

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [
          ...formattedHistory,
          {
            role: 'user',
            parts: [{ text: message }],
          },
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Hello! I am Saniffy, your PetConnect AI assistant. How can I help you find or care for your furry companion today? 🐾";
      res.json({ reply: replyText });
      return;
    }

    // Smart built-in fallback knowledge responses if API key is not configured yet
    const query = message.toLowerCase();
    let reply = "";

    if (query.includes('japanese spitz') || query.includes('spitz') || query.includes('yuki') || query.includes('koko')) {
      reply = "❄️ **Japanese Spitz on PetConnect**:\n- **Yuki**: 1.5-year-old snowy white female in Lazimpat. Known for double twirl spins, high cuddle score (99%), and friendly temperament with kids!\n- **Koko**: 5-month-old energetic puppy in Thamel looking for a loving home.\n\nYou can view and adopt both in the **Browse Pets** tab by filtering for Japanese Spitz! 🐾";
    } else if (query.includes('adopt') || query.includes('how to adopt')) {
      reply = "🐾 **How to Adopt a Pet on PetConnect**:\n1. Click **Browse Pets** or use the top search bar.\n2. Filter by pet type, breed (Japanese Spitz, Persian, Indie, etc.), or area in Kathmandu Valley.\n3. Click on any pet's card to view photos, health certificates, and rescue stories.\n4. Click **Adopt / Inquire** to message the verified shelter or foster parent directly!";
    } else if (query.includes('post') || query.includes('ad') || query.includes('rehome') || query.includes('list')) {
      reply = "📝 **Posting a Free Pet Ad**:\n- Click **Post Free Pet Ad** in the top navigation.\n- Fill in your pet's name, breed, age, location, health status (vaccines, dewormed), and upload photos.\n- Review and publish — your listing is immediately available to thousands of adopters across Kathmandu Valley at zero cost!";
    } else if (query.includes('vet') || query.includes('shreya') || query.includes('vaccin') || query.includes('doctor') || query.includes('health')) {
      reply = "🩺 **Valley Veterinary Desk (Dr. Shreya Karki)**:\n- **Free Pre-Adoption Health Triage**: Comprehensive checkup protocols for all adopted rescues.\n- **Rabies & Core Vaccinations**: DHPPiL timelines and feline vaccine schedules.\n- **Monsoon & Diet Care**: High-nutrition guidance for Indie breeds and long-haired breeds like Japanese Spitz and Persians.\n\nClick the **Open Vet Desk** button on the home page or navigation to consult guides!";
    } else if (query.includes('pay') || query.includes('esewa') || query.includes('khalti') || query.includes('fonepay') || query.includes('fee')) {
      reply = "💳 **Supported Payment Methods in Nepal**:\n- **eSewa** 📱\n- **Khalti Digital Wallet** 🟣\n- **Fonepay & Mobile Banking QR** 🏦\n- **Visa / Mastercard / SCT** 💳\n\nAdoption fees go directly toward supporting rescue shelters and medical rehabilitation.";
    } else if (query.includes('donate') || query.includes('sponsor') || query.includes('help')) {
      reply = "💖 **Support & Donations**:\nYou can sponsor individual rescue animals or contribute directly to Kathmandu Valley shelter programs through our **Donate & Sponsor** view. Even NPR 500 feeds a foster puppy for a week!";
    } else {
      reply = `Hello! I'm **Saniffy** 🐾, your AI guide to PetConnect Nepal. 

I can help you with:
- Finding dogs, Japanese Spitz, Persian cats, or Indie rescues in Kathmandu Valley
- Step-by-step guidance on adopting or rehoming a pet
- Connecting with verified shelters and Dr. Shreya Karki's Vet Desk
- Payment options (eSewa, Khalti, Fonepay) and free ad posting

What would you like to explore today? 🐕✨`;
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      reply: "Hi there! I am Saniffy 🐾. I had a quick hiccup processing that request, but I'm here to help you navigate PetConnect! Feel free to ask about adoptable pets, posting ads, or veterinary care in Kathmandu Valley.",
      error: error?.message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PetConnect Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
