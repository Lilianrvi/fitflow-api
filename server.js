// server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Installe cette librairie avec `npm install node-fetch@2`

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// IMPORTANT : Open Food Facts demande d'identifier l'application qui fait l'appel
const USER_AGENT = 'FitFlowApp/1.0 (fitflow@example.com)';

// Endpoint pour la recherche d'aliments par mot-clé (utilisé par l'autocomplétion)
app.get('/api/aliments/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Le paramètre de recherche "q" est requis.' });
    }

    try {
        const url = `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(query)}&fields=product_name_fr,product_name,nutriments,brands,image_url,nutriscore_grade,code&page_size=20`;

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
            const nutriments = product.nutriments || {};
            let calories = nutriments.energy_kcal_100g || 0;
            if (calories === 0 && nutriments.energy_100g) {
                calories = nutriments.energy_100g / 4.184;
            }

            return {
                code: product.code,
                name: product.product_name_fr || product.product_name || 'Aliment inconnu',
                brand: product.brands || null,
                calories: Math.round(calories),
                protein: nutriments.proteins_100g || 0,
                fat: nutriments.fat_100g || 0,
                carbs: nutriments.carbohydrates_100g || 0,
                sugars: nutriments.sugars_100g || 0,
                fiber: nutriments.fiber_100g || 0,
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

// NOUVEAU ENDPOINT pour la recherche d'aliments par code-barres (utilisé par le scanner)
app.get('/api/aliments/barcode', async (req, res) => {
    const barcode = req.query.code;
    if (!barcode) {
        return res.status(400).json({ error: 'Le paramètre de code-barres "code" est requis.' });
    }

    try {
        const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name_fr,product_name,nutriments,brands,image_url,nutriscore_grade,code&json=1`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': USER_AGENT
            }
        });
        const data = await response.json();

        if (data.status === 1 && data.product) {
            const product = data.product;
            const nutriments = product.nutriments || {};
            let calories = nutriments.energy_kcal_100g || 0;
            if (calories === 0 && nutriments.energy_100g) {
                calories = nutriments.energy_100g / 4.184;
            }
            
            const formattedProduct = {
                code: product.code,
                name: product.product_name_fr || product.product_name || 'Aliment inconnu',
                brand: product.brands || null,
                calories: Math.round(calories),
                protein: nutriments.proteins_100g || 0,
                fat: nutriments.fat_100g || 0,
                carbs: nutriments.carbohydrates_100g || 0,
                sugars: nutriments.sugars_100g || 0,
                fiber: nutriments.fiber_100g || 0,
                nutri_score: product.nutriscore_grade || 'unknown',
                imageUrl: product.image_url || null,
            };
            return res.json(formattedProduct);
        } else {
            return res.status(404).json({ error: 'Produit non trouvé.' });
        }

    } catch (error) {
        console.error('Erreur lors de la recherche par code-barres:', error);
        res.status(500).json({ error: 'Échec de la connexion à l\'API externe.' });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur API est en écoute sur le port ${PORT}`);
});
