# Admin Dashboard Access Guide

## 🔐 Accessing the Dashboard

### Direct URL Access
The admin dashboard is accessible only via direct URL navigation for security purposes.

**Dashboard URL**: `/secure-portal-musanze-2025`

### Login
**Password**: `connections2025`

> ⚠️ **Security Note**: The dashboard link is NOT visible on the public website. This URL is intentionally obscure for security. Bookmark it for quick access.

## 📱 Responsive Design

The dashboard is fully optimized for:
- ✅ **Desktop** - Full sidebar navigation with table views
- ✅ **Mobile** - Drawer menu navigation with card-based layouts
- ✅ **Tablet** - Adaptive layout that scales beautifully

### Mobile Features
- Floating action button (FAB) for category menu access
- Slide-out drawer for category selection
- Card-based contact submission view
- Touch-optimized buttons and forms
- Full-width dialogs with proper scrolling

### Desktop Features
- Persistent sidebar with category navigation
- Table-based contact submission view
- Side-by-side layouts
- Hover effects and transitions

## 🎯 Dashboard Features

### 1. Menu Management
- ✅ Add new menu items with automatic RWF formatting
- ✅ Edit existing items (price, name, description)
- ✅ Delete items with automatic reordering
- ✅ Switch between Eats and Drinks categories
- ✅ View item counts per category

### 2. Contact Submissions
- ✅ View all form submissions
- ✅ See customer details (name, email, phone)
- ✅ Read full messages
- ✅ Check submission dates
- ✅ Status badges (new/reviewed)
- ✅ Click to view full details in modal

## 🎨 Design Features

- **Dark Theme** - Professional look matching café aesthetic
- **Glassmorphic Cards** - Modern backdrop blur effects
- **Smooth Animations** - Subtle transitions throughout
- **Loading States** - Visual feedback during operations
- **Toast Notifications** - Success/error messages
- **Empty States** - Helpful messages when no data exists

## 📝 Usage Tips

### Adding Menu Items
1. Select the category type (Eats/Drinks)
2. Click on a category
3. Click "Add Item" button
4. Fill in details:
   - **Name**: Item name (required)
   - **Price**: Just the number, e.g., "5,000" (RWF auto-added)
   - **Description**: Optional details
5. Click "Add Item" to save

### Editing Items
1. Click the pencil icon on any item
2. Modify the fields (RWF is stripped for easy editing)
3. Click "Save Changes"

### Deleting Items
1. Click the trash icon
2. Confirm the deletion
3. Items are automatically reordered

### Viewing Contacts
- **Desktop**: See table with all details
- **Mobile**: Tap any card to see full details
- Click email/phone links to contact directly

## 🔒 Security

- Password-protected access
- No public links to dashboard
- Backend uses service role keys (never exposed)
- Input validation on all forms
- Direct URL access only

## 🛠️ Changing Password

Edit `/components/Dashboard.tsx` at line 73:

```typescript
if (password === 'YOUR_NEW_PASSWORD') {
  setIsAuthenticated(true);
  toast.success('Welcome to the dashboard!');
}
```

## 🔗 Changing Dashboard URL

To change the access URL, edit `/App.tsx` at line 28:

```typescript
if (path.includes('/your-custom-secure-url')) return 'dashboard';
```

## 📊 Backend Integration

All operations connect to Supabase:
- Menu items stored in KV store
- Contact submissions in PostgreSQL table
- Real-time updates across all pages
- Automatic data synchronization

## ✨ No Setup Required

Everything is already configured:
- ✅ Database connections
- ✅ API endpoints
- ✅ Authentication
- ✅ CRUD operations
- ✅ Form validation
- ✅ Error handling

Just navigate to `/dashboard` and start using it!

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify you're using the correct password
3. Ensure Supabase credentials are configured
4. Check network requests in browser DevTools

---

**Access your dashboard now**: Navigate to `/secure-portal-musanze-2025` 🚀

## 🔒 Security Features

### Obscure URL
- Not `/dashboard` or `/admin` which are commonly targeted
- Unique identifier: `secure-portal-musanze-2025`
- No hints or links on public pages

### Login Protection
- Password required
- No password hints displayed
- Failed attempts show generic error message
- Session management

### Best Practices
1. **Bookmark the URL** - Don't type it from memory
2. **Use strong password** - Change default password in production
3. **Don't share** - Keep credentials confidential
4. **Regular updates** - Change password periodically
