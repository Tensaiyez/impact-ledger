import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { AID_PROGRAM, SUPPORTED_CHAINS } from './contracts'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_CHAIN_RPC_URL || 'https://eth.llamarpc.com'),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_CHAIN_RPC_URL || 'https://rpc.sepolia.org'),
  },
})

export { AID_PROGRAM, SUPPORTED_CHAINS }
