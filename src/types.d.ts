interface Product {
  id: string;
  name: string;
  price: number;
  storage: string;
  image?: string;
  display?: string;
  RepairServices?: RepairService[];
}

interface RepairService {
  id: string;
  name: string;
  price: number;
  description?: string;
  estimatedTime?: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedTime: string;
  Product?: {
    name: string;
  };
}

// Define the possible order statuses
type OrderStatus = "pending" | "paid";

// Type for individual order items (products)
interface OrderItem {
  id: string; // Unique ID for the order item
  productId: string; // ID of the associated product
  quantity: number; // Quantity of the product in the order
  product: {
    name: string; // Name of the product
    price: number; // Price of the product
  };
}

// Type for individual service items
interface OrderServicesItem {
  id: string; // Unique ID for the service item
  serviceId: string; // ID of the associated service
  quantity: number; // Quantity of the service in the order
  service: {
    name: string; // Name of the service
    price: number; // Price of the service
  };
}

// Full type for an Order
interface Order {
  id: string; // Unique order ID
  contactNumber: string; // Contact number for the order
  email: string | null; // Email for the order (optional)
  orderStatus: OrderStatus; // Status of the order
  price: number; // Total price of the order
  createdAt: string; // Order creation timestamp
  updatedAt: string; // Order update timestamp
  orderProducts: OrderItem[]; // List of products in the order
  OrderServicesItem: OrderServicesItem[]; // List of services in the order
}

// Props for the OrderPage component
interface OrderPageProps {
  order: Order; // Order data to display
}

interface DashboardProps {
  products: Product[];
  services: Service[];
  orders: Order[];
  totalOrdersLength: number;
  pendingOrders: number;
  paidOrders: number;
}
