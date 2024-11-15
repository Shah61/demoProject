'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Wand2, 
  RotateCw, 
  Download, 
  Share2, 
  Shirt, 
  Type, 
  Image,
  Layers,
  Move,
  Trash2,
  Home,
  FolderOpen,
  Layout,
  Grid,
  Star,
  Plus,
  Search,
  Palette,
  X,
  ChevronRight
} from 'lucide-react';

// Types
type ShirtArea = {
  id: string;
  name: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

type DesignElement = {
  id: number;
  areaId: string;
  prompt: string;
  image: string;
  properties: {
    opacity: number;
    scale: number;
    rotation: number;
    removeBackground: boolean;
    brightness: number;
    contrast: number;
  };
};

// NavButton Component
const NavButton = ({ icon, label, active, onClick, badge }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) => (
  <button
    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 relative group ${
      active ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {icon}
    {badge && (
      <span className="absolute top-0 right-0 bg-yellow-400 text-xs px-1 rounded-full">
        {badge}
      </span>
    )}
    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </button>
);

const DesignStudio = () => {
  // States
  const [activeNav, setActiveNav] = useState('home');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [designElements, setDesignElements] = useState<DesignElement[]>([]);
  const [activeElement, setActiveElement] = useState<number | null>(null);
  
  const [designState, setDesignState] = useState({
    prompt: '',
    isGenerating: false,
  });

  // Available areas for design placement
  const shirtAreas: ShirtArea[] = [
    { id: 'chest', name: 'Chest', top: '30%', left: '50%', width: '150px', height: '150px' },
    { id: 'back', name: 'Back', top: '30%', left: '50%', width: '150px', height: '150px' },
    { id: 'leftSleeve', name: 'Left Sleeve', top: '35%', left: '20%', width: '80px', height: '100px' },
    { id: 'rightSleeve', name: 'Right Sleeve', top: '35%', left: '80%', width: '80px', height: '100px' },
    { id: 'pocket', name: 'Pocket', top: '25%', left: '35%', width: '60px', height: '70px' },
  ];
  // Generate design for selected area
  const handleGenerate = async () => {
    if (!selectedArea || !designState.prompt) return;
    
    setDesignState(prev => ({ ...prev, isGenerating: true }));
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add new design element
    const newElement = {
      id: Date.now(),
      areaId: selectedArea,
      prompt: designState.prompt,
      image: 'https://placehold.co/200x200', // Placeholder image
      properties: {
        opacity: 100,
        scale: 100,
        rotation: 0,
        removeBackground: false,
        brightness: 100,
        contrast: 100,
      }
    };
    
    setDesignElements(prev => [...prev, newElement]);
    setActiveElement(newElement.id);
    setDesignState(prev => ({ ...prev, isGenerating: false, prompt: '' }));
  };

  // Update element properties
  const updateElementProperty = (elementId: number, property: string, value: number | boolean) => {
    setDesignElements(prev => prev.map(element => 
      element.id === elementId 
        ? { ...element, properties: { ...element.properties, [property]: value }} 
        : element
    ));
  };

  // Delete active element
  const deleteActiveElement = () => {
    if (!activeElement) return;
    setDesignElements(prev => prev.filter(element => element.id !== activeElement));
    setActiveElement(null);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Navigation Bar */}
      <div className="w-16 bg-white border-r flex flex-col items-center py-4">
        <NavButton 
          icon={<Home />} 
          label="Home"
          active={activeNav === 'home'}
          onClick={() => setActiveNav('home')}
        />
        <NavButton 
          icon={<FolderOpen />} 
          label="Projects"
          active={activeNav === 'projects'}
          onClick={() => setActiveNav('projects')}
        />
        <NavButton 
          icon={<Layout />} 
          label="Templates"
          active={activeNav === 'templates'}
          onClick={() => setActiveNav('templates')}
        />
        <NavButton 
          icon={<Star />} 
          label="Brand"
          active={activeNav === 'brand'}
          onClick={() => setActiveNav('brand')}
          badge="New"
        />
        <NavButton 
          icon={<Grid />} 
          label="Apps"
          active={activeNav === 'apps'}
          onClick={() => setActiveNav('apps')}
        />
        <NavButton 
          icon={<Wand2 />} 
          label="Dream Lab"
          active={activeNav === 'dreamlab'}
          onClick={() => setActiveNav('dreamlab')}
        />
        <div className="mt-auto">
          <NavButton 
            icon={<Trash2 />} 
            label="Trash"
            active={activeNav === 'trash'}
            onClick={() => setActiveNav('trash')}
          />
        </div>
      </div>
      {/* Secondary Navigation */}
      <div className="w-64 bg-white border-r overflow-y-auto">
        <div className="p-4">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Create a design
          </button>
        </div>

        {/* Pro Trial Banner */}
        <div className="mx-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Try Pro</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Enjoy all our premium features, free for 30 days.
          </p>
          <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm hover:bg-gray-50">
            Start your free trial
          </button>
        </div>

        {/* Areas Selection */}
        <div className="px-4 py-3">
          <h3 className="text-sm font-medium mb-2">Design Areas</h3>
          <div className="space-y-2">
            {shirtAreas.map(area => (
              <Button
                key={area.id}
                variant={selectedArea === area.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedArea(area.id)}
              >
                <Shirt className="h-4 w-4 mr-2" />
                {area.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent designs */}
        <div className="px-4 py-3 border-t">
          <h3 className="text-sm font-medium mb-2">Recent designs</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                <div>
                  <div className="text-sm">Design {item}</div>
                  <div className="text-xs text-gray-500">Modified today</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Design Canvas */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center relative">
            {/* Shirt Base */}
            <div className="relative">
              <Shirt className="h-96 w-96 text-gray-300" />
              
              {/* Design Areas */}
              {shirtAreas.map(area => (
                <div
                  key={area.id}
                  className={`absolute border-2 rounded-md transition-all ${
                    selectedArea === area.id ? 'border-blue-500' : 'border-dashed border-gray-300'
                  }`}
                  style={{
                    top: area.top,
                    left: area.left,
                    width: area.width,
                    height: area.height,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedArea(area.id)}
                />
              ))}
              {/* Design Elements */}
              {designElements.map(element => {
                const area = shirtAreas.find(area => area.id === element.areaId);
                return (
                  <div
                    key={element.id}
                    className={`absolute transition-all ${
                      activeElement === element.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    style={{
                      top: area?.top || '0',
                      left: area?.left || '0',
                      transform: `translate(-50%, -50%) 
                        scale(${element.properties.scale / 100}) 
                        rotate(${element.properties.rotation}deg)`,
                      opacity: element.properties.opacity / 100,
                      cursor: 'pointer',
                      filter: `brightness(${element.properties.brightness}%) contrast(${element.properties.contrast}%)`
                    }}
                    onClick={() => setActiveElement(element.id)}
                  >
                    <img
                      src={element.image}
                      alt={element.prompt}
                      className="max-w-full h-auto"
                      style={{
                        width: area?.width || '100px',
                        height: 'auto'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l bg-white p-4 overflow-y-auto">
          <Tabs defaultValue="design">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
              <TabsTrigger value="adjust" className="flex-1">Adjust</TabsTrigger>
            </TabsList>

            <TabsContent value="design">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Generate for: {shirtAreas.find(area => area.id === selectedArea)?.name || 'Select an area'}
                  </label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Describe your design..."
                      value={designState.prompt}
                      onChange={(e) => setDesignState(prev => ({ ...prev, prompt: e.target.value }))}
                    />
                    <Button 
                      className="w-full"
                      onClick={handleGenerate}
                      disabled={!selectedArea || !designState.prompt || designState.isGenerating}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Design
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="adjust">
              {activeElement ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Opacity</label>
                    <Slider
                      value={[designElements.find(el => el.id === activeElement)?.properties.opacity || 100]}
                      onValueChange={([value]) => updateElementProperty(activeElement, 'opacity', value)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Scale</label>
                    <Slider
                      value={[designElements.find(el => el.id === activeElement)?.properties.scale || 100]}
                      onValueChange={([value]) => updateElementProperty(activeElement, 'scale', value)}
                      min={50}
                      max={150}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rotation</label>
                    <Slider
                      value={[designElements.find(el => el.id === activeElement)?.properties.rotation || 0]}
                      onValueChange={([value]) => updateElementProperty(activeElement, 'rotation', value)}
                      min={-180}
                      max={180}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Brightness</label>
                    <Slider
                      value={[designElements.find(el => el.id === activeElement)?.properties.brightness || 100]}
                      onValueChange={([value]) => updateElementProperty(activeElement, 'brightness', value)}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Contrast</label>
                    <Slider
                      value={[designElements.find(el => el.id === activeElement)?.properties.contrast || 100]}
                      onValueChange={([value]) => updateElementProperty(activeElement, 'contrast', value)}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Remove Background</span>
                    <Switch
                      checked={designElements.find(el => el.id === activeElement)?.properties.removeBackground}
                      onCheckedChange={(checked) => updateElementProperty(activeElement, 'removeBackground', checked)}
                    />
                  </div>

                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={deleteActiveElement}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Element
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select a design element to adjust its properties
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;