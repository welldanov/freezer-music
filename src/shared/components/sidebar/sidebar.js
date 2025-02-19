// Функция для загрузки HTML-фрагмента
async function sidebarRenderer(url, containerId) {
    try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        console.log(html);
        // console.log(response);
        // Вставляем загруженный HTML в контейнер
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

sidebarRenderer('./shared/components/sidebar/sidebar.html', 'sidebar');
