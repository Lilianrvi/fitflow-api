// server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Installe cette librairie avec `npm install node-fetch@2`

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const OPEN_FOOD_FACTS_API_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

// IMPORTANT : Open Food Facts demande d'identifier l'application qui fait l'appel
const USER_AGENT = 'FitFlowApp/1.0 (fitflow@example.com)';

app.get('/api/aliments/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Le paramètre de recherche "q" est requis.' });
    }

    try {
        const url = `${OPEN_FOOD_FACTS_API_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': USER_AGENT
            }
        });
        const data = await response.json();

        if (!data.products) {
            return res.status(500).json({ error: 'Erreur de l\'API Open Food Facts.' });
        }

        // Mappe et formate les données pour qu'elles correspondent à la structure attendue par ton front-end
        const formattedProducts = data.products.map(product => {
            return {
                code: product.code, // Conserve le code-barres pour une future utilisation
                name: product.product_name_fr || product.product_name || 'Aliment inconnu',
                brand: product.brands || null,
                // Utilise les nutriments pour 100g, en gérant les valeurs manquantes
                calories: Math.round((product.nutriments?.energy_100g || 0) / 4.184) || 0,
                protein: product.nutriments?.proteins_100g || 0,
                fat: product.nutriments?.fat_100g || 0,
                carbs: product.nutriments?.carbohydrates_100g || 0,
                sugars: product.nutriments?.sugars_100g || 0,
                fiber: product.nutriments?.fiber_100g || 0,
                // Autres infos si disponibles
                nutri_score: product.nutriscore_grade || 'unknown',
                imageUrl: product.image_url || null,
            };
        });

        res.json(formattedProducts);
    } catch (error) {
        console.error('Erreur lors de la recherche sur Open Food Facts:', error);
        res.status(500).json({ error: 'Échec de la connexion à l\'API externe.' });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur API est en écoute sur le port ${PORT}`);
});