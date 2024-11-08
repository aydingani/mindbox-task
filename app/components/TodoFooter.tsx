import { Todo } from '../types'

interface TodoFooterProps {
  todos: Todo[]
  filter: 'All' | 'Active' | 'Completed'
  setFilter: (filter: 'All' | 'Active' | 'Completed') => void
  clearCompleted: () => void
}

export const TodoFooter = ({
  todos,
  filter,
  setFilter,
  clearCompleted,
}: TodoFooterProps) => {
  if (todos.length === 0) return null

  return (
    <div className="px-2 py-2 text-sm text-gray-500 flex items-center justify-between border-t">
      <span>{todos.filter((t) => !t.completed).length} items left</span>
      <div className="space-x-1">
        <button
          onClick={() => setFilter('All')}
          className={`px-2 py-1 rounded ${filter === 'All' ? 'border' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Active')}
          className={`px-2 py-1 rounded ${filter === 'Active' ? 'border' : ''}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={`px-2 py-1 rounded ${
            filter === 'Completed' ? 'border' : ''
          }`}
        >
          Completed
        </button>
      </div>
      <button
        onClick={clearCompleted}
        className="hover:underline"
        data-testid="clear-completed"
      >
        Clear completed
      </button>
    </div>
  )
}
