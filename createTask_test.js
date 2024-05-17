const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Naviguer vers la page de création de tâche
    await page.goto('https://127.0.0.1:8000/task/new');

    // Attendre que le formulaire de création de tâche soit chargé
    await page.waitForSelector('form[name="task"]');

    // Remplir le formulaire de création de tâche
    await page.type('input#task_title', 'Nouvelle tâche');
    await page.type('input#task_description', 'Description de la nouvelle tâche');
    await page.type('input#task_status', 'En cours');
    await page.type('input#task_dueDate', '2024-05-17'); // Date de la tâche

    // Soumettre le formulaire
    await Promise.all([
        page.waitForNavigation(), // Attendre que la page se recharge
        page.click('button.btn'), // Cliquer sur le bouton "Save"
    ]);

    // Attendre que la nouvelle tâche soit affichée sur la page des tâches
    await page.waitForSelector('table.table tbody tr');

    // Récupérer les informations sur la dernière tâche ajoutée
    const newTask = await page.evaluate(() => {
        const taskRow = document.querySelector('table.table tbody tr:last-child');
        const id = taskRow.querySelector('td:nth-child(1)').textContent.trim();
        const title = taskRow.querySelector('td:nth-child(2)').textContent.trim();
        const description = taskRow.querySelector('td:nth-child(3)').textContent.trim();
        const status = taskRow.querySelector('td:nth-child(4)').textContent.trim();
        const dueDate = taskRow.querySelector('td:nth-child(5)').textContent.trim();
        return { id, title, description, status, dueDate };
    });

    // Afficher les informations sur la nouvelle tâche
    console.log("Nouvelle tâche ajoutée :", newTask);

    // Fermer le navigateur
    await browser.close();
})();
