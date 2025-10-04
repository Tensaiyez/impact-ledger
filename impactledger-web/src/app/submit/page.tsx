import { PodForm } from '@/components/pod-form'

export default function SubmitPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit PoD</h1>
        <p className="text-muted-foreground">
          Submit Proof-of-Delivery with location and photo evidence
        </p>
      </div>

      <PodForm />
    </div>
  )
}
