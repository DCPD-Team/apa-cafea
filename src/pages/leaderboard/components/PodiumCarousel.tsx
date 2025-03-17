import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PodiumEntry = {
  nume: string;
  valoare: number;
  imageUrl?: string;
};

type Props = {
  podiumData: PodiumEntry[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
};

const PodiumCarousel: React.FC<Props> = ({ podiumData, activeIndex, onNext, onPrev }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="flex w-full flex-col justify-center rounded-lg bg-white p-6 shadow-lg">
        <div className="relative flex w-full flex-col items-center">
          <motion.img
            key={activeIndex}
            src={podiumData[activeIndex].imageUrl}
            alt={podiumData[activeIndex].nume}
            className="h-36 w-36 rounded-full shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <h3 className="mt-4 text-lg font-semibold">{podiumData[activeIndex].nume}</h3>
          <p className="text-gray-500">Score: {podiumData[activeIndex].valoare}</p>
        </div>

        <div className="flex justify-between px-4">
          <button
            onClick={onPrev}
            className="rounded-full bg-gray-200 p-2 hover:bg-gray-300">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={onNext}
            className="rounded-full bg-gray-200 p-2 hover:bg-gray-300">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PodiumCarousel;
