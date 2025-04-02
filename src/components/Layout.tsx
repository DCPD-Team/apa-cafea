import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/components/AppSidebar.tsx';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={'scroll- flex h-[calc(100%-65px)] flex-1 flex-row overflow-y-hidden'}>
        <SidebarTrigger />
        <div className="flex size-full flex-col overflow-y-scroll pt-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
