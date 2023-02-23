import { useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

const Form = styled.form`
    background: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray};
    border-radius: .5em;
    position: relative;
    padding: 0 1.25em;

    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: .75em;

    
    .form__input {
        background: transparent;
        border: none;
        outline: none;
        padding: 1em .75em;
        font-size: 1rem;
        width: 100%;
        color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.lightGrayishBlue : theme.colors.light.veryDarkGrayishBlue};
        
        /* Removes default background when an autocomplete is used on the input */
        &:-webkit-autofill {
            
            &,
            &:hover,
            &:focus {
                -webkit-text-fill-color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.lightGrayishBlue : theme.colors.light.veryDarkGrayishBlue};
                transition: background-color 5000s ease-in-out 0s;
            }
        }
    }

    .form__btn {
        border: 0.075em solid ${({ theme }) => theme.colors.dark.veryDarkGrayishBlue};
        height: 1.25em;
        width: 1.25em;
        border-radius: 50%;

        /* Rounded border gradient effect */
        &:hover,
        &:focus {
            /* Added extra border-width for light mode so as it make it more prominent */
            border:${({ theme }) => theme.isDarkMode ? '.015em' : '.125em'} double transparent;
            background-image: linear-gradient(
                ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray}, 
                ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray}),
                ${({ theme }) => theme.colors.checkBackground};
            background-origin: border-box;
            background-clip: padding-box, border-box;
            outline: none;
            padding: .25em;
        }
    }
`;

const AddTodo = () => {
    const { state: { taskInput }, dispatch } = useContext(AppContext);

    const updateTaskInput = ({ target }) => {
        dispatch({ type: 'UPDATE_TASK_INPUT', payload: { taskInput: target.value } })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({ type: 'ADD_NEW_TODO', payload: { task: taskInput } });
        dispatch({ type: 'SAVE_TODOS' });
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <input className='form__input'
                type="text"
                name="task"
                value={taskInput}
                placeholder="Create a new todo..."
                id="task"
                onChange={updateTaskInput}
                spellCheck={false}
                required
            />
            <button className='form__btn' type="submit">
                <span className="sr-only">Add todo</span>
            </button>
        </Form>
    )
}

export default AddTodo