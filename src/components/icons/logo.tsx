import { type JSX } from 'solid-js';

const Logo = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://i.imgur.com/RUhmT7I.jpeg"
    alt="Logo"
    width="0.5em"      // Set to a smaller scalable size
    height="0.5em"     // Set to a smaller scalable size
    style={{ borderRadius: '15px' }}  // Making border radius fully rounded
    {...props}
  />
);

export default Logo;
