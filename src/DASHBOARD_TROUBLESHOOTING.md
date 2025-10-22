# Dashboard Troubleshooting Guide

## 🔍 How to Debug Add/Edit Issues

If adding or editing menu items is not working, follow these steps:

### Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12 or right-click → Inspect)
2. Go to the **Console** tab
3. Try adding or editing an item
4. Look for these log messages:

**When Adding:**
```
=== ADDING MENU ITEM ===
Main Category: eats
Selected Category: {...}
Form Data: {...}
Request body: {...}
Response status: 200
Response data: {...}
```

**When Editing:**
```
=== UPDATING MENU ITEM ===
Main Category: eats
Selected Category: {...}
Editing Item: {...}
Form Data: {...}
Request body: {...}
Response status: 200
Response data: {...}
```

### Step 2: Check for Common Errors

#### Error: "Missing required fields"
- **Cause**: Name or Price field is empty
- **Solution**: Make sure both Name and Price are filled in before clicking Add/Save

#### Error: "Item not found"
- **Cause**: The item's order value doesn't match the database
- **Solution**: Refresh the page to reload menu data

#### Error: Network error or fetch failed
- **Cause**: Server is not responding
- **Solution**: 
  1. Check if Supabase is running
  2. Verify the projectId in `/utils/supabase/info.tsx`
  3. Check your internet connection

### Step 3: Test Server Endpoints

Open these URLs in your browser to test:

1. **Health Check:**
   ```
   https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **KV Store Test:**
   ```
   https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/test/kv
   ```
   Should return: `{"success":true,"message":"KV store is working correctly",...}`

3. **Get Menu Data (Eats):**
   ```
   https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/menu/complete/eats
   ```
   Should return: Menu data with categories and items

### Step 4: Check Server Logs

The server logs detailed information about each request:

**For Add Item:**
```
=== CREATE MENU ITEM REQUEST ===
Request body: {...}
Getting existing items for: menu:eats:items:101:
Found X existing items
Setting key: menu:eats:items:101:X
Item created successfully
```

**For Edit Item:**
```
=== UPDATE MENU ITEM REQUEST ===
Request body: {...}
Getting existing item with key: menu:eats:items:101:0
Existing item: {...}
Updating item to: {...}
Item updated successfully
```

To view server logs:
1. Go to https://supabase.com/dashboard/project/fseoedndjvvjikwcryck/functions
2. Click on the `server` function
3. Go to **Logs** tab
4. Perform the action (add/edit)
5. Refresh logs to see the output

### Step 5: Verify Data Structure

Each menu item should have this structure in the database:
```json
{
  "name": "Full Breakfast",
  "price": "8,000 RWF",
  "description": "tea, fruits, 2 eggs of your choice, toast",
  "order": 0
}
```

The key format is:
```
menu:{mainCategory}:items:{categoryId}:{order}
```

Example: `menu:eats:items:101:0`

### Step 6: Common Solutions

#### Solution A: Clear Local Storage and Reload
```javascript
// Run in browser console:
localStorage.clear();
location.reload();
```

#### Solution B: Verify Category Selection
- Make sure a category is selected in the sidebar before adding items
- The category name should be highlighted in amber color

#### Solution C: Check Form Validation
- The "Add Item" and "Save Changes" buttons should be **disabled** if Name or Price is empty
- If buttons are always disabled, check the formData state in console

#### Solution D: Reinitialize Menu Data
If menu data is corrupted:
1. Go to `/db-check` to verify database connection
2. Clear menu initialization flag:
   ```javascript
   localStorage.removeItem('menuDataInitialized');
   ```
3. Reload the page to reinitialize

### Step 7: Test with curl

Test the server directly with curl commands:

**Add Item:**
```bash
curl -X POST \
  https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/menu/item \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZW9lZG5kanZ2amlrd2NyeWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODE1NzEsImV4cCI6MjA3NjE1NzU3MX0.rv-gk7070dXY-E3UP-VRALH_uHr3L-c4ltbvCBPznqo" \
  -H "Content-Type: application/json" \
  -d '{
    "mainCategory": "eats",
    "categoryId": 101,
    "name": "Test Item",
    "price": "5,000 RWF",
    "description": "Test description"
  }'
```

**Update Item:**
```bash
curl -X PUT \
  https://fseoedndjvvjikwcryck.supabase.co/functions/v1/make-server-786b768a/menu/item \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZW9lZG5kanZ2amlrd2NyeWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODE1NzEsImV4cCI6MjA3NjE1NzU3MX0.rv-gk7070dXY-E3UP-VRALH_uHr3L-c4ltbvCBPznqo" \
  -H "Content-Type: application/json" \
  -d '{
    "mainCategory": "eats",
    "categoryId": 101,
    "itemOrder": 0,
    "name": "Updated Item",
    "price": "6,000 RWF",
    "description": "Updated description"
  }'
```

### Step 8: What to Report

If the issue persists, report these details:

1. **Console Logs**: Copy the complete console output
2. **Network Tab**: 
   - Open Developer Tools → Network tab
   - Filter by "Fetch/XHR"
   - Click on the failed request
   - Copy the Request and Response data
3. **Server Logs**: Copy relevant logs from Supabase Functions
4. **Error Message**: Exact error message from toast notification
5. **Steps to Reproduce**: What you clicked and in what order

## ✅ Expected Behavior

When everything works correctly:

1. **Adding an item:**
   - Fill in Name and Price
   - Click "Add Item"
   - See green success toast: "Menu item added successfully!"
   - Dialog closes automatically
   - New item appears in the list immediately
   - Item has correct order number

2. **Editing an item:**
   - Click pencil icon
   - Dialog opens with current values pre-filled
   - Modify Name, Price, or Description
   - Click "Save Changes"
   - See green success toast: "Menu item updated successfully!"
   - Dialog closes automatically
   - Changes appear immediately in the list

3. **Deleting an item:**
   - Click trash icon
   - Confirm deletion in popup
   - See green success toast: "Menu item deleted successfully!"
   - Item disappears from list
   - Remaining items are reordered automatically

## 🔧 Quick Fixes

### Fix 1: Button Not Working
- Make sure Name and Price fields are not empty
- Check if button is disabled (gray and non-clickable)
- Try clicking directly on the button text, not the edges

### Fix 2: Dialog Not Closing
- Click the "Cancel" button or outside the dialog
- Check console for JavaScript errors
- Refresh the page if dialog is stuck

### Fix 3: Items Not Appearing
- Check that you're in the correct category (Eats vs Drinks)
- Verify items exist by checking another category
- Reload the page to refresh data

### Fix 4: Order Numbers Wrong
- This is just a display helper, not critical
- Order is managed automatically by the system
- Refreshing the page should fix the display

## 📞 Still Need Help?

1. Check all URLs and endpoints are correct
2. Verify Supabase project is active
3. Ensure KV store table exists
4. Check browser console for errors
5. Review server logs in Supabase dashboard
6. Test with the curl commands above

The extensive logging added to the system will help identify the exact point of failure!
