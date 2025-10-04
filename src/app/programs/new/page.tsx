import { ProgramForm } from '@/components/program-form'

export default function NewProgramPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Program</h1>
        <p className="text-muted-foreground">
          Create a new aid program with token and ownership details
        </p>
      </div>

      <ProgramForm />
    </div>
  )
}
