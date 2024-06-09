document.addEventListener("DOMContentLoaded", function () {
    const addPinButton = document.getElementById('addPinButton');
    const addPinModal = document.getElementById('addPinModal');
    const closeBtn = document.querySelector(".close");
    const addPinForm = document.getElementById('addPin');
    const pinContainer = document.getElementById('pinContainer');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const uploadInput = document.getElementById('uploadInput');

    addPinButton.addEventListener('click', () => {
        addPinModal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        addPinModal.style.display = "none";
    });

    addPinForm.addEventListener('click', () => {
        const pinUrlInput = document.getElementById('pinUrlInput').value;
        if (pinUrlInput !== '') {
            addPin(pinUrlInput);
            addPinModal.style.display = "none";
        }
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;
        searchImages(searchTerm);
    });

    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                addPin(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    function addPin(url) {
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.innerHTML = `<img src="${url}" alt="Pin">`;
        pinContainer.appendChild(pin);
    }

    async function searchImages(query) {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=0t8am1-lE4-2I8DsAI-KQtNbPy01-z5pnLleYx_-q7M`);
        const data = await response.json();
        const results = data.results;
        pinContainer.innerHTML = ''; // Clear existing pins
        results.forEach(result => {
            addPin(result.urls.regular);
        });
    }
});
