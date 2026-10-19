import type { Service, Product, Barber, Appointment } from '../types';

export const initialServices: Service[] = [
  {
    id: 'serv-1',
    name: 'Corte Clásico / Fade',
    description: 'Corte de cabello personalizado con técnica moderna o clásica, lavado y peinado con producto premium.',
    price: 15,
    durationMinutes: 30,
    category: 'Cortes',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'serv-2',
    name: 'Diseño de Barba & Toalla Caliente',
    description: 'Perfilado de barba con navaja, vapor, toalla caliente y aceites hidratantes esenciales.',
    price: 12,
    durationMinutes: 25,
    category: 'Barba',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'serv-3',
    name: 'Combo Master (Corte + Barba)',
    description: 'La experiencia completa de la casa. Corte completo y arreglo de barba profesional con masaje facial.',
    price: 24,
    durationMinutes: 50,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'serv-4',
    name: 'Tratamiento Anticaída & Exfoliación',
    description: 'Limpieza profunda del cuero cabelludo con tónicos estimulantes y alta frecuencia.',
    price: 18,
    durationMinutes: 30,
    category: 'Tratamientos',
    image: 'https://images.unsplash.com/photo-1512864082165-27a3a2d24443?auto=format&fit=crop&q=80&w=600'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Pomada Matte Efecto Seco',
    description: 'Fijación fuerte sin brillo artificial. Aroma cítrico amaderado. Fácil de lavar.',
    price: 16,
    category: 'Cera & Pomada',
    image: 'https://images.unsplash.com/photo-1583209814637-b6f12c293774?auto=format&fit=crop&q=80&w=500',
    stock: 25,
    rating: 4.8
  },
  {
    id: 'prod-2',
    name: 'Aceite Orgánico para Barba 30ml',
    description: 'Aceite de argán y jojoba para hidratar, suavizar y dar brillo saludable a tu barba.',
    price: 14,
    category: 'Cuidado de Barba',
    image: 'https://images.unsplash.com/photo-1608248597359-f55c82ffc080?auto=format&fit=crop&q=80&w=500',
    stock: 18,
    rating: 4.9
  },
  {
    id: 'prod-3',
    name: 'Shampoo Fortalecedor Mentolado',
    description: 'Limpieza refrescante con extracto de menta y biotina para fortalecer el folículo capilar.',
    price: 15,
    category: 'Shampoos',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=500',
    stock: 30,
    rating: 4.7
  },
  {
    id: 'prod-4',
    name: 'Peine de Madera Antiestático',
    description: 'Peine artesanal de sándalo ideal para moldear barbas y bigotes sin frizz.',
    price: 8,
    category: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500',
    stock: 12,
    rating: 4.6
  }
];

export const initialBarbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'Carlos "El Maestro" Gómez',
    nickname: 'Carlos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    specialty: 'Fades & Barbas Clásicas',
    rating: 5.0
  },
  {
    id: 'barber-2',
    name: 'Mateo "Razor" Silva',
    nickname: 'Mateo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    specialty: 'Estilos Urbanos & Diseños',
    rating: 4.9
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    serviceId: 'serv-1',
    serviceName: 'Corte Clásico / Fade',
    barberId: 'barber-1',
    barberName: 'Carlos "El Maestro" Gómez',
    clientName: 'Alejandro Pérez',
    clientPhone: '+34 600 123 456',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    price: 15,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'apt-2',
    serviceId: 'serv-3',
    serviceName: 'Combo Master (Corte + Barba)',
    barberId: 'barber-2',
    barberName: 'Mateo "Razor" Silva',
    clientName: 'Daniel Mendoza',
    clientPhone: '+34 611 987 654',
    date: new Date().toISOString().split('T')[0],
    time: '11:30',
    price: 24,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const availableTimeSlots = [
  '09:00', '09:45', '10:30', '11:15', '12:00',
  '16:00', '16:45', '17:30', '18:15', '19:00', '19:45'
];
