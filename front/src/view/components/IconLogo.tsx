import logo from '../../../public/icon-logo.png';

interface LogoProps {
  className?: string
}

export function IconLogo({ className }: LogoProps) {
  return (
    <img src={logo} alt="" className={className} />
  )
}
