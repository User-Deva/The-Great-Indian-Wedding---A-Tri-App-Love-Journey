import { JourneyStage } from '@great-indian-wedding/theme-engine';
import { MILESTONE_TITLES, MILESTONE_EMOJIS } from '@great-indian-wedding/our-story';
import {
  MockDb,
  MockUser,
  MockCouple,
  MockMatch,
  MockScheduledDate,
  MockWedding,
  MockVendor,
  MockVendorBooking,
  MockDestination,
  MockHoneymoon,
  MockHoneymoonBooking,
  MockTimelineEvent,
  MockFlight,
  MockHotel,
  MockProfile,
  MockDateVenue,
} from './types';
import { readDb, writeDb, resetDb } from './storage';
import { SEED_VENUES, SEED_VENDORS, SEED_DESTINATIONS, SEED_FLIGHTS, SEED_HOTELS } from './seed';

const STAGE_ORDER: JourneyStage[] = [
  JourneyStage.SEEKING,
  JourneyStage.MATCHED,
  JourneyStage.DATE_SET,
  JourneyStage.DATING,
  JourneyStage.WEDDING,
  JourneyStage.HONEYMOONING,
];

function stageIndex(stage: JourneyStage): number {
  return STAGE_ORDER.indexOf(stage);
}

function id(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function update(mutator: (db: MockDb) => void): MockDb {
  const db = readDb();
  mutator(db);
  writeDb(db);
  return db;
}

function appendTimeline(db: MockDb, coupleId: string, stage: JourneyStage, description: string): void {
  const event: MockTimelineEvent = {
    id: id('evt'),
    coupleId,
    stage,
    title: MILESTONE_TITLES[stage],
    description,
    emoji: MILESTONE_EMOJIS[stage],
    timestamp: new Date().toISOString(),
  };
  db.timelines[coupleId] = [...(db.timelines[coupleId] || []), event];
}

function advanceStage(db: MockDb, coupleId: string, target: JourneyStage, description: string): void {
  const couple = db.couples[coupleId];
  if (!couple) return;
  if (stageIndex(target) <= stageIndex(couple.journeyStage)) return;
  couple.journeyStage = target;
  couple.updatedAt = new Date().toISOString();
  appendTimeline(db, coupleId, target, description);
}

export const mockApi = {
  reset(): void {
    resetDb();
  },

  listAvailableUsers(): MockUser[] {
    const db = readDb();
    return Object.values(db.users);
  },

  getCurrentUser(): MockUser | null {
    const db = readDb();
    if (!db.currentUserId) return null;
    return db.users[db.currentUserId] || null;
  },

  signIn(userId: string): MockUser | null {
    const db = readDb();
    const user = db.users[userId];
    if (!user) return null;
    db.currentUserId = userId;
    writeDb(db);
    return user;
  },

  signOut(): void {
    update((db) => {
      db.currentUserId = null;
    });
  },

  getCouple(coupleId: string): MockCouple | null {
    const db = readDb();
    return db.couples[coupleId] || null;
  },

  getProfile(userId: string): MockProfile | null {
    const db = readDb();
    return db.profiles[userId] || null;
  },

  updateProfile(userId: string, updates: Partial<MockProfile>): MockProfile | null {
    let result: MockProfile | null = null;
    update((db) => {
      const existing = db.profiles[userId];
      if (!existing) return;
      db.profiles[userId] = { ...existing, ...updates };
      result = db.profiles[userId];
    });
    return result;
  },

  getMatches(coupleId: string): MockMatch[] {
    const db = readDb();
    return db.matches[coupleId] || [];
  },

  respondToMatch(coupleId: string, matchId: string, action: 'interested' | 'passed'): MockCouple | null {
    let couple: MockCouple | null = null;
    update((db) => {
      const matches = db.matches[coupleId];
      if (!matches) return;
      const match = matches.find((m) => m.id === matchId);
      if (!match) return;
      match.status = action;
      if (action === 'interested') {
        advanceStage(
          db,
          coupleId,
          JourneyStage.MATCHED,
          `You expressed interest in ${match.candidateName}. They reciprocated.`
        );
      }
      couple = db.couples[coupleId];
    });
    return couple;
  },

  listVenues(city?: string): MockDateVenue[] {
    if (!city) return SEED_VENUES;
    const lower = city.toLowerCase();
    const filtered = SEED_VENUES.filter((v) => v.address.toLowerCase().includes(lower));
    return filtered.length > 0 ? filtered : SEED_VENUES;
  },

  getScheduledDate(coupleId: string): MockScheduledDate | null {
    const db = readDb();
    return db.scheduledDates[coupleId] || null;
  },

  scheduleDate(coupleId: string, venueId: string, scheduledFor: string): MockScheduledDate | null {
    const venue = SEED_VENUES.find((v) => v.id === venueId);
    if (!venue) return null;
    let result: MockScheduledDate | null = null;
    update((db) => {
      const scheduled: MockScheduledDate = {
        id: id('date'),
        coupleId,
        venue,
        scheduledFor,
        completed: false,
      };
      db.scheduledDates[coupleId] = scheduled;
      advanceStage(
        db,
        coupleId,
        JourneyStage.DATE_SET,
        `First date scheduled at ${venue.name} on ${new Date(scheduledFor).toDateString()}.`
      );
      result = scheduled;
    });
    return result;
  },

  rateDate(coupleId: string, rating: number, notes?: string): MockScheduledDate | null {
    let result: MockScheduledDate | null = null;
    update((db) => {
      const scheduled = db.scheduledDates[coupleId];
      if (!scheduled) return;
      scheduled.rating = rating;
      scheduled.notes = notes;
      scheduled.completed = true;
      if (rating >= 4) {
        advanceStage(
          db,
          coupleId,
          JourneyStage.DATING,
          `${rating}-star first date at ${scheduled.venue.name}. The spark is real.`
        );
      } else {
        appendTimeline(
          db,
          coupleId,
          JourneyStage.DATE_SET,
          `Date at ${scheduled.venue.name} rated ${rating}/5. Going to try again.`
        );
      }
      result = scheduled;
    });
    return result;
  },

  getWedding(coupleId: string): MockWedding | null {
    const db = readDb();
    return db.weddings[coupleId] || null;
  },

  saveWedding(coupleId: string, wedding: Omit<MockWedding, 'id' | 'coupleId'>): MockWedding | null {
    let result: MockWedding | null = null;
    update((db) => {
      const existing = db.weddings[coupleId];
      const next: MockWedding = {
        id: existing?.id || id('wed'),
        coupleId,
        ...wedding,
      };
      db.weddings[coupleId] = next;
      result = next;
    });
    return result;
  },

  listVendors(city?: string, category?: string): MockVendor[] {
    return SEED_VENDORS.filter((v) => {
      if (city && v.city.toLowerCase() !== city.toLowerCase()) return false;
      if (category && v.category !== category) return false;
      return true;
    });
  },

  getVendorBookings(coupleId: string): MockVendorBooking[] {
    const db = readDb();
    return db.vendorBookings[coupleId] || [];
  },

  bookVendor(coupleId: string, vendorId: string, payDeposit: boolean): MockVendorBooking | null {
    const vendor = SEED_VENDORS.find((v) => v.id === vendorId);
    if (!vendor) return null;
    let result: MockVendorBooking | null = null;
    update((db) => {
      const booking: MockVendorBooking = {
        id: id('book'),
        coupleId,
        vendor,
        depositAmount: Math.round(vendor.basePrice * 0.2),
        depositPaid: payDeposit,
        totalAmount: vendor.basePrice,
        status: payDeposit ? 'confirmed' : 'pending',
        bookedAt: new Date().toISOString(),
      };
      db.vendorBookings[coupleId] = [...(db.vendorBookings[coupleId] || []), booking];
      if (payDeposit) {
        advanceStage(
          db,
          coupleId,
          JourneyStage.WEDDING,
          `${vendor.name} confirmed with deposit. Wedding is officially happening.`
        );
      }
      result = booking;
    });
    return result;
  },

  listDestinations(): MockDestination[] {
    return SEED_DESTINATIONS;
  },

  getDestination(id: string): MockDestination | null {
    return SEED_DESTINATIONS.find((d) => d.id === id) || null;
  },

  getHoneymoon(coupleId: string): MockHoneymoon | null {
    const db = readDb();
    return db.honeymoons[coupleId] || null;
  },

  saveHoneymoon(coupleId: string, destinationId: string, startDate: string, endDate: string, budget: number): MockHoneymoon | null {
    const dest = SEED_DESTINATIONS.find((d) => d.id === destinationId);
    if (!dest) return null;
    let result: MockHoneymoon | null = null;
    const nights = Math.max(
      1,
      Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    );
    update((db) => {
      const honeymoon: MockHoneymoon = {
        id: id('hmn'),
        coupleId,
        destinationId,
        destinationName: dest.name,
        startDate,
        endDate,
        budgetTotal: budget,
        nights,
      };
      db.honeymoons[coupleId] = honeymoon;
      result = honeymoon;
    });
    return result;
  },

  listFlights(destinationId: string): MockFlight[] {
    const dest = SEED_DESTINATIONS.find((d) => d.id === destinationId);
    if (!dest) return SEED_FLIGHTS.slice(0, 3);
    const match = SEED_FLIGHTS.filter((f) => f.to.toLowerCase().includes(dest.name.toLowerCase()));
    return match.length > 0 ? match : SEED_FLIGHTS.slice(0, 3);
  },

  listHotels(destinationId: string): MockHotel[] {
    const dest = SEED_DESTINATIONS.find((d) => d.id === destinationId);
    if (!dest) return SEED_HOTELS.slice(0, 3);
    const match = SEED_HOTELS.filter((h) => h.city.toLowerCase() === dest.name.toLowerCase());
    return match.length > 0 ? match : SEED_HOTELS.slice(0, 3);
  },

  getHoneymoonBookings(coupleId: string): MockHoneymoonBooking[] {
    const db = readDb();
    return db.honeymoonBookings[coupleId] || [];
  },

  bookHoneymoonFlight(coupleId: string, flightId: string): MockHoneymoonBooking | null {
    const flight = SEED_FLIGHTS.find((f) => f.id === flightId);
    if (!flight) return null;
    let result: MockHoneymoonBooking | null = null;
    update((db) => {
      const booking: MockHoneymoonBooking = {
        id: id('hbook'),
        coupleId,
        type: 'flight',
        reference: `${flight.flightNumber}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        description: `${flight.airline} ${flight.flightNumber} • ${flight.from} → ${flight.to}`,
        totalCost: flight.price * 2,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      };
      db.honeymoonBookings[coupleId] = [...(db.honeymoonBookings[coupleId] || []), booking];
      advanceStage(
        db,
        coupleId,
        JourneyStage.HONEYMOONING,
        `Flight to ${flight.to} booked. Paradise begins ${flight.departureTime} local time.`
      );
      result = booking;
    });
    return result;
  },

  bookHoneymoonHotel(coupleId: string, hotelId: string, nights: number): MockHoneymoonBooking | null {
    const hotel = SEED_HOTELS.find((h) => h.id === hotelId);
    if (!hotel) return null;
    let result: MockHoneymoonBooking | null = null;
    update((db) => {
      const booking: MockHoneymoonBooking = {
        id: id('hbook'),
        coupleId,
        type: 'hotel',
        reference: `${hotel.id.toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        description: `${hotel.name} • ${hotel.city} • ${nights} nights`,
        totalCost: hotel.pricePerNight * nights,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      };
      db.honeymoonBookings[coupleId] = [...(db.honeymoonBookings[coupleId] || []), booking];
      advanceStage(
        db,
        coupleId,
        JourneyStage.HONEYMOONING,
        `${hotel.name} booked for ${nights} nights. Honeymoon locked in.`
      );
      result = booking;
    });
    return result;
  },

  getTimeline(coupleId: string): MockTimelineEvent[] {
    const db = readDb();
    return db.timelines[coupleId] || [];
  },

  getJourneyStage(coupleId: string): JourneyStage {
    const couple = readDb().couples[coupleId];
    return couple?.journeyStage ?? JourneyStage.SEEKING;
  },
};

export type MockApi = typeof mockApi;
