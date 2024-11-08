import { render, fireEvent, screen } from '@testing-library/react'
import TodoApp from '@/app/page'
import { TodoItem } from '@/app/components/TodoItem'
import { TodoFooter } from '@/app/components/TodoFooter'
import '@testing-library/jest-dom'

describe('TodoApp', () => {
  it('adds a new todo', () => {
    render(<TodoApp />)
    const input = screen.getByTestId('todo-input')
    fireEvent.change(input, { target: { value: 'Learn React' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('toggles a todo', () => {
    render(<TodoApp />)
    const input = screen.getByTestId('todo-input')
    fireEvent.change(input, { target: { value: 'Learn React' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
    const toggleButton = screen.getByTestId('todo-toggle')
    fireEvent.click(toggleButton)
    expect(screen.getByText('Learn React')).toHaveClass('line-through')
  })

  it('filters todos', () => {
    render(<TodoApp />)
    const input = screen.getByTestId('todo-input')
    fireEvent.change(input, { target: { value: 'Learn React' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
    fireEvent.change(input, { target: { value: 'Write tests' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
    const activeButton = screen.getByText('Active')
    fireEvent.click(activeButton)
    expect(screen.getByText('Learn React')).toBeInTheDocument()
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })
})

describe('TodoItem', () => {
  it('displays a todo', () => {
    render(
      <TodoItem
        todo={{ id: 1, text: 'Learn React', completed: false }}
        toggleTodo={() => {}}
      />
    )
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('toggles a todo', () => {
    const toggleTodo = jest.fn()
    render(
      <TodoItem
        todo={{ id: 1, text: 'Learn React', completed: false }}
        toggleTodo={toggleTodo}
      />
    )
    const toggleButton = screen.getByTestId('todo-toggle')
    fireEvent.click(toggleButton)
    expect(toggleTodo).toHaveBeenCalledWith(1)
  })
})

describe('TodoFooter', () => {
  it('displays the correct number of active todos', () => {
    render(
      <TodoFooter
        todos={[
          { id: 1, text: 'Learn React', completed: false },
          { id: 2, text: 'Write tests', completed: true },
        ]}
        filter="All"
        setFilter={() => {}}
        clearCompleted={() => {}}
      />
    )
    expect(screen.getByText('1 items left')).toBeInTheDocument()
  })

  it('clears completed todos', () => {
    const clearCompleted = jest.fn()
    render(
      <TodoFooter
        todos={[
          { id: 1, text: 'Learn React', completed: false },
          { id: 2, text: 'Write tests', completed: true },
        ]}
        filter="All"
        setFilter={() => {}}
        clearCompleted={clearCompleted}
      />
    )
    const clearCompletedButton = screen.getByTestId('clear-completed')
    fireEvent.click(clearCompletedButton)
    expect(clearCompleted).toHaveBeenCalled()
  })
})
