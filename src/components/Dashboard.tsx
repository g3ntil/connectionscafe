import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Pencil, Trash2, Plus, Lock, LogOut, Mail, Phone, Calendar, MessageSquare, Menu, Coffee, Eye, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  order?: number;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  items?: MenuItem[];
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
  notes?: string;
}

export function Dashboard() {
  console.log('Dashboard component mounted');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('menu');
  
  // Menu state
  const [mainCategory, setMainCategory] = useState<'eats' | 'drinks'>('eats');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Contact submissions state
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  
  // Mobile states
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  
  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmissionDetailOpen, setIsSubmissionDetailOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem & { order: number } | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  // Simple password check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'connections2025') {
      setIsAuthenticated(true);
      toast.success('Welcome to the dashboard!');
    } else {
      toast.error('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // Fetch menu data
  const fetchMenuData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-786b768a/menu/complete/${mainCategory}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.menu) {
        setCategories(data.menu);
        
        if (selectedCategory) {
          const updatedCategory = data.menu.find((cat: Category) => cat.id === selectedCategory.id);
          if (updatedCategory) {
            setSelectedCategory(updatedCategory);
          }
        } else if (data.menu.length > 0) {
          setSelectedCategory(data.menu[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch contact submissions
  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-786b768a/contact/submissions`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load contact submissions');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenuData();
      fetchSubmissions();
    }
  }, [isAuthenticated, mainCategory]);

  // Add menu item
  const handleAddItem = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category first');
      return;
    }
    
    try {
      const requestBody = {
        mainCategory,
        categoryId: selectedCategory.id,
        name: formData.name,
        price: formData.price,
        description: formData.description
      };
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-786b768a/menu/item`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Menu item added successfully!');
        setIsAddDialogOpen(false);
        setFormData({ name: '', price: '', description: '' });
        await fetchMenuData();
      } else {
        toast.error(data.error || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(`Failed to add menu item: ${error}`);
    }
  };

  // Update menu item
  const handleUpdateItem = async () => {
    if (!selectedCategory || !editingItem) {
      toast.error('No item selected for editing');
      return;
    }
    
    try {
      const requestBody = {
        mainCategory,
        categoryId: selectedCategory.id,
        itemOrder: editingItem.order,
        name: formData.name,
        price: formData.price,
        description: formData.description
      };
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-786b768a/menu/item`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Menu item updated successfully!');
        setIsEditDialogOpen(false);
        setEditingItem(null);
        setFormData({ name: '', price: '', description: '' });
        await fetchMenuData();
      } else {
        toast.error(data.error || 'Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error(`Failed to update menu item: ${error}`);
    }
  };

  // Delete menu item
  const handleDeleteItem = async (item: MenuItem & { order: number }) => {
    if (!selectedCategory) return;
    
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }
    
    try {
      const requestBody = {
        mainCategory,
        categoryId: selectedCategory.id,
        itemOrder: item.order
      };
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-786b768a/menu/item`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Menu item deleted successfully!');
        await fetchMenuData();
      } else {
        toast.error(data.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  // Open edit dialog
  const openEditDialog = (item: MenuItem & { order: number }) => {
    setEditingItem(item);
    const priceWithoutRWF = item.price.replace(/\s*RWF\s*/i, '').trim();
    setFormData({
      name: item.name,
      price: priceWithoutRWF,
      description: item.description
    });
    setIsEditDialogOpen(true);
  };

  // Open add dialog
  const openAddDialog = () => {
    setFormData({ name: '', price: '', description: '' });
    setIsAddDialogOpen(true);
  };

  // Open submission detail
  const openSubmissionDetail = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsSubmissionDetailOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Category selector component (reusable for desktop and mobile)
  const CategorySelector = ({ onCategorySelect }: { onCategorySelect?: () => void }) => (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label className="text-xs text-zinc-400 uppercase tracking-wider">Main Category</Label>
        <Select value={mainCategory} onValueChange={(value: 'eats' | 'drinks') => setMainCategory(value)}>
          <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="eats">🍽️ Eats</SelectItem>
            <SelectItem value="drinks">☕ Drinks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs text-zinc-400 uppercase tracking-wider">Categories</Label>
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category);
                onCategorySelect?.();
              }}
              variant="ghost"
              className={`w-full justify-start h-auto py-3 px-3 ${
                selectedCategory?.id === category.id
                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500/30'
                  : 'text-zinc-300 hover:bg-zinc-800 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{category.name}</span>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    selectedCategory?.id === category.id 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-zinc-700 text-zinc-300'
                  }`}
                >
                  {category.items?.length || 0}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-black to-zinc-900/40"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-500/10"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.3; }
            50% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0.5; }
            90% { opacity: 0.1; }
            100% { transform: translateY(-200vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
          }
        `}</style>
        
        <Card className="w-full max-w-md bg-zinc-950/90 border-amber-500/20 backdrop-blur-xl shadow-2xl shadow-amber-500/5 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-lg pointer-events-none"></div>
          
          <CardHeader className="space-y-6 pb-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"></div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center border border-amber-500/30">
                  <Lock className="w-9 h-9 text-amber-500" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl text-white tracking-tight">Secure Access Portal</CardTitle>
              <CardDescription className="text-zinc-400">
                Administrative Control Panel
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300 text-sm">Authentication Credentials</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-600 h-12 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all"
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black h-12 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
              >
                <Lock className="w-4 h-4 mr-2" />
                Authenticate & Enter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl text-white">Admin Dashboard</h1>
                <p className="text-xs text-zinc-400 hidden sm:block">Connections Café</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-800/50 border border-zinc-700 w-full sm:w-auto grid grid-cols-2">
            <TabsTrigger 
              value="menu" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Menu
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Contacts</span>
              <span className="sm:hidden">({submissions.length})</span>
              <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
                {submissions.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Menu Management Tab */}
          <TabsContent value="menu" className="space-y-4">
            <div className="flex gap-4">
              {/* Desktop Sidebar */}
              <Card className="hidden lg:block w-80 bg-zinc-900/80 border-zinc-800 h-fit sticky top-24">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategorySelector />
                </CardContent>
              </Card>

              {/* Mobile Category Button */}
              <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <Sheet open={isMobileCategoryOpen} onOpenChange={setIsMobileCategoryOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      size="lg"
                      className="bg-amber-500 hover:bg-amber-600 text-black rounded-full w-14 h-14 shadow-lg"
                    >
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-zinc-900 border-zinc-800 w-80">
                    <SheetHeader>
                      <SheetTitle className="text-white">Categories</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <CategorySelector onCategorySelect={() => setIsMobileCategoryOpen(false)} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Main Content */}
              <Card className="flex-1 bg-zinc-900/80 border-zinc-800">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-white text-xl">
                        {selectedCategory?.name || 'Select a category'}
                      </CardTitle>
                      <CardDescription className="text-zinc-400">
                        {selectedCategory 
                          ? `${selectedCategory.items?.length || 0} items` 
                          : 'Choose a category to view items'}
                      </CardDescription>
                    </div>
                    {selectedCategory && (
                      <Button
                        onClick={openAddDialog}
                        className="bg-amber-500 hover:bg-amber-600 text-black w-full sm:w-auto"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12 text-zinc-400">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                      Loading...
                    </div>
                  ) : selectedCategory?.items && selectedCategory.items.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCategory.items.map((item) => {
                        const itemWithOrder = item as MenuItem & { order: number };
                        if (itemWithOrder.order === undefined) {
                          console.error('Item missing order property:', item);
                          return null;
                        }
                        return (
                          <div
                            key={itemWithOrder.order}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                          >
                            <div className="flex-1 mb-3 sm:mb-0">
                              <h3 className="text-white mb-1">{item.name}</h3>
                              {item.description && (
                                <p className="text-sm text-zinc-400 mb-2">{item.description}</p>
                              )}
                              <p className="text-amber-500 font-mono">{item.price}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditDialog(itemWithOrder)}
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/50 flex-1 sm:flex-none"
                              >
                                <Pencil className="w-4 h-4 sm:mr-0" />
                                <span className="sm:hidden ml-2">Edit</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteItem(itemWithOrder)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-950/50 flex-1 sm:flex-none"
                              >
                                <Trash2 className="w-4 h-4 sm:mr-0" />
                                <span className="sm:hidden ml-2">Delete</span>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-zinc-400">
                      <Coffee className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>{selectedCategory ? 'No items in this category yet' : 'Select a category to get started'}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts">
            <Card className="bg-zinc-900/80 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Contact Form Submissions</CardTitle>
                <CardDescription className="text-zinc-400">
                  {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissions.length > 0 ? (
                  <div className="space-y-3">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block rounded-lg border border-zinc-800 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-zinc-800/50 border-b border-zinc-700">
                              <th className="text-left p-3 text-zinc-300 text-sm">Name</th>
                              <th className="text-left p-3 text-zinc-300 text-sm">Contact</th>
                              <th className="text-left p-3 text-zinc-300 text-sm">Subject</th>
                              <th className="text-left p-3 text-zinc-300 text-sm">Date</th>
                              <th className="text-left p-3 text-zinc-300 text-sm">Status</th>
                              <th className="text-left p-3 text-zinc-300 text-sm">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissions.map((submission) => (
                              <tr key={submission.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                                <td className="p-3 text-white">{submission.name}</td>
                                <td className="p-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center text-sm text-zinc-400">
                                      <Mail className="w-3 h-3 mr-1" />
                                      <span className="truncate max-w-[200px]">{submission.email}</span>
                                    </div>
                                    {submission.phone && (
                                      <div className="flex items-center text-sm text-zinc-400">
                                        <Phone className="w-3 h-3 mr-1" />
                                        {submission.phone}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3 text-zinc-300 max-w-xs truncate">{submission.subject}</td>
                                <td className="p-3 text-zinc-400 text-sm whitespace-nowrap">
                                  {formatDate(submission.created_at)}
                                </td>
                                <td className="p-3">
                                  <Badge
                                    variant={submission.status === 'new' ? 'default' : 'secondary'}
                                    className={submission.status === 'new' ? 'bg-amber-500/20 text-amber-500' : ''}
                                  >
                                    {submission.status}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => openSubmissionDetail(submission)}
                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/50"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-3">
                      {submissions.map((submission) => (
                        <div
                          key={submission.id}
                          onClick={() => openSubmissionDetail(submission)}
                          className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-white mb-1">{submission.name}</h3>
                              <p className="text-sm text-zinc-400">{submission.subject}</p>
                            </div>
                            <Badge
                              variant={submission.status === 'new' ? 'default' : 'secondary'}
                              className={submission.status === 'new' ? 'bg-amber-500/20 text-amber-500' : ''}
                            >
                              {submission.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center text-sm text-zinc-400">
                              <Mail className="w-3 h-3 mr-2" />
                              <span className="truncate">{submission.email}</span>
                            </div>
                            {submission.phone && (
                              <div className="flex items-center text-sm text-zinc-400">
                                <Phone className="w-3 h-3 mr-2" />
                                {submission.phone}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs text-zinc-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(submission.created_at)}
                            </div>
                            <span className="text-blue-400">Tap to view →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-400">
                    <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No contact submissions yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Add a new item to {selectedCategory?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="add-name" className="text-zinc-300">Name *</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Item name"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="add-price" className="text-zinc-300">Price *</Label>
              <Input
                id="add-price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 5,000"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 mt-1.5"
              />
              <p className="text-xs text-zinc-500 mt-1">RWF will be added automatically</p>
            </div>
            <div>
              <Label htmlFor="add-description" className="text-zinc-300">Description</Label>
              <Textarea
                id="add-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 mt-1.5 min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddItem}
              disabled={!formData.name.trim() || !formData.price.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-black disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Update the details for this menu item
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name" className="text-zinc-300">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Item name"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="edit-price" className="text-zinc-300">Price *</Label>
              <Input
                id="edit-price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 5,000"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 mt-1.5"
              />
              <p className="text-xs text-zinc-500 mt-1">RWF will be added automatically if not present</p>
            </div>
            <div>
              <Label htmlFor="edit-description" className="text-zinc-300">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 mt-1.5 min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateItem}
              disabled={!formData.name.trim() || !formData.price.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-black disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submission Detail Dialog */}
      <Dialog open={isSubmissionDetailOpen} onOpenChange={setIsSubmissionDetailOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Contact Submission</span>
              {selectedSubmission && (
                <Badge
                  variant={selectedSubmission.status === 'new' ? 'default' : 'secondary'}
                  className={selectedSubmission.status === 'new' ? 'bg-amber-500/20 text-amber-500' : ''}
                >
                  {selectedSubmission.status}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-zinc-400 uppercase tracking-wider">Name</Label>
                  <p className="text-white mt-1">{selectedSubmission.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-zinc-400 uppercase tracking-wider">Date</Label>
                  <p className="text-white mt-1">{formatDate(selectedSubmission.created_at)}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-zinc-400 uppercase tracking-wider">Email</Label>
                <div className="flex items-center text-white mt-1">
                  <Mail className="w-4 h-4 mr-2 text-zinc-400" />
                  <a href={`mailto:${selectedSubmission.email}`} className="hover:text-amber-500 transition-colors">
                    {selectedSubmission.email}
                  </a>
                </div>
              </div>
              
              {selectedSubmission.phone && (
                <div>
                  <Label className="text-xs text-zinc-400 uppercase tracking-wider">Phone</Label>
                  <div className="flex items-center text-white mt-1">
                    <Phone className="w-4 h-4 mr-2 text-zinc-400" />
                    <a href={`tel:${selectedSubmission.phone}`} className="hover:text-amber-500 transition-colors">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-xs text-zinc-400 uppercase tracking-wider">Subject</Label>
                <p className="text-white mt-1">{selectedSubmission.subject}</p>
              </div>
              
              <div>
                <Label className="text-xs text-zinc-400 uppercase tracking-wider">Message</Label>
                <div className="mt-1 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                  <p className="text-white whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setIsSubmissionDetailOpen(false)}
              className="bg-amber-500 hover:bg-amber-600 text-black w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
