document.getElementById("searchButton").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value.trim();

    if (!query) {
        alert("Please enter a product name to search.");
        return;
    }

    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById("resultsTable");
            tableBody.innerHTML = "";

            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='4'>No results found</td></tr>";
                return;
            }

            data.forEach(item => {
                const row = document.createElement("tr");

                const storeCell = document.createElement("td");
                const storeLink = document.createElement("a");
                storeLink.href = item.storeUrl;
                storeLink.textContent = item.storeName;
                storeLink.target = "_blank";
                storeCell.appendChild(storeLink);

                const productCell = document.createElement("td");
                productCell.textContent = item.productName;

                const priceCell = document.createElement("td");
                priceCell.textContent = `$${item.productPrice}`;

                const availabilityCell = document.createElement("td");
                availabilityCell.textContent = item.isAvailable ? "In Stock" : "Out of Stock";

                row.appendChild(storeCell);
                row.appendChild(productCell);
                row.appendChild(priceCell);
                row.appendChild(availabilityCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        });
});