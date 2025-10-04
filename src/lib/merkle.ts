import { keccak256 } from 'viem'

export interface MerkleProof {
  leafHash: string
  proof: string[]
  root: string
}

export function keccak256Hash(data: string): string {
  return keccak256(data as `0x${string}`)
}

export function buildMerkleTree(leaves: string[]): {
  root: string
  proofs: Map<number, string[]>
} {
  if (leaves.length === 0) {
    throw new Error('Cannot build Merkle tree with empty leaves')
  }

  if (leaves.length === 1) {
    return {
      root: leaves[0],
      proofs: new Map([[0, []]])
    }
  }

  const proofs = new Map<number, string[]>()
  let currentLevel = leaves.map(leaf => ({ hash: leaf, index: 0 }))
  let levelIndex = 0

  while (currentLevel.length > 1) {
    const nextLevel: { hash: string; index: number }[] = []
    
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i]
      const right = currentLevel[i + 1] || left // Duplicate last element if odd number
      
      // Sort the pair for consistent ordering
      const sortedPair = [left.hash, right.hash].sort()
      const combined = sortedPair[0] + sortedPair[1]
      const parentHash = keccak256Hash(combined)
      
      nextLevel.push({ hash: parentHash, index: Math.floor(i / 2) })
      
      // Store proof for left child
      if (!proofs.has(left.index)) {
        proofs.set(left.index, [])
      }
      proofs.get(left.index)!.push(right.hash)
      
      // Store proof for right child (if different from left)
      if (right.index !== left.index) {
        if (!proofs.has(right.index)) {
          proofs.set(right.index, [])
        }
        proofs.get(right.index)!.push(left.hash)
      }
    }
    
    currentLevel = nextLevel
    levelIndex++
  }

  return {
    root: currentLevel[0].hash,
    proofs
  }
}

export function verifyMerkleProof(
  leafHash: string,
  proof: string[],
  root: string
): boolean {
  let currentHash = leafHash
  
  for (const proofElement of proof) {
    const sortedPair = [currentHash, proofElement].sort()
    const combined = sortedPair[0] + sortedPair[1]
    currentHash = keccak256Hash(combined)
  }
  
  return currentHash === root
}

export function generatePodHash(data: {
  disbursementId: string
  beneficiaryId: string
  gpsLat?: number
  gpsLng?: number
  photoUri?: string
  timestamp: number
}): string {
  const dataString = JSON.stringify(data, Object.keys(data).sort())
  return keccak256Hash(dataString)
}
