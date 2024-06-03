// Function to fetch images based on user search query
async function searchImages(query) {
    const apiKey = '0t8am1-lE4-2I8DsAI-KQtNbPy01-z5pnLleYx_-q7M'; // Replace 'YOUR_ACCESS_KEY' with your actual API key
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`);
    const data = await response.json();
    return data.results;
}

// Function to display search results
function displaySearchResults(images) {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;
        imageGrid.appendChild(imgElement);
    });
}

// Function to handle search input
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    if (query !== '') {
        const images = await searchImages(query);
        displaySearchResults(images);
    }
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', handleSearch);
