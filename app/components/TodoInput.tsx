import { useEffect, useRef } from 'react'

interface TodoInputProps {
  newTodo: string
  setNewTodo: (value: string) => void
  addTodo: () => void
}

export const TodoInput = ({ newTodo, setNewTodo, addTodo }: TodoInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="border-b">
      <input
        ref={inputRef}
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        className="w-full px-6 py-4 text-2xl font-light focus:outline-none"
        data-testid="todo-input"
      />
    </div>
  )
}
