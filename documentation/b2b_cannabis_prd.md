# B2B Cannabis Marketplace - Project Requirements Document

## 1. Project Overview

### 1.1 Project Name

B2B Cannabis Marketplace Platform

### 1.2 Project Description

A business-to-business web application that enables licensed cannabis sellers from multiple states (initially Ohio, Florida, and Vermont) to sell their products to other licensed businesses. The platform provides dual functionality for users to operate as either buyers or sellers, with robust user management and invitation capabilities.

### 1.3 Project Objectives

- Create a compliant B2B cannabis marketplace platform
- Enable multi-state cannabis business transactions
- Provide intuitive buyer and seller interfaces
- Implement secure user management and invitation system
- Establish scalable foundation for future state expansion

### 1.4 Success Criteria

- Platform successfully processes B2B transactions across three initial states
- User registration and authentication system supports both buyer and seller roles
- Invitation system allows businesses to manage sub-users effectively
- Compliance with state-specific cannabis regulations
- Responsive design works across desktop and mobile devices

## 2. Technical Architecture

### 2.1 Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Database**: Neon with Drizzle
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Email Service**: Resend
- **File Storage**: AWS S3 or Vercel Blob
- **Deployment**: Vercel
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation

### 2.2 System Architecture

- Full-stack Next.js application with API routes
- Server-side rendering and client-side hydration
- Database-first approach with Prisma schema
- RESTful API design with Next.js API routes
- Middleware for authentication and authorization
- Edge functions for performance optimization

### 2.3 Database Design

- PostgreSQL for relational data integrity
- Prisma for type-safe database operations
- Connection pooling for scalability
- Database migrations and seeding scripts
- Backup and recovery procedures

## 3. Functional Requirements

### 3.1 User Management System

#### 3.1.1 User Registration

- Business registration with company details
- License verification system
- State-specific registration requirements
- Email verification process via Resend
- Admin approval workflow for new businesses

#### 3.1.2 User Authentication (NextAuth.js)

- Email/password authentication
- OAuth providers (Google, Microsoft) for business accounts
- Magic link authentication via Resend
- Password reset functionality
- Multi-factor authentication (MFA) support
- Session management with JWT tokens
- Secure cookie handling

#### 3.1.3 User Roles and Permissions

- **Super Admin**: Platform administration and oversight
- **Business Owner**: Primary account holder with full business access
- **Seller**: Can list and manage products, view orders
- **Buyer**: Can browse products, place orders, manage purchasing
- **Sub-User**: Invited users with limited permissions based on role assignment

#### 3.1.4 User Invitation System

- Business owners can invite team members via Resend emails
- Role-based invitation system
- Email invitation workflow with secure tokens
- Invitation acceptance and onboarding process
- Permission management for invited users
- Invitation expiration and resend functionality

### 3.2 Seller Functionality

#### 3.2.1 Product Management

**Native Product Management:**

- Add, edit, and delete product listings
- Product categorization (flower, edibles, concentrates, etc.)
- Product image upload and management via file storage
- Native inventory tracking and management
- Pricing management with bulk pricing options
- Product availability by state/region

**API Integration for Inventory Systems:**

- Connect existing inventory management systems via REST APIs
- Real-time product synchronization from external systems
- Automatic inventory updates and stock level management
- Support for multiple API authentication methods (API keys, OAuth, etc.)
- Custom field mapping between external systems and platform
- Bulk product import and update capabilities
- Webhook support for real-time inventory changes
- API rate limiting and error handling
- Fallback mechanisms for API downtime or failures

#### 3.2.2 Order Management

- View incoming orders
- Order status updates (pending, confirmed, shipped, delivered)
- Order fulfillment tracking
- Communication tools with buyers via Resend notifications
- Order history and analytics
- Automated email notifications for order updates

#### 3.2.3 Business Profile

- Company information management
- License information and documentation
- Contact details and business hours
- Shipping and delivery preferences
- Payment method setup
- API integration configuration and management
- External system connection status monitoring

#### 3.2.4 Integration Management

- API endpoint configuration interface
- Authentication credential management (encrypted storage)
- Data mapping and field customization tools
- Synchronization scheduling and frequency settings
- Integration health monitoring and alerts
- Error logging and troubleshooting tools
- Manual sync triggers and override capabilities
- Integration performance metrics and reporting

### 3.3 Buyer Functionality

#### 3.3.1 Product Discovery

- Browse products by category
- Advanced search and filtering
- Product comparison tools
- Seller ratings and reviews
- Favorites and wishlist functionality

#### 3.3.2 Ordering System

- Shopping cart functionality with session persistence
- Bulk ordering capabilities
- Order placement and confirmation
- Order tracking and status updates
- Recurring order setup
- Email notifications via Resend for order updates

#### 3.3.3 Account Management

- Purchase history and reordering
- Invoice and payment history
- Delivery address management
- Team member management (sub-users)
- Budget and spending controls

### 3.4 Geographic and Compliance Features

#### 3.4.1 Multi-State Support

- State-specific product availability
- Compliance with local regulations
- Tax calculation by jurisdiction
- Shipping restrictions and rules

#### 3.4.2 Compliance Management

- License verification and tracking
- Age verification systems
- Transaction logging for regulatory compliance
- Audit trail maintenance

### 3.5 Communication Features

- In-app messaging between buyers and sellers
- Order-related communication threads
- Email notification system via Resend
- Support ticket system
- Real-time notifications for critical updates

## 4. Non-Functional Requirements

### 4.1 Performance

- Page load times under 2 seconds
- API response times under 300ms
- Support for concurrent users (minimum 1000)
- Database query optimization with Prisma
- Edge caching and CDN integration

### 4.2 Security

- HTTPS encryption for all communications
- NextAuth.js secure session management
- API route protection and rate limiting
- Data encryption at rest and in transit
- SQL injection prevention via Prisma
- XSS and CSRF protection
- Regular security audits and updates
- GDPR and privacy compliance

### 4.3 Scalability

- Horizontal scaling with Vercel serverless functions
- Database connection pooling
- CDN integration for static assets
- Caching strategy with Redis (optional)
- Image optimization and lazy loading

### 4.4 Reliability

- 99.9% uptime availability
- Automated database backups
- Error boundary implementation
- Comprehensive error logging
- Health check endpoints
- Disaster recovery procedures

### 4.5 Usability

- Responsive design for all device types
- Intuitive user interface with Shadcn components
- Accessibility compliance (WCAG 2.1)
- Multi-browser compatibility
- Progressive Web App (PWA) capabilities

## 5. System Integrations

### 5.1 Payment Processing

- Integration with cannabis-friendly payment processors
- Support for ACH transfers
- Invoice generation and management
- Tax calculation services
- PCI compliance considerations

### 5.2 Shipping and Logistics

- Integration with shipping providers
- Track and trace functionality
- Delivery scheduling systems
- Compliance with cannabis shipping regulations

### 5.3 Third-Party Services

- **Resend**: Email delivery and templates
- SMS notification services (Twilio)
- Analytics and reporting tools (PostHog, Google Analytics)
- Customer support platforms (Intercom)
- File storage (AWS S3, Vercel Blob)

### 5.4 Seller API Integrations

- RESTful API connectivity for external inventory systems
- Support for common inventory management platforms (Canix, BioTrackTHC, METRC, etc.)
- Custom API integration capabilities
- Real-time data synchronization services
- API middleware for data transformation and validation
- Webhook processing for bidirectional communication
- API monitoring and health check services

## 6. Database Schema (Prisma)

### 6.1 Core Models

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  role          UserRole  @default(USER)
  businessId    String?
  business      Business? @relation(fields: [businessId], references: [id])
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Business {
  id              String    @id @default(cuid())
  name            String
  licenseNumber   String    @unique
  state           String
  address         String
  phone           String
  email           String
  status          BusinessStatus @default(PENDING)
  users           User[]
  products        Product[]
  orders          Order[]
  integrations    Integration[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Product {
  id            String    @id @default(cuid())
  name          String
  description   String?
  category      ProductCategory
  price         Decimal
  inventory     Int
  images        String[]
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id])
  states        String[]
  isActive      Boolean   @default(true)
  integrationId String?
  integration   Integration? @relation(fields: [integrationId], references: [id])
  externalId    String?
  lastSyncAt    DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Order {
  id          String      @id @default(cuid())
  orderNumber String      @unique
  buyerId     String
  buyer       Business    @relation("BuyerOrders", fields: [buyerId], references: [id])
  sellerId    String
  seller      Business    @relation("SellerOrders", fields: [sellerId], references: [id])
  items       OrderItem[]
  status      OrderStatus @default(PENDING)
  total       Decimal
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Integration {
  id            String    @id @default(cuid())
  name          String
  type          String
  endpoint      String
  credentials   Json      // Encrypted
  fieldMappings Json
  isActive      Boolean   @default(true)
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id])
  products      Product[]
  lastSyncAt    DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 6.2 Enums and Types

- UserRole: SUPER_ADMIN, BUSINESS_OWNER, SELLER, BUYER, SUB_USER
- BusinessStatus: PENDING, APPROVED, SUSPENDED, REJECTED
- ProductCategory: FLOWER, EDIBLES, CONCENTRATES, TOPICALS, ACCESSORIES
- OrderStatus: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED

## 7. API Design

### 7.1 Authentication Routes

- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### 7.2 Business Routes

- `GET /api/businesses` - List businesses (admin)
- `POST /api/businesses` - Create business
- `GET /api/businesses/[id]` - Get business details
- `PUT /api/businesses/[id]` - Update business
- `POST /api/businesses/[id]/invite` - Invite user to business

### 7.3 Product Routes

- `GET /api/products` - List products with filtering
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `POST /api/products/sync` - Sync from external API

### 7.4 Order Routes

- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status

### 7.5 Integration Routes

- `GET /api/integrations` - List integrations
- `POST /api/integrations` - Create integration
- `PUT /api/integrations/[id]` - Update integration
- `POST /api/integrations/[id]/sync` - Manual sync
- `GET /api/integrations/[id]/health` - Health check

## 8. Email Templates (Resend)

### 8.1 Authentication Emails

- Welcome email for new users
- Email verification templates
- Password reset emails
- Magic link authentication

### 8.2 Business Emails

- Business approval/rejection notifications
- User invitation emails
- Role change notifications

### 8.3 Transaction Emails

- Order confirmation emails
- Order status update notifications
- Invoice and receipt emails
- Payment confirmation emails

### 8.4 System Emails

- Integration status alerts
- System maintenance notifications
- Security alerts

## 9. User Interface Requirements

### 9.1 Design System

- Shadcn/ui component library
- Tailwind CSS utility classes
- Consistent color palette and typography
- Responsive design patterns
- Dark/light mode support

### 9.2 Key Pages

#### Authentication Pages

- Sign in/sign up forms
- Email verification page
- Password reset flow
- Multi-factor authentication setup

#### Dashboard Pages

- Role-specific dashboards
- Analytics and reporting widgets
- Quick action buttons
- Recent activity feeds

#### Product Management

- Product listing with filters
- Product creation/editing forms
- Bulk import interface
- Integration management panel

#### Order Management

- Order listing and details
- Status tracking interface
- Communication threads
- Invoice generation

## 10. Development Phases

### Phase 1: Foundation (Weeks 1-4)

- Next.js project setup with App Router
- Database schema design and Prisma setup
- NextAuth.js authentication implementation
- Basic UI components with Shadcn
- Resend email service integration

### Phase 2: Core Functionality (Weeks 5-8)

- User registration and management
- Business management system
- Product management (native functionality)
- Basic ordering functionality
- State-specific compliance features

### Phase 3: API Integration Framework (Weeks 9-12)

- External API integration infrastructure
- Data synchronization engine
- Integration management interface
- Webhook handling system
- Error handling and monitoring

### Phase 4: Advanced Features (Weeks 13-16)

- User invitation system
- Advanced search and filtering
- Communication system
- Payment integration
- Real-time notifications

### Phase 5: Testing and Deployment (Weeks 17-20)

- Comprehensive testing suite
- Security audits
- Performance optimization
- Production deployment
- Monitoring and alerting setup

## 11. Security Considerations

### 11.1 Authentication Security

- NextAuth.js built-in security features
- Secure session management
- CSRF protection
- Rate limiting on auth endpoints

### 11.2 API Security

- API route protection middleware
- Input validation with Zod
- SQL injection prevention via Prisma
- API rate limiting
- Request/response logging

### 11.3 Data Security

- Environment variable management
- Encrypted sensitive data storage
- Secure file upload handling
- Regular security updates

## 12. Testing Strategy

### 12.1 Testing Framework

- Jest for unit testing
- React Testing Library for component testing
- Playwright for e2e testing
- Prisma testing utilities for database tests

### 12.2 Test Coverage

- Authentication flows
- API endpoints
- Database operations
- Integration synchronization
- Email delivery
- User interface interactions

## 13. Deployment and DevOps

### 13.1 Deployment Strategy

- Vercel for hosting and deployment
- Environment-specific configurations
- Database migrations on deployment
- Zero-downtime deployment procedures

### 13.2 Monitoring and Observability

- Application performance monitoring
- Error tracking and alerting
- Database performance monitoring
- Email delivery tracking
- Integration health monitoring

## 14. Risk Assessment

### 14.1 Technical Risks

- Next.js App Router learning curve
- Database migration complexity
- External API reliability
- Performance under load
- Email deliverability issues

### 14.2 Business Risks

- Regulatory compliance changes
- Payment processing limitations
- Market competition
- Data privacy requirements

### 14.3 Mitigation Strategies

- Comprehensive documentation and training
- Phased development with thorough testing
- Robust error handling and fallback systems
- Regular compliance reviews
- Performance monitoring and optimization

## 15. Success Metrics

### 15.1 Technical Metrics

- Application uptime (99.9%+)
- Average page load time (<2s)
- API response time (<300ms)
- Email delivery rate (98%+)
- Zero critical security vulnerabilities

### 15.2 Business Metrics

- User registration conversion rate
- Transaction success rate
- User engagement metrics
- Customer satisfaction scores
- Integration adoption rate

## 16. Budget and Resources

### 16.1 Development Team

- Senior Full-stack Developer (Next.js) - 2
- UI/UX Designer - 1
- DevOps/Infrastructure Engineer - 1
- QA Engineer - 1
- Project Manager - 1

### 16.2 Technology Costs

- Vercel Pro plan for hosting
- PostgreSQL database hosting
- Resend email service
- File storage (S3/Vercel Blob)
- Monitoring and analytics tools
- Security and compliance tools

This document provides a comprehensive foundation for building the B2B Cannabis Marketplace using a modern Next.js full-stack architecture with robust authentication, email services, and scalable integration capabilities.
