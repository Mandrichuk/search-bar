const CardContainer = document.querySelector("[data-user-cards-container]");
const CardTemplate = document.querySelector("[data-user-template]");
const searchInput = document.querySelector("[data-search]");

let users = [];


function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    
    users = data.map(user => {
      const card = CardTemplate.content.cloneNode(true).children[0];

      const name = card.querySelector('[data-name]');
      const email = card.querySelector('[data-email]');
      
      name.textContent = user.name;
      email.textContent = user.email;
      
      CardContainer.append(card);

      return { name: user.name, email: user.email, element: card };
    });
  });
}


function findedBySearch() {
  searchInput.addEventListener("input", (i) => {

    // * cards show by the input text  
    const value = i.target.value.toLowerCase();
  
    users.forEach(user => {
      const userName = user.name.toLowerCase();
      const userEmail = user.email.toLowerCase();
  
      const isVisible = userName.includes(value) || userEmail.includes(value);
      
      user.element.classList.toggle("hide", !isVisible);
  
      // * highlight the input text
      const cardName = user.element.querySelector('[data-name]');
      const cardEmail = user.element.querySelector('[data-email]');
  
      cardName.innerHTML = highlightMatches(userName, value);
      cardEmail.innerHTML = highlightMatches(userEmail, value);
    });
  });
}


function highlightMatches(text, searchValue) {
  const re = new RegExp(searchValue, 'g');
  return text.replace(re, match => `<span class="highlight">${match}</span>`);
}


getUsers();
findedBySearch();