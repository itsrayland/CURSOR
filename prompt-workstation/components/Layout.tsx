'use client';

import React from 'react';
import { useWorkstationStore } from '@/lib/store';
import { 
  FiFileText, 
  FiGitBranch, 
  FiLayers, 
  FiCode,
  FiSettings,
  FiFolder
} from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { activeTab, setActiveTab, currentProject } = useWorkstationStore();

  const tabs = [
    { id: 'prompts' as const, label: 'Prompt Templates', icon: FiFileText },
    { id: 'workflows' as const, label: 'Workflows', icon: FiGitBranch },
    { id: 'style-guide' as const, label: 'Style Guide', icon: FiLayers },
    { id: 'specs' as const, label: 'Generated Specs', icon: FiCode },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                AI Prompt Workstation
              </h1>
              {currentProject && (
                <div className="ml-4 flex items-center text-sm text-gray-500">
                  <FiFolder className="mr-1" />
                  <span>{currentProject.name}</span>
                </div>
              )}
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <FiSettings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}