import classNames from "classnames";

export default function Button({
  children,
  primary,
  outline,
  rounded,
  secondary,
  success,
  warning,
  info,
  danger,
  disabled,
  ...rest
}) {
  const classes = classNames(
    rest.className,
    "flex gap-2 items-center px-4 py-1.5 border cursor-pointer",
    {
      "bg-blue-500 border-blue-500": primary && !disabled,
      "bg-gray-500 border-gray-500": secondary && !disabled,
      "bg-green-500 border-green-500": success && !disabled,
      "bg-orange-500 border-orange-500": warning && !disabled,
      "bg-indigo-500 border-indigo-500": info && !disabled,
      "bg-red-500 border-red-500": danger && !disabled,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-white":
        !outline &&
        (primary || secondary || success || warning || info || danger),

      "text-blue-500": outline && primary,
      "text-gray-500": outline && success,
      "text-green-500": outline && secondary,
      "text-orange-500": outline && warning,
      "text-indigo-500": outline && info,
      "text-red-500": outline && danger,

      "bg-blue-300 border-blue-300": disabled && primary,
      "bg-gray-300 border-gray-300": disabled && secondary,
      "bg-green-300 border-green-300": disabled && success,
      "bg-orange-300 border-orange-300": disabled && warning,
      "bg-indigo-300 border-indigo-300": disabled && info,
      "bg-red-300 border-red-300": disabled && danger,
    }
  );
  return (
    <div>
      <button {...rest} disabled={disabled} className={classes}>
        {children}
      </button>
    </div>
  );
}
