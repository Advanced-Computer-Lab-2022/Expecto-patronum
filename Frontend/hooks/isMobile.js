import React, { useState, useEffect } from 'react'

export function isMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(!isMobile)
    }
  }, [])

  const isMobileDevice = isMobile
  return isMobileDevice
}
