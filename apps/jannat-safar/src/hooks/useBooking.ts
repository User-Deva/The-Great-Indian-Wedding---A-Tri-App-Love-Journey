import { useState, useCallback } from 'react';
import { HoneymoonBooking, Flight, HotelRoom } from '../types';
import { useJannatSafariStore } from '../store/honeymoonStore';
import { supabase } from '@great-indian-wedding/auth';

export function useBooking() {
  const { bookings, addBooking, removeBooking, setError } = useJannatSafariStore();
  const [isBooking, setIsBooking] = useState(false);

  /**
   * Book a flight
   */
  const bookFlight = useCallback(
    async (
      honeymoonId: string,
      flight: Flight,
      totalCost: number
    ) => {
      setIsBooking(true);
      setError(null);

      try {
        const booking: HoneymoonBooking = {
          id: `flight-${Date.now()}`,
          honeymoonId,
          bookingType: 'flight',
          provider: flight.airline,
          referenceNumber: flight.flightNumber,
          bookingDate: new Date(),
          totalCost,
          currency: 'INR',
          status: 'pending',
          details: {
            flightNumber: flight.flightNumber,
            departureCity: flight.departureCity,
            arrivalCity: flight.arrivalCity,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            duration: flight.duration,
            class: flight.class,
          },
          createdAt: new Date(),
        };

        // Save to Supabase
        const { data, error } = await supabase
          .from('honeymoon_bookings')
          .insert([
            {
              honeymoon_id: honeymoonId,
              booking_type: 'flight',
              provider_name: flight.airline,
              booking_reference: flight.flightNumber,
              booking_date: new Date().toISOString().split('T')[0],
              total_cost: totalCost,
              status: 'pending',
            },
          ])
          .select()
          .single();

        if (error) throw error;

        addBooking({
          ...booking,
          id: data.id,
        });

        return booking;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to book flight';
        setError(message);
        throw error;
      } finally {
        setIsBooking(false);
      }
    },
    [addBooking, setError]
  );

  /**
   * Book a hotel
   */
  const bookHotel = useCallback(
    async (
      honeymoonId: string,
      hotel: HotelRoom,
      checkIn: Date,
      checkOut: Date,
      nights: number
    ) => {
      setIsBooking(true);
      setError(null);

      try {
        const totalCost = hotel.pricePerNight * nights;

        const booking: HoneymoonBooking = {
          id: `hotel-${Date.now()}`,
          honeymoonId,
          bookingType: 'hotel',
          provider: hotel.hotelName,
          referenceNumber: `BOOKING-${Date.now()}`,
          bookingDate: new Date(),
          totalCost,
          currency: 'INR',
          status: 'pending',
          details: {
            hotelId: hotel.hotelId,
            roomType: hotel.roomType,
            pricePerNight: hotel.pricePerNight,
            checkIn,
            checkOut,
            nights,
            amenities: hotel.amenities,
            romanticFeatures: hotel.romanticFeatures,
          },
          createdAt: new Date(),
        };

        // Save to Supabase
        const { data, error } = await supabase
          .from('honeymoon_bookings')
          .insert([
            {
              honeymoon_id: honeymoonId,
              booking_type: 'hotel',
              provider_name: hotel.hotelName,
              booking_reference: booking.referenceNumber,
              booking_date: new Date().toISOString().split('T')[0],
              total_cost: totalCost,
              status: 'pending',
            },
          ])
          .select()
          .single();

        if (error) throw error;

        addBooking({
          ...booking,
          id: data.id,
        });

        return booking;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to book hotel';
        setError(message);
        throw error;
      } finally {
        setIsBooking(false);
      }
    },
    [addBooking, setError]
  );

  /**
   * Confirm a booking
   */
  const confirmBooking = useCallback(
    async (bookingId: string) => {
      try {
        await supabase
          .from('honeymoon_bookings')
          .update({ status: 'confirmed' })
          .eq('id', bookingId);

        // Update local state
        // (would need to implement update method in store)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to confirm booking';
        setError(message);
        throw error;
      }
    },
    [setError]
  );

  /**
   * Cancel a booking
   */
  const cancelBooking = useCallback(
    async (bookingId: string) => {
      try {
        await supabase
          .from('honeymoon_bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId);

        removeBooking(bookingId);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to cancel booking';
        setError(message);
        throw error;
      }
    },
    [removeBooking, setError]
  );

  return {
    bookings,
    isBooking,
    bookFlight,
    bookHotel,
    confirmBooking,
    cancelBooking,
  };
}
