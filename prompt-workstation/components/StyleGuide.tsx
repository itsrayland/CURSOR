'use client';

import React, { useState } from 'react';
import { useWorkstationStore } from '@/lib/store';
import { ColorToken, TypographyScale, StyleGuide as StyleGuideType } from '@/lib/types';
import { 
  FiPlus, 
  FiDownload, 
  FiEdit2,
  FiCopy,
  FiEye,
  FiType,
  FiGrid,
  FiLayers,
  FiTrash2
} from 'react-icons/fi';

export default function StyleGuide() {
  const { styleGuides, currentProject, addStyleGuide } = useWorkstationStore();
  const [activeSection, setActiveSection] = useState<'colors' | 'typography' | 'spacing' | 'preview'>('colors');
  const [editingGuide, setEditingGuide] = useState<Partial<StyleGuideType>>({
    projectName: currentProject?.name || 'New Project',
    colors: [
      { name: 'primary', value: '#6366F1', usage: 'Primary actions and links', category: 'primary' },
      { name: 'primary-dark', value: '#4F46E5', usage: 'Primary hover states', category: 'primary' },
      { name: 'accent', value: '#EC4899', usage: 'Accent elements', category: 'accent' },
      { name: 'neutral-900', value: '#111827', usage: 'Text headings', category: 'neutral' },
      { name: 'neutral-700', value: '#374151', usage: 'Body text', category: 'neutral' },
      { name: 'neutral-100', value: '#F3F4F6', usage: 'Background', category: 'neutral' },
    ],
    typography: {
      fontFamilies: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
        mono: 'Menlo, Monaco, Consolas, monospace'
      },
      sizes: {
        h1: { fontSize: '3rem', lineHeight: '1.2', fontWeight: '800', letterSpacing: '-0.025em' },
        h2: { fontSize: '2.25rem', lineHeight: '1.3', fontWeight: '700', letterSpacing: '-0.02em' },
        h3: { fontSize: '1.875rem', lineHeight: '1.4', fontWeight: '600' },
        h4: { fontSize: '1.5rem', lineHeight: '1.4', fontWeight: '600' },
        h5: { fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '500' },
        h6: { fontSize: '1.125rem', lineHeight: '1.5', fontWeight: '500' },
        body: { fontSize: '1rem', lineHeight: '1.75', fontWeight: '400' },
        caption: { fontSize: '0.875rem', lineHeight: '1.5', fontWeight: '400' }
      }
    },
    spacing: {
      base: 8,
      scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64]
    },
    components: [],
    assets: []
  });

  const sections = [
    { id: 'colors' as const, label: 'Colors', icon: FiLayers },
    { id: 'typography' as const, label: 'Typography', icon: FiType },
    { id: 'spacing' as const, label: 'Spacing', icon: FiGrid },
    { id: 'preview' as const, label: 'Preview', icon: FiEye },
  ];

  const handleColorChange = (index: number, field: keyof ColorToken, value: string) => {
    const newColors = [...(editingGuide.colors || [])];
    newColors[index] = { ...newColors[index], [field]: value };
    setEditingGuide({ ...editingGuide, colors: newColors });
  };

  const addColor = () => {
    const newColors = [...(editingGuide.colors || [])];
    newColors.push({
      name: 'new-color',
      value: '#000000',
      usage: 'Description',
      category: 'neutral'
    });
    setEditingGuide({ ...editingGuide, colors: newColors });
  };

  const removeColor = (index: number) => {
    const newColors = editingGuide.colors?.filter((_, i) => i !== index) || [];
    setEditingGuide({ ...editingGuide, colors: newColors });
  };

  const exportCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editingGuide.projectName?.toLowerCase().replace(/\s+/g, '-')}-tokens.css`;
    a.click();
  };

  const generateCSS = () => {
    let css = `:root {\n`;
    
    // Colors
    css += `  /* Colors */\n`;
    editingGuide.colors?.forEach(color => {
      css += `  --color-${color.name}: ${color.value};\n`;
    });
    
    // Typography
    css += `\n  /* Typography */\n`;
    if (editingGuide.typography) {
      css += `  --font-heading: ${editingGuide.typography.fontFamilies.heading};\n`;
      css += `  --font-body: ${editingGuide.typography.fontFamilies.body};\n`;
      css += `  --font-mono: ${editingGuide.typography.fontFamilies.mono};\n`;
      
      Object.entries(editingGuide.typography.sizes).forEach(([key, value]) => {
        css += `\n  /* ${key} */\n`;
        css += `  --text-${key}-size: ${value.fontSize};\n`;
        css += `  --text-${key}-height: ${value.lineHeight};\n`;
        css += `  --text-${key}-weight: ${value.fontWeight};\n`;
        if (value.letterSpacing) {
          css += `  --text-${key}-spacing: ${value.letterSpacing};\n`;
        }
      });
    }
    
    // Spacing
    css += `\n  /* Spacing */\n`;
    if (editingGuide.spacing) {
      css += `  --space-base: ${editingGuide.spacing.base}px;\n`;
      editingGuide.spacing.scale.forEach((value, index) => {
        css += `  --space-${index}: ${value * (editingGuide.spacing?.base || 8)}px;\n`;
      });
    }
    
    css += `}\n`;
    return css;
  };

  const saveStyleGuide = () => {
    const newGuide: StyleGuideType = {
      id: Date.now().toString(),
      projectName: editingGuide.projectName || 'New Project',
      colors: editingGuide.colors || [],
      typography: editingGuide.typography!,
      spacing: editingGuide.spacing!,
      components: [],
      assets: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    addStyleGuide(newGuide);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Style Guide Designer</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={exportCSS}
                className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <FiDownload className="mr-2 h-4 w-4" />
                Export CSS
              </button>
              <button
                onClick={saveStyleGuide}
                className="flex items-center px-3 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
              >
                <FiPlus className="mr-2 h-4 w-4" />
                Save Guide
              </button>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center px-6 py-3 text-sm font-medium border-b-2 transition-colors
                    ${activeSection === section.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'colors' && (
            <ColorSection 
              colors={editingGuide.colors || []}
              onChange={handleColorChange}
              onAdd={addColor}
              onRemove={removeColor}
            />
          )}
          
          {activeSection === 'typography' && (
            <TypographySection 
              typography={editingGuide.typography!}
              onChange={(typography) => setEditingGuide({ ...editingGuide, typography })}
            />
          )}
          
          {activeSection === 'spacing' && (
            <SpacingSection 
              spacing={editingGuide.spacing!}
              onChange={(spacing) => setEditingGuide({ ...editingGuide, spacing })}
            />
          )}
          
          {activeSection === 'preview' && (
            <PreviewSection styleGuide={editingGuide as StyleGuideType} />
          )}
        </div>
      </div>
    </div>
  );
}

interface ColorSectionProps {
  colors: ColorToken[];
  onChange: (index: number, field: keyof ColorToken, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

function ColorSection({ colors, onChange, onAdd, onRemove }: ColorSectionProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Color Tokens</h3>
        <button
          onClick={onAdd}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <FiPlus className="mr-1" />
          Add Color
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => onChange(index, 'name', e.target.value)}
                    className="font-medium text-sm bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="color"
                    value={color.value}
                    onChange={(e) => onChange(index, 'value', e.target.value)}
                    className="block mt-1 h-6 w-20"
                  />
                </div>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
            
            <input
              type="text"
              value={color.usage}
              onChange={(e) => onChange(index, 'usage', e.target.value)}
              placeholder="Usage description"
              className="w-full text-sm text-gray-600 bg-transparent border-b border-gray-200 focus:border-indigo-500 outline-none"
            />
            
            <select
              value={color.category}
              onChange={(e) => onChange(index, 'category', e.target.value as any)}
              className="mt-2 text-xs bg-white border border-gray-200 rounded px-2 py-1"
            >
              <option value="primary">Primary</option>
              <option value="accent">Accent</option>
              <option value="neutral">Neutral</option>
              <option value="semantic">Semantic</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TypographySectionProps {
  typography: TypographyScale;
  onChange: (typography: TypographyScale) => void;
}

function TypographySection({ typography, onChange }: TypographySectionProps) {
  const handleFontChange = (type: keyof typeof typography.fontFamilies, value: string) => {
    onChange({
      ...typography,
      fontFamilies: { ...typography.fontFamilies, [type]: value }
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Typography Scale</h3>
      
      {/* Font Families */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Font Families</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Heading Font</label>
            <input
              type="text"
              value={typography.fontFamilies.heading}
              onChange={(e) => handleFontChange('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Body Font</label>
            <input
              type="text"
              value={typography.fontFamilies.body}
              onChange={(e) => handleFontChange('body', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Monospace Font</label>
            <input
              type="text"
              value={typography.fontFamilies.mono}
              onChange={(e) => handleFontChange('mono', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Text Styles */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Text Styles</h4>
        <div className="space-y-4">
          {Object.entries(typography.sizes).map(([key, style]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <div 
                className="mb-2"
                style={{
                  fontFamily: key.startsWith('h') ? typography.fontFamilies.heading : typography.fontFamilies.body,
                  fontSize: style.fontSize,
                  lineHeight: style.lineHeight,
                  fontWeight: style.fontWeight,
                  letterSpacing: style.letterSpacing
                }}
              >
                {key.toUpperCase()} - The quick brown fox
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                <div>Size: {style.fontSize}</div>
                <div>Height: {style.lineHeight}</div>
                <div>Weight: {style.fontWeight}</div>
                {style.letterSpacing && <div>Spacing: {style.letterSpacing}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SpacingSectionProps {
  spacing: { base: number; scale: number[] };
  onChange: (spacing: { base: number; scale: number[] }) => void;
}

function SpacingSection({ spacing, onChange }: SpacingSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Spacing System</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base Unit (px)
        </label>
        <input
          type="number"
          value={spacing.base}
          onChange={(e) => onChange({ ...spacing, base: parseInt(e.target.value) || 8 })}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Spacing Scale</h4>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {spacing.scale.map((multiplier, index) => {
            const value = multiplier * spacing.base;
            return (
              <div key={index} className="text-center">
                <div 
                  className="bg-indigo-500 rounded mb-2" 
                  style={{ height: `${Math.min(value, 64)}px`, minHeight: '8px' }}
                />
                <div className="text-xs text-gray-600">
                  <div className="font-medium">{index}</div>
                  <div>{value}px</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface PreviewSectionProps {
  styleGuide: StyleGuideType;
}

function PreviewSection({ styleGuide }: PreviewSectionProps) {
  const [showCode, setShowCode] = useState(false);
  const cssCode = generateCSS();

  function generateCSS() {
    let css = `:root {\n`;
    
    // Colors
    css += `  /* Colors */\n`;
    styleGuide.colors?.forEach(color => {
      css += `  --color-${color.name}: ${color.value};\n`;
    });
    
    // Typography
    css += `\n  /* Typography */\n`;
    if (styleGuide.typography) {
      css += `  --font-heading: ${styleGuide.typography.fontFamilies.heading};\n`;
      css += `  --font-body: ${styleGuide.typography.fontFamilies.body};\n`;
      css += `  --font-mono: ${styleGuide.typography.fontFamilies.mono};\n`;
      
      Object.entries(styleGuide.typography.sizes).forEach(([key, value]) => {
        css += `\n  /* ${key} */\n`;
        css += `  --text-${key}-size: ${value.fontSize};\n`;
        css += `  --text-${key}-height: ${value.lineHeight};\n`;
        css += `  --text-${key}-weight: ${value.fontWeight};\n`;
        if (value.letterSpacing) {
          css += `  --text-${key}-spacing: ${value.letterSpacing};\n`;
        }
      });
    }
    
    // Spacing
    css += `\n  /* Spacing */\n`;
    if (styleGuide.spacing) {
      css += `  --space-base: ${styleGuide.spacing.base}px;\n`;
      styleGuide.spacing.scale.forEach((value, index) => {
        css += `  --space-${index}: ${value * styleGuide.spacing.base}px;\n`;
      });
    }
    
    css += `}\n`;
    return css;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Style Guide Preview</h3>
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <FiCopy className="mr-1" />
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      {showCode ? (
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <pre className="text-sm font-mono overflow-x-auto">{cssCode}</pre>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Color Palette */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Color Palette</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {styleGuide.colors?.map((color, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="h-24 rounded-lg mb-2 border border-gray-200"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="text-sm font-medium">{color.name}</div>
                  <div className="text-xs text-gray-500">{color.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Examples */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Typography Examples</h4>
            <div className="space-y-4">
              {Object.entries(styleGuide.typography?.sizes || {}).map(([key, style]) => (
                <div key={key}>
                  <div 
                    style={{
                      fontFamily: key.startsWith('h') 
                        ? styleGuide.typography?.fontFamilies.heading 
                        : styleGuide.typography?.fontFamilies.body,
                      fontSize: style.fontSize,
                      lineHeight: style.lineHeight,
                      fontWeight: style.fontWeight,
                      letterSpacing: style.letterSpacing
                    }}
                  >
                    {key.toUpperCase()} - The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}