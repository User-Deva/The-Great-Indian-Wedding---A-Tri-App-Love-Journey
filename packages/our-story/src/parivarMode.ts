/**
 * Parivar Mode (Family Dashboard)
 *
 * Allows family members to view and collaborate on wedding planning
 * Role-based access control for different family members
 */

export enum FamilyRole {
  GROOM = 'Groom',
  BRIDE = 'Bride',
  GROOM_PARENT = 'Groom Parent',
  BRIDE_PARENT = 'Bride Parent',
  SIBLING = 'Sibling',
  EXTENDED_FAMILY = 'Extended Family',
  FRIEND = 'Friend',
  COORDINATOR = 'Coordinator',
}

export enum AccessLevel {
  VIEW_ONLY = 'view_only',
  COMMENT = 'comment',
  EDIT = 'edit',
  ADMIN = 'admin',
}

// Access control matrix
export const ROLE_PERMISSIONS: Record<FamilyRole, AccessLevel> = {
  [FamilyRole.GROOM]: AccessLevel.ADMIN,
  [FamilyRole.BRIDE]: AccessLevel.ADMIN,
  [FamilyRole.GROOM_PARENT]: AccessLevel.EDIT,
  [FamilyRole.BRIDE_PARENT]: AccessLevel.EDIT,
  [FamilyRole.SIBLING]: AccessLevel.COMMENT,
  [FamilyRole.EXTENDED_FAMILY]: AccessLevel.COMMENT,
  [FamilyRole.FRIEND]: AccessLevel.VIEW_ONLY,
  [FamilyRole.COORDINATOR]: AccessLevel.ADMIN,
};

export interface FamilyMember {
  id: string;
  coupleId: string;
  userId?: string; // Supabase auth user ID
  name: string;
  email: string;
  phone?: string;
  relationship: FamilyRole;
  accessLevel: AccessLevel;
  invitationStatus: 'pending' | 'accepted' | 'declined';
  invitedAt: Date;
  acceptedAt?: Date;
  profilePhoto?: string;
}

export interface FamilyDashboardAccess {
  coupleId: string;
  members: FamilyMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyActivity {
  id: string;
  coupleId: string;
  activityType: 'guest_rsvp' | 'budget_update' | 'vendor_booked' | 'photo_shared' | 'comment_added';
  description: string;
  performedBy: string; // Family member name
  timestamp: Date;
  metadata: Record<string, any>;
}

/**
 * Get access level based on family role
 */
export function getAccessLevel(role: FamilyRole): AccessLevel {
  return ROLE_PERMISSIONS[role];
}

/**
 * Check if user can perform action
 */
export function canPerformAction(userLevel: AccessLevel, requiredLevel: AccessLevel): boolean {
  const levelHierarchy: Record<AccessLevel, number> = {
    [AccessLevel.VIEW_ONLY]: 0,
    [AccessLevel.COMMENT]: 1,
    [AccessLevel.EDIT]: 2,
    [AccessLevel.ADMIN]: 3,
  };

  return levelHierarchy[userLevel] >= levelHierarchy[requiredLevel];
}

/**
 * What each role can do in Rishta
 */
export const RISHTA_ROLE_CAPABILITIES: Record<FamilyRole, string[]> = {
  [FamilyRole.GROOM]: ['browse_matches', 'express_interest', 'suggest_match', 'view_dates'],
  [FamilyRole.BRIDE]: ['browse_matches', 'express_interest', 'suggest_match', 'view_dates'],
  [FamilyRole.GROOM_PARENT]: ['suggest_match', 'view_matches', 'view_dates'],
  [FamilyRole.BRIDE_PARENT]: ['suggest_match', 'view_matches', 'view_dates'],
  [FamilyRole.SIBLING]: ['view_matches', 'view_dates'],
  [FamilyRole.EXTENDED_FAMILY]: ['view_matches'],
  [FamilyRole.FRIEND]: ['view_profile'],
  [FamilyRole.COORDINATOR]: ['view_all', 'manage_communications'],
};

/**
 * What each role can do in Shaadi Sajao
 */
export const SHAADI_ROLE_CAPABILITIES: Record<FamilyRole, string[]> = {
  [FamilyRole.GROOM]: [
    'view_dashboard',
    'update_budget',
    'book_vendors',
    'manage_guests',
    'manage_rituals',
  ],
  [FamilyRole.BRIDE]: [
    'view_dashboard',
    'update_budget',
    'book_vendors',
    'manage_guests',
    'manage_rituals',
  ],
  [FamilyRole.GROOM_PARENT]: [
    'view_dashboard',
    'update_budget',
    'suggest_vendors',
    'manage_guests',
  ],
  [FamilyRole.BRIDE_PARENT]: [
    'view_dashboard',
    'update_budget',
    'suggest_vendors',
    'manage_guests',
  ],
  [FamilyRole.SIBLING]: ['view_dashboard', 'manage_guests', 'comment_on_plans'],
  [FamilyRole.EXTENDED_FAMILY]: ['view_dashboard', 'confirm_rsvp'],
  [FamilyRole.FRIEND]: ['view_dashboard', 'confirm_rsvp'],
  [FamilyRole.COORDINATOR]: [
    'view_all',
    'manage_all',
    'communicate_with_vendors',
    'track_progress',
  ],
};

/**
 * What each role can do in Jannat Safar
 */
export const JANNAT_ROLE_CAPABILITIES: Record<FamilyRole, string[]> = {
  [FamilyRole.GROOM]: ['view_plans', 'suggest_destinations', 'add_itinerary', 'book_flights_hotels'],
  [FamilyRole.BRIDE]: ['view_plans', 'suggest_destinations', 'add_itinerary', 'book_flights_hotels'],
  [FamilyRole.GROOM_PARENT]: ['view_plans', 'suggest_destinations'],
  [FamilyRole.BRIDE_PARENT]: ['view_plans', 'suggest_destinations'],
  [FamilyRole.SIBLING]: ['view_plans'],
  [FamilyRole.EXTENDED_FAMILY]: ['view_plans'],
  [FamilyRole.FRIEND]: ['view_plans'],
  [FamilyRole.COORDINATOR]: ['view_plans', 'manage_bookings'],
};

/**
 * Get capabilities for a specific role and app
 */
export function getCapabilities(
  role: FamilyRole,
  app: 'rishta' | 'shaadi' | 'jannat'
): string[] {
  const capabilityMaps = {
    rishta: RISHTA_ROLE_CAPABILITIES,
    shaadi: SHAADI_ROLE_CAPABILITIES,
    jannat: JANNAT_ROLE_CAPABILITIES,
  };

  return capabilityMaps[app][role] || [];
}

/**
 * Generate invitation link for family member
 */
export function generateInvitationLink(coupleId: string, token: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jannat-safar.com';
  return `${baseUrl}/family/invite?couple=${coupleId}&token=${token}`;
}

/**
 * Format relationship label for display
 */
export function getRelationshipLabel(role: FamilyRole, fromPerspective: 'groom' | 'bride'): string {
  const labels: Record<FamilyRole, Record<string, string>> = {
    [FamilyRole.GROOM]: { groom: 'You', bride: 'Groom' },
    [FamilyRole.BRIDE]: { groom: 'Bride', bride: 'You' },
    [FamilyRole.GROOM_PARENT]: { groom: 'Parent', bride: "Groom's Parent" },
    [FamilyRole.BRIDE_PARENT]: { groom: "Bride's Parent", bride: 'Parent' },
    [FamilyRole.SIBLING]: { groom: 'Sibling', bride: 'Sibling' },
    [FamilyRole.EXTENDED_FAMILY]: { groom: 'Family', bride: 'Family' },
    [FamilyRole.FRIEND]: { groom: 'Friend', bride: 'Friend' },
    [FamilyRole.COORDINATOR]: { groom: 'Coordinator', bride: 'Coordinator' },
  };

  return labels[role][fromPerspective] || role;
}
