

# LEWAY Creatives — Premium Landing Page

## Feel and Look
The website should feel like a $10,000 worth project. Use UI components that are creative and that differentiate it, like those from https://21st.dev/community/components

## Overview
A high-converting, premium landing page for LEWAY Creatives — a design & copywriting agency based in Kenya serving clients worldwide. The page follows a proven conversion funnel structure with bold copywriting, smooth animations, and a WhatsApp-integrated lead capture form.

---

## Design System
- **Colors**: Deep Forest (#0D2A1F), Soft Sage (#E2E8E0), Paper White (#F9FAF9), White (#FFFFFF), Vibrant Mint (#2ECC71) for CTAs only
- **Typography**: Plus Jakarta Sans for headlines (bold, tight tracking), Inter for body text
- **Motion**: Framer Motion for scroll-triggered fade/translate reveals; buttons scale + shadow on hover (no color change); native scrolling only
- **Accessibility**: Semantic HTML, proper heading hierarchy, ARIA labels, focus-visible states, sufficient color contrast, touch-friendly targets

---

## Sections (Top to Bottom)

### 1. Navbar
- Logo on the left, nav links (Services, How It Works, FAQ, Testimonials) on the right
- Mint pill CTA: "Book a Session" (scrolls to form)
- Mobile: hamburger → full-screen overlay menu with Framer Motion animation

### 2. Hero (Above the Fold)
- Bold H1: *"Your Business Looks Like an Amateur. Let's Fix That."*
- Subheadline explaining the "sales engine" value prop
- Two CTAs: "Start Your Transformation" (mint button → scrolls to form) and "Order Service" (scrolls to form)
- Optimized for instant engagement and a strong first impression

### 3. "Dual Threat" Philosophy
- Centered single-column text block
- Headline: *"Most Businesses and Personal Brands Are Half-Blind"*
- The Ferrari metaphor copy about design + copy synergy

### 4. Services (Interactive)
- Four service categories displayed as interactive tabs or cards:
  1. **Web Design & Development** (Landing Pages, Full Websites, Portfolios)
  2. **Graphic & Creative Design** (Ads, Flyers, Logos, Presentations, Ebooks)
  3. **Content Creation & Copywriting** (Social Media, Blog, Email, Management)
  4. **Career & Personal Branding** (ATS Resumes, CV Design, Cover Letters, LinkedIn)
- Each category expands/reveals its sub-services with descriptions
- Uses uploaded images and icons per category

### 5. How It Works
- 4-step visual process: Reach Out → Deep Dive → The Build → The Launch
- Clean numbered steps with icons and brief descriptions
- Animated step-by-step reveal on scroll

### 6. Testimonials
- Carousel/cards with client quotes, names, and role tag pills
- Mary J (Solopreneur), Alex Kamau (Job Seeker), and placeholders for more
- Review schema markup (JSON-LD) for SEO rich snippets

### 7. FAQ
- Accordion-style with the 3 provided Q&As
- FAQ schema markup for search engine visibility

### 8. Final CTA + Lead Capture Form
- Persuasive headline: *"You've Come This Far. You're Interested."*
- Scarcity element: pulsing mint dot + "Only 5 spots available for [current month]"
- P.S. note about free roadmap value
- **Form fields**: Name, Email, WhatsApp Number (with country code hint), Service Description (textarea)
- **Submit**: "Book A Free Strategy Session" (mint button with pulse hover)
- On submit: validates inputs with Zod, then redirects to WhatsApp with a pre-filled message containing the form data
- Success state: animated checkmark + confirmation message with the user's name

### 9. Footer
- 3-column layout: Brand/Logo | Service links (SEO-optimized) | Contact (email, WhatsApp, social icons)
- Bottom bar: © 2026, Privacy Policy, Sitemap links

---

## Technical Details
- **SEO**: Proper title tag, meta description, Open Graph tags, JSON-LD structured data (LocalBusiness, ProfessionalService, FAQ, Reviews)
- **Fonts**: Google Fonts — Plus Jakarta Sans + Inter
- **Animation**: Framer Motion for scroll reveals, hover effects, menu transitions, and success state
- **Form**: Zod validation → WhatsApp redirect with pre-filled message
- **Performance**: Lazy-loaded images, optimized font loading, clean component architecture
- **Mobile-first**: Fully responsive across all breakpoints

