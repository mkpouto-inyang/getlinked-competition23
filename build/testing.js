window.onload = (event) => {
    let categories = null;

    function fetchCategories() {
    return new Promise(async (resolve, reject) => {
        try {
        const response = await fetch('https://backend.getlinked.ai/hackathon/categories-list');

        if (!response.ok) {
            throw new Error(`Error getting categories from the server`);
        }

        const data = await response.json();
        resolve(data);
        } catch (error) {
        reject(error);
        }
    });
    }

    function createDropdownOptions(data) {
        const selectElement = document.getElementById('select-id')

        selectElement.innerHTML = ''

        data.forEach((optionData) => {
            const option = document.createElement(`option-${optionData.id}`)
            option.value = optionData.id
            option.textContent = optionData.name
            selectElement.appendChild(option)
        })
    }

    fetchCategories()
    .then((data) => {
        createDropdownOptions(data)
    }).catch((error) => {
        console.error("Error:", error);
    });
}