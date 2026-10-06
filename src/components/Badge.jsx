export default function Badge({ tone = 'neutral', children, className = '', ...rest }) {
  return (
    <span className={`badge badge--${tone} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}
