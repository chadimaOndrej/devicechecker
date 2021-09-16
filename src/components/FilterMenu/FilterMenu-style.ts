import styled from 'styled-components';

export const FilterMenuLayout = styled.div`
    position: relative; 
    display: flex; 
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #d4d4d5;
`;

export const FilterMenuItem = styled.div`
    margin-bottom: 15px;
    flex-grow: 1;

    @media all and (min-width: 992px) {
        max-width: 25%;
        margin-bottom: 0;
        margin-right: 20px;
    }
`;
