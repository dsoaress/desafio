import cn from 'classnames'
import { IconType } from 'react-icons'

type AlertProps = {
  message: string
  color: string
  icon: IconType
  className?: string
}

export function Alert({ message, color, icon: Icon, className }: AlertProps) {
  return (
    <div
      className={cn(
        'text-neutral-50 relative text-center p-4 pl-16 flex flex-col items-center justify-center rounded-md',
        className
      )}
      style={{ backgroundColor: color }}
    >
      <div className="absolute top-0 bottom-1/2 left-4 translate-y-1/2 ">
        <Icon size={26} />
      </div>

      <span dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  )
}
