import { Link } from 'react-router-dom'
import '../../styles/animatedLink.css'

export default function AnimatedLink({ to, href, children, className = '', ...props }) {
  const classes = `animated-link ${className}`

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
