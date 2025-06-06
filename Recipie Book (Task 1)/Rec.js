function showMessage() 
{
    alert("Happy Cooking!");
}

function toggleRecipe(button) 
{
    const recipe = button.parentElement;
    const details = recipe.querySelector('.recipe-details');
    if (details.classList.contains('hidden')) 
    {
        details.classList.remove('hidden');
        button.textContent = 'Hide Details';
    } 
    else 
    {
        details.classList.add('hidden');
        button.textContent = 'Show Details';
    }
}
