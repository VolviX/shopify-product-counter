document.getElementById('countButton').addEventListener('click', async () => {
    const storeUrl = document.getElementById('storeUrl').value.trim();
    const resultDiv = document.getElementById('result');

    if (!storeUrl) {
        resultDiv.textContent = "Please enter a Shopify store URL.";
        return;
    }

    resultDiv.textContent = "Counting products...";

    let totalProducts = 0;
    let page = 1;
    let hasMoreProducts = true;

    try {
        while (hasMoreProducts) {
            const response = await fetch(`${storeUrl}/products.json?page=${page}`);
            if (!response.ok) throw new Error("Invalid store URL or network error.");

            const data = await response.json();

            if (data.products && data.products.length > 0) {
                totalProducts += data.products.length;
                page++;
            } else {
                hasMoreProducts = false;
            }
        }

        resultDiv.textContent = `Total Products: ${totalProducts}`;
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});
