'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Eye,
  Calendar,
  User,
  Tag,
  Image,
  FileText,
  Settings,
  Upload,
  CheckCircle
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  featuredImage?: string;
  type: 'article' | 'playlist' | 'artist' | 'album';
}

export default function CMSIntegration() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'The Future of AI in Music',
      content: 'Artificial intelligence is revolutionizing how we discover, create, and experience music...',
      author: 'Music Editor',
      status: 'published',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      tags: ['AI', 'Music', 'Technology'],
      featuredImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'article'
    },
    {
      id: '2',
      title: 'Chill Vibes Playlist',
      content: 'A carefully curated collection of relaxing tracks perfect for studying or unwinding...',
      author: 'AI Curator',
      status: 'published',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
      tags: ['Chill', 'Relaxing', 'Study'],
      featuredImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'playlist'
    },
    {
      id: '3',
      title: 'Rising Star: Luna Echo',
      content: 'Meet Luna Echo, the electronic artist taking the underground scene by storm...',
      author: 'Artist Relations',
      status: 'draft',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
      tags: ['Artist', 'Electronic', 'Rising'],
      featuredImage: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'artist'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    tags: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  });

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
    setEditForm({
      title: item.title,
      content: item.content,
      tags: item.tags.join(', '),
      featuredImage: item.featuredImage || '',
      status: item.status
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedItem) return;

    const updatedItem: ContentItem = {
      ...selectedItem,
      title: editForm.title,
      content: editForm.content,
      tags: editForm.tags.split(',').map(tag => tag.trim()),
      featuredImage: editForm.featuredImage,
      status: editForm.status,
      updatedAt: new Date()
    };

    setContentItems(items => 
      items.map(item => item.id === selectedItem.id ? updatedItem : item)
    );

    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    setContentItems(items => items.filter(item => item.id !== id));
  };

  const createNewItem = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: 'New Content',
      content: 'Start writing your content here...',
      author: 'Current User',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      type: 'article'
    };

    setContentItems(items => [newItem, ...items]);
    handleEdit(newItem);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-600';
      case 'draft': return 'bg-yellow-600';
      case 'archived': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'playlist': return Database;
      case 'artist': return User;
      case 'album': return Image;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 text-sm mb-4">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300">Dynamic Content Management</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Content Management System
          </h1>
          <p className="text-gray-300 mt-2">
            Manage your website content with a powerful, user-friendly CMS
          </p>
        </div>
        <Button onClick={createNewItem} className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          New Content
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Content Library
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contentItems.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-700/50 ${
                      selectedItem?.id === item.id ? 'ring-2 ring-blue-500 bg-gray-700/50' : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-4 h-4 text-gray-400" />
                        <h4 className="text-white font-medium text-sm truncate">{item.title}</h4>
                      </div>
                      <Badge className={`${getStatusColor(item.status)} text-white text-xs`}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-2 mb-2">
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.author}</span>
                      <span>{item.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Content Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Published</span>
                <Badge className="bg-green-600 text-white">
                  {contentItems.filter(item => item.status === 'published').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Drafts</span>
                <Badge className="bg-yellow-600 text-white">
                  {contentItems.filter(item => item.status === 'draft').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Total</span>
                <Badge className="bg-blue-600 text-white">
                  {contentItems.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Edit className="w-5 h-5 mr-2" />
                    {isEditing ? 'Edit Content' : 'View Content'}
                  </CardTitle>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <>
                        <Button size="sm" onClick={() => handleEdit(selectedItem)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(selectedItem.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-300">Title</Label>
                          <Input
                            value={editForm.title}
                            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Content</Label>
                          <Textarea
                            value={editForm.content}
                            onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white min-h-64"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Tags (comma separated)</Label>
                          <Input
                            value={editForm.tags}
                            onChange={(e) => setEditForm({...editForm, tags: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="tag1, tag2, tag3"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-4">{selectedItem.title}</h2>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {selectedItem.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {selectedItem.updatedAt.toLocaleDateString()}
                            </div>
                            <Badge className={`${getStatusColor(selectedItem.status)} text-white`}>
                              {selectedItem.status}
                            </Badge>
                          </div>
                          {selectedItem.featuredImage && (
                            <img 
                              src={selectedItem.featuredImage} 
                              alt={selectedItem.title}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                          )}
                          <div className="text-gray-300 whitespace-pre-wrap">
                            {selectedItem.content}
                          </div>
                          {selectedItem.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {selectedItem.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="media" className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-300">Featured Image URL</Label>
                          <Input
                            value={editForm.featuredImage}
                            onChange={(e) => setEditForm({...editForm, featuredImage: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">Drag & drop images here or click to upload</p>
                          <Button variant="outline" className="mt-4">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {selectedItem.featuredImage ? (
                          <div>
                            <h4 className="text-white font-medium mb-3">Featured Image</h4>
                            <img 
                              src={selectedItem.featuredImage} 
                              alt={selectedItem.title}
                              className="w-full max-w-md h-48 object-cover rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No media attached</p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-gray-300">Status</Label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm({...editForm, status: e.target.value as any})}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-white font-medium mb-2">Content Type</h4>
                            <Badge variant="outline" className="border-gray-600 text-gray-300 capitalize">
                              {selectedItem.type}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-2">Status</h4>
                            <Badge className={`${getStatusColor(selectedItem.status)} text-white capitalize`}>
                              {selectedItem.status}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-2">Created</h4>
                            <p className="text-gray-400 text-sm">{selectedItem.createdAt.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-2">Last Updated</h4>
                            <p className="text-gray-400 text-sm">{selectedItem.updatedAt.toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select Content to Edit</h3>
                <p className="text-gray-400 mb-4">
                  Choose an item from the content library or create new content
                </p>
                <Button onClick={createNewItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Content
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* CMS Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-green-300 font-semibold mb-2">Dynamic Content</h3>
            <p className="text-green-200 text-sm">
              Real-time content updates with instant preview and publishing
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-blue-300 font-semibold mb-2">Structured Data</h3>
            <p className="text-blue-200 text-sm">
              Organized content types with custom fields and metadata
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <Settings className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-purple-300 font-semibold mb-2">Easy Management</h3>
            <p className="text-purple-200 text-sm">
              User-friendly interface for content creation and management
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}