// AID Program contract configuration
export const AID_PROGRAM = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  abi: [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "milestoneId",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "merkleRoot",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "signerKid",
          "type": "string"
        }
      ],
      "name": "anchorBatch",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "root",
          "type": "bytes32"
        }
      ],
      "name": "getBatchByRoot",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "milestoneId",
              "type": "string"
            },
            {
              "internalType": "bytes32",
              "name": "merkleRoot",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "signerKid",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct AIDProgram.Batch",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const
}

export const SUPPORTED_CHAINS = [
  {
    id: 1,
    name: 'Ethereum',
    network: 'homestead',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://eth.llamarpc.com'] },
      default: { http: ['https://eth.llamarpc.com'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  },
  {
    id: 11155111,
    name: 'Sepolia',
    network: 'sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://rpc.sepolia.org'] },
      default: { http: ['https://rpc.sepolia.org'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    },
  },
] as const
