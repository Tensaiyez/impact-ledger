import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Globe, 
  Shield, 
  Smartphone, 
  Database, 
  Code, 
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  Eye
} from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">ImpactLedger</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Transparent Aid Infrastructure
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="outline" className="text-sm">
            🌍 Web-based transparency and verification platform
          </Badge>
          <Link href="/docs/api">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>API Docs</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ImpactLedger is a web-based transparency and verification platform for global aid distribution. 
            It ensures that every dollar of humanitarian or donor funding can be tracked, verified, and publicly audited — 
            from the moment it is sent to an NGO to the moment it reaches a beneficiary in the field.
          </p>
          <p className="text-muted-foreground">
            It combines blockchain technology, cryptographic proofs, and an offline-first web app to bring transparency 
            and accountability to aid organizations working in regions with limited internet connectivity and high 
            logistical complexity (like rural Ethiopia or East Africa).
          </p>
        </CardContent>
      </Card>

      {/* The Problem */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>The Problem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Humanitarian and development organizations face three recurring challenges:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2">Lack of Transparency</h4>
              <p className="text-sm text-muted-foreground">
                Once funds are disbursed, donors rely on reports that are difficult to verify independently.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2">Operational Inefficiency</h4>
              <p className="text-sm text-muted-foreground">
                Field staff often operate in low-connectivity regions, leading to delayed data collection or data loss.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2">Public Mistrust</h4>
              <p className="text-sm text-muted-foreground">
                Donors and oversight bodies have little verifiable assurance that funds reach the intended recipients.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Solution */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>The Solution — ImpactLedger</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ImpactLedger provides an end-to-end verifiable system that tracks aid as it moves through its lifecycle:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Stage</th>
                  <th className="text-left p-3 font-semibold">What Happens</th>
                  <th className="text-left p-3 font-semibold">How It's Verified</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-3 font-medium">1. Funding</td>
                  <td className="p-3">Donors contribute funds (crypto or fiat) to an NGO program.</td>
                  <td className="p-3">Smart contracts log the transaction immutably.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">2. Milestone Setup</td>
                  <td className="p-3">NGOs define milestones (e.g., "Deliver 1,000 food packs").</td>
                  <td className="p-3">Milestones and criteria stored in the database, hashed for integrity.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">3. Distribution</td>
                  <td className="p-3">Field agents capture proof of delivery (PoD) — beneficiary, GPS, photo, timestamp — using the web app.</td>
                  <td className="p-3">Data signed and hashed locally; queued offline if no connectivity.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">4. Milestone Tracking</td>
                  <td className="p-3">Program managers track progress against defined milestones.</td>
                  <td className="p-3">Real-time dashboard shows completion status and metrics.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">5. Public Transparency</td>
                  <td className="p-3">Donors and auditors view real-time dashboards of impact data.</td>
                  <td className="p-3">Dashboard shows program progress and PoD submissions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Why We're Building It */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Why We're Building It</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Trust</h4>
                  <p className="text-sm text-muted-foreground">Build public confidence in NGOs and government aid projects.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Verification</h4>
                  <p className="text-sm text-muted-foreground">Enable auditors and donors to mathematically prove that funds reached intended beneficiaries.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Resilience</h4>
                  <p className="text-sm text-muted-foreground">Allow field operations to function even when internet access is intermittent.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Efficiency</h4>
                  <p className="text-sm text-muted-foreground">Automate proof aggregation and milestone fund releases.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>High-Level Tech Stack</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Layer</th>
                  <th className="text-left p-3 font-semibold">Technology</th>
                  <th className="text-left p-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-3 font-medium">Frontend (Web App)</td>
                  <td className="p-3">Next.js 14 (App Router) + TypeScript</td>
                  <td className="p-3">Provides a performant, SEO-friendly, and componentized web application for NGOs, donors, and auditors.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">UI Components</td>
                  <td className="p-3">shadcn/ui (Tailwind-based design system)</td>
                  <td className="p-3">Ensures consistency, accessibility, and rapid UI development.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">PWA & Offline</td>
                  <td className="p-3">Service Worker + IndexedDB + Background Sync</td>
                  <td className="p-3">Supports offline-first PoD submissions and background synchronization for field agents in low-connectivity regions.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">State & Data Validation</td>
                  <td className="p-3">Zod + React Query</td>
                  <td className="p-3">Type-safe API data handling and runtime validation of forms and payloads.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Database Layer</td>
                  <td className="p-3">PostgreSQL + Prisma ORM</td>
                  <td className="p-3">Stores structured data (Programs, Milestones, PoDs) with type-safe access and migrations.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Backend APIs</td>
                  <td className="p-3">Next.js API routes</td>
                  <td className="p-3">Handle CRUD operations, PoD ingestion, and program management.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Blockchain Layer</td>
                  <td className="p-3">Solidity Smart Contracts (deployed via Foundry or Hardhat)</td>
                  <td className="p-3">Stores immutable records of milestones and fund releases. (Future: Merkle proof anchoring)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">On-Chain Access</td>
                  <td className="p-3">Viem / Wagmi</td>
                  <td className="p-3">Allows the web app to read/write data on the blockchain.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Authentication</td>
                  <td className="p-3">BetterAuth</td>
                  <td className="p-3">Modern role-based authentication (NGO_ADMIN, IMPLEMENTER, AUDITOR).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Deployment & Infra</td>
                  <td className="p-3">Vercel / Azure Kubernetes (AKS)</td>
                  <td className="p-3">Scalable hosting for the web layer and backend services.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Security and Privacy */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Security and Privacy by Design</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">No PII on-chain</h4>
                  <p className="text-sm text-muted-foreground">Only salted hashes of beneficiary IDs are stored.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Data encryption</h4>
                  <p className="text-sm text-muted-foreground">Sensitive data encrypted at rest; keys managed by Azure Key Vault / HSM.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">PoD integrity</h4>
                  <p className="text-sm text-muted-foreground">Every PoD is hashed and signed locally with timestamps and GPS coordinates.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Auditable events</h4>
                  <p className="text-sm text-muted-foreground">Every key event emits an immutable on-chain log (MilestoneReleased).</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Features */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Core Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">1. Dashboard</h4>
                <p className="text-sm text-muted-foreground">
                  Visual summary of programs, milestones, donations, and verified deliveries. Real-time stats and charts powered by on-chain and off-chain data.
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">2. Programs & Milestones</h4>
                <p className="text-sm text-muted-foreground">
                  Create, track, and manage aid programs. Define deliverables, criteria, and expected milestones.
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">3. Proof-of-Delivery (PoD)</h4>
                <p className="text-sm text-muted-foreground">
                  Capture GPS coordinates, timestamp, and optional photo. Works offline via PWA and queues submissions for later sync.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">4. Offline Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Offline submissions automatically sync when back online. Background Sync API ensures reliability even on unstable networks.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5" />
            <span>Roadmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Badge variant="default" className="mt-1">MVP</Badge>
              <div>
                <h4 className="font-semibold">Phase 1 (Now)</h4>
                <p className="text-sm text-muted-foreground">
                  Build PWA dashboard, local DB integration, PoD form, and program management.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Badge variant="secondary" className="mt-1">Phase 2</Badge>
              <div>
                <h4 className="font-semibold">Smart Contract Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Integrate smart contracts (Polygon/Base testnets) for milestone tracking and fund releases.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Badge variant="outline" className="mt-1">Phase 3</Badge>
              <div>
                <h4 className="font-semibold">NGO Pilot</h4>
                <p className="text-sm text-muted-foreground">
                  Launch pilot with NGO partners in Ethiopia.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Badge variant="outline" className="mt-1">Phase 4</Badge>
              <div>
                <h4 className="font-semibold">Merkle Proofs & Advanced Security</h4>
                <p className="text-sm text-muted-foreground">
                  Add Merkle tree batching, on-chain verification, and SGX-based enclave signing (confidential computing).
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Badge variant="outline" className="mt-1">Phase 5</Badge>
              <div>
                <h4 className="font-semibold">Public API</h4>
                <p className="text-sm text-muted-foreground">
                  Open API + SDK for other organizations to adopt ImpactLedger.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="rounded-2xl border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>In Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ImpactLedger bridges humanitarian impact and modern engineering. It's a digital trust layer for aid transparency, 
            built on verifiable cryptography, open data, and accessible web technology.
          </p>
          <div className="p-4 rounded-lg bg-background border">
            <p className="font-medium">
              It answers the fundamental donor question:
            </p>
            <p className="text-lg font-semibold text-primary mt-2">
              "Did my contribution actually make it to the people who needed it?"
            </p>
            <p className="text-muted-foreground mt-2">
              With ImpactLedger, the answer is no longer a promise — it's a proof.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
