import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Intro from './components/Intro';
import Flowchart from './components/Flowchart';
import Slides from './components/Slides';
import ActionPlan from './components/ActionPlan';
import Notes from './components/Notes';
import Workflows from './components/Workflows';
import { introData } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <Home key="home" onNavigate={handleNavigate} />
          )}
          
          {currentView.startsWith('intro-') && (
            <Intro 
              key={currentView} 
              id={currentView.replace('intro-', '') as keyof typeof introData} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentView === 'view-flowchart' && (
            <Flowchart key="flowchart" />
          )}

          {currentView === 'view-slides' && (
            <Slides key="slides" />
          )}

          {currentView === 'view-actionplan' && (
            <ActionPlan key="actionplan" />
          )}

          {currentView === 'view-workflows' && (
            <Workflows key="workflows" />
          )}

          {currentView === 'view-notes' && (
            <Notes key="notes" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
