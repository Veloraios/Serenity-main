import { type JSX } from 'solid-js';

const Logo = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://i.imgur.com/RUhmT7I.jpeg"
    alt="Logo"
    width="1em"
    height="1em"
    {...props}
  />
);

export default Logo;
