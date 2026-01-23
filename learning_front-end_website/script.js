
// My paths to images to use in functions later
const imageSrc = {
    menuClose: 'media/menuClose.svg',
    menuOpen: 'media/menuOpen.svg',

};


// Selecting class .navButton to use in functions later
const navButton = document.querySelector('.navButton');

// Selecting navList to use in functions later
const navList = document.querySelector('#navList');

// Function to handle menu button click
// Opens or closes navList and changes navButton image accordingly
function menuClick() {
    // Get current src attribute of navButton
    let navButtonSrc = navButton.getAttribute('src');

    // Toggle menu open/close based on current src
    if (navButtonSrc === imageSrc.menuOpen) {
        navButton.src = imageSrc.menuClose
        navList.classList.add('open')
       console.log('menuIsOpened');
    } else {
        navButton.src = imageSrc.menuOpen;
        navList.classList.remove('open');
        console.log('menuIsClosed');
    }
};


// Add click event listener to navButton
navButton.addEventListener('click', menuClick);


// Selecting the scrollUp button
const scrollUp = document.querySelector('#scrollUp');

// Variable to store the last scroll position
let lastScrollY = window.scrollY;

// Function to smoothly scroll to the top of the page
function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

scrollUp.addEventListener('click', scrollToTop);

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    // Uncomment to debug: console.log(`Current: ${currentScrollY}, Last: ${lastScrollY}`);
    // Check wheter we are at the TOP of the page
    if (currentScrollY < 100) {
        scrollUp.classList.remove('visible');
    }
    // We scroll DOWN (Current > Last) -> HIDE
    else if (currentScrollY > lastScrollY) {
        scrollUp.classList.remove('visible');
    }
    // We scroll UP (Current < Last) -> SHOW
    else {
        scrollUp.classList.add('visible');
    }

    // Saves the current scroll position for the next scroll event
    lastScrollY = currentScrollY;
});





// Code for Shop page

// Class representing a Bike product
class Bike {
    constructor(id, name, edition, price, image) {
        this.id = id;
        this.name = name;
        this.edition = edition;
        this.price = price;
        this.image = image;
    }

    // Return full name of the bike
    getFullName() {
        return `${this.name} ${this.edition}`;
    }

    // Method generating HTML for product card
    getHTML() {
        return `
            <div class="productCard">
                <img src="${this.image}" alt="${this.getFullName()}"/>
                <h3>${this.getFullName()}</h3>
                <span class="price">$${this.price}</span>
                <button class="addToCartBtn" onclick="myShop.addToCart(${this.id})">
                    Add to Cart
                </button>
            </div>
        `;
    }
}

// Class representing the Shop
class Shop {
    constructor(containerId, counterId) {
        this.container = document.getElementById(containerId);
        this.counterLabel = document.getElementById(counterId);
        this.products = []; // This will hold our Bike objects
        
        // Our data for random generation
        this.bikeNames = ["NeoViator", "CityGlider", "UrbanPulse", "EcoPath", "FutureRide"];
        this.editions = ["Standard", "Pro", "Elite", "Carbon", "X-Series"];
        this.placeholderImage = "media/bikePlaceholder.jpeg";
    }

    // Method to generate random products for the shop page
    generateProducts(count) {
        this.products = []; // Resets the products in the shop
        
        for (let i = 0; i < count; i++) {
            const randomName = this.bikeNames[Math.floor(Math.random() * this.bikeNames.length)]; // Randomly generates a number from 1 to x [x = length of .bikeNames] and then chooses a name from .bikeNames 
            const randomEdition = this.editions[Math.floor(Math.random() * this.editions.length)]; // Same as above but for .editions
            const randomPrice = Math.floor(Math.random() * 3000) + 2000;

            // Create new Bike object
            const newBike = new Bike(i, randomName, randomEdition, randomPrice, this.placeholderImage);
            
            // Add Bike to products array (the end of array)
            this.products.push(newBike);
        }
        
        // After generation, products will be shown in a shop using the render method
        this.render(this.products);
    }

    // Mehthod to show products in HTML
    // It's called both after generation and after sorting
    render(itemsToRender) {
        this.container.innerHTML = ''; // Clears current content of the shop container
        this.counterLabel.textContent = `${itemsToRender.length} products found`; // Updates product count

        itemsToRender.forEach(bike => {
            // Method from Bike class will be used to get HTML structure for each bike
            // Every element in this iteration is named "bike"
            this.container.innerHTML += bike.getHTML();
        });
    }

    // Method to sort products in the shop
    sortProducts(criteria) {
        // Creating a copy of the products array to sort as to not modify the original order
        let sorted = [...this.products];

        if (criteria === 'price-asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (criteria === 'price-desc') {
            sorted.sort((a, b) => b.price - a.price);
        } 
        // if citeria == 'default', "sorted" will be rendered which is a copy of  this.products

        this.render(sorted); // Render the sorted products
    }

    // Adding a product to a cart (a simple alert on webiste on click)
    // it's called by: <button class="addToCartBtn" onclick="myShop.addToCart(${this.id})">
    addToCart(id) {
        // Finding the bike by its id
        const bike = this.products.find(p => p.id === id);  // Searching for a first product in this.products where p.id === id
        alert(`Added to cart: ${bike.getFullName()} ($${bike.price})`);
        
    }
}

let myShop // I have to declare myShop here so it would be global, otherwise alert in addToCart doesn't work
// Checks whether user is on a store page, so it won't throw an error
if (document.getElementById('productContainer')) {
    
    // Creating a new instance of Shop
    myShop = new Shop('productContainer', 'productCount');  // "new" needs to be used to create an instance of a class otherwise it will throw an error
    // Generating 12 products to display in the shop
    myShop.generateProducts(12);

    // Sorting functionality
    // Selecting the sortSelect element
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        // Adding change event listener to sortSelect
        sortSelect.addEventListener('change', (e) => {
            // Calling sortProducts method from myShop instance
            myShop.sortProducts(e.target.value);
        });
    }
}


// Disclaimer functionality

const modal = document.getElementById('disclaimerModal');
const closeBtn = document.querySelector('.closeModal');

// Checks wheter the user already closed the disclaimer in this session
if (sessionStorage.getItem('disclaimerClosed') === 'true') {
    modal.style.display = 'none';
}

// Add click event listener to close button if it exists
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        // Closes the window after clicking the close button
        modal.style.display = 'none';
        
        // Saves the state in this session's storage
        sessionStorage.setItem('disclaimerClosed', 'true');
    });
}
