import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    isDarkMode: false,
    taskInput: '',
    todosFilter: 'all',
    todos: [],
    filteredTodos: {
        active: [],
        completed: []
    }
};

export const reducer = (state, action) => {
    switch (action.type) {

        // Detects and sets the preferred color scheme (light or dark mode)
        case 'SET_DEFAULT_MODE': {
            return {
                ...state,
                isDarkMode: window?.matchMedia('(prefers-color-scheme: dark)').matches
            }
        }

        // Switches the color scheme (light to dark mode, and vice-versa)
        case 'TOGGLE_MODE': {
            return {
                ...state,
                isDarkMode: !state.isDarkMode
            }
        }

        // Controls the value of the task input (when the user is typing)
        case 'UPDATE_TASK_INPUT': {
            return {
                ...state,
                taskInput: action.payload.taskInput
            }
        }

        case 'REORDER_TODOS': {

            if (state.todosFilter === 'all') {

                return {
                    ...state,
                    todos: action.payload.todos
                }
            } else {
                return {
                    ...state,
                    filteredTodos: action.payload.todos
                }
            }
        }

        case 'ADD_NEW_TODO': {
            const taskId = uuidv4();

            const newTodo = { id: taskId, task: state.taskInput.trim(), completed: false };

            return {
                ...state,
                taskInput: '',
                // switches the current filter to ensure the todo is displayed when added
                todosFilter: 'all',
                todos: [...state.todos, newTodo],
                filteredTodos: {
                    ...state.filteredTodos,
                    completed: [...state.filteredTodos.completed, newTodo]
                }
            }
        }

        case 'DELETE_TODO': {
            const { id: todoId } = action.payload;

            const newTodos = state.todos.filter(({ id }) => id !== todoId);

            return {
                ...state,
                todos: newTodos,
                filteredTodos: {
                    ...state.filteredTodos,
                    [state.todosFilter]: newTodos.filter(todo => state.todosFilter === 'completed' ? todo.completed : !todo.completed)
                }
            }
        }

        // Controls which todos are displayed when buttons from the filter menu are clicked
        case 'SET_CURRENT_TODOS': {
            const activeTodos = [];
            const completedTodos = [];

            for (const todo of state.todos) {
                todo.completed ? completedTodos.push(todo) : activeTodos.push(todo);
            }

            return {
                ...state,
                filteredTodos: {
                    ...state.filteredTodos,
                    [state.todosFilter]: state.todosFilter === 'active' ? activeTodos : completedTodos
                }
            }
        }

        case 'TOGGLE_TODO_COMPLETED': {
            const { id: todoId } = action.payload;

            const newTodos = state.todos.map(todo => {
                return todo.id === todoId ? { ...todo, completed: !todo.completed } : todo;
            });

            const activeTodos = [];
            const completedTodos = [];

            for (const todo of newTodos) {
                todo.completed ? completedTodos.push(todo) : activeTodos.push(todo);
            }

            return {
                ...state,
                todos: newTodos,
                filteredTodos: {
                    ...state.filteredTodos,
                    [state.todosFilter]: state.todosFilter === 'active' ? activeTodos : completedTodos
                }
            };
        }

        case 'CLEAR_COMPLETED_TODOS': {
            const activeTodos = state.todos.filter(todo => !todo.completed);

            return {
                ...state,
                todos: activeTodos,
                filteredTodos: {
                    ...state.filteredTodos,
                    completed: []
                }
            }
        }

        case 'FILTER_TODOS': {
            const { filter } = action.payload;

            const filters = ['all', 'active', 'completed'];

            if (filters.includes(filter)) {
                return {
                    ...state,
                    todosFilter: filter
                }
            } else {
                return state;
            }
        }

        // Saves all todos to the browser's memory whenever any todo is modified
        case 'SAVE_TODOS': {
            localStorage.setItem('todos', JSON.stringify(state.todos));

            return state;
        }

        // Retrieves the saved todos from the browser's memory when the app initially loads
        case 'GET_SAVED_TODOS': {
            const savedTodos = JSON.parse(localStorage.getItem('todos'));

            return {
                ...state,
                todos: savedTodos?.length > 0 ? savedTodos : state.todos
            }
        }

        default:
            return state;
    }
}