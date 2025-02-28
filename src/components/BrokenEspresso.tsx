import React, { useEffect, useState } from 'react';
import { RefreshCw, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

const BrokenEspressoMachineError = () => {
  const [animationState, setAnimationState] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 4);

      if (animationState === 2) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [animationState]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-gray-800">
      <div className="w-full max-w-md rounded-lg p-8 text-center shadow-lg">
        {/* Animated Realistic Espresso Machine */}
        <div className={`mb-6 flex justify-center ${isShaking ? 'animate-pulse' : ''}`}>
          <div className="relative h-56 w-48">
            {/* Machine Base */}
            <div className="absolute bottom-0 left-0 h-10 w-48 rounded-md bg-gray-800"></div>

            {/* Machine Body */}
            <div className="absolute bottom-10 left-4 h-36 w-40 rounded-md bg-gradient-to-r from-gray-700 to-gray-600">
              {/* Front Panel */}
              <div className="absolute bottom-2 left-2 h-20 w-36 rounded-sm bg-gradient-to-b from-gray-600 to-gray-700">
                {/* Drip Tray */}
                <div className="absolute bottom-0 left-2 h-4 w-32 rounded-sm bg-gray-800"></div>

                {/* Cup */}
                {animationState !== 3 && (
                  <div className="left-13 absolute bottom-4 h-12 w-10 rounded-b-lg bg-white"></div>
                )}

                {/* Screen */}
                <div className="absolute left-2 top-2 flex h-6 w-12 items-center justify-center rounded-sm bg-gray-900">
                  <div className={`h-2 w-2 rounded-full ${animationState === 3 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                </div>

                {/* Buttons */}
                <div className="absolute right-3 top-3 flex flex-col space-y-2">
                  <div className="h-2 w-6 rounded-full bg-gray-400"></div>
                  <div className="h-2 w-6 rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>

            {/* Group Head */}
            <div className="bottom-30 absolute left-16 h-12 w-16 rounded-t-md bg-gray-600"></div>

            {/* Water Tank */}
            <div className="absolute bottom-12 right-4 h-24 w-12 rounded-md bg-blue-100 opacity-50"></div>

            {/* Steam Wand */}
            <div className="absolute bottom-24 right-12 h-16 w-2 rotate-45 transform rounded-full bg-gray-500"></div>

            {/* Portafilter */}
            <div className="absolute bottom-20 left-14 h-4 w-20 rounded-md bg-gray-800">
              <div className="absolute bottom-1 left-7 h-6 w-6 rounded-full bg-gray-700"></div>
            </div>

            {/* Steam/Error Effects */}
            {animationState !== 3 && (
              <div className="absolute bottom-36 left-20">
                <div
                  className={`h-4 w-4 rounded-full bg-white opacity-${animationState === 0 ? '80' : animationState === 1 ? '60' : '30'} mb-1`}
                  style={{ transform: `translateY(-${animationState * 6}px)` }}></div>
              </div>
            )}

            {/* Dripping Coffee (broken effect) */}
            {animationState === 2 && <div className="bottom-18 absolute left-20 h-4 w-1 bg-amber-800"></div>}

            {/* Error Sparks */}
            {animationState === 3 && (
              <>
                <div className="absolute bottom-24 left-20 h-2 w-2 rounded-full bg-yellow-300"></div>
                <div className="left-18 bottom-26 absolute h-2 w-2 rounded-full bg-yellow-300"></div>
                <div className="left-22 absolute bottom-28 h-1 w-1 rounded-full bg-yellow-300"></div>
              </>
            )}
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold">Oops! Our Espresso Machine Broke</h1>

        <p className="mb-4 text-lg">
          We're having trouble brewing your request. Our digital baristas are working on fixing the issue.
        </p>

        <div className="mb-4 rounded-md bg-red-600 p-3">
          <p className="text-sm text-red-50">
            <span className="font-semibold">Error:</span> Unable to connect to the server. The espresso machine needs
            maintenance.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button onClick={handleRetry}>
            <RefreshCw size={18} />
            <span>Try Again</span>
          </Button>

          <a
            href="/"
            className="flex items-center justify-center space-x-2 rounded-md border border-gray-300 px-4 py-2 font-medium transition-colors hover:bg-gray-100">
            <span>Back to Homepage</span>
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <Wrench
            size={16}
            className="mr-2"
          />
          <span>Our technicians have been notified</span>
        </div>
      </div>
    </div>
  );
};

export default BrokenEspressoMachineError;