import { type JSX } from 'solid-js';

const Logo = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://i.imgur.com/RUhmT7I.jpeg"
    alt="Logo"
    width="2em"      // Adjusted to be scalable based on the font size
    height="2em"     // Adjusted to be scalable based on the font size
    style={{ borderRadius: '15px' }}  // Adding border radius
    {...props}
  />
);

export default Logo;
