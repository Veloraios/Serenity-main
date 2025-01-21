import { type JSX } from 'solid-js';

const Logo = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://i.imgur.com/UPVTwlN.png"
    alt="Logo"
    width="50px"      // Set to a smaller scalable size
    height="50px"     // Set to a smaller scalable size
    {...props}
  />
);

export default Logo;
