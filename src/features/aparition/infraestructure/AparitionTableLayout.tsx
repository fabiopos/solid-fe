import { ReactNode } from 'react'

function AparitionTableLayout({ children }: {children: ReactNode}) {
  return (
    <div className="grid grid-cols-8 gap-5 p-5">{children}</div>
  )
}

export default AparitionTableLayout