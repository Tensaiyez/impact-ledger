// Input validation and sanitization utilities

/**
 * Validates and sanitizes Ethereum addresses
 * @param address - The address to validate
 * @returns Object with isValid boolean and sanitized address
 */
export function validateEthereumAddress(address: string): {
  isValid: boolean
  sanitized: string
  error?: string
} {
  if (!address) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Address is required'
    }
  }

  // Remove whitespace and convert to lowercase
  const sanitized = address.trim().toLowerCase()

  // Check if it's a valid Ethereum address format
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
  
  if (!ethAddressRegex.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'Invalid Ethereum address format. Must be 42 characters starting with 0x'
    }
  }

  // Check for common invalid addresses
  const invalidAddresses = [
    '0x0000000000000000000000000000000000000000', // Zero address
    '0xffffffffffffffffffffffffffffffffffffffff', // Max address
  ]

  if (invalidAddresses.includes(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'This address is not allowed'
    }
  }

  return {
    isValid: true,
    sanitized
  }
}

/**
 * Validates and sanitizes program names
 * @param name - The name to validate
 * @returns Object with isValid boolean and sanitized name
 */
export function validateProgramName(name: string): {
  isValid: boolean
  sanitized: string
  error?: string
} {
  if (!name) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Program name is required'
    }
  }

  // Remove extra whitespace and trim
  const sanitized = name.trim().replace(/\s+/g, ' ')

  // Check length
  if (sanitized.length < 3) {
    return {
      isValid: false,
      sanitized,
      error: 'Program name must be at least 3 characters long'
    }
  }

  if (sanitized.length > 100) {
    return {
      isValid: false,
      sanitized,
      error: 'Program name must be less than 100 characters'
    }
  }

  // Check for potentially malicious content
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:/i,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(sanitized)) {
      return {
        isValid: false,
        sanitized,
        error: 'Program name contains invalid characters'
      }
    }
  }

  return {
    isValid: true,
    sanitized
  }
}

/**
 * Validates and sanitizes dates
 * @param dateString - The date string to validate
 * @returns Object with isValid boolean and sanitized date
 */
export function validateDate(dateString: string): {
  isValid: boolean
  sanitized: string
  error?: string
} {
  if (!dateString) {
    return {
      isValid: true,
      sanitized: ''
    }
  }

  const sanitized = dateString.trim()
  const date = new Date(sanitized)

  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      sanitized,
      error: 'Invalid date format'
    }
  }

  // Check if date is in the future (for start date) or reasonable range
  const now = new Date()
  const yearFromNow = new Date()
  yearFromNow.setFullYear(now.getFullYear() + 1)

  if (date < now) {
    return {
      isValid: false,
      sanitized,
      error: 'Date cannot be in the past'
    }
  }

  if (date > yearFromNow) {
    return {
      isValid: false,
      sanitized,
      error: 'Date cannot be more than 1 year in the future'
    }
  }

  return {
    isValid: true,
    sanitized
  }
}

/**
 * Validates end date against start date
 * @param startDate - The start date string
 * @param endDate - The end date string
 * @returns Object with isValid boolean and error message
 */
export function validateDateRange(startDate: string, endDate: string): {
  isValid: boolean
  error?: string
} {
  if (!startDate || !endDate) {
    return { isValid: true }
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (end <= start) {
    return {
      isValid: false,
      error: 'End date must be after start date'
    }
  }

  return { isValid: true }
}
