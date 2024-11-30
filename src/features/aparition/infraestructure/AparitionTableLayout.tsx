import { ReactNode } from 'react'

function AparitionTableLayout({ children }: {children: ReactNode}) {
  return (
    <div className="grid grid-cols-9 gap-5 p-5 items-center">{children}</div>
  )
}

export default AparitionTableLayout