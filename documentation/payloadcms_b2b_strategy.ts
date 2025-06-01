// PayloadCMS B2B Wholesale Marketplace Configuration Strategy
// Businesses (Suppliers/Manufacturers) sell wholesale to Retailers

// 1. USER ROLES CONFIGURATION
export const userRoles = {
  // Super admin for platform management
  'super-admin': {
    permissions: ['*'], // Full access
    description: 'Platform administrators'
  },
  
  // Business (Supplier/Manufacturer) roles
  'business-admin': {
    permissions: [
      'products:create',
      'products:read',
      'products:update', 
      'products:delete',
      'orders:read',
      'orders:update',
      'inventory:manage',
      'business-profile:manage',
      'pricing:manage',
      'business-users:create',
      'business-users:read',
      'business-users:update',
      'business-users:delete'
    ],
    description: 'Main business/supplier account owners'
  },
  
  'business-manager': {
    permissions: [
      'products:read',
      'products:update',
      'orders:read',
      'orders:update',
      'inventory:manage',
      'pricing:read'
    ],
    description: 'Business employees with management access'
  },
  
  'business-staff': {
    permissions: [
      'products:read',
      'orders:read',
      'inventory:read'
    ],
    description: 'Basic business staff access'
  },
  
  // Retailer (Purchaser) roles
  'retailer-admin': {
    permissions: [
      'orders:create',
      'orders:read',
      'orders:update',
      'retailer-users:create',
      'retailer-users:read',
      'retailer-users:update',
      'retailer-users:delete',
      'retailer-profile:manage',
      'purchasing-limits:manage'
    ],
    description: 'Main retailer account owners'
  },
  
  'retailer-manager': {
    permissions: [
      'orders:create',
      'orders:read',
      'retailer-users:read',
      'purchasing-limits:read'
    ],
    description: 'Retailer managers with purchasing authority'
  },
  
  'retailer-employee': {
    permissions: [
      'orders:create',
      'orders:read'
    ],
    description: 'Retailer employees who can make purchases'
  }
};

// 2. USERS COLLECTION
export const UsersCollection = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Business Admin', value: 'business-admin' },
        { label: 'Business Manager', value: 'business-manager' },
        { label: 'Business Staff', value: 'business-staff' },
        { label: 'Retailer Admin', value: 'retailer-admin' },
        { label: 'Retailer Manager', value: 'retailer-manager' },
        { label: 'Retailer Employee', value: 'retailer-employee' },
      ],
      required: true,
    },
    {
      name: 'accountType',
      type: 'select',
      options: [
        { label: 'Business/Supplier', value: 'business' },
        { label: 'Retailer', value: 'retailer' },
        { label: 'Platform Admin', value: 'admin' },
      ],
      required: true,
    },
    {
      name: 'parentAccount',
      type: 'relationship',
      relationTo: ['business-accounts', 'retailer-accounts'],
      required: true,
      admin: {
        condition: (data) => data.accountType !== 'admin',
      },
    },
    {
      name: 'parentUser',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        condition: (data) => ['retailer-manager', 'retailer-employee', 'business-manager', 'business-staff'].includes(data.role),
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
};

// 3. BUSINESS ACCOUNTS COLLECTION (Suppliers/Manufacturers)
export const BusinessAccountsCollection = {
  slug: 'business-accounts',
  admin: {
    useAsTitle: 'businessName',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      if (user.accountType === 'business') {
        return { id: { equals: user.parentAccount } };
      }
      // Retailers can read business info to see supplier details
      if (user.accountType === 'retailer') return true;
      return false;
    },
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'businessType',
      type: 'select',
      options: [
        { label: 'Manufacturer', value: 'manufacturer' },
        { label: 'Distributor', value: 'distributor' },
        { label: 'Wholesaler', value: 'wholesaler' },
        { label: 'Import/Export', value: 'import_export' },
      ],
      required: true,
    },
    {
      name: 'businessRegistrationNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'taxId',
      type: 'text',
      required: true,
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'website', type: 'text' },
        { name: 'salesContactName', type: 'text' },
        { name: 'salesContactPhone', type: 'text' },
        { name: 'salesContactEmail', type: 'email' },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
      ],
    },
    {
      name: 'warehouseLocations',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'isPrimary', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'productCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'businessTerms',
      type: 'group',
      fields: [
        { name: 'minimumOrderValue', type: 'number', min: 0 },
        { name: 'paymentTerms', type: 'number', min: 0 }, // Net days
        { name: 'shippingPolicy', type: 'richText' },
        { name: 'returnPolicy', type: 'richText' },
        { name: 'leadTime', type: 'number', min: 0 }, // Days
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'issuedBy', type: 'text' },
        { name: 'expiryDate', type: 'date' },
        { name: 'certificate', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'verificationStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Verified', value: 'verified' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      defaultValue: () => new Date(),
    },
  ],
};

// 4. RETAILER ACCOUNTS COLLECTION (Purchasers)
export const RetailerAccountsCollection = {
  slug: 'retailer-accounts',
  admin: {
    useAsTitle: 'businessName',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      if (user.accountType === 'retailer') {
        return { id: { equals: user.parentAccount } };
      }
      // Businesses can read retailer info for order processing
      if (user.accountType === 'business') return true;
      return false;
    },
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'retailType',
      type: 'select',
      options: [
        { label: 'Online Store', value: 'online' },
        { label: 'Physical Store', value: 'physical' },
        { label: 'Both Online & Physical', value: 'hybrid' },
        { label: 'Marketplace Seller', value: 'marketplace' },
        { label: 'Reseller', value: 'reseller' },
      ],
      required: true,
    },
    {
      name: 'businessRegistrationNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'taxId',
      type: 'text',
      required: true,
    },
    {
      name: 'resellersLicense',
      type: 'text',
      required: true,
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'website', type: 'text' },
      ],
    },
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
      ],
    },
    {
      name: 'shippingAddresses',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'isDefault', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'storeLocations',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'purchasingLimits',
      type: 'group',
      fields: [
        { name: 'monthlyLimit', type: 'number', min: 0 },
        { name: 'perOrderLimit', type: 'number', min: 0 },
        { name: 'employeeMonthlyLimit', type: 'number', min: 0 },
        { name: 'employeePerOrderLimit', type: 'number', min: 0 },
      ],
    },
    {
      name: 'paymentMethods',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Credit Card', value: 'credit_card' },
            { label: 'Bank Transfer', value: 'bank_transfer' },
            { label: 'Net Terms', value: 'net_terms' },
            { label: 'Check', value: 'check' },
          ],
          required: true,
        },
        { name: 'details', type: 'json' }, // Store encrypted payment details
        { name: 'isDefault', type: 'checkbox', defaultValue: false },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'creditTerms',
      type: 'group',
      fields: [
        { name: 'creditLimit', type: 'number', min: 0 },
        { name: 'paymentTerms', type: 'number', min: 0 }, // Days
        { name: 'isApproved', type: 'checkbox', defaultValue: false },
        { name: 'creditScore', type: 'number', min: 0, max: 850 },
      ],
    },
    {
      name: 'businessReferences',
      type: 'array',
      fields: [
        { name: 'companyName', type: 'text', required: true },
        { name: 'contactName', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'relationship', type: 'text' },
      ],
    },
    {
      name: 'verificationStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Verified', value: 'verified' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

// 5. PRODUCTS COLLECTION
export const ProductsCollection = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({ req: { user } }) => user.accountType === 'business',
    read: () => true, // All can read products
    update: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      return { 'supplier.id': { equals: user.parentAccount } };
    },
    delete: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      return { 'supplier.id': { equals: user.parentAccount } };
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'supplier',
      type: 'relationship',
      relationTo: 'business-accounts',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'brand',
      type: 'text',
    },
    {
      name: 'model',
      type: 'text',
    },
    {
      name: 'wholesalePricing',
      type: 'group',
      fields: [
        { name: 'baseWholesalePrice', type: 'number', required: true, min: 0 },
        { name: 'msrp', type: 'number', min: 0 }, // Manufacturer's Suggested Retail Price
        { name: 'currency', type: 'text', defaultValue: 'USD' },
        {
          name: 'volumePricing',
          type: 'array',
          fields: [
            { name: 'minQuantity', type: 'number', required: true, min: 1 },
            { name: 'wholesalePrice', type: 'number', required: true, min: 0 },
            { name: 'discount', type: 'number', min: 0 }, // Percentage discount
          ],
        },
      ],
    },
    {
      name: 'inventory',
      type: 'group',
      fields: [
        { name: 'quantityAvailable', type: 'number', required: true, min: 0 },
        { name: 'minimumOrderQuantity', type: 'number', defaultValue: 1, min: 1 },
        { name: 'packSize', type: 'number', defaultValue: 1, min: 1 }, // Products per case/pack
        { name: 'lowStockThreshold', type: 'number', defaultValue: 10 },
        { name: 'restockDate', type: 'date' },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      fields: [
        { name: 'weight', type: 'number', min: 0 },
        { name: 'weightUnit', type: 'select', options: [
          { label: 'lbs', value: 'lbs' },
          { label: 'kg', value: 'kg' },
        ], defaultValue: 'lbs' },
        { name: 'dimensions', type: 'group', fields: [
          { name: 'length', type: 'number', min: 0 },
          { name: 'width', type: 'number', min: 0 },
          { name: 'height', type: 'number', min: 0 },
          { name: 'unit', type: 'select', options: [
            { label: 'inches', value: 'in' },
            { label: 'cm', value: 'cm' },
          ], defaultValue: 'in' },
        ]},
        { name: 'shippingClass', type: 'text' },
        { name: 'dropshipAvailable', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'alt', type: 'text' },
        { name: 'isPrimary', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'compliance',
      type: 'group',
      fields: [
        { name: 'upc', type: 'text' },
        { name: 'countryOfOrigin', type: 'text' },
        { name: 'hsCode', type: 'text' }, // Harmonized System Code
        { name: 'certifications', type: 'array', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'number', type: 'text' },
        ]},
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'launchDate',
      type: 'date',
    },
    {
      name: 'discontinueDate',
      type: 'date',
    },
  ],
};

// 6. ORDERS COLLECTION
export const OrdersCollection = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  access: {
    create: ({ req: { user } }) => user.accountType === 'retailer',
    read: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      if (user.accountType === 'retailer') {
        return { retailerAccount: { equals: user.parentAccount } };
      }
      if (user.accountType === 'business') {
        return { 'items.product.supplier': { equals: user.parentAccount } };
      }
      return false;
    },
    update: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      // Retailers can update certain fields, businesses can update order status
      return false; // Implement specific logic in hooks
    },
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'retailerAccount',
      type: 'relationship',
      relationTo: 'retailer-accounts',
      required: true,
    },
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        { name: 'quantity', type: 'number', required: true, min: 1 },
        { name: 'unitWholesalePrice', type: 'number', required: true, min: 0 },
        { name: 'totalPrice', type: 'number', required: true, min: 0 },
        { name: 'sku', type: 'text', required: true },
        { name: 'expectedDeliveryDate', type: 'date' },
      ],
    },
    {
      name: 'totals',
      type: 'group',
      fields: [
        { name: 'subtotal', type: 'number', required: true, min: 0 },
        { name: 'tax', type: 'number', defaultValue: 0, min: 0 },
        { name: 'shipping', type: 'number', defaultValue: 0, min: 0 },
        { name: 'discount', type: 'number', defaultValue: 0, min: 0 },
        { name: 'total', type: 'number', required: true, min: 0 },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zipCode', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'specialInstructions', type: 'textarea' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Returned', value: 'returned' },
        { label: 'Backordered', value: 'backordered' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Partial', value: 'partial' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Net Terms', value: 'net_terms' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentTerms',
      type: 'select',
      options: [
        { label: 'Net 15', value: 'net_15' },
        { label: 'Net 30', value: 'net_30' },
        { label: 'Net 60', value: 'net_60' },
        { label: 'Due on Receipt', value: 'due_on_receipt' },
        { label: 'COD', value: 'cod' },
      ],
    },
    {
      name: 'purchaseOrderNumber',
      type: 'text',
    },
    {
      name: 'invoiceNumber',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'trackingNumbers',
      type: 'array',
      fields: [
        { name: 'carrier', type: 'text', required: true },
        { name: 'trackingNumber', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        condition: (data, siblingData, { user }) => user.accountType === 'business',
      },
    },
    {
      name: 'statusHistory',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        { name: 'status', type: 'text', required: true },
        { name: 'timestamp', type: 'date', required: true },
        { name: 'updatedBy', type: 'relationship', relationTo: 'users' },
        { name: 'notes', type: 'text' },
      ],
    },
    {
      name: 'expectedShipDate',
      type: 'date',
    },
    {
      name: 'actualShipDate',
      type: 'date',
    },
  ],
};

// 7. ACCESS CONTROL CONFIGURATION
export const accessControl = {
  // Role-based access control
  users: {
    create: ({ req: { user } }) => {
      // Only admins and account owners can create users
      return ['super-admin', 'business-admin', 'retailer-admin'].includes(user.role);
    },
    read: ({ req: { user } }) => {
      if (user.role === 'super-admin') return true;
      // Users can only see users from their own account
      return { parentAccount: { equals: user.parentAccount } };
    },
    update: ({ req: { user } }) => {
      if (['super-admin', 'business-admin', 'retailer-admin'].includes(user.role)) return true;
      // Users can only update their own profile
      return { id: { equals: user.id } };
    },
    delete: ({ req: { user } }) => {
      return ['super-admin', 'business-admin', 'retailer-admin'].includes(user.role);
    },
  },
  
  // Field-level access control
  fieldAccess: {
    users: {
      role: ({ req: { user } }) => ['super-admin', 'business-admin', 'retailer-admin'].includes(user.role),
      parentAccount: ({ req: { user } }) => user.role === 'super-admin',
    },
    orders: {
      internalNotes: ({ req: { user } }) => user.accountType === 'business',
    },
  },
};

// 8. HOOKS FOR BUSINESS LOGIC
export const hooks = {
  beforeChange: [
    // Auto-generate order numbers
    ({ req, operation, data }) => {
      if (operation === 'create' && req.collection?.config?.slug === 'orders') {
        data.orderNumber = `WS-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      }
      return data;
    },
    
    // Validate purchasing limits
    async ({ req, operation, data }) => {
      if (operation === 'create' && req.collection?.config?.slug === 'orders') {
        const retailerAccount = await req.payload.findByID({
          collection: 'retailer-accounts',
          id: data.retailerAccount,
        });
        
        const orderTotal = data.totals.total;
        const perOrderLimit = retailerAccount.purchasingLimits?.perOrderLimit;
        
        if (perOrderLimit && orderTotal > perOrderLimit) {
          throw new Error(`Order total exceeds per-order limit of ${perOrderLimit}`);
        }
        
        // Check minimum order requirements per supplier
        const supplierGroups = {};
        for (const item of data.items) {
          const product = await req.payload.findByID({
            collection: 'products',
            id: item.product,
          });
          const supplierId = product.supplier;
          
          if (!supplierGroups[supplierId]) {
            supplierGroups[supplierId] = { total: 0, items: [] };
          }
          supplierGroups[supplierId].total += item.totalPrice;
          supplierGroups[supplierId].items.push(item);
        }
        
        // Validate minimum order values per supplier
        for (const [supplierId, group] of Object.entries(supplierGroups)) {
          const supplier = await req.payload.findByID({
            collection: 'business-accounts',
            id: supplierId,
          });
          const minOrderValue = supplier.businessTerms?.minimumOrderValue;
          
          if (minOrderValue && group.total < minOrderValue) {
            throw new Error(`Order total for ${supplier.businessName} is below minimum order value of ${minOrderValue}`);
          }
        }
      }
      return data;
    },
    
    // Auto-calculate wholesale pricing based on volume
    async ({ req, operation, data }) => {
      if (operation === 'create' && req.collection?.config?.slug === 'orders') {
        for (let i = 0; i < data.items.length; i++) {
          const item = data.items[i];
          const product = await req.payload.findByID({
            collection: 'products',
            id: item.product,
          });
          
          let unitPrice = product.wholesalePricing.baseWholesalePrice;
          
          // Apply volume pricing if available
          if (product.wholesalePricing.volumePricing?.length > 0) {
            const volumePrices = product.wholesalePricing.volumePricing
              .sort((a, b) => b.minQuantity - a.minQuantity); // Sort descending
            
            for (const tier of volumePrices) {
              if (item.quantity >= tier.minQuantity) {
                unitPrice = tier.wholesalePrice;
                break;
              }
            }
          }
          
          data.items[i].unitWholesalePrice = unitPrice;
          data.items[i].totalPrice = unitPrice * item.quantity;
        }
        
        // Recalculate totals
        data.totals.subtotal = data.items.reduce((sum, item) => sum + item.totalPrice, 0);
        data.totals.total = data.totals.subtotal + data.totals.tax + data.totals.shipping - data.totals.discount;
      }
      return data;
    },
  ],
  
  afterChange: [
    // Update order status history
    ({ req, operation, doc, previousDoc }) => {
      if (req.collection?.config?.slug === 'orders' && operation === 'update') {
        if (doc.status !== previousDoc.status) {
          doc.statusHistory = doc.statusHistory || [];
          doc.statusHistory.push({
            status: doc.status,
            timestamp: new Date(),
            updatedBy: req.user.id,
          });
        }
      }
    },
    
    // Update inventory when order is confirmed
    async ({ req, operation, doc, previousDoc }) => {
      if (req.collection?.config?.slug === 'orders' && operation === 'update') {
        if (doc.status === 'confirmed' && previousDoc.status !== 'confirmed') {
          // Reduce inventory for each product
          for (const item of doc.items) {
            await req.payload.update({
              collection: 'products',
              id: item.product,
              data: {
                'inventory.quantityAvailable': {
                  $inc: -item.quantity
                }
              }
            });
          }
        }
        
        // Restore inventory if order is cancelled
        if (doc.status === 'cancelled' && previousDoc.status === 'confirmed') {
          for (const item of doc.items) {
            await req.payload.update({
              collection: 'products',
              id: item.product,
              data: {
                'inventory.quantityAvailable': {
                  $inc: item.quantity
                }
              }
            });
          }
        }
      }
    },
    
    // Generate invoice number when order is confirmed
    ({ req, operation, doc, previousDoc }) => {
      if (req.collection?.config?.slug === 'orders' && operation === 'update') {
        if (doc.status === 'confirmed' && !doc.invoiceNumber) {
          doc.invoiceNumber = `INV-${doc.orderNumber}`;
        }
      }
    },
  ],
};

// 9. API ENDPOINTS FOR BUSINESS LOGIC
export const customEndpoints = [
  {
    path: '/retailer-users/:retailerId',
    method: 'get',
    handler: async (req, res) => {
      // Get all users for a retailer account
      const users = await req.payload.find({
        collection: 'users',
        where: {
          parentAccount: { equals: req.params.retailerId },
        },
      });
      res.json(users);
    },
  },
  
  {
    path: '/business-users/:businessId',
    method: 'get',
    handler: async (req, res) => {
      // Get all users for a business account
      const users = await req.payload.find({
        collection: 'users',
        where: {
          parentAccount: { equals: req.params.businessId },
        },
      });
      res.json(users);
    },
  },
  
  {
    path: '/wholesale-catalog/:businessId',
    method: 'get',
    handler: async (req, res) => {
      // Get all products from a specific supplier
      const products = await req.payload.find({
        collection: 'products',
        where: {
          supplier: { equals: req.params.businessId },
          isActive: { equals: true },
          isPublished: { equals: true },
        },
      });
      res.json(products);
    },
  },
  
  {
    path: '/purchasing-analytics/:retailerId',
    method: 'get',
    handler: async (req, res) => {
      // Get purchasing analytics for a retailer
      const { startDate, endDate } = req.query;
      
      const orders = await req.payload.find({
        collection: 'orders',
        where: {
          retailerAccount: { equals: req.params.retailerId },
          createdAt: {
            greater_than_equal: startDate,
            less_than_equal: endDate,
          },
        },
      });
      
      const analytics = {
        totalOrders: orders.docs.length,
        totalSpent: orders.docs.reduce((sum, order) => sum + order.totals.total, 0),
        averageOrderValue: orders.docs.length > 0 ? 
          orders.docs.reduce((sum, order) => sum + order.totals.total, 0) / orders.docs.length : 0,
        topSuppliers: {}, // Calculate top suppliers by order volume
        ordersByStatus: {}, // Group orders by status
      };
      
      res.json(analytics);
    },
  },
  
  {
    path: '/sales-analytics/:businessId',
    method: 'get',
    handler: async (req, res) => {
      // Get sales analytics for a business/supplier
      const { startDate, endDate } = req.query;
      
      const orders = await req.payload.find({
        collection: 'orders',
        where: {
          'items.product.supplier': { equals: req.params.businessId },
          createdAt: {
            greater_than_equal: startDate,
            less_than_equal: endDate,
          },
        },
      });
      
      const analytics = {
        totalOrders: orders.docs.length,
        totalRevenue: 0, // Calculate from items where supplier matches
        topProducts: {}, // Most ordered products
        topRetailers: {}, // Best customers
        ordersByStatus: {},
      };
      
      res.json(analytics);
    },
  },
  
  {
    path: '/inventory-alerts/:businessId',
    method: 'get',
    handler: async (req, res) => {
      // Get low stock alerts for a supplier
      const products = await req.payload.find({
        collection: 'products',
        where: {
          supplier: { equals: req.params.businessId },
          $expr: {
            $lte: ['$inventory.quantityAvailable', '$inventory.lowStockThreshold']
          },
        },
      });
      
      res.json({
        lowStockProducts: products.docs,
        alertCount: products.docs.length,
      });
    },
  },
  
  {
    path: '/product-pricing/:productId',
    method: 'post',
    handler: async (req, res) => {
      // Calculate pricing for a specific quantity
      const { quantity } = req.body;
      
      const product = await req.payload.findByID({
        collection: 'products',
        id: req.params.productId,
      });
      
      let unitPrice = product.wholesalePricing.baseWholesalePrice;
      let discount = 0;
      
      if (product.wholesalePricing.volumePricing?.length > 0) {
        const volumePrices = product.wholesalePricing.volumePricing
          .sort((a, b) => b.minQuantity - a.minQuantity);
        
        for (const tier of volumePrices) {
          if (quantity >= tier.minQuantity) {
            unitPrice = tier.wholesalePrice;
            discount = tier.discount || 0;
            break;
          }
        }
      }
      
      res.json({
        productId: req.params.productId,
        quantity,
        unitPrice,
        totalPrice: unitPrice * quantity,
        discount,
        tier: volumePrices?.find(tier => quantity >= tier.minQuantity),
      });
    },
  },
];

// 10. ADDITIONAL COLLECTIONS FOR SUPPORTING FUNCTIONALITY

// Categories Collection
export const CategoriesCollection = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

// Media Collection
export const MediaCollection = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
      },
      {
        name: 'card',
        width: 600,
        height: 400,
      },
      {
        name: 'hero',
        width: 1200,
        height: 600,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};

// Usage Notes and Implementation Strategy:
/*
1. ACCOUNT VERIFICATION WORKFLOW:
   - Implement email verification for new registrations
   - Require business license/reseller permit verification for retailers
   - Manual approval process for high-value accounts

2. PRICING STRATEGY:
   - Support for contract pricing (special rates for specific retailers)
   - Dynamic pricing based on retailer tier/volume history
   - Seasonal pricing adjustments

3. INVENTORY MANAGEMENT:
   - Real-time inventory tracking with webhooks
   - Backorder management with estimated restock dates
   - Multi-warehouse support for suppliers

4. ORDER PROCESSING:
   - Automated order routing to suppliers
   - Split orders when items come from multiple suppliers
   - Integration with shipping carriers for tracking

5. PAYMENT PROCESSING:
   - Support for net terms with automatic invoice generation
   - Integration with payment processors (Stripe, PayPal)
   - Credit limit monitoring and enforcement

6. COMMUNICATION:
   - Automated email notifications for order status changes
   - Internal messaging system between retailers and suppliers
   - Bulk communication tools for suppliers

7. REPORTING & ANALYTICS:
   - Sales performance dashboards for suppliers
   - Purchasing analytics for retailers
   - Platform-wide metrics for administrators

8. MOBILE OPTIMIZATION:
   - Responsive design for mobile ordering
   - Native mobile app considerations
   - Offline order capability for trade shows

9. INTEGRATION CAPABILITIES:
   - ERP system integration for suppliers
   - POS system integration for retailers
   - Accounting software integration (QuickBooks, etc.)

10. SECURITY & COMPLIANCE:
    - PCI DSS compliance for payment processing
    - GDPR compliance for data protection
    - Role-based access with audit trails
*/