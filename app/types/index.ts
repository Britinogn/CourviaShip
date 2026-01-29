// import Country  from "../utils/countries";
import type { Country } from '@/utils/countries'


// Enums for better type safety
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
  _id: string ;
  username: string;
  email: string;
  password: string;
}

export interface IPerson extends IAddress{
  name: string;
  email: string;
  phoneNumber: string;
  companyName?: string;          
  alternatePhone?: string;
}

// Address for person (origin/destination)
export interface IAddress {
  address: string;
  city: string;
  country: Country;
  zipCode?: string;
}

// Package information
export interface IPackage {
  weightKg: number;          // in kg
  dimensions: string;      // e.g., "30x20x15 cm"
  description: string;
  declaredValue?: number;       // in sender's currency
  quantity?: number;               // ← added: useful for multiple identical items
  isFragile?: boolean;
  requiresSignature?: boolean;
}

// Shipment interface
export interface IShipment {
  _id?: string ;
  trackingId: string ;
  
  sender: IPerson;
  receiver: IPerson;

  package: IPackage;

  origin: IAddress;         // pickup location
  destination: IAddress;    // delivery location    

  status: ShipmentStatus;      

  registeredAt: Date; 
  estimatedDelivery: Date;

  currentLocation?: ITrackingLocation;
}

// Tracking shipment interface
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
  _id?: string ;
  trackingId: string;
  type: NotificationType;
  recipient: string;       // email or phone
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
        token: string
        refreshToken: string
        user: {
            email: string
            username?: string
        }
    }
    message: string
    status: boolean
}
export interface IShipmentResponse {
    message: string
    shipment : IShipment
    receiptPdf?: string;
}

// Dashboard Types
export interface StatusCount {
    _id: string
    count: number
}

export interface CountryCount {
    _id: string
    count: number
}

export interface TimePeriodCount {
    _id: string
    count: number
}

export interface Route {
    route: string
    count: number
}

export interface DashboardOverview {
    totalShipments: number
    statusBreakdown: StatusCount[]
    recentShipments: IShipment[]
    shipmentsByCountry: CountryCount[]
    shipmentsByTimePeriod: TimePeriodCount[]
    popularRoutes: Route[]
}

// export interface DashboardOverview {
//   totalShipments: number
//   shipmentsByStatus: StatusCount[]
//   recentShipments: IShipment[]
//   topOrigins: CountryCount[]
//   topDestinations: CountryCount[]
//   timePeriod: TimePeriodCount
//   popularRoutes: Route[]
// }


//toast notifications

export interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
}
