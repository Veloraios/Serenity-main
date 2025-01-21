import { type JSX } from 'solid-js';

const Logo = (props: JSX.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="https://i.imgur.com/UPVTwlN.png"
    alt="Logo"
    width="50px"      // Set to a smaller scalable size
    height="50px"     // Set to a smaller scalable size
    style={{
      transform: 'scale(0.8)', // Zoom out by scaling to 80% of original size
      transformOrigin: 'center', // Ensures the scaling happens from the center
    }}
    {...props}
  />
);

export default Logo;
