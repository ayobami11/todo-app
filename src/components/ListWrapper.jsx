import { useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';
import FilterMenu from './FilterMenu';


import TodoList from './TodoList';


const ListWrapperSC = styled.div`
    background: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray};
    margin: 1em 0;
    border-radius: .5em;
    overflow: hidden;

    box-shadow: ${({theme}) => theme.isDarkMode ? `
        0 10px 0 clamp(2px, 1vw, 7px) hsla(0, 0%, 12.5%, 0.125),
        0 20px 0 clamp(7px, 2vw, 17px) hsla(0, 0%, 12.5%, 0.15),
        0 30px 0 clamp(22px, 3vw, 30px) hsla(0, 0%, 12.5%, 0.175)
        `: `
        0 10px 0 clamp(2px, 1vw, 7px) hsla(0, 10%, 72.5%, 0.05),
        0 20px 0 clamp(7px, 2vw, 17px) hsla(0, 10%, 72.5%, 0.075),
        0 30px 0 clamp(22px, 3vw, 30px) hsla(0, 10%, 72.5%, 0.1)
    `};

    .filter-wrapper--desktop {
        display: none;
    }

    .list__footer,
    .list__clear-btn {
        color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.darkGrayishBlue : theme.colors.light.darkGrayishBlue};
        font-size: .875rem;
    }    

    .list__clear-btn {

        &:hover {
            color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.lightGrayishBlueHover : theme.colors.light.veryDarkGrayishBlue};
        }
    }

    .list__footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: .75em 1.25em;
        gap: 1em;
    }

    @media (min-width: 800px) {
        .filter-wrapper--desktop {
            display: block;
        }
    }
`;

const ListWrapper = () => {
    const { state: { todos: allTodos, filteredTodos, todosFilter }, dispatch } = useContext(AppContext);

    const currentTodos = todosFilter === 'all' ? allTodos : filteredTodos[todosFilter];
    const currentTodosLength = currentTodos.length;

    const clearCompletedTodos = () => {
        dispatch({ type: 'CLEAR_COMPLETED_TODOS' });
    }

    return (

        <ListWrapperSC>
            <TodoList todos={currentTodos} />

            <div className='list__footer'>
                <p>
                    {todosFilter === 'all' ? `${currentTodosLength || 'No'} ${currentTodosLength !== 1 ? 'items' : 'item'} left` : null}
                    {todosFilter === 'active' ? `${currentTodosLength || 'No'} uncompleted ${currentTodosLength !== 1 ? 'todos' : 'todo'}` : null}
                    {todosFilter === 'completed' ? `${currentTodosLength || 'No'} completed ${currentTodosLength !== 1 ? 'todos' : 'todo'}` : null}
                </p>
                <div className="filter-wrapper--desktop">
                    <FilterMenu />
                </div>
                {/* hid button when the active tab is shown because the user would see no visual effect of completed 
                    tasks being cleared from there */}
                {todosFilter !== 'active' ? <button className='list__clear-btn' onClick={clearCompletedTodos}>Clear Completed</button> : null}
            </div>
        </ListWrapperSC>
    )
}

export default ListWrapper;