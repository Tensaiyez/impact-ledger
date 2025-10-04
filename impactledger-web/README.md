# ImpactLedger Web App

A clean, fast PWA-first dashboard for transparent aid tracking built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🌍 About ImpactLedger

ImpactLedger is a **transparent aid tracking platform** designed to bring accountability and verifiability to humanitarian and development organizations. It addresses the critical challenge of ensuring that aid funds actually reach their intended beneficiaries through a combination of modern web technology, offline-first design, and cryptographic verification.

### The Problem
- **Lack of transparency**: Donors rely on unverifiable reports from NGOs
- **Operational inefficiency**: Field staff work in low-connectivity regions with delayed reporting
- **Public mistrust**: Limited verifiable assurance that funds reach intended recipients
- **Data integrity risks**: Traditional systems are prone to manipulation and human error

### The Solution
ImpactLedger provides an **end-to-end verifiable system** that tracks aid through its entire lifecycle:

1. **Program Setup** - NGOs define aid programs with clear milestones and criteria
2. **Field Operations** - Field agents capture proof-of-delivery (PoD) with GPS, photos, and timestamps
3. **Offline-First Design** - Works in low-connectivity areas with automatic sync when online
4. **Transparent Tracking** - Real-time dashboards show program progress and fund utilization
5. **Role-Based Access** - Different interfaces for NGO admins, field implementers, and auditors

### Why It Matters
- **Trust**: Build public confidence in NGOs and government aid projects
- **Verification**: Enable auditors and donors to mathematically prove fund delivery
- **Resilience**: Allow field operations to function even with intermittent internet access
- **Efficiency**: Automate proof aggregation and milestone tracking
- **Interoperability**: Provide APIs for integration with existing NGO workflows

### Target Users
- **NGO Administrators** - Create and manage aid programs
- **Field Implementers** - Submit proof-of-delivery records in remote locations
- **External Auditors** - Verify and validate aid distribution
- **Donors** - Track the impact of their contributions

## 📚 Documentation

### Local Development
- **[Local Documentation](http://localhost:3002/docs)** - Complete project overview, features, and API documentation
- **[Local API Reference](http://localhost:3002/docs/api)** - Detailed API endpoints and examples

### Live Deployment
- **[Live Documentation](https://your-deployment-url.com/docs)** - Complete project overview, features, and API documentation
- **[Live API Reference](https://your-deployment-url.com/docs/api)** - Detailed API endpoints and examples

## Features

- **Dashboard**: KPI cards and donation trends chart
- **Submit PoD**: Proof-of-delivery submission with offline support
- **Programs & Milestones**: CRUD operations for aid programs
- **PWA Support**: Offline functionality with background sync
- **Modern UI**: Clean, accessible design with dark mode support
- **Role-based Authentication**: NGO_ADMIN, IMPLEMENTER, AUDITOR roles

## Tech Stack

- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Storage**: In-memory storage (MVP - no database required!)
- **Authentication**: Mock auth system with role-based access
- **PWA**: Service Worker with IndexedDB offline queue
- **Charts**: Recharts for data visualization
- **Blockchain Ready**: viem/wagmi (for future phases)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd impactledger-web
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3002](http://localhost:3002)

4. **View Documentation:**
   Visit [http://localhost:3002/docs](http://localhost:3002/docs) for complete project documentation
   - The documentation is built into the app and available immediately
   - No external dependencies or setup required

That's it! No database setup required for the MVP.

## Demo Credentials

The app comes with pre-loaded sample data. You can sign in with:

- **NGO Admin**: `admin@example.com` (any password)
- **Field Implementer**: `implementer@example.com` (any password)  
- **Auditor**: `auditor@example.com` (any password)

Or create a new account with any email/password combination.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard page
│   ├── submit/            # PoD submission
│   ├── programs/          # Programs management
│   ├── sign-in/           # Authentication
│   ├── docs/              # Documentation
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation with auth
│   ├── kpi-cards.tsx     # Dashboard KPIs
│   ├── donations-chart.tsx # Charts
│   ├── pod-form.tsx      # PoD submission form
│   ├── program-form.tsx  # Program creation
│   ├── milestone-form.tsx # Milestone creation
│   └── data-initializer.tsx # Sample data setup
└── lib/                  # Utilities and configurations
    ├── data.ts           # In-memory data stores
    ├── auth.ts           # Mock authentication
    ├── auth-client.ts    # Auth client hooks
    ├── schema.ts         # Zod validators
    ├── merkle.ts         # Merkle tree operations (future)
    ├── contracts.ts      # Smart contract configs (future)
    ├── wagmi.ts          # Blockchain configuration (future)
    └── offline.ts        # Offline queue management
```

## Key Features

### Dashboard
- Real-time KPI cards showing total donations, released funds, active programs, and PoDs submitted
- Interactive donation trends chart
- Recent activity feed

### Program Management
- Create and manage aid programs
- Define milestones with funding amounts
- Track completion criteria
- Monitor progress and disbursements

### PoD Submission
- Submit proof-of-delivery with GPS location
- Photo upload support
- Offline queue with automatic sync
- Geolocation integration

### Authentication
- Role-based access control
- NGO_ADMIN: Can create programs and manage milestones
- IMPLEMENTER: Can submit PoDs and view programs
- AUDITOR: Can view and verify data

### PWA Features
- Offline functionality with service worker
- Background sync for failed requests
- App-like experience on mobile devices
- IndexedDB for offline data storage

## API Endpoints

- `POST /api/pods` - Submit proof-of-delivery
- `GET /api/pods` - List PoDs with pagination
- `POST /api/programs` - Create new program
- `GET /api/programs` - List programs
- `POST /api/milestones` - Create milestone
- `GET /api/milestones` - List milestones
- `POST /api/auth/sign-in` - Sign in
- `POST /api/auth/sign-up` - Sign up
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/get-session` - Get current session

## Sample Data

The app automatically initializes with sample data:

- **3 Users** with different roles
- **1 Sample Program** (Emergency Relief Program)
- **2 Sample Milestones** (Food Distribution, Medical Supplies)
- **3 Sample Beneficiaries**

Data resets on page refresh (perfect for demos!).

## Development

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit
```

### Adding New Features
1. Update the in-memory data stores in `src/lib/data.ts`
2. Add API routes in `src/app/api/`
3. Create components in `src/components/`
4. Update the navigation in `src/components/navbar.tsx`

## Roadmap

### Phase 1 (Current MVP)
- ✅ PWA dashboard with offline capabilities
- ✅ Program and milestone management
- ✅ PoD submission with GPS and photos
- ✅ Role-based authentication
- ✅ In-memory data storage

### Phase 2 (Future)
- 🔄 Smart contract integration (Polygon/Base testnets)
- 🔄 Real database (PostgreSQL + Prisma)
- 🔄 BetterAuth for production authentication
- 🔄 On-chain milestone tracking

### Phase 3 (Future)
- 🔄 NGO pilot deployment in Ethiopia
- 🔄 Real-world field testing
- 🔄 Performance optimizations

### Phase 4 (Future)
- 🔄 Merkle proof batching and verification
- 🔄 SGX-based enclave signing
- 🔄 Advanced cryptographic features

## Deployment

### MVP Deployment (Current)
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting
3. Update the documentation links in README.md with your deployment URL
4. No database configuration needed!

### Production Deployment (Future)
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy with proper authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the in-memory data
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Note**: This is an MVP version designed for quick demos and testing. For production use, implement proper database storage, authentication, and security measures as outlined in the roadmap.