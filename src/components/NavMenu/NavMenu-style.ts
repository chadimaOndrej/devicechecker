import styled from 'styled-components';

export const NavMenuStyle = styled.div`
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 20px; 
    background-color: #f2711c;  

    @media all and (min-width: 767px) {
        padding: 10px 20px;
    } 
`;

export const NavMenuLogo = styled.h1`
    margin: 0;  
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

export const NavMenuRight = styled.div`
    display: flex; 
    justify-content: flex-end;
    align-items: center;
`;

export const NavMenuUserName = styled.div`
    margin-right: 20px;
    font-weight: bold;
    font-size: 1rem;
    color: white;

`;
