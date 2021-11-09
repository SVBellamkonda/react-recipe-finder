import styled from "styled-components";
export const Header = styled.div`
color: white;
background-color:#ffaa22;
padding:30px;
font-size:25px;
font-weight:bold;
box-shadow: 0 3px 6px 0 #555;
align-items:center;
justify-content: space-between; 
display: flex;
flex-direction: row;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  `;
  export const AppNameComponent =styled.div`
display:flex;
align-items:center;`;
export  const AppIcon = styled.img`
width:60px;
height:60px;
margin:15px;
`;
export const SearchComponent = styled.div`
display:flex;
flex-direction:row;
background-color:white;
padding:10px;
border-radius:6px; 
width:50%;
`;

export const SearchIcon =styled.img`
width:32px;
height:32px;
`;
export const SearchInput = styled.input`
border: none;
outline:none;
margin-left:15px;
font-size:17px;
font-weight:bold;
`;

