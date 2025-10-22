# Admin Dashboard Guide

## 🎯 Overview

The admin dashboard provides complete management of your Connections Café website, including:
- **Menu CRUD Operations**: Create, Read, Update, and Delete menu items
- **Contact Form Submissions**: View all customer inquiries and messages
- **Real-time Updates**: All changes sync with the Supabase database instantly

## 🔐 Access

### Dashboard URL
Navigate directly to: `/secure-portal-musanze-2025` 

> **Note**: The dashboard uses an obscure URL for security - there is no public link on the website. Bookmark this URL for easy access.

### Login Credentials
**Default Password**: `connections2025`

> **Security Note**: 
> - Change this password in `/components/Dashboard.tsx` line 73 for production use
> - The login page does not show password hints
> - URL is intentionally non-obvious (`/secure-portal-musanze-2025` instead of `/dashboard`)

## 📋 Features

### Menu Management Tab

#### View Menu Items
1. Select category type: **Eats** or **Drinks**
2. Click on any category in the sidebar to view its items
3. Each item displays:
   - Name
   - Description
   - Price (in RWF)

#### Add New Menu Item
1. Select the category where you want to add an item
2. Click the **"Add Item"** button
3. Fill in the form:
   - **Name**: Required - Item name
   - **Price**: Required - Format: "5,000 RWF"
   - **Description**: Optional - Item details
4. Click **"Add Item"** to save

#### Edit Menu Item
1. Click the **pencil icon** next to any menu item
2. Update the details in the dialog
3. Click **"Save Changes"**

#### Delete Menu Item
1. Click the **trash icon** next to any menu item
2. Confirm deletion in the popup
3. Item will be removed and remaining items reordered automatically

### Contact Submissions Tab

View all contact form submissions with:
- **Customer Name**
- **Email & Phone** (if provided)
- **Subject**
- **Message** (truncated, click to expand)
- **Submission Date**
- **Status Badge** (new/reviewed)

Submissions are sorted by date (newest first).

## 🔧 Technical Details

### API Endpoints Used

All endpoints are prefixed with: `https://{projectId}.supabase.co/functions/v1/make-server-786b768a/`

#### Menu Endpoints
- `GET /menu/complete/{mainCategory}` - Fetch all menu data
- `POST /menu/item` - Create new menu item
- `PUT /menu/item` - Update menu item
- `DELETE /menu/item` - Delete menu item
- `PUT /menu/category` - Update category details

#### Contact Endpoints
- `GET /contact/submissions` - Fetch all submissions

### Data Structure

#### Menu Item
```json
{
  "name": "Full Breakfast",
  "price": "8,000 RWF",
  "description": "tea, fruits, 2 eggs of your choice, toast",
  "order": 0
}
```

#### Contact Submission
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+250 788 123 456",
  "subject": "Reservation Inquiry",
  "message": "I would like to...",
  "created_at": "2025-01-15T10:30:00Z",
  "status": "new"
}
```

### Storage Structure

Menu items are stored in the KV store with this pattern:
```
menu:{mainCategory}:category:{categoryId}
menu:{mainCategory}:items:{categoryId}:{itemOrder}
```

Contact submissions are stored in the `contact_submissions` table in Supabase.

## 🎨 UI Features

- **Dark Theme**: Matches the main website aesthetic
- **Responsive Design**: Works on all screen sizes
- **Real-time Feedback**: Toast notifications for all actions
- **Loading States**: Shows loading indicators during operations
- **Error Handling**: Clear error messages if something goes wrong

## 🔒 Security

The dashboard uses:
- Simple password authentication (can be upgraded to proper auth)
- Service role key on backend (never exposed to frontend)
- Protected routes in the server
- Input validation on all forms

## 🚀 Getting Started

1. Navigate directly to `/secure-portal-musanze-2025` in your browser
2. Enter password: `connections2025` (no hint shown on login page)
3. Start managing your menu and viewing submissions!

## 💡 Tips

- **Menu Items**: Keep descriptions concise but informative
- **Prices**: Enter numbers only (e.g., "5,000") - RWF is added automatically
- **Direct Access**: Bookmark `/dashboard` for quick admin access
- **Updates**: Menu changes appear immediately on the live website
- **Backups**: All data is stored in Supabase - set up regular backups in your Supabase dashboard

## 🛠️ Customization

### Change Password
Edit line 73 in `/components/Dashboard.tsx`:
```typescript
if (password === 'YOUR_NEW_PASSWORD') {
```

### Add More Fields
Extend the form in the Add/Edit dialogs to include additional menu item properties.

### Customize Styling
All styles use Tailwind CSS classes and can be modified in the Dashboard component.

## 📞 Support

If you encounter any issues:
1. Check browser console for error messages
2. Verify Supabase connection in `/utils/supabase/info.tsx`
3. Ensure contact_submissions table exists in Supabase
4. Check that menu data was initialized properly

## ✅ What's Already Set Up

✅ All Supabase credentials configured  
✅ Menu data initialized in database  
✅ Contact form table created  
✅ All server endpoints working  
✅ Dashboard authentication  
✅ CRUD operations fully functional  
✅ Toast notifications enabled  

**No additional setup required - everything is ready to use!**
