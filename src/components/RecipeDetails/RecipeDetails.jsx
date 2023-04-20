import { useSelector } from "react-redux";
import '../RecipeDetails/RecipeDetails.css'


function GetRecipesDetails () {
    const details = useSelector(store => store.viewRecipeDetails[0])



    return (<>
    <div>{details.title}</div>
    <div>{details.ingredients}</div>
    </>)
}
export default GetRecipesDetails;