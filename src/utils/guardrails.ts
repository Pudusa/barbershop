import { z } from 'zod';

/**
 * Guardrails: Runtime data validation and sanitization schemas.
 * Ensures strict type safety and boundary validation for untrusted inputs.
 */

export const BookingSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  barberId: z.string().min(1, 'Barber ID is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().min(7, 'Phone number is required'),
});

export type BookingInput = z.infer<typeof BookingSchema>;

export function validateBooking(data: unknown): { success: boolean; data?: BookingInput; error?: string } {
  const result = BookingSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }
  return {
    success: true,
    data: result.data,
  };
}
