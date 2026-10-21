import { useContext, useRef } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

import closeIcon from '../assets/images/icon-cross.svg';

const TodoItemSC = styled.div`
    background: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray};
    border-bottom: 1.75px solid ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkGrayishBlueAlt : theme.colors.light.lightGrayishBlue};
    padding: .75em 1.25em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;

    /* Rounded border gradient effect */
    &:hover .todo__input {
        cursor: pointer;

        /* 
            Added extra border-width for light mode so as it make it more prominent
            This is applied only for uncompleted todos
        */
        ${({ theme, $completed }) => !$completed && `
            border: ${theme.isDarkMode ? '.015em' : '.125em'} double transparent;
            background-image: linear-gradient(
                ${theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray}, 
                ${theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray}),
                ${theme.colors.checkBackground};
            background-origin: border-box;
            background-clip: padding-box, border-box;
            padding: .25em;
        `}
    }
    
    .todo__input-c {
        display: flex;
        align-items: center;
        gap: 1em;

        flex: 1;
    }

    .todo__label {
        flex: 1;
        text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
        color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.lightGrayishBlue : theme.colors.light.veryDarkGrayishBlue};
        line-height: 1.5;
        
        ${({ theme, $completed }) => $completed && theme.isDarkMode && `
            color: ${theme.colors.dark.veryDarkGrayishBlue};
        `};

        ${({ theme, $completed }) => $completed && !theme.isDarkMode && `
            color: ${theme.colors.light.lightGrayishBlue};
        `};
    }

    .todo__input {
        /* Removes native checkbox styles */
        -webkit-appearance: none;
        appearance: none;
        
        font: inherit;

        display: grid;
        place-content: center;
        width: 1.25em;
        height: 1.25em;
        transform: translateY(-0.075em);

        border: 0.075em solid ${({ theme }) => theme.colors.dark.veryDarkGrayishBlue};
        border-radius: 50%;
        
        &::before {
            content: '';
            width: .65em;
            height: .65em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
        }

        &:checked {
            background: ${({ theme }) => theme.colors.checkBackground};
           
            &::before {
                height: .75em;
                width: .75em;
                transform: scale(1.2);
                transform-origin: center center;
                background: ${({ theme }) => theme.colors.light.veryLightGray};
                /* clip path value for checkmark icon */
                clip-path: polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%);
            }
        }

        &:focus {
            /* outline: max(2px, 0.15em) solid currentColor; */
            /* outline-offset: max(2px, 0.15em); */
        }
        
    }
`;


const TodoItem = ({ id, task, completed }) => {
    const { dispatch } = useContext(AppContext);

    const nodeRef = useRef(null);

    const toggleCompleted = () => {
        dispatch({ type: 'TOGGLE_TODO_COMPLETED', payload: { id } });
        dispatch({ type: 'SAVE_TODOS' });
    }

    const deleteTodo = () => {
        dispatch({ type: 'DELETE_TODO', payload: { id } });
        dispatch({ type: 'SAVE_TODOS' });
    }

    return (
        <TodoItemSC ref={nodeRef} $completed={completed}>
            <div className='todo__input-c'>
                <input className='todo__input' type="checkbox" name="todo" id={`task-${id}`} checked={completed} onChange={toggleCompleted} />
                <label className='todo__label' htmlFor={`task-${id}`}>{task}</label>
            </div>
            <button onClick={deleteTodo}>
                <img src={closeIcon} alt='Close icon' />
            </button>
        </TodoItemSC>
    )
}

export default TodoItem