# Foundation 1899 Scripts - Tebex Headless Store

A modern, professional e-commerce website built for Tebex Headless API, featuring a dark theme with gold accents. This store is designed for selling digital scripts and game modifications.

## Features

- **Modern Dark Theme Design**: Sophisticated dark background with gold/tan accent colors
- **Tebex Headless API Integration**: Full integration with Tebex's Headless API for products and basket management
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices
- **Smooth Animations**: Loading animations, slide-in effects, and hover transitions
- **Product Categories**: Dynamic category filtering
- **Product Modals**: Quick view modals for product details
- **Individual Product Pages**: Dedicated pages for each product with full details
- **Shopping Basket**: Complete basket functionality with "basket" terminology (not "cart")
- **Fancy URLs Support**: Configured for SEO-friendly product URLs
- **Mobile Navigation**: Responsive mobile menu with smooth animations

## Project Structure

```
/
├── index.html              # Homepage
├── html/
│   ├── scripts.html        # Scripts listing page
│   ├── product.html        # Individual product page
│   └── redm-store.html     # RedM store landing page
├── css/
│   ├── index.css           # Homepage styles
│   ├── scripts.css         # Scripts page styles
│   ├── product.css         # Product page styles
│   └── store.css           # Store page styles
├── js/
│   ├── index.js            # Homepage JavaScript
│   ├── scripts.js          # Scripts page JavaScript
│   ├── product.js          # Product page JavaScript
│   ├── store.js            # Store page JavaScript
│   └── tebex-api.js        # Tebex API integration
└── img/                    # Images directory
```

## Setup Instructions

### 1. Configure Tebex API Key

**IMPORTANT**: You must configure your Tebex API key before the store will work with live data.

1. Get your Tebex Headless API key from: https://docs.tebex.io/developers/headless-api/overview
2. Open `js/tebex-api.js`
3. Find the `TEBEX_CONFIG` object at the top of the file
4. Replace `YOUR_TEBEX_API_KEY_HERE` with your actual API key:

```javascript
const TEBEX_CONFIG = {
    // Replace this with your actual Tebex Headless API key
    API_KEY: 'YOUR_TEBEX_API_KEY_HERE',
    // ... rest of config
};
```

### 2. Configure Fancy URLs (SEO-Friendly Product URLs)

Fancy URLs allow your products to have clean, readable URLs like `product.html?slug=premium-banking-system` instead of `product.html?id=123`.

1. Log in to your Tebex dashboard
2. Navigate to your package/product settings
3. Look for "Fancy URL" or "URL Slug" configuration
4. Enter a clean, SEO-friendly URL slug for each product (e.g., `premium-banking-system`)
5. Save your changes

**Note**: Fancy URLs must be configured in Tebex for the "Open in new tab" functionality to work properly.

### 3. Add Product Images

To display product images:

1. Place your product images in the `img/` directory
2. Ensure your Tebex packages have image URLs configured
3. Images will be automatically loaded from Tebex API response

If no image is available, a placeholder icon will be displayed.

### 4. Customize Store Details

You can customize various aspects of the store:

**Store Name and Branding:**
- Edit store name in `index.html`, `scripts.html`, and other HTML files
- Update logo text in the navigation section

**Color Scheme:**
- All CSS files use CSS variables for consistent theming
- Update color variables in each CSS file's `:root` section:

```css
:root {
    --primary-gold: #D4AF37;
    --primary-gold-light: #F4D03F;
    --primary-gold-dark: #B8960C;
    --secondary-tan: #C4A574;
    /* ... other colors */
}
```

**Content:**
- Update page titles, descriptions, and content in HTML files
- Modify product descriptions in Tebex package settings

### 5. Deploy Your Store

You have several options for deploying:

**Option 1: Static Hosting (Recommended)**
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

**Option 2: Traditional Web Hosting**
- Upload files via FTP/SFTP
- Ensure the directory structure is maintained

**Option 3: Using the Deploy Tool**
```bash
# From your workspace
deploy name="foundation1899-store" directory_path="."
```

## API Integration Points

### Tebex API Endpoints Used

The `tebex-api.js` file includes methods for:

1. **Categories** - `fetchCategories()`
   - Fetches all product categories
   
2. **Packages** - `fetchPackages([categoryId])`
   - Fetches all products or products by category
   - `fetchPackage(packageId)` - Fetches single product
   
3. **Basket** - `fetchBasket([basketId])`, `createBasket()`
   - Manages shopping basket
   
4. **Add to Basket** - `addToBasket(basketId, packageId, options)`
   - Adds products to basket
   
5. **Remove from Basket** - `removeFromBasket(basketId, itemId)`
   - Removes items from basket

### Local Storage

Basket data is persisted using local storage:
- `tebex_basket_id` - Stores the basket ID across sessions

## Key Features Explained

### Product Display
- **Grid Layout**: Products displayed in a responsive grid
- **Truncated Descriptions**: Product cards show 2-3 lines of description
- **Hover Effects**: Cards lift and highlight on hover
- **Category Badges**: Shows product category

### Product Modals
- Clicking a product card opens a modal with full details
- Includes "Add to Basket" button
- Links to individual product page
- Closes with overlay click, close button, or Escape key

### Individual Product Pages
- Full product details and description
- Pricing display with sale prices
- Product tags and metadata
- "Add to Basket" functionality
- Breadcrumb navigation

### Shopping Basket
- Consistent "basket" terminology throughout
- Sidebar basket overlay
- Item management (add/remove)
- Total calculation
- Persists across sessions

### Animations
- **Page Load**: Smooth fade-in effects
- **Slide-in Effects**: Products animate in from left/right
- **Hover Effects**: Cards lift and highlight
- **Page Transitions**: Smooth overlay transitions between pages

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Products Not Loading

**Problem**: Products don't appear or show loading state

**Solutions**:
1. Check that your Tebex API key is correctly configured in `js/tebex-api.js`
2. Verify your API key has the necessary permissions
3. Check browser console for error messages
4. Ensure your Tebex store has active packages

### Basket Not Working

**Problem**: Adding to basket fails

**Solutions**:
1. Check that basket API endpoints are accessible
2. Clear browser local storage and try again
3. Verify basket permissions in Tebex
4. Check browser console for API errors

### Fancy URLs Not Working

**Problem**: "Open in new tab" doesn't use custom URLs

**Solutions**:
1. Configure fancy URLs in Tebex package settings
2. Ensure each package has a unique URL slug
3. Test the URL format: `product.html?slug=your-product-slug`

### Images Not Displaying

**Problem**: Product images don't show

**Solutions**:
1. Configure image URLs in Tebex package settings
2. Ensure images are publicly accessible
3. Check image URLs are correct
4. Placeholder icons will display if no image is available

## Code Comments

All JavaScript files include detailed code comments explaining:
- Function purposes
- API integration points
- Event handlers
- Data processing logic
- Configuration options

## Performance Optimization

- CSS animations use `transform` and `opacity` for GPU acceleration
- Images lazy-loaded (when configured)
- Minimal DOM manipulation
- Efficient event delegation
- CSS variables for consistent theming

## Security Considerations

- API key is stored client-side (required for Tebex Headless)
- No sensitive data is stored in local storage
- All API calls use HTTPS
- Basket data is minimal and non-sensitive

## Support

For issues related to:
- **Tebex API**: Visit https://docs.tebex.io/developers/headless-api/overview
- **Store Functionality**: Check browser console for error messages
- **Customization**: Refer to code comments in relevant files

## License

This store template is provided as-is for use with Tebex Headless API. Customize as needed for your store.

## Credits

- Design inspired by Foundation 1899 Scripts branding
- Built with vanilla HTML, CSS, and JavaScript
- Uses Tebex Headless API for e-commerce functionality
- Fonts: Cinzel and Raleway from Google Fonts