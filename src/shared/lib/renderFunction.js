export async function renderFunction(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Container with id "${containerId}" not found.`);
        }
    } catch (error) {
        console.error('Error loading HTML fragment:', error);
    }
}