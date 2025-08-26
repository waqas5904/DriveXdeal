export interface Customer {
  id: number;
  name: string;
  number: string;
  carsPurchased: string;
  lastPurchaseDate: string;
  totalSpend: number;
  remainingBalance: number;
  status: string;
  email?: string;
  address?: string;
  cnic?: string;
  joinDate?: string;
}

export const customersData: Customer[] = [
  {
    id: 1,
    name: "Romail Ahmed",
    number: "03352429304",
    email: "romail.ahmed@email.com",
    carsPurchased: "Tesla Model S",
    lastPurchaseDate: "2025-07-10",
    totalSpend: 30000000,
    remainingBalance: 5000,
    status: "Pending",
    address: "House #123, Street 5, Gulberg III, Lahore",
    cnic: "35202-1234567-8",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Svetlana Petrova",
    number: "03352429305",
    email: "svetlana.petrova@email.com",
    carsPurchased: "Ford Mustang",
    lastPurchaseDate: "2025-08-15",
    totalSpend: 28500000,
    remainingBalance: 0,
    status: "Completed",
    address: "Apartment 45, Block A, DHA Phase 6, Karachi",
    cnic: "35202-2345678-9",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Akira Tanaka",
    number: "03352429306",
    email: "akira.tanaka@email.com",
    carsPurchased: "BMW X5",
    lastPurchaseDate: "2025-09-20",
    totalSpend: 32000000,
    remainingBalance: 4500,
    status: "Pending",
    address: "Villa 12, Street 8, Clifton, Karachi",
    cnic: "35202-3456789-0",
    joinDate: "2024-03-10"
  },
  {
    id: 4,
    name: "Isabella Rodriguez",
    number: "03352429307",
    email: "isabella.rodriguez@email.com",
    carsPurchased: "Audi A6",
    lastPurchaseDate: "2025-10-05",
    totalSpend: 29000000,
    remainingBalance: 0,
    status: "Completed",
    address: "House #78, Street 12, F-8, Islamabad",
    cnic: "35202-4567890-1",
    joinDate: "2024-04-05"
  },
  {
    id: 5,
    name: "Liam O'Connor",
    number: "03352429308",
    email: "liam.oconnor@email.com",
    carsPurchased: "Mercedes-Benz S-Class",
    lastPurchaseDate: "2025-11-12",
    totalSpend: 35000000,
    remainingBalance: 7000,
    status: "Pending",
    address: "Apartment 23, Block C, Gulshan-e-Iqbal, Karachi",
    cnic: "35202-5678901-2",
    joinDate: "2024-05-12"
  },
  {
    id: 6,
    name: "Chloe Dubois",
    number: "03352429309",
    email: "chloe.dubois@email.com",
    carsPurchased: "Porsche 911",
    lastPurchaseDate: "2025-12-01",
    totalSpend: 45000000,
    remainingBalance: 0,
    status: "Completed",
    address: "Villa 5, Street 15, Defence Phase 5, Lahore",
    cnic: "35202-6789012-3",
    joinDate: "2024-06-18"
  },
  {
    id: 7,
    name: "Noah Johnson",
    number: "03352429310",
    email: "noah.johnson@email.com",
    carsPurchased: "Jaguar F-Pace",
    lastPurchaseDate: "2025-12-15",
    totalSpend: 38000000,
    remainingBalance: 8000,
    status: "Pending",
    address: "House #45, Street 9, E-11, Islamabad",
    cnic: "35202-7890123-4",
    joinDate: "2024-07-25"
  },
  {
    id: 8,
    name: "Mia Anderson",
    number: "03352429311",
    email: "mia.anderson@email.com",
    carsPurchased: "Volvo XC90",
    lastPurchaseDate: "2025-12-20",
    totalSpend: 28000000,
    remainingBalance: 0,
    status: "Completed",
    address: "Apartment 67, Block D, Gulberg II, Lahore",
    cnic: "35202-8901234-5",
    joinDate: "2024-08-30"
  },
  {
    id: 9,
    name: "Oliver Schmidt",
    number: "03352429312",
    email: "oliver.schmidt@email.com",
    carsPurchased: "Land Rover Range Rover",
    lastPurchaseDate: "2025-12-25",
    totalSpend: 42000000,
    remainingBalance: 12000,
    status: "Pending",
    address: "Villa 8, Street 20, DHA Phase 8, Karachi",
    cnic: "35202-9012345-6",
    joinDate: "2024-09-14"
  },
  {
    id: 10,
    name: "Sophia Chen",
    number: "03352429313",
    email: "sophia.chen@email.com",
    carsPurchased: "Nissan GT-R",
    lastPurchaseDate: "2025-12-30",
    totalSpend: 25000000,
    remainingBalance: 0,
    status: "Completed",
    address: "House #90, Street 25, F-10, Islamabad",
    cnic: "35202-0123456-7",
    joinDate: "2024-10-08"
  },
  {
    id: 11,
    name: "Ethan Williams",
    number: "03352429314",
    email: "ethan.williams@email.com",
    carsPurchased: "Hyundai Genesis",
    lastPurchaseDate: "2026-01-05",
    totalSpend: 22000000,
    remainingBalance: 3000,
    status: "Pending",
    address: "Apartment 34, Block E, Gulshan-e-Maymar, Karachi",
    cnic: "35202-1234567-9",
    joinDate: "2024-11-22"
  },
  {
    id: 12,
    name: "Emma Thompson",
    number: "03352429315",
    email: "emma.thompson@email.com",
    carsPurchased: "Chevrolet Corvette",
    lastPurchaseDate: "2026-01-10",
    totalSpend: 26000000,
    remainingBalance: 0,
    status: "Completed",
    address: "Villa 15, Street 30, Defence Phase 6, Lahore",
    cnic: "35202-2345678-0",
    joinDate: "2024-12-03"
  },
  {
    id: 13,
    name: "Alexander Kim",
    number: "03352429316",
    email: "alexander.kim@email.com",
    carsPurchased: "Lexus LS",
    lastPurchaseDate: "2026-01-15",
    totalSpend: 31000000,
    remainingBalance: 6000,
    status: "Pending",
    address: "House #67, Street 18, E-7, Islamabad",
    cnic: "35202-3456789-1",
    joinDate: "2025-01-10"
  },
  {
    id: 14,
    name: "Zara Khan",
    number: "03352429317",
    email: "zara.khan@email.com",
    carsPurchased: "Toyota Land Cruiser",
    lastPurchaseDate: "2026-01-20",
    totalSpend: 48000000,
    remainingBalance: 0,
    status: "Completed",
    address: "Apartment 89, Block F, Gulberg IV, Lahore",
    cnic: "35202-4567890-2",
    joinDate: "2025-01-25"
  },
  {
    id: 15,
    name: "David Miller",
    number: "03352429318",
    email: "david.miller@email.com",
    carsPurchased: "Cadillac Escalade",
    lastPurchaseDate: "2026-01-25",
    totalSpend: 52000000,
    remainingBalance: 15000,
    status: "Pending",
    address: "Villa 22, Street 35, DHA Phase 9, Karachi",
    cnic: "35202-5678901-3",
    joinDate: "2025-02-05"
  }
];

// Helper functions for data manipulation
export const getCustomerById = (id: number): Customer | undefined => {
  return customersData.find(customer => customer.id === id);
};

export const getCustomersByStatus = (status: string): Customer[] => {
  return customersData.filter(customer => customer.status === status);
};

export const getCustomersByCarBrand = (brand: string): Customer[] => {
  return customersData.filter(customer => 
    customer.carsPurchased.toLowerCase().includes(brand.toLowerCase())
  );
};

export const getTotalRevenue = (): number => {
  return customersData.reduce((sum, customer) => sum + customer.totalSpend, 0);
};

export const getTotalOutstanding = (): number => {
  return customersData.reduce((sum, customer) => sum + customer.remainingBalance, 0);
};

export const getCustomerStats = () => {
  const totalCustomers = customersData.length;
  const completedCustomers = customersData.filter(c => c.status === "Completed").length;
  const pendingCustomers = customersData.filter(c => c.status === "Pending").length;
  const totalRevenue = getTotalRevenue();
  const totalOutstanding = getTotalOutstanding();

  return {
    totalCustomers,
    completedCustomers,
    pendingCustomers,
    totalRevenue,
    totalOutstanding
  };
};





