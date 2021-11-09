import { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import {Header, AppNameComponent, AppIcon, SearchComponent, SearchInput, SearchIcon} from './components/headerComponent';
import {RecipeContainer, RecipeListContainer, CoverImage, RecipeName, IngredientsText, SeeMoreText} from './components/recipeComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';



const APP_ID = '4953b7af';
const APP_KEY = '8ab2c62a67c9a9f0b331704b3d40cb36';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  `;
const Placeholder = styled.img`
   width:250px;
   height:250px;
   margin:150px;
   opacity:1;
`;

  const RecipeComponent =(props)=>{
    const [open,setOpen] = useState(false);
    const { recipeObj } = props;
    return (
   <div>
     <Dialog open={open}>
       <DialogTitle id='alert-dialog-slide-title'>Ingredients</DialogTitle>
       <DialogContent>
         <table>
           <thead>
             <th>Ingredients</th>
             <th>Weight</th>
           </thead>
           <tbody>
             {recipeObj.ingredients.map((ingredientsObj)=>(
              <tr>
              <td>{ingredientsObj.text}</td>
              <td>{ingredientsObj.weight}</td>
            </tr>
             ) )}
             
           </tbody>
         </table>
       
       </DialogContent>
       <DialogActions>
          <IngredientsText onClick={()=> window.open(recipeObj.url)}>See More</IngredientsText>
           <SeeMoreText onClick={()=> setOpen('')}>Close</SeeMoreText>
       </DialogActions>
     </Dialog>
    <RecipeContainer >
       <CoverImage src={recipeObj.image}/>
       <RecipeName>{recipeObj.label}</RecipeName>
       <IngredientsText onClick={()=> setOpen(true)}>Ingredients</IngredientsText>
      <SeeMoreText onClick={()=>window.open(recipeObj.url)}>See Complete Recipe</SeeMoreText>
    </RecipeContainer>

</div>



    );

  };

function App() {
 
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);
  const fetchRecipe = async(searchString)=>{
   const response = await Axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&calories=300-600`
    );
    updateRecipeList(response.data.hits)
  };


  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    const timeout = setTimeout(()=> fetchRecipe(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container >

    <Header>
       <AppNameComponent>
         <AppIcon src="https://img.icons8.com/doodle/48/000000/strawberry-2.png"/>Recipe Finder
       </AppNameComponent>
      <SearchComponent>
        <SearchIcon src="https://img.icons8.com/color/search"/>
      <SearchInput placeholder="search recipe" onChange={onTextChange}/>
        </SearchComponent>
    </Header>

      <RecipeListContainer>

      {recipeList.length ? (recipeList.map((recipeObj)=> (  <RecipeComponent recipeObj={recipeObj.recipe}/>))
      ) : (<Placeholder src="https://img.icons8.com/bubbles/50/000000/tableware.png"/>)}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
