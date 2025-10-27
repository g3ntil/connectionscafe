import { projectId, publicAnonKey } from './supabase/info';

// This utility initializes the menu data in the database
// Run this once to populate the database with menu items

const EATS_MENU_DATA = [
  {
    id: 101,
    name: 'Breakfast',
    icon: 'Egg',
    color: '#FFB347',
    items: [
      { name: 'Full Breakfast', price: '8,000 RWF', description: 'tea, fruits, 2 eggs of your choice, toast' },
      { name: 'Special Breakfast', price: '10,000 RWF', description: 'juice, eggs, sausage, toast, home fries' },
      { name: 'Plain Omelette', price: '2,000 RWF', description: '3 eggs' },
      { name: 'Chips Omelette', price: '3,000 RWF', description: '' },
      { name: 'Rolex Omelette', price: '3,000 RWF', description: '' },
      { name: 'Ham and Cheese Omelette', price: '5,000 RWF', description: '' },
      { name: 'Special Omelette', price: '5,000 RWF', description: 'chips, onions, tomato, green pepper, and beef or chicken or fish' },
      { name: 'Spanish Omelette', price: '3,000 RWF', description: 'tomato, onions, green pepper' },
      { name: 'Avocado Toast', price: '4,000 RWF', description: 'toast with avocado and 2 eggs of your choice' },
    ],
  },
  {
    id: 102,
    name: 'Soup',
    icon: 'SoupIcon',
    color: '#E67E22',
    items: [
      { name: 'Vegetable Soup', price: '4,000 RWF', description: '' },
      { name: 'Mushroom Soup', price: '4,000 RWF', description: '' },
      { name: 'Chicken Soup', price: '5,000 RWF', description: '' },
      { name: 'Fisherman Soup', price: '6,000 RWF', description: '' },
    ],
  },
  {
    id: 103,
    name: 'Salad',
    icon: 'SaladIcon',
    color: '#27AE60',
    items: [
      { name: 'Garden Salad', price: '4,000 RWF', description: 'Lettuce, onion, carrot, avocado, tomato' },
      { name: 'Chicken Salad', price: '5,500 RWF', description: 'Lettuce, onion, carrot, avocado, tomato, chicken' },
      { name: 'Steak Salad', price: '7,000 RWF', description: 'Lettuce, onion, carrot, avocado, tomato, beef' },
      { name: 'Tuna Salad', price: '6,000 RWF', description: 'Lettuce, onion, carrot, avocado, tomato, tuna' },
      { name: 'Chef Salad', price: '8,000 RWF', description: 'Boiled eggs, ham, cheese, avocado, onion, tomato, lettuce' },
    ],
  },
  {
    id: 104,
    name: 'Sandwiches & Wraps',
    icon: 'Sandwich',
    color: '#F39C12',
    note: 'Served with chips or an accompaniment of your choice',
    items: [
      { name: 'Vegetable Sandwich', price: '4,000 RWF', description: 'Fresh onions, lettuce, tomato, and avocado' },
      { name: 'Tuna Sandwich', price: '5,500 RWF', description: 'Tuna, lettuce, tomato, onion' },
      { name: 'Italian Sausage Sandwich', price: '5,500 RWF', description: 'Juicy Italian sausage with sauteed peppers and onion, mozzarella cheese, and tomato sauce' },
      { name: 'Hot Honey Crispy Chicken', price: '6,000 RWF', description: 'Crispy chicken coated in spicy honey, lettuce, tomatoes, and onion' },
      { name: 'Chicken Sandwich', price: '5,000 RWF', description: 'Chicken, onion, sauce, lettuce, tomato' },
      { name: 'Ham & Cheese Sandwich', price: '5,500 RWF', description: 'Ham, lettuce, tomato, onion, cheese' },
      { name: 'Club Sandwich', price: '6,000 RWF', description: 'Chicken, cheese, omelette, onion' },
      { name: 'Beef Burger', price: '5,000 RWF', description: 'Beef patty, onions, lettuce, tomatoes, burger sauce' },
      { name: 'Cheeseburger', price: '5,500 RWF', description: 'Beef patty, onions, lettuce, tomatoes, burger sauce, cheese' },
      { name: 'Chicken Burger', price: '5,500 RWF', description: '' },
      { name: 'Vegetable Burger', price: '4,000 RWF', description: '' },
      { name: 'Chicken Wrap', price: '5,000 RWF', description: '' },
      { name: 'Beef Wrap', price: '5,000 RWF', description: '' },
      { name: 'Vegetable Wrap', price: '4,000 RWF', description: 'Lettuce, onion, tomato, zucchini' },
    ],
  },
  {
    id: 105,
    name: 'Mains',
    icon: 'UtensilsCrossed',
    color: '#C0392B',
    note: 'Served with two accompaniments',
    items: [
      { name: 'Fish Fillet', price: '7,000 RWF', description: 'Tender fish fillet served with your choice of tomato, mushroom, or onion sauce' },
      { name: 'Coconut Fish', price: '8,000 RWF', description: 'Delicate fish fillet pieces simmered in a creamy coconut milk sauce' },
      { name: 'Fish & Chips', price: '7,500 RWF', description: 'Crispy fried fish fillet served with chips and your choice of salad or steamed vegetables' },
      { name: 'Fish Curry', price: '7,000 RWF', description: '' },
      { name: 'Fajita Fries Supreme', price: '7,000 RWF', description: 'Crispy chips topped with seasoned chicken, sauteed peppers and onions, a rich cheese sauce, and fresh sliced avocado' },
      { name: 'Chicken Leg', price: '6,000 RWF', description: 'Juicy chicken leg served with your choice of tomato, mushroom, peanut, or onion sauce' },
      { name: 'Coconut Chicken', price: '7,500 RWF', description: 'Juicy chicken cooked in a creamy coconut milk sauce' },
      { name: 'Chicken Stew', price: '5,000 RWF', description: 'Onion, chicken, pepper, red sauce' },
      { name: 'Chicken Curry', price: '5,500 RWF', description: '' },
      { name: 'Chicken Wings', price: '5,000 RWF', description: '3 wings coated in breadcrumbs and baked or fried' },
      { name: 'Whole Chicken', price: '24,000 RWF', description: 'Served with chips and salad' },
      { name: 'Half Chicken', price: '12,000 RWF', description: 'With chips and salad' },
      { name: 'Chicken Fried Rice', price: '26,000 RWF', description: 'Rice, whole chicken, chips or salad. A big plate for 4-5 people' },
      { name: 'Beef Steak', price: '7,500 RWF', description: 'A tender 200g beef steak, grilled to your liking and served with your choice of tomato, mushroom, onion sauce, or green pepper sauce' },
      { name: 'Beef Cordon Bleu', price: '8,000 RWF', description: 'Tender beef wrapped around cheese and ham' },
      { name: 'Beef Stroganoff', price: '7,000 RWF', description: 'Slices of tender beef, onions, and green peppers in creamy mushroom sauce' },
      { name: 'Beef Stew', price: '6,000 RWF', description: '' },
      { name: 'Beef Curry', price: '6,000 RWF', description: '' },
    ],
  },
  {
    id: 106,
    name: 'Local Food',
    icon: 'UtensilsCrossed',
    color: '#8E44AD',
    items: [
      { name: 'Agotogo Chicken', price: '5,500 RWF', description: '' },
      { name: 'Agotogo Beef', price: '5,500 RWF', description: '' },
      { name: 'Agotogo Fish', price: '6,000 RWF', description: '' },
      { name: 'Agotogo Vegetable', price: '4,000 RWF', description: '' },
      { name: 'Ugali', price: '6,000 RWF', description: 'Fish, sambaza, chicken, or beef' },
      { name: 'Kahunga', price: '6,000 RWF', description: 'Fish, sambaza, chicken, or beef' },
      { name: 'Boil', price: '5,500 RWF', description: 'Chicken or beef' },
    ],
  },
  {
    id: 107,
    name: 'Pizza',
    icon: 'PizzaIcon',
    color: '#E74C3C',
    items: [
      { name: 'Margarita', price: '4,000 RWF', description: 'Tomato sauce, tomato, cheese, oregano' },
      { name: 'Vegetable', price: '5,000 RWF', description: 'Tomato, onion, green bean, green peppers, carrots, oregano' },
      { name: 'Beef', price: '6,000 RWF', description: 'Beef, onion, oregano, cheese' },
      { name: 'Bolognese', price: '6,000 RWF', description: 'Mince meat, onion, carrot, green pepper, oregano, cheese' },
      { name: 'Ham', price: '6,000 RWF', description: 'Ham, garlic, oregano, cheese' },
      { name: 'Chicken', price: '6,000 RWF', description: 'Chicken, onion, oregano, cheese' },
      { name: 'Hawaiian', price: '7,000 RWF', description: 'Ham & pineapple, cheese, oregano' },
      { name: 'Beef Sausage', price: '6,000 RWF', description: 'Sausage, garlic, onion, oregano, cheese' },
      { name: 'Mixed', price: '10,000 RWF', description: 'Choose 3 meats (beef, chicken, sausage, ham), oregano, cheese' },
      { name: '4 Season', price: '8,000 RWF', description: 'Ham, mushroom, vegetables, tuna' },
    ],
  },
  {
    id: 108,
    name: 'Pasta',
    icon: 'Cookie',
    color: '#D35400',
    items: [
      { name: 'Spaghetti Bolognese', price: '6,000 RWF', description: 'Classic spaghetti served with a hearty meat sauce, simmered to perfection' },
      { name: 'Vegetable Tagliatelle', price: '5,500 RWF', description: 'Tagliatelle pasta tossed with onions, green peppers, carrots, and zucchini, all coated in a savory red sauce' },
      { name: 'Chicken Alfredo Pasta', price: '8,000 RWF', description: 'Tender penne with juicy chicken in a creamy alfredo sauce' },
    ],
  },
  {
    id: 109,
    name: 'Kids Corner',
    icon: 'Baby',
    color: '#FF6B9D',
    note: 'Served with chips and salad',
    items: [
      { name: 'Fish Finger', price: '5,000 RWF', description: '' },
      { name: 'Chicken Strips', price: '4,500 RWF', description: '' },
      { name: 'Mini Burger', price: '4,000 RWF', description: 'Beef or chicken' },
      { name: 'Plain Chips with Salad', price: '3,000 RWF', description: '' },
    ],
  },
];

const DRINKS_MENU_DATA = [
  {
    id: 1,
    name: 'Hot Coffee',
    icon: 'Coffee',
    color: '#8B4513',
    items: [
      { name: 'Espresso', price: '1,500 RWF', description: '' },
      { name: 'Americano', price: '1,500 RWF', description: '' },
      { name: 'Macchiato', price: '2,000 RWF', description: '' },
      { name: 'Cappuccino', price: '2,500 RWF', description: '' },
      { name: 'Latte', price: '2,500 RWF', description: '' },
      { name: 'Cinnamon Latte', price: '3,000 RWF', description: '' },
      { name: 'Vanilla Latte', price: '3,000 RWF', description: '' },
      { name: 'Caramel Latte', price: '3,000 RWF', description: '' },
      { name: 'Mocha', price: '3,000 RWF', description: '' },
      { name: 'Pour Over', price: '3,000 RWF', description: '' },
      { name: 'African Coffee', price: '3,000 RWF', description: '' },
    ],
  },
  {
    id: 2,
    name: 'Iced Coffee',
    icon: 'Snowflake',
    color: '#4682B4',
    items: [
      { name: 'Cold Brew', price: '3,000 RWF', description: '' },
      { name: 'Sweet Cream Cold Brew', price: '3,500 RWF', description: '' },
      { name: 'Iced Americano', price: '2,000 RWF', description: '' },
      { name: 'Iced Cappuccino', price: '3,000 RWF', description: '' },
      { name: 'Iced Mocha', price: '3,500 RWF', description: '' },
      { name: 'Iced Latte', price: '3,000 RWF', description: '' },
      { name: 'Iced Cinnamon Latte', price: '3,500 RWF', description: '' },
      { name: 'Iced Vanilla Latte', price: '3,500 RWF', description: '' },
      { name: 'Iced Caramel Latte', price: '3,500 RWF', description: '' },
    ],
  },
  {
    id: 3,
    name: 'Tea',
    icon: 'Leaf',
    color: '#228B22',
    items: [
      { name: 'African Tea', price: '2,000 RWF', description: '' },
      { name: 'Black Tea', price: '2,000 RWF', description: '' },
      { name: 'Spice Tea', price: '2,500 RWF', description: '' },
      { name: 'Green Tea', price: '2,000 RWF', description: '' },
      { name: 'Mint Tea', price: '2,500 RWF', description: '' },
      { name: 'Lemon Tea', price: '2,000 RWF', description: '' },
      { name: 'Hot Chocolate', price: '2,500 RWF', description: '' },
    ],
  },
  {
    id: 4,
    name: 'Juices',
    icon: 'Citrus',
    color: '#FF8C00',
    items: [
      { name: 'Pineapple Juice', price: '2,500 RWF', description: '' },
      { name: 'Passion Juice', price: '2,500 RWF', description: '' },
      { name: 'Watermelon Juice', price: '2,500 RWF', description: '' },
      { name: 'Tree Tomato Juice', price: '3,000 RWF', description: '' },
      { name: 'Mango Juice', price: '3,000 RWF', description: '' },
      { name: 'Mocktail Juice', price: '3,500 RWF', description: '' },
      { name: 'Beetroot Special', price: '4,500 RWF', description: 'Beetroot, ginger, lemon, honey' },
      { name: 'Green Detox', price: '4,500 RWF', description: 'Mint, pineapple, cucumber, spinach, lemon' },
      { name: 'Lemonade', price: '3,000 RWF', description: '' },
    ],
  },
  {
    id: 5,
    name: 'Smoothies & Milkshakes',
    icon: 'Droplets',
    color: '#FF69B4',
    items: [
      { name: 'BananaRama Smoothie', price: '3,500 RWF', description: 'Banana, vanilla yogurt' },
      { name: 'Mango Mania Smoothie', price: '3,500 RWF', description: 'Mango, strawberry yogurt, simple syrup' },
      { name: 'Mango Berry Smoothie', price: '3,500 RWF', description: 'Mango, strawberry ice cream, simple syrup' },
      { name: 'Green Smoothie', price: '3,500 RWF', description: 'Baby spinach, banana, pineapple, ginger, simple syrup, mint' },
      { name: 'Yellow Move Smoothie', price: '3,500 RWF', description: 'Peanut butter, paw paw, mango, vanilla yogurt' },
      { name: 'Yeah Smoothie', price: '3,500 RWF', description: 'Apple, baby spinach, avocado, simple syrup, mint' },
      { name: 'Pina Pina Smoothie', price: '3,500 RWF', description: 'Pineapple, banana, coconut milk, vanilla yogurt' },
      { name: 'Kidney Smoothie', price: '4,000 RWF', description: 'Strawberry, banana, peanut butter, vanilla yogurt, simple syrup' },
      { name: 'Mixed Smoothie', price: '4,000 RWF', description: 'Mango, pineapple, strawberry, avocado, apple, orange, vanilla yogurt' },
      { name: 'Vanilla Milkshake', price: '4,000 RWF', description: '' },
      { name: 'Chocolate Milkshake', price: '4,000 RWF', description: '' },
      { name: 'Strawberry Milkshake', price: '4,000 RWF', description: '' },
      { name: 'Coconut Milkshake', price: '4,000 RWF', description: '' },
    ],
  },
  {
    id: 6,
    name: 'Soft Drinks',
    icon: 'Droplets',
    color: '#DC143C',
    items: [
      { name: 'Coca Cola', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Coke Zero', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Sprite', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Fanta', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Vitalo', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Water', price: '1,000 RWF', description: '' },
    ],
  },
  {
    id: 7,
    name: 'Wine & Beer',
    icon: 'Wine',
    color: '#722F37',
    items: [
      { name: 'Mutzing', price: '1,500 RWF', description: '' },
      { name: 'Heineken', price: '2,000 RWF', description: '' },
      { name: 'Virunga', price: '1,500 RWF', description: '' },
      { name: 'Amstel', price: '2,000 RWF', description: '' },
      { name: 'Glass of Wine', price: '5,000 RWF', description: '' },
      { name: 'Bottle of Wine', price: '20,000 RWF', description: 'Ask for list of bottles' },
    ],
  },
];

export async function initializeMenuData() {
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;

  try {
    // Initialize EATS menu
    const eatsResponse = await fetch(`${baseUrl}/menu/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        menuData: {
          mainCategory: 'eats',
          categories: EATS_MENU_DATA,
        },
      }),
    });

    if (!eatsResponse.ok) {
      throw new Error(`Failed to initialize EATS menu: ${await eatsResponse.text()}`);
    }

    console.log('EATS menu initialized successfully');

    // Initialize DRINKS menu
    const drinksResponse = await fetch(`${baseUrl}/menu/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        menuData: {
          mainCategory: 'drinks',
          categories: DRINKS_MENU_DATA,
        },
      }),
    });

    if (!drinksResponse.ok) {
      throw new Error(`Failed to initialize DRINKS menu: ${await drinksResponse.text()}`);
    }

    console.log('DRINKS menu initialized successfully');
    console.log('All menu data has been initialized in the database!');
    
    return true;
  } catch (error) {
    console.error('Error initializing menu data:', error);
    throw error;
  }
}
