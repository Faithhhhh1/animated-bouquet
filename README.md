<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">💐 Bloomshire</h1>

<p align="center">
  <strong>Beautiful Flowers, Delivered Digitally.</strong><br/>
  Build stunning digital flower bouquets, write heartfelt messages, and share them with anyone through a unique link.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

🌸 **Hand-Crafted SVG Flowers** — 8+ beautifully designed flowers including Rose, Sunflower, Tulip, Daisy, Lily, Peony, Lavender, and Orchid — each with unique colors, meanings, and scents.

🏺 **Multiple Vase Styles** — Choose from 6 gorgeous vase options: Modern Minimalist, Vintage Mason Jar, Rustic Basket, Crystal Vase, Kraft Paper Wrap, and Handmade Ceramic.

💌 **Personalized Cards** — Write a heartfelt message, choose a closing, and address your bouquet to someone special.

🎵 **Ambient Music Selection** — Set the mood with Gentle Piano, Cheerful Ukulele, Romantic Strings, Nature Sounds, or silence.

🗓️ **Scheduled Delivery** — Schedule your bouquet to bloom on a specific date — perfect for birthdays and anniversaries.

🔗 **Shareable Links** — Every bouquet generates a unique URL that can be shared with anyone, anywhere.

🌷 **Bloom Animation** — Recipients experience a beautiful bloom animation when they open your bouquet.

🎨 **Black & White Mode** — A minimalist, elegant monochrome option for a unique aesthetic.

🌿 **Smart Flower Suggestions** — Get AI-powered flower recommendations based on the occasion.

🪴 **Personal Garden** — All your created bouquets are saved in a garden gallery with favorites and filtering.

💕 **Appreciation System** — Recipients can "appreciate" bouquets — a sweet alternative to likes.

---

## 🎬 Demo

### How It Works

1. **Pick Your Flowers** — Select 3-10 flowers from our hand-crafted collection
2. **Choose a Vase** — Find the perfect vessel for your arrangement
3. **Set the Occasion** — Birthday, Anniversary, Thank You, and more
4. **Write Your Card** — Add a personal message and sign it
5. **Pick the Mood** — Choose ambient music for the reveal
6. **Share the Love** — Get a unique link to send your bouquet

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/ayushagnihotrii/Didital_bouquet.git

# Navigate to the project
cd Didital_bouquet

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI component library |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **SVG** | Hand-crafted flower & vase illustrations |
| **localStorage** | Client-side bouquet storage & garden |
| **Base64 Encoding** | Shareable bouquet URL generation |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js              # Landing page with animated hero
│   ├── layout.js            # Root layout with fonts & metadata
│   ├── globals.css          # Global styles & animations
│   ├── build/
│   │   └── page.js          # 6-step bouquet builder wizard
│   ├── bouquet/
│   │   └── page.js          # Bouquet viewer with bloom animation
│   └── garden/
│       └── page.js          # Personal bouquet gallery
├── components/
│   ├── FlowerSVG.js         # SVG flower renderer (8 flower types)
│   ├── VaseSVG.js           # SVG vase renderer (6 vase styles)
│   ├── BouquetRenderer.js   # Full bouquet composition engine
│   └── PetalAnimation.js    # Falling petal animation effect
└── lib/
    ├── flowers.js            # Flower data, occasions & suggestions
    ├── vases.js              # Vase configuration data
    ├── encoding.js           # Bouquet URL encoding/decoding
    └── storage.js            # localStorage garden & analytics
```

---

## 🌺 Flower Collection

| Flower | Meaning | Best For |
|---|---|---|
| 🌹 Rose | Love & Romance | Anniversary, Valentine's |
| 🌻 Sunflower | Happiness & Loyalty | Congratulations, Birthday |
| 🌷 Tulip | Perfect Love & Grace | Apology, Mother's Day |
| 🌼 Daisy | Innocence & Purity | Get Well, Just Because |
| 🪷 Lily | Purity & Devotion | Anniversary, Congratulations |
| 🌸 Peony | Romance & Prosperity | Love, Mother's Day |
| 💜 Lavender | Devotion & Serenity | Get Well, Thank You |
| 🪻 Orchid | Luxury & Strength | Any Special Occasion |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions

- 🌺 New flower types and SVG designs
- 🏺 Additional vase styles
- 🎵 Real audio integration for music options
- 🌍 Internationalization (i18n) support
- 📱 Progressive Web App (PWA) support
- 🧪 Unit and integration tests

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for those you love<br/>
  <strong>Bloomshire</strong> — Because some flowers never wilt.
</p>
