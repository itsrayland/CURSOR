'use client';

import React, { useState, useEffect } from 'react';
import { useWorkstationStore } from '@/lib/store';
import { PromptTemplate } from '@/lib/types';
import { defaultPromptTemplates } from '@/lib/default-templates';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiCopy,
  FiTag,
  FiSearch,
  FiFilter,
  FiFileText
} from 'react-icons/fi';
import { SiOpenai, SiClaude } from 'react-icons/si';
import { MdImageSearch } from 'react-icons/md';

export default function PromptTemplates() {
  const { 
    promptTemplates, 
    addPromptTemplate, 
    selectedPromptId,
    setSelectedPromptId 
  } = useWorkstationStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModel, setFilterModel] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

  // Initialize with default templates if empty
  useEffect(() => {
    if (promptTemplates.length === 0) {
      defaultPromptTemplates.forEach(template => {
        addPromptTemplate(template);
      });
    }
  }, []);

  const getModelIcon = (model: string) => {
    switch (model) {
      case 'claude':
        return <SiClaude className="h-4 w-4" />;
      case 'openai':
        return <SiOpenai className="h-4 w-4" />;
      case 'ulm':
        return <MdImageSearch className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getModelColor = (model: string) => {
    switch (model) {
      case 'claude':
        return 'bg-purple-100 text-purple-800';
      case 'openai':
        return 'bg-green-100 text-green-800';
      case 'ulm':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'prototyping':
        return 'bg-indigo-100 text-indigo-800';
      case 'design':
        return 'bg-pink-100 text-pink-800';
      case 'code':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = promptTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesModel = filterModel === 'all' || template.model === filterModel;
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    
    return matchesSearch && matchesModel && matchesCategory;
  });

  const selectedTemplate = promptTemplates.find(t => t.id === selectedPromptId);

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Templates List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowNewTemplateModal(true)}
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <FiPlus className="mr-2" />
            New Template
          </button>
          
          {/* Search */}
          <div className="mt-4 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" />
              <select
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                className="flex-1 py-1 px-2 border border-gray-300 rounded text-sm"
              >
                <option value="all">All Models</option>
                <option value="claude">Claude</option>
                <option value="openai">OpenAI</option>
                <option value="ulm">ULM</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="flex-1 py-1 px-2 border border-gray-300 rounded text-sm"
              >
                <option value="all">All Categories</option>
                <option value="planning">Planning</option>
                <option value="prototyping">Prototyping</option>
                <option value="design">Design</option>
                <option value="code">Code</option>
              </select>
            </div>
          </div>
        </div>

        {/* Template Cards */}
        <div className="p-4 space-y-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedPromptId(template.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedPromptId === template.id 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModelColor(template.model)}`}>
                  {getModelIcon(template.model)}
                  <span className="ml-1">{template.model}</span>
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                  {template.category}
                </span>
              </div>

              {template.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center text-xs text-gray-600">
                      <FiTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{template.tags.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Template Detail/Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedTemplate ? (
          <TemplateEditor template={selectedTemplate} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FiFileText className="h-12 w-12 mx-auto mb-4" />
              <p>Select a template to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TemplateEditorProps {
  template: PromptTemplate;
}

function TemplateEditor({ template }: TemplateEditorProps) {
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [compiledPrompt, setCompiledPrompt] = useState('');

  useEffect(() => {
    // Initialize parameter values with defaults
    const defaults: Record<string, any> = {};
    template.parameters.forEach(param => {
      defaults[param.name] = param.defaultValue || '';
    });
    setParamValues(defaults);
  }, [template]);

  useEffect(() => {
    // Compile the prompt with current parameter values
    let compiled = template.template;
    Object.entries(paramValues).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      compiled = compiled.replace(regex, value || `{${key}}`);
    });
    setCompiledPrompt(compiled);
  }, [template, paramValues]);

  const handleParamChange = (paramName: string, value: any) => {
    setParamValues(prev => ({ ...prev, [paramName]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(compiledPrompt);
    // You could add a toast notification here
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <FiEdit2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{template.description}</p>
        
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getModelColor(template.model)}`}>
            {getModelIcon(template.model)}
            <span className="ml-1">{template.model}</span>
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(template.category)}`}>
            {template.category}
          </span>
        </div>
      </div>

      {/* Parameters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Parameters</h3>
        <div className="space-y-4">
          {template.parameters.map((param) => (
            <div key={param.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {param.name}
                {param.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <p className="text-xs text-gray-500 mb-2">{param.description}</p>
              
              {param.type === 'select' ? (
                <select
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select...</option>
                  {param.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : param.type === 'number' ? (
                <input
                  type="number"
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : param.type === 'boolean' ? (
                <input
                  type="checkbox"
                  checked={paramValues[param.name] || false}
                  onChange={(e) => handleParamChange(param.name, e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              ) : (
                <input
                  type="text"
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compiled Prompt */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Compiled Prompt</h3>
          <button
            onClick={copyToClipboard}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <FiCopy className="mr-2" />
            Copy
          </button>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          {compiledPrompt}
        </div>
      </div>
    </div>
  );
}

function getModelIcon(model: string) {
  switch (model) {
    case 'claude':
      return <SiClaude className="h-4 w-4" />;
    case 'openai':
      return <SiOpenai className="h-4 w-4" />;
    case 'ulm':
      return <MdImageSearch className="h-4 w-4" />;
    default:
      return null;
  }
}

function getModelColor(model: string) {
  switch (model) {
    case 'claude':
      return 'bg-purple-100 text-purple-800';
    case 'openai':
      return 'bg-green-100 text-green-800';
    case 'ulm':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'planning':
      return 'bg-yellow-100 text-yellow-800';
    case 'prototyping':
      return 'bg-indigo-100 text-indigo-800';
    case 'design':
      return 'bg-pink-100 text-pink-800';
    case 'code':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}