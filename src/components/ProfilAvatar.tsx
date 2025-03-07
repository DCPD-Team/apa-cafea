import { useAuth } from '@/hooks/useAuth.tsx';
import { useGetAvatarPicture } from '@/hooks/useGetAvatarPicture.tsx';
import { FaFireFlameCurved } from 'react-icons/fa6';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { useNavigate } from 'react-router-dom';

export const ProfilAvatar: React.FC = () => {
  const { user } = useAuth();
  const { data, isLoading, isFetching } = useGetAvatarPicture({ img: 'avatar/sad_coffee_bean.webp' });

  const name = user?.email; // Gets the user’s name
  const isActive = true; // Checks if the flame should appear
  const navigate = useNavigate();

  if (isFetching || isLoading) {
    return null;
  }
  return (
    <div
      className="flex items-center gap-3 rounded-lg p-2 transition hover:cursor-pointer hover:bg-gray-200"
      onClick={() => {
        navigate('/profil');
      }}>
      <div className="relative h-10 w-10">
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <img
              src={data}
              alt="User Avatar"
              className="h-full w-full rounded-full border-2 border-gray-400 shadow-sm"
            />
          </TooltipTrigger>
          <TooltipContent className={'ml-2 rounded-full p-2'}>
            <div className="h-60 rounded-full animate-in">
              <img
                src={data}
                alt="User Avatar"
                className="h-full w-full rounded-full border-2 border-gray-400 shadow-sm"
              />
            </div>
          </TooltipContent>
        </Tooltip>
        {isActive && (
          <FaFireFlameCurved className="absolute -bottom-1 -right-1 h-4 w-4 animate-pulse text-orange-500" />
        )}
      </div>

      <span className="text-sm font-medium text-gray-900">{name}</span>
    </div>
  );
};
