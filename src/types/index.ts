export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: 'Cortes' | 'Barba' | 'Combos' | 'Tratamientos';
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Cera & Pomada' | 'Cuidado de Barba' | 'Shampoos' | 'Accesorios';
  image: string;
  stock: number;
  rating: number;
}

export interface Barber {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  specialty: string;
  rating: number;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  clientName: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ActiveTab = 'home' | 'services' | 'store' | 'booking' | 'admin' | 'barber';

export interface StaffUser {
  username: string;
  role: 'admin' | 'barber';
  name: string;
  barberId?: string;
}
