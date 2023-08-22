const CardContainer = document.querySelector("[data-user-cards-container]");
const CardTemplate = document.querySelector("[data-user-template]");
const searchInput = document.querySelector("[data-search]");

let users = [];


fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
  
  users = data.map(user => {
    const card = CardTemplate.content.cloneNode(true).children[0];
    
    const header = card.querySelector('[data-header]');
    const body = card.querySelector('[data-body]');
    
    header.textContent = user.name;
    body.textContent = user.email;
    
    CardContainer.append(card);
    
    return { name: user.name, email: user.email, element: card };
  });
  console.log(users);
});




searchInput.addEventListener("input", (i) => {
  const value = i.target.value.toLowerCase();
  
  users.forEach(user => {

    const userName = user.name.toLowerCase();
    const userEmail = user.email.toLowerCase();

    const isVisible = userName.includes(value) || userEmail.includes(value);
    
    user.element.classList.toggle("hide", !isVisible);
  });
});
