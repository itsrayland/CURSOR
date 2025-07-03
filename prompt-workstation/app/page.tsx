'use client';

import { useEffect } from 'react';
import Layout from '@/components/Layout';
import PromptTemplates from '@/components/PromptTemplates';
import StyleGuide from '@/components/StyleGuide';
import { useWorkstationStore } from '@/lib/store';
import { defaultPromptTemplates } from '@/lib/default-templates';

export default function Home() {
  const { activeTab, setCurrentProject, currentProject } = useWorkstationStore();
  
  useEffect(() => {
    // Set a default project if none exists
    if (!currentProject) {
      setCurrentProject({
        id: 'default-project',
        name: 'Darzabi Dashboard',
        client: 'Darzabi',
        description: 'Email marketing dashboard with AI-driven insights',
        workflows: [],
        prompts: defaultPromptTemplates.map(t => t.id),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }, [currentProject, setCurrentProject]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'prompts':
        return <PromptTemplates />;
      case 'workflows':
        return <WorkflowsPlaceholder />;
      case 'style-guide':
        return <StyleGuide />;
      case 'specs':
        return <SpecsPlaceholder />;
      default:
        return <PromptTemplates />;
    }
  };

  return (
    <Layout>
      {renderActiveTab()}
    </Layout>
  );
}

function WorkflowsPlaceholder() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Workflows</h2>
        <p className="text-gray-600 mb-6">
          Create and manage AI-driven workflows that chain multiple prompts together
          for complex design and development tasks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Requirements → Design → Code</h3>
            <p className="text-sm text-gray-600">
              Start with Claude for requirements, move to design specs, then generate code
            </p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Media Analysis → Style Guide</h3>
            <p className="text-sm text-gray-600">
              Analyze brand assets with ULM, then generate a complete style guide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecsPlaceholder() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Generated Specifications</h2>
        <p className="text-gray-600 mb-6">
          View and manage all generated specifications, export them in various formats,
          and track version history.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Dashboard Component Spec v1.2</h3>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Complete component specifications for the Darzabi email dashboard including
              layout, styling, and interaction patterns.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-indigo-600">View</span>
              <span className="text-gray-400">|</span>
              <span className="text-indigo-600">Export</span>
              <span className="text-gray-400">|</span>
              <span className="text-indigo-600">Version History</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
