import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Service, Product, Barber, Appointment, CartItem, ActiveTab, StaffUser } from '../types';
import { initialServices, initialProducts, initialBarbers, initialAppointments } from '../data/mockData';
import { api } from '../services/api';

interface BarbershopContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  services: Service[];
  products: Product[];
  barbers: Barber[];
  appointments: Appointment[];
  cart: CartItem[];
  selectedServiceForBooking: Service | null;
  setSelectedServiceForBooking: (service: Service | null) => void;
  
  // Staff Auth
  staffUser: StaffUser | null;
  isStaffLoginOpen: boolean;
  setIsStaffLoginOpen: (open: boolean) => void;
  loginStaff: (username: string, pass: string) => boolean;
  logoutStaff: () => void;

  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Booking Actions
  createAppointment: (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
  
  // Admin Actions (Services)
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  
  // Admin Actions (Products)
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const BarbershopContext = createContext<BarbershopContextType | undefined>(undefined);

export const BarbershopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<Service | null>(null);

  const [services, setServices] = useState<Service[]>(initialServices);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const [staffUser, setStaffUser] = useState<StaffUser | null>(() => {
    const saved = localStorage.getItem('bb_staff');
    return saved ? JSON.parse(saved) : null;
  });
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bb_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (staffUser) {
      localStorage.setItem('bb_staff', JSON.stringify(staffUser));
    } else {
      localStorage.removeItem('bb_staff');
    }
  }, [staffUser]);

  const loginStaff = (username: string, pass: string): boolean => {
    if (username === 'admin' && pass === 'admin123') {
      const user: StaffUser = { username: 'admin', role: 'admin', name: 'Administrador' };
      setStaffUser(user);
      setActiveTab('admin');
      setIsStaffLoginOpen(false);
      return true;
    }

    const foundBarber = barbers.find(b => b.nickname.toLowerCase() === username.toLowerCase() || b.name.toLowerCase().includes(username.toLowerCase()));
    if (foundBarber && (pass === '123' || pass === 'barber123')) {
      const user: StaffUser = { username, role: 'barber', name: foundBarber.name, barberId: foundBarber.id };
      setStaffUser(user);
      setActiveTab('barber');
      setIsStaffLoginOpen(false);
      return true;
    }

    return false;
  };

  const logoutStaff = () => {
    setStaffUser(null);
    setActiveTab('home');
  };

  // Fetch initial data from backend (Supabase connected)
  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, productsRes, barbersRes, appointmentsRes] = await Promise.all([
          api.getServices().catch(() => initialServices),
          api.getProducts().catch(() => initialProducts),
          api.getBarbers().catch(() => initialBarbers),
          api.getAppointments().catch(() => initialAppointments),
        ]);
        setServices(servicesRes);
        setProducts(productsRes);
        setBarbers(barbersRes);
        setAppointments(appointmentsRes);
      } catch (err) {
        console.warn('Backend offline, using fallback mock data', err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('bb_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  // Booking Handlers
  const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newApt = await api.createAppointment(appointmentData);
      setAppointments(prev => [newApt, ...prev]);
    } catch (error: any) {
      throw error; // Propagate conflict error (409) to UI
    }
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      const updated = await api.updateAppointmentStatus(id, status);
      setAppointments(prev => prev.map(apt => apt.id === id ? updated : apt));
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  // Service CRUD
  const addService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      const newService = await api.createService(serviceData);
      setServices(prev => [...prev, newService]);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const updateService = async (updatedService: Service) => {
    try {
      const updated = await api.updateService(updatedService.id, updatedService);
      setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await api.deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Product CRUD
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const newProduct = await api.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const updated = await api.updateProduct(updatedProduct.id, updatedProduct);
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <BarbershopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        services,
        products,
        barbers,
        appointments,
        cart,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        staffUser,
        isStaffLoginOpen,
        setIsStaffLoginOpen,
        loginStaff,
        logoutStaff,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createAppointment,
        updateAppointmentStatus,
        addService,
        updateService,
        deleteService,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </BarbershopContext.Provider>
  );
};

export const useBarbershop = () => {
  const context = useContext(BarbershopContext);
  if (!context) {
    throw new Error('useBarbershop must be used within a BarbershopProvider');
  }
  return context;
};
