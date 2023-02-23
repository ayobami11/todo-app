import { useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

const FilterMenuSC = styled.ul`
    background: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkDesaturatedBlue : theme.colors.light.veryLightGray};
    border-radius: .5em;
    padding: .75em 1em;
    
    display: flex;
    justify-content: center;
    gap: 1.25em;

    .filter__btn {
        color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.darkGrayishBlue : theme.colors.light.darkGrayishBlue};
        font-weight: ${({ theme }) => theme.font.weights.bold};
        font-size: .9rem;
        
        &--active {
            color: ${({ theme }) => theme.colors.brightBlue};
        }
        
        &:hover {
            color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.lightGrayishBlueHover : theme.colors.light.veryDarkGrayishBlue};
        }
    }

    /* Removes extra padding for desktop devices */
    @media (min-width: 800px) {
        padding: 0.25em;
    }
`;

const FilterMenu = () => {
    const { state: { todosFilter }, dispatch } = useContext(AppContext);

    // makes use of JavaScript currying
    const setTodosFilter = (filter) => {
        return () => {
            dispatch({ type: 'FILTER_TODOS', payload: { filter } });
            dispatch({ type: 'SET_CURRENT_TODOS' });
            dispatch({ type: 'SAVE_TODOS' });
        }
    }

    return (
        <FilterMenuSC>
            <li>
                <button className={`filter__btn ${todosFilter === 'all' ? 'filter__btn--active' : ''}`} onClick={setTodosFilter('all')}>All</button>
            </li>
            <li>
                <button className={`filter__btn ${todosFilter === 'active' ? 'filter__btn--active' : ''}`} onClick={setTodosFilter('active')}>Active</button>
            </li>
            <li>
                <button className={`filter__btn ${todosFilter === 'completed' ? 'filter__btn--active' : ''}`} onClick={setTodosFilter('completed')}>Completed</button>
            </li>
        </FilterMenuSC>
    )
}

export default FilterMenu