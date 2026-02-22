import type { Country } from '@/utils/countries'

export enum ShipmentStatus {
  Registered = "Registered",
  PickedUp = "PickedUp",
  InTransit = "InTransit",
  EnRoute = "EnRoute",
  InCustoms = "InCustoms",
  AtHub = "AtHub",
  OutForDelivery = "OutForDelivery",
  Delivered = "Delivered",
  Delayed = "Delayed",
  Cancelled = "Cancelled",
  Exception = "Exception"
}

export enum NotificationType {
  Email = "email",
  Sms = "sms"
}

export enum NotificationStatus {
  Pending = "pending",
  Sent = "sent",
  Failed = "failed"
}

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
}

export interface IPerson extends IAddress {
  name: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  alternatePhone?: string;
}

export interface IAddress {
  address: string;
  city: string;
  country: Country;
  zipCode?: string;
}

export interface IPackage {
  weightKg: number;
  dimensions: string;
  description: string;
  declaredValue?: number;
  quantity?: number;
  isFragile?: boolean;
  requiresSignature?: boolean;
}

export interface IShipment {
  _id?: string;
  trackingId: string;
  sender: IPerson;
  receiver: IPerson;
  package: IPackage;
  origin: IAddress;
  destination: IAddress;
  status: ShipmentStatus;
  registeredAt: Date;
  estimatedDelivery: Date;
  createdAt?: string;       // ← added for dashboard table
  currentLocation?: ITrackingLocation;
}

export interface ITrackingShipment {
  trackingId: string;
  sender: Pick<IPerson, "name" | "city" | "address" | "country">;
  receiver: Pick<IPerson, "name" | "city" | "phoneNumber" | "country">;
  status: ShipmentStatus;
  destination: IAddress;
  country: Country;
  currentLocation?: ITrackingLocation;
  note?: string;
  registeredAt: Date;
  estimatedDelivery: Date;
}

export interface INotification {
  _id?: string;
  trackingId: string;
  type: NotificationType;
  recipient: string;
  message: string;
  sentAt: Date;
  status: NotificationStatus;
}

export interface ITrackingLocation {
  name?: string;
  address?: string;
  city: string;
  country: Country;
  zipCode?: string;
  contactName?: string;
  contactPhone?: string;
  arrivedAt?: Date;
  departedAt?: Date;
}

export interface AuthResponse {
  data: {
    token: string;
    refreshToken: string;
    user: {
      email: string;
      username: string;
    };
  };
  message: string;
  status: boolean;
}

export interface IShipmentResponse {
  message: string;
  shipment: IShipment;
  receiptPdf?: string;
}

// Dashboard Types
export interface StatusCount {
  status: string;   // ← was _id, matches backend { status, count }
  count: number;
}

export interface CountryCount {
  country: string;  // ← was _id, matches backend { country, count }
  count: number;
}

export interface TimePeriod {
  today: number;
  thisWeek: number;
  thisMonth: number;
  last30Days: number;
  last60Days: number;
  last6Months: number;
}

export interface Route {
  route: string;
  origin: string;
  destination: string;
  count: number;
}

// Single DashboardOverview matching backend response exactly
export interface DashboardOverview {
  totalShipments: number;
  shipmentsByStatus: StatusCount[];
  recentShipments: IShipment[];
  topOrigins: CountryCount[];
  topDestinations: CountryCount[];
  timePeriod: TimePeriod;
  popularRoutes: Route[];
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}