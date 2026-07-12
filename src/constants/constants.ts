import type { ProviderName } from '@/types/types'

export const PROVIDER_NAMES: Record<ProviderName, string> = {
  BPDB: 'BPDB',
  BREB: 'BREB / Palli Bidyut',
  DESCO: 'DESCO',
  DPDC: 'DPDC',
  NESCO: 'NESCO',
  WZPDCL: 'WZPDCL',
  UNKNOWN: 'Unknown Provider',
}

export const TOKEN_LENGTH = 20
export const GROUP_SIZE = 4
export const MAX_INPUT_LENGTH = 2000
