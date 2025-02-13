import { type JSX, Show, createSignal, For, onMount, createEffect, onCleanup, createMemo } from 'solid-js';
import { FiMenu, FiHome, FiList, FiCode, FiArchive } from 'solid-icons/fi';
import useBreakpoint from '~/components/hooks/useBreakpoint';
import { useLocation, useNavigate } from '@solidjs/router';
import NavigationMenu from '~/components/navigation-menu';
import { animated, createSpring } from 'solid-spring';
import Separator from '~/components/separator';
import Account from '~/components/account';
import { TbPuzzle } from 'solid-icons/tb';
import { FaRegularNewspaper } from 'solid-icons/fa'
import { Logo } from '~/components/icons';
import Button from '~/components/button';
import * as Routes from '~/routes';
import { cn } from '~/utilities';

const routes = Object.values(Routes).filter(r => r.showInHeader).sort((a, b) => a.headerOrder - b.headerOrder);

function Header(props: JSX.HTMLAttributes<HTMLDivElement>) {
	const [expandedElement, setExpandedElement] = createSignal<HTMLAnchorElement | null>(null);
	const [element, setElement] = createSignal<HTMLAnchorElement | null>(null);
	const [hovered, setHovered] = createSignal<HTMLAnchorElement | null>(null);
	const [isFirstRender, setFirstRender] = createSignal(true);
	const [navOpen, setNavOpen] = createSignal(false);
	const isMedium = useBreakpoint('md');
	const location = useLocation();
	const navigate = useNavigate();

	const routeIndex = createMemo(() => routes.findIndex(r => r.path === location.pathname));
	const hoveredRouteIndex = createMemo(() => routes.findIndex(r => r.path === (hovered()?.getAttribute('data-path'))));

	const animation = createSpring(() => ({
		display: 'none',
		hovered: 0,
		left: 0,
		height: 0,
		width: 0,
		config: {
			easing: (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
		}
	}));

	function animate(immediate: boolean = false) {
		if (!isMedium() || hoveredRouteIndex() === -1 && routeIndex() === -1) {
			animation().display.set('none');
			return;
		} else if (hoveredRouteIndex() !== -1 || routeIndex() !== -1) {
			animation().display.set('block');
		};

		if (hovered()) {
			const { left, height, width } = hovered()!.getBoundingClientRect();

			const container = hovered()!.parentElement!.getBoundingClientRect();

			animation().left[isFirstRender() || immediate ? 'set' : 'start'](left - container.left);
			animation().height[isFirstRender() || immediate ? 'set' : 'start'](height);
			animation().width[isFirstRender() || immediate ? 'set' : 'start'](width);
		} else {
			const child = element()?.children[routeIndex()];
			if (!child) return;

			const container = element()!.getBoundingClientRect();
			const { left, height, width } = child.getBoundingClientRect();

			animation().left[isFirstRender() || immediate ? 'set' : 'start'](left - container.left);
			animation().height[isFirstRender() || immediate ? 'set' : 'start'](height);
			animation().width[isFirstRender() || immediate ? 'set' : 'start'](width);
		}
	}

	createEffect(() => {
		console.log(expandedElement());
	});

	createEffect(() => void animate());

	function onResize() {
		animate(true);
	}

	onMount(() => {
		window.addEventListener('resize', onResize);
		setFirstRender(false);
	});

	onCleanup(() => {
		window.removeEventListener('resize', onResize);
	});

	return <div class='flex flex-col items-center'>
		<div id='header' class={cn('fixed mx-auto px-6 lg:px-0 w-full lg:w-auto mt-6 justify-center z-20 flex items-center pointer-events-none', props.class)}>
			<div class={cn('flex flex-col w-full h-full px-5 shadow-topBorder border bg-gradient-to-b from-primary/75 pointer-events-auto to-secondary/75 backdrop-blur-md text-secondary-fg rounded-3xl')}>
				<div class='flex items-center gap-4'>
					<Logo class='size-16 hover:scale-110 transition-all text-opposite cursor-pointer duration-300' onClick={() => navigate('/')} />
					<Separator orientation='vertical' class='h-5 hidden sm:flex' />
					<div class='relative'>
						<animated.div
							class='pointer-events-none bg-opposite/5 rounded-lg px-4 py-3 font-semibold hidden md:block absolute'
							style={animation()}/>
						<NavigationMenu.Root ref={setElement} onMouseLeave={() => setHovered(null)} class='hidden md:flex gap-2'>
							<For each={routes}>
								{(route) => <NavigationMenu.Item
									class={cn('text-secondary-fg hover:text-primary-fg relative', route.path === location.pathname && 'text-primary-fg')}
									onMouseEnter={(event) => setHovered(event.target as HTMLAnchorElement)}
									data-path={route.path}
									href={route.path}
									onClick={e => (e.preventDefault(), navigate(route.path))}
								>
									{route.title}
								</NavigationMenu.Item>}
							</For>
						</NavigationMenu.Root>
					</div>
					<div class='flex justify-center items-center ml-auto lg:ml-96 gap-2'>
						{/* <DropdownMenu.Root flip>
							<DropdownMenu.Trigger
								as={(props: JSX.IntrinsicAttributes & ButtonProps) => <Button {...props} class='rounded-md' variant='outline' size='icon'>
									<Switch>
										<Match when={themes.theme === 'light'}>
											<FiSun size={16} />
										</Match>
										<Match when={themes.theme === 'dark'}>
											<FiMoon size={16} />
										</Match>
										<Match when={themes.theme === 'system'}>
											<FiMonitor size={16} />
										</Match>
									</Switch>
								</Button>}
							/>
							<DropdownMenu.Portal>
								<DropdownMenu.Content>
									<DropdownMenu.Item class='flex shrink-0 items-center min-w-28' onSelect={() => setTheme('light')}>
										Light
										<Show when={themes.theme === 'light'}>
											<FiCheck class='ml-auto' size={16} />
										</Show>
									</DropdownMenu.Item>
									<DropdownMenu.Item class='flex shrink-0 items-center min-w-28' onSelect={() => setTheme('dark')}>
										Dark
										<Show when={themes.theme === 'dark'}>
											<FiCheck class='ml-auto' size={16} />
										</Show>
									</DropdownMenu.Item>
									<DropdownMenu.Item class='flex shrink-0 items-center min-w-28' onSelect={() => setTheme('system')}>
										System
										<Show when={themes.theme === 'system'}>
											<FiCheck class='ml-auto' size={16} />
										</Show>
									</DropdownMenu.Item>
									<DropdownMenu.Arrow />
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root> */}
						
						<Button onClick={() => setNavOpen(!navOpen())} variant='outline' size='icon' class='flex rounded-xl md:hidden'>
							<FiMenu size={16} />
						</Button>
					</div>
				</div>
				<Show when={navOpen() && !isMedium()}>
					<Separator class='w-full my-0' />
					<div ref={setExpandedElement} class='flex flex-col w-full justify-center shadow-sm py-4'>
						<NavigationMenu.Item
							class={cn('flex items-center justify-start gap-6 text-base text-secondary-fg font-normal', location.pathname === '/' && 'text-primary-fg font-bold')}
							href='/'
							onClick={e => (e.preventDefault(), navigate('/'))}
						>
							<FiHome size={20} /> Home
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={cn('flex items-center justify-start gap-6 text-base text-secondary-fg font-normal', location.pathname === '/repository' && 'text-primary-fg font-bold')}
							href='/repository'
							onClick={e => (e.preventDefault(), navigate('/repository'))}
						>
							<FiArchive size={20} /> Repository
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={cn('flex items-center justify-start gap-6 text-base text-secondary-fg font-normal', location.pathname === '/updates' && 'text-primary-fg font-bold')}
							href='/updates'
							onClick={e => (e.preventDefault(), navigate('/updates'))}
						>
							<FaRegularNewspaper size={20} /> Patches/Updates
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={cn('flex items-center justify-start gap-6 text-base text-secondary-fg font-normal', location.pathname === '/developers' && 'text-primary-fg font-bold')}
							href='/developers'
							onClick={e => (e.preventDefault(), navigate('/developers'))}
						>
							<FiCode size={20} /> Developers
						</NavigationMenu.Item>
						<NavigationMenu.Item
							class={cn('flex items-center justify-start gap-6 text-base text-secondary-fg font-normal', location.pathname === '/faq' && 'text-primary-fg font-bold')}
							href='/faq'
							onClick={e => (e.preventDefault(), navigate('/faq'))}
						>
							<FiList size={20} /> FAQ
						</NavigationMenu.Item>
					</div>
				</Show>
			</div>
		</div>
	</div>;
}

export default Header;