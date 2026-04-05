import { useState, useCallback } from 'react';
import { Vendor, VendorBooking, VendorCategory } from '../types';
import { useShaadaiSajaoStore } from '../store/shaadiStore';
import { supabase } from '@great-indian-wedding/auth';

// Mock vendor database (would be real Supabase data)
const MOCK_VENDORS: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Varmala Decorators Prime',
    category: VendorCategory.DECORATOR,
    city: 'Delhi',
    rating: 4.9,
    reviewCount: 127,
    contactEmail: 'decor@varmala.com',
    contactPhone: '+91 98765 43210',
    portfolioUrl: 'https://varmala.com/decorators',
    priceRange: '₹2L - ₹10L',
    varmalVerified: true,
    description: 'Award-winning wedding decorators with 15+ years experience',
    imageUrl: 'https://via.placeholder.com/300x200?text=Varmala+Decorators',
  },
  {
    id: 'vendor-2',
    name: 'Maharaja Catering Co.',
    category: VendorCategory.CATERER,
    city: 'Delhi',
    rating: 4.8,
    reviewCount: 95,
    contactEmail: 'catering@maharaja.com',
    contactPhone: '+91 98765 43211',
    portfolioUrl: 'https://maharaja.com',
    priceRange: '₹800 - ₹3000 per plate',
    varmalVerified: true,
    description: 'Premium Indian and international cuisine',
    imageUrl: 'https://via.placeholder.com/300x200?text=Maharaja+Catering',
  },
  {
    id: 'vendor-3',
    name: 'Moments Photography',
    category: VendorCategory.PHOTOGRAPHER,
    city: 'Delhi',
    rating: 4.7,
    reviewCount: 156,
    contactEmail: 'photo@moments.com',
    contactPhone: '+91 98765 43212',
    portfolioUrl: 'https://moments.com/weddings',
    priceRange: '₹1L - ₹5L',
    varmalVerified: true,
    description: 'Cinematic wedding photography and videography',
    imageUrl: 'https://via.placeholder.com/300x200?text=Moments+Photography',
  },
  {
    id: 'vendor-4',
    name: 'Mehendi Magic Studio',
    category: VendorCategory.MEHENDI,
    city: 'Delhi',
    rating: 4.9,
    reviewCount: 203,
    contactEmail: 'mehendi@magic.com',
    contactPhone: '+91 98765 43213',
    portfolioUrl: 'https://mehendmagic.com',
    priceRange: '₹50K - ₹3L',
    varmalVerified: true,
    description: 'Traditional and bridal mehendi artistry',
    imageUrl: 'https://via.placeholder.com/300x200?text=Mehendi+Magic',
  },
];

export function useVendors() {
  const { vendors, vendorBookings, setVendors, setVendorBookings, addVendorBooking, removeVendorBooking, setError } = useShaadaiSajaoStore();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch vendors by category
   */
  const fetchVendorsByCategory = useCallback(
    async (category: VendorCategory, city?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // Mock implementation - replace with Supabase query
        let filtered = MOCK_VENDORS.filter((v) => v.category === category);

        if (city) {
          filtered = filtered.filter((v) => v.city === city);
        }

        setVendors(filtered);
        return filtered;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch vendors';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setVendors, setError]
  );

  /**
   * Get all verified vendors
   */
  const fetchVerifiedVendors = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock implementation
      const verified = MOCK_VENDORS.filter((v) => v.varmalVerified);
      setVendors(verified);
      return verified;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch vendors';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setVendors, setError]);

  /**
   * Book a vendor
   */
  const bookVendor = useCallback(
    async (weddingId: string, vendorId: string, depositAmount: number, notes?: string) => {
      try {
        const vendor = MOCK_VENDORS.find((v) => v.id === vendorId);
        if (!vendor) throw new Error('Vendor not found');

        const booking: VendorBooking = {
          id: `booking-${Date.now()}`,
          weddingId,
          vendorId,
          vendor,
          bookingDate: new Date(),
          depositAmount,
          depositPaid: false,
          status: 'pending',
          notes,
          createdAt: new Date(),
        };

        // Save to Supabase
        const { data, error } = await supabase
          .from('vendor_bookings')
          .insert([
            {
              wedding_id: weddingId,
              vendor_id: vendorId,
              booking_date: new Date().toISOString().split('T')[0],
              deposit_amount: depositAmount,
              status: 'pending',
            },
          ])
          .select()
          .single();

        if (error) throw error;

        addVendorBooking({
          ...booking,
          id: data.id,
        });

        return booking;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to book vendor';
        setError(message);
        throw error;
      }
    },
    [addVendorBooking, setError]
  );

  /**
   * Mark deposit as paid
   */
  const markDepositPaid = useCallback(
    async (bookingId: string) => {
      try {
        await supabase
          .from('vendor_bookings')
          .update({ deposit_paid: true })
          .eq('id', bookingId);

        // Update local state
        const updated = vendorBookings.map((b) =>
          b.id === bookingId ? { ...b, depositPaid: true } : b
        );
        setVendorBookings(updated);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update deposit';
        setError(message);
        throw error;
      }
    },
    [vendorBookings, setVendorBookings, setError]
  );

  /**
   * Cancel vendor booking
   */
  const cancelBooking = useCallback(
    async (bookingId: string) => {
      try {
        await supabase
          .from('vendor_bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId);

        removeVendorBooking(bookingId);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to cancel booking';
        setError(message);
        throw error;
      }
    },
    [removeVendorBooking, setError]
  );

  return {
    vendors,
    vendorBookings,
    isLoading,
    fetchVendorsByCategory,
    fetchVerifiedVendors,
    bookVendor,
    markDepositPaid,
    cancelBooking,
  };
}
