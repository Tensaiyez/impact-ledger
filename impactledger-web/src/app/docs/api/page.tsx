import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Code, 
  Database, 
  Shield, 
  Package,
  FileText,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export default function APIDocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Code className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">API Documentation</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          RESTful API endpoints for ImpactLedger
        </p>
      </div>

      {/* Overview */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>API Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ImpactLedger provides a comprehensive REST API for managing programs, milestones, 
            proof-of-delivery submissions, and batch anchoring. All endpoints return JSON responses 
            and support standard HTTP status codes.
          </p>
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm font-medium">Base URL:</p>
            <code className="text-sm">http://localhost:3002/api</code>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Currently, the API uses role-based authentication with NextAuth.js. 
            Future versions will support API keys and JWT tokens.
          </p>
          <div className="grid gap-3">
            <Badge variant="outline">NGO_ADMIN</Badge>
            <Badge variant="outline">IMPLEMENTER</Badge>
            <Badge variant="outline">AUDITOR</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">API Endpoints</h2>

        {/* Programs */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Programs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm">/api/programs</code>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Create a new aid program</p>
                <div className="text-xs bg-muted p-2 rounded">
                  <pre>{`{
  "name": "Emergency Relief Program",
  "tokenAddr": "0x...",
  "ownerAddr": "0x...",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}`}</pre>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm">/api/programs</code>
                </div>
                <p className="text-sm text-muted-foreground">List all programs with milestone counts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Milestones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm">/api/milestones</code>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Create a new milestone</p>
                <div className="text-xs bg-muted p-2 rounded">
                  <pre>{`{
  "programId": "clx...",
  "name": "Food Distribution Phase 1",
  "amount": "50000",
  "criteria": "{\\"description\\": \\"Distribute 1000 food packs\\"}"
}`}</pre>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm">/api/milestones?programId=clx...</code>
                </div>
                <p className="text-sm text-muted-foreground">List milestones for a program</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PoDs */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Proof-of-Delivery (PoDs)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm">/api/pods</code>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Submit proof-of-delivery</p>
                <div className="text-xs bg-muted p-2 rounded">
                  <pre>{`{
  "disbursementId": "clx...",
  "beneficiaryId": "clx...",
  "gpsLat": 9.0192,
  "gpsLng": 38.7525,
  "photoUri": "https://...",
  "podHash": "0x..."
}`}</pre>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm">/api/pods?page=1&limit=10&status=pending</code>
                </div>
                <p className="text-sm text-muted-foreground">List PoDs with pagination and filtering</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Response Format */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Response Format</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Success Response</h4>
              <div className="text-xs bg-muted p-2 rounded">
                <pre>{`{
  "id": "clx...",
  "message": "Resource created successfully"
}`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Error Response</h4>
              <div className="text-xs bg-muted p-2 rounded">
                <pre>{`{
  "error": "Validation failed",
  "details": "Required field missing"
}`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Paginated Response</h4>
              <div className="text-xs bg-muted p-2 rounded">
                <pre>{`{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}`}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Codes */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>HTTP Status Codes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="default">200</Badge>
                <span className="text-sm">OK - Request successful</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default">201</Badge>
                <span className="text-sm">Created - Resource created</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">202</Badge>
                <span className="text-sm">Accepted - Queued for processing</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">400</Badge>
                <span className="text-sm">Bad Request - Invalid input</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">404</Badge>
                <span className="text-sm">Not Found - Resource not found</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">500</Badge>
                <span className="text-sm">Server Error - Internal error</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
