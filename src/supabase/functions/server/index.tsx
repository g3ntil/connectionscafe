import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Supabase client for direct table access
const getSupabaseClient = () => createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-786b768a/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test KV store endpoint
app.get("/make-server-786b768a/test/kv", async (c) => {
  try {
    const testKey = "test:menu:connection";
    const testValue = { message: "KV store is working!", timestamp: new Date().toISOString() };
    
    console.log("Testing KV store...");
    await kv.set(testKey, testValue);
    const retrieved = await kv.get(testKey);
    await kv.del(testKey);
    
    return c.json({ 
      success: true, 
      message: "KV store is working correctly",
      test: {
        written: testValue,
        retrieved: retrieved
      }
    });
  } catch (error) {
    console.error("KV store test failed:", error);
    return c.json({ 
      success: false, 
      error: String(error) 
    }, 500);
  }
});

// ============================================
// MENU DATA MANAGEMENT ENDPOINTS
// ============================================

// Get all categories for a main category (eats or drinks)
app.get("/make-server-786b768a/menu/categories/:mainCategory", async (c) => {
  try {
    const mainCategory = c.req.param("mainCategory");
    
    if (mainCategory !== "eats" && mainCategory !== "drinks") {
      return c.json({ error: "Invalid main category. Must be 'eats' or 'drinks'" }, 400);
    }

    const categories = await kv.getByPrefix(`menu:${mainCategory}:category:`);
    
    // Sort categories by id
    const sortedCategories = categories.sort((a: any, b: any) => a.id - b.id);
    
    return c.json({ categories: sortedCategories });
  } catch (error) {
    console.log(`Error fetching categories: ${error}`);
    return c.json({ error: `Failed to fetch categories: ${error}` }, 500);
  }
});

// Get all items for a specific category
app.get("/make-server-786b768a/menu/items/:mainCategory/:categoryId", async (c) => {
  try {
    const mainCategory = c.req.param("mainCategory");
    const categoryId = c.req.param("categoryId");
    
    const items = await kv.getByPrefix(`menu:${mainCategory}:items:${categoryId}:`);
    
    return c.json({ items });
  } catch (error) {
    console.log(`Error fetching items: ${error}`);
    return c.json({ error: `Failed to fetch items: ${error}` }, 500);
  }
});

// Get complete menu data (all categories with items)
app.get("/make-server-786b768a/menu/complete/:mainCategory", async (c) => {
  try {
    const mainCategory = c.req.param("mainCategory");
    
    if (mainCategory !== "eats" && mainCategory !== "drinks") {
      return c.json({ error: "Invalid main category. Must be 'eats' or 'drinks'" }, 400);
    }

    // Get all categories
    const categories = await kv.getByPrefix(`menu:${mainCategory}:category:`);
    
    // Sort categories by id
    const sortedCategories = categories.sort((a: any, b: any) => a.id - b.id);
    
    // Get items for each category
    const menuData = await Promise.all(
      sortedCategories.map(async (category: any) => {
        const items = await kv.getByPrefix(`menu:${mainCategory}:items:${category.id}:`);
        return {
          ...category,
          items: items.sort((a: any, b: any) => a.order - b.order)
        };
      })
    );
    
    return c.json({ menu: menuData });
  } catch (error) {
    console.log(`Error fetching complete menu: ${error}`);
    return c.json({ error: `Failed to fetch menu: ${error}` }, 500);
  }
});

// Initialize menu data (one-time setup)
app.post("/make-server-786b768a/menu/initialize", async (c) => {
  try {
    // This endpoint will initialize the menu data in the KV store
    // It should be called once to populate the database
    
    const { menuData } = await c.req.json();
    
    if (!menuData || !menuData.mainCategory || !menuData.categories) {
      return c.json({ error: "Invalid menu data format" }, 400);
    }
    
    const { mainCategory, categories } = menuData;
    
    // Store each category and its items
    for (const category of categories) {
      const { items, ...categoryData } = category;
      
      // Store category
      await kv.set(`menu:${mainCategory}:category:${category.id}`, categoryData);
      
      // Store items
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await kv.set(
          `menu:${mainCategory}:items:${category.id}:${i}`,
          { ...item, order: i }
        );
      }
    }
    
    return c.json({ success: true, message: "Menu data initialized successfully" });
  } catch (error) {
    console.log(`Error initializing menu: ${error}`);
    return c.json({ error: `Failed to initialize menu: ${error}` }, 500);
  }
});

// ============================================
// CONTACT FORM SUBMISSION ENDPOINT
// ============================================

/* Table schema for contact_submissions:
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new',
  notes TEXT
);

CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
*/

app.post("/make-server-786b768a/contact/submit", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return c.json({ 
        error: "Missing required fields", 
        success: false 
      }, 400);
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ 
        error: "Invalid email address", 
        success: false 
      }, 400);
    }
    
    const supabase = getSupabaseClient();
    
    // Insert contact submission into the database
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject.trim(),
        message: message.trim(),
        status: 'new'
      })
      .select()
      .single();
    
    if (error) {
      console.error("Database error:", error);
      
      // Check if table doesn't exist
      if (error.code === "42P01" || error.message.includes("does not exist")) {
        return c.json({ 
          error: "Database table 'contact_submissions' does not exist. Please run the setup SQL first.", 
          success: false,
          details: error.message,
          setupRequired: true
        }, 500);
      }
      
      return c.json({ 
        error: "Failed to save contact form submission", 
        success: false,
        details: error.message 
      }, 500);
    }
    
    console.log("Contact form submitted successfully:", data.id);
    
    return c.json({ 
      success: true, 
      message: "Thank you for your message! We will get back to you shortly.",
      submissionId: data.id
    });
  } catch (error) {
    console.error(`Unexpected error in contact form submission:`, error);
    return c.json({ 
      error: "An unexpected error occurred", 
      success: false,
      details: String(error)
    }, 500);
  }
});

// Get all contact submissions (for admin use)
app.get("/make-server-786b768a/contact/submissions", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Database error:", error);
      return c.json({ 
        error: "Failed to fetch submissions", 
        submissions: [] 
      }, 500);
    }
    
    return c.json({ 
      success: true, 
      submissions: data 
    });
  } catch (error) {
    console.error(`Error fetching submissions: ${error}`);
    return c.json({ 
      error: `Failed to fetch submissions: ${error}`, 
      submissions: [] 
    }, 500);
  }
});

// Check if table exists
app.get("/make-server-786b768a/contact/check-table", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Try to query the table - if it doesn't exist, we'll get an error
    const { error } = await supabase
      .from("contact_submissions")
      .select("id")
      .limit(1);
    
    if (error) {
      // Check if error is because table doesn't exist
      if (error.message.includes("does not exist") || error.code === "42P01") {
        return c.json({ 
          exists: false, 
          message: "Table does not exist yet" 
        });
      }
      // Other error
      return c.json({ 
        exists: false, 
        error: error.message 
      });
    }
    
    return c.json({ 
      exists: true, 
      message: "Table exists and is accessible" 
    });
  } catch (error) {
    console.error(`Error checking table: ${error}`);
    return c.json({ 
      exists: false, 
      error: String(error) 
    });
  }
});

// ============================================
// MENU CRUD ENDPOINTS FOR DASHBOARD
// ============================================

// Create a new menu item
app.post("/make-server-786b768a/menu/item", async (c) => {
  try {
    const body = await c.req.json();
    const { mainCategory, categoryId, name, price, description } = body;
    
    if (!mainCategory || !categoryId || !name || !price) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    // Get existing items to determine the next order number
    const existingItems = await kv.getByPrefix(`menu:${mainCategory}:items:${categoryId}:`);
    
    // Find the highest order number
    let maxOrder = -1;
    for (const item of existingItems) {
      if (item.order !== undefined && item.order > maxOrder) {
        maxOrder = item.order;
      }
    }
    
    const order = maxOrder + 1;
    
    // Auto-append RWF if not present
    let formattedPrice = price.trim();
    if (!formattedPrice.toUpperCase().includes('RWF')) {
      formattedPrice = `${formattedPrice} RWF`;
    }
    
    const newItem = {
      name,
      price: formattedPrice,
      description: description || '',
      order
    };
    
    const key = `menu:${mainCategory}:items:${categoryId}:${order}`;
    await kv.set(key, newItem);
    
    return c.json({ success: true, item: newItem, order });
  } catch (error) {
    console.error(`Error creating menu item: ${error}`);
    return c.json({ error: `Failed to create item: ${error}` }, 500);
  }
});

// Update a menu item
app.put("/make-server-786b768a/menu/item", async (c) => {
  try {
    const body = await c.req.json();
    const { mainCategory, categoryId, itemOrder, name, price, description } = body;
    
    if (!mainCategory || !categoryId || itemOrder === undefined || !name || !price) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const key = `menu:${mainCategory}:items:${categoryId}:${itemOrder}`;
    const existingItem = await kv.get(key);
    
    if (!existingItem) {
      return c.json({ error: "Item not found" }, 404);
    }
    
    // Auto-append RWF if not present
    let formattedPrice = price.trim();
    if (!formattedPrice.toUpperCase().includes('RWF')) {
      formattedPrice = `${formattedPrice} RWF`;
    }
    
    const updatedItem = {
      name,
      price: formattedPrice,
      description: description || '',
      order: itemOrder
    };
    
    await kv.set(key, updatedItem);
    
    return c.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error(`Error updating menu item: ${error}`);
    return c.json({ error: `Failed to update item: ${error}` }, 500);
  }
});

// Delete a menu item
app.delete("/make-server-786b768a/menu/item", async (c) => {
  try {
    const body = await c.req.json();
    const { mainCategory, categoryId, itemOrder } = body;
    
    if (!mainCategory || !categoryId || itemOrder === undefined) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const key = `menu:${mainCategory}:items:${categoryId}:${itemOrder}`;
    await kv.del(key);
    
    // Reorder remaining items
    const items = await kv.getByPrefix(`menu:${mainCategory}:items:${categoryId}:`);
    const sortedItems = items.sort((a: any, b: any) => a.order - b.order);
    
    // Delete all items in category
    for (const item of items) {
      await kv.del(`menu:${mainCategory}:items:${categoryId}:${item.order}`);
    }
    
    // Re-add items with updated order
    let newOrder = 0;
    for (const item of sortedItems) {
      if (item.order !== itemOrder) {
        await kv.set(`menu:${mainCategory}:items:${categoryId}:${newOrder}`, {
          ...item,
          order: newOrder
        });
        newOrder++;
      }
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error(`Error deleting menu item: ${error}`);
    return c.json({ error: `Failed to delete item: ${error}` }, 500);
  }
});

// Update category
app.put("/make-server-786b768a/menu/category", async (c) => {
  try {
    const body = await c.req.json();
    const { mainCategory, categoryId, name, icon, color } = body;
    
    if (!mainCategory || !categoryId || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const key = `menu:${mainCategory}:category:${categoryId}`;
    const existingCategory = await kv.get(key);
    
    if (!existingCategory) {
      return c.json({ error: "Category not found" }, 404);
    }
    
    const updatedCategory = {
      id: categoryId,
      name,
      icon: icon || existingCategory.icon,
      color: color || existingCategory.color
    };
    
    await kv.set(key, updatedCategory);
    
    return c.json({ success: true, category: updatedCategory });
  } catch (error) {
    console.error(`Error updating category: ${error}`);
    return c.json({ error: `Failed to update category: ${error}` }, 500);
  }
});

// Create table endpoint - uses direct table creation
app.post("/make-server-786b768a/contact/create-table", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Instead of using RPC, we'll use the REST API to execute SQL
    // This is done by making a request to the Supabase SQL endpoint
    const response = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          'apikey': Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '',
        },
        body: JSON.stringify({
          query: `
            -- Create contact_submissions table
            CREATE TABLE IF NOT EXISTS contact_submissions (
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT,
              subject TEXT NOT NULL,
              message TEXT NOT NULL,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              status TEXT DEFAULT 'new',
              notes TEXT
            );

            -- Create indexes
            CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
            CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
            CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

            -- Enable RLS
            ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

            -- Drop existing policies
            DROP POLICY IF EXISTS "Service role can manage all contact submissions" ON contact_submissions;
            DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
            DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;

            -- Create policies
            CREATE POLICY "Service role can manage all contact submissions"
            ON contact_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);

            CREATE POLICY "Anyone can submit contact form"
            ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

            CREATE POLICY "Authenticated users can read contact submissions"
            ON contact_submissions FOR SELECT TO authenticated USING (true);
          `
        })
      }
    );

    if (!response.ok) {
      throw new Error(`SQL execution failed: ${response.statusText}`);
    }
    
    return c.json({ 
      success: true, 
      message: "Contact submissions table created successfully!" 
    });
  } catch (error) {
    console.error(`Error creating table: ${error}`);
    
    // Return detailed SQL for manual execution
    const projectId = Deno.env.get("SUPABASE_URL")?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || 'YOUR_PROJECT_ID';
    
    return c.json({ 
      success: false, 
      error: "Automated table creation failed. Please run the SQL manually in Supabase SQL Editor.",
      sql: `
-- Copy and paste this SQL into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/${projectId}/sql

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new',
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;

CREATE POLICY "Service role can manage all contact submissions"
ON contact_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can submit contact form"
ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact submissions"
ON contact_submissions FOR SELECT TO authenticated USING (true);
      `,
      details: String(error)
    }, 500);
  }
});

Deno.serve(app.fetch);