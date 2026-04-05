/**
 * Mobile Optimization System
 *
 * Responsive design, touch interactions, and offline support
 */

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

export interface DeviceInfo {
  type: DeviceType;
  width: number;
  height: number;
  pixelRatio: number;
  isOnline: boolean;
  isTouchScreen: boolean;
}

/**
 * Detect device type and info
 */
export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      type: DeviceType.DESKTOP,
      width: 1024,
      height: 768,
      pixelRatio: 1,
      isOnline: true,
      isTouchScreen: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio;
  const isOnline = navigator.onLine;
  const isTouchScreen = () => {
    return (
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      ((navigator as any).msMaxTouchPoints > 0)
    );
  };

  let type: DeviceType;
  if (width < 768) {
    type = DeviceType.MOBILE;
  } else if (width < 1024) {
    type = DeviceType.TABLET;
  } else {
    type = DeviceType.DESKTOP;
  }

  return {
    type,
    width,
    height,
    pixelRatio,
    isOnline,
    isTouchScreen: isTouchScreen(),
  };
}

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  xs: 0,      // Extra small (phones)
  sm: 576,    // Small (landscape phones)
  md: 768,    // Medium (tablets)
  lg: 1024,   // Large (desktops)
  xl: 1280,   // Extra large (large desktops)
  xxl: 1536,  // 2XL (ultra-wide)
};

/**
 * Get responsive spacing
 */
export function getSpacing(device: DeviceType): Record<string, string> {
  const spacing: Record<DeviceType, Record<string, string>> = {
    [DeviceType.MOBILE]: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    [DeviceType.TABLET]: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
    },
    [DeviceType.DESKTOP]: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
  };

  return spacing[device];
}

/**
 * Get responsive font sizes
 */
export function getFontSizes(device: DeviceType): Record<string, string> {
  const sizes: Record<DeviceType, Record<string, string>> = {
    [DeviceType.MOBILE]: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    [DeviceType.TABLET]: {
      xs: '0.875rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.5rem',
      xl: '1.875rem',
      xxl: '2.25rem',
    },
    [DeviceType.DESKTOP]: {
      xs: '0.875rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '2.5rem',
    },
  };

  return sizes[device];
}

/**
 * Mobile-optimized touch interactions
 */
export const TOUCH_INTERACTIONS = {
  tapDelay: 200, // ms
  swipeThreshold: 50, // pixels
  longPressDelay: 500, // ms
};

/**
 * Detect swipe gesture
 */
export function detectSwipe(
  startX: number,
  startY: number,
  endX: number,
  endY: number
): 'left' | 'right' | 'up' | 'down' | null {
  const diffX = endX - startX;
  const diffY = endY - startY;
  const threshold = TOUCH_INTERACTIONS.swipeThreshold;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (Math.abs(diffX) > threshold) {
      return diffX > 0 ? 'right' : 'left';
    }
  } else {
    // Vertical swipe
    if (Math.abs(diffY) > threshold) {
      return diffY > 0 ? 'down' : 'up';
    }
  }

  return null;
}

/**
 * Image optimization settings
 */
export const IMAGE_OPTIMIZATION = {
  maxWidth: {
    [DeviceType.MOBILE]: 400,
    [DeviceType.TABLET]: 700,
    [DeviceType.DESKTOP]: 1200,
  },
  quality: {
    [DeviceType.MOBILE]: 70,
    [DeviceType.TABLET]: 80,
    [DeviceType.DESKTOP]: 90,
  },
  lazyLoad: true,
  srcSet: true,
  webp: true,
};

/**
 * Offline support - cache strategy
 */
export const CACHE_STRATEGY = {
  'network-first': {
    description: 'Try network first, fall back to cache',
    useFor: 'dynamic content (matches, bookings)',
  },
  'cache-first': {
    description: 'Use cache first, fall back to network',
    useFor: 'static content (destinations, destination cards)',
  },
  'stale-while-revalidate': {
    description: 'Use cache immediately, update in background',
    useFor: 'semi-static content (vendor listings)',
  },
};

/**
 * Get storage quota estimate
 */
export async function getStorageQuota(): Promise<{ usage: number; quota: number }> {
  if (!navigator.storage || !navigator.storage.estimate) {
    return { usage: 0, quota: 0 };
  }

  const estimate = await navigator.storage.estimate();
  return {
    usage: estimate.usage || 0,
    quota: estimate.quota || 0,
  };
}

/**
 * Request persistent storage
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage || !navigator.storage.persist) {
    return false;
  }

  return await navigator.storage.persist();
}

/**
 * Mobile keyboard handling
 */
export const MOBILE_KEYBOARD = {
  // Keyboard types for different input fields
  types: {
    email: 'email',
    phone: 'tel',
    number: 'number',
    url: 'url',
    date: 'date',
    search: 'search',
  },
  // Auto-capitalize settings
  autoCapitalize: {
    name: 'words',
    email: 'none',
    message: 'sentences',
  },
};

/**
 * Safe area padding (for notched devices)
 */
export function getSafeAreaPadding(): {
  top: string;
  bottom: string;
  left: string;
  right: string;
} {
  // This would be set via CSS environment variables in production
  // env(safe-area-inset-top), etc.
  return {
    top: 'var(--safe-area-inset-top, 0)',
    bottom: 'var(--safe-area-inset-bottom, 0)',
    left: 'var(--safe-area-inset-left, 0)',
    right: 'var(--safe-area-inset-right, 0)',
  };
}

/**
 * App shell architecture
 */
export const APP_SHELL = {
  minimalUI: true, // Hide non-essential UI on mobile
  bottomNavigation: true, // Use bottom nav on mobile instead of top
  swipeNavigation: true, // Enable swipe-based navigation
  hapticFeedback: true, // Vibration on interactions
};

/**
 * Performance metrics tracking
 */
export interface PerformanceMetrics {
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

export function getPerformanceMetrics(): Partial<PerformanceMetrics> {
  if (typeof window === 'undefined' || !window.performance) {
    return {};
  }

  const paint = performance.getEntriesByType('paint');
  const navigation = performance.getEntriesByType('navigation');

  return {
    firstPaint: paint.find((p) => p.name === 'first-paint')?.startTime,
    firstContentfulPaint: paint.find((p) => p.name === 'first-contentful-paint')?.startTime,
  };
}

/**
 * Battery status (for low-power mode)
 */
export async function getBatteryStatus(): Promise<{
  level: number;
  charging: boolean;
  isLowBattery: boolean;
} | null> {
  if (!('getBattery' in navigator)) {
    return null;
  }

  try {
    const battery = await (navigator as any).getBattery();
    return {
      level: battery.level,
      charging: battery.charging,
      isLowBattery: battery.level < 0.2,
    };
  } catch {
    return null;
  }
}
