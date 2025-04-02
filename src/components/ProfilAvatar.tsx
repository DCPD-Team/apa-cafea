import { useAuth } from '@/hooks/useAuth.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';
import { FaFireFlameCurved } from 'react-icons/fa6';
import { SidebarMenuButton } from '@/components/ui/sidebar.tsx';

export const ProfilAvatar: React.FC = () => {
  const { user } = useAuth();
  const { data, isLoading, isFetching } = useGetAvatarPicture();

  const name = user?.email;

  if (isFetching || isLoading || !data) {
    return (
      <SidebarMenuButton className="flex h-12 items-center gap-3 rounded-lg p-2 transition hover:cursor-pointer hover:bg-gray-200">
        <div className="relative h-10 w-10">
          <div className="h-10 w-10 rounded-full border-2 border-gray-400 object-cover shadow-sm" />
          <FaFireFlameCurved className="absolute -bottom-1 -right-1 h-4 w-4 animate-pulse text-orange-500" />
        </div>
        <span className="text-sm font-medium text-gray-900" />
      </SidebarMenuButton>
    );
  }
  return (
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
  );
};
