// Stub signer implementation
// In production, this would integrate with a KMS or hardware security module

export interface SignerResult {
  kid: string
  signature: string
}

export class StubSigner {
  private static instance: StubSigner
  private keyId: string

  private constructor() {
    // Generate a deterministic key ID for demo purposes
    this.keyId = 'stub-key-' + Math.random().toString(36).substr(2, 9)
  }

  static getInstance(): StubSigner {
    if (!StubSigner.instance) {
      StubSigner.instance = new StubSigner()
    }
    return StubSigner.instance
  }

  async sign(data: string): Promise<SignerResult> {
    // In a real implementation, this would:
    // 1. Hash the data
    // 2. Sign with the private key from KMS
    // 3. Return the signature and key ID
    
    // For now, return a mock signature
    const mockSignature = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    
    return {
      kid: this.keyId,
      signature: mockSignature
    }
  }

  getKeyId(): string {
    return this.keyId
  }
}

export const signer = StubSigner.getInstance()
