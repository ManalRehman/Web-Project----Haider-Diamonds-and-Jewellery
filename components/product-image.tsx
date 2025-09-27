"use client"

import { useState } from "react"

type ProductImageProps = {
  src?: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [errored, setErrored] = useState(false)
  const fallback = "/placeholder.jpg"
  const displaySrc = !src || errored ? fallback : src

  return (
    <img
      src={displaySrc}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}


