import { describe, it, expect } from 'vitest';
import { validateBooking } from './guardrails';

describe('Guardrails - validateBooking', () => {
  it('should validate correct booking data', () => {
    const validData = {
      serviceId: 's1',
      barberId: 'b1',
      date: '2026-10-25',
      time: '10:00 AM',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      clientPhone: '5551234567',
    };

    const result = validateBooking(validData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  it('should fail on invalid email', () => {
    const invalidData = {
      serviceId: 's1',
      barberId: 'b1',
      date: '2026-10-25',
      time: '10:00 AM',
      clientName: 'John Doe',
      clientEmail: 'not-an-email',
      clientPhone: '5551234567',
    };

    const result = validateBooking(invalidData);
    expect(result.success).toBe(false);
    expect(result.error).toContain('clientEmail');
  });
});
