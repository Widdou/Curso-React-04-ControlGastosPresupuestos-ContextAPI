
type ErrorMessageProps = {
  children : React.ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-600 p-2 text-white text-sm text-center">
      {children}
    </p>
  )
}
