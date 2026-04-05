/**
 * Celebration System
 *
 * Handles milestone celebrations with confetti, sounds, and animations
 */

import { JourneyStage } from '@great-indian-wedding/theme-engine';

export interface CelebrationConfig {
  stage: JourneyStage;
  title: string;
  emoji: string;
  confetti: {
    enabled: boolean;
    count: number;
    duration: number; // ms
    colors: string[];
  };
  sound: {
    enabled: boolean;
    url: string;
    volume: number; // 0-1
  };
  animation: {
    type: 'fireworks' | 'confetti' | 'hearts' | 'sparkles' | 'combined';
    duration: number; // ms
  };
  message: string;
  subMessage?: string;
}

export const CELEBRATION_CONFIGS: Record<JourneyStage, CelebrationConfig> = {
  [JourneyStage.SEEKING]: {
    stage: JourneyStage.SEEKING,
    title: 'Welcome to Your Love Journey!',
    emoji: '🔍',
    confetti: {
      enabled: false,
      count: 0,
      duration: 0,
      colors: [],
    },
    sound: {
      enabled: false,
      url: '',
      volume: 0,
    },
    animation: {
      type: 'sparkles',
      duration: 2000,
    },
    message: 'Your search for true love begins now',
    subMessage: 'Build your profile and start discovering matches',
  },
  [JourneyStage.MATCHED]: {
    stage: JourneyStage.MATCHED,
    title: '💕 You\'ve Got a Match!',
    emoji: '💕',
    confetti: {
      enabled: true,
      count: 50,
      duration: 3000,
      colors: ['#F4A7B9', '#FF69B4', '#FFB6D9'],
    },
    sound: {
      enabled: true,
      url: '/sounds/match.mp3',
      volume: 0.7,
    },
    animation: {
      type: 'hearts',
      duration: 3000,
    },
    message: 'Someone special is interested in you!',
    subMessage: 'Check their profile and express your interest',
  },
  [JourneyStage.DATE_SET]: {
    stage: JourneyStage.DATE_SET,
    title: '📍 First Date Location Set!',
    emoji: '📍',
    confetti: {
      enabled: true,
      count: 40,
      duration: 2500,
      colors: ['#FF8F00', '#FFD700', '#FFF8E1'],
    },
    sound: {
      enabled: true,
      url: '/sounds/tada.mp3',
      volume: 0.6,
    },
    animation: {
      type: 'confetti',
      duration: 2500,
    },
    message: 'Your Pehli Mulaqat venue is ready!',
    subMessage: 'Get ready for an amazing first meeting',
  },
  [JourneyStage.DATING]: {
    stage: JourneyStage.DATING,
    title: '☕ Your Love Story Begins!',
    emoji: '☕',
    confetti: {
      enabled: true,
      count: 80,
      duration: 4000,
      colors: ['#B71C1C', '#D4AF37', '#FFFFF0'],
    },
    sound: {
      enabled: true,
      url: '/sounds/celebration.mp3',
      volume: 0.8,
    },
    animation: {
      type: 'combined',
      duration: 4000,
    },
    message: 'Congratulations! Your first date was amazing!',
    subMessage: 'Time to plan the wedding of your dreams',
  },
  [JourneyStage.WEDDING]: {
    stage: JourneyStage.WEDDING,
    title: '💍 Your Wedding Day!',
    emoji: '💍',
    confetti: {
      enabled: true,
      count: 100,
      duration: 5000,
      colors: ['#6A1429', '#FF8F00', '#C0C0C0'],
    },
    sound: {
      enabled: true,
      url: '/sounds/wedding_bells.mp3',
      volume: 0.9,
    },
    animation: {
      type: 'fireworks',
      duration: 5000,
    },
    message: 'Mr & Mrs! The Big Day is here!',
    subMessage: 'Celebrate with all your loved ones',
  },
  [JourneyStage.HONEYMOONING]: {
    stage: JourneyStage.HONEYMOONING,
    title: '✈️ Your Paradise Awaits!',
    emoji: '✈️',
    confetti: {
      enabled: true,
      count: 60,
      duration: 3500,
      colors: ['#00695C', '#FF7043', '#FFD54F'],
    },
    sound: {
      enabled: true,
      url: '/sounds/magical.mp3',
      volume: 0.75,
    },
    animation: {
      type: 'sparkles',
      duration: 3500,
    },
    message: 'Your forever begins now!',
    subMessage: 'Bon Voyage to your dream honeymoon!',
  },
};

/**
 * Trigger celebration animation
 */
export function triggerCelebration(stage: JourneyStage): void {
  const config = CELEBRATION_CONFIGS[stage];

  if (typeof window === 'undefined') return;

  // Play sound if enabled
  if (config.sound.enabled) {
    playSound(config.sound.url, config.sound.volume);
  }

  // Trigger confetti if enabled
  if (config.confetti.enabled) {
    triggerConfetti(config.confetti);
  }

  // Trigger animation
  triggerAnimation(config.animation, config.emoji);

  // Show modal/toast with celebration message
  showCelebrationModal(config);

  // Broadcast event for other listeners
  window.dispatchEvent(
    new CustomEvent('celebration', {
      detail: {
        stage,
        config,
      },
    })
  );
}

/**
 * Play celebration sound
 */
function playSound(url: string, volume: number): void {
  if (!url) return;

  const audio = new Audio(url);
  audio.volume = Math.max(0, Math.min(1, volume));
  audio.play().catch((err) => {
    console.warn('Failed to play celebration sound:', err);
  });
}

/**
 * Trigger confetti animation
 */
function triggerConfetti(config: CelebrationConfig['confetti']): void {
  // In production, use a library like canvas-confetti
  // This is a mock implementation
  console.log('🎊 Confetti triggered:', config);

  // Example with canvas-confetti (if loaded)
  if (typeof (window as any).confetti === 'function') {
    (window as any).confetti({
      particleCount: config.count,
      spread: 70,
      origin: { y: 0.6 },
      colors: config.colors,
    });

    setTimeout(() => {
      (window as any).confetti({
        particleCount: config.count / 2,
        spread: 100,
        origin: { y: 0.6 },
        colors: config.colors,
      });
    }, config.duration / 2);
  }
}

/**
 * Trigger animation
 */
function triggerAnimation(animation: CelebrationConfig['animation'], emoji: string): void {
  console.log(`${emoji} ${animation.type} animation triggered for ${animation.duration}ms`);

  // In production, implement actual CSS animations or canvas drawing
  // For now, just log the animation type
}

/**
 * Show celebration modal
 */
function showCelebrationModal(config: CelebrationConfig): void {
  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'celebration-modal';
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    text-align: center;
    z-index: 10000;
    animation: scaleIn 0.5s ease-out;
  `;

  modal.innerHTML = `
    <div style="font-size: 4rem; margin-bottom: 1rem;">${config.emoji}</div>
    <h2 style="font-size: 1.8rem; margin: 0 0 0.5rem; color: #333;">${config.title}</h2>
    <p style="font-size: 1.1rem; color: #666; margin: 0 0 1rem;">${config.message}</p>
    ${config.subMessage ? `<p style="font-size: 0.9rem; color: #999; margin: 0;">${config.subMessage}</p>` : ''}
  `;

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(modal);

  // Auto-remove after duration
  setTimeout(() => {
    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%, -50%) scale(0.8)';
    modal.style.transition = 'all 0.3s ease-out';

    setTimeout(() => {
      modal.remove();
    }, 300);
  }, 3000);
}

/**
 * Get celebration message for a stage
 */
export function getCelebrationMessage(stage: JourneyStage): string {
  return CELEBRATION_CONFIGS[stage].message;
}

/**
 * Check if celebration should auto-trigger
 */
export function shouldAutoTrigger(stage: JourneyStage): boolean {
  // Auto-trigger for all major milestones
  return true;
}
