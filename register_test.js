const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Naviguer vers la page d'enregistrement
    await page.goto('https://127.0.0.1:8000/register');

    // Remplir le formulaire d'enregistrement
    await page.type('#registration_form_email', 'test@example.com');
    await page.type('#registration_form_plainPassword', 'password');
    await page.click('#registration_form_agreeTerms'); // Cochez la case "agreeTerms"

    // Soumettre le formulaire
    await Promise.all([
        page.waitForNavigation(), // Attendez que la page se recharge
        page.click('button[type="submit"]'), // Cliquez sur le bouton "Register"
    ]);

    // Attendre que l'URL soit celle de la page de connexion
    await page.waitForURL('https://127.0.0.1:8000/login');

    // Vérifier l'URL actuelle
    const currentUrl = page.url();

    console.log("Redirection vers la page de connexion réussie :", currentUrl === 'https://127.0.0.1:8000/login');

    // Fermer le navigateur
    await browser.close();
})();
