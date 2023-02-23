import { useEffect, useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

import AddTodo from "./AddTodo";
import ListWrapper from "./ListWrapper";
import FilterMenu from './FilterMenu';

import bgMobileLight from '../assets/images/bg-mobile-light.jpg';
import bgMobileDark from '../assets/images/bg-mobile-dark.jpg';
import bgDesktopLight from '../assets/images/bg-desktop-light.jpg';
import bgDesktopDark from '../assets/images/bg-desktop-dark.jpg';

import sunIcon from '../assets/images/icon-sun.svg';
import moonIcon from '../assets/images/icon-moon.svg';

const HomeSC = styled.div`
    background-image: url(${({ theme }) => theme.isDarkMode ? bgMobileDark : bgMobileLight});
    background-color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkBlue : theme.colors.light.veryLightGrayishBlue};   
    background-repeat: no-repeat;
    background-size: contain;

    padding: 0 5%;

    @media (min-width: 700px) {
        background-image: url(${({ theme }) => theme.isDarkMode ? bgDesktopDark : bgDesktopLight});
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${({ theme }) => theme.colors.light.veryLightGray};
    margin: 0 auto;
    max-width: 800px;
    
    .header__heading {
        font-size: clamp(1.25rem, 4vw, 2.25rem);
        letter-spacing: .25em;
        padding: 2em 0;
        text-transform: uppercase;
    }
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    margin: 0 auto;
    max-width: 800px;

  .bottom-text {
        color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.veryDarkGrayishBlue : theme.colors.light.darkGrayishBlue};
        font-size: .875rem;
        font-weight: ${({ theme }) => theme.font.weights.bold};
        margin: 1.5em 0 1em;
        text-align: center;
    };

    @media (min-width: 800px) {
        .filter-wrapper--mobile {
            display: none;
        }
    }
`;

const Footer = styled.footer`
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.dark.lightGrayishBlue : theme.colors.light.veryDarkGrayishBlue};
    font-size: .875rem;
    letter-spacing: 0.025em;
    line-height: 1.5;
    padding: 1em 0 1.5em;
    text-align: center;

    a {
        color: orangered;
        text-decoration: none;
    }
`;

const Home = () => {
    const { state: { isDarkMode }, dispatch } = useContext(AppContext);

    const toggleMode = () => {
        dispatch({ type: 'TOGGLE_MODE' });
    }

    useEffect(() => {
        dispatch({ type: 'SET_DEFAULT_MODE' });
        dispatch({ type: 'GET_SAVED_TODOS' });
    }, [dispatch]);

    return (
        <HomeSC>
            <Header>
                <h1 className='header__heading'>Todo</h1>

                <button className='toggle-btn' onClick={toggleMode} title="Toggle mode">
                    <img src={isDarkMode ? sunIcon : moonIcon} alt='' />
                    <span className="sr-only">Toggle mode</span>
                </button>
            </Header>
            <Main>
                <AddTodo />
                <ListWrapper />
                <div className="filter-wrapper--mobile">
                    <FilterMenu />
                </div>
                <p className='bottom-text'>Drag and drop to reorder list</p>
            </Main>
            <Footer>
                <p>
                    Challenge by <a
                        href="https://www.frontendmentor.io?ref=challenge"
                        target="_blank"
                        rel="noreferrer"
                    >Frontend Mentor</a
                    >. Coded by <a
                        href="https://github.com/ayobami11/todo-app"
                        target="_blank"
                        rel="noreferrer">Ayobami Tunwase</a>.
                </p>
            </Footer>
        </HomeSC>
    )
}

export default Home