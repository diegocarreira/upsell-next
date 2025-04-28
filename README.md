# E-commerce Upsell Page

A high-converting, standalone upsell page designed to boost checkout revenue, average order value (AOV), and customer satisfaction through engaging, interactive elements and personalized offers.

## 🚀 Business Overview

### Purpose
This application serves as a post-purchase upsell solution that presents customers with personalized product recommendations at a significant discount after they've completed their initial purchase. The interactive "lucky card" feature creates an engaging gamification element that increases conversion rates.

### Key Features
- **Interactive Lucky Cards**: Gamified experience where customers pick a card to reveal a special discount
- **Limited-Time Offers**: Countdown timer creates urgency to drive conversions
- **Personalized Product Recommendations**: Curated selection of complementary products
- **Order Summary**: Clear breakdown of savings and final price
- **Seamless Checkout Flow**: Transparently integrated with the main checkout
- **Thank You Page**: Confirmation page with order details and next steps
- **A/B Testing Variant selector**: Floating button at the bottom-right of the page to select the variation to show.

## 💻 Technical Overview

### Technology Stack
- **Frontend**: Next.js 15.3.0, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Development**: Turbopack for fast development experience

### Project Structure
```
src/
├── app/
│   ├── api/                  # API routes for data fetching
│   ├── components/           # Shared components
│   ├── upsell/              # Upsell page and components
│   ├── thankyou/            # Thank you page
│   ├── types/               # TypeScript type definitions
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
```

### Key Components
- **LuckyCards**: Interactive card selection component with animation and confetti effects
- **Countdown**: Timer component to create urgency
- **ProductList**: Displays available products with selection functionality
- **OrderSummary**: Shows price breakdown and savings
- **Confetti**: Visual celebration effect when a card is revealed

### Data Flow
1. User completes initial purchase and is directed to the upsell page
2. User selects a "lucky card" to reveal their special discount
3. The URL is updated with a `revealed=true` parameter
4. Discounted products are displayed for selection
5. User selects products and completes the additional purchase
6. Order details are stored in localStorage (for POC purpose. Production version should process the order taking advantage of pre-filled checkout information)
7. User is redirected to the thank you page which displays order confirmation

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/diegocarreira/upsell-next.git

# Install dependencies
npm install
# or
yarn

# Running the Development Server
npm run dev
# or
yarn dev

# The application will be available at http://localhost:3000

# Building for Production
npm run build
npm run start
```

## 📊 Performance Considerations
- Optimized Images: Product images are optimized for fast loading
- Code Splitting: Next.js automatic code splitting for optimal loading
- Animation Performance: Framer Motion is used for smooth, performant animations
- Mobile Responsiveness: Fully responsive design for all device sizes

---

## 📈 Possible Future Enhancements
- Customer Data: Uses customer data to personalize product recommendations based on purchase history or main cart product's category
- Inventory Management: Checks product availability in real-time
- Analytics: Tracks conversion rates and performance metrics
- Email: follow-up for abandoned upsell opportunities

---

## 🔬 A/B Testing

- **Hypothesis 1:** Making clear to user that the gift is gonna be a discount VS keeping the mystery about the gift.
    - **Variation A (Surprise gift):**
    **Title says**: 🎁 Pick a Mystery Card to Reveal Your Special Gift!
    **Subtitle says**: Choose wisely... a special surprise is hiding behind one of these cards 🤞

    - **Variation B (Discount mentioned):**
    **Title says**: 🎁 Ready to Play? Your Mystery Discount is Just One Click Away!
    **Subtitle says**: Three cards, one amazing reward. Make your choice and discover your exclusive shopping bonus!

- **Hypothesis 2:** Showing social proof within the products (aiming to increase conversion rate by building trust before the purchase decision).
    - **Variation A:** No social proof displayed
    - **Variation B:** Yes - social proof displayed in the products

- **Hypothesis 3:** Making the secondary CTA more explicit would discourage customers if missing the offer.
    - **Variation A:** 
    **Secondary CTA says**: Decline Offer
    - **Variation B:**  
    **Secondary CTA says**: No Thanks, I'll Miss This one-time exclusive Offer

---

## Screenshots:

- **Unrevealed state**:

![my-cards-upsell-1](https://github.com/user-attachments/assets/23982e79-d4b5-4045-8785-491f5de73722)


- **Revealed state**

![my-cards-upsell-2](https://github.com/user-attachments/assets/d78184bc-ea10-4808-b4d4-1112bb022f1d)


---

## 📝 License
MIT License
