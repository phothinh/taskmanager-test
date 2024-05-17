const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Naviguer vers la page de connexion
    await page.goto('https://127.0.0.1:8000/login');

    // Remplir le formulaire de connexion
    await page.type('#username.form-control', 'mail@mail.fr');
    await page.type('#password.form-control', 'motdepasse');

    // Soumettre le formulaire
    await Promise.all([
        page.waitForNavigation(), // Attendre que la page se recharge
        page.click('button[type="submit"]'), // Cliquer sur le bouton "login"
    ]);

    // Attendre que l'élément contenant le message de succès soit affiché
    await page.waitForSelector('div:contains("You are logged in as mail@mail.fr, Logout")');

    // Vérifier si le message de succès est affiché
    const successMessage = await page.evaluate(() => {
        return document.querySelector('div:contains("You are logged in as mail@mail.fr, Logout")');
    });

    console.log("Connexion réussie :", successMessage !== null);

    // Fermer le navigateur
    await browser.close();
})();
