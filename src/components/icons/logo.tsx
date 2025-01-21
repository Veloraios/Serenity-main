import { type JSX } from 'solid-js';

const Logo = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://i.imgur.com/umJ4R8l.png"
    alt="Logo"
    width="50px"      // Set to a smaller scalable size
    height="50px"     // Set to a smaller scalable size
    style={{ borderRadius: '15px' }}  // Making border radius fully rounded
    {...props}
  />
);

export default Logo;
