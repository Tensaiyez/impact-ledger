// In-memory data store for MVP
// This will be replaced with a real database in production

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: 'NGO_ADMIN' | 'IMPLEMENTER' | 'AUDITOR'
  organization?: string
  createdAt: Date
  updatedAt: Date
}

export interface Program {
  id: string
  name: string
  tokenAddr: string
  ownerAddr: string
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Milestone {
  id: string
  programId: string
  name: string
  amount: number
  criteria: any
  createdAt: Date
  updatedAt: Date
}

export interface Disbursement {
  id: string
  milestoneId: string
  kind: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

export interface Beneficiary {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Pod {
  id: string
  disbursementId: string
  beneficiaryId: string
  gpsLat?: number
  gpsLng?: number
  photoUri?: string
  ts: Date
  podHash: string
  status: string
  createdAt: Date
  updatedAt: Date
}

// In-memory storage
let users: User[] = []
let programs: Program[] = []
let milestones: Milestone[] = []
let disbursements: Disbursement[] = []
let beneficiaries: Beneficiary[] = []
let pods: Pod[] = []

// Helper function to generate IDs
const generateId = () => crypto.randomUUID()

// User operations
export const userStore = {
  create: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const user: User = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    users.push(user)
    return user
  },
  
  findByEmail: (email: string): User | undefined => {
    return users.find(user => user.email === email)
  },
  
  findById: (id: string): User | undefined => {
    return users.find(user => user.id === id)
  },
  
  update: (id: string, data: Partial<User>): User | undefined => {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return undefined
    
    users[index] = {
      ...users[index],
      ...data,
      updatedAt: new Date(),
    }
    return users[index]
  },
  
  getAll: (): User[] => users,
}

// Program operations
export const programStore = {
  create: (data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Program => {
    const program: Program = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    programs.push(program)
    return program
  },
  
  findById: (id: string): Program | undefined => {
    return programs.find(program => program.id === id)
  },
  
  getAll: (): Program[] => {
    return programs.map(program => ({
      ...program,
      milestones: milestones.filter(m => m.programId === program.id),
      _count: {
        milestones: milestones.filter(m => m.programId === program.id).length,
      },
    }))
  },
  
  update: (id: string, data: Partial<Program>): Program | undefined => {
    const index = programs.findIndex(program => program.id === id)
    if (index === -1) return undefined
    
    programs[index] = {
      ...programs[index],
      ...data,
      updatedAt: new Date(),
    }
    return programs[index]
  },
  
  delete: (id: string): boolean => {
    const index = programs.findIndex(program => program.id === id)
    if (index === -1) return false
    
    programs.splice(index, 1)
    // Also delete related milestones
    milestones = milestones.filter(m => m.programId !== id)
    return true
  },
}

// Milestone operations
export const milestoneStore = {
  create: (data: Omit<Milestone, 'id' | 'createdAt' | 'updatedAt'>): Milestone => {
    const milestone: Milestone = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    milestones.push(milestone)
    return milestone
  },
  
  findByProgramId: (programId: string): Milestone[] => {
    return milestones.filter(milestone => milestone.programId === programId)
  },
  
  findById: (id: string): Milestone | undefined => {
    return milestones.find(milestone => milestone.id === id)
  },
  
  getAll: (programId?: string): Milestone[] => {
    let filteredMilestones = milestones
    if (programId) {
      filteredMilestones = milestones.filter(m => m.programId === programId)
    }
    
    return filteredMilestones.map(milestone => ({
      ...milestone,
      program: programs.find(p => p.id === milestone.programId),
      _count: {
        disbursements: disbursements.filter(d => d.milestoneId === milestone.id).length,
      },
    }))
  },
  
  update: (id: string, data: Partial<Milestone>): Milestone | undefined => {
    const index = milestones.findIndex(milestone => milestone.id === id)
    if (index === -1) return undefined
    
    milestones[index] = {
      ...milestones[index],
      ...data,
      updatedAt: new Date(),
    }
    return milestones[index]
  },
  
  delete: (id: string): boolean => {
    const index = milestones.findIndex(milestone => milestone.id === id)
    if (index === -1) return false
    
    milestones.splice(index, 1)
    return true
  },
}

// Pod operations
export const podStore = {
  create: (data: Omit<Pod, 'id' | 'createdAt' | 'updatedAt'>): Pod => {
    const pod: Pod = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    pods.push(pod)
    return pod
  },
  
  findById: (id: string): Pod | undefined => {
    return pods.find(pod => pod.id === id)
  },
  
  getAll: (): Pod[] => pods,
  
  update: (id: string, data: Partial<Pod>): Pod | undefined => {
    const index = pods.findIndex(pod => pod.id === id)
    if (index === -1) return undefined
    
    pods[index] = {
      ...pods[index],
      ...data,
      updatedAt: new Date(),
    }
    return pods[index]
  },
}

// Beneficiary operations
export const beneficiaryStore = {
  create: (data: Omit<Beneficiary, 'id' | 'createdAt' | 'updatedAt'>): Beneficiary => {
    const beneficiary: Beneficiary = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    beneficiaries.push(beneficiary)
    return beneficiary
  },
  
  findById: (id: string): Beneficiary | undefined => {
    return beneficiaries.find(beneficiary => beneficiary.id === id)
  },
  
  getAll: (): Beneficiary[] => beneficiaries,
}

// Disbursement operations
export const disbursementStore = {
  create: (data: Omit<Disbursement, 'id' | 'createdAt' | 'updatedAt'>): Disbursement => {
    const disbursement: Disbursement = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    disbursements.push(disbursement)
    return disbursement
  },
  
  findByMilestoneId: (milestoneId: string): Disbursement[] => {
    return disbursements.filter(disbursement => disbursement.milestoneId === milestoneId)
  },
  
  findById: (id: string): Disbursement | undefined => {
    return disbursements.find(disbursement => disbursement.id === id)
  },
  
  getAll: (): Disbursement[] => disbursements,
}

// Initialize with some sample data
export const initializeSampleData = () => {
  // Create sample users
  userStore.create({
    email: 'admin@example.com',
    name: 'NGO Admin',
    role: 'NGO_ADMIN',
    organization: 'Example NGO',
  })
  
  userStore.create({
    email: 'implementer@example.com',
    name: 'Field Implementer',
    role: 'IMPLEMENTER',
    organization: 'Example NGO',
  })
  
  userStore.create({
    email: 'auditor@example.com',
    name: 'External Auditor',
    role: 'AUDITOR',
  })
  
  // Create sample program
  const program = programStore.create({
    name: 'Emergency Relief Program',
    tokenAddr: '0x1234567890123456789012345678901234567890',
    ownerAddr: '0x0987654321098765432109876543210987654321',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
  })
  
  // Create sample milestones
  milestoneStore.create({
    programId: program.id,
    name: 'Food Distribution Phase 1',
    amount: 50000,
    criteria: { target: '1000 families', location: 'Region A' },
  })
  
  milestoneStore.create({
    programId: program.id,
    name: 'Medical Supplies',
    amount: 25000,
    criteria: { target: '500 families', location: 'Region B' },
  })
  
  // Create sample beneficiaries
  beneficiaryStore.create({ name: 'John Doe' })
  beneficiaryStore.create({ name: 'Jane Smith' })
  beneficiaryStore.create({ name: 'Ahmed Hassan' })
  
  console.log('Sample data initialized')
}
