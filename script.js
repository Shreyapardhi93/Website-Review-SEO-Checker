async function analyzeWebsite() {
    const urlInput = document.getElementById("urlInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    const apiKey = "AIzaSyCa9uAD2UB76xb-97ReJACgBraiXjjguZk";
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(urlInput)}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch data: ${errorMessage}`);
        }

        const data = await response.json();

        // Check if lighthouseResult and categories exist
        const categories = data.lighthouseResult?.categories;
        if (!categories) {
            throw new Error("Missing categories in response. Ensure that the URL is valid and publicly accessible.");
        }

        // Use optional chaining (?.) to safely access score properties
        const performanceScore = categories.performance?.score ? categories.performance.score * 100 : "N/A";
        const seoScore = categories.seo?.score ? categories.seo.score * 100 : "N/A";
        const accessibilityScore = categories.accessibility?.score ? categories.accessibility.score * 100 : "N/A";
        const bestPracticesScore = categories["best-practices"]?.score ? categories["best-practices"].score * 100 : "N/A";

        // Display results
        resultsDiv.innerHTML = `
            <div class="result-item"><strong>Performance Score:</strong> ${performanceScore}</div>
            <div class="result-item"><strong>SEO Score:</strong> ${seoScore}</div>
            <div class="result-item"><strong>Accessibility Score:</strong> ${accessibilityScore}</div>
            <div class="result-item"><strong>Best Practices Score:</strong> ${bestPracticesScore}</div>
        `;
    } catch (error) {
        console.error("Error:", error);
        resultsDiv.innerHTML = `<div class="result-item">Error: ${error.message}</div>`;
    }
}
