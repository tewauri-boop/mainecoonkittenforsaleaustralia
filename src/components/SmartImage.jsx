// src/components/SmartImage.jsx
import Image from 'next/image';

export default function SmartImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}) {
  const isExactAsset = typeof src === 'string' && src.startsWith('/assets/');
  return (
    <Image
      src={src}
      alt={alt || 'Maine Coon cat'}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      sizes={sizes}
      className={`${isExactAsset ? 'object-contain' : 'object-cover'} w-full h-full transition-transform duration-500 ${className}`}
    />
  );
}
