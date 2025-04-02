import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Home, Settings } from 'lucide-react';
import { FaArrowUpFromGroundWater, FaFireFlameCurved, FaMoneyBill1, FaPerson } from 'react-icons/fa6';
import { useAuth } from '@/hooks/useAuth.tsx';
import { LuLogOut } from 'react-icons/lu';
import { supabaseClient } from '@/supabase/supabase.ts';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';

const items = [
  {
    title: 'Situatie',
    url: '/situatie',
    icon: Home,
  },
  {
    title: 'Persoane',
    url: '/persoana',
    icon: FaPerson,
  },
  {
    title: 'Leaderboard',
    url: '/leaderboard',
    icon: FaArrowUpFromGroundWater,
  },
  {
    title: 'Cheltuieli',
    url: '/cheltuiala',
    icon: FaMoneyBill1,
  },
];

export function AppSidebar() {
  const { isModerator } = useAuth();
  const { user } = useAuth();
  const { data, isLoading, isFetching } = useGetAvatarPicture();

  const name = user?.email;

  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      navigate('/');
    } else {
      console.error('Error signing out:', error.message);
    }
  };

  if (isFetching || isLoading || !data) {
    return (
      <div className="flex items-center gap-3 rounded-lg p-2 transition hover:cursor-pointer hover:bg-gray-200">
        <div className="relative h-10 w-10">
          <div className="h-10 w-10 rounded-full border-2 border-gray-400 object-cover shadow-sm" />
          <FaFireFlameCurved className="absolute -bottom-1 -right-1 h-4 w-4 animate-pulse text-orange-500" />
        </div>
        <span className="text-sm font-medium text-gray-900" />
      </div>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex h-12 items-center gap-3 rounded-lg p-2 transition hover:cursor-pointer hover:bg-gray-200">
                  <div className="relative h-10 w-10">
                    <img
                      src={data}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full border-2 border-gray-400 object-cover shadow-sm"
                    />
                    <FaFireFlameCurved className="absolute -bottom-1 -right-1 h-4 w-4 animate-pulse text-orange-500" />
                  </div>

                  <span className="text-sm font-medium text-gray-900">{name}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <span>Schimba fotografia de profil</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Meniu</SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isModerator && (
                <SidebarMenuItem key={'Admin Panel'}>
                  <SidebarMenuButton asChild>
                    <Link to={'/admin'}>
                      <Settings />
                      <span>Admin Panel</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarGroupLabel>Delogare</SidebarGroupLabel>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                handleSignOut();
              }}>
              <LuLogOut />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
