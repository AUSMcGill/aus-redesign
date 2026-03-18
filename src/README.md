# Arts Undergraduate Society - McGill University Website

A modern, bilingual (English/French) website for the Arts Undergraduate Society at McGill University, built with React, TypeScript, and Tailwind CSS.

## Features

- 📱 Fully responsive design
- 🌐 Bilingual support (English/French)
- 📅 Integrated Google Calendar for events
- 🎨 McGill University branding (signature red color scheme)
- ♿ Accessible UI components using shadcn/ui
- 🗂️ Modular component architecture

## Pages

- **Home**: Quick links, announcements, upcoming events, and land acknowledgement
- **About Us**: AUS mission, values, and executive team information
- **Involvement**: Committees, opportunities, and events calendar
- **Resources**: Student resources, study guides, and support services
- **Academics**: Academic programs, advocacy, and important dates
- **Contact**: Contact form and office information

## Tech Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Framework runtime**: Next.js (App Router)

## Project Structure

```
├── App.tsx                 # Main application component
├── components/
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── InvolvementPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── AcademicsPage.tsx
│   │   └── ContactPage.tsx
│   ├── ui/                 # shadcn/ui components
│   └── figma/              # Figma integration components
├── lib/
│   └── translations.ts     # i18n translations
└── styles/
    └── globals.css         # Global styles and Tailwind config
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/aus-mcgill-website.git
cd aus-mcgill-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal)

## Customization

### Google Calendar Integration

To use your own Google Calendar:

1. Go to your Google Calendar settings
2. Select the calendar you want to embed
3. Navigate to "Integrate calendar" section
4. Copy the embed code
5. Replace the iframe `src` in `/components/pages/InvolvementPage.tsx`

### Updating Translations

Edit `/lib/translations.ts` to modify or add new translations for both English and French.

### Branding

The site uses McGill's signature red color (#ED1B2F). To modify colors, update the Tailwind classes in the components or adjust the CSS variables in `/styles/globals.css`.

## Land Acknowledgement

The site includes McGill's official land acknowledgement recognizing that the university is located on the unceded territory of the Kanien'kehá:ka people.

## Contributing

This is a website for the Arts Undergraduate Society at McGill University. If you're a member of AUS and would like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

© 2025 Arts Undergraduate Society, McGill University. All rights reserved.

## Contact

- **Email**: info@ausmcgill.com
- **Office**: Leacock Building, Room B-12, McGill University
- **Phone**: (514) 398-6800

## Acknowledgments

- McGill University
- Arts Undergraduate Society Executive Team
- shadcn/ui for the component library
- Lucide for the icon set
