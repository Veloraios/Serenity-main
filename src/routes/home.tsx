import { useNavigate } from '@solidjs/router';
import Button from '~/components/button';

export const showInHeader = true;
export const headerOrder = 1;
export const title = 'Home';
export const path = '/';

export function Page() {
  const navigate = useNavigate();

  return (
    <div id='home-page' class='relative w-full pt-32 min-h-dvh'>
      <div class='relative items-center gap-6 flex flex-col h-[100vh] w-full'>
        <div class='mt-20 md:mt-32 relative gap-4 md:gap-6 slide-in-from-bottom-36 zoom-in-90 animate-in duration-700 fade-in w-full items-center flex flex-col after:absolute after:z-10 after:bg-[linear-gradient(to_bottom,transparent_40%,hsl(var(--bg)/0.75)_60%,hsl(var(--bg)/1)_90%)] after:inset-0 after:pointer-events-none'>
          <div class='flex text-center items-center flex-col gap-2'>
            <h1 class='text-5xl lg:text-6xl text-center font-secondary font-bold bg-gradient-to-br from-primary-fg to-secondary-fg bg-clip-text text-transparent z-10'>
              Serenity
            </h1>
            <h2 class='text-2xl lg:text-4xl text-center font-secondary font-semibold bg-gradient-to-br from-primary-fg to-secondary-fg bg-clip-text text-transparent z-10'>
              Apps/Games Without Limits
            </h2>
          </div>
          <div class='flex gap-4'>
            <Button class='min-w-40' variant='cta'>
              Install
            </Button>
            <Button class='min-w-40' variant='opposite' onClick={() => navigate('https://docs.unbound.rip')} asChild>
              <a class='pointer-events-none' href='https://docs.unbound.rip'>
                Documentation
              </a>
            </Button>
          </div>
          <img class='z-0 max-h-dvh mt-16 md:mt-0' src='/img/IMG_3530.png' />
        </div>

        {/* New section added below */}
        <div class='mt-16 md:mt-32 relative gap-4 md:gap-6 slide-in-from-bottom-36 zoom-in-90 animate-in duration-700 fade-in w-full items-center flex flex-col px-4 md:px-8'>
          <h3 class='text-3xl lg:text-5xl font-secondary font-bold text-center'>
            Stay Informed
          </h3>
          <p class='text-lg lg:text-2xl text-center font-secondary font-medium'>
            The latest Apple and sideloading news, delivered to you via the Serenity App. Browse news articles without leaving the app.
          </p>
          <img class='mt-8 max-w-full md:max-w-[500px] mx-auto' src='/img/image05.png' alt='Stay Informed Image' />
        </div>
      </div>
    </div>
  );
}

