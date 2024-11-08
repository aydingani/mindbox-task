import { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: number) => void
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  return (
    <div className="flex items-center px-2 py-3 group" data-testid="todo-item">
      <button
        onClick={() => toggleTodo(todo.id)}
        className="w-8 h-8 flex items-center justify-center"
        data-testid="todo-toggle"
      >
        {todo.completed ? (
          <div className="w-6 h-6 border-2 rounded-full border-gray-300 flex items-center justify-center text-green-500">
            ✓
          </div>
        ) : (
          <div className="w-6 h-6 border-2 rounded-full border-gray-300" />
        )}
      </button>
      <span
        className={`flex-1 px-4 text-xl ${
          todo.completed ? 'text-gray-300 line-through' : ''
        }`}
      >
        {todo.text}
      </span>
    </div>
  )
}
