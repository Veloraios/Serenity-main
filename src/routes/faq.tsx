import Accordion from '~/components/accordion';

export const showInHeader = true;
export const headerOrder = 5;
export const title = 'FAQ';
export const path = '/faq';

export function Page() {
	return <div class='container mt-32'>
		<Accordion.Root multiple={false} collapsible class='w-full'>
			<Accordion.Item value='item-1'>
				<Accordion.Trigger>Is Unbound against Discord's ToS?</Accordion.Trigger>
				<Accordion.Content>Yes. However, Discord have never taken action against users using client modifications.</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value='item-2'>
				<Accordion.Trigger>Is Serenity a Rat?</Accordion.Trigger>
				<Accordion.Content>
					No, why would we add Malware to our App? Think about it, the only way we get Money is from Selling Serenity Deluxe or Some of its Features, and it is possible with the Stripe API, so you purchase through stripe. Web APIs also only allow to fetch stuff like IP/Device Model/iOS Which Serenity doesn't do. But you can use a VPN if you don't trust it.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value='item-3'>
				<Accordion.Trigger>What Coding Languages was Serenity made out of</Accordion.Trigger>
				<Accordion.Content>
					For the App we have: HTML CSS JS, NPM JS (HTML CSS JS is for Functions and UI, NPM Js is for important APIS Such as Signing/iPA Parsing) For Documentation Page: MDX, Typescript. For Download Page: Typescript, React.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>;
}
