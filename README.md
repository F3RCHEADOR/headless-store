
## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd headless-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_CLIENT_KEY=your_woocommerce_consumer_key
   VITE_CLIENT_SECRET=your_woocommerce_consumer_secret
   VITE_WORDPRESS_URL=https://your-wordpress-site.com/
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌐 API Integration

The application integrates with WordPress/WooCommerce using:

- **OAuth 1.0a Authentication** for secure API calls
- **REST API endpoints** for products, orders, and user management
- **JWT Authentication** for user sessions

### Key API Functions

- `getAllProducts()` - Fetch all products from WooCommerce
- `getExpecificProduct(id)` - Get single product details
- `registerStoreUser(userInfo)` - Register new users
- `loginUser(userInfo)` - Authenticate users
- `newOrder(userInfo)` - Create new orders
- `getOrdersByCustomer(customerId)` - Fetch customer orders

## �� Core Features

### Shopping Cart
- Add/remove products
- Quantity management
- Local storage persistence
- Cart total calculation

### User Management
- User registration and login
- JWT token authentication
- User profile management
- Session persistence

### Product Management
- Product catalog display
- Product detail pages
- Price display with sale prices
- Product images and descriptions

### Order Processing
- Complete checkout flow
- Order creation in WooCommerce
- Order history and tracking
- Customer order management

## 🎨 UI Components

- **HeroBanner** - Homepage hero section
- **ProductCard** - Product display component
- **Header/Footer** - Navigation and layout
- **ModalOrders** - Order details modal
- **Loader** - Loading state component

## 🔐 Security Features

- OAuth 1.0a signature generation for API calls
- JWT token management
- Secure password handling
- Environment variable protection

## 📱 Responsive Design

Built with Tailwind CSS for a fully responsive design that works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Ensure environment variables** are properly configured in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ using React and Vite**