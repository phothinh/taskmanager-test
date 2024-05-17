const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Naviguer vers la page des tâches
    await page.goto('https://127.0.0.1:8000/task/');

    // Attendre que la table des tâches soit chargée
    await page.waitForSelector('table.table');

    // Récupérer le contenu de toutes les lignes de la table des tâches
    const tasks = await page.evaluate(() => {
        const taskRows = Array.from(document.querySelectorAll('table.table tbody tr'));
        return taskRows.map(row => {
            const id = row.querySelector('td:nth-child(1)').textContent.trim();
            const title = row.querySelector('td:nth-child(2)').textContent.trim();
            const description = row.querySelector('td:nth-child(3)').textContent.trim();
            const status = row.querySelector('td:nth-child(4)').textContent.trim();
            const dueDate = row.querySelector('td:nth-child(5)').textContent.trim();
            return { id, title, description, status, dueDate };
        });
    });

    // Afficher les tâches récupérées
    console.log("Tâches affichées :", tasks);

    // Fermer le navigateur
    await browser.close();
})();
