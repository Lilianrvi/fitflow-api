<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitFlow</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/quagga/dist/quagga.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        :root {
            --background-start-rgb: 29, 31, 43;
            --background-end-rgb: 50, 43, 83;
            --glass-bg-rgb: 255, 255, 255;
            --accent-color: #A78BFA; /* Violet pastel */
            --meal-color: #34D399; /* Green for meals */
            --workout-color: #F87171; /* Red for workouts */
            --pr-gold-color: #fde047;
            --pr-gold-color-dark: #facc15;
        }
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(160deg, rgb(var(--background-start-rgb)) 0%, rgb(var(--background-end-rgb)) 100%);
            color: #E5E7EB;
        }
        .app-container {
            background-image: linear-gradient(160deg, #3B315F 0%, #23253A 100%);
        }
        .glass-card {
            background: rgba(var(--glass-bg-rgb), 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(var(--glass-bg-rgb), 0.1);
            transition: all 0.2s ease-in-out;
            position: relative; 
        }
        .page { display: none; }
        .page.active { display: block; animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        .animate-fadeOut { animation: fadeOut 0.3s ease-out forwards; }


        .bottom-nav-item.active i { color: var(--accent-color); }
        
        .input-glass {
            background: rgba(0,0,0, 0.2);
            border: 1px solid rgba(255,255,255, 0.1);
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            width: 100%;
            color: white;
            font-weight: 500;
            transition: border-color 0.2s;
        }
        .input-glass:focus {
            outline: none;
            border-color: var(--accent-color);
        }
        .btn-primary {
            background-color: var(--accent-color);
            color: #111827;
            font-weight: 700;
            padding: 0.8rem 1.5rem;
            border-radius: 0.75rem;
            transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .btn-primary:hover {
            transform: scale(1.05);
        }
        .btn-primary:disabled {
            background-color: #5f5a6e;
            cursor: not-allowed;
        }
        .modal-bg { background-color: rgba(0,0,0,0.7); backdrop-filter: blur(5px); }
        
        .draggable { cursor: grab; }
        .draggable.dragging { 
    opacity: 0.5; /* Gardons l'opacité */
    background: rgba(var(--accent-color), 0.1);
    border: 1px dashed var(--accent-color);
}

.input-stepper-wrapper {
            position: relative;
        }
        .input-stepper-arrows {
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            height: calc(100% - 8px);
            justify-content: space-around;
        }
        .input-stepper-arrows button {
            color: #9CA3AF;
            line-height: 1;
            padding: 0 4px;
        }
        .input-stepper-arrows button:hover {
            color: white;
        }

.drag-over {
    /* Style pour le placeholder où l'élément sera déposé */
    border-top: 2px solid var(--accent-color) !important;
}

        .calendar-day.drag-over { background-color: rgba(var(--accent-color), 0.2); border: 1px solid var(--accent-color); }
        .calendar-day.past-day { color: #6B7280; cursor: not-allowed; }
        .calendar-day.past-day .event-dot { background-color: #6B7280; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .truncate-ellipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .truncate-2-lines { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; word-break: break-all; }

        #scanner-container {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.95);
            z-index: 50;
        }
        #reader {
            width: 90%;
            max-width: 500px;
            margin: auto;
            border-radius: 1rem;
            overflow: hidden;
        }
        .toggle-switch {
            background-color: rgba(0,0,0,0.2);
            border-radius: 9999px;
            padding: 4px;
            display: flex;
            position: relative;
        }
        .toggle-switch .slider {
            position: absolute;
            top: 4px;
            bottom: 4px;
            width: calc(50% - 4px);
            background-color: var(--accent-color);
            border-radius: 9999px;
            transition: transform 0.2s ease-in-out;
        }
        .toggle-switch button {
            width: 50%;
            padding: 8px;
            background-color: transparent;
            border: none;
            color: white;
            font-weight: 600;
            z-index: 1;
            cursor: pointer;
        }
        
        .rank-modal-content {
            background-color: #1F2130;
            background-image: 
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 30px 30px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: fadeInModal 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            position: relative;
            overflow: hidden;
        }

        .glow {
            filter: drop-shadow(0 0 8px currentColor);
        }
        .animated-glow {
             animation: glow-pulse 2s ease-in-out infinite;
        }
        @keyframes glow-pulse {
            0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
            50% { filter: drop-shadow(0 0 16px currentColor); }
        }

        /* Animation pour la bordure enflammée */
        @keyframes flame-border-animation {
            0% { border-image-source: linear-gradient(0deg, #fBBF24, #f87171, #f59e0b); }
            25% { border-image-source: linear-gradient(90deg, #fBBF24, #f87171, #f59e0b); }
            50% { border-image-source: linear-gradient(180deg, #fBBF24, #f87171, #f59e0b); }
            75% { border-image-source: linear-gradient(270deg, #fBBF24, #f87171, #f59e0b); }
            100% { border-image-source: linear-gradient(360deg, #fBBF24, #f87171, #f59e0b); }
        }
        
        /* Animation pour la bordure cosmique */
        @keyframes cosmic-border-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInModal {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes fiery-pulse {
            0% { box-shadow: 0 0 12px #fde047, 0 0 6px #f87171; }
            50% { box-shadow: 0 0 18px #f87171, 0 0 9px #fde047; }
            100% { box-shadow: 0 0 12px #fde047, 0 0 6px #f87171; }
        }

        .rank-badge-container {
            position: relative;
            z-index: 1;
        }

        .rank-modal-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(var(--accent-color), 0.1), transparent 70%);
            z-index: 0;
            pointer-events: none;
        }
        
        .progress-bar-tiers {
            display: flex;
            background-color: rgba(0,0,0,0.2);
            border-radius: 9999px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .progress-bar-tiers > div {
            flex: 1;
            height: 0.5rem;
            position: relative;
        }
        .progress-bar-tiers > div:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: rgba(0,0,0,0.3);
        }

        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: var(--color);
            opacity: 1;
            animation: fall 5s linear forwards;
        }
        @keyframes fall {
            to {
                transform: translateY(calc(100vh + 30px)) rotateZ(720deg);
                opacity: 0;
            }
        }
        
        /* Custom Dropdown */
        .custom-select-container {
            position: relative;
        }

        #info-card:has(.custom-select-options.active) {
            z-index: 60; /* Élève TOUTE la carte au-dessus des autres quand un menu est ouvert */
        }

        .custom-select-button {
            background-color: rgba(0,0,0, 0.2); /* Fond identique aux inputs */
            border: 1px solid rgba(255,255,255, 0.1);
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .custom-select-button:hover, .custom-select-button.active {
            border-color: var(--accent-color);
        }
        .custom-select-options {
            display: none;
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: #23253A;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 1rem;
            z-index: 50; /* Valeur plus élevée pour garantir la superposition */
            overflow: hidden;
            animation: fadeIn 0.2s ease;
        }
        .custom-select-options.active {
            display: block;
        }
        .custom-select-option {
            padding: 0.75rem 1rem;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .custom-select-option:hover {
            background-color: var(--accent-color);
            color: #111827;
        }

        @keyframes shake {
    0% { transform: translateX(0); }
    15% { transform: translateX(-5px); }
    30% { transform: translateX(5px); }
    45% { transform: translateX(-5px); }
    60% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
.animate-shake {
    animation: shake 0.5s ease-in-out;
}

.shop-content-scroll-area .glass-card {
    position: relative; /* Nécessaire pour le positionnement de l'effet */
    overflow: hidden;   /* Le reflet ne doit pas déborder de la carte */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes success-fx {
  /* L'animation principale gère la pulsation verte et le léger soulèvement */
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); /* Vert de votre thème */
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 15px 4px rgba(52, 211, 153, 0.4); /* Pulsation verte subtile */
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
  }
}

@keyframes shimmer-fx {
  /* Une seconde animation, uniquement pour le reflet, qui se jouera en même temps */
  100% {
    transform: translateX(150%);
  }
}

/* --- NOUVEAUX STYLES POUR LES SUCCÈS DÉTAILLÉS --- */
/* --- Système de notification --- */
@keyframes star-twinkle {
    0%, 100% { transform: scale(0.8); opacity: 0.7; }
    50% { transform: scale(1.2); opacity: 1; }
}

/* --- STYLES ENTIÈREMENT REVUS POUR LES SUCCÈS (V2) --- */

/* --- Système de notification --- */
/* --- STYLES ENTIÈREMENT REVUS POUR LES SUCCÈS (V3) --- */

/* --- Page Principale des Succès --- */
/* --- STYLES ENTIÈREMENT REVUS POUR LES SUCCÈS (V4) --- */

/* --- Page Principale des Succès --- */
.achievement-card {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    background: rgba(var(--glass-bg-rgb), 0.05);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(var(--glass-bg-rgb), 0.1);
    transition: all 0.2s ease-in-out;
}
.achievement-card:hover {
    background-color: rgba(var(--glass-bg-rgb), 0.1);
}
.achievement-icon-wrapper {
    width: 3.5rem; /* 56px */
    height: 3.5rem;
    background-color: rgba(0,0,0,0.2);
    border-radius: 0.5rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.lock-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D1D5DB; /* gray-300 */
    font-size: 1.25rem;
}
.has-rewards {
    border-color: rgba(253, 224, 71, 0.7);
    box-shadow: 0 0 15px rgba(253, 224, 71, 0.2);
}

/* --- Système de notification --- */
.notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #EF4444; /* red-500 */
    color: white;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
}


/* --- Styles de la Modale de Détail (FINALE V3) --- */
.tier-list-container { 
    list-style: none; 
    padding: 0; 
}
.tier-item {
    display: flex;
    position: relative;
    gap: 1.5rem;
    padding: 0;
}
.tier-timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2rem;
}
.tier-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    z-index: 1;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    background-color: #23253A;
}
.tier-connector {
    flex-grow: 1;
    width: 2px;
    background-color: #374151;
}
.tier-item:last-child .tier-connector {
    flex-grow: 0;
    height: 3.5rem;
}
.tier-details {
    flex-grow: 1;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}

/* --- Styles des Récompenses (TEXTE UNIQUEMENT) --- */
.tier-reward {
    font-size: 0.875rem; /* 14px */
    font-weight: 500;
    transition: all 0.3s ease;
}
.tier-reward.locked {
    color: #6B7280; /* Gris */
}
.tier-reward.claimable {
    color: #FBBF24; /* Jaune */
    font-weight: 600;
}
.tier-reward.claimed {
    color: #6B7280; /* Gris */
    text-decoration: line-through;
}

/* --- STYLES DES BOUTONS (TAILLE UNIFORME) --- */
.reward-btn {
    padding: 0.4rem 0; /* Ajustement du padding */
    width: 115px; /* Largeur fixe pour tous les boutons */
    font-size: 0.8rem;
    border-radius: 6px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.claim-btn { background-color: var(--accent-color); color: #111827; }
.claim-btn:hover { opacity: 0.9; }
.claimed-btn { background-color: #16A34A; color: white; cursor: not-allowed; }
.locked-btn { background-color: #374151; color: #6B7280; cursor: not-allowed; }

/* --- États des Paliers --- */
.tier-item.locked { opacity: 0.5; }
.tier-item.locked .tier-icon { background-color: #374151; color: #6B7280; }

.tier-item.current .tier-icon {
    background-color: #FBBF24;
    color: #111827;
}
.tier-item.current .tier-connector {
    background: linear-gradient(#FBBF24, #374151);
}

.tier-item.unlocked .tier-icon { 
    background-color: #FBBF24; 
    color: #111827; 
}
.tier-item.unlocked .tier-connector { 
    background-color: #FBBF24; 
}
.tier-item.unlocked:has(+ .tier-item.current) .tier-connector {
    background: linear-gradient(#FBBF24, #374151);
}

/* --- ANIMATION DU SABLIER --- */
@keyframes sand-flow-top {
    0%, 10% { transform: scaleY(1); }
    80%, 100% { transform: scaleY(0); }
}
@keyframes sand-flow-bottom {
    0%, 10% { transform: scaleY(0); }
    80%, 100% { transform: scaleY(1); }
}
@keyframes hourglass-flip {
    0%, 90% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}
.sablier {
    width: 14px;
    height: 22px;
	--sand-color: #483611;
    --glass-color: rgba(0, 0, 0, 0.2);
    --frame-color: #483611;
	--polygonH: polygon(0% 0%,100% 0%,100% 5.55%,95% 5.55%,95% 28%,60% 46%,60% 54%,95% 72%,95% 94.45%,100% 94.45%,100% 100%,0% 100%,0% 94.45%,5% 94.45%,5% 72%,40% 54%,40% 46%,5% 28%,5% 5.55%,0% 5.55%);
	animation-name: flip;
	animation-duration: 4s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
	background-image: linear-gradient(var(--frame-color) 1px, var(--glass-color) 1px 21px, var(--frame-color) 21px);
	clip-path: var(--polygonH);
	position: relative;
	z-index: 0;
}
.sablier:before {
	--polygonB1: polygon(0% 0%,100% 0%,100% 24%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,50% 47%,0% 24%);
	--polygonB2: polygon(0% 4%,100% 4%,100% 24%,55% 45%,55% 100%,55% 100%,55% 100%,45% 100%,45% 100%,45% 100%,45% 45%,0% 24%);
	--polygonB3: polygon(0% 24%,100% 24%,100% 24%,55% 45%,55% 80%,100% 100%,100% 100%,0% 100%,0% 100%,45% 80%,45% 45%,0% 24%);
	--polygonB4: polygon(45% 45%,55% 45%,55% 45%,55% 45%,55% 58%,100% 76%,100% 100%,0% 100%,0% 76%,45% 58%,45% 45%,45% 45%);
	--polygonB5: polygon(50% 53%,50% 53%,50% 53%,50% 53%,50% 53%,100% 76%,100% 100%,0% 100%,0% 76%,50% 53%,50% 53%,50% 53%);
	animation-name: fill;
	animation-duration: 4s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	content: "";
	display: block;
	position: absolute;
	background-color: var(--sand-color);
	clip-path: var(--polygonB1);
	top: 1px;
	left: 1px;
	width: 12px;
	height: 20px;
	z-index: 1;
}
@keyframes fill {
	from { clip-path: var(--polygonB1); }
	10% { clip-path: var(--polygonB2); }
	45% { clip-path: var(--polygonB3); }
	80% { clip-path: var(--polygonB4); }
	85%, to { clip-path: var(--polygonB5); }
}
@keyframes flip {
	from, 90% { transform: rotate(0); }
	to { transform: rotate(180deg); }
}

/* --- CODE FINAL ET DÉFINITIF POUR L'ANIMATION D'ÉCHEC COMBINÉE --- */

/* Animation 1 : La distorsion "glitch" (inchangée) */
@keyframes subtle-fail-fx {
  /* Le texte devient rouge immédiatement et le reste pendant le rebond */
  0%, 75% {
    color: #EF4444;
  }
  
  /* Le mouvement de rebond, adouci et moins ample */
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); } /* Mouvement réduit */
  50% { transform: translateX(4px); }  /* Mouvement réduit */
  75% { transform: translateX(-2px); }
  
  /* L'animation se termine en revenant à l'état initial (texte et position) */
  100% {
    transform: translateX(0);
    color: #111827; /* Couleur de texte de base */
  }
}

.animate-purchase-fail {
  /* On applique notre animation finale avec une durée rapide */
  animation: subtle-fail-fx 0.4s ease-out;
}

/* 3. NOUVELLE animation pour le succès d'achat (reflet élégant) */
.animate-purchase-success::after {
    /* Crée le reflet et lui applique sa propre animation */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 20%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0) 80%
    );
    transform: translateX(-150%);
    animation: shimmer-fx 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    pointer-events: none;
}

@keyframes shimmer-effect {
    to {
        transform: translateX(150%);
    }
}

@keyframes purchase-glow {
    0% { box-shadow: 0 0 0px 0px rgba(52, 211, 153, 0.7); }
    50% { box-shadow: 0 0 10px 3px rgba(52, 211, 153, 0.7); }
    100% { box-shadow: 0 0 0px 0px rgba(52, 211, 153, 0); }
}

@keyframes purchase-success-pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(167, 139, 250, 0); /* --accent-color */
    }
    50% {
        transform: scale(1.03); /* La carte se soulève légèrement */
        box-shadow: 0 0 15px 5px rgba(167, 139, 250, 0.3); /* Une pulsation douce avec la couleur d'accent */
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(167, 139, 250, 0);
    }
}

.animate-purchase-success {
    /* Applique l'animation de pulsation à la carte elle-même */
    animation: success-fx 0.7s ease-out forwards;
}

/* For profile save confirmation (optional, could be simple checkmark fade) */
@keyframes checkmark-fade-in {
    0% { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1); }
}
.animate-checkmark {
    animation: checkmark-fade-in 0.3s ease-out forwards;
}

/* Refined toast-notification styles for subtlety */
/* Make sure these overwrite any previous toast styles */
#toast-container {
    position: absolute; /* Positioned relative to the app-container */
    top: 20px; /* Distance from the top */
    left: 50%;
    transform: translateX(-50%);
    z-index: 100; /* Ensure it's on top */
    width: auto; /* Content-based width */
    max-width: 90%; /* Max width to prevent overflow */
    pointer-events: none; /* Allows clicks to pass through */
    display: flex; /* For centering content within its width */
    justify-content: center; /* Center toast horizontally */
}

.toast-notification {
    padding: 0.6rem 1.2rem; /* Reduced padding */
    border-radius: 9999px; /* Pill shape for "mega subtle" */
    font-weight: 600;
    text-align: center;
    font-size: 0.8rem; /* Smaller font size */
    box-shadow: 0 4px 12px rgba(0,0,0,0.3); /* Soft shadow */
    opacity: 0;
    transform: translateY(-20px); /* Start slightly above and move down */
    transition: all 0.3s cubic-bezier(0.25, 1.02, 0.73, 1); /* Smooth transition */
    visibility: hidden; /* Hide element until 'show' */
    white-space: nowrap; /* Prevent text wrapping */
}

.toast-notification.show {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
}

.shop-content-scroll-area {
    padding-bottom: 100px; /* Adjust this value if needed, needs to be more than nav height */
}

        /* Styles pour la modale de recadrage d'image */
        #cropper-modal-container {
            background-color: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
        }
        #cropper-modal-content {
            background-color: #1F2130;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        #cropper-image-container {
            width: 100%;
            height: 40vh;
            background-color: #111827;
        }
        .cropper-view-box,
        .cropper-face {
            border-radius: 50%;
        }

        showcase-container {
            background: rgba(0,0,0, 0.15);
            border-radius: 1.25rem;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .showcase-title-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem; /* Rapproche le crayon du titre */
            margin-bottom: 0.75rem;
        }

        .showcase-item {
    aspect-ratio: 1 / 1;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.75rem;
    /* On passe la bordure à 2px d'épaisseur */
    border: 2px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
}
        .showcase-item:hover {
            transform: scale(1.05);
            border-color: rgba(var(--accent-color), 0.5);
        }

        /* NOUVELLE Animation de reflet "Flash" */
        .showcase-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 30%;
            height: 100%;
            background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.25) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            /* Animation plus fréquente, mais avec un passage plus lent */
            animation: final-glare-animation 2.8s infinite cubic-bezier(0.83, 0, 0.17, 1);
            pointer-events: none;
        }

        @keyframes final-glare-animation {
            0% {
                transform: translateX(-200%) skewX(-25deg);
            }
            /* Le reflet prend plus de temps pour traverser (25% au lieu de 15%) */
            25% {
                transform: translateX(400%) skewX(-25deg);
            }
            100% {
                transform: translateX(400%) skewX(-25deg);
            }
        }

        /* --- SYSTÈME VISUEL DE RARETÉ --- */ 

        /* 1. COULEURS POUR LES TITRES */
        .rarity-commun-text { color: #9CA3AF; }      /* Gris */
        .rarity-rare-text { color: #60A5FA; }        /* Bleu */
        .rarity-epique-text { color: #8d62f0; }      /* Violet */
        .rarity-legendaire-text { color: #ffffff; }  /* Or */
        .rarity-mythique-text {
    background: repeating-linear-gradient(
        90deg,
    #f0d133 0%, /* Votre bleu turquoise de base */
    #fbdc81 50%, /* Un bleu-cyan très clair et éclatant */
    #f0d133 100% /* Retour à la couleur de base */
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;}    /* Jaune Vif */
        .rarity-divin-text {
    /* On crée un motif répétitif avec ses propres couleurs */
    background: repeating-linear-gradient(
        90deg,
    #42fdfd 0%, /* Votre bleu turquoise de base */
    #befffc 50%, /* Un bleu-cyan très clair et éclatant */
    #42fdfd 100% /* Retour à la couleur de base */
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

        /* 2. LUEUR BLANCHE POUR LES ICÔNES DE COLLECTION */
        /* Pas de lueur pour Commun */
        .icon-glow-rare { box-shadow: 0 0 4px 2px rgba(96, 165, 250, 0.7); } /* Bleu */
.icon-glow-epique { box-shadow: 0 0 6px 3px rgba(187, 136, 255, 0.7); } /* Violet */
.icon-glow-legendaire { box-shadow: 0 0 8px 4px rgba(255, 255, 255, 0.8); }
.icon-glow-mythique { box-shadow: 0 0 10px 5px rgba(255, 226, 81, 0.9); } /* Jaune Vif */
.icon-glow-divin {
    box-shadow: 0 0 10px 6px #fff, 0 0 10px 10px #42fdfd;
}
.icon-glow-createur {
    box-shadow: 0 0 10px 6px #fff, 0 0 10px 10px #B91C1C;
}

.rarity-commun-border {
    border-color: #6B7280; /* Gris sobre */
}
.rarity-rare-border {
    border-color: #60A5FA; /* Bleu */
}
.rarity-epique-border {
    border-color: #8d62f0; /* Violet */
}
.rarity-legendaire-border {
    border-color: #ffffff; /* Or */
}
.rarity-mythique-border {
    border-color: #f0d133; /* Jaune Vif */
}
.rarity-divin-border {
    border-color: #06B6D4;
}
.rarity-createur-border {
    border-color: #B91C1C;
}

.rarity-createur-text {
    background: repeating-linear-gradient(
        90deg,
        #B91C1C 0%,
        #d75c53 50%,
        #B91C1C 100%
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

@keyframes scroll-infiniment {
    0% {
        background-position: 0% 50%;
    }
    100% {
        /* On déplace le fond d'une très grande distance pour assurer le défilement */
        background-position: 400% 50%;
    }
}

/* 2. Icône Divine avec un dégradé répétitif */
.animated-icon-divin {
    /* On crée un motif répétitif avec ses propres couleurs */
    background: repeating-linear-gradient(
        90deg,
    #42fdfd 0%, /* Votre bleu turquoise de base */
    #befffc 50%, /* Un bleu-cyan très clair et éclatant */
    #42fdfd 100% /* Retour à la couleur de base */
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

/* 3. Icône Créateur avec son propre dégradé répétitif */
.animated-icon-createur {
    /* On crée un motif répétitif avec ses propres couleurs */
    background: repeating-linear-gradient(
        90deg,
        #B91C1C 0%,
        #d75c53 50%,
        #B91C1C 100%
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

.animated-icon-mythique {
    /* On crée un motif répétitif avec ses propres couleurs */
    background: repeating-linear-gradient(
        90deg,
    #f0d133 0%, /* Votre bleu turquoise de base */
    #fbdc81 50%, /* Un bleu-cyan très clair et éclatant */
    #f0d133 100% /* Retour à la couleur de base */
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

.title-gymbro-originel {
    background: repeating-linear-gradient(
        90deg,
    #E91E63 0%, /* Rose bonbon profond, couleur de base */
    #FFC0CB 50%, /* Rose très clair et lumineux */
    #E91E63 100% /* Retour à la couleur de base */
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}
.title-pompier-muscle, .title-the-bench-monster {
    background: repeating-linear-gradient(
        90deg,
    #E8612A 0%, /* Orange brûlé, couleur de base */
    #FFB380 50%, /* Un orange très clair et lumineux */
    #E8612A 100% /* Retour à la couleur de base */
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

.title-createur-supreme {
    /* On crée un motif répétitif avec ses propres couleurs */
    background: repeating-linear-gradient(
        90deg,
        #B91C1C 0%,
        #d75c53 50%,
        #B91C1C 100%
    );
    background-size: 400% 400%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    /* On utilise la même animation pour la cohérence */
    animation: scroll-infiniment 6s linear infinite;
}

        /* --- NOUVELLES KEYFRAMES D'ANIMATION --- */

        /* Animation "Glitch" pour les objets Épiques */
        @keyframes epic-glitch-text {
            0%, 5%, 100% { text-shadow: 0 0 5px #A78BFA; transform: translateX(0); }
            5.1% { text-shadow: 0 0 10px #EC4899, 2px 2px 2px #60A5FA; transform: translateX(-3px); }
            5.2% { text-shadow: 0 0 10px #EC4899, -2px -2px 2px #60A5FA; transform: translateX(3px); }
            5.3% { text-shadow: 0 0 5px #A78BFA; transform: translateX(0); }
        }

        @keyframes celestial-aura-border {
    0%, 100% {
        box-shadow: 0 0 15px 5px #E0F2FE, 0 0 25px 10px #06B6D4, inset 0 0 10px #fff;
    }
    50% {
        box-shadow: 0 0 25px 8px #E0F2FE, 0 0 40px 15px #06B6D4, inset 0 0 15px #fff;
    }
}

        @keyframes epic-glitch-aura {
    0%, 5%, 100% { box-shadow: 0 0 12px 3px rgba(167, 139, 250, 0.7); }
    5.1% { box-shadow: 4px 0 12px 3px rgba(236, 72, 153, 0.7), -4px 0 12px 3px rgba(96, 165, 250, 0.7); }
    5.2% { box-shadow: -4px 0 12px 3px rgba(236, 72, 153, 0.7), 4px 0 12px 3px rgba(96, 165, 250, 0.7); }
    5.3% { box-shadow: 0 0 12px 3px rgba(167, 139, 250, 0.7); }
}

        /* Animation "Aura" pour les objets Légendaires */
        @keyframes legendary-aura-pulse {
            0%, 100% { filter: drop-shadow(0 0 10px #FBBF24) drop-shadow(0 0 5px #FFFFFF); }
            50% { filter: drop-shadow(0 0 18px #F59E0B) drop-shadow(0 0 8px #FFFFFF); }
        }

        /* Animation "Énergie" pour les objets Mythiques */
        @keyframes mythic-crackle {
            0%, 100% { text-shadow: 2px 2px 2px #A78BFA, -2px -2px 2px #FDE047; }
            25% { text-shadow: -2px 2px 2px #A78BFA, 2px -2px 2px #FDE047; }
            50% { text-shadow: 2px -2px 2px #A78BFA, -2px 2px 2px #FDE047; }
            75% { text-shadow: -2px -2px 2px #A78BFA, 2px 2px 2px #FDE047; }
        }
        @keyframes mythic-aura-pulse {
            0%, 100% { filter: drop-shadow(0 0 15px #FFFFFF) drop-shadow(0 0 25px #A78BFA); }
            50% { filter: drop-shadow(0 0 25px #FFFFFF) drop-shadow(0 0 40px #A78BFA); }
        }

        /* Animation "Nébuleuse" pour la bordure Mythique */
        @keyframes mythic-nebula-border {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Animation "Solaire" pour la bordure Légendaire */
        @keyframes solar-flare-border {
    0%, 100% { 
        /* On retire "inset" pour que l'ombre soit uniquement extérieure */
        box-shadow: 0 0 20px 3px #FBBF24; 
    }
    50% { 
        box-shadow: 0 0 30px 8px #FBBF24; 
    }
}

    </style>
</head>
<body class="flex justify-center items-center min-h-screen p-4">

    <div id="app-container" class="app-container relative w-full max-w-md h-[850px] max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden border-2 border-gray-800">
        <div id="toast-container"></div>
        <div id="cropper-modal-container" class="fixed inset-0 z-40 hidden"></div>
        <div id="page-container" class="absolute inset-0 overflow-y-auto scrollbar-hide"></div>
        <div id="bottom-nav-container" class="absolute bottom-4 left-4 right-4 h-16 z-20"></div>
        <div id="global-modal-container" class="fixed inset-0 z-30 pointer-events-none"></div>
        <div id="scanner-container" class="fixed inset-0 z-40 hidden"></div>
    </div>

 <script type="module">
        // --- SYSTÈME DE RANGS ---
        const RANK_NAMES = ['Novice', 'Rookie', 'Disciple', 'Forgeron', 'Vétéran', 'Prodige', 'Colosse', 'Demi-Dieu'];
const RANK_POINTS_MAP = {
            'Novice III': 1, 'Novice II': 2, 'Novice I': 3,
            'Rookie III': 4, 'Rookie II': 5, 'Rookie I': 6,
            'Disciple III': 7, 'Disciple II': 8, 'Disciple I': 9,
            'Forgeron III': 10, 'Forgeron II': 11, 'Forgeron I': 12,
            'Vétéran III': 13, 'Vétéran II': 14, 'Vétéran I': 15,
            'Prodige III': 16, 'Prodige II': 17, 'Prodige I': 18,
            'Colosse III': 19, 'Colosse II': 20, 'Colosse I': 21,
            'Demi-Dieu III': 22, 'Demi-Dieu II': 23, 'Demi-Dieu I': 24
        };
        const REVERSE_RANK_POINTS_MAP = Object.fromEntries(Object.entries(RANK_POINTS_MAP).map(([name, points]) => [points, name]));
        const RANK_DESCRIPTIONS = {
            'Novice': "Chaque légende a un point de départ. Le vôtre est ici.",
            'Rookie': "La détermination porte ses fruits. Vous n'êtes plus un débutant.",
            'Disciple': "La discipline est votre alliée. La technique s'affine, la force grandit.",
            'Forgeron': "Vous ne subissez plus l'entraînement, vous le forgez. Chaque série est un coup de marteau.",
            'Vétéran': "Les poids vous connaissent et vous respectent. Votre expérience parle sur le terrain.",
            'Prodige': "Votre potentiel dépassait les attentes. Un talent rare est né.",
            'Colosse': "Votre présence impose le silence. Une force de la nature, sculptée par la fonte.",
            'Demi-Dieu': "Vous marchez parmi les mortels, mais votre force appartient à l'Olympe."
        };
        const EXERCISE_DATABASE = [];
        const MUSCLE_GROUPS = {
            pecs: 'Pectoraux', dos: 'Dos', epaules: 'Épaules', biceps: 'Biceps',
            triceps: 'Triceps', jambes: 'Jambes', abdos: 'Abdos'
        };
        
        const COUNTRY_LIST = [
    { name: 'Afghanistan', code: 'af' },
    { name: 'Afrique du Sud', code: 'za' },
    { name: 'Albanie', code: 'al' },
    { name: 'Algérie', code: 'dz' },
    { name: 'Allemagne', code: 'de' },
    { name: 'Andorre', code: 'ad' },
    { name: 'Angola', code: 'ao' },
    { name: 'Anguilla', code: 'ai' },
    { name: 'Antigua-et-Barbuda', code: 'ag' },
    { name: 'Arabie saoudite', code: 'sa' },
    { name: 'Argentine', code: 'ar' },
    { name: 'Arménie', code: 'am' },
    { name: 'Aruba', code: 'aw' },
    { name: 'Australie', code: 'au' },
    { name: 'Autriche', code: 'at' },
    { name: 'Azerbaïdjan', code: 'az' },
    { name: 'Bahamas', code: 'bs' },
    { name: 'Bahreïn', code: 'bh' },
    { name: 'Bangladesh', code: 'bd' },
    { name: 'Barbade', code: 'bb' },
    { name: 'Belgique', code: 'be' },
    { name: 'Belize', code: 'bz' },
    { name: 'Bénin', code: 'bj' },
    { name: 'Bermudes', code: 'bm' },
    { name: 'Bhoutan', code: 'bt' },
    { name: 'Biélorussie', code: 'by' },
    { name: 'Bolivie', code: 'bo' },
    { name: 'Bosnie-Herzégovine', code: 'ba' },
    { name: 'Botswana', code: 'bw' },
    { name: 'Brésil', code: 'br' },
    { name: 'Brunei Darussalam', code: 'bn' },
    { name: 'Bulgarie', code: 'bg' },
    { name: 'Burkina Faso', code: 'bf' },
    { name: 'Burundi', code: 'bi' },
    { name: 'Cambodge', code: 'kh' },
    { name: 'Cameroun', code: 'cm' },
    { name: 'Canada', code: 'ca' },
    { name: 'Cap-Vert', code: 'cv' },
    { name: 'République centrafricaine', code: 'cf' },
    { name: 'Chili', code: 'cl' },
    { name: 'Chine', code: 'cn' },
    { name: 'Chypre', code: 'cy' },
    { name: 'Colombie', code: 'co' },
    { name: 'Comores', code: 'km' },
    { name: 'Congo', code: 'cg' },
    { name: 'Congo, République démocratique du', code: 'cd' },
    { name: 'Corée, République de', code: 'kr' },
    { name: "Corée, République populaire démocratique de", code: 'kp' },
    { name: 'Costa Rica', code: 'cr' },
    { name: "Côte d'Ivoire", code: 'ci' },
    { name: 'Croatie', code: 'hr' },
    { name: 'Cuba', code: 'cu' },
    { name: 'Curaçao', code: 'cw' },
    { name: 'Danemark', code: 'dk' },
    { name: 'Djibouti', code: 'dj' },
    { name: 'Dominique', code: 'dm' },
    { name: 'Égypte', code: 'eg' },
    { name: 'El Salvador', code: 'sv' },
    { name: 'Émirats arabes unis', code: 'ae' },
    { name: 'Équateur', code: 'ec' },
    { name: 'Érythrée', code: 'er' },
    { name: 'Espagne', code: 'es' },
    { name: 'Estonie', code: 'ee' },
    { name: 'États-Unis', code: 'us' },
    { name: 'Éthiopie', code: 'et' },
    { name: 'Fidji', code: 'fj' },
    { name: 'Finlande', code: 'fi' },
    { name: 'France', code: 'fr' },
    { name: 'Gabon', code: 'ga' },
    { name: 'Gambie', code: 'gm' },
    { name: 'Géorgie', code: 'ge' },
    { name: 'Ghana', code: 'gh' },
    { name: 'Gibraltar', code: 'gi' },
    { name: 'Grèce', code: 'gr' },
    { name: 'Grenade', code: 'gd' },
    { name: 'Groenland', code: 'gl' },
    { name: 'Guam', code: 'gu' },
    { name: 'Guatemala', code: 'gt' },
    { name: 'Guinée', code: 'gn' },
    { name: 'Guinée équatoriale', code: 'gq' },
    { name: 'Guinée-Bissau', code: 'gw' },
    { name: 'Guyana', code: 'gy' },
    { name: 'Haïti', code: 'ht' },
    { name: 'Honduras', code: 'hn' },
    { name: 'Hongrie', code: 'hu' },
    { name: 'Îles Caïmans', code: 'ky' },
    { name: 'Îles Cook', code: 'ck' },
    { name: 'Îles Féroé', code: 'fo' },
    { name: 'Îles Marshall', code: 'mh' },
    { name: 'Îles Salomon', code: 'sb' },
    { name: 'Îles Turques et Caïques', code: 'tc' },
    { name: 'Îles Vierges britanniques', code: 'vg' },
    { name: 'Îles Vierges des États-Unis', code: 'vi' },
    { name: 'Inde', code: 'in' },
    { name: 'Indonésie', code: 'id' },
    { name: 'Iran', code: 'ir' },
    { name: 'Iraq', code: 'iq' },
    { name: 'Irlande', code: 'ie' },
    { name: 'Islande', code: 'is' },
    { name: 'Israël', code: 'il' },
    { name: 'Italie', code: 'it' },
    { name: 'Jamaïque', code: 'jm' },
    { name: 'Japon', code: 'jp' },
    { name: 'Jordanie', code: 'jo' },
    { name: 'Kazakhstan', code: 'kz' },
    { name: 'Kenya', code: 'ke' },
    { name: 'Kirghizistan', code: 'kg' },
    { name: 'Kiribati', code: 'ki' },
    { name: 'Koweït', code: 'kw' },
    { name: 'Laos', code: 'la' },
    { name: 'Lesotho', code: 'ls' },
    { name: 'Lettonie', code: 'lv' },
    { name: 'Liban', code: 'lb' },
    { name: 'Libéria', code: 'lr' },
    { name: 'Libye', code: 'ly' },
    { name: 'Liechtenstein', code: 'li' },
    { name: 'Lituanie', code: 'lt' },
    { name: 'Luxembourg', code: 'lu' },
    { name: 'Macédoine du Nord', code: 'mk' },
    { name: 'Madagascar', code: 'mg' },
    { name: 'Malaisie', code: 'my' },
    { name: 'Malawi', code: 'mw' },
    { name: 'Maldives', code: 'mv' },
    { name: 'Mali', code: 'ml' },
    { name: 'Malte', code: 'mt' },
    { name: 'Maroc', code: 'ma' },
    { name: 'Martinique', code: 'mq' },
    { name: 'Maurice', code: 'mu' },
    { name: 'Mauritanie', code: 'mr' },
    { name: 'Mayotte', code: 'yt' },
    { name: 'Mexique', code: 'mx' },
    { name: 'Micronésie', code: 'fm' },
    { name: 'Moldavie', code: 'md' },
    { name: 'Monaco', code: 'mc' },
    { name: 'Mongolie', code: 'mn' },
    { name: 'Monténégro', code: 'me' },
    { name: 'Montserrat', code: 'ms' },
    { name: 'Mozambique', code: 'mz' },
    { name: 'Myanmar', code: 'mm' },
    { name: 'Namibie', code: 'na' },
    { name: 'Nauru', code: 'nr' },
    { name: 'Népal', code: 'np' },
    { name: 'Nicaragua', code: 'ni' },
    { name: 'Niger', code: 'ne' },
    { name: 'Nigéria', code: 'ng' },
    { name: 'Niue', code: 'nu' },
    { name: 'Norvège', code: 'no' },
    { name: 'Nouvelle-Calédonie', code: 'nc' },
    { name: 'Nouvelle-Zélande', code: 'nz' },
    { name: 'Oman', code: 'om' },
    { name: 'Ouganda', code: 'ug' },
    { name: 'Ouzbékistan', code: 'uz' },
    { name: 'Pakistan', code: 'pk' },
    { name: 'Palaos', code: 'pw' },
    { name: 'Palestine, État de', code: 'ps' },
    { name: 'Panama', code: 'pa' },
    { name: 'Papouasie-Nouvelle-Guinée', code: 'pg' },
    { name: 'Paraguay', code: 'py' },
    { name: 'Pays-Bas', code: 'nl' },
    { name: 'Pérou', code: 'pe' },
    { name: 'Philippines', code: 'ph' },
    { name: 'Pologne', code: 'pl' },
    { name: 'Polynésie française', code: 'pf' },
    { name: 'Porto Rico', code: 'pr' },
    { name: 'Portugal', code: 'pt' },
    { name: 'Qatar', code: 'qa' },
    { name: 'Réunion', code: 're' },
    { name: 'Roumanie', code: 'ro' },
    { name: 'Royaume-Uni', code: 'gb' },
    { name: 'Russie', code: 'ru' },
    { name: 'Rwanda', code: 'rw' },
    { name: 'Saint-Kitts-et-Nevis', code: 'kn' },
    { name: 'Saint-Marin', code: 'sm' },
    { name: 'Saint-Vincent-et-les-Grenadines', code: 'vc' },
    { name: 'Sainte-Hélène', code: 'sh' },
    { name: 'Sainte-Lucie', code: 'lc' },
    { name: 'Samoa', code: 'ws' },
    { name: 'Samoa américaines', code: 'as' },
    { name: 'Sao Tomé-et-Principe', code: 'st' },
    { name: 'Sénégal', code: 'sn' },
    { name: 'Serbie', code: 'rs' },
    { name: 'Seychelles', code: 'sc' },
    { name: 'Sierra Leone', code: 'sl' },
    { name: 'Singapour', code: 'sg' },
    { name: 'Slovaquie', code: 'sk' },
    { name: 'Slovénie', code: 'si' },
    { name: 'Somalie', code: 'so' },
    { name: 'Soudan', code: 'sd' },
    { name: 'Soudan du Sud', code: 'ss' },
    { name: 'Sri Lanka', code: 'lk' },
    { name: 'Suède', code: 'se' },
    { name: 'Suisse', code: 'ch' },
    { name: 'Suriname', code: 'sr' },
    { name: 'Syrie', code: 'sy' },
    { name: 'Tadjikistan', code: 'tj' },
    { name: 'Tanzanie', code: 'tz' },
    { name: 'Tchad', code: 'td' },
    { name: 'Tchéquie', code: 'cz' },
    { name: 'Thaïlande', code: 'th' },
    { name: 'Timor-Leste', code: 'tl' },
    { name: 'Togo', code: 'tg' },
    { name: 'Tonga', code: 'to' },
    { name: 'Trinité-et-Tobago', code: 'tt' },
    { name: 'Tunisie', code: 'tn' },
    { name: 'Turkménistan', code: 'tm' },
    { name: 'Turquie', code: 'tr' },
    { name: 'Tuvalu', code: 'tv' },
    { name: 'Ukraine', code: 'ua' },
    { name: 'Uruguay', code: 'uy' },
    { name: 'Vanuatu', code: 'vu' },
    { name: 'Venezuela', code: 've' },
    { name: 'Vietnam', code: 'vn' },
    { name: 'Yémen', code: 'ye' },
    { name: 'Zambie', code: 'zm' },
    { name: 'Zimbabwe', code: 'zw' }
];

// DANS VOTRE SCRIPT, TROUVEZ CETTE LIGNE ET AJOUTEZ 'Créateur'
const RARITY_ORDER = { 'Commun': 1, 'Rare': 2, 'Épique': 3, 'Légendaire': 4, 'Mythique': 5, 'Divin': 6, 'Créateur': 7 };

// --- UTILITY FUNCTIONS ---
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const getExerciseById = (id) => EXERCISE_DATABASE.find(ex => ex.id === id) || { id: null, name: 'Exercice Inconnu', type: 'weighted', coefficient: 0, targetScore: 1, groups: [] };

const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const truncateText = (text, maxLength) => (!text || text.length <= maxLength) ? text : text.substring(0, maxLength) + '...';

        function initializeDatabase() {
            // Liste complète avec objectifs de performance rééquilibrés
            const exerciseList = [
                // PUSH
                { name: "Développé couché à la barre", type: 'weighted', coefficient: 1.0, targetPerf: { load: 2.1, reps: 5 }, groups: { pecs: 0.6, epaules: 0.25, triceps: 0.15 } },
                { name: "Développé incliné à la barre", type: 'weighted', coefficient: 0.9, targetPerf: { load: 1.75, reps: 5 }, groups: { pecs: 0.7, epaules: 0.3 } },
                { name: "Développé décliné à la barre", type: 'weighted', coefficient: 1.05, targetPerf: { load: 2.2, reps: 5 }, groups: { pecs: 0.8, triceps: 0.2 } },
                { name: "Développé couché aux haltères", type: 'weighted', coefficient: 0.9, targetPerf: { load: 0.9, reps: 6 }, groups: { pecs: 0.6, epaules: 0.25, triceps: 0.15 } },
                { name: "Développé incliné aux haltères", type: 'weighted', coefficient: 0.8, targetPerf: { load: 0.8, reps: 6 }, groups: { pecs: 0.7, epaules: 0.3 } },
                { name: "Développé décliné aux haltères", type: 'weighted', coefficient: 0.95, targetPerf: { load: 0.95, reps: 6 }, groups: { pecs: 0.8, triceps: 0.2 } },
                { name: "Développé militaire à la barre", type: 'weighted', coefficient: 0.7, targetPerf: { load: 1.4, reps: 5 }, groups: { epaules: 0.8, triceps: 0.2 } },
                { name: "Développé militaire aux haltères", type: 'weighted', coefficient: 0.65, targetPerf: { load: 0.7, reps: 6 }, groups: { epaules: 1.0 } },
                { name: "Développé militaire à la machine", type: 'weighted', coefficient: 0.65, targetPerf: { load: 1.55, reps: 8 }, groups: { epaules: 1.0 } },
                { name: "Développé Arnold", type: 'weighted', coefficient: 0.6, targetPerf: { load: 0.65, reps: 8 }, groups: { epaules: 1.0 } },
                { name: "Dips", type: 'bodyweight', pdcPercent: 0.9, coefficient: 1.1, targetPerf: { load: 1.0, reps: 25 }, groups: { pecs: 0.4, triceps: 0.5, epaules: 0.1 } },
                { name: "Pompes", type: 'bodyweight', pdcPercent: 0.65, coefficient: 0.8, targetPerf: { load: 0.8, reps: 50 }, groups: { pecs: 0.6, triceps: 0.3, epaules: 0.1 } },
                { name: "Pompes déclinées", type: 'bodyweight', pdcPercent: 0.7, coefficient: 0.7, targetPerf: { load: 0.5, reps: 40 }, groups: { pecs: 0.7, triceps: 0.2, epaules: 0.1 } },
                { name: "Pompes inclinées", type: 'bodyweight', pdcPercent: 0.6, coefficient: 0.6, targetPerf: { load: 0.4, reps: 60 }, groups: { pecs: 0.8, triceps: 0.2 } },
                { name: "Pompes diamant", type: 'bodyweight', pdcPercent: 0.6, coefficient: 0.75, targetPerf: { load: 0.6, reps: 35 }, groups: { triceps: 0.7, pecs: 0.3 } },
                { name: "Skull crusher", type: 'weighted', coefficient: 0.5, targetPerf: { load: 0.8, reps: 8 }, groups: { triceps: 1.0 } },
                { name: "Extension triceps poulie haute", type: 'weighted', coefficient: 0.4, targetPerf: { load: 0.75, reps: 10 }, groups: { triceps: 1.0 } },
                { name: "Écarté couché aux haltères", type: 'weighted', coefficient: 0.45, targetPerf: { load: 0.42, reps: 12 }, groups: { pecs: 1.0 } },
                { name: "Papillon (Peck-deck)", type: 'weighted', coefficient: 0.6, targetPerf: { load: 1.4, reps: 10 }, groups: { pecs: 1.0 } },
                { name: "Élévation latérale aux haltères", type: 'weighted', coefficient: 0.4, targetPerf: { load: 0.36, reps: 12 }, groups: { epaules: 1.0 } },
                // PULL
                { name: "Soulevé de terre", type: 'weighted', coefficient: 1.25, targetPerf: { load: 3.2, reps: 3 }, groups: { dos: 0.6, jambes: 0.4 } },
                { name: "Soulevé de terre jambes tendues", type: 'weighted', coefficient: 0.9, targetPerf: { load: 2.0, reps: 8 }, groups: { jambes: 0.7, dos: 0.3 } },
                { name: "Tractions pronation", type: 'bodyweight', pdcPercent: 0.95, coefficient: 1.2, targetPerf: { load: 0.7, reps: 25 }, groups: { dos: 0.8, biceps: 0.2 } },
                { name: "Tractions supination", type: 'bodyweight', pdcPercent: 0.95, coefficient: 1.2, targetPerf: { load: 0.8, reps: 25 }, groups: { dos: 0.6, biceps: 0.4 } },
                { name: "Muscle Up", type: 'bodyweight', pdcPercent: 1.1, coefficient: 1.5, targetPerf: { load: 0.45, reps: 15 }, groups: { dos: 0.5, epaules: 0.2, triceps: 0.2, pecs: 0.1 } },
                { name: "Rowing barre buste penché", type: 'weighted', coefficient: 0.9, targetPerf: { load: 2.1, reps: 8 }, groups: { dos: 0.85, biceps: 0.15 } },
                { name: "Rowing T-bar", type: 'weighted', coefficient: 0.95, targetPerf: { load: 2.0, reps: 8 }, groups: { dos: 0.9, biceps: 0.1 } },
                { name: "Rowing haltères unilatéral", type: 'weighted', coefficient: 0.85, targetPerf: { load: 1.1, reps: 8 }, groups: { dos: 0.9, biceps: 0.1 } },
                { name: "Tirage vertical", type: 'weighted', coefficient: 0.8, targetPerf: { load: 1.7, reps: 8 }, groups: { dos: 0.8, biceps: 0.2 } },
                { name: "Tirage horizontal", type: 'weighted', coefficient: 0.75, targetPerf: { load: 1.6, reps: 10 }, groups: { dos: 0.8, biceps: 0.2 } },
                { name: "Curl barre EZ", type: 'weighted', coefficient: 0.4, targetPerf: { load: 0.9, reps: 8 }, groups: { biceps: 1.0 } },
                { name: "Curl haltères", type: 'weighted', coefficient: 0.45, targetPerf: { load: 0.42, reps: 8 }, groups: { biceps: 1.0 } },
                { name: "Face pull", type: 'weighted', coefficient: 0.3, targetPerf: { load: 0.7, reps: 15 }, groups: { epaules: 0.7, dos: 0.3 } },
                { name: "Shrug", type: 'weighted', coefficient: 1.1, targetPerf: { load: 2.7, reps: 12 }, groups: { dos: 1.0 } }, // Principalement trapèzes (dos)
                // LEGS
                { name: "Squat à la barre", type: 'weighted', coefficient: 1.2, targetPerf: { load: 2.6, reps: 5 }, groups: { jambes: 1.0 } },
                { name: "Squat", type: 'bodyweight', pdcPercent: 1.0, coefficient: 0.8, targetPerf: { load: 0.8, reps: 60 }, groups: { jambes: 1.0 } },
                { name: "Front squat", type: 'weighted', coefficient: 1.0, targetPerf: { load: 2.3, reps: 5 }, groups: { jambes: 1.0 } },
                { name: "Presse à cuisse", type: 'weighted', coefficient: 1.8, targetPerf: { load: 5.7, reps: 10 }, groups: { jambes: 1.0 } },
                { name: "Hack squat", type: 'weighted', coefficient: 1.6, targetPerf: { load: 3.4, reps: 8 }, groups: { jambes: 1.0 } },
                { name: "Fentes", type: 'bodyweight', pdcPercent: 0.8, coefficient: 0.7, targetPerf: { load: 0.9, reps: 25 }, groups: { jambes: 1.0 } },
                { name: "Leg extension", type: 'weighted', coefficient: 0.6, targetPerf: { load: 1.55, reps: 12 }, groups: { jambes: 1.0 } },
                { name: "Hip thrust à la barre", type: 'weighted', coefficient: 1.5, targetPerf: { load: 3.5, reps: 10 }, groups: { jambes: 1.0 } },
                { name: "Extension mollets", type: 'weighted', coefficient: 0.8, targetPerf: { load: 2.8, reps: 15 }, groups: { jambes: 1.0 } },
                // CORE & OTHER
                { name: "Crunch à la poulie", type: 'weighted', coefficient: 0.4, targetPerf: { load: 1.2, reps: 15 }, groups: { abdos: 1.0 } },
                { name: "Relevé de jambes suspendu", type: 'bodyweight', pdcPercent: 0.15, coefficient: 0.7, targetPerf: { load: 0.25, reps: 30 }, groups: { abdos: 1.0 } },
                { name: "Gainage", type: 'timed', pdcPercent: 1.0, coefficient: 1.0, targetPerf: { reps: 480 }, groups: { abdos: 0.8, dos: 0.2 } },
                { name: "Farmer’s walk", type: 'timed', coefficient: 1.1, targetPerf: { load: 1.45, reps: 90 }, groups: { dos: 0.5, jambes: 0.3, epaules: 0.2 } },
            ];

            EXERCISE_DATABASE.length = 0;

            const bodyweightForTargetCalc = 80;

            exerciseList.forEach((exo, index) => {
                const targetCharge = (exo.targetPerf.load || 0) * (exo.type.includes('bodyweight') ? 1 : bodyweightForTargetCalc);
                const targetScore = calculatePerformanceScore({
                    type: exo.type, charge: targetCharge, reps: exo.targetPerf.reps,
                    poidsDuCorps: bodyweightForTargetCalc, coefficient: exo.coefficient,
                    pdcPercent: exo.pdcPercent || 0,
                });
                EXERCISE_DATABASE.push({
                    id: `ex${String(index + 1).padStart(3, '0')}`, name: exo.name, type: exo.type,
                    coefficient: exo.coefficient, pdcPercent: exo.pdcPercent || 0,
                    targetScore: targetScore, groups: exo.groups || []
                });
            });
        }

        function initializeTags() {
    // Tags par défaut pour les séances
    if (state.workoutTags.length === 0) {
        state.workoutTags = [
            { id: generateId(), name: 'Push', color: '#F87171' },
            { id: generateId(), name: 'Pull', color: '#60A5FA' },
            { id: generateId(), name: 'Legs', color: '#34D399' },
            { id: generateId(), name: 'Upper', color: '#FBBF24' },
            { id: generateId(), name: 'Lower', color: '#A78BFA' },
            { id: generateId(), name: 'Full Body', color: '#EC4899' },
        ];
    }
    // Tags par défaut pour les repas
    if (state.mealTags.length === 0) {
        state.mealTags = [
            { id: generateId(), name: 'Petit-Déjeuner', color: '#FBBF24' },
            { id: generateId(), name: 'Déjeuner', color: '#34D399' },
            { id: generateId(), name: 'Dîner', color: '#60A5FA' },
            { id: generateId(), name: 'Collation', color: '#A78BFA' },
        ];
    }
}

function getClaimableRewardsCount(achievementId = null) {
    let claimableCount = 0;
    const achievementsToScan = achievementId 
        ? [ACHIEVEMENTS_DATABASE.find(a => a.id === achievementId)] 
        : ACHIEVEMENTS_DATABASE;

    for (const ach of achievementsToScan) {
        if (!ach) continue;
        
        const achData = state.userProfile.achievements[ach.id] || { progress: 0, claimedTiers: [] };
        const currentValue = achData.progress;
        const claimedTiers = achData.claimedTiers;

        ach.tiers.forEach((tier, index) => {
            const isUnlocked = currentValue >= tier.goal;
            const isClaimed = claimedTiers.includes(index);

            if (isUnlocked && !isClaimed) {
                claimableCount++;
            }
        });
    }
    return claimableCount;
}

function getAchievementProgressPercent(achievement) {
    if (!achievement || !achievement.tiers || achievement.tiers.length === 0) {
        return 0;
    }
    const achData = state.userProfile.achievements[achievement.id] || { progress: 0 };
    const currentValue = achData.progress;
    const totalTiers = achievement.tiers.length;

    // AJOUT : Gère les succès avec un seul palier en calculant le pourcentage vers l'objectif unique.
    if (totalTiers === 1) {
        const goal = achievement.tiers[0].goal;
        if (goal <= 0) return 0; // Évite la division par zéro
        const percent = (currentValue / goal) * 100;
        return Math.min(percent, 100); // Plafonne à 100%
    }

    // L'ancienne logique reste correcte pour les succès à plusieurs paliers.
    let tiersCompleted = 0;
    for (const tier of achievement.tiers) {
        if (currentValue >= tier.goal) {
            tiersCompleted++;
        }
    }
    return (tiersCompleted / totalTiers) * 100;
}

function lightenColor(hex, percent) {
    let f = parseInt(hex.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function calculateGlobalAchievementProgress() {
    let totalProgressFraction = 0;
    let fullyCompletedCount = 0;

    // --- CHANGEMENT CLÉ ICI ---
    // On filtre la base de données pour exclure tous les succès cachés du calcul.
    const achievements = ACHIEVEMENTS_DATABASE.filter(ach => !ach.isHidden);

    if (achievements.length === 0) return { percentage: 0, completed: 0, total: 0, fullyCompletedCount: 0 };

    achievements.forEach(ach => {
        const currentValue = state.userProfile.achievements[ach.id]?.progress || 0;
        const totalTiers = ach.tiers.length;
        let tiersCompleted = 0;

        for (const tier of ach.tiers) {
            if (currentValue >= tier.goal) {
                tiersCompleted++;
            }
        }

        totalProgressFraction += (tiersCompleted / totalTiers);

        if (totalTiers > 0 && currentValue >= ach.tiers[totalTiers - 1].goal) {
            fullyCompletedCount++;
        }
    });

    const overallPercentage = (totalProgressFraction / achievements.length) * 100;

    return {
        percentage: overallPercentage.toFixed(1),
        completed: totalProgressFraction.toFixed(2),
        total: achievements.length,
        fullyCompletedCount: fullyCompletedCount
    };
}

function getRewardText(reward) {
    if (!reward) return "Aucune récompense";

    switch(reward.type) {
        case 'coins':
            return `+ ${reward.amount} Pièces`;
        case 'title':
        case 'border':
        case 'collectible':
            // Pour tous les cosmétiques, on affiche un bouton de prévisualisation
            return `
                <span class="flex items-center gap-2">
                    <span>Cosmétique</span>
                    <button data-action="preview-reward" data-reward-type="${reward.type}" data-reward-id="${reward.id}" class="text-gray-400 hover:text-white transition-colors">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </span>
            `;
        default:
            return "Aucune récompense"; // Cas par défaut sécurisé
    }
}

        const BORDERS_DATABASE = [
    /*================================*
     * 💎 COMMUNS 💎
     * (Styles simples, matériaux pleins et bruts)
     *================================*/
    { id: 'b001', name: 'Néant', rarity: 'Commun', cost: 0, style: 'border: 3px solid transparent;' },
    { id: 'b101', name: 'Acier', rarity: 'Commun', cost: 50, style: 'border: 3px solid #9CA3AF;' },
    { id: 'b103', name: 'Cuir', rarity: 'Commun', cost: 75, style: 'border: 4px solid #78350F;' },
    { id: 'b104', name: 'Béton', rarity: 'Commun', cost: 80, style: 'border: 4px solid #71717A;' },
    { id: 'b105', name: 'Chêne', rarity: 'Commun', cost: 70, style: 'border: 3px solid #A16207;' },
    { id: 'b107', name: 'Marbre', rarity: 'Commun', cost: 80, style: 'border: 3px solid #E5E7EB;' },
    { id: 'b108', name: 'Caoutchouc', rarity: 'Commun', cost: 50, style: 'border: 4px solid #3F3F46;' },
    { id: 'b110', name: 'Argile Rouge', rarity: 'Commun', cost: 55, style: 'border: 4px solid #B45309;' },
    { id: 'b112', name: 'Verre Fumé', rarity: 'Commun', cost: 90, style: 'border: 3px solid rgba(255,255,255,0.1);' },
    { id: 'b113', name: 'Brique', rarity: 'Commun', cost: 60, style: 'border: 4px solid #B91C1C;' },
    { id: 'b115', name: 'Grès Poli', rarity: 'Commun', cost: 85, style: 'border: 4px solid #F59E0B;' },
    { id: 'b116', name: 'Plastique Noir', rarity: 'Commun', cost: 40, style: 'border: 3px solid #1F2937;' },

    /*================================*
     * ✨ RARES ✨
     * (Couleurs vives et lueurs simples)
     *================================*/
    { id: 'b201', name: 'Lueur Électrique', rarity: 'Rare', cost: 300, style: 'border: 3px solid #60A5FA; box-shadow: 0 0 12px #3B82F6;' },
    { id: 'b202', name: 'Lueur de Circuit', rarity: 'Rare', cost: 350, style: 'border: 3px solid #10B981; box-shadow: 0 0 10px #10B981;' },
    { id: 'b207', name: 'Bronze Ancien', rarity: 'Rare', cost: 600, style: 'border: 3px solid #D97706; box-shadow: 0 0 8px #92400E;' },
    { id: 'b210', name: 'Néon Rose', rarity: 'Rare', cost: 580, style: 'border: 3px solid #EC4899; box-shadow: 0 0 12px #EC4899;' },
    { id: 'b212', name: 'Titane', rarity: 'Rare', cost: 650, style: 'border: 3px solid #D1D5DB; box-shadow: 0 0 8px #fff;' },
    { id: 'b213', name: 'Ambre Poli', rarity: 'Rare', cost: 620, style: 'border: 3px solid #F59E0B; box-shadow: 0 0 10px #F59E0B;' },
    { id: 'b214', name: 'Jade Impérial', rarity: 'Rare', cost: 680, style: 'border: 3px solid #34D399; box-shadow: 0 0 10px #10B981;' },
    { id: 'b216', name: 'Obsidienne', rarity: 'Rare', cost: 700, style: 'border: 3px solid #1E1B4B; box-shadow: 0 0 8px #4C1D95;' },
    { id: 'b217', name: 'Éclat de Rubis', rarity: 'Rare', cost: 720, style: 'border: 3px solid #E11D48; box-shadow: 0 0 12px #E11D48;' },
    { id: 'b218', name: 'Éclat de Saphir', rarity: 'Rare', cost: 720, style: 'border: 3px solid #2563EB; box-shadow: 0 0 12px #2563EB;' },
    { id: 'b220', name: 'Or Rose', rarity: 'Rare', cost: 680, style: 'border: 3px solid #F472B6; box-shadow: 0 0 10px #F9A8D4;' },
    { id: 'b222', name: 'Néon Toxique', rarity: 'Rare', cost: 580, style: 'border: 3px solid #84CC16; box-shadow: 0 0 12px #A3E635;' },
    { id: 'b225', name: 'Argent Massif', rarity: 'Rare', cost: 630, style: 'border: 3px solid #D1D5DB; box-shadow: 0 0 10px #9CA3AF;' },
    { id: 'b226', name: 'Cuivre Poli', rarity: 'Rare', cost: 610, style: 'border: 3px solid #F59E0B; box-shadow: 0 0 10px #D97706;' },

    /*================================*
     * 🔥 ÉPIQUES 🔥
     * (Animations de pulsation, dégradés simples, lueurs plus fortes)
     *================================*/
    { id: 'b301', name: 'Faille Numérique', rarity: 'Épique', cost: 800, style: 'border: 3px solid #A78BFA; animation: epic-glitch-aura 3s infinite steps(1);' },
    { id: 'b302', name: 'Cristal d\'Améthyste', rarity: 'Épique', cost: 900, style: 'border: 3px solid #C4B5FD; box-shadow: 0 0 20px 5px #A78BFA, inset 0 0 8px #A78BFA;' },
    { id: 'b305', name: 'Cœur de Magma', rarity: 'Épique', cost: 1400, style: 'border: 3px solid #F87171; animation: fiery-pulse 2s infinite;' },
    { id: 'b307', name: 'Aura Glaciale', rarity: 'Épique', cost: 1350, style: 'border: 3px solid #BFDBFE; box-shadow: 0 0 20px #60A5FA; animation: fiery-pulse 2.5s infinite;' },
    { id: 'b308', name: 'Scarabée Doré', rarity: 'Épique', cost: 1450, style: 'border: 4px solid #FACC15; box-shadow: 0 0 15px #F59E0B;' },
    { id: 'b315', name: 'Ectoplasme', rarity: 'Épique', cost: 1650, style: 'border: 3px solid #A3E635; box-shadow: 0 0 20px #A3E635, inset 0 0 8px #A3E635; animation: fiery-pulse 1.8s infinite;' },
    { id: 'b316', name: 'Impulsion Sonar', rarity: 'Épique', cost: 1100, style: 'border: 3px solid #06B6D4; box-shadow: 0 0 18px #06B6D4; animation: fiery-pulse 1.5s infinite;' },
    { id: 'b318', name: 'Vortex Binaire', rarity: 'Épique', cost: 1550, style: 'padding: 3px; border: none; background: conic-gradient(from 0deg, #10B981, #E5E7EB, #10B981); animation: spin 4s linear infinite;' },
    { id: 'b320', name: 'Aura Sacrée', rarity: 'Épique', cost: 1400, style: 'border: 3px solid #FBBF24; box-shadow: 0 0 20px #FBBF24; animation: fiery-pulse 2.2s infinite;' },
    { id: 'b322', name: 'Crépuscule', rarity: 'Épique', cost: 1200, style: 'padding: 3px; border: none; background: linear-gradient(135deg, #EC4899, #8B5CF6);' },
    // CORRIGÉ : Utilise une animation de dégradé qui reste pleine
    { id: 'b323', name: 'Aurore Boréale', rarity: 'Épique', cost: 1600, style: 'padding: 3px; border: none; background: linear-gradient(135deg, #10B981, #3B82F6, #8B5CF6); background-size: 300% 300%; animation: mythic-nebula-border 6s ease-in-out infinite;' },
    { id: 'b324', name: 'Flamme Froide', rarity: 'Épique', cost: 1500, style: 'border: 3px solid #60A5FA; box-shadow: 0 0 20px #60A5FA, inset 0 0 8px #1E3A8A;' },

    /*================================*
     * 🌟 LÉGENDAIRES 🌟
     * (Animations complexes, doubles lueurs, dégradés animés)
     *================================*/
    { id: 'b401', name: 'Aura Solaire', rarity: 'Légendaire', cost: 2000, style: 'border: 3px solid #FBBF24; animation: solar-flare-border 3s infinite ease-in-out;' },
    { id: 'b402', name: 'Rune Enflammée', rarity: 'Légendaire', cost: 2200, style: 'border: 3px solid #F59E0B; box-shadow: 0 0 15px #F59E0B, 0 0 25px #FBBF24, inset 0 0 5px #FBBF24; animation: fiery-pulse 1.5s infinite;' },
    { id: 'b404', name: 'Éclat de Titan', rarity: 'Légendaire', cost: 2400, style: 'border: 3px solid #FDE047; animation: solar-flare-border 2s infinite ease-in-out; filter: drop-shadow(0 0 12px #FDE047);' },
    { id: 'b405', name: 'Fureur d\'Arès', rarity: 'Légendaire', cost: 2600, style: 'border: 4px solid #DC2626; box-shadow: 0 0 25px #EF4444, inset 0 0 10px #991B1B; animation: fiery-pulse 0.8s infinite;' },
    { id: 'b407', name: 'Rempart du Valhalla', rarity: 'Légendaire', cost: 3500, style: 'border: 5px solid #ca8a04; box-shadow: 0 0 25px #facc15, inset 0 0 10px #facc15;' },
    // CORRIGÉ : Utilise une animation de dégradé qui reste pleine
    { id: 'b408', name: 'Sarcophage Doré', rarity: 'Légendaire', cost: 3800, style: 'padding: 4px; border: none; background: linear-gradient(160deg, #1E1B4B, #FDE047, #D97706, #1E1B4B); background-size: 400% 400%; animation: mythic-nebula-border 5s ease-in-out infinite; box-shadow: 0 0 15px #FDE047;' },
    { id: 'b410', name: 'Barrière Cybernétique', rarity: 'Légendaire', cost: 4200, style: 'border: 4px solid #3B82F6; box-shadow: 0 0 15px #fff, inset 0 0 12px #3B82F6, 0 0 25px #3B82F6; animation: epic-glitch-aura 5s infinite steps(1);' },
    { id: 'b412', name: 'Renaissance du Phoenix', rarity: 'Légendaire', cost: 3200, style: 'padding: 4px; border: none; background: linear-gradient(-45deg, #F87171, #F59E0B, #DC2626, #F87171); background-size: 400% 400%; animation: mythic-nebula-border 8s ease infinite; box-shadow: 0 0 20px #F97316;' },
    // CORRIGÉ : Rendu plus fiable avec un fond animé plutôt qu'une `border-image`
    { id: 'b413', name: 'Cœur de la Forge', rarity: 'Légendaire', cost: 3600, style: 'padding: 4px; border: none; background: linear-gradient(0deg, #DC2626, #F59E0B, #F87171, #DC2626); background-size: 100% 400%; animation: mythic-nebula-border 4s ease-in-out infinite; box-shadow: 0 0 20px #F87171;' },
    { id: 'b414', name: 'Tempête Arcanique', rarity: 'Légendaire', cost: 3900, style: 'border: 3px solid #A78BFA; box-shadow: 0 0 25px #A78BFA, 0 0 40px #6366F1; animation: spin 5s linear infinite, fiery-pulse 2s infinite;' },
    { id: 'b418', name: 'Givre Infernal', rarity: 'Légendaire', cost: 3700, style: 'border: 3px solid #60A5FA; box-shadow: 0 0 25px #DC2626, inset 0 0 10px #1E1B4B; animation: fiery-pulse 1.2s infinite;' },
    { id: 'b419', name: 'Rage Écarlate', rarity: 'Légendaire', cost: 4500, style: 'border: 4px solid #ff0000; box-shadow: 0 0 30px #ff0000, 0 0 15px #ff4d4d; animation: fiery-pulse 0.7s infinite;' },
    
    /*================================*
     * 🌌 MYTHIQUES 🌌
     * (Effets cosmiques, dégradés multicolores, animations puissantes)
     *================================*/
    { id: 'b501', name: 'Nébuleuse Astrale', rarity: 'Mythique', cost: 5000, style: 'padding: 4px; border: none; background: linear-gradient(60deg, #6366F1, #EC4899, #8B5CF6, #06B6D4); background-size: 300% 300%; animation: mythic-nebula-border 6s ease-in-out infinite;' },
    { id: 'b503', name: 'Couronne de Titan', rarity: 'Mythique', cost: 8000, style: 'padding: 4px; border: none; background: linear-gradient(120deg, #FDE047, #FBBF24, #D97706, #FDE047); background-size: 300% 300%; animation: mythic-nebula-border 5s ease-in-out infinite; box-shadow: 0 0 25px #FDE047;' },
    { id: 'b504', name: 'Sceau Olympien', rarity: 'Mythique', cost: 8500, style: 'border: 4px solid #FDE047; box-shadow: 0 0 30px #FDE047, 0 0 45px #fff; animation: solar-flare-border 3s infinite;' },
    { id: 'b505', name: 'Fissure du Néant', rarity: 'Mythique', cost: 9000, style: 'border: 4px solid #4C1D95; box-shadow: 0 0 35px #A78BFA, inset 0 0 18px #000, 0 0 55px #000; animation: fiery-pulse 3s infinite;' },
    { id: 'b507', name: 'Pont du Bifrost', rarity: 'Mythique', cost: 12000, style: 'padding: 4px; border: none; background: linear-gradient(90deg, #EF4444, #F97316, #EAB308, #84CC16, #22C55E, #14B8A6, #06B6D4, #3B82F6, #8B5CF6, #D946EF); background-size: 2000% 2000%; animation: mythic-nebula-border 15s ease infinite;' },
    { id: 'b511', name: 'Cœur de Supernova', rarity: 'Mythique', cost: 13500, style: 'border: 4px solid #fff; box-shadow: 0 0 20px #fff, 0 0 35px #FDE047, 0 0 55px #F59E0B; animation: solar-flare-border 1.5s infinite;' },
    { id: 'b512', name: 'Singularité', rarity: 'Mythique', cost: 9500, style: 'border: 4px solid #111827; box-shadow: 0 0 25px #A78BFA, inset 0 0 20px #4C1D95; animation: spin 20s linear infinite reverse, fiery-pulse 2.8s infinite;' },
    { id: 'b513', name: 'Rage Solaire', rarity: 'Mythique', cost: 12500, style: 'border: 3px solid #F59E0B; box-shadow: 0 0 35px #F59E0B, 0 0 55px #FBBF24, 0 0 80px #ff0000; animation: solar-flare-border 1.5s infinite;' },
    { id: 'b514', name: 'Faille Infernale', rarity: 'Mythique', cost: 14000, style: 'padding: 4px; border:none; background: linear-gradient(0deg, #991B1B, #DC2626, #F87171, #FCA5A5); background-size: 100% 400%; animation: flame-border-animation 2s linear infinite; box-shadow: 0 0 30px #ff0000;' },
    // CORRIGÉ : Remplacé par une bordure pleine et animée
    { id: 'b515', name: 'Hyperdrive', rarity: 'Mythique', cost: 16000, style: 'padding: 4px; border: none; background: conic-gradient(from 0deg, #fff, #60A5FA, #A78BFA, #fff); animation: spin 0.8s linear infinite; box-shadow: 0 0 30px #fff;' },
    { id: 'b508', name: 'Volonté du Primordial', rarity: 'Mythique', cost: 15000, style: 'border: 4px solid #111; box-shadow: 0 0 20px #f00, 0 0 30px #ff0, 0 0 40px #0f0, 0 0 50px #0ff, 0 0 60px #00f, 0 0 70px #f0f; animation: primordial-will-border 5s linear infinite;' },

    /*================================*
     * 🔱 DIVINS 🔱
     * (Le summum : animations et lueurs combinées, prestige ultime)
     *================================*/
    { id: 'b601', name: 'Aura Céleste', rarity: 'Divin', cost: 20000, style: 'border: 3px solid #fff; animation: celestial-aura-border 3s ease-in-out infinite;' },
    { id: 'b603', name: 'Trône Divin', rarity: 'Divin', cost: 50000, style: 'border: 4px solid #FDE047; box-shadow: 0 0 35px #fff, 0 0 55px #FDE047, inset 0 0 25px #FBBF24; animation: solar-flare-border 2s infinite;' },
    { id: 'b604', name: 'Manifestation de l\'Aether', rarity: 'Divin', cost: 30000, style: 'border: 4px solid rgba(255,255,255,0.8); box-shadow: 0 0 40px #fff, inset 0 0 25px #E0F2FE; animation: celestial-aura-border 2s ease-in-out infinite;' },
    { id: 'b605', name: 'Apocalypse', rarity: 'Divin', cost: 60000, style: 'padding: 4px; border: none; background: linear-gradient(45deg, #111827, #ff0000, #F59E0B, #ff0000, #111827); background-size: 400%; animation: mythic-nebula-border 5s ease-in-out infinite; box-shadow: 0 0 50px #ff0000; ' },
    { id: 'b606', name: 'Réalité Fracturée', rarity: 'Divin', cost: 75000, style: 'border: 3px solid #EC4899; animation: epic-glitch-aura 1s infinite steps(1), spin 30s linear infinite; box-shadow: 0 0 40px #EC4899;' },
    { id: 'b608', name: 'Panthéon', rarity: 'Divin', cost: 25000, style: 'border: 5px solid #FDE047; background: #111827; box-shadow: inset 0 0 15px #FBBF24, 0 0 25px #FDE047; animation: solar-flare-border 3s infinite;' },
    { id: 'b610', name: 'Création', rarity: 'Divin', cost: 100000, style: 'padding: 4px; border: none; background: white; animation: primordial-will-border 2s linear infinite;' },
    { id: 'b611', name: 'Aura Spectrale', rarity: 'Divin', cost: 85000, style: 'padding: 4px; border:none; background: linear-gradient(90deg, #EF4444, #F97316, #EAB308, #84CC16, #22C55E, #14B8A6, #06B6D4, #3B82F6, #8B5CF6, #D946EF); background-size: 2000% 2000%; animation: mythic-nebula-border 10s ease infinite; box-shadow: 0 0 30px #fff;' },

    // ... (après les bordures Divines existantes)
    // --- Bordures de Succès Secrètes ---
    { id: 'b_titan', name: 'Force de Titan', rarity: 'Épique', source: 'achievement', style: 'border: 4px solid #F59E0B; box-shadow: 0 0 15px #F59E0B;' },
    { id: 'b_flamme', name: 'Flamme de la Détermination', rarity: 'Rare', source: 'achievement', style: 'border: 3px solid #F97316; box-shadow: 0 0 12px #F97316;' },
    { id: 'b_eternelle', name: 'Flamme Éternelle', rarity: 'Légendaire', source: 'achievement', style: 'padding: 4px; border: none; background: linear-gradient(-45deg, #F87171, #F59E0B, #DC2626, #F87171); background-size: 400% 400%; animation: mythic-nebula-border 8s ease infinite; box-shadow: 0 0 20px #F97316;' },
    { id: 'b_heavy', name: 'Rempart des Titans', rarity: 'Légendaire', source: 'achievement', style: 'border: 5px solid #ca8a04; box-shadow: 0 0 25px #facc15, inset 0 0 10px #facc15;' },
    { id: 'b_collector_ultimate', name: 'Cadre du Collectionneur', rarity: 'Mythique', source: 'achievement', style: 'padding: 4px; border: none; background: linear-gradient(90deg, #EF4444, #F97316, #EAB308, #84CC16, #22C55E, #14B8A6, #06B6D4, #3B82F6, #8B5CF6, #D946EF); background-size: 2000% 2000%; animation: mythic-nebula-border 15s ease infinite;' },
    { id: 'b_infinity', name: 'Bordure de l\'Infini', rarity: 'Divin', source: 'achievement', style: 'border: 3px solid #fff; animation: celestial-aura-border 3s ease-in-out infinite;' }

];
        
        // La liste TITLES_DATABASE n'a pas besoin de changer.

        const COLLECTIBLES_DATABASE = [
    // Communs
    { id: 'c001', name: 'Haltère Standard', rarity: 'Commun', icon: 'fa-dumbbell', color: 'text-gray-400' },
    { id: 'c002', name: 'Shaker de Protéine', rarity: 'Commun', icon: 'fa-bottle-water', color: 'text-gray-400' },
    { id: 'c101', name: 'Corde à Sauter', rarity: 'Commun', icon: 'fa-infinity', color: 'text-gray-400' },
    { id: 'c102', name: 'Disque de Fonte', rarity: 'Commun', icon: 'fa-compact-disc', color: 'text-gray-400' },
    { id: 'c103', name: 'Chronomètre', rarity: 'Commun', icon: 'fa-stopwatch', color: 'text-gray-400' },
    { id: 'c104', name: 'Bandeau de Sueur', rarity: 'Commun', icon: 'fa-head-side-virus', color: 'text-gray-400' },
    { id: 'c105', name: 'Pomme', rarity: 'Commun', icon: 'fa-apple-whole', color: 'text-gray-400' },
    { id: 'c106', name: 'Bouteille d\'Eau', rarity: 'Commun', icon: 'fa-glass-water', color: 'text-gray-400' },
    { id: 'c107', name: 'Cadenas', rarity: 'Commun', icon: 'fa-lock', color: 'text-gray-400' },
    { id: 'c108', name: 'T-Shirt', rarity: 'Commun', icon: 'fa-shirt', color: 'text-gray-400' },
    { id: 'c109', name: 'Magnésie', rarity: 'Commun', icon: 'fa-hand-sparkles', color: 'text-gray-400' },
    { id: 'c111', name: 'Casquette', rarity: 'Commun', icon: 'fa-hat-cowboy', color: 'text-gray-400' },
    { id: 'c112', name: 'Gourde', rarity: 'Commun', icon: 'fa-flask', color: 'text-gray-400' },
    { id: 'c113', name: 'Mètre Ruban', rarity: 'Commun', icon: 'fa-ruler-horizontal', color: 'text-gray-400' },
    // == NOUVEAUX AJOUTS ==
    { id: 'c114', name: 'Écouteurs', rarity: 'Commun', icon: 'fa-headphones', color: 'text-gray-400' },
    { id: 'c115', name: 'Carnet', rarity: 'Commun', icon: 'fa-book', color: 'text-gray-400' },
    { id: 'c117', name: 'Poignée de main', rarity: 'Commun', icon: 'fa-handshake', color: 'text-gray-400' },
    { id: 'c118', name: 'Pouce levé', rarity: 'Commun', icon: 'fa-thumbs-up', color: 'text-gray-400' },
    { id: 'c119', name: 'Cible d\'entraînement', rarity: 'Commun', icon: 'fa-bullseye', color: 'text-gray-400' },
    { id: 'c120', name: 'Banc de Musculation', rarity: 'Commun', icon: 'fa-chair', color: 'text-gray-400' },
    { id: 'c121', name: 'Barre Protéinée', rarity: 'Commun', icon: 'fa-candy-cane', color: 'text-gray-400' },
    { id: 'c122', name: 'Rouleau de Massage', rarity: 'Commun', icon: 'fa-grip-lines', color: 'text-gray-400' },
    { id: 'c123', name: 'Café', rarity: 'Commun', icon: 'fa-coffee', color: 'text-gray-400' },
    { id: 'c124', name: 'Sac de Sport', rarity: 'Commun', icon: 'fa-briefcase', color: 'text-gray-400' },
    { id: 'c125', name: 'Podomètre', rarity: 'Commun', icon: 'fa-shoe-prints', color: 'text-gray-400' },
    { id: 'c126', name: 'Calendrier', rarity: 'Commun', icon: 'fa-calendar-alt', color: 'text-gray-400' },
    { id: 'c127', name: 'Échelle', rarity: 'Commun', icon: 'fa-stairs', color: 'text-gray-400' },
    { id: 'c128', name: 'Brocoli', rarity: 'Commun', icon: 'fa-carrot', color: 'text-gray-400' },

    // Rares
    { id: 'c003', name: 'Kettlebell en Feu', rarity: 'Rare', icon: 'fa-fire', color: 'text-orange-500', effect: 'icon-glow-rare' },
    { id: 'c201', name: 'Haltère Doré', rarity: 'Rare', icon: 'fa-dumbbell', color: 'text-yellow-500', effect: 'icon-glow-rare' },
    { id: 'c202', name: 'Barres en Diamant', rarity: 'Rare', icon: 'fa-gem', color: 'text-sky-400', effect: 'icon-glow-rare' },
    { id: 'c203', name: 'Toison d\'Or', rarity: 'Rare', icon: 'fa-award', color: 'text-amber-400', effect: 'icon-glow-rare' },
    { id: 'c204', name: 'Hache de Viking', rarity: 'Rare', icon: 'fa-gavel', color: 'text-stone-400', effect: 'icon-glow-rare' },
    { id: 'c205', name: 'Heaume de Spartiate', rarity: 'Rare', icon: 'fa-shield-halved', color: 'text-amber-600', effect: 'icon-glow-rare' },
    { id: 'c206', name: 'Gant de Boxe', rarity: 'Rare', icon: 'fa-hand-fist', color: 'text-red-600', effect: 'icon-glow-rare' },
    // == NOUVEAUX AJOUTS ==
    { id: 'c207', name: 'Casque de Centurion', rarity: 'Rare', icon: 'fa-helmet-safety', color: 'text-amber-500', effect: 'icon-glow-rare' },
    { id: 'c208', name: 'Sandales d\'Hermès', rarity: 'Rare', icon: 'fa-shoe-prints', color: 'text-sky-400', effect: 'icon-glow-rare' },
    { id: 'c209', name: 'Ancre Marine', rarity: 'Rare', icon: 'fa-anchor', color: 'text-blue-500', effect: 'icon-glow-rare' },
    { id: 'c210', name: 'Empreinte Bestiale', rarity: 'Rare', icon: 'fa-paw', color: 'text-yellow-600', effect: 'icon-glow-rare' },
    { id: 'c211', name: 'Flamme', rarity: 'Rare', icon: 'fa-fire-flame-simple', color: 'text-red-500', effect: 'icon-glow-rare' },
    { id: 'c212', name: 'Flocon de Neige', rarity: 'Rare', icon: 'fa-snowflake', color: 'text-cyan-300', effect: 'icon-glow-rare' },
    { id: 'c213', name: 'Feuille d\'Érable', rarity: 'Rare', icon: 'fa-canadian-maple-leaf', color: 'text-red-600', effect: 'icon-glow-rare' },
    { id: 'c214', name: 'Steak', rarity: 'Rare', icon: 'fa-drumstick-bite', color: 'text-orange-700', effect: 'icon-glow-rare' },
    { id: 'c215', name: 'Yin Yang', rarity: 'Rare', icon: 'fa-yin-yang', color: 'text-white', effect: 'icon-glow-rare' },
    { id: 'c216', name: 'Cœur Musclé', rarity: 'Rare', icon: 'fa-heart-pulse', color: 'text-red-400', effect: 'icon-glow-rare' },
    { id: 'c217', name: 'Éclair', rarity: 'Rare', icon: 'fa-bolt', color: 'text-yellow-400', effect: 'icon-glow-rare' },
    { id: 'c218', name: 'Biohazard', rarity: 'Rare', icon: 'fa-biohazard', color: 'text-green-500', effect: 'icon-glow-rare' },
    { id: 'c219', name: 'Cerveau en Action', rarity: 'Rare', icon: 'fa-brain', color: 'text-pink-400', effect: 'icon-glow-rare' },
    { id: 'c220', name: 'Montagne', rarity: 'Rare', icon: 'fa-mountain', color: 'text-stone-400', effect: 'icon-glow-rare' },
    { id: 'c221', name: 'Trophée', rarity: 'Rare', icon: 'fa-trophy', color: 'text-yellow-400', effect: 'icon-glow-rare' },
    { id: 'c222', name: 'Fusée', rarity: 'Rare', icon: 'fa-rocket', color: 'text-orange-400', effect: 'icon-glow-rare' },
    { id: 'c223', name: 'Piment', rarity: 'Rare', icon: 'fa-pepper-hot', color: 'text-red-600', effect: 'icon-glow-rare' },
    { id: 'c224', name: 'Aimant', rarity: 'Rare', icon: 'fa-magnet', color: 'text-red-500', effect: 'icon-glow-rare' },
    { id: 'c225', name: 'Trèfle à 4 feuilles', rarity: 'Rare', icon: 'fa-clover', color: 'text-green-500', effect: 'icon-glow-rare' },
    { id: 'c226', name: 'Os', rarity: 'Rare', icon: 'fa-bone', color: 'text-stone-300', effect: 'icon-glow-rare' },
    { id: 'c228', name: 'Scarabée', rarity: 'Rare', icon: 'fa-bug', color: 'text-emerald-500', effect: 'icon-glow-rare' },
    { id: 'c229', name: 'Chapeau de Sorcier', rarity: 'Rare', icon: 'fa-hat-wizard', color: 'text-indigo-400', effect: 'icon-glow-rare' },
    
    // Épiques
    { id: 'c004', name: 'Couronne du Bench King', rarity: 'Épique', icon: 'fa-crown', color: 'text-yellow-400', effect: 'icon-glow-epique' },
    { id: 'c301', name: 'Plume du Phoenix', rarity: 'Épique', icon: 'fa-feather-pointed', color: 'text-red-500', effect: 'icon-glow-epique' },
    { id: 'c302', name: 'Marteau Divin', rarity: 'Épique', icon: 'fa-hammer', color: 'text-cyan-300', effect: 'icon-glow-epique' },
    { id: 'c303', name: 'Holocron', rarity: 'Épique', icon: 'fa-cube', color: 'text-blue-300', effect: 'icon-glow-epique' },
    { id: 'c304', name: 'Ailes Célestes', rarity: 'Épique', icon: 'fa-dove', color: 'text-stone-300', effect: 'icon-glow-epique' },
    { id: 'c305', name: 'Coeur de Golem', rarity: 'Épique', icon: 'fa-heart-crack', color: 'text-stone-500', effect: 'icon-glow-epique' },
    { id: 'c306', name: 'Orbe Instable', rarity: 'Épique', icon: 'fa-atom', color: 'text-purple-300', effect: 'icon-glow-epique' },
    { id: 'c307', name: 'Sablier du Temps', rarity: 'Épique', icon: 'fa-hourglass-half', color: 'text-indigo-400', effect: 'icon-glow-epique' },
    { id: 'c308', name: 'Parchemin Ancien', rarity: 'Épique', icon: 'fa-scroll', color: 'text-amber-300', effect: 'icon-glow-epique' },
    { id: 'c309', name: 'Clé Squelette', rarity: 'Épique', icon: 'fa-key', color: 'text-gray-300', effect: 'icon-glow-epique' },
    { id: 'c310', name: 'Potion de Mana', rarity: 'Épique', icon: 'fa-flask', color: 'text-blue-400', effect: 'icon-glow-epique' },
    { id: 'c311', name: 'Cristal d\'Énergie', rarity: 'Épique', icon: 'fa-bahai', color: 'text-fuchsia-400', effect: 'icon-glow-epique' },
    { id: 'c312', name: 'Katana', rarity: 'Épique', icon: 'fa-slash', color: 'text-gray-200', effect: 'icon-glow-epique' },
    { id: 'c313', name: 'Engrenage Doré', rarity: 'Épique', icon: 'fa-gear', color: 'text-yellow-500', effect: 'icon-glow-epique' },
    { id: 'c314', name: 'Oeil Qui Voit Tout', rarity: 'Épique', icon: 'fa-eye', color: 'text-cyan-300', effect: 'icon-glow-epique' },
    { id: 'c315', name: 'Tête de Mort', rarity: 'Épique', icon: 'fa-skull', color: 'text-stone-300', effect: 'icon-glow-epique' },
    { id: 'c316', name: 'Symbole Atomique', rarity: 'Épique', icon: 'fa-atom', color: 'text-green-400', effect: 'icon-glow-epique' },
    { id: 'c317', name: 'Météorite', rarity: 'Épique', icon: 'fa-meteor', color: 'text-orange-500', effect: 'icon-glow-epique' },
    { id: 'c318', name: 'Masque d\'Oni', rarity: 'Épique', icon: 'fa-masks-theater', color: 'text-red-600', effect: 'icon-glow-epique' },
    { id: 'c319', name: 'Boussole', rarity: 'Épique', icon: 'fa-compass', color: 'text-sky-300', effect: 'icon-glow-epique' },
    { id: 'c320', name: 'Griffe de Monstre', rarity: 'Épique', icon: 'fa-hand-back-fist', color: 'text-gray-300', effect: 'icon-glow-epique' },
    { id: 'c321', name: 'Masque à Gaz', rarity: 'Épique', icon: 'fa-mask-ventilator', color: 'text-lime-400', effect: 'icon-glow-epique' },
    { id: 'c323', name: 'Parapluie', rarity: 'Épique', icon: 'fa-umbrella', color: 'text-blue-300', effect: 'icon-glow-epique' },
    
    // Légendaires
    { id: 'c005', name: 'Potion "Pre-Workout"', rarity: 'Légendaire', icon: 'fa-flask-vial', color: 'text-fuchsia-500', effect: 'icon-glow-legendaire' },
    { id: 'c401', name: 'Sceptre de Puissance', rarity: 'Légendaire', icon: 'fa-wand-magic-sparkles', color: 'text-purple-400', effect: 'icon-glow-legendaire' },
    { id: 'c402', name: 'Trident des Abysses', rarity: 'Légendaire', icon: 'fa-staff-snake', color: 'text-cyan-400', effect: 'icon-glow-legendaire' },
    { id: 'c403', name: 'Fragment de Supernova', rarity: 'Légendaire', icon: 'fa-star-of-life', color: 'text-orange-400', effect: 'icon-glow-legendaire' },
    { id: 'c404', name: 'Gungnir, Lance d\'Odin', rarity: 'Légendaire', icon: 'fa-up-long', color: 'text-violet-300', effect: 'icon-glow-legendaire' },
    { id: 'c405', name: 'Vortex Arcanique', rarity: 'Légendaire', icon: 'fa-hurricane', color: 'text-yellow-400', effect: 'icon-glow-legendaire' },
    { id: 'c406', name: 'Bouclier Égide', rarity: 'Légendaire', icon: 'fa-shield-virus', color: 'text-yellow-400', effect: 'icon-glow-legendaire' },
    { id: 'c407', name: 'Mjolnir', rarity: 'Légendaire', icon: 'fa-hammer', color: 'text-sky-300', effect: 'icon-glow-legendaire' },
    { id: 'c408', name: 'Lyre d\'Apollon', rarity: 'Légendaire', icon: 'fa-guitar', color: 'text-amber-300', effect: 'icon-glow-legendaire' },
    { id: 'c409', name: 'Orbe de Glace', rarity: 'Légendaire', icon: 'fa-icicles', color: 'text-cyan-200', effect: 'icon-glow-legendaire' },
    { id: 'c410', name: 'Épée Excalibur', rarity: 'Légendaire', icon: 'fa-gavel', color: 'text-gray-200', effect: 'icon-glow-legendaire' },
    { id: 'c411', name: 'Cœur de Dragon', rarity: 'Légendaire', icon: 'fa-dragon', color: 'text-red-500', effect: 'icon-glow-legendaire' },
    { id: 'c412', name: 'Casque de la Valkyrie', rarity: 'Légendaire', icon: 'fa-feather-pointed', color: 'text-white', effect: 'icon-glow-legendaire' },
    { id: 'c413', name: 'Ouroboros', rarity: 'Légendaire', icon: 'fa-circle-notch', color: 'text-green-400', effect: 'icon-glow-legendaire' },
    { id: 'c414', name: 'Grimoire Ancien', rarity: 'Légendaire', icon: 'fa-book-journal-whills', color: 'text-purple-300', effect: 'icon-glow-legendaire' },
    { id: 'c415', name: 'Vaisseau Spatial', rarity: 'Légendaire', icon: 'fa-space-shuttle', color: 'text-gray-200', effect: 'icon-glow-legendaire' },

    // Mythiques
    { id: 'c006', name: 'Éclair de Zeus', rarity: 'Mythique', icon: 'fa-bolt-lightning', color: 'text-yellow-300', effect: 'icon-glow-mythique' },
    { id: 'c501', name: 'Coeur de Titan', rarity: 'Mythique', icon: 'fa-heart-pulse', color: 'text-red-500', effect: 'icon-glow-mythique' },
    { id: 'c502', name: 'Fardeau d\'Atlas', rarity: 'Mythique', icon: 'fa-earth-europe', color: 'text-cyan-200', effect: 'icon-glow-mythique' },
    { id: 'c503', name: 'Haltère du Big Bang', rarity: 'Mythique', icon: 'fa-atom', color: 'text-purple-300', effect: 'icon-glow-mythique' },
    { id: 'c504', name: 'Fragment d\'Étoile', rarity: 'Mythique', icon: 'fa-burst', color: 'text-white', effect: 'icon-glow-mythique' },
    { id: 'c505', name: 'Pierre Philosophale', rarity: 'Mythique', icon: 'fa-gem', color: 'text-red-500', effect: 'icon-glow-mythique' },
    { id: 'c506', name: 'Livre des Ombres', rarity: 'Mythique', icon: 'fa-book-skull', color: 'text-purple-400', effect: 'icon-glow-mythique' },
    { id: 'c507', name: 'Ankh de Vie Éternelle', rarity: 'Mythique', icon: 'fa-ankh', color: 'text-yellow-300', effect: 'icon-glow-mythique' },
    { id: 'c508', name: 'Tesseract', rarity: 'Mythique', icon: 'fa-cubes-stacked', color: 'text-blue-300', effect: 'icon-glow-mythique' },
    { id: 'c509', name: 'Noyau de Singularité', rarity: 'Mythique', icon: 'fa-bahai', color: 'text-white', effect: 'icon-glow-mythique' },
    { id: 'c510', name: 'Flamme de Prométhée', rarity: 'Mythique', icon: 'fa-torii-gate', color: 'text-orange-400', effect: 'icon-glow-mythique' },
    { id: 'c511', name: 'Ragnarok', rarity: 'Mythique', icon: 'fa-volcano', color: 'text-red-500', effect: 'icon-glow-mythique' },
    { id: 'c512', name: 'Voiture de Sport', rarity: 'Mythique', icon: 'fa-car-side', color: 'text-red-500', effect: 'icon-glow-mythique' },
    
    // VERSION FINALE À UTILISER

// Divins
{ id: 'c601', name: 'Oeil de la Création', rarity: 'Divin', icon: 'fa-eye', color: 'animated-icon-divin', effect: 'icon-glow-divin' },
{ id: 'c602', name: 'Balance Cosmique', rarity: 'Divin', icon: 'fa-scale-balanced', color: 'animated-icon-divin', effect: 'icon-glow-divin' },
{ id: 'c603', name: 'Sablier Infini', rarity: 'Divin', icon: 'fa-infinity', color: 'animated-icon-divin', effect: 'icon-glow-divin' },
{ id: 'c604', name: 'Main du Créateur', rarity: 'Divin', icon: 'fa-hand-sparkles', color: 'animated-icon-divin', effect: 'icon-glow-divin' },
{ id: 'c605', name: 'Le Saint Graal', rarity: 'Divin', icon: 'fa-trophy', color: 'animated-icon-divin', effect: 'icon-glow-divin' },

// --- Objets Secrets du Créateur ---
{ id: 'c701', name: 'Clavier du Développeur', rarity: 'Créateur', icon: 'fa-keyboard', color: 'animated-icon-createur', effect: 'icon-glow-createur' },
{ id: 'c702', name: 'Le Poulet de la Masse', rarity: 'Créateur', icon: 'fa-drumstick-bite', color: 'animated-icon-createur', effect: 'icon-glow-createur' },
{ id: 'c703', name: 'Code Source Originel', rarity: 'Créateur', icon: 'fa-code', color: 'animated-icon-createur', effect: 'icon-glow-createur' }
];

        const TITLES_DATABASE = [
    // Communs
    { id: 't001', name: 'Débutant', rarity: 'Commun', cost: 0, source: 'default' },
    { id: 't101', name: 'Régulier', rarity: 'Commun', cost: 100, source: 'shop' },
    { id: 't102', name: 'Passionné', rarity: 'Commun', cost: 120, source: 'shop' },
    // == NOUVEAUX AJOUTS ==
    { id: 't103', name: 'Apprenti', rarity: 'Commun', cost: 150, source: 'shop' },
    { id: 't104', name: 'Visiteur du Gym', rarity: 'Commun', cost: 150, source: 'shop' },
    { id: 't105', name: 'Déterminé', rarity: 'Commun', cost: 180, source: 'shop' },
    { id: 't106', name: 'Nouveau Souffle', rarity: 'Commun', cost: 200, source: 'shop' },
    { id: 't107', name: 'Matinal', rarity: 'Commun', cost: 220, source: 'shop' },
    { id: 't108', name: 'Noctambule', rarity: 'Commun', cost: 220, source: 'shop' },
    { id: 't109', name: 'En Progression', rarity: 'Commun', cost: 250, source: 'shop' },
    { id: 't110', name: 'Curieux', rarity: 'Commun', cost: 130, source: 'shop' },
    { id: 't111', name: 'Motivé', rarity: 'Commun', cost: 160, source: 'shop' },
    { id: 't112', name: 'Fidèle au Poste', rarity: 'Commun', cost: 190, source: 'shop' },
    { id: 't113', name: 'Sueur & Volonté', rarity: 'Commun', cost: 230, source: 'shop' },
    { id: 't114', name: 'Calorie-Conscient', rarity: 'Commun', cost: 210, source: 'shop' },
    { id: 't115', name: 'Adepte des Shakes', rarity: 'Commun', cost: 170, source: 'shop' },

    // Rares
    { id: 't201', name: 'Athlète Solide', rarity: 'Rare', cost: 400, source: 'shop' },
    { id: 't202', name: 'Guerrier du Fer', rarity: 'Rare', cost: 450, source: 'shop' },
    { id: 't203', name: 'Maître des Séries', rarity: 'Rare', cost: 500, source: 'shop' },
    { id: 't204', name: 'Dévoreur de Protéines', rarity: 'Rare', cost: 400, source: 'shop' },
    // == NOUVEAUX AJOUTS ==
    { id: 't205', name: 'Force Tranquille', rarity: 'Rare', cost: 550, source: 'shop' },
    { id: 't206', name: 'Haltérophile', rarity: 'Rare', cost: 580, source: 'shop' },
    { id: 't207', name: 'Sprinter', rarity: 'Rare', cost: 600, source: 'shop' },
    { id: 't208', name: 'Architecte Corporel', rarity: 'Rare', cost: 620, source: 'shop' },
    { id: 't209', name: 'Insatiable', rarity: 'Rare', cost: 650, source: 'shop' },
    { id: 't210', name: 'Prédateur Alpha', rarity: 'Rare', cost: 700, source: 'shop' },
    { id: 't211', name: 'Ronin', rarity: 'Rare', cost: 720, source: 'shop' },
    { id: 't212', name: 'Centurion', rarity: 'Rare', cost: 750, source: 'shop' },
    { id: 't213', name: 'Fou de Fonte', rarity: 'Rare', cost: 780, source: 'shop' },
    { id: 't214', name: 'Marathonien', rarity: 'Rare', cost: 680, source: 'shop' },
    { id: 't215', name: 'Viking Moderne', rarity: 'Rare', cost: 730, source: 'shop' },
    { id: 't216', name: 'Chasseur de PR', rarity: 'Rare', cost: 800, source: 'shop' },
    { id: 't217', name: 'Pyramide Inversée', rarity: 'Rare', cost: 660, source: 'shop' },
    { id: 't218', name: 'Accro au Leg Day', rarity: 'Rare', cost: 790, source: 'shop' },
    { id: 't219', name: 'Surcharge Progressive', rarity: 'Rare', cost: 820, source: 'shop' },
    { id: 't220', name: 'Gladiateur', rarity: 'Rare', cost: 850, source: 'shop' },

    // Épiques
    { id: 't301', name: 'Titan en Devenir', rarity: 'Épique', cost: 1000, source: 'shop' },
    { id: 't302', name: 'Forgeur de Muscles', rarity: 'Épique', cost: 1100, source: 'shop' },
    { id: 't303', name: 'Légende du Bench', rarity: 'Épique', cost: 1200, source: 'shop' },
    { id: 't304', name: 'Alchimiste Nutritionnel', rarity: 'Épique', cost: 1000, source: 'shop' },
    { id: 't305', name: 'Force Imprévisible', rarity: 'Épique', cost: 1500, source: 'shop' },
    // == NOUVEAUX AJOUTS ==
    { id: 't306', name: 'Spectre de la Salle', rarity: 'Épique', cost: 1300, source: 'shop' },
    { id: 't307', name: 'Virtuose de la Fonte', rarity: 'Épique', cost: 1350, source: 'shop' },
    { id: 't308', name: 'Cyclone de Cardio', rarity: 'Épique', cost: 1400, source: 'shop' },
    { id: 't309', name: 'Né dans le Fer', rarity: 'Épique', cost: 1500, source: 'shop' },
    { id: 't310', name: 'Écho de Sparte', rarity: 'Épique', cost: 1600, source: 'shop' },
    { id: 't311', name: 'Briseur de Plateaux', rarity: 'Épique', cost: 1700, source: 'shop' },
    { id: 't312', name: 'Berserker', rarity: 'Épique', cost: 1800, source: 'shop' },
    { id: 't313', name: 'Cyber-Athlète', rarity: 'Épique', cost: 1650, source: 'shop' },
    { id: 't314', name: 'Hoplite', rarity: 'Épique', cost: 1750, source: 'shop' },
    { id: 't315', name: 'Roi de la Salle', rarity: 'Épique', cost: 1900, source: 'shop' },
    { id: 't316', name: 'Marcheur de Feu', rarity: 'Épique', cost: 1850, source: 'shop' },
    { id: 't317', name: 'Samouraï de la Fonte', rarity: 'Épique', cost: 1950, source: 'shop' },
    { id: 't318', name: 'Fantôme des Racks', rarity: 'Épique', cost: 1980, source: 'shop' },

    // Légendaires
    { id: 't401', name: 'Colosse des Gyms', rarity: 'Légendaire', cost: 2500, source: 'shop' },
    { id: 't402', name: 'Machine Humaine', rarity: 'Légendaire', cost: 2700, source: 'shop' },
    { id: 't403', name: 'Vétéran Indomptable', rarity: 'Légendaire', cost: 2800, source: 'shop' },
    { id: 't404', name: 'Volonté Ardente', rarity: 'Légendaire', cost: 3000, source: 'shop' },
    // == NOUVEAUX AJOUTS ==
    { id: 't405', name: 'Descendant d\'Hercule', rarity: 'Légendaire', cost: 2900, source: 'shop' },
    { id: 't406', name: 'Avatar de la Force', rarity: 'Légendaire', cost: 3100, source: 'shop' },
    { id: 't407', name: 'Moteur Inarrêtable', rarity: 'Légendaire', cost: 3300, source: 'shop' },
    { id: 't408', name: 'Monarque Musculaire', rarity: 'Légendaire', cost: 3500, source: 'shop' },
    { id: 't409', name: 'L\'Ombre et la Masse', rarity: 'Légendaire', cost: 3800, source: 'shop' },
    { id: 't410', name: 'Phénomène Physique', rarity: 'Légendaire', cost: 4000, source: 'shop' },
    { id: 't411', name: 'Einherjar', rarity: 'Légendaire', cost: 4200, source: 'shop' },
    { id: 't412', name: 'Champion d\'Arès', rarity: 'Légendaire', cost: 4500, source: 'shop' },
    { id: 't413', name: 'Netrunner Anabolique', rarity: 'Légendaire', cost: 4800, source: 'shop' },
    { id: 't414', name: 'Dieu du Pré-Workout', rarity: 'Légendaire', cost: 5000, source: 'shop' },

    // Mythiques
    { id: 't501', name: 'Olympe en Marche', rarity: 'Mythique', cost: 6000, source: 'shop' },
    { id: 't502', name: 'Hercule Renforcé', rarity: 'Mythique', cost: 7000, source: 'shop' },
    { id: 't503', name: 'Entité Cosmique', rarity: 'Mythique', cost: 8000, source: 'shop' },
    // == NOUVEAUX AJOUTS ==
    { id: 't504', name: 'Relique Vivante', rarity: 'Mythique', cost: 8200, source: 'shop' },
    { id: 't505', name: 'Anomalie Génétique', rarity: 'Mythique', cost: 8800, source: 'shop' },
    { id: 't506', name: 'Le Dernier Spartiate', rarity: 'Mythique', cost: 9200, source: 'shop' },
    { id: 't507', name: 'Mythe Incarné', rarity: 'Mythique', cost: 9500, source: 'shop' },
    { id: 't508', name: 'Gravité Zéro', rarity: 'Mythique', cost: 10000, source: 'shop' },
    { id: 't509', name: 'Écho du Big Bang', rarity: 'Mythique', cost: 12000, source: 'shop' },
    { id: 't510', name: 'Juggernaut', rarity: 'Mythique', cost: 15000, source: 'shop' },

    // Divins
    { id: 't601', name: 'Ascensionné', rarity: 'Divin', cost: 25000, source: 'shop' },
    { id: 't602', name: 'Architecte du Cosmos', rarity: 'Divin', cost: 30000, source: 'shop' },
    { id: 't603', name: 'Volonté des Dieux', rarity: 'Divin', cost: 40000, source: 'shop' },
    { id: 't604', name: 'Alpha & Oméga', rarity: 'Divin', cost: 50000, source: 'shop' },
    { id: 't-gymbro-originel', name: 'Gymbro Originel', rarity: 'Divin', cost: 0, color: 'title-gymbro-originel', source: 'secret' },
    { id: 't-pompier-muscle', name: 'Pompier Musclé', rarity: 'Divin', cost: 0, color: 'title-pompier-muscle', source: 'secret' },
    { id: 't-the-bench-monster', name: 'The Bench Monster', rarity: 'Divin', cost: 0, color: 'title-the-bench-monster', source: 'secret' },
    { id: 't-createur-supreme', name: 'The Gym Dev', rarity: 'Divin', cost: 0, color: 'title-createur-supreme', source: 'secret' },

    // --- Titres de Succès Secrets ---
    { id: 't_forgeron', name: 'Forgeron de la Fonte', rarity: 'Rare', source: 'achievement' },
    { id: 't_intense', name: 'Ouragan Musculaire', rarity: 'Rare', source: 'achievement' },
    { id: 't_repetiteur', name: 'Le Répétiteur', rarity: 'Épique', source: 'achievement' },
    { id: 't_set_master', name: 'Maître des Séries', rarity: 'Épique', source: 'achievement' },
    { id: 't_pr_hunter', name: 'Chasseur de Records', rarity: 'Légendaire', source: 'achievement' },
    { id: 't_imparable', name: 'Imparable', rarity: 'Épique', source: 'achievement' },
    { id: 't_veteran', name: 'Vétéran de la Salle', rarity: 'Légendaire', source: 'achievement' },
    { id: 't_parfait', name: 'Le Perfectionniste', rarity: 'Légendaire', source: 'achievement' },
    { id: 't_devoue', name: 'Dévoué', rarity: 'Mythique', source: 'achievement' },
    { id: 't_leve_tot', name: 'Le Matinal', rarity: 'Rare', source: 'achievement' },
    { id: 't_oiseau_de_nuit', name: 'Oiseau de Nuit', rarity: 'Rare', source: 'achievement' },
    { id: 't_chef', name: 'Chef Étoilé', rarity: 'Épique', source: 'achievement' },
    { id: 't_nutritionniste', name: 'Nutritionniste Rigoureux', rarity: 'Légendaire', source: 'achievement' },
    { id: 't_millionnaire', name: 'Calorie Millionnaire', rarity: 'Épique', source: 'achievement' },
    { id: 't_bench_club', name: 'Club des 100kg', rarity: 'Rare', source: 'achievement' },
    { id: 't_squat_king', name: 'Le Trône', rarity: 'Rare', source: 'achievement' },
    { id: 't_deadlift_sovereign', name: 'Le Souverain', rarity: 'Rare', source: 'achievement' },
    { id: 't_plank_god', name: 'Dieu du Gainage', rarity: 'Épique', source: 'achievement' },
    { id: 't_bodyweight_beast', name: 'Bête au Poids du Corps', rarity: 'Légendaire', source: 'achievement' },
    { id: 't_collector', name: 'Le Collectionneur', rarity: 'Épique', source: 'achievement' },
    { id: 't_spendthrift', name: 'Le Dépensier', rarity: 'Rare', source: 'achievement' },
    { id: 't_wealthy', name: 'Fortuné', rarity: 'Épique', source: 'achievement' },
    { id: 't_minimalist', name: 'Le Minimaliste', rarity: 'Rare', source: 'achievement' },
    { id: 't_over9000', name: "C'est plus de 9000 !", rarity: 'Légendaire', source: 'achievement' }
];

const ACHIEVEMENTS_DATABASE = [
    // === VOLUME & FORCE ===
    { id: 'total_volume', name: "Forgeron de la Fonte", description: (goal) => `Soulever un total de ${formatVolume(goal)}.`, icon: 'fa-weight-hanging', color: '#FBBF24', tiers: [ { goal: 10000, reward: { type: 'coins', amount: 50 } }, { goal: 100000, reward: { type: 'coins', amount: 150 } }, { goal: 500000, reward: { type: 'coins', amount: 300 } }, { goal: 1000000, reward: { type: 'title', id: 't_forgeron' } }, { goal: 10000000, reward: { type: 'coins', amount: 1000 } }, { goal: 100000000, reward: { type: 'border', id: 'b_titan' } } ] },
    { id: 'single_session_volume', name: "Session Intense", description: (goal) => `Soulever ${formatVolume(goal)} en une seule séance.`, icon: 'fa-bolt', color: '#F87171', tiers: [ { goal: 5000, reward: { type: 'coins', amount: 25 } }, { goal: 10000, reward: { type: 'coins', amount: 75 } }, { goal: 20000, reward: { type: 'title', id: 't_intense' } } ] },
    { id: 'total_reps', name: "Le Répétiteur", description: (goal) => `Effectuer ${goal.toLocaleString('fr-FR')} répétitions.`, icon: 'fa-repeat', color: '#60A5FA', tiers: [ { goal: 1000, reward: { type: 'coins', amount: 20 } }, { goal: 10000, reward: { type: 'coins', amount: 100 } }, { goal: 50000, reward: { type: 'coins', amount: 250 } }, { goal: 100000, reward: { type: 'title', id: 't_repetiteur' } } ] },
    { id: 'total_sets', name: "Maître des Séries", description: (goal) => `Terminer ${goal.toLocaleString('fr-FR')} séries.`, icon: 'fa-layer-group', color: '#CA8A04', tiers: [{ goal: 500, reward: {type: 'coins', amount: 50} }, { goal: 2500, reward: {type: 'coins', amount: 200} }, { goal: 10000, reward: {type: 'title', id: 't_set_master'} }] },
    { id: 'pr_breaker', name: "Chasseur de Records", description: (goal) => `Battre ${goal} record(s) personnel(s).`, icon: 'fa-star', color: '#FDE047', tiers: [ { goal: 1, reward: { type: 'coins', amount: 50 } }, { goal: 10, reward: { type: 'coins', amount: 100 } }, { goal: 50, reward: { type: 'coins', amount: 250 } }, { goal: 100, reward: { type: 'title', id: 't_pr_hunter' } } ] },
    
    // === CONSISTANCE & HABITUDES ===
    { id: 'workout_streak', name: "Imparable", description: (goal) => `Atteindre une série de ${goal} jours d'entraînement.`, icon: 'fa-fire-flame-curved', color: '#F97316', tiers: [ { goal: 7, reward: { type: 'coins', amount: 50 } }, { goal: 30, reward: { type: 'title', id: 't_imparable' } }, { goal: 100, reward: { type: 'border', id: 'b_flamme' } }, { goal: 365, reward: { type: 'border', id: 'b_eternelle' } } ] },
    { id: 'total_sessions_completed', name: "Vétéran de la Salle", description: (goal) => `Terminer ${goal} séances.`, icon: 'fa-calendar-check', color: '#10B981', tiers: [ { goal: 10, reward: { type: 'coins', amount: 25 } }, { goal: 50, reward: { type: 'coins', amount: 150 } }, { goal: 100, reward: { type: 'coins', amount: 250 } }, { goal: 500, reward: { type: 'title', id: 't_veteran' } } ] },
    { id: 'perfect_week', name: "Semaine Parfaite", description: (goal) => `Terminer toutes les séances planifiées sur ${goal} semaine(s).`, icon: 'fa-circle-check', color: '#14B8A6', tiers: [ { goal: 1, reward: { type: 'coins', amount: 100 } }, { goal: 4, reward: { type: 'coins', amount: 200 } }, { goal: 12, reward: { type: 'title', id: 't_parfait' } } ] },
    { id: 'total_training_time', name: "Dévoué", description: (goal) => `Passer ${goal} heures à s'entraîner.`, icon: 'fa-clock', color: '#6366F1', tiers: [ { goal: 10, reward: { type: 'coins', amount: 30 } }, { goal: 50, reward: { type: 'coins', amount: 200 } }, { goal: 200, reward: { type: 'coins', amount: 400 } }, { goal: 1000, reward: { type: 'title', id: 't_devoue' } } ] },
    { id: 'early_bird', name: "Lève-tôt", description: (goal) => `Commencer ${goal} séance(s) avant 7h.`, icon: 'fa-sun', color: '#F59E0B', tiers: [ { goal: 1, reward: { type: 'coins', amount: 30 } }, { goal: 10, reward: { type: 'coins', amount: 100 } }, { goal: 50, reward: { type: 'title', id: 't_leve_tot' } } ] },
    { id: 'night_owl', name: "Oiseau de Nuit", description: (goal) => `Terminer ${goal} séance(s) après 22h.`, icon: 'fa-moon', color: '#8B5CF6', tiers: [ { goal: 1, reward: { type: 'coins', amount: 30 } }, { goal: 10, reward: { type: 'coins', amount: 100 } }, { goal: 50, reward: { type: 'title', id: 't_oiseau_de_nuit' } } ] },

    // === NUTRITION ===
    { id: 'meals_created', name: "Chef Étoilé", description: (goal) => `Créer ${goal} repas.`, icon: 'fa-utensils', color: '#34D399', tiers: [ { goal: 10, reward: { type: 'coins', amount: 25 } }, { goal: 50, reward: { type: 'coins', amount: 100 } }, { goal: 200, reward: { type: 'title', id: 't_chef' } } ] },
    { id: 'nutrition_streak', name: "Nutritionniste Rigoureux", description: (goal) => `Atteindre ses objectifs nutritionnels ${goal} jours de suite.`, icon: 'fa-carrot', color: '#84CC16', tiers: [ { goal: 7, reward: { type: 'coins', amount: 75 } }, { goal: 30, reward: { type: 'coins', amount: 500 } }, { goal: 90, reward: { type: 'title', id: 't_nutritionniste' } } ] },
    { id: 'scan_master', name: "Maître du Scan", description: (goal) => `Scanner ${goal} codes-barres différents.`, icon: 'fa-barcode', color: '#EAB308', tiers: [ { goal: 5, reward: { type: 'coins', amount: 15 } }, { goal: 25, reward: { type: 'coins', amount: 50 } }, { goal: 100, reward: { type: 'coins', amount: 200 } } ] },
    { id: 'million_calories', name: "Le Million de Calories", description: (goal) => `Suivre un million de calories.`, icon: 'fa-calculator', color: '#EF4444', tiers: [ { goal: 1000000, reward: { type: 'title', id: 't_millionnaire' } } ] },

    // === JALONS & SPÉCIALISATION ===
    { id: 'heavy_lifter_club', name: "Club des Gros Souleveurs (SBD)", description: (goal) => `Atteindre un 1RM de 150kg sur les ${goal} mouvements du SBD (Squat, Bench, Deadlift).`, icon: 'fa-trophy', color: '#FBBF24', tiers: [{ goal: 3, reward: {type: 'border', id: 'b_heavy'} }] },
    { id: 'bench_press_club', name: "Club des 100kg (Bench)", description: (goal) => `Soulever ${goal}kg au développé couché.`, icon: 'fa-dumbbell', color: '#DC2626', tiers: [ { goal: 100, reward: { type: 'title', id: 't_bench_club' } } ] },
    { id: 'squat_club', name: "Le Trône (Squat)", description: (goal) => `Soulever ${goal}kg au squat.`, icon: 'fa-chess-king', color: '#2563EB', tiers: [ { goal: 140, reward: { type: 'title', id: 't_squat_king' } } ] },
    { id: 'deadlift_club', name: "Le Souverain (Deadlift)", description: (goal) => `Soulever ${goal}kg au soulevé de terre.`, icon: 'fa-monument', color: '#4B5563', tiers: [ { goal: 180, reward: { type: 'title', id: 't_deadlift_sovereign' } } ] },
    { id: 'pullup_master', name: "Maître des Tractions", description: (goal) => `Effectuer ${goal} tractions en une série.`, icon: 'fa-hands-clapping', color: '#059669', tiers: [ { goal: 20, reward: { type: 'coins', amount: 300 } } ] },
    { id: 'plank_god', name: "Dieu du Gainage", description: (goal) => `Tenir ${goal / 60} minutes en gainage.`, icon: 'fa-stopwatch-20', color: '#D97706', tiers: [ { goal: 300, reward: { type: 'title', id: 't_plank_god' } } ] },
    { id: 'bodyweight_beast', name: "Bête au Poids du Corps", description: (goal) => `Atteindre le rang Vétéran sur 3 exercices au poids du corps.`, icon: 'fa-user-astronaut', color: '#6B7280', tiers: [{ goal: 3, reward: {type: 'title', id: 't_bodyweight_beast'} }] },
    { id: 'all_muscle_groups_in_week', name: "Le Conquérant", description: (goal) => `Entraîner tous les groupes musculaires en une semaine.`, icon: 'fa-universal-access', color: '#0D9488', tiers: [ { goal: 1, reward: { type: 'coins', amount: 150 } } ] },
    
    // === PERSONNALISATION & ÉCONOMIE ===
    { id: 'shop_first_purchase', name: "Premier Achat", description: (goal) => `Acheter votre premier article dans la boutique.`, icon: 'fa-store', color: '#A78BFA', tiers: [ { goal: 1, reward: { type: 'coins', amount: 50 } } ] },
    { id: 'collector_initiate', name: "Collectionneur", description: (goal) => `Obtenir ${goal} objets de collection différents.`, icon: 'fa-box', color: '#A16207', tiers: [ { goal: 10, reward: { type: 'coins', amount: 50 } }, { goal: 50, reward: { type: 'coins', amount: 200 } }, { goal: 100, reward: {type: 'title', id: 't_collector'} } ] },
    { id: 'collection_complete', name: "Collectionneur Ultime", description: (goal) => `Débloquer tous les objets de collection (${goal}).`, icon: 'fa-boxes-stacked', color: '#A78BFA', tiers: [ { goal: COLLECTIBLES_DATABASE.length, reward: { type: 'border', id: 'b_collector_ultimate' } } ] },
    { 
    id: 'profile_complete', 
    name: "Carte d'Identité", 
    description: (goal) => `Remplir toutes les informations du profil.`, 
    icon: 'fa-id-card', 
    color: '#6B7280', 
    tiers: [ { goal: 1, reward: { type: 'coins', amount: 100 } } ],
    // AJOUTEZ CETTE FONCTION
    checkCondition: (state) => {
        const p = state.userProfile;
        return (p.name && p.name !== 'User' && p.dob && p.sex && p.country) ? 1 : 0;
    }
},
    { 
    id: 'profile_pic_upload', 
    name: "Photogénique", 
    description: (goal) => `Ajouter une photo de profil.`, 
    icon: 'fa-camera', 
    color: '#9333EA', 
    tiers: [{ goal: 1, reward: {type: 'coins', amount: 100} }],
    // AJOUTEZ CETTE FONCTION
    checkCondition: (state) => {
        return state.userProfile.profilePicUrl ? 1 : 0;
    }
},
    { id: 'spendthrift', name: "Dépensier", description: (goal) => `Dépenser ${goal.toLocaleString('fr-FR')} pièces.`, icon: 'fa-coins', color: '#F59E0B', tiers: [{ goal: 1000, reward: {type: 'coins', amount: 50} }, { goal: 5000, reward: {type: 'coins', amount: 200} }, { goal: 20000, reward: {type: 'title', id: 't_spendthrift'} }] },
    { id: 'legendary_owner', name: "Possession Légendaire", description: (goal) => `Obtenir un objet de rareté Légendaire.`, icon: 'fa-star-of-david', color: '#FBBF24', tiers: [{ goal: 1, reward: {type: 'collectible', id: 'c407'} }] }, // Récompense : Mjolnir
    { id: 'wealthy', name: "Fortuné", description: (goal) => `Posséder ${goal.toLocaleString('fr-FR')} pièces en même temps.`, icon: 'fa-sack-dollar', color: '#FDE047', tiers: [{ goal: 10000, reward: {type: 'coins', amount: 100} }, { goal: 25000, reward: {type: 'coins', amount: 500} }, { goal: 50000, reward: {type: 'title', id: 't_wealthy'} }] },

    // === DRÔLES & SECRETS ===
    { id: 'failure_is_an_option', name: "L'échec est une option", description: (goal) => `Échouer à une série en faisant 0 répétition.`, icon: 'fa-face-dizzy', color: '#71717A', tiers: [ { goal: 1, reward: { type: 'coins', amount: 10 } } ] },
    { id: 'one_rep_max_and_out', name: "Un, et puis c'est tout", description: (goal) => `Faire une séance d'une seule répétition.`, icon: 'fa-hand-pointer', color: '#BE185D', tiers: [ { goal: 1, reward: { type: 'title', id: 't_minimalist' } } ] },
    { id: 'over_9000', name: "IT'S OVER 9000!", description: (goal) => `Atteindre un score de performance de plus de 9000.`, icon: 'fa-bolt-lightning', color: '#FBBF24', tiers: [ { goal: 9001, reward: { type: 'title', id: 't_over9000' } } ] },
    { id: 'hello_world', name: "Hello, World!", description: (goal) => `Ouvrir l'application pour la première fois.`, icon: 'fa-hand-wave', color: '#60A5FA', tiers: [{ goal: 1, reward: { type: 'coins', amount: 100 } }] },
    { id: 'rewarded_curiosity', name: "Curiosité Récompensée", description: (goal) => `Consulter toutes les ${goal} pages d'aide (?).`, icon: 'fa-book-medical', color: '#6EE7B7', tiers: [ { goal: 3, reward: { type: 'coins', amount: 200 } } ] },

    // === SUCCÈS FINAL ===
    { 
    id: 'completionist', 
    name: "Le Complétionniste", 
    description: (goal) => `Atteindre 100% de progression totale sur tous les succès.`, 
    icon: 'fa-infinity', 
    color: '#FFFFFF', 
    isHidden: true, // <-- AJOUTEZ CETTE LIGNE
    tiers: [{ goal: 1, reward: {type: 'border', id: 'b_infinity'} }] 
},

    // === SUCCÈS SECRET ===
    { 
        id: 'secret_dev_achievement', 
        name: "Héritage du Créateur", 
        description: (goal) => `Débloqué en tant que développeur de FitFlow.`, 
        icon: 'fa-user-secret', 
        color: '#DC2626',
        isHidden: true, // Propriété pour le cacher par défaut
        tiers: [
            { goal: 1, reward: { type: 'collectible', id: 'c701' } }, // Clavier
            { goal: 1, reward: { type: 'collectible', id: 'c702' } }, // Tasse
            { goal: 1, reward: { type: 'collectible', id: 'c703' } }  // Code
        ] 
    }
];

        // --- DATABASE & STATE MANAGEMENT ---
        let state = {
            workouts: [],
            meals: [],
            workoutTags: [], 
            mealTags: [],
            mealsSortOrder: 'alpha',
            calendarEvents: [],
            sessionHistory: [],
            userGoals: { calories: 2500, protein: 180, bodyWeight: 75 },
            userProfile: {
                name: 'lilian rivière',
                dob: '2004-08-26',
                sex: 'Homme', // Homme | Femme
                country: 'France',
                profilePicUrl: null,
                coins: 100000,
                inventory: {
                    borders: ['b001'], // L'utilisateur possède la bordure par défaut
                    titles: ['t001'],  // Et le titre par défaut
                    collectibles: []
                },
                equipped: {
                    border: 'b001',
                    title: 't001',
                    showcase: [null, null, null]
                    },
                    achievements: {}
                    
            },
            shop: {
                activeTab: 'box',
                scrollPosition: undefined,
                bordersSortOrder: 'possession', 
            titlesSortOrder: 'possession',
            collectiblesSortOrder: 'possession'
            },
            achievementsSortOrder: 'progress_desc',
            itemSelectorSortOrder: 'rarity_desc',
            exerciseStats: {},
            activePage: 'Accueil',
            calendarDate: new Date(),
            currentPageParams: {},
            editingWorkout: null,
            editingMeal: null,
            selectedChartExerciseId: null,
            activeWorkoutSession: null,
            tempUserProfile: null,
            viewFilter: 'workout',
            workoutsSortOrder: 'alpha',
            statsSortOrder: 'rank_desc',
            sortOrderLabels: {
                'rank_desc': 'Meilleurs Rangs',
                'rank_asc': 'Pires Rangs',
                'alpha': 'Ordre Alphabétique'
            },
            rankInfoModal: {
                selectedRank: 'Novice'
            },
            streaks: {
                workout: {
                    count: 0,
                    lastChance: false
                },
                nutrition: {
                    count: 0
                }
            }
        };

        initializeDatabase();
        initializeTags();

        let playerTimer = null;
        let sessionDurationTimer = null;
        let autocompleteTimeout = null;
        let html5QrCode = null;
        let currentSearchResults = [];
        let progressionChart = null;
        let lastItemObserver = null;
        let isStoryScrolling = false;

        // --- UTILITY FUNCTIONS ---

        function checkRarityAchievement() {
    const ownedRarities = new Set();
    const allInventory = [
        ...state.userProfile.inventory.borders.map(id => BORDERS_DATABASE.find(i => i.id === id)),
        ...state.userProfile.inventory.titles.map(id => TITLES_DATABASE.find(i => i.id === id)),
        ...state.userProfile.inventory.collectibles.map(id => COLLECTIBLES_DATABASE.find(i => i.id === id))
    ];
    
    allInventory.filter(Boolean).forEach(item => ownedRarities.add(item.rarity));
    
    updateAchievementProgress('rarity_rainbow', ownedRarities.size, 'set');
}

        function updateAchievementProgress(achievementId, value, mode = 'increment') {
    const achievement = ACHIEVEMENTS_DATABASE.find(ach => ach.id === achievementId);
    if (!achievement) return;

    if (!state.userProfile.achievements[achievementId]) {
        // La structure de données doit être persistante, on la récupère du localStorage si elle existe
        const savedAchievements = JSON.parse(localStorage.getItem('fitflow_state'))?.userProfile?.achievements || {};
        const achData = savedAchievements[achievementId] || { progress: 0, claimedTiers: [], qualifyingData: [] };
        // On convertit en Set si c'est un Array pour la compatibilité
        state.userProfile.achievements[achievementId] = { ...achData, qualifyingData: new Set(achData.qualifyingData) };
    }
    
    const achData = state.userProfile.achievements[achievementId];

    switch(mode) {
        // ... (les cas 'increment', 'set', 'max' ne changent pas)
        case 'increment': achData.progress += value; break;
        case 'set': achData.progress = value; break;
        case 'max': achData.progress = Math.max(achData.progress, value); break;
        case 'add_to_set':
            achData.qualifyingData.add(value);
            achData.progress = achData.qualifyingData.size;
            break;
    }

    // --- Déclencheur pour "Le Complétionniste" ---
    // On le met ici pour qu'il se mette à jour après n'importe quel autre succès
    const globalProgress = calculateGlobalAchievementProgress();
    if (parseFloat(globalProgress.percentage) >= 100) {
        // On vérifie avant de mettre à jour pour éviter une boucle infinie
        if (state.userProfile.achievements['completionist']?.progress !== 1) {
             if (!state.userProfile.achievements['completionist']) {
                state.userProfile.achievements['completionist'] = { progress: 0, claimedTiers: [], qualifyingData: new Set() };
             }
             state.userProfile.achievements['completionist'].progress = 1;
        }
    }
}

        function updateStreaks() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayStr = formatDateToYYYYMMDD(today);

            // --- CALCUL DE LA SÉRIE D'ENTRAÎNEMENTS (INCHANGÉ) ---
            const completedWorkoutDates = [...new Set(
                state.sessionHistory.map(session => formatDateToYYYYMMDD(new Date(session.date)))
            )].sort((a, b) => new Date(b) - new Date(a));

            let workoutStreak = 0;
            let lastChance = false;

            if (completedWorkoutDates.length > 0) {
                const lastWorkoutDate = new Date(completedWorkoutDates[0]);
                const daysSinceLastWorkout = Math.round((today - lastWorkoutDate) / (1000 * 60 * 60 * 24));

                if (daysSinceLastWorkout >= 3) {
                    workoutStreak = 0;
                } else {
                    workoutStreak = 1;
                    for (let i = 0; i < completedWorkoutDates.length - 1; i++) {
                        const currentDate = new Date(completedWorkoutDates[i]);
                        const previousDate = new Date(completedWorkoutDates[i + 1]);
                        const diff = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));
                        if (diff < 3) {
                            workoutStreak++;
                        } else {
                            break;
                        }
                    }
                    if (daysSinceLastWorkout === 2) {
                        lastChance = true;
                    }
                }
            }
            state.streaks.workout = { count: workoutStreak, lastChance };

            // --- CALCUL DE LA SÉRIE NUTRITION (LOGIQUE CORRIGÉE) ---
            const nutritionLog = {};
            state.calendarEvents
                .filter(e => e.type === 'meal' && e.validated)
                .forEach(event => {
                    const meal = state.meals.find(m => m.id === event.refId);
                    if (meal) {
                        if (!nutritionLog[event.date]) {
                            nutritionLog[event.date] = { calories: 0, protein: 0 };
                        }
                        nutritionLog[event.date].calories += meal.nutrition.calories;
                        nutritionLog[event.date].protein += meal.nutrition.protein;
                    }
                });

            // Étape 1 : On calcule la série des jours passés (jusqu'à hier)
            let historicalStreak = 0;
            let dateToCheck = new Date(today);
            dateToCheck.setDate(dateToCheck.getDate() - 1); // On commence à vérifier à partir d'hier

            for (let i = 0; i < 365; i++) {
                const dateStr = formatDateToYYYYMMDD(dateToCheck);
                const log = nutritionLog[dateStr];
                
                if (!log) { break; }

                let goalsMet = 0;
                if (log.calories >= state.userGoals.calories) goalsMet++;
                if (log.protein >= state.userGoals.protein) goalsMet++;

                if (goalsMet === 2) {
                    historicalStreak++;
                } else if (goalsMet === 0) {
                    break;
                }
                dateToCheck.setDate(dateToCheck.getDate() - 1);
            }

            // Étape 2 : On vérifie les objectifs d'AUJOURD'HUI pour le résultat final
            let finalNutritionStreak = historicalStreak;
            const todaysLog = nutritionLog[todayStr];
            if (todaysLog) {
                let todaysGoalsMet = 0;
                if (todaysLog.calories >= state.userGoals.calories) todaysGoalsMet++;
                if (todaysLog.protein >= state.userGoals.protein) todaysGoalsMet++;

                if (todaysGoalsMet === 2) {
                    finalNutritionStreak = historicalStreak + 1;
                }
                // Si 1 objectif est atteint, la série est maintenue (final = historical)
                // Si 0 objectif est atteint, la série est maintenue pour aujourd'hui, mais sera rompue demain
            }
            
            state.streaks.nutrition = { count: finalNutritionStreak };
        }
        
        function formatDuration(ms) {
            if (!ms || ms < 0) return '00:00';

            const totalSeconds = Math.floor(ms / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);
            const totalMonths = Math.floor(totalDays / 30.44); // Moyenne pour plus de précision
            const totalYears = Math.floor(totalDays / 365.25);

            if (totalYears > 0) {
                const months = Math.floor(totalMonths % 12);
                return `${totalYears}a ${months}m`;
            }
            if (totalMonths > 0) {
                const days = Math.floor(totalDays % 30.44);
                return `${totalMonths}m ${days}j`;
            }
            if (totalDays > 0) {
                const hours = Math.floor(totalHours % 24);
                return `${totalDays}j ${hours}h`;
            }
            if (totalHours > 0) {
                const minutes = Math.floor(totalMinutes % 60);
                return `${totalHours}h ${String(minutes).padStart(2, '0')}min`;
            }
            if (totalMinutes > 0) {
                const seconds = totalSeconds % 60;
                return `${totalMinutes}min ${String(seconds).padStart(2, '0')}s`;
            }
            return `${totalSeconds}s`;
        }

        function formatVolume(kg) {
            if (kg < 1000) {
                // Moins de 1 000 kg -> affiche en kg
                return `${kg.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} kg`;
            } else if (kg < 1000000) {
                // de 1 000 kg à 999 999 kg -> affiche en tonnes (t)
                return `${(kg / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} t`;
            } else if (kg < 1000000000) {
                // de 1 million à 999 millions kg -> affiche en kilotonnes (kt)
                return `${(kg / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} kt`;
            } else if (kg < 1000000000000) {
                // de 1 milliard à 999 milliards kg -> affiche en Mégatonnes (Mt)
                return `${(kg / 1000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mt`;
            } else if (kg < 1000000000000000) {
                // Affiche en Gigatonnes (Gt)
                return `${(kg / 1000000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Gt`;
            } else if (kg < 1000000000000000000) {
                // Affiche en Tératonnes (Tt)
                return `${(kg / 1000000000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Tt`;
            } else if (kg < 1000000000000000000000) {
                // Affiche en Pétatonnes (Pt)
                return `${(kg / 1000000000000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Pt`;
            } else if (kg < 1000000000000000000000000) {
                // Affiche en Exatonnes (Et)
                return `${(kg / 1000000000000000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Et`;
            } else if (kg < 1000000000000000000000000000) {
                // Affiche en Zettatonnes (Zt)
                return `${(kg / 1000000000000000000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Zt`;
            } else if (kg < 1000000000000000000000000000000) { 
                // Affiche en Yottatonnes (Yt)
                return `${(kg / 1000000000000000000000000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Yt`;
            } else {
                // === EASTER EGG POUR LES VALEURS INIMAGINABLES ===
                const easterEggs = [
                    'Hercule ?',
                ];
                return easterEggs[Math.floor(Math.random() * easterEggs.length)];
            }
        }

        function closeAllDropdowns() {
    // Sélectionne toutes les listes d'options qui sont actuellement actives
    document.querySelectorAll('.custom-select-options.active, .shop-sort-options.active').forEach(options => {
        options.classList.remove('active');
        // On s'assure de retirer aussi la classe 'active' du bouton parent
        const parentContainer = options.closest('.custom-select-container');
        if (parentContainer) {
            parentContainer.querySelector('.custom-select-button, .shop-sort-button')?.classList.remove('active');
        }
    });
}

        let cropper = null;

        function showToast(message, type = 'success') { // 'success', 'error', 'info'
            const toastContainer = document.getElementById('toast-container');
            if (!toastContainer) return;

            // Clear any existing toasts to ensure only one is active
            Array.from(toastContainer.children).forEach(child => child.remove());
            
            const toast = document.createElement('div');
            let bgColorClass = '';
            let textColorClass = '';

            if (type === 'success') {
                bgColorClass = 'bg-green-500';
                textColorClass = 'text-green-900';
            } else if (type === 'error') {
                bgColorClass = 'bg-red-500';
                // === MODIFICATION ICI ===
                // On remplace 'text-red-900' par 'text-white' pour le texte de l'erreur.
                textColorClass = 'text-white';
            } else { // info or default
                bgColorClass = 'bg-violet-500';
                textColorClass = 'text-white';
            }

            toast.className = `toast-notification ${bgColorClass} ${textColorClass}`;
            toast.textContent = message;
            toastContainer.appendChild(toast);

            // Animate in
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);

            // Animate out and remove after a shorter duration (e.g., 2 seconds)
            setTimeout(() => {
                toast.classList.remove('show');
                toast.addEventListener('transitionend', () => toast.remove(), { once: true });
            }, 2000); // Toast disappears after 2 seconds
        }

        // Dans votre <script>

function animateItemPurchaseSuccess(itemCardElement) {
    if (!itemCardElement) return;
    // On garde le même nom de classe, mais le CSS derrière a changé !
    itemCardElement.classList.add('animate-purchase-success');

    // La classe est retirée après l'animation pour permettre de futurs achats
    itemCardElement.addEventListener('animationend', () => {
        // On retire la classe pour que la pseudo-classe ::after disparaisse
        itemCardElement.classList.remove('animate-purchase-success');
    }, { once: true });
}

        function animateButtonFailure(buttonElement) {
    if (!buttonElement) return;
    buttonElement.classList.add('animate-purchase-fail'); // Utilise la classe pour la vibration
    buttonElement.addEventListener('animationend', () => {
        buttonElement.classList.remove('animate-purchase-fail');
    }, { once: true });
}

        function animateProfileSave(saveButton) {
            if (!saveButton) return;
            // Create a temporary checkmark icon
            const checkIcon = document.createElement('i');
            checkIcon.className = 'fa-solid fa-check text-green-400 text-xl ml-2 animate-checkmark';
            
            // Append it next to the button
            // Use saveButton.parentNode.insertBefore instead of nextSibling for more robust placement
            saveButton.parentNode.insertBefore(checkIcon, saveButton.nextSibling);

            // Make toast appear briefly
            showToast('Profil sauvegardé avec succès !');

            // Remove the checkmark after a short delay
            setTimeout(() => {
                checkIcon.remove();
            }, 1500); // Checkmark fades out faster than toast
        }

        const normalizeString = (str) => {
    if (!str) return '';
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

        function openCropperModal(imageSrc) {
            const cropperModalContainer = document.getElementById('cropper-modal-container');
            const appContainer = document.getElementById('app-container');
            
            const modalHTML = `
                <div id="cropper-modal-content" class="absolute bottom-0 left-0 right-0 p-4 rounded-t-3xl flex flex-col h-[70vh]">
                    <h2 class="text-xl font-bold text-center mb-4">Recadrer la photo</h2>
                    <div id="cropper-image-container" class="flex-grow">
                        <img id="cropper-image" src="${imageSrc}">
                    </div>
                    <div class="flex gap-4 mt-4">
                        <button id="cancel-crop-btn" class="w-full glass-card p-3 rounded-lg font-bold">Annuler</button>
                        <button id="confirm-crop-btn" class="w-full btn-primary">Valider</button>
                    </div>
                </div>`;
            
            cropperModalContainer.innerHTML = modalHTML;
            cropperModalContainer.classList.remove('hidden');
            appContainer.style.transform = 'scale(0.95) translateY(-20px)';
            appContainer.style.transition = 'transform 0.3s ease';

            const image = document.getElementById('cropper-image');
            cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                background: false,
                autoCropArea: 0.8,
            });

            document.getElementById('confirm-crop-btn').onclick = () => {
                const croppedCanvas = cropper.getCroppedCanvas({
                    width: 256,
                    height: 256,
                    imageSmoothingQuality: 'high',
                });
                const newImageUrl = croppedCanvas.toDataURL('image/png');
                
                // Store in tempUserProfile instead of state.userProfile directly
                if (state.tempUserProfile) {
                    state.tempUserProfile.profilePicUrl = newImageUrl;
                } else {
                    // Fallback in case tempUserProfile wasn't created (shouldn't happen if navigate is correct)
                    state.userProfile.profilePicUrl = newImageUrl;
                }
                
                // Don't save to localStorage immediately
                // localStorage.setItem('fitflow_profile_pic', newImageUrl);

                cropper.destroy();
                cropperModalContainer.classList.add('hidden');
                appContainer.style.transform = '';
                render(); // Re-render to show change in temp profile
            };

            document.getElementById('cancel-crop-btn').onclick = () => {
                cropper.destroy();
                cropperModalContainer.classList.add('hidden');
                appContainer.style.transform = '';
            };
        }

        function handleProfilePictureChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => openCropperModal(e.target.result);
                reader.readAsDataURL(file);
                event.target.value = '';
            }
        }

        // --- Fonctions pour le système de Rangs ---
        function calculatePerformanceScore(params) {
            const { type, charge, reps, poidsDuCorps, coefficient, pdcPercent } = params;
            if (!poidsDuCorps || poidsDuCorps <= 0 || reps <= 0) return 0;

            const repMultiplier = 1 + (reps / (30 + (reps / 4)));
            let effectiveLoad = 0;

            if (type === 'weighted') {
                effectiveLoad = charge;
            } else if (type === 'bodyweight') {
                effectiveLoad = (poidsDuCorps * (pdcPercent || 0)) + (charge * 0.75);
            } else if (type === 'timed') {
                const chargeEffectiveTimed = charge > 0 ? charge : poidsDuCorps * (pdcPercent || 1.0);
                return (chargeEffectiveTimed * reps * coefficient) / (poidsDuCorps * 10);
            }

            const normalizedStrength = (effectiveLoad * repMultiplier) / poidsDuCorps;
            const score = normalizedStrength * coefficient * 10;
            return score > 0 ? score : 0;
        }

        function calculateAbsolutePerformance(params) {
            const { type, charge, reps, coefficient, pdcPercent } = params;
            if (reps <= 0) return 0;

            const repMultiplier = 1 + (reps / (30 + (reps / 4)));
            let effectiveLoad = 0;

            if (type === 'weighted') {
                effectiveLoad = charge;
            } else if (type === 'bodyweight') {
                const referenceBodyweight = 80;
                effectiveLoad = (referenceBodyweight * (pdcPercent || 0)) + (charge * 0.75);
            } else if (type === 'timed') {
                const referenceBodyweight = 80;
                const chargeEffectiveTimed = charge > 0 ? charge : referenceBodyweight * (pdcPercent || 1.0);
                return (chargeEffectiveTimed * reps * coefficient);
            }

            const absoluteScore = (effectiveLoad * repMultiplier) * coefficient;
            return absoluteScore > 0 ? absoluteScore : 0;
        }


        function getRankFromScore(score, exerciseId) {
            const exercise = getExerciseById(exerciseId);
            if (!exercise || exercise.targetScore <= 0) return { name: 'Non classé', baseName: 'Novice', progress: 0, nextRankName: 'N/A', points: 0, sr: 0, color: getRankColor('Novice') };

            let adjustedTargetScore = exercise.targetScore;
            if (state.userProfile.sex === 'Femme') {
                adjustedTargetScore *= 0.70;
            }

            const progressionCurve = [0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.88, 1.0];
            const thresholds = progressionCurve.map(p => p * adjustedTargetScore);
            
            let rankIndex = 0;
            for (let i = thresholds.length - 1; i >= 0; i--) {
                if (score >= thresholds[i]) { rankIndex = i; break; }
            }

            const isMaxRank = (rankIndex === RANK_NAMES.length - 1);
            const currentThreshold = thresholds[rankIndex];
            const nextThreshold = isMaxRank ? (adjustedTargetScore * 1.1) : thresholds[rankIndex + 1];
            
            const scoreInLevel = score - currentThreshold;
            const scoreToNextLevel = nextThreshold - currentThreshold;
            const progress = scoreToNextLevel > 0 ? Math.min(Math.round((scoreInLevel / scoreToNextLevel) * 100), 100) : 100;

            let division = 'I';
            if (progress < 34) division = 'III';
            else if (progress < 67) division = 'II';
            
            const baseName = score === 0 ? RANK_NAMES[0] : RANK_NAMES[rankIndex];
            if (score === 0) division = 'III';

            const rankName = `${baseName} ${division}`;
            const nextRankName = isMaxRank ? 'Max' : `${RANK_NAMES[rankIndex + 1]} III`;
            
            const totalPoints = RANK_POINTS_MAP[rankName] || 0;

            // === AJOUT DU CALCUL SR (PUREMENT VISUEL) ===
            let sr = 0;
            if (isMaxRank && score > adjustedTargetScore) {
                // Pour chaque 2% au-dessus de l'objectif, on gagne 1 point de SR
                sr = Math.floor(((score / adjustedTargetScore) - 1) * 50);
            }
            // ===============================================

            return { name: rankName, baseName, progress, nextRankName, points: totalPoints, sr: sr, color: getRankColor(baseName) };
        }

        
        const RANK_COLORS = {
            'Novice':    { main: '#6B7280', accent: '#9CA3AF', shadow: '#4B5563' },
            'Rookie':    { main: '#10B981', accent: '#6EE7B7', shadow: '#059669' },
            'Disciple':  { main: '#3B82F6', accent: '#93C5FD', shadow: '#2563EB' },
            'Forgeron':  { main: '#F59E0B', accent: '#FCD34D', shadow: '#D97706' },
            'Vétéran':   { main: '#6366F1', accent: '#A5B4FC', shadow: '#4F46E5' },
            'Prodige':   { main: '#EC4899', accent: '#F9A8D4', shadow: '#DB2777' },
            'Colosse':   { main: '#EF4444', accent: '#FCA5A5', shadow: '#DC2626' },
            'Demi-Dieu': { main: '#8B5CF6', accent: '#C4B5FD', shadow: '#7C3AED' }
        };

        function getRankColor(rankBaseName) {
            return RANK_COLORS[rankBaseName] || RANK_COLORS['Novice'];
        }

        function getRankFromPoints(points) {
            const roundedPoints = Math.round(points);
            const rankName = REVERSE_RANK_POINTS_MAP[roundedPoints];
            if (rankName) {
                return {
                    name: rankName,
                    baseName: rankName.split(' ')[0],
                    points: roundedPoints
                };
            }
            // Failsafe pour les cas où le point n'existe pas (ne devrait pas arriver)
            return { name: 'Non classé', baseName: 'Novice', points: 0 };
        }

        function getRankBadgeSVG(rankName, size = '100%') {
            if (!rankName) return '';
            const rankBaseName = rankName.split(' ')[0];
            const selected = getRankColor(rankBaseName);
            
            if (!selected) {
                return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" fill="white">?</text></svg>`;
            }

            let divisionOpacity = 0.4;
            if (rankName.includes('II')) divisionOpacity = 0.7;
            if (rankName.includes('I')) divisionOpacity = 1.0;

            const icons = {
                'Novice': `<path d="M35 50H65M50 35V65" stroke-width="6"/>`,
                'Rookie': `<path d="M68 32C68 32 56 41 50 53C44 65 32 68 32 68" stroke-width="5" fill="none"/><path d="M41 24L68 32L60 41" stroke-width="4" fill="${selected.main}"/>`,
                'Disciple': `<path d="M28 75V31.8C28 29.7 29.7 28 31.8 28H68.2C70.3 28 72 29.7 72 31.8V75" stroke-width="4" fill="${selected.main}"/><path d="M50 48L58 58L50 68" stroke-width="3"/><path d="M42 48L34 58L42 68" stroke-width="3"/>`,
                'Forgeron': `<path d="M63,32,43.5,51.5,l-9-9L28,49,l9,9,6.5,6.5,19-19V32Z" fill="${selected.main}"/><path d="M37 32L63 58" stroke-width="5"/><path d="M63 32L37 58" stroke-width="5"/>`,
                'Vétéran': `<path d="M50 20L76 35V65L50 80L24 65V35L50 20Z" stroke-width="4" fill="${selected.main}"/><path d="M35 45L50 55L65 45" stroke-width="4"/><path d="M35 60L50 70L65 60" stroke-width="4"/>`,
                'Prodige': `<path d="M50 20V44L62 50L50 80V56L38 50L50 20Z" stroke-width="4" fill="${selected.main}"/>`,
                'Colosse': `<path d="M28 75L50 30L72 75H28Z" stroke-width="4" fill="${selected.main}"/><path d="M40 60L50 40L60 60H40Z" stroke-width="3" fill="${selected.accent}"/>`,
                'Demi-Dieu': `<path d="M24 68L50 80L76 68" stroke-width="3"/><path d="M24 50L50 62L76 50" stroke-width="3"/><path d="M24 32L50 44L76 32" stroke-width="3"/><path d="M50 20L24 32V68L50 80L76 68V32L50 20Z" stroke-width="4" fill="${selected.main}"/>`
            };
            const selectedIcon = icons[rankBaseName] || icons['Novice'];

            return `
                <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="${divisionOpacity}">
                        <defs>
                            <filter id="shadow-${rankBaseName}" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${selected.shadow}" flood-opacity="0.6"/>
                            </filter>
                        </defs>
                        <g filter="url(#shadow-${rankBaseName})">
                            <path d="M50 95C40.61 95 31.51 90.56 25.36 83.11L25 82.68V82.68L5.36 53.11C1.94 47.79 2.18 40.94 6.09 35.9L6.36 35.54L25.36 16.89C31.51 9.44 40.61 5 50 5C59.39 5 68.49 9.44 74.64 16.89L75 17.32V17.32L94.64 46.89C98.06 52.21 97.82 59.06 93.91 64.1L93.64 64.46L74.64 83.11C68.49 90.56 59.39 95 50 95Z" fill="${selected.main}"/>
                            <path d="M50 95C40.61 95 31.51 90.56 25.36 83.11L25 82.68V82.68L5.36 53.11C1.94 47.79 2.18 40.94 6.09 35.9L6.36 35.54L25.36 16.89C31.51 9.44 40.61 5 50 5C59.39 5 68.49 9.44 74.64 16.89L75 17.32V17.32L94.64 46.89C98.06 52.21 97.82 59.06 93.91 64.1L93.64 64.46L74.64 83.11C68.49 90.56 59.39 95 50 95Z" stroke="${selected.accent}" stroke-width="2"/>
                            <g stroke="${selected.accent}" stroke-linecap="round" stroke-linejoin="round">
                                ${selectedIcon}
                            </g>
                        </g>
                    </g>
                </svg>
            `;
        }

        // --- DATA PERSISTENCE & BUSINESS LOGIC ---
        function saveWorkout() {
            const workoutName = document.getElementById('workout-name-input').value;
            if (!workoutName || !state.editingWorkout) return;
            state.editingWorkout.name = workoutName;

            const workoutIndex = state.workouts.findIndex(w => w.id === state.editingWorkout.id);
            if (workoutIndex > -1) {
                state.workouts[workoutIndex] = state.editingWorkout;
            } else {
                state.workouts.push(state.editingWorkout);
            }
            state.editingWorkout = null;
            navigate('Workouts');
        }

        function saveMeal() {
    const mealName = document.getElementById('meal-name-input').value;
    if (!mealName || !state.editingMeal) return;
    state.editingMeal.name = mealName;

    const totals = state.editingMeal.ingredients.reduce((acc, ing) => {
        acc.calories += ing.nutrition.calories;
        acc.protein += ing.nutrition.protein;
        acc.carbs += ing.nutrition.carbs;
        acc.fat += ing.nutrition.fat;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    state.editingMeal.nutrition = totals;

    const mealIndex = state.meals.findIndex(m => m.id === state.editingMeal.id);
    if (mealIndex > -1) {
        state.meals[mealIndex] = state.editingMeal;
    } else {
        state.meals.push(state.editingMeal);
    }
    
    // --- NOUVEAU : Déclencheurs des succès de nutrition ---
    updateAchievementProgress('meals_created', 1, 'increment');
    if (totals.protein >= 70) {
        updateAchievementProgress('protein_king', 1, 'increment');
    }
    state.editingMeal.ingredients.forEach(ing => {
        updateAchievementProgress('the_taster', ing.name, 'add_to_set');
    });
    // --- Fin des ajouts ---

    const isQuickAdd = state.editingMeal.isQuickAdd;
    state.editingMeal = null;

    if(isQuickAdd) navigate('Accueil');
    else navigate('Repas');
}

async function handleAutocompleteSearch(e) {
    const query = e.target.value;
    const resultsContainer = document.getElementById('autocomplete-results');

    if (autocompleteTimeout) clearTimeout(autocompleteTimeout);

    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }

    autocompleteTimeout = setTimeout(async () => {
        try {
            // Cette ligne est correcte
            const response = await fetch(`https://fitflow-api-j5yq.onrender.com/api/aliments/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();
            currentSearchResults = results;

            // --- PARTIE CORRIGÉE : Affichage des résultats ---
            resultsContainer.innerHTML = results.map((food, index) =>
                `<div class="p-3 hover:bg-violet-500 cursor-pointer" data-index="${index}">${food.name}</div>`
            ).join('');
            // --------------------------------------------------

        } catch (error) {
            console.error('Erreur lors de la recherche d\'aliments:', error);
            resultsContainer.innerHTML = '<div class="p-3 text-red-400">Erreur de connexion à l\'API.</div>';
        }
    }, 200);
}

        function addIngredientToMeal(foodItem, isQuickAdd = false) {
    const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center">
        <h2 class="text-xl font-bold mb-4">Quantité pour ${foodItem.name}</h2>
        <div class="relative">
            <input id="quantity-input" type="number" class="input-glass text-center" placeholder="Ex: 150">
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">grammes</span>
        </div>
        <div class="flex gap-4 mt-6">
            <button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button>
            <button id="confirm-quantity-btn" class="w-full btn-primary">Ajouter</button>
        </div>
    </div>`;

    showModal(modalContent, (modalWrapper) => {
        modalWrapper.querySelector('#confirm-quantity-btn').onclick = () => {
            const quantity = parseFloat(modalWrapper.querySelector('#quantity-input').value);
            if (!quantity || quantity <= 0) return;

            // NOUVELLE LOGIQUE POUR CALCULER LES NUTRIMENTS
            // Utilise directement les propriétés de l'objet retourné par l'API
            const nutrition = {
                calories: (foodItem.calories / 100) * quantity,
                protein: (foodItem.protein / 100) * quantity,
                carbs: (foodItem.carbs / 100) * quantity,
                fat: (foodItem.fat / 100) * quantity,
            };

            const newIngredient = {
                id: generateId(),
                name: foodItem.name,
                // Stocke l'ID unique si disponible pour de futures recherches API
                code: foodItem.code, 
                quantity,
                nutrition
            };

            if (isQuickAdd) {
                const newMeal = { id: generateId(), name: newIngredient.name, ingredients: [newIngredient], nutrition: newIngredient.nutrition, isQuickAdd: true };
                state.meals.push(newMeal);
                
                const now = new Date();
                const newEvent = { id: generateId(), date: formatDateToYYYYMMDD(now), refId: newMeal.id, title: newMeal.name, time: now.toTimeString().slice(0,5), type: 'meal', completed: false, validated: false };
                state.calendarEvents.push(newEvent);

                closeModal();
                render();
            } else if (state.editingMeal) {
                state.editingMeal.ingredients.push(newIngredient);
                closeModal();
                render(); 
            }
        };
    });
}
        
// Remplacez votre fonction startScanner existante par cette nouvelle version
// Remplacez votre fonction startScanner existante par celle-ci
async function startScanner(isQuickAdd = false) {
    const modalContent = `
        <div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center flex flex-col h-[80vh]">
            <h2 class="text-xl font-bold mb-4">Scanner un code-barres</h2>
            <p id="scan-status-message" class="text-gray-400 mb-4 h-12 flex items-center justify-center">
                Visez un code-barres...
            </p>
            <div id="interactive" class="flex-grow rounded-lg overflow-hidden"></div>
            <button id="close-scanner-btn" class="w-full mt-4 btn-primary">Annuler</button>
        </div>
    `;

    showModal(modalContent, (modalWrapper) => {
        const scannerContainer = modalWrapper.querySelector('#interactive');
        const statusMessageEl = modalWrapper.querySelector('#scan-status-message');

        const quaggaConfig = {
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerContainer,
                constraints: {
                    facingMode: "environment"
                }
            },
            decoder: {
                readers: ["ean_reader", "code_128_reader", "upc_reader", "upc_e_reader", "ean_8_reader"]
            }
        };

        Quagga.init(quaggaConfig, function (err) {
            if (err) {
                console.error("Erreur lors de l'initialisation de QuaggaJS:", err);
                showToast("Erreur de la caméra. Réessayez.", "error");
                closeModal();
                return;
            }
            Quagga.start();
        });

        Quagga.onProcessed(function(result) {
            const drawingCanvas = Quagga.canvas.dom.overlay;
            if (drawingCanvas) {
                const ctx = drawingCanvas.getContext('2d');
                ctx.clearRect(0, 0, parseInt(drawingCanvas.width), parseInt(drawingCanvas.height));
                if (result) {
                    if (result.boxes) {
                        result.boxes.filter(function (box) {
                            return box !== result.box;
                        }).forEach(function (box) {
                            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, ctx, { color: "green", lineWidth: 2 });
                        });
                    }
                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, { color: "#00F", lineWidth: 2 });
                    }
                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, ctx, { color: "red", lineWidth: 3 });
                    }
                }
            }
        });

        let lastCode = null;
        let detectionTimeout = null;

        Quagga.onDetected(async (data) => {
            const decodedCode = data.codeResult.code;

            if (decodedCode && decodedCode !== lastCode) {
                lastCode = decodedCode;
                statusMessageEl.textContent = `Code détecté : ${decodedCode}. Ne bougez plus !`;
                statusMessageEl.classList.add('text-yellow-400');
                statusMessageEl.classList.remove('text-gray-400');

                if (detectionTimeout) clearTimeout(detectionTimeout);
                detectionTimeout = setTimeout(async () => {
                    Quagga.stop();
                    closeModal();

                    try {
                        const response = await fetch(`https://fitflow-api-j5yq.onrender.com/api/aliments/barcode?code=${decodedCode}`);
                        const apiData = await response.json();

                        if (response.ok) {
                            addIngredientToMeal(apiData, isQuickAdd);
                            showToast("Produit trouvé !", "success");
                        } else {
                            showToast(apiData.error || "Produit non trouvé.", "error");
                        }
                    } catch (error) {
                        console.error('Erreur lors de la recherche du code-barres:', error);
                        showToast("Erreur de connexion à l'API.", "error");
                    }
                }, 1000); // Délai de 1s pour la confirmation du code-barres
            }
        });

        modalWrapper.querySelector('#close-scanner-btn').onclick = () => {
            Quagga.stop();
            closeModal();
            if (detectionTimeout) clearTimeout(detectionTimeout);
        };
    });
}

        function openQuickAddFood() {
            const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center">
                <h2 class="text-xl font-bold mb-6">Ajout Rapide</h2>
                <div class="space-y-4">
                     <button id="quick-add-search-btn" class="w-full btn-primary">
                        <i class="fa-solid fa-search mr-2"></i> Rechercher un aliment
                    </button>
                    <button id="quick-add-scan-btn" class="w-full btn-primary">
                        <i class="fa-solid fa-barcode mr-2"></i> Scanner un produit
                    </button>
                </div>
                 <button class="close-modal w-full mt-8 glass-card p-3 rounded-lg font-bold">Annuler</button>
            </div>`;

            showModal(modalContent, (modalWrapper) => {
                modalWrapper.querySelector('#quick-add-scan-btn').onclick = () => {
                    closeModal();
                    startScanner(true);
                };
                modalWrapper.querySelector('#quick-add-search-btn').onclick = () => {
                    const searchModalContent = `<div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[80vh] flex flex-col">
                        <header class="flex justify-between items-center mb-4 flex-shrink-0">
                            <h2 class="text-2xl font-bold">Ajout Rapide</h2>
                            <button class="close-modal w-8 h-8 rounded-full bg-white/10">&times;</button>
                        </header>
                        <div class="relative mb-4 flex-shrink-0">
                            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                            <input id="ingredient-search-input" type="text" placeholder="Rechercher..." class="input-glass pl-12 w-full">
                        </div>
                        <div id="autocomplete-results" class="flex-grow overflow-y-auto space-y-2 pr-2"></div>
                    </div>`;

                    showModal(searchModalContent, (searchModalWrapper) => {
                         searchModalWrapper.querySelector('#ingredient-search-input').addEventListener('input', handleAutocompleteSearch);
                         searchModalWrapper.querySelector('#autocomplete-results').addEventListener('click', (e) => {
                            const resultDiv = e.target.closest('[data-index]');
                            if(resultDiv) {
                                const foodItem = currentSearchResults[parseInt(resultDiv.dataset.index)];
                                if(foodItem) {
                                    addIngredientToMeal(foodItem, true);
                                }
                            }
                         });
                    });
                };
            });
        }

        function startWorkout(eventId) {
            const event = state.calendarEvents.find(e => e.id === eventId);
            if (!event) return;
            const workoutTemplate = state.workouts.find(w => w.id === event.refId);
            if (!workoutTemplate) return;

            // === VÉRIFICATION AJOUTÉE ===
            // Si la séance n'a pas d'exercices, on affiche une erreur et on arrête.
            if (!workoutTemplate.exercises || workoutTemplate.exercises.length === 0) {
                showToast("Impossible de lancer une séance vide !", "error");
                return;
            }
            // =============================

            const session = {
                eventId: eventId,
                workout: JSON.parse(JSON.stringify(workoutTemplate)),
                currentExerciseIndex: 0,
                currentSet: 1,
                isResting: false,
                restTime: 0,
                performance: workoutTemplate.exercises.map(ex => ({ exerciseId: ex.exerciseId, sets: [] })),
                sessionBestSets: {},
                startTime: Date.now(),
            };
            
            state.activeWorkoutSession = session;
            navigate('WorkoutPlayer', { eventId });
        }

        function startWorkoutFromTemplate(workoutId) {
            const workoutTemplate = state.workouts.find(w => w.id === workoutId);
            if (!workoutTemplate) return;

            // === VÉRIFICATION AJOUTÉE ===
            // On vérifie aussi ici pour une meilleure réactivité.
            if (!workoutTemplate.exercises || workoutTemplate.exercises.length === 0) {
                showToast("Impossible de lancer une séance vide !", "error");
                return;
            }
            // =============================

            // Crée un événement temporaire pour aujourd'hui
            const now = new Date();
            const tempEvent = {
                id: generateId(),
                date: formatDateToYYYYMMDD(now),
                refId: workoutId,
                title: workoutTemplate.name,
                time: now.toTimeString().slice(0, 5),
                type: 'workout',
                completed: false,
                isUnscheduled: true // Un drapeau pour identifier ces séances si besoin
            };
            state.calendarEvents.push(tempEvent);

            // Utilise la logique de lancement existante avec l'ID du nouvel événement
            startWorkout(tempEvent.id);
        }

        function finishSet() {
    if (!state.activeWorkoutSession) return;
    const session = state.activeWorkoutSession;
    const reps = parseInt(document.getElementById('reps-input').value) || 0;
    const weight = parseFloat(document.getElementById('weight-input').value) || 0;

    const set = { reps, weight };
    session.performance[session.currentExerciseIndex].sets.push(set);
    
    const exercise = getExerciseById(session.performance[session.currentExerciseIndex].exerciseId);
    
    const params = { type: exercise.type, coefficient: exercise.coefficient, pdcPercent: exercise.pdcPercent };
    const score = calculatePerformanceScore({ ...params, charge: set.weight, reps: set.reps, poidsDuCorps: state.userGoals.bodyWeight });
    
    const currentBestSet = session.sessionBestSets[exercise.id] || {score: 0};
    if(score > currentBestSet.score) {
        session.sessionBestSets[exercise.id] = { ...set, score };
    }

    const currentExercisePlan = session.workout.exercises[session.currentExerciseIndex];

    // AJOUT : Vérifie si c'est la dernière série du dernier exercice
    const isLastExercise = session.currentExerciseIndex === session.workout.exercises.length - 1;
    const isLastSetOfExercise = session.currentSet === currentExercisePlan.sets;

    if (isLastExercise && isLastSetOfExercise) {
        // C'est la toute fin, on termine la séance immédiatement.
        finishWorkout();
        return; // On arrête la fonction ici pour ne pas lancer le timer.
    }
    // FIN DE L'AJOUT

    // Le code ci-dessous ne s'exécute que si ce n'est PAS la dernière série.
    session.isResting = true;
    session.restTime = currentExercisePlan.rest;

    if (playerTimer) clearInterval(playerTimer);
    playerTimer = setInterval(() => {
        session.restTime--;
        
        const restTimerElement = document.getElementById('rest-timer-display');
        if(restTimerElement) {
           restTimerElement.textContent = formatDuration(session.restTime * 1000);
        }

        if (session.restTime <= 0) {
            clearInterval(playerTimer);
            playerTimer = null;
            nextPlayerStep();
        }
    }, 1000);
    
    render();
}

        function nextPlayerStep() {
            if (!state.activeWorkoutSession) return;
            if(playerTimer) clearInterval(playerTimer);
            playerTimer = null;

            const session = state.activeWorkoutSession;
            const currentExercisePlan = session.workout.exercises[session.currentExerciseIndex];

            session.isResting = false;
            
            if (session.currentSet < currentExercisePlan.sets) {
                session.currentSet++;
            } else {
                if (session.currentExerciseIndex < session.workout.exercises.length - 1) {
                    session.currentExerciseIndex++;
                    session.currentSet = 1;
                } else {
                    finishWorkout();
                    return; 
                }
            }
            render();
        }

        // REMPLACEZ votre fonction finishWorkout existante par celle-ci
function finishWorkout() {
    const session = state.activeWorkoutSession;
    if (!session) return;

    if (playerTimer) clearInterval(playerTimer);
    if (sessionDurationTimer) clearInterval(sessionDurationTimer);
    playerTimer = null;
    sessionDurationTimer = null;

    const durationMs = Date.now() - session.startTime;
    const bodyWeight = state.userGoals.bodyWeight;
    
    let newPrCount = 0;
    let totalVolume = 0;
    let totalReps = 0;
    let totalSets = 0;

    // ÉTAPE 1 : Analyser les performances et trouver les records
    const processedPerformance = session.performance.map(perf => {
        const exercise = getExerciseById(perf.exerciseId);
        if (!perf.sets || perf.sets.length === 0) {
            return { ...perf, bestSet: null, bestScoreInSession: 0, isNewPr: false };
        }

        totalSets += perf.sets.length;
        perf.sets.forEach(set => {
            totalVolume += (set.weight || 0) * (set.reps || 0);
            totalReps += (set.reps || 0);
        });
        
        const params = { type: exercise.type, poidsDuCorps: bodyWeight, coefficient: exercise.coefficient, pdcPercent: exercise.pdcPercent };

        // **CORRECTION PRINCIPALE : Calcul de la meilleure série de la séance**
        const bestSetInSession = perf.sets.reduce((best, current) => {
            const bestScore = calculatePerformanceScore({ ...params, charge: best.weight, reps: best.reps });
            const currentScore = calculatePerformanceScore({ ...params, charge: current.weight, reps: current.reps });
            return currentScore > bestScore ? current : best;
        });
        const bestScoreInSession = calculatePerformanceScore({ ...params, charge: bestSetInSession.weight, reps: bestSetInSession.reps });

        // Vérification du nouveau record (PR)
        const currentStats = state.exerciseStats[perf.exerciseId] || { rankPr: { score: 0 }, allTimeBest: null };
        const isNewPr = bestScoreInSession > (currentStats.rankPr.score || 0);

        if (isNewPr) {
            newPrCount++;
            // Mettre à jour les stats de l'exercice avec le nouveau record
            state.exerciseStats[perf.exerciseId] = {
                ...currentStats,
                rankPr: {
                    score: bestScoreInSession,
                    bestSet: bestSetInSession,
                    dateAchieved: new Date().toISOString(),
                    bodyWeightAtPR: bodyWeight
                }
            };
        }
        
        // Mise à jour de la meilleure performance brute (sans ratio poids de corps)
        const currentAllTimeBestSet = currentStats.allTimeBest?.bestSet || { weight: 0, reps: 0 };
        const absoluteScoreCurrent = calculateAbsolutePerformance({ ...params, charge: currentAllTimeBestSet.weight, reps: currentAllTimeBestSet.reps });
        const absoluteScoreNew = calculateAbsolutePerformance({ ...params, charge: bestSetInSession.weight, reps: bestSetInSession.reps });

        if(absoluteScoreNew > absoluteScoreCurrent) {
            state.exerciseStats[perf.exerciseId].allTimeBest = {
                bestSet: bestSetInSession,
                date: new Date().toISOString()
            };
        }

        // Logique pour les succès spécifiques
        if (bestScoreInSession > 9000) updateAchievementProgress('over_9000', bestScoreInSession, 'max');
        const rmValues = calculate1RM(bestSetInSession, exercise);
        if (exercise.id === 'ex001') updateAchievementProgress('bench_press_club', rmValues.total1RM, 'max');
        if (exercise.id === 'ex035') updateAchievementProgress('squat_club', rmValues.total1RM, 'max');
        if (exercise.id === 'ex021') updateAchievementProgress('deadlift_club', rmValues.total1RM, 'max');
        
        return { 
            ...perf, 
            bestSet: bestSetInSession, 
            bestScoreInSession, 
            isNewPr 
        };
    });
    
    // ÉTAPE 2 : Mettre à jour les succès globaux
    updateAchievementProgress('total_volume', totalVolume, 'increment');
    updateAchievementProgress('single_session_volume', totalVolume, 'max');
    updateAchievementProgress('total_reps', totalReps, 'increment');
    updateAchievementProgress('total_sets', totalSets, 'increment');
    updateAchievementProgress('total_sessions_completed', 1, 'increment');
    updateAchievementProgress('total_training_time', Math.round(durationMs / 3600000), 'increment'); // en heures
    if (newPrCount > 0) updateAchievementProgress('pr_breaker', newPrCount, 'increment');
    
    // ÉTAPE 3 : Sauvegarder le rapport de session
    const sessionReport = {
        sessionId: generateId(),
        workoutId: session.workout.id,
        date: new Date().toISOString(),
        duration: durationMs,
        performance: processedPerformance
    };
    state.sessionHistory.push(sessionReport);

    // ÉTAPE 4 : Nettoyer et naviguer
    const event = state.calendarEvents.find(e => e.id === session.eventId);
    if (event) event.completed = true;
    
    updateStreaks();
    state.activeWorkoutSession = null;
    navigate('WorkoutSummary', { sessionId: sessionReport.sessionId });
}

        // --- CORE APP LOGIC ---
        const pageContainer = document.getElementById('page-container');
        const navContainer = document.getElementById('bottom-nav-container');
        const modalContainer = document.getElementById('global-modal-container');

        function setState(newState) {
            Object.assign(state, newState);
            render();
        }
        
        function navigate(page, params = {}) {
            // Store current scroll position before navigating away if it's the shop page
            if (state.activePage === 'Shop') {
                const shopContent = document.querySelector('.shop-content-scroll-area'); // Target the scrollable area
                if (shopContent) {
                    state.shop.scrollPosition = shopContent.scrollTop;
                }
            }

            // If navigating TO Profil, create a temporary copy
            if (page === 'Profil') {
        state.tempUserProfile = JSON.parse(JSON.stringify(state.userProfile));
    } 
    // Si on QUITTE la page de Profil, on supprime cette copie pour annuler les changements non sauvegardés
    else if (state.activePage === 'Profil' && page !== 'Profil') {
        state.tempUserProfile = null;
    }
    setState({ activePage: page, currentPageParams: params });
}

        // --- TEMPLATES & RENDERING ---
        function render() {
            const pagesWithoutNav = ['WorkoutEditor', 'MealEditor', 'WorkoutPlayer', 'WorkoutSummary'];
            navContainer.style.display = pagesWithoutNav.includes(state.activePage) ? 'none' : 'block';

            // Store current scroll position BEFORE updating innerHTML
            let currentScrollTop = 0;
            const scrollableElement = document.querySelector('.shop-content-scroll-area'); // Target the scrollable area
            if (state.activePage === 'Shop' && scrollableElement) {
                currentScrollTop = scrollableElement.scrollTop;
            }

            const template = templates[state.activePage] || templates.Accueil;
            pageContainer.innerHTML = template(state.currentPageParams);
            navContainer.innerHTML = templates.BottomNav();

            // Restore scroll position for shop AFTER render and small delay
            if (state.activePage === 'Shop' && scrollableElement) { // Check if scrollableElement exists again (might be recreated)
                 setTimeout(() => {
                    const newScrollableElement = document.querySelector('.shop-content-scroll-area'); // Re-query the element
                    if (newScrollableElement && currentScrollTop > 0) {
                        newScrollableElement.scrollTop = currentScrollTop;
                    }
                }, 10); // A very small delay to allow DOM to settle
            }

            if (sessionDurationTimer) {
                clearInterval(sessionDurationTimer);
                sessionDurationTimer = null;
            }
            if (state.activePage === 'WorkoutPlayer' && state.activeWorkoutSession) {
                sessionDurationTimer = setInterval(() => {
                    const timerEl = document.getElementById('session-duration-display');
                    if (timerEl && state.activeWorkoutSession) {
                        timerEl.textContent = formatDuration(Date.now() - state.activeWorkoutSession.startTime);
                    } else {
                        clearInterval(sessionDurationTimer);
                        sessionDurationTimer = null;
                    }
                }, 1000);
            }

            if (state.activePage === 'Dashboard') {
                renderProgressionChart();
            }

            if (state.activePage === 'WorkoutSummary') {
                launchConfetti();
            } else if (state.activePage === 'Calendrier') {
                setupCalendarDragAndDrop();
            }

            if (state.activePage === 'WorkoutEditor' && state.editingWorkout) {
                setupEditorDragAndDrop('exercise-list', state.editingWorkout.exercises);
            }
            if (state.activePage === 'MealEditor' && state.editingMeal) {
                setupEditorDragAndDrop('ingredient-list', state.editingMeal.ingredients);
            }

            addEventListeners();
        }

        function renderProgressionChart() {
            if (progressionChart) {
                progressionChart.destroy();
            }
            if (!state.selectedChartExerciseId) return;

            const canvas = document.getElementById('progression-chart');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const chartData = getChartDataForExercise(state.selectedChartExerciseId);

            progressionChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: '1RM Estimé (kg)',
                        data: chartData.data,
                        backgroundColor: 'rgba(167, 139, 250, 0.2)',
                        borderColor: 'rgba(167, 139, 250, 1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: 'rgba(167, 139, 250, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        // === MODIFICATION ICI : On formate l'infobulle ===
                        tooltip: {
                            callbacks: {
                                label: (context) => formatVolume(context.raw)
                            }
                        }
                    },
                    scales: {
                        y: { 
                            beginAtZero: false, 
                            // === MODIFICATION ICI : On formate les étiquettes de l'axe Y ===
                            ticks: { 
                                color: '#9CA3AF',
                                callback: (value) => formatVolume(value)
                            }, 
                            grid: { color: 'rgba(255,255,255,0.05)' } 
                        },
                        x: { ticks: { color: '#9CA3AF' }, grid: { display: false } }
                    }
                }
            });
        }

        function getDashboardStats() {
            const totalSessions = state.sessionHistory.length;
            let totalVolume = 0;
            let totalTimeMs = 0;
            let totalReps = 0;

            state.sessionHistory.forEach(session => {
                totalTimeMs += session.duration || 0;
                if (session.performance) {
                    session.performance.forEach(perf => {
                        if (perf.sets) {
                            perf.sets.forEach(set => {
                                totalVolume += (set.weight || 0) * (set.reps || 0);
                                totalReps += set.reps || 0;
                            });
                        }
                    });
                }
            });

            return {
                totalSessions,
                totalVolume: formatVolume(totalVolume), // Utilise la nouvelle fonction
    totalTime: formatDuration(totalTimeMs),
                totalReps,
            };
        }

        function filterSessionsByPeriod(period) {
            if (period === 'all') return state.sessionHistory;
            
            const now = new Date();
            const cutoffDate = new Date();

            if (period === '7d') cutoffDate.setDate(now.getDate() - 7);
            else if (period === '30d') cutoffDate.setDate(now.getDate() - 30);
            else if (period === '365d') cutoffDate.setFullYear(now.getFullYear() - 1);
            
            return state.sessionHistory.filter(s => new Date(s.date) >= cutoffDate);
        }

        function getVolumeDetails(period) {
            const sessions = filterSessionsByPeriod(period);
            
            // Initialise tous les groupes musculaires à 0
            const volumeByGroup = Object.keys(MUSCLE_GROUPS).reduce((acc, group) => {
                acc[group] = 0;
                return acc;
            }, {});

            sessions.forEach(session => {
                session.performance.forEach(perf => {
                    const exo = getExerciseById(perf.exerciseId);
                    const exoVolume = perf.sets.reduce((sum, set) => sum + ((set.weight || 0) * (set.reps || 0)), 0);
                    
                    if (exo && typeof exo.groups === 'object' && exo.groups !== null) {
                        // Distribue le volume en fonction des coefficients
                        for (const [group, coefficient] of Object.entries(exo.groups)) {
                            if (volumeByGroup.hasOwnProperty(group)) {
                                volumeByGroup[group] += exoVolume * coefficient;
                            }
                        }
                    }
                });
            });
            // Trie les groupes par volume décroissant
            return Object.entries(volumeByGroup).sort(([,a],[,b]) => b-a);
        }

        function getTimeDetails(period) {
            const sessions = filterSessionsByPeriod(period);
            if (sessions.length === 0) return { total: '0s', avg: '0s', longest: '0s' };
            
            const totalMs = sessions.reduce((sum, s) => sum + s.duration, 0);
            const longestMs = Math.max(...sessions.map(s => s.duration));

            return {
                total: formatDuration(totalMs),
                avg: formatDuration(totalMs / sessions.length),
                longest: formatDuration(longestMs)
            };
        }

        function getSessionDetails(period) {
            const sessions = filterSessionsByPeriod(period);
            if (sessions.length === 0) return { total: 0, avgPerWeek: '0.0', mostFrequent: 'N/A' };

            let avgPerWeek;
            if (sessions.length < 2) {
                // Avec 1 seule séance, la fréquence est de 1 sur la plus petite période (1 semaine)
                avgPerWeek = 1;
            } else {
                // Trie pour trouver la première et dernière date de la période
                const sortedSessions = sessions.sort((a,b) => new Date(a.date) - new Date(b.date));
                const firstDate = new Date(sortedSessions[0].date);
                const lastDate = new Date(sortedSessions[sortedSessions.length - 1].date);
                // Calcule le nombre de jours entre la première et la dernière séance
                const daysInPeriod = Math.max(1, (lastDate - firstDate) / (1000 * 60 * 60 * 24));
                // Calcule la moyenne sur le nombre de semaines réelles d'activité
                avgPerWeek = sessions.length / (daysInPeriod / 7);
            }

            const workoutCounts = sessions.reduce((acc, session) => { /* ... (inchangé) ... */ });
            const mostFrequent = Object.keys(workoutCounts).reduce((a, b) => workoutCounts[a] > workoutCounts[b] ? a : b, 'N/A');

            return {
                total: sessions.length,
                avgPerWeek: avgPerWeek.toFixed(1),
                mostFrequent
            };
        }

function calculate1RM(set, exercise) {
            // Retourne 0 si les données sont invalides
            if (!set || !exercise) return { total1RM: 0, lest1RM: 0 };
            
            const weight = set.weight || 0; // Poids du lest
            const reps = set.reps || 0;

            if (reps === 0) return { total1RM: 0, lest1RM: 0 };

            let effectiveLoad = 0;
            let bodyWeightComponent = 0;

            if (exercise.type === 'weighted') {
                effectiveLoad = weight;
            } else if (exercise.type === 'bodyweight') {
                // Calcule la part du poids de corps
                bodyWeightComponent = state.userGoals.bodyWeight * (exercise.pdcPercent || 0);
                // La charge effective est le poids du corps + le lest
                effectiveLoad = bodyWeightComponent + weight;
            } else {
                // Pas de 1RM pour les exercices au temps
                return { total1RM: 0, lest1RM: 0 };
            }
            
            // On calcule le 1RM total avec la formule d'Epley
            const total1RM = effectiveLoad * (1 + (reps / 30));
            // Le 1RM du lest est simplement le 1RM total moins la part du poids de corps
            const lest1RM = total1RM - bodyWeightComponent;

            // Retourne un objet avec les deux valeurs
            return { total1RM, lest1RM };
        }

        function getChartDataForExercise(exerciseId) {
            const labels = [];
            const data = [];
            
            const relevantSessions = state.sessionHistory
                .filter(session => session.performance.some(p => p.exerciseId === exerciseId))
                .sort((a,b) => new Date(a.date) - new Date(b.date));

            if (relevantSessions.length === 0) return { labels, data };

            const firstDate = new Date(relevantSessions[0].date);
            const lastDate = new Date(relevantSessions[relevantSessions.length - 1].date);
            const timeSpanDays = (lastDate - firstDate) / (1000 * 60 * 60 * 24);

            let dateFormatOptions = {};
            // Moins de 3 mois : Jour et Mois (ex: 30 juil.)
            if (timeSpanDays < 90) { 
                dateFormatOptions = { day: 'numeric', month: 'short' };
            // Moins de 2 ans : Mois et Année (ex: juil. '25)
            } else if (timeSpanDays < 730) {
                dateFormatOptions = { month: 'short', year: '2-digit' };
            // Plus de 2 ans : Année seule (ex: 2025)
            } else {
                dateFormatOptions = { year: 'numeric' };
            }
            
            relevantSessions.forEach(session => {
                const perf = session.performance.find(p => p.exerciseId === exerciseId);
                if (perf && perf.bestSet) {
                    const rmValues = calculate1RM(perf.bestSet, getExerciseById(exerciseId));
                    if(rmValues.total1RM > 0) {
                        labels.push(new Date(session.date).toLocaleDateString('fr-FR', dateFormatOptions));
                        data.push(rmValues.total1RM.toFixed(1));
                    }
                }
            });
            return { labels, data };
        }

        function getAdvancedInsights() {
            if (state.sessionHistory.length < 3) return { bestDay: 'N/A', mostTrainedGroup: 'N/A' };

            const dayCounts = [0,0,0,0,0,0,0];
            const groupCounts = {};

            state.sessionHistory.forEach(session => {
                let day = new Date(session.date).getDay() -1;
                if (day === -1) day = 6;
                dayCounts[day]++;

                session.performance.forEach(perf => {
                    const exo = getExerciseById(perf.exerciseId);
                    if (exo && typeof exo.groups === 'object') {
                        // On parcourt les clés (pecs, dos, etc.) de l'objet `groups`
                        Object.keys(exo.groups).forEach(group => {
                            groupCounts[group] = (groupCounts[group] || 0) + 1;
                        });
                    }
                });
            });
            
            const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            const bestDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
            const mostTrainedGroupKey = Object.keys(groupCounts).reduce((a, b) => groupCounts[a] > groupCounts[b] ? a : b, null);

            return {
                bestDay: dayNames[bestDayIndex],
                mostTrainedGroup: mostTrainedGroupKey ? MUSCLE_GROUPS[mostTrainedGroupKey] : 'N/A'
            }
        }

        function getWeeklyStats(weekOffset = 0) {
            const today = new Date();
            // Calcule le début de la semaine (Lundi) en fonction du décalage (0 pour cette semaine, 1 pour la semaine dernière)
            const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1; // Lundi=0, Dimanche=6
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - dayOfWeek - (weekOffset * 7));
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7);

            // Filtre les séances pour la semaine concernée
            const weeklySessions = state.sessionHistory.filter(session => {
                const sessionDate = new Date(session.date);
                return sessionDate >= startDate && sessionDate < endDate;
            });

            const sessionsCount = weeklySessions.length;
            const totalDurationMs = weeklySessions.reduce((sum, s) => sum + (s.duration || 0), 0);
            const totalHours = totalDurationMs / (1000 * 60 * 60);

            const totalVolume = weeklySessions.reduce((totalVol, session) => {
                const sessionVolume = session.performance.reduce((sessionVol, perf) => {
                    const exerciseVolume = perf.sets.reduce((vol, set) => vol + ((set.weight || 0) * (set.reps || 0)), 0);
                    return sessionVol + exerciseVolume;
                }, 0);
                return totalVol + sessionVolume;
            }, 0);

            return {
                sessions: sessionsCount,
                hours: totalHours,
                volume: totalVolume,
            };
        }

function renderCollectionList() {
    // ÉTAPE 1 : On filtre d'abord la base de données
    const filteredCollectibles = COLLECTIBLES_DATABASE.filter(item => {
        const isOwned = state.userProfile.inventory.collectibles.includes(item.id);
        // On garde l'objet s'il n'est PAS de rareté Créateur, OU s'il est de rareté Créateur ET que vous le possédez.
        return item.rarity !== 'Créateur' || isOwned;
    });

    // ÉTAPE 2 : On trie ensuite la liste filtrée
    const sortedCollectibles = [...filteredCollectibles].sort((a, b) => {
        const sortOrder = state.shop.collectiblesSortOrder || 'possession';
        const isOwnedA = state.userProfile.inventory.collectibles.includes(a.id);
        const isOwnedB = state.userProfile.inventory.collectibles.includes(b.id);
        
        if (sortOrder === 'possession') {
            if (isOwnedA && !isOwnedB) return -1;
            if (!isOwnedA && isOwnedB) return 1;
        }
        if (sortOrder === 'rarity_desc') {
            return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || a.name.localeCompare(b.name);
        }
        return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || a.name.localeCompare(b.name);
    });

    // Le reste de la fonction est inchangé
    return sortedCollectibles.map(item => {
        const isUnlocked = state.userProfile.inventory.collectibles.includes(item.id);
        return `
        <div class="glass-card p-3 rounded-xl flex items-center gap-4 transition-opacity ${isUnlocked ? 'opacity-100' : 'opacity-40'}" title="${item.name}">
            <div class="w-12 h-12 bg-black/20 rounded-full flex-shrink-0 flex items-center justify-center relative ${item.effect || ''}">
                <i class="fa-solid ${item.icon} text-2xl ${item.color} relative z-10"></i>
                ${!isUnlocked ? '<i class="fa-solid fa-lock text-xs text-gray-300 absolute bottom-1 right-1 bg-black/50 p-1 rounded-full z-20"></i>' : ''}
            </div>
            <div class="min-w-0">
                <p class="font-bold truncate ${'rarity-' + normalizeString(item.rarity) + '-text'}">${item.name}</p>
                <p class="text-sm text-gray-400">${item.rarity}</p>
            </div>
        </div>`
    }).join('');
}

        const templates = {
            Accueil: () => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const todayStr = formatDateToYYYYMMDD(today);
                
                const nextWorkoutEvent = state.calendarEvents.find(event => event.type === 'workout' && event.date === todayStr && !event.completed);
                let workoutTitle = 'Repos';
                let isTodayWorkout = !!nextWorkoutEvent;
                if (isTodayWorkout) {
                    workoutTitle = nextWorkoutEvent.title;
                } else {
                    const allTodayWorkouts = state.calendarEvents.filter(e => e.type === 'workout' && e.date === todayStr);
                    if (allTodayWorkouts.length > 0 && allTodayWorkouts.every(e => e.completed)) {
                        workoutTitle = "Séances terminées !";
                    }
                }

                const todaysMealsEvents = state.calendarEvents.filter(e => e.type === 'meal' && e.date === todayStr);
                const validatedMealsEvents = todaysMealsEvents.filter(e => e.validated);
                
                const consumedMacros = validatedMealsEvents.reduce((acc, event) => {
                    const meal = state.meals.find(m => m.id === event.refId);
                    if (meal) {
                        acc.calories += meal.nutrition.calories;
                        acc.protein += meal.nutrition.protein;
                    }
                    return acc;
                }, { calories: 0, protein: 0 });
                
                const potentialMacros = todaysMealsEvents.reduce((acc, event) => {
                     const meal = state.meals.find(m => m.id === event.refId);
                    if (meal) {
                        acc.calories += meal.nutrition.calories;
                        acc.protein += meal.nutrition.protein;
                    }
                    return acc;
                }, { calories: 0, protein: 0 });

                const upcomingWorkouts = state.calendarEvents.filter(event => event.type === 'workout' && new Date(event.date) >= today && !event.completed).sort((a,b) => new Date(a.date) - new Date(b.date));
                
                const weeklyStats = getWeeklyStats();

                return `
                <div class="p-6 pb-28 h-full flex flex-col">
                    <div class="absolute top-20 right-[-100px] w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-3xl -z-10"></div>
                    
                    <header class="pt-4 flex justify-between items-center flex-shrink-0">
                        <h1 class="text-3xl font-bold tracking-tighter">FitFlow</h1>
                        
                        <div class="flex-grow flex justify-center">
                             ${state.viewFilter === 'workout' ? `
                                <button data-action="open-streak-info" data-type="workout" class="flex items-center gap-2 text-center transition-transform hover:scale-110">
                                    <i class="fa-solid fa-fire-flame-curved text-2xl text-orange-400"></i>
                                    <span class="text-2xl font-bold">${state.streaks.workout.count}</span>
                                </button>
                                ` : `
                                <button data-action="open-streak-info" data-type="nutrition" class="flex items-center gap-2 ...">
    <i class="fa-solid fa-fire-flame-curved text-2xl text-green-400"></i>
    <span class="text-2xl font-bold">${state.streaks.nutrition.count}</span>
</button>
                                `
                            }
                        </div>

                        <div class="flex items-center gap-4">
                            <div class="toggle-switch w-28">
                                <div class="slider" style="transform: translateX(${state.viewFilter === 'workout' ? '0%' : '100%'});"></div>
                                <button data-filter="workout"><i class="fa-solid fa-dumbbell text-lg"></i></button>
                                <button data-filter="meal"><i class="fa-solid fa-utensils text-lg"></i></button>
                            </div>
                            <button data-navigate="Shop" class="text-gray-300 hover:text-white transition-colors">
            <i class="fa-solid fa-store text-xl"></i>
        </button>
                            <button data-navigate="Profil"><i class="fa-solid fa-user text-xl text-gray-300 cursor-pointer"></i></button>
                        </div>
                    </header>
                    
                    ${(state.viewFilter === 'workout' && state.streaks.workout.lastChance)
                        ? `<div class="text-center text-yellow-400 font-semibold animate-pulse -mt-2 mb-2 text-sm">Dernière chance !</div>`
                        : ''
                    }
                    
                    ${state.viewFilter === 'workout' ? `
                    <div class="flex-grow flex flex-col justify-between mt-4 space-y-4">
                        <div>
                            <p class="text-sm font-semibold text-gray-400 uppercase">SÉANCE DU JOUR</p>
                            <p class="text-4xl font-extrabold text-white leading-tight mt-1 truncate-ellipsis" title="${workoutTitle}">${truncateText(workoutTitle, 20)}</p>
                             <div class="text-left mt-2">
                                <button id="start-workout-btn" data-event-id="${nextWorkoutEvent?.id || ''}" class="text-violet-400 font-semibold text-lg group ${!isTodayWorkout ? 'opacity-30 cursor-not-allowed' : ''}">
                                    Démarrer <i class="fa-solid fa-arrow-right ml-1 transform transition-transform group-hover:translate-x-1"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-3">
                            <button data-action="open-stat-modal" data-stat-type="sessions" class="glass-card p-3 rounded-2xl text-center hover:bg-white/10 transition-colors">
                                <p class="text-lg font-bold whitespace-nowrap">${weeklyStats.sessions}</p>
                                <p class="text-xs text-gray-400">Séances/sem</p>
                            </button>
                            <button data-action="open-stat-modal" data-stat-type="volume" class="glass-card p-3 rounded-2xl text-center hover:bg-white/10 transition-colors">
                                <p class="text-lg font-bold whitespace-nowrap">${formatVolume(weeklyStats.volume)}</p>
                                <p class="text-xs text-gray-400">Volume/sem</p>
                            </button>
                            <button data-action="open-stat-modal" data-stat-type="hours" class="glass-card p-3 rounded-2xl text-center hover:bg-white/10 transition-colors">
                                <p class="text-lg font-bold whitespace-nowrap">${formatDuration(weeklyStats.hours * 3600000)}</p>
                                <p class="text-xs text-gray-400">Temps/sem</p>
                            </button>
                        </div>
                        
                         <div class="glass-card p-6 rounded-3xl flex flex-col flex-grow min-h-0">
                            <h2 class="text-lg font-bold mb-4 flex-shrink-0">Prochaines Séances</h2>
                            <div class="space-y-5 overflow-y-auto scrollbar-hide flex-grow">
                                ${upcomingWorkouts.length > 0 ? upcomingWorkouts.slice(0, 4).map(event => {
                                    const eventDate = new Date(event.date + 'T00:00:00');
                                    const fullDateString = eventDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                    let dayString = eventDate.toLocaleDateString('fr-FR', { weekday: 'long' });
                                    dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
                                    return `
                                    <div class="${event.completed ? 'opacity-50' : ''}">
                                        <p class="text-xs text-gray-400 italic mb-1">${fullDateString}</p>
                                        <div class="flex items-center gap-4">
                                            <i class="fa-solid fa-dumbbell text-red-400 w-5 text-center"></i>
                                            <p class="text-white font-semibold flex-grow truncate-ellipsis">${dayString} - ${event.title}</p>
                                            ${event.completed ? '<i class="fa-solid fa-check text-green-400"></i>' : ''}
                                        </div>
                                    </div>
                                    `
                                }).join('') : `<div class="h-full flex items-center justify-start pt-4"><p class="text-sm text-gray-500">Aucun entraînement à venir.</p></div>`}
                            </div>
                            ${upcomingWorkouts.length > 4 ? `<button data-navigate="Calendrier" class="w-full text-center pt-4 mt-auto border-t border-white/10 text-sm font-semibold text-gray-400 hover:text-white flex-shrink-0">Afficher plus de séances</button>` : ''}
                         </div>
                    </div>
                    ` : `
                    <div class="flex-grow flex flex-col justify-between mt-4 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="glass-card p-4 rounded-2xl">
        <p class="text-sm text-gray-400">Calories</p>
        <p class="text-2xl font-bold ${consumedMacros.calories >= state.userGoals.calories ? 'text-green-400' : ''}">${consumedMacros.calories.toFixed(0)} <span class="text-lg text-gray-400">/ ${state.userGoals.calories}</span></p>
        <p class="text-xs text-gray-500">Potentiel: ${potentialMacros.calories.toFixed(0)} kcal</p>
    </div>
     <div class="glass-card p-4 rounded-2xl">
        <p class="text-sm text-gray-400">Protéines</p>
        <p class="text-2xl font-bold ${consumedMacros.protein >= state.userGoals.protein ? 'text-green-400' : ''}">${consumedMacros.protein.toFixed(1)} <span class="text-lg text-gray-400">/ ${state.userGoals.protein}g</span></p>
        <p class="text-xs text-gray-500">Potentiel: ${potentialMacros.protein.toFixed(1)} g</p>
    </div>
                        </div>
                        <div class="glass-card p-6 rounded-3xl flex flex-col flex-grow min-h-0">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-lg font-bold flex-shrink-0">Repas du jour</h2>
                                <button id="quick-add-food-btn" class="text-green-400 font-semibold text-sm group">
                                    Ajout Rapide <i class="fa-solid fa-plus ml-1"></i>
                                </button>
                            </div>
                            <div class="space-y-3 overflow-y-auto scrollbar-hide flex-grow">
                                ${todaysMealsEvents.length > 0 ? todaysMealsEvents.sort((a,b) => a.time.localeCompare(b.time)).map(event => `
                                    <div class="flex items-center gap-3">
                                        <input type="checkbox" id="meal-check-${event.id}" data-event-id="${event.id}" class="meal-checkbox h-5 w-5 rounded bg-transparent border-2 border-gray-500 text-green-500 focus:ring-0" ${event.validated ? 'checked' : ''}>
                                        <label for="meal-check-${event.id}" class="text-white font-semibold ${event.validated ? 'line-through text-gray-500' : ''}">${event.title}</label>
                                    </div>
                                `).join('') : `<div class="h-full flex items-center justify-start pt-4"><p class="text-sm text-gray-500">Aucun repas planifié aujourd'hui.</p></div>`}
                            </div>
                        </div>
                    </div>
                    `}
                </div>`;
            },
            
            Dashboard: () => {
                const stats = getDashboardStats();
                const insights = getAdvancedInsights();
                const performedExercises = EXERCISE_DATABASE.filter(exo => state.exerciseStats[exo.id]);
                
                if (!state.selectedChartExerciseId && performedExercises.length > 0) {
                    state.selectedChartExerciseId = performedExercises[0].id;
                }
                
                const selectedExercise = getExerciseById(state.selectedChartExerciseId);
                const prStats = selectedExercise ? state.exerciseStats[selectedExercise.id] : null;
                const rmValues = prStats && prStats.allTimeBest ? calculate1RM(prStats.allTimeBest.bestSet, selectedExercise) : { total1RM: 0, lest1RM: 0 };

                return `
                <div class="p-6 pb-28">
                    <header class="pt-4 mb-6"><h1 class="text-3xl font-bold">Tableau de Bord</h1></header>

                    <div class="grid grid-cols-3 gap-3 mb-8">
                        <button data-action="open-sessions-details" class="glass-card p-3 rounded-xl text-center hover:bg-white/10 transition-colors">
                            <p class="text-xs text-gray-400">Séances</p>
                            <p class="text-2xl font-bold">${stats.totalSessions}</p>
                        </button>
                        <button data-action="open-time-details" class="glass-card p-3 rounded-xl text-center hover:bg-white/10 transition-colors">
                            <p class="text-xs text-gray-400">Temps Total</p>
                            <p class="text-xl font-bold">${stats.totalTime}</p>
                        </button>
                        <button data-action="open-volume-details" class="glass-card p-3 rounded-xl text-center hover:bg-white/10 transition-colors">
                            <p class="text-xs text-gray-400">Volume</p>
                            <p class="text-xl font-bold">${stats.totalVolume}</p>
                        </button>
                    </div>

                    <div class="glass-card p-4 rounded-2xl mb-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-bold">Analyse de Progression</h2>
                            <button data-action="open-dashboard-help" class="text-gray-500 hover:text-violet-400"><i class="fa-solid fa-circle-question text-xl"></i></button>
                        </div>
                        
                        <div class="relative custom-select-container mb-4">
                            <button id="exercise-select-button" class="custom-select-button">
                                <span class="font-semibold">${selectedExercise ? selectedExercise.name : 'Choisir un exercice'}</span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div id="exercise-select-options" class="custom-select-options">
                                ${performedExercises.length > 0 ? performedExercises.map(exo => `<div class="custom-select-option" data-value="${exo.id}">${exo.name}</div>`).join('') : '<div class="p-3 text-gray-500">Aucun exercice pratiqué</div>'}
                            </div>
                        </div>

                        <div class="h-56 mb-4"><canvas id="progression-chart"></canvas></div>
                        
                        ${selectedExercise && selectedExercise.type === 'bodyweight' ? `
                            <div class="grid grid-cols-2 gap-3 text-center">
                                <div><p class="text-sm font-semibold text-gray-400">1RM Lest Estimé</p><p class="text-3xl font-bold text-violet-400">${formatVolume(rmValues.lest1RM)}</p></div>
                                <div><p class="text-sm font-semibold text-gray-400">1RM Charge Totale</p><p class="text-lg font-bold">${formatVolume(rmValues.total1RM)}</p></div>
                            </div>
                        ` : `
                            <div class="text-center">
                                <p class="text-sm font-semibold text-gray-400">1-Rep Max (1RM) Estimé</p>
                                <p class="text-5xl font-bold text-violet-400">${formatVolume(rmValues.total1RM)}</p>
                            </div>
                        `}
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                         <div class="glass-card p-4 rounded-xl">
                             <p class="font-bold text-sm mb-2">⚡ Vos Insights</p>
                             <p class="text-xs text-gray-300">Jour fétiche : <span class="font-bold text-white">${insights.bestDay}</span></p>
                             <p class="text-xs text-gray-300">Focus sur : <span class="font-bold text-white">${insights.mostTrainedGroup}</span></p>
                         </div>
                         <button id="show-history-btn" class="glass-card p-4 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white/10">
                            <i class="fa-solid fa-clock-rotate-left text-2xl mb-2"></i>
                            <p class="font-bold text-sm">Historique complet</p>
                         </button>
                    </div>
                </div>
                `;
            },

 // --- REMPLACEZ COMPLÈTEMENT VOTRE FONCTION templates.Shop PAR CETTE VERSION CORRIGÉE ---

Shop: () => {
    const tabs = [
        { id: 'box', name: 'Box Surprise' },
        { id: 'borders', name: 'Bordures' },
        { id: 'titles', name: 'Titres' }
    ];

    const sortLabels = {
        'possession': 'Par possession',
        'rarity_asc': 'Rareté croissante',
        'rarity_desc': 'Rareté décroissante'
    };

    const renderShopContent = () => {
        switch (state.shop.activeTab) {
            case 'box':
                const unlockedCount = state.userProfile.inventory.collectibles.length;
                return `
                    <div class="p-6 pt-8 flex flex-col items-center justify-start flex-grow">
                        <i class="fa-solid fa-box-open text-8xl text-violet-400 animate-pulse"></i>
                        <h3 class="text-2xl font-bold mt-4">Box Surprise</h3>
                        <p class="text-gray-400 mt-2 mb-8 text-center max-w-xs">Contient un objet de collection aléatoire de rareté variable.</p>
                        <button id="buy-box-btn" class="btn-primary px-8 py-4 text-lg mb-12">Acheter pour 250 <i class="fa-solid fa-coins ml-2"></i></button>
                        <div class="w-full max-w-sm">
                            <div class="flex justify-between items-center mb-4">
                                <div>
                                    <h4 class="font-bold text-lg text-white">Collection</h4>
                                    <p class="text-sm text-gray-400 font-semibold">(${unlockedCount}/${COLLECTIBLES_DATABASE.length} débloqués)</p>
                                </div>
                                <div class="relative custom-select-container w-48">
            <button class="shop-sort-button custom-select-button !py-2 !text-sm" data-type="collectibles">
                <span>${sortLabels[state.shop.collectiblesSortOrder || 'possession']}</span>
                <i class="fa-solid fa-chevron-down text-gray-500"></i>
            </button>
            <div class="shop-sort-options custom-select-options">
                <div class="custom-select-option" data-type="collectibles" data-value="possession">${sortLabels['possession']}</div>
                <div class="custom-select-option" data-type="collectibles" data-value="rarity_asc">${sortLabels['rarity_asc']}</div>
                <div class="custom-select-option" data-type="collectibles" data-value="rarity_desc">${sortLabels['rarity_desc']}</div>
            </div>
        </div>
                            </div>
                            <div id="collection-list-container" class="flex flex-col space-y-3">${renderCollectionList()}</div>
                        </div>
                    </div>`;
            case 'borders':
                 const sortedBorders = [...BORDERS_DATABASE.filter(b => b.source !== 'achievement')].sort((a, b) => {
                    const sortOrder = state.shop.bordersSortOrder || 'possession';
                    const isOwnedA = state.userProfile.inventory.borders.includes(a.id);
                    const isOwnedB = state.userProfile.inventory.borders.includes(b.id);
                    if (sortOrder === 'possession') {
                        if (isOwnedA && !isOwnedB) return -1;
                        if (!isOwnedA && isOwnedB) return 1;
                    }
                    if (sortOrder === 'rarity_desc') {
                        return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || a.name.localeCompare(b.name);
                    }
                    return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || a.name.localeCompare(b.name);
                });

                return `
                    <div class="p-4">
                        <div class="relative custom-select-container w-full mb-4">
                            <button class="shop-sort-button custom-select-button" data-type="borders">
                                <span>${sortLabels[state.shop.bordersSortOrder || 'possession']}</span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div class="shop-sort-options custom-select-options">
                                <div class="custom-select-option" data-type="borders" data-value="possession">${sortLabels['possession']}</div>
                                <div class="custom-select-option" data-type="borders" data-value="rarity_asc">${sortLabels['rarity_asc']}</div>
                                <div class="custom-select-option" data-type="borders" data-value="rarity_desc">${sortLabels['rarity_desc']}</div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            ${sortedBorders.map(border => {
                                const isOwned = state.userProfile.inventory.borders.includes(border.id);
                                let buttonHtml = isOwned ? `<button class="w-full mt-3 glass-card text-sm py-2" disabled>Possédé</button>` : `<button data-item-id="${border.id}" class="buy-border-btn w-full mt-3 btn-primary text-sm py-2">${border.cost} <i class="fa-solid fa-coins"></i></button>`;
                                return `
                                <div class="glass-card p-3 rounded-xl text-center flex flex-col gap-1">
                                    <div class="w-20 h-20 rounded-full mx-auto mb-2 relative" style="${border.style}">
                                        <div class="w-full h-full rounded-full flex items-center justify-center" style="background-color: rgb(29, 31, 43);">
                                            <i class="fa-solid fa-user text-4xl text-gray-500"></i>
                                        </div>
                                    </div>
                                    <p class="font-bold flex-grow overflow-hidden whitespace-nowrap text-clip ${'rarity-' + normalizeString(border.rarity) + '-text'}" title="${border.name}">${border.name}</p>
                                    <p class="text-sm text-gray-400">${border.rarity}</p>
                                    ${buttonHtml}
                                </div>`;
                            }).join('')}
                        </div>
                    </div>`;
            case 'titles':
                const sortedTitles = [...TITLES_DATABASE.filter(t => t.source === 'shop')].sort((a, b) => {
                    const sortOrder = state.shop.titlesSortOrder || 'possession';
                    const isOwnedA = state.userProfile.inventory.titles.includes(a.id);
                    const isOwnedB = state.userProfile.inventory.titles.includes(b.id);
                    if (sortOrder === 'possession') {
                        if (isOwnedA && !isOwnedB) return -1;
                        if (!isOwnedA && isOwnedB) return 1;
                    }
                    if (sortOrder === 'rarity_desc') {
                        return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || a.name.localeCompare(b.name);
                    }
                    return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] || a.name.localeCompare(b.name);
                });

                return `
                    <div class="p-4">
                        <div class="relative custom-select-container w-full mb-4">
                            <button class="shop-sort-button custom-select-button" data-type="titles">
                                <span>${sortLabels[state.shop.titlesSortOrder || 'possession']}</span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div class="shop-sort-options custom-select-options">
                                <div class="custom-select-option" data-type="titles" data-value="possession">${sortLabels['possession']}</div>
                                <div class="custom-select-option" data-type="titles" data-value="rarity_asc">${sortLabels['rarity_asc']}</div>
                                <div class="custom-select-option" data-type="titles" data-value="rarity_desc">${sortLabels['rarity_desc']}</div>
                            </div>
                        </div>
                        <div class="space-y-3">
                            ${sortedTitles.map(title => {
                                const isOwned = state.userProfile.inventory.titles.includes(title.id);
                                let buttonHtml = isOwned ? `<button class="glass-card text-sm py-2 px-4" disabled>Possédé</button>` : `<button data-item-id="${title.id}" class="buy-title-btn btn-primary text-sm py-2 px-4">${title.cost} <i class="fa-solid fa-coins"></i></button>`;

                                // --- NOUVELLE LOGIQUE POUR LES TITRES SECRETS ---
                                let titleClass = '';
                                if (title.source === 'secret') {
                                    if (title.id === 't-gymbro-originel') titleClass = 'title-gymbro-originel';
                                    else if (title.id === 't-pompier-muscle' || title.id === 't-the-bench-monster') titleClass = 'title-pompier-muscle';
                                    else if (title.id === 't-createur-supreme') titleClass = 'title-createur-supreme';
                                    else titleClass = `rarity-${normalizeString(title.rarity)}-text`;
                                } else {
                                    titleClass = `rarity-${normalizeString(title.rarity)}-text`;
                                }
                                // --- FIN DE LA LOGIQUE ---

                                return `
                                <div class="glass-card p-4 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p class="font-bold ${titleClass}">${title.name}</p>
                                        <p class="text-sm text-gray-400">${title.rarity}</p>
                                    </div>
                                    ${buttonHtml}
                                </div>`;
                            }).join('')}
                        </div>
                    </div>`;
            default: return `<div class="p-8 text-center text-gray-500">Onglet à venir</div>`;
        }
    };

    return `
    <div class="h-full flex flex-col">
        <header class="p-6 flex justify-between items-center flex-shrink-0">
            <button data-navigate="Accueil" class="text-gray-300 hover:text-white"><i class="fa-solid fa-arrow-left text-xl"></i></button>
            <h1 class="text-3xl font-bold">Boutique</h1>
            <div class="glass-card px-4 py-2 rounded-full font-bold text-yellow-300">
                ${state.userProfile.coins.toLocaleString('fr-FR')} <i class="fa-solid fa-coins ml-1"></i>
            </div>
        </header>
        <nav class="flex justify-around border-b border-white/10 mx-6 flex-shrink-0">
            ${tabs.map(tab => `
                <button data-tab="${tab.id}" class="shop-tab-btn py-3 px-4 font-semibold ${state.shop.activeTab === tab.id ? 'text-violet-400 border-b-2 border-violet-400' : 'text-gray-400'}">
                    ${tab.name}
                </button>
            `).join('')}
        </nav>
        <div class="flex-grow overflow-y-auto scrollbar-hide shop-content-scroll-area">
            ${renderShopContent()}
        </div>
    </div>
    `;
},

            Workouts: () => {
                const sortOrderLabels = {
                    'alpha': 'Ordre Alphabétique', 'favorite': 'Favoris en premier',
                    'exo_asc': 'Moins d\'exercices', 'exo_desc': 'Plus d\'exercices'
                };
                const sortedWorkouts = [...state.workouts].sort((a, b) => {
                    switch (state.workoutsSortOrder) {
                        case 'favorite': return (b.isFavorite || 0) - (a.isFavorite || 0) || a.name.localeCompare(b.name);
                        case 'exo_asc': return a.exercises.length - b.exercises.length || a.name.localeCompare(b.name);
                        case 'exo_desc': return b.exercises.length - a.exercises.length || a.name.localeCompare(b.name);
                        default: return a.name.localeCompare(b.name);
                    }
                });

                return `
                    <div class="p-6 pb-28">
                        <header class="flex justify-between items-center pt-4 mb-4">
                            <h1 class="text-3xl font-bold">Séances</h1>
                            <button id="add-workout-btn" class="btn-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                                <i class="fa-solid fa-plus text-xl"></i>
                            </button>
                        </header>
                        <div class="relative custom-select-container mb-6">
                            <button id="workout-sort-button" class="custom-select-button font-semibold text-base">
                                <span>${sortOrderLabels[state.workoutsSortOrder]}</span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div id="workout-sort-options" class="custom-select-options">
                                <div class="custom-select-option" data-value="alpha">${sortOrderLabels['alpha']}</div>
                                <div class="custom-select-option" data-value="favorite">${sortOrderLabels['favorite']}</div>
                                <div class="custom-select-option" data-value="exo_asc">${sortOrderLabels['exo_asc']}</div>
                                <div class="custom-select-option" data-value="exo_desc">${sortOrderLabels['exo_desc']}</div>
                            </div>
                        </div>
                        ${sortedWorkouts.length > 0 ? `
                            <div class="space-y-4">
                                ${sortedWorkouts.map(workout => `
                                    <div class="glass-card p-4 rounded-2xl flex items-center gap-4">
                                        <button class="toggle-favorite-btn text-2xl z-10" data-id="${workout.id}">
                                            <i class="fa-solid fa-star transition-colors ${workout.isFavorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}"></i>
                                        </button>
                                        <div class="flex-grow min-w-0 cursor-pointer" data-navigate="WorkoutEditor" data-id="${workout.id}">
                                            <h2 class="text-lg font-semibold truncate-ellipsis">${workout.name}</h2>
                                            <p class="text-sm text-gray-400 mt-1">${workout.exercises.length} exercices</p>
                                            <div class="flex items-center gap-1.5 mt-1.5 flex-wrap min-h-6">
                                                ${(workout.tags && workout.tags.length > 0)
                                                    ? workout.tags.map(tagId => {
                                                        const tag = state.workoutTags.find(t => t.id === tagId);
                                                        if (!tag) return '';
                                                        return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background-color:${tag.color}20; color:${tag.color};">${tag.name}</span>`
                                                    }).join('')
                                                    : '<span class="text-sm text-gray-500">-</span>'
                                                }
                                            </div>
                                        </div>
                                        <button data-action="start-now" data-id="${workout.id}" class="btn-primary rounded-full w-11 h-11 flex-shrink-0 flex items-center justify-center">
                                            <i class="fa-solid fa-play ml-0.5"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `<div class="text-center py-16"><i class="fa-solid fa-folder-open text-5xl text-gray-600 mb-4"></i><p class="font-semibold text-lg">Aucune séance</p><p class="text-sm text-gray-500">Appuyez sur '+' pour en créer une.</p></div>`}
                    </div>
                `;
            },

            Repas: () => {
                const sortOrderLabels = {
                    'alpha': 'Ordre Alphabétique', 'favorite': 'Favoris en premier',
                    'cal_desc': 'Plus caloriques', 'cal_asc': 'Moins caloriques',
                    'prot_desc': 'Plus protéinés'
                };
                const sortedMeals = [...state.meals.filter(m => !m.isQuickAdd)].sort((a, b) => {
                    switch (state.mealsSortOrder) {
                        case 'favorite': return (b.isFavorite || 0) - (a.isFavorite || 0) || a.name.localeCompare(b.name);
                        case 'cal_desc': return b.nutrition.calories - a.nutrition.calories || a.name.localeCompare(b.name);
                        case 'cal_asc': return a.nutrition.calories - a.nutrition.calories || a.name.localeCompare(b.name);
                        case 'prot_desc': return b.nutrition.protein - a.nutrition.protein || a.name.localeCompare(b.name);
                        default: return a.name.localeCompare(b.name);
                    }
                });

                return `
                    <div class="p-6 pb-28">
                        <header class="flex justify-between items-center pt-4 mb-4">
                            <h1 class="text-3xl font-bold">Repas</h1>
                            <div class="flex items-center gap-3">
                                <button data-action="open-goals-modal" class="glass-card rounded-full w-12 h-12 flex items-center justify-center text-gray-300 hover:text-white">
                                    <i class="fa-solid fa-pencil text-lg"></i>
                                </button>
                                <button id="add-meal-btn" class="btn-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg" style="background-color: var(--meal-color);">
                                    <i class="fa-solid fa-plus text-xl"></i>
                                </button>
                            </div>
                        </header>
                        <div class="relative custom-select-container mb-6">
                            <button id="meal-sort-button" class="custom-select-button font-semibold text-base">
                                <span>${sortOrderLabels[state.mealsSortOrder]}</span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div id="meal-sort-options" class="custom-select-options">
                                <div class="custom-select-option" data-value="alpha">${sortOrderLabels['alpha']}</div>
                                <div class="custom-select-option" data-value="favorite">${sortOrderLabels['favorite']}</div>
                                <div class="custom-select-option" data-value="cal_desc">${sortOrderLabels['cal_desc']}</div>
                                <div class="custom-select-option" data-value="cal_asc">${sortOrderLabels['cal_asc']}</div>
                                <div class="custom-select-option" data-value="prot_desc">${sortOrderLabels['prot_desc']}</div>
                            </div>
                        </div>
                        ${sortedMeals.length > 0 ? `
                            <div class="space-y-4">
                                ${sortedMeals.map(meal => `
                                    <div class="glass-card p-4 rounded-2xl flex items-center gap-4">
                                        <button class="toggle-meal-favorite-btn text-2xl z-10" data-id="${meal.id}">
                                            <i class="fa-solid fa-star transition-colors ${meal.isFavorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}"></i>
                                        </button>
                                        <div class="flex-grow min-w-0 cursor-pointer" data-navigate="MealEditor" data-id="${meal.id}">
                                            <h2 class="text-lg font-semibold truncate-ellipsis">${meal.name}</h2>
                                            <p class="text-sm text-gray-400 mt-1">${meal.nutrition.calories.toFixed(0)} kcal | ${meal.nutrition.protein.toFixed(1)}g Prot.</p>
                                            <div class="flex items-center gap-1.5 mt-1.5 flex-wrap min-h-6">
                                                ${(meal.tags && meal.tags.length > 0)
                                                    ? meal.tags.map(tagId => {
                                                        const tag = state.mealTags.find(t => t.id === tagId);
                                                        if (!tag) return '';
                                                        return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background-color:${tag.color}20; color:${tag.color};">${tag.name}</span>`
                                                    }).join('')
                                                    : '<span class="text-sm text-gray-500">-</span>'
                                                }
                                            </div>
                                        </div>
                                        <i class="fa-solid fa-chevron-right text-gray-500"></i>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `<div class="text-center py-16"><i class="fa-solid fa-folder-open text-5xl text-gray-600 mb-4"></i><p class="font-semibold text-lg">Aucun repas</p><p class="text-sm text-gray-500">Appuyez sur '+' pour en créer un.</p></div>`}
                    </div>
                `;
            },

            WorkoutEditor: ({ id }) => {
                const workout = state.editingWorkout;
                if (!workout) return '';
                return `
                    <div id="editor-page" data-workout-id="${id}">
                        <header class="p-6 flex justify-between items-center sticky top-0 bg-black/30 backdrop-blur-md z-10">
                            <button id="cancel-workout-btn" class="text-gray-300 hover:text-white"><i class="fa-solid fa-xmark text-2xl"></i></button>
                            <div class="flex gap-3">
                                <button id="open-delete-confirmation-btn" class="glass-card rounded-full w-12 h-12 flex items-center justify-center text-red-400"><i class="fa-solid fa-trash-can text-lg"></i></button>
                                <button id="save-workout-btn" class="btn-primary text-sm px-5 py-2">Sauvegarder</button>
                            </div>
                        </header>
                        <div class="p-6">
                            <input id="workout-name-input" type="text" value="${workout.name}" class="text-4xl font-bold bg-transparent w-full focus:outline-none mb-2" />
                            <div class="flex items-center gap-2 mb-8 flex-wrap">
    ${(workout.tags || []).map(tagId => {
        const tag = state.workoutTags.find(t => t.id === tagId);
        if (!tag) return '';
        return `
        <div class="flex items-center text-sm font-semibold pl-3 pr-2 py-1 rounded-full" style="background-color:${tag.color}30;">
            <span style="color:${tag.color};">${tag.name}</span>
            <button class="remove-tag-btn ml-2 w-4 h-4 rounded-full bg-black/20 text-white/50 hover:bg-black/40 flex items-center justify-center" data-tag-id="${tag.id}">&times;</button>
        </div>`
    }).join('')}
    <button id="open-tag-selection-modal" data-type="workout" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-lg font-bold">+</button>
</div>
                            <div id="exercise-list" class="space-y-4 mb-8">
                                ${workout.exercises.map((ex) => `
                                    <div class="glass-card p-4 rounded-xl flex items-center justify-between draggable" draggable="true" data-id="${ex.id}">
    <div class="flex items-center gap-4 min-w-0">
        <i class="fa-solid fa-grip-vertical text-gray-500 cursor-grab"></i>
                <div class="flex-grow min-w-0">
                    <p class="font-semibold truncate-ellipsis">${getExerciseById(ex.exerciseId)?.name}</p>
                    <p class="text-sm text-gray-400">${ex.sets} sets, ${ex.reps} reps, ${ex.rest}s repos</p>
                </div>
            </div>
            <button class="edit-exercise-btn text-gray-400 ml-4"><i class="fa-solid fa-pencil"></i></button>
        </div>
    `).join('')}
</div>
                            <button id="open-add-exercise-modal" class="w-full glass-card hover:bg-white/10 p-4 rounded-xl flex items-center justify-center gap-3 font-semibold">
                                <i class="fa-solid fa-plus"></i> Ajouter un exercice
                            </button>
                        </div>
                    </div>
                `;
            },
            MealEditor: ({ id }) => {
                const meal = state.editingMeal;
                if (!meal) return '';
                
                const totals = meal.ingredients.reduce((acc, ing) => {
                    acc.calories += ing.nutrition.calories;
                    acc.protein += ing.nutrition.protein;
                    acc.carbs += ing.nutrition.carbs;
                    acc.fat += ing.nutrition.fat;
                    return acc;
                }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

                return `
                    <div id="meal-editor-page" data-meal-id="${id}">
                        <header class="p-6 flex justify-between items-center sticky top-0 bg-black/30 backdrop-blur-md z-10">
                            <button id="cancel-meal-btn" class="text-gray-300 hover:text-white"><i class="fa-solid fa-xmark text-2xl"></i></button>
                            <div class="flex gap-3">
                                <button id="open-delete-meal-confirmation-btn" class="glass-card rounded-full w-12 h-12 flex items-center justify-center text-red-400"><i class="fa-solid fa-trash-can text-lg"></i></button>
                                <button id="save-meal-btn" class="btn-primary text-sm px-5 py-2">Sauvegarder</button>
                            </div>
                        </header>
                        <div class="p-6">
                            <input id="meal-name-input" type="text" value="${meal.name}" class="text-4xl font-bold bg-transparent w-full focus:outline-none mb-2" />

<div class="flex items-center gap-2 mb-4 flex-wrap">
    ${(meal.tags || []).map(tagId => {
        const tag = state.mealTags.find(t => t.id === tagId);
        if (!tag) return '';
        return `
        <div class="flex items-center text-sm font-semibold pl-3 pr-2 py-1 rounded-full" style="background-color:${tag.color}30;">
            <span style="color:${tag.color};">${tag.name}</span>
            <button class="remove-tag-btn ml-2 w-4 h-4 rounded-full bg-black/20 text-white/50 hover:bg-black/40 flex items-center justify-center" data-tag-id="${tag.id}">&times;</button>
        </div>`
    }).join('')}
    <button id="open-tag-selection-modal" data-type="meal" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-lg font-bold">+</button>
</div>
                            
                            <div class="grid grid-cols-4 gap-2 text-center mb-6">
                                <div class="glass-card p-2 rounded-lg"><p class="font-bold">${totals.calories.toFixed(0)}</p><p class="text-xs text-gray-400">Kcal</p></div>
                                <div class="glass-card p-2 rounded-lg"><p class="font-bold">${totals.protein.toFixed(1)}g</p><p class="text-xs text-gray-400">Prot.</p></div>
                                <div class="glass-card p-2 rounded-lg"><p class="font-bold">${totals.carbs.toFixed(1)}g</p><p class="text-xs text-gray-400">Gluc.</p></div>
                                <div class="glass-card p-2 rounded-lg"><p class="font-bold">${totals.fat.toFixed(1)}g</p><p class="text-xs text-gray-400">Lip.</p></div>
                            </div>

                            <div id="ingredient-list" class="space-y-2 mb-4">
    ${meal.ingredients.map(ing => `
        <div class="glass-card p-3 rounded-lg flex justify-between items-center draggable" draggable="true" data-id="${ing.id}">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-grip-vertical text-gray-500 cursor-grab"></i>
                <span>${ing.quantity}g - ${ing.name}</span>
            </div>
            <div class="flex items-center gap-2">
                <button class="edit-ingredient-btn text-gray-400 hover:text-white" data-ing-id="${ing.id}"><i class="fa-solid fa-pencil"></i></button>
                <button class="delete-ingredient-btn text-red-400" data-ing-id="${ing.id}"><i class="fa-solid fa-times"></i></button>
            </div>
        </div>
    `).join('')}
</div>
                            
                            <div class="flex gap-2 items-center">
                                <div class="relative flex-grow">
                                    <input id="ingredient-search-input" type="text" class="input-glass" placeholder="Rechercher un aliment..." autocomplete="off">
                                    <div id="autocomplete-results" class="absolute bottom-full left-0 right-0 bg-[#3B315F] rounded-t-lg overflow-hidden z-20 mb-1 max-h-48 overflow-y-auto"></div>
                                </div>
                                <button id="scan-barcode-btn" class="btn-primary flex-shrink-0 w-12 h-12"><i class="fa-solid fa-barcode text-xl"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            },

            WorkoutPlayer: ({ eventId }) => {
                if (!state.activeWorkoutSession) return `<div class="p-6">Erreur: Aucune séance active.</div>`;

                const { workout, currentExerciseIndex, isResting, restTime, startTime, sessionBestSets } = state.activeWorkoutSession;
                const elapsedSessionTime = formatDuration(Date.now() - startTime);
                const currentExercisePlan = workout.exercises[currentExerciseIndex];
                const exerciseDetails = getExerciseById(currentExercisePlan.exerciseId);
                const allTimeBest = state.exerciseStats[exerciseDetails.id]?.allTimeBest;
                const allTimeBestSet = allTimeBest?.bestSet;
                const sessionBest = sessionBestSets[exerciseDetails.id];
                const sessionBestSet = sessionBest ? { weight: sessionBest.weight, reps: sessionBest.reps } : null;

                let bestSetToShow = allTimeBestSet;
                if (sessionBestSet) {
                    const params = { type: exerciseDetails.type, coefficient: exerciseDetails.coefficient, pdcPercent: exerciseDetails.pdcPercent };
                    const allTimeScore = allTimeBestSet ? calculateAbsolutePerformance({ ...params, charge: allTimeBestSet.weight, reps: allTimeBestSet.reps }) : 0;
                    const sessionScore = calculateAbsolutePerformance({ ...params, charge: sessionBestSet.weight, reps: sessionBestSet.reps });
                    if (sessionScore > allTimeScore) bestSetToShow = sessionBestSet;
                }
                
                let prText = 'Aucun record';
                if (bestSetToShow) prText = `${bestSetToShow.weight} kg x ${bestSetToShow.reps} reps`;

                const rankPrScore = state.exerciseStats[exerciseDetails.id]?.rankPr?.score || 0;
                const sessionPrScore = sessionBestSets[exerciseDetails.id]?.score || 0;
                const scoreForRank = Math.max(rankPrScore, sessionPrScore);
                const rankInfo = getRankFromScore(scoreForRank, exerciseDetails.id);
                let inputLabel = exerciseDetails.type.includes('bodyweight') ? 'Lest (kg)' : 'Charge (kg)';

                return `
                    <div class="p-6 h-full flex flex-col text-white bg-gradient-to-b from-[#23253A] to-[#1D1F2B] relative">
                         <div class="absolute top-6 right-24 text-lg font-mono font-semibold bg-black/20 px-3 py-1 rounded-lg">
                            <span id="session-duration-display">${elapsedSessionTime}</span>
                         </div>
                         <header class="flex justify-between items-center pt-4 mb-4 flex-shrink-0">
                            <h1 class="text-2xl font-bold truncate-ellipsis">${workout.name}</h1>
                            <div class="flex items-center gap-4">
                                <button id="view-session-recap" class="text-gray-300 hover:text-white"><i class="fa-solid fa-list-check text-xl"></i></button>
                                <button id="end-workout-btn" class="text-gray-300 hover:text-white"><i class="fa-solid fa-xmark text-2xl"></i></button>
                            </div>
                        </header>
                        <div class="flex-grow flex flex-col items-center justify-center text-center">
                            ${isResting ? `
                                <p class="text-2xl font-bold mb-2">Repos</p>
                                <p id="rest-timer-display" class="text-8xl font-thin tracking-tighter">${formatDuration(restTime * 1000)}</p>
                                <p class="text-lg text-gray-400 mt-4">Prochain: ${workout.exercises[currentExerciseIndex + 1] ? getExerciseById(workout.exercises[currentExerciseIndex + 1].exerciseId)?.name : 'Fin de la séance'}</p>
                                <div class="mt-8 flex gap-4"><button id="skip-rest-btn" class="bg-white/20 hover:bg-white/30 py-3 px-6 rounded-full font-bold">Passer</button></div>
                            ` : `
                                <p class="text-lg text-gray-400">Exercice ${currentExerciseIndex + 1} / ${workout.exercises.length}</p>
                                <p class="text-3xl font-bold my-2 text-center">${exerciseDetails.name}</p>
                                <p class="text-lg font-semibold" style="color: ${rankInfo.color.main};">${rankInfo.name}</p>
                                <p class="text-2xl text-gray-300 my-4">Série ${state.activeWorkoutSession.currentSet} / ${currentExercisePlan.sets}</p>
                                <div class="w-full max-w-xs space-y-3 mb-6">
                                    <div class="glass-card p-3 rounded-lg flex justify-between items-center text-sm">
                                        <span>Meilleure Perf:</span><span class="font-bold">${prText}</span>
                                    </div>
                                </div>
                                <div class="bg-white/5 p-6 rounded-2xl w-full max-w-xs">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label for="reps-input" class="text-sm text-gray-400">Répétitions</label>
                                            <input id="reps-input" type="text" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" class="input-glass text-center text-2xl font-bold mt-1" value="${currentExercisePlan.reps}">
                                        </div>
                                        <div>
                                            <label for="weight-input" class="text-sm text-gray-400">${inputLabel}</label>
                                            <div class="input-stepper-wrapper mt-1">
                                                <input id="weight-input" type="text" inputmode="decimal" onfocus="this.select()" onkeydown="if(event.key === '.' || event.key === ',') event.preventDefault();" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*?)\\..*/g, '$1')" class="input-glass text-center text-2xl font-bold pr-8" placeholder="0">
                                                <div class="input-stepper-arrows">
                                                    <button data-action="increment-weight"><i class="fa-solid fa-chevron-up text-xs"></i></button>
                                                    <button data-action="decrement-weight"><i class="fa-solid fa-chevron-down text-xs"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button id="finish-set-btn" class="mt-8 bg-green-500 hover:bg-green-400 py-4 w-full max-w-xs rounded-full font-bold text-xl">Série Terminée</button>
                            `}
                        </div>
                    </div>
                `;
            },

            Calendrier: () => {
                const displayDate = state.calendarDate;
                const month = displayDate.getMonth();
                const year = displayDate.getFullYear();
                const firstDayOfMonth = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const dayLabels = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

                let daysHtml = '';
                const paddingDays = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
                for(let i=0; i < paddingDays; i++) { daysHtml += `<div></div>`; }

                const today = new Date();
                today.setHours(0,0,0,0);

                for(let day=1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    date.setHours(0,0,0,0);
                    const dateStr = formatDateToYYYYMMDD(date);
                    const eventsOnDay = state.calendarEvents.filter(e => e.date === dateStr && e.type === state.viewFilter);
                    const isToday = date.getTime() === today.getTime();
                    const isPast = date < today;

                    daysHtml += `
                        <div class="calendar-day ${isPast ? 'past-day' : ''} text-center py-2 rounded-lg transition-colors ${eventsOnDay.length > 0 && !isPast ? 'cursor-pointer' : ''} ${isToday ? 'border-2 border-white/50' : 'border-t border-gray-700/50'}" data-date="${dateStr}">
        <span class="${isToday ? 'text-violet-300 font-bold rounded-full w-6 h-6 inline-flex items-center justify-center' : ''}">${day}</span>
        <div class="flex justify-center items-center gap-1 h-4 mt-1">
            ${eventsOnDay.map(e => {
                const color = e.type === 'workout' ? 'var(--workout-color)' : 'var(--meal-color)';
                return `<div class="event-dot w-1.5 h-1.5 rounded-full" style="background-color: ${color}"></div>`
            }).join('')}
        </div>
    </div>`;
                }
                
                const monthYearString = displayDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                const capitalizedMonthYear = monthYearString.charAt(0).toUpperCase() + monthYearString.slice(1);
                
                const plannerItems = state.viewFilter === 'workout' 
                    ? state.workouts.map(w => ({...w, itemType: 'workout'}))
                    : state.meals.filter(m => !m.isQuickAdd).map(m => ({...m, itemType: 'meal'}));

                return `
                    <div class="p-6 h-full flex flex-col pb-28">
                        <header class="pt-4 mb-4 flex justify-between items-center flex-shrink-0">
                            <h1 class="text-3xl font-bold">Planifier</h1>
                             <div class="toggle-switch w-28">
                                <div class="slider" style="transform: translateX(${state.viewFilter === 'workout' ? '0%' : '100%'});"></div>
                                <button data-filter="workout"><i class="fa-solid fa-dumbbell text-lg"></i></button>
                                <button data-filter="meal"><i class="fa-solid fa-utensils text-lg"></i></button>
                            </div>
                        </header>
                        
                        <div id="story-container-wrapper" class="h-32 flex-shrink-0 relative">
                             <div id="story-container" class="h-full flex items-center gap-3 overflow-x-auto scrollbar-hide pr-4" style="scroll-behavior: smooth;">
                                ${plannerItems.length > 0 ? plannerItems.map(item => {
                                    const icon = item.itemType === 'workout' ? 'fa-dumbbell' : 'fa-utensils';
                                    const tagId = item.tags && item.tags[0];
                                    const tagList = item.itemType === 'workout' ? state.workoutTags : state.mealTags;
                                    const tag = tagId ? tagList.find(t => t.id === tagId) : null;

                                    return `
                                    <div class="flex-shrink-0 w-48 glass-card p-3 rounded-xl flex items-center gap-3 draggable" draggable="true" data-item-id="${item.id}" data-item-type="${item.itemType}">
                                        <i class="fa-solid ${icon} text-2xl text-gray-400 w-8 text-center"></i>
                                        <div class="flex-grow min-w-0 h-10 flex flex-col justify-center">
                                            <p class="text-sm font-semibold truncate">${item.name}</p>
                                            ${tag ? 
                                                `<span class="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style="background-color:${tag.color}30; color:${tag.color};">${tag.name}</span>`
                                                : ''
                                            }
                                        </div>
                                    </div>
                                    `
                                }).join('') :  
                                `<div class="w-full text-center text-gray-500 text-sm flex items-center justify-center">
                                    <span>Aucun ${state.viewFilter === 'workout' ? 'modèle de séance' : 'repas'} créé.</span>
                                </div>`
                                }
                            </div>
                            <button id="scroll-story-left-btn" class="absolute left-2 top-0 z-10 w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-opacity opacity-0 pointer-events-none">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button id="scroll-story-right-btn" class="absolute right-2 top-0 z-10 w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-opacity opacity-0 pointer-events-none">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                        
                        <div class="flex-grow mt-2 flex flex-col">
                            <div class="flex justify-between items-center mb-4 flex-shrink-0">
                                <button id="prev-month-btn" class="glass-card w-10 h-10 rounded-full"><i class="fa-solid fa-chevron-left"></i></button>
                                <h2 class="text-xl font-bold text-center">${capitalizedMonthYear}</h2>
                                <button id="next-month-btn" class="glass-card w-10 h-10 rounded-full"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            <div class="grid grid-cols-7 text-center text-xs text-gray-400 mb-2 flex-shrink-0">${dayLabels.map(d => `<div>${d}</div>`).join('')}</div>
                            <div id="calendar-grid" class="grid grid-cols-7 bg-black/10 rounded-lg p-2 flex-grow">${daysHtml}</div>
                        </div>
                    </div>
                `;
            },
            
            Stats: () => {
                const { globalRank, globalRankColor } = calculateGlobalRank();
                return `
                <div class="p-6 pb-28">
                    <header class="flex justify-between items-center pt-4 mb-6">
                        <div class="flex items-center gap-3">
                            <h1 class="text-3xl font-bold">Mes Rangs</h1>
                            <button data-action="open-rank-info" class="text-gray-400 hover:text-white transition-colors">
                                <i class="fa-solid fa-circle-question text-2xl"></i>
                            </button>
                        </div>
                    </header>
                    
                    <div class="grid grid-cols-2 gap-4 mb-6">
                         <button data-action="open-global-rank-details" class="glass-card p-4 rounded-2xl text-center hover:bg-white/10 transition-colors">
                            <p class="text-sm font-semibold text-gray-400">Rank Global</p>
                            <p class="text-2xl font-bold" style="color: ${globalRankColor.main};">${globalRank}</p>
                        </button>
                        <div class="relative custom-select-container">
                            <button id="custom-select-button" class="custom-select-button font-semibold text-base h-full !rounded-2xl">
                                <span id="custom-select-value">${state.sortOrderLabels[state.statsSortOrder]}</span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div id="custom-select-options" class="custom-select-options">
                                <div class="custom-select-option" data-value="rank_desc">${state.sortOrderLabels['rank_desc']}</div>
                                <div class="custom-select-option" data-value="rank_asc">${state.sortOrderLabels['rank_asc']}</div>
                                <div class="custom-select-option" data-value="alpha">${state.sortOrderLabels['alpha']}</div>
                            </div>
                        </div>
                    </div>

                    <div id="stats-list-container" class="space-y-3">
                        ${renderStatsList()}
                    </div>
                </div>
                `;
            },

            // Remplacez la fonction templates.Profil
// Remplacez la fonction templates.Profil
Profil: () => {
    const profile = state.tempUserProfile || state.userProfile;
    const equipped = profile.equipped;
    
    const totalClaimable = getClaimableRewardsCount();

    const country = COUNTRY_LIST.find(c => c.name === profile.country) || { name: 'Sélectionner', code: '' };
    const equippedTitle = TITLES_DATABASE.find(t => t.id === equipped.title) || { name: 'Aucun titre', rarity: 'Commun' };
    const equippedBorder = BORDERS_DATABASE.find(b => b.id === equipped.border) || { style: '' };

    // --- LOGIQUE FINALE POUR DÉTERMINER LA CLASSE DU TITRE ---
    let titleClass = '';
    if (equippedTitle.source === 'secret') {
        if (equippedTitle.id === 't-gymbro-originel') {
            titleClass = 'title-gymbro-originel';
        } else if (equippedTitle.id === 't-pompier-muscle' || equippedTitle.id === 't-the-bench-monster') {
            titleClass = 'title-pompier-muscle';
        } else if (equippedTitle.id === 't-createur-supreme') {
            titleClass = 'title-createur-supreme';
        } else {
            // Fallback pour d'autres titres secrets
            titleClass = `rarity-${normalizeString(equippedTitle.rarity)}-text`;
        }
    } else {
        titleClass = `rarity-${normalizeString(equippedTitle.rarity)}-text`;
    }
    // --- FIN DE LA LOGIQUE ---

    return `
    <div class="p-6 pb-6">
        <header class="flex justify-between items-center pt-2 mb-6">
            <div class="flex items-center gap-4">
                <button data-action="cancel-profile-edit" class="text-gray-300 hover:text-white"><i class="fa-solid fa-arrow-left text-xl"></i></button>
                <h1 class="text-3xl font-bold">Mon Profil</h1>
                
                <button data-navigate="Achievements" class="relative text-gray-300 transition-colors">
                    <i class="fa-solid fa-trophy text-2xl text-yellow-400"></i>
                    ${totalClaimable > 0 ? `<span class="notification-badge">${totalClaimable}</span>` : ''}
                </button>
            </div>
            <button id="save-profile-btn" class="btn-primary !px-5 !py-2 !text-sm">Sauvegarder</button>
        </header>
        
        <div class="flex gap-4 mb-4 items-center">
            <div class="w-1/3 flex flex-col items-center text-center">
                <div class="relative w-24 h-24">
                    <div class="w-full h-full rounded-full" style="${equippedBorder.style}">
                        <div class="w-full h-full rounded-full flex items-center justify-center" style="background-color: rgb(29, 31, 43);">
                            <div id="profile-pic-container" class="w-full h-full rounded-full bg-black/20 flex items-center justify-center relative group cursor-pointer" style="background-image: url(${profile.profilePicUrl || ''}); background-size: cover; background-position: center;">
                                ${!profile.profilePicUrl ? '<i class="fa-solid fa-user text-4xl text-gray-500"></i>' : ''}
                                <div class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i class="fa-solid fa-camera text-xl text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button id="change-border-btn" class="absolute bottom-0 -right-1 w-8 h-8 bg-gray-800 border-2 border-gray-900 rounded-full flex items-center justify-center text-white hover:bg-violet-500 transition-colors">
                        <i class="fa-solid fa-border-all text-sm"></i>
                    </button>
                </div>
                <div class="mt-3 text-center">
                    <p class="text-sm text-gray-500 italic">#0000</p>
                </div>
                <input type="file" id="profile-pic-input" class="hidden" accept="image/*">
            </div>

            <div class="w-7/12 showcase-container ml-2">
                <div class="showcase-title-wrapper -mt-2 mb-4">
                    <p class="font-bold text-xl truncate ${titleClass}" title="${equippedTitle.name}">
                        ${equippedTitle.name}
                    </p>
                    <button id="equip-title-btn" class="text-gray-400 hover:text-white" title="Changer le titre">
                        <i class="fa-solid fa-pencil text-sm"></i>
                    </button>
                </div>
                <div class="grid grid-cols-3 gap-3 px-1">
                    ${equipped.showcase.map((itemId, index) => {
                        const item = COLLECTIBLES_DATABASE.find(c => c.id === itemId);
                        const rarityBorderClass = item ? `rarity-${normalizeString(item.rarity)}-border` : '';
                        
                        return `
                        <button data-action="equip-showcase" data-slot-index="${index}" class="showcase-item flex items-center justify-center ${rarityBorderClass}">
                            ${item ? 
                                `<i class="fa-solid ${item.icon} text-3xl ${item.color} relative z-20"></i>` 
                                : 
                                '<i class="fa-solid fa-plus text-2xl text-gray-600"></i>'
                            }
                        </button>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        
        <div>
            <div id="info-card" class="glass-card p-5 rounded-2xl mb-5">
                <h2 class="text-lg font-bold mb-4">Informations</h2>
                <div class="space-y-4">
                    <div>
                        <label for="profile-name" class="text-sm font-semibold text-gray-400">Nom d'utilisateur</label>
                        <input id="profile-name" type="text" class="input-glass mt-1" value="${profile.name || ''}" placeholder="Votre nom" maxlength="25">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="profile-dob" class="text-sm font-semibold text-gray-400">Naissance</label>
                            <input id="profile-dob" type="date" class="input-glass mt-1" value="${profile.dob || ''}">
                        </div>
                        <div id="sex-select-wrapper">
                            <label for="sex-select-button" class="text-sm font-semibold text-gray-400">Sexe</label>
                            <div class="relative custom-select-container mt-1">
                                <button id="sex-select-button" class="custom-select-button">
                                    <span>${profile.sex}</span>
                                    <i class="fa-solid fa-chevron-down text-gray-500"></i>
                                </button>
                                <div id="sex-select-options" class="custom-select-options">
                                    <div class="custom-select-option" data-value="Homme">Homme</div>
                                    <div class="custom-select-option" data-value="Femme">Femme</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="country-select-wrapper">
                        <label for="country-select-button" class="text-sm font-semibold text-gray-400">Pays</label>
                        <div class="relative custom-select-container mt-1">
                            <button id="country-select-button" class="custom-select-button">
                                <span class="flex items-center gap-3">
                                    ${country.code ? `<img src="https://flagcdn.com/${country.code}.svg" width="24" alt="${country.name}">` : '🏳️'}
                                    <span>${country.name}</span>
                                </span>
                                <i class="fa-solid fa-chevron-down text-gray-500"></i>
                            </button>
                            <div id="country-select-options" class="custom-select-options max-h-60 overflow-y-auto scrollbar-hide">
                                ${COUNTRY_LIST.map(c => `<div class="custom-select-option flex items-center gap-3" data-value="${c.name}"><img src="https://flagcdn.com/${c.code}.svg" width="24" alt="${c.name}"><span>${c.name}</span></div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="glass-card p-5 rounded-2xl bg-gradient-to-tr from-violet-900/40 to-transparent">
                <div class="flex justify-between items-center">
                    <label for="goal-bodyweight" class="text-lg font-bold">Poids Corporel (kg)</label>
                    <button id="weight-info-btn" class="text-gray-500 hover:text-violet-400 transition-colors">
                        <i class="fa-solid fa-circle-question text-xl"></i>
                    </button>
                </div>
                <input id="goal-bodyweight" type="number" step="0.1" class="input-glass text-2xl font-bold text-center mt-2 h-14" value="${state.userGoals.bodyWeight || ''}" placeholder="Ex: 75">
            </div>
        </div>
    </div>
    `;
},

// Remplacez ce modèle
Achievements: () => {
    // Labels pour notre menu déroulant
    const sortLabels = {
        'progress_desc': 'Plus avancés',
        'progress_asc': 'Moins avancés',
        'alpha': 'Alphabétique'
    };

    const userAchievements = state.userProfile.achievements;
    const globalProgress = calculateGlobalAchievementProgress();

    // Logique de tri (inchangée)
    const sortedAchievements = ACHIEVEMENTS_DATABASE
    .filter(ach => !ach.isHidden || state.userProfile.inventory.titles.includes('t-createur-supreme'))
    .sort((a, b) => {
        switch (state.achievementsSortOrder) {
            case 'progress_desc':
                return getAchievementProgressPercent(b) - getAchievementProgressPercent(a);
            case 'progress_asc':
                return getAchievementProgressPercent(a) - getAchievementProgressPercent(b);
            case 'alpha':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return `
    <div class="p-6 pb-32 flex flex-col">
        <header class="flex items-center justify-between pt-2 mb-4">
            <div class="flex items-center gap-3">
                <button data-navigate="Profil" class="text-gray-300 hover:text-white self-start pt-1">
                    <i class="fa-solid fa-arrow-left text-xl"></i>
                </button>
                <div>
                    <h1 class="text-3xl font-bold">Succès</h1>
                    <p class="text-sm text-gray-400 font-semibold">${globalProgress.fullyCompletedCount} sur ${globalProgress.total} terminés</p>
                </div>
            </div>
            <div class="w-1/2">
                <div class="flex justify-between items-center mb-1">
                    <p class="text-xs text-gray-400 font-semibold">Total</p>
                    <span class="font-sans text-xs text-gray-300">${globalProgress.percentage}%</span>
                </div>
                <div class="w-full bg-black/20 rounded-full h-2">
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style="width: ${globalProgress.percentage}%"></div>
                </div>
            </div>
        </header>

        <div class="relative custom-select-container w-full mb-6">
            <button class="shop-sort-button custom-select-button !py-2 !text-sm" data-type="achievements-sort">
                <span>${sortLabels[state.achievementsSortOrder]}</span>
                <i class="fa-solid fa-chevron-down text-gray-500"></i>
            </button>
            <div class="shop-sort-options custom-select-options">
                <div class="custom-select-option" data-type="achievements-sort" data-value="progress_desc">${sortLabels['progress_desc']}</div>
                <div class="custom-select-option" data-type="achievements-sort" data-value="progress_asc">${sortLabels['progress_asc']}</div>
                <div class="custom-select-option" data-type="achievements-sort" data-value="alpha">${sortLabels['alpha']}</div>
            </div>
        </div>
        
        <div class="space-y-3">
            ${sortedAchievements.map(ach => {
                const currentValue = userAchievements[ach.id]?.progress || 0;
                const claimableCount = getClaimableRewardsCount(ach.id);
                const progressPercent = getAchievementProgressPercent(ach);
                
                let currentTierIndex = -1;
                for (let i = ach.tiers.length - 1; i >= 0; i--) {
                    if (currentValue >= ach.tiers[i].goal) {
                        currentTierIndex = i;
                        break;
                    }
                }
                const isUnlocked = currentTierIndex > -1;
                const cardStyle = !isUnlocked ? 'filter: grayscale(1); opacity: 0.6;' : '';
                const hasRewardsClass = claimableCount > 0 ? 'has-rewards' : '';

                return `
                <button data-action="view-achievement" data-id="${ach.id}" class="achievement-card ${hasRewardsClass}" style="${cardStyle}">
                    <div class="achievement-icon-wrapper">
                        <i class="fa-solid ${ach.icon} text-2xl" style="color: ${ach.color};"></i>
                        ${!isUnlocked ? '<div class="lock-overlay"><i class="fa-solid fa-lock"></i></div>' : ''}
                    </div>
                    <div class="flex-grow min-w-0">
                        <h3 class="font-bold text-base leading-tight">${ach.name} ${isUnlocked ? `(Niv. ${currentTierIndex + 1})` : ''}</h3>
                        <div class="flex items-center gap-2 mt-2">
                            <div class="flex-grow bg-black/20 rounded-full h-1.5">
                                <div class="bg-yellow-400 h-1.5 rounded-full" style="width: ${progressPercent.toFixed(0)}%"></div>
                            </div>
                            <span class="text-xs font-sans text-gray-400 w-8 text-right">${progressPercent.toFixed(0)}%</span>
                        </div>
                    </div>
                    ${claimableCount > 0 ? `<span class="notification-badge">${claimableCount}</span>` : ''}
                </button>
                `
            }).join('')}
        </div>
    </div>
    `;
},
            
            WorkoutSummary: ({ sessionId }) => {
                const session = state.sessionHistory.find(s => s.sessionId === sessionId);
                if (!session) return `<div class="p-6 text-center">Erreur: Résumé de la séance introuvable.</div>`;

                const workout = state.workouts.find(w => w.id === session.workoutId);

                const volumeTotal = session.performance?.reduce((totalVolume, perf) => {
                    if (!perf || !perf.sets) return totalVolume;
                    const exerciseVolume = perf.sets.reduce((vol, set) => vol + ((set.weight || 0) * (set.reps || 0)), 0);
                    return totalVolume + exerciseVolume;
                }, 0) ?? 0;
                const nouveauxRecords = session.performance?.filter(p => p?.isNewPr).length ?? 0;
                const formattedDuration = formatDuration(session.duration);

                let summaryHtml = '';
                if (Array.isArray(session?.performance) && session.performance.length > 0) {
                    summaryHtml = session.performance.map((perf, index) => {
                        const exercise = getExerciseById(perf?.exerciseId);
                        const exerciseName = exercise?.name ?? 'Exercice Inconnu';

                        const rankInfo = getRankFromScore(perf?.bestScoreInSession ?? 0, perf?.exerciseId);
                        const rankName = rankInfo?.name ?? 'Non classé';
                        const rankColor = rankInfo?.color?.main ?? '#6B7280';

                        const weight = perf?.bestSet?.weight ?? 0;
                        const reps = perf?.bestSet?.reps ?? 0;

                        const isNewPr = perf?.isNewPr ?? false;

                        let setsHistoryHtml = '';
                        if (Array.isArray(perf?.sets) && perf.sets.length > 0) {
                            setsHistoryHtml = `
                                <div class="mt-4 pt-4 border-t border-white/10">
                                    <h4 class="font-semibold text-sm text-gray-300 mb-2">Historique des séries :</h4>
                                    <ul class="space-y-1 pl-1">
                                        ${perf.sets.map((set, setIndex) =>
                                            `<li class="text-gray-400 text-sm">Série ${setIndex + 1}: <span class="font-semibold text-gray-300">${set.weight ?? 0} kg × ${set.reps ?? 0} reps</span></li>`
                                        ).join('')}
                                    </ul>
                                </div>
                            `;
                        }

                        return `
                            <div class="summary-card glass-card p-4 rounded-xl" style="animation-delay: ${index * 150 + 400}ms; opacity: 0; animation: fadeInModal 0.5s forwards; animation-fill-mode: forwards;">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="font-semibold text-base flex-1 truncate mr-2">${exerciseName}</span>
                                    <div class="flex items-center gap-2 flex-shrink-0">
                                        <i class="fa-solid fa-shield-halved text-lg" style="color: ${rankColor};"></i>
                                        <span class="font-bold text-sm" style="color: ${rankColor};">${rankName}</span>
                                    </div>
                                </div>

                                ${isNewPr ? `
                                    <div class="text-center bg-black/20 p-3 rounded-lg">
                                        <span class="text-sm font-semibold text-yellow-300">
                                            Nouveau Record <i class="fa-solid fa-star text-xs ml-1"></i>
                                        </span>
                                        <p class="text-2xl font-bold mt-1">${weight} kg × ${reps} reps</p>
                                    </div>
                                ` : ''}

                                ${setsHistoryHtml}
                            </div>
                        `;
                    }).join('');
                } else {
                    summaryHtml = `<div class="glass-card p-4 rounded-xl text-center text-gray-400">Aucun exercice n'a été enregistré pour cette séance.</div>`;
                }

                return `
                    <div class="p-6 h-full flex flex-col relative overflow-hidden">
                        <header class="pt-4 mb-4 text-center summary-card flex-shrink-0" style="animation-delay: 0ms; opacity: 0; animation: fadeInModal 0.5s forwards; animation-fill-mode: forwards;">
                            <h1 class="text-4xl font-extrabold tracking-tight">Séance Terminée !</h1>
                            <p class="text-gray-300 text-lg mt-1">${workout?.name || 'Bravo !'} 💪</p>
                        </header>

                        <div class="summary-card glass-card p-4 rounded-xl mb-4" style="animation-delay: 200ms; opacity: 0; animation: fadeInModal 0.5s forwards; animation-fill-mode: forwards;">
                            <h2 class="font-bold text-center text-lg mb-3">Résumé Global</h2>
                            <div class="grid grid-cols-3 gap-3 text-center">
                                <div><p class="text-2xl font-bold">${formattedDuration}</p><p class="text-xs text-gray-400">Durée ⏱️</p></div>
                                <div><p class="text-2xl font-bold">${volumeTotal.toLocaleString('fr-FR')}</p><p class="text-xs text-gray-400">Volume (kg) 🏋️</p></div>
                                <div><p class="text-2xl font-bold text-yellow-400">${nouveauxRecords}</p><p class="text-xs text-gray-400">Nouveaux PR 🔥</p></div>
                            </div>
                        </div>

                        <div class="flex-grow space-y-3 overflow-y-auto scrollbar-hide p-1 min-h-0">
                            <h2 class="summary-card font-bold text-center text-lg mb-3 text-gray-300" style="animation-delay: 300ms; opacity: 0; animation: fadeInModal 0.5s forwards; animation-fill-mode: forwards;">Récapitulatif Détaillé</h2>
                            ${summaryHtml}
                        </div>

                        <button data-navigate="Accueil" class="w-full btn-primary mt-6 summary-card flex-shrink-0" style="animation-delay: ${(session.performance?.length ?? 0) * 150 + 500}ms; opacity: 0; animation: fadeInModal 0.5s forwards; animation-fill-mode: forwards;">Retour à l'accueil</button>
                    </div>
                `;
            },

            BottomNav: () => {
                const navItems = [ 
                    { id: 'Accueil', icon: 'fa-house' }, 
                    { id: 'Workouts', icon: 'fa-dumbbell' }, 
                    { id: 'Repas', icon: 'fa-utensils' },
                    { id: 'Calendrier', icon: 'fa-calendar-days' },
                    { id: 'Dashboard', icon: 'fa-chart-line' }, // Onglet Tableau de Bord ajouté
                    { id: 'Stats', icon: 'fa-ranking-star' } // Onglet Mes Rangs
                ];
                return `
                    <div class="glass-card flex justify-around items-center h-full rounded-full">
                        ${navItems.map(item => `
                            <button data-navigate="${item.id}" class="bottom-nav-item relative flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${state.activePage === item.id ? 'active' : ''}">
                                <i class="fa-solid ${item.icon} text-xl text-gray-400"></i>
                            </button>
                        `).join('')}
                    </div>
                `;
            }
        };
        
       function setupCalendarDragAndDrop() {
            const storyContainer = document.getElementById('story-container');
            if (!storyContainer) return;

            // On nettoie l'ancien observateur s'il existe, pour éviter les bugs
            if (lastItemObserver) {
                lastItemObserver.disconnect();
            }

            const scrollLeftBtn = document.getElementById('scroll-story-left-btn');
            const scrollRightBtn = document.getElementById('scroll-story-right-btn');

            // --- GESTION FLÈCHE GAUCHE (inchangée) ---
            const updateLeftButton = () => {
                if (storyContainer.scrollLeft < 1) {
                    scrollLeftBtn.style.opacity = '0';
                    scrollLeftBtn.style.pointerEvents = 'none';
                } else {
                    scrollLeftBtn.style.opacity = '1';
                    scrollLeftBtn.style.pointerEvents = 'auto';
                }
            };
            storyContainer.addEventListener('scroll', updateLeftButton, { passive: true });
            updateLeftButton();


            // --- GESTION FLÈCHE DROITE (nouvelle méthode "Observer") ---
            const lastAsset = storyContainer.querySelector('.draggable:last-child');
            
            if (lastAsset) {
                // On crée un "observateur" qui va surveiller le dernier élément
                lastItemObserver = new IntersectionObserver((entries) => {
                    const lastEntry = entries[0];
                    // Si le dernier élément est visible à l'écran...
                    if (lastEntry.isIntersecting) {
                        // ... on cache la flèche.
                        scrollRightBtn.style.opacity = '0';
                        scrollRightBtn.style.pointerEvents = 'none';
                    } else {
                        // Sinon, on la montre.
                        scrollRightBtn.style.opacity = '1';
                        scrollRightBtn.style.pointerEvents = 'auto';
                    }
                }, { 
                    root: storyContainer, // On observe à l'intérieur du conteneur
                    threshold: 0.95 // Se déclenche quand 95% de l'élément est visible
                });

                // On dit à l'observateur de commencer à surveiller le dernier élément
                lastItemObserver.observe(lastAsset);
            } else {
                 // S'il n'y a pas d'éléments, on s'assure que la flèche est cachée
                 scrollRightBtn.style.opacity = '0';
                 scrollRightBtn.style.pointerEvents = 'none';
            }

            // --- GESTION DRAG & DROP (inchangée) ---
            document.querySelectorAll('.draggable').forEach(el => {
                // ... (le reste de votre fonction drag & drop reste ici, inchangé) ...
                el.ondragstart = e => {
                    const target = e.currentTarget; 
                    e.dataTransfer.setData('text/plain', `${target.dataset.itemId},${target.dataset.itemType}`);
                    e.dataTransfer.effectAllowed = 'move';
                    setTimeout(() => {
                        if (target) target.classList.add('dragging');
                    }, 0);
                };
                el.ondragend = e => {
                    if (e.currentTarget) e.currentTarget.classList.remove('dragging');
                };
            });
            document.querySelectorAll('#calendar-grid .calendar-day:not(.past-day)').forEach(day => {
                day.ondragover = e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; day.classList.add('drag-over'); };
                day.ondragleave = e => day.classList.remove('drag-over');
                day.ondrop = e => {
                    e.preventDefault();
                    day.classList.remove('drag-over');
                    const [itemId, itemType] = e.dataTransfer.getData('text/plain').split(',');
                    if (itemId && itemType && day.dataset.date) openPlanModal(itemId, day.dataset.date, itemType);
                };
            });
        }

        // AJOUTEZ CETTE NOUVELLE FONCTION
function setupEditorDragAndDrop(containerId, itemsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let draggedElementId = null;

    container.addEventListener('dragstart', e => {
        const target = e.target.closest('.draggable');
        if (target) {
            draggedElementId = target.dataset.id;
            // Un petit délai pour permettre au navigateur de "capturer" l'élément
            setTimeout(() => target.classList.add('dragging'), 0);
        }
    });

    container.addEventListener('dragend', e => {
        const target = e.target.closest('.draggable');
        if (target) {
            target.classList.remove('dragging');
        }
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggables = [...container.querySelectorAll('.draggable:not(.dragging)')];
        
        draggables.forEach(draggable => draggable.classList.remove('drag-over'));

        if (afterElement == null) {
            // Pas d'élément en dessous, on ne met pas de marqueur
        } else {
            afterElement.classList.add('drag-over');
        }
    });

    container.addEventListener('drop', e => {
        e.preventDefault();
        const fromIndex = itemsArray.findIndex(item => item.id === draggedElementId);
        if (fromIndex === -1) return;

        const afterElement = getDragAfterElement(container, e.clientY);
        const toId = afterElement ? afterElement.dataset.id : null;
        const toIndex = toId ? itemsArray.findIndex(item => item.id === toId) : itemsArray.length;

        // Réorganisation de l'array
        const [movedItem] = itemsArray.splice(fromIndex, 1);
        
        // Ajustement de l'index si on déplace vers le bas
        const adjustedToIndex = fromIndex < toIndex ? toIndex -1 : toIndex;
        itemsArray.splice(adjustedToIndex, 0, movedItem);

        // Nettoyage et re-render
        container.querySelector('.drag-over')?.classList.remove('drag-over');
        draggedElementId = null;
        render();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}
        
        // --- EVENT LISTENERS & DOM MANIPULATION ---
        const mainClickHandler = e => {
    // --- NOUVELLE LOGIQUE CENTRALE POUR TOUS LES MENUS DÉROULANTS ---
    const dropdownButton = e.target.closest('.custom-select-button, .shop-sort-button');
    const isClickInsideActiveDropdownOptions = e.target.closest('.custom-select-options.active, .shop-sort-options.active');

    // Cas 1 : On a cliqué sur un bouton pour ouvrir/fermer un menu
    if (dropdownButton) {
        const parentContainer = dropdownButton.closest('.custom-select-container');
        const optionsContainer = parentContainer.querySelector('.custom-select-options, .shop-sort-options');
        const wasActive = optionsContainer.classList.contains('active');
        
        closeAllDropdowns(); // On ferme d'abord tous les menus ouverts

        if (!wasActive) { // Si celui cliqué n'était pas ouvert, on l'ouvre
            optionsContainer.classList.add('active');
            dropdownButton.classList.add('active');
        }
        // Si on a cliqué sur un menu déjà ouvert, il est simplement fermé par closeAllDropdowns() et on ne le rouvre pas.
        return; // On arrête le script ici pour ce clic
    }

    // Cas 2 : On a cliqué n'importe où ailleurs sur la page
    // On vérifie que le clic n'est pas à l'intérieur de la liste d'options déjà ouverte (pour pouvoir sélectionner une option)
    if (!isClickInsideActiveDropdownOptions) {
        closeAllDropdowns();
    }
    // --- FIN DE LA NOUVELLE LOGIQUE ---


    // Le reste de votre fonction mainClickHandler (inchangé)
    const navElement = e.target.closest('[data-navigate]');
    if (navElement) {
        e.stopPropagation();
        const targetPage = navElement.dataset.navigate;
        const itemId = navElement.dataset.id;
        
        if (targetPage === 'WorkoutEditor') {
            const originalWorkout = state.workouts.find(w => w.id === itemId);
            if (originalWorkout) state.editingWorkout = JSON.parse(JSON.stringify(originalWorkout));
            navigate(targetPage, { id: itemId });
        } else if (targetPage === 'MealEditor') {
            const mealToEdit = state.meals.find(m => m.id === itemId);
            if (mealToEdit) {
               state.editingMeal = JSON.parse(JSON.stringify(mealToEdit));
               state.editingMeal.isQuickAdd = false;
            }
            navigate(targetPage, { id: itemId });
        } else {
            navigate(targetPage);
        }
        return;
    }

    const filterButton = e.target.closest('[data-filter]');
    if (filterButton) {
        state.viewFilter = filterButton.dataset.filter;
        render();
        return;
    }

    switch(state.activePage) {
        case 'Accueil':       handleAccueilEvents(e); break;
        case 'Workouts':      handleWorkoutsEvents(e); break;
        case 'Repas':         handleRepasEvents(e); break;
        case 'WorkoutEditor': handleWorkoutEditorEvents(e); break;
        case 'MealEditor':    handleMealEditorEvents(e); break;
        case 'Shop':          handleShopEvents(e); break;
        case 'WorkoutPlayer': handleWorkoutPlayerEvents(e); break;
        case 'Calendrier':    handleCalendarEvents(e); break;
        case 'Dashboard':     handleDashboardEvents(e); break;
        case 'Stats':         handleStatsEvents(e); break;
        case 'Profil':        handleProfilEvents(e); break;
        case 'Achievements':  handleAchievementsEvents(e); break;
    }
};

function handleAchievementsEvents(e) {
    
    // --- PARTIE 2 : GÉRER LE CHOIX D'UNE OPTION ---
    const sortOption = e.target.closest('.custom-select-option[data-type="achievements-sort"]');
    if (sortOption) {
        state.achievementsSortOrder = sortOption.dataset.value;
        render(); // On redessine simplement la page, le tri sera appliqué
        return; // On s'arrête ici
    }

    // --- PARTIE 3 : LOGIQUE EXISTANTE (DÉTAILS DU SUCCÈS) ---
    const achBtn = e.target.closest('[data-action="view-achievement"]');
    if (achBtn) {
        openAchievementDetailsModal(achBtn.dataset.id);
    }
}

const mainInputHandler = e => {
    if(e.target.id === 'profile-pic-input') {
        handleProfilePictureChange(e);
    } else if(e.target.classList.contains('meal-checkbox')) {
        const checkbox = e.target;
        const event = state.calendarEvents.find(ev => ev.id === checkbox.dataset.eventId);
        if (event) {
            event.validated = checkbox.checked;
            updateStreaks();
        }
        render();
    } else if (state.activePage === 'WorkoutEditor' && e.target.id === 'workout-name-input') {
        if (state.editingWorkout) state.editingWorkout.name = e.target.value;
    } else if (state.activePage === 'MealEditor' && e.target.id === 'meal-name-input') {
        if (state.editingMeal) state.editingMeal.name = e.target.value;
    }
};

function addEventListeners() {
    const appContainer = document.getElementById('app-container');

    // On retire les anciens écouteurs pour être sûr de ne pas en avoir plusieurs à la fois
    appContainer.removeEventListener('click', mainClickHandler);
    appContainer.removeEventListener('input', mainInputHandler);

    // On attache les écouteurs uniques et permanents
    appContainer.addEventListener('click', mainClickHandler);
    appContainer.addEventListener('input', mainInputHandler);
}
        
        function handleWorkoutEditorEvents(e) {
            if (e.target.closest('#save-workout-btn')) saveWorkout();
            else if (e.target.closest('#cancel-workout-btn')) navigate('Workouts');
            else if (e.target.closest('#open-add-exercise-modal')) openAddExerciseModal();
            else if (e.target.closest('.edit-exercise-btn')) openEditExerciseModal(e.target.closest('[data-id]').dataset.id);
            else if (e.target.closest('#open-delete-confirmation-btn')) {
                const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center"><h2 class="text-xl font-bold mb-2">Supprimer la séance ?</h2><p class="text-gray-400 mb-6">Cette action est irréversible.</p><div class="flex gap-4"><button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button><button id="confirm-delete-btn" class="w-full bg-red-600 text-white p-3 rounded-lg font-bold">Supprimer</button></div></div>`;
                showModal(modalContent, (modalWrapper) => {
                    modalWrapper.querySelector('#confirm-delete-btn').onclick = () => {
                        const workoutId = document.getElementById('editor-page').dataset.workoutId;
                        state.workouts = state.workouts.filter(w => w.id !== workoutId);
                        state.calendarEvents = state.calendarEvents.filter(ev => ev.refId !== workoutId);
                        state.editingWorkout = null;
                        closeModal();
                        navigate('Workouts');
                    };
                });
            }
            else if (e.target.closest('#open-tag-selection-modal')) {
    openTagSelectionModal('workout');
}
else if (e.target.closest('.remove-tag-btn')) {
    const tagId = e.target.closest('.remove-tag-btn').dataset.tagId;
    state.editingWorkout.tags = state.editingWorkout.tags.filter(id => id !== tagId);
    render();
}
        }

        function handleWorkoutPlayerEvents(e) {
            if (e.target.closest('#finish-set-btn')) finishSet();
            else if (e.target.closest('#skip-rest-btn')) nextPlayerStep();
            else if (e.target.closest('#view-session-recap')) openSessionRecapModal();
            // === CORRECTION ICI : Gestion des clics sur les flèches ===
            else if (e.target.closest('[data-action="increment-weight"]')) {
                const input = document.getElementById('weight-input');
                let value = parseFloat(input.value) || 0;
                input.value = (value + 0.25).toFixed(2);
            }
            else if (e.target.closest('[data-action="decrement-weight"]')) {
                const input = document.getElementById('weight-input');
                let value = parseFloat(input.value) || 0;
                input.value = Math.max(0, value - 0.25).toFixed(2);
            }
            // =========================================================
            else if (e.target.closest('#end-workout-btn')) {
                const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center"><h2 class="text-xl font-bold mb-2">Arrêter la séance ?</h2><p class="text-gray-400 mb-6">La progression sera perdue.</p><div class="flex gap-4"><button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button><button id="confirm-end" class="w-full bg-red-600 text-white p-3 rounded-lg font-bold">Arrêter</button></div></div>`;
                showModal(modalContent, (modalWrapper) => {
                    modalWrapper.querySelector('#confirm-end').onclick = () => {
                        if (playerTimer) clearInterval(playerTimer);
                        if (sessionDurationTimer) clearInterval(sessionDurationTimer);
                        playerTimer = null;
                        sessionDurationTimer = null;
                        state.activeWorkoutSession = null;
                        closeModal();
                        navigate('Accueil');
                    };
                });
            }
        }
        
function handleMealEditorEvents(e) {
            // Clic sur Sauvegarder
            if (e.target.closest('#save-meal-btn')) {
                saveMeal();
            } 
            // Clic sur Annuler (X)
            else if (e.target.closest('#cancel-meal-btn')) {
                if(state.editingMeal?.isQuickAdd) navigate('Accueil');
                else navigate('Repas');
            } 
            // Clic sur la poubelle de l'ingrédient
            else if (e.target.closest('.delete-ingredient-btn')) {
                const ingId = e.target.closest('.delete-ingredient-btn').dataset.ingId;
                state.editingMeal.ingredients = state.editingMeal.ingredients.filter(ing => ing.id !== ingId);
                render();
            }
            // Clic sur le crayon de l'ingrédient
            else if (e.target.closest('.edit-ingredient-btn')) {
                openEditIngredientModal(e.target.closest('.edit-ingredient-btn').dataset.ingId);
            }
            // Clic sur la poubelle générale pour supprimer le repas
            else if (e.target.closest('#open-delete-meal-confirmation-btn')) {
                 const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center"><h2 class="text-xl font-bold mb-2">Supprimer le repas ?</h2><p class="text-gray-400 mb-6">Cette action est irréversible.</p><div class="flex gap-4"><button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button><button id="confirm-delete-meal-btn" class="w-full bg-red-600 text-white p-3 rounded-lg font-bold">Supprimer</button></div></div>`;
                showModal(modalContent, (modalWrapper) => {
                    modalWrapper.querySelector('#confirm-delete-meal-btn').onclick = () => {
                        const mealId = document.getElementById('meal-editor-page').dataset.mealId;
                        state.meals = state.meals.filter(m => m.id !== mealId);
                        state.calendarEvents = state.calendarEvents.filter(ev => ev.refId !== mealId);
                        state.editingMeal = null;
                        closeModal();
                        navigate('Repas');
                    };
                });
            } 
            // Clic sur le bouton de scan
            else if (e.target.closest('#scan-barcode-btn')) {
                 startScanner(state.editingMeal?.isQuickAdd);
            } 
            // Clic sur un résultat de recherche
            else if (e.target.closest('#autocomplete-results')) {
                const resultDiv = e.target.closest('[data-index]');
                if(resultDiv) {
                    const foodItem = currentSearchResults[parseInt(resultDiv.dataset.index)];
                    if(foodItem) {
                        addIngredientToMeal(foodItem, state.editingMeal?.isQuickAdd);
                        document.getElementById('ingredient-search-input').value = '';
                        document.getElementById('autocomplete-results').innerHTML = '';
                    }
                }
            }
            // Clic pour gérer les tags
            else if (e.target.closest('#open-tag-selection-modal')) {
                openTagSelectionModal('meal');
            }
            // Clic pour supprimer un tag
            else if (e.target.closest('.remove-tag-btn')) {
                const tagId = e.target.closest('.remove-tag-btn').dataset.tagId;
                state.editingMeal.tags = state.editingMeal.tags.filter(id => id !== tagId);
                render();
            }

            // Attache l'écouteur pour la recherche d'ingrédients
            const searchInput = document.getElementById('ingredient-search-input');
            if(searchInput) searchInput.addEventListener('input', handleAutocompleteSearch);
        }

        // --- REMPLACEZ COMPLÈTEMENT VOTRE FONCTION handleShopEvents PAR CELLE-CI ---

function handleShopEvents(e) {
    // Clic sur un onglet (Box, Bordures, Titres)
    const tabBtn = e.target.closest('.shop-tab-btn');
    if (tabBtn) {
        state.shop.activeTab = tabBtn.dataset.tab;
        render();
        // On réinitialise la position de défilement pour un effet plus propre
        setTimeout(() => {
            const scrollArea = document.querySelector('.shop-content-scroll-area');
            if (scrollArea) {
                scrollArea.scrollTo(0, 0);
            }
        }, 10);
        return;
    }

    // Clic sur une option de tri
    const sortOption = e.target.closest('.custom-select-option');
    if (sortOption && sortOption.dataset.type) {
        const type = sortOption.dataset.type;
        const value = sortOption.dataset.value;

        // On définit l'objet qui contient le texte des labels de tri (si ce n'est pas déjà global)
        const sortLabels = {
            'possession': 'Par possession',
            'rarity_asc': 'Rareté croissante',
            'rarity_desc': 'Rareté décroissante'
        };

        state.shop[`${type}SortOrder`] = value;

        const parentContainer = sortOption.closest('.custom-select-container');
        parentContainer.querySelector('.shop-sort-options').classList.remove('active');
        parentContainer.querySelector('.shop-sort-button').classList.remove('active');
        
        // --- LOGIQUE ANTI-FLICKER CORRIGÉE ---
        if (type === 'collectibles') {
            // 1. Mise à jour de la liste (ce que vous faisiez déjà)
            document.getElementById('collection-list-container').innerHTML = renderCollectionList();
            
            // 2. LIGNE AJOUTÉE : Mise à jour du texte du bouton de tri
            parentContainer.querySelector('.shop-sort-button span').textContent = sortLabels[value];

        } else {
            // Pour les autres onglets, on garde le render global
            render();
        }
        return;
    }
    
    // Logique d'achat (inchangée)
    const buyBoxBtn = e.target.closest('#buy-box-btn');
    if (buyBoxBtn) {
        buyAndOpenBox(buyBoxBtn);
        return;
    }
    const buyBorderBtn = e.target.closest('.buy-border-btn');
    if (buyBorderBtn) {
        const itemCard = buyBorderBtn.closest('.glass-card');
        buyItem(buyBorderBtn.dataset.itemId, 'border', buyBorderBtn, itemCard);
        return;
    }
    const buyTitleBtn = e.target.closest('.buy-title-btn');
    if (buyTitleBtn) {
        const itemCard = buyTitleBtn.closest('.glass-card');
        buyItem(buyTitleBtn.dataset.itemId, 'title', buyTitleBtn, itemCard);
        return;
    }
}

        function getRandomCollectible() {
    const rarityTable = [
        { rarity: 'Commun', chance: 0.55 },
        { rarity: 'Rare', chance: 0.27 },
        { rarity: 'Épique', chance: 0.12 },
        { rarity: 'Légendaire', chance: 0.04 },
        { rarity: 'Mythique', chance: 0.015 },
        { rarity: 'Divin', chance: 0.005 } // 0.5% de chance
    ];

    const random = Math.random();
    let cumulativeChance = 0;

    for (const tier of rarityTable) {
        cumulativeChance += tier.chance;
        if (random < cumulativeChance) {
            const itemsOfRarity = COLLECTIBLES_DATABASE.filter(item => item.rarity === tier.rarity);
            if (itemsOfRarity.length > 0) {
                return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
            }
        }
    }
    // Failsafe au cas où
    return COLLECTIBLES_DATABASE.find(item => item.rarity === 'Commun');
}

        function showBoxOpeningModal(wonItem) {
    const rarityColors = {
        'Commun': 'text-gray-400',
        'Rare': 'text-blue-400',
        'Épique': 'text-purple-400',
        'Légendaire': 'text-orange-400',
        'Mythique': 'text-yellow-300',
        'Divin': 'text-cyan-300' // Couleur pour la nouvelle rareté
    };

    const modalContent = `
    <div class="glass-card p-8 rounded-3xl w-full max-w-sm text-center flex flex-col items-center" style="animation: fadeInModal 0.5s forwards;">
        <p class="font-bold ${rarityColors[wonItem.rarity]} mb-4">${wonItem.rarity}</p>
        <div class="w-32 h-32 flex items-center justify-center mb-4">
            <i class="fa-solid ${wonItem.icon} text-8xl ${wonItem.color}"></i>
        </div>
        <h3 class="text-2xl font-bold">${wonItem.name}</h3>
        <button class="close-modal w-full mt-8 btn-primary">Super !</button>
    </div>`;

    // Ce callback sera exécuté à la fermeture de la modale,
    // peu importe la manière (bouton, clic à côté, etc.)
    const updateCollectionCallback = () => {
        // LOGIQUE ANTI-FLICKER : On met à jour uniquement la liste et le compteur
        const listContainer = document.getElementById('collection-list-container');
        if (listContainer) {
            listContainer.innerHTML = renderCollectionList();
        }
        const unlockedCounter = document.querySelector('.w-full.max-w-sm .text-sm.text-gray-400.font-semibold');
        if (unlockedCounter) {
            const unlockedCount = state.userProfile.inventory.collectibles.length;
            unlockedCounter.textContent = `(${unlockedCount}/${COLLECTIBLES_DATABASE.length} débloqués)`;
        }
    };
    
    // Le premier argument (setupCallback) est null car nous n'avons pas d'action spécifique à l'ouverture,
    // seulement à la fermeture.
    showModal(modalContent, null, updateCollectionCallback);
}

        function buyAndOpenBox(buttonElement) {
            const boxCost = 250;
            if (state.userProfile.coins < boxCost) {
                animateButtonFailure(buttonElement); // Shake button on failure
                return;
            }

            state.userProfile.coins -= boxCost;
            const wonItem = getRandomCollectible();
            
            if (wonItem && !state.userProfile.inventory.collectibles.includes(wonItem.id)) {
                 state.userProfile.inventory.collectibles.push(wonItem.id);
            }

            updateAchievementProgress('shop_first_purchase', 1, 'set');
    updateAchievementProgress('spendthrift', boxCost, 'increment');
    updateAchievementProgress('collector_initiate', 1, 'increment');
    updateAchievementProgress('collection_complete', 1, 'increment');
            
            // Animate the box button's container (the glass-card).
            const boxCardElement = buttonElement.closest('.glass-card'); 
            if (boxCardElement) {
                animateItemPurchaseSuccess(boxCardElement); 
            }

            // Manually update coins display instead of full render()
            document.querySelector('.glass-card.px-4.py-2.rounded-full.font-bold.text-yellow-300').textContent = `${state.userProfile.coins.toLocaleString('fr-FR')} `;
            document.querySelector('.glass-card.px-4.py-2.rounded-full.font-bold.text-yellow-300').innerHTML += `<i class="fa-solid fa-coins ml-1"></i>`;

            checkRarityAchievement();
            showBoxOpeningModal(wonItem); // This modal will trigger a render() when it closes.
            // DO NOT CALL render() here: render(); 
        }

        function buyItem(itemId, itemType, buttonElement, itemCardElement) {
            const db = itemType === 'border' ? BORDERS_DATABASE : TITLES_DATABASE;
            const item = db.find(i => i.id === itemId);

            if (!item || item.cost === undefined) return;

            if (state.userProfile.coins < item.cost) {
                animateButtonFailure(buttonElement); // Shake the specific buy button
                return;
            }

            const inventory = itemType === 'border' ? state.userProfile.inventory.borders : state.userProfile.inventory.titles;
            if (inventory.includes(itemId)) {
                // If already owned, no specific animation needed, as the button should be disabled
                return;
            }

            state.userProfile.coins -= item.cost;
            inventory.push(itemId);

            updateAchievementProgress('shop_first_purchase', 1, 'set');
    updateAchievementProgress('spendthrift', item.cost, 'increment');
    if (item.rarity === 'Légendaire') {
        updateAchievementProgress('legendary_owner', 1, 'set');
    }
            
            // Animate the item card for success
            animateItemPurchaseSuccess(itemCardElement);
            
            // MANUALLY UPDATE THE UI INSTEAD OF CALLING render()
            // 1. Update the button to "Possédé" and disable it
            buttonElement.textContent = 'Possédé';
            buttonElement.disabled = true;
            buttonElement.classList.remove('btn-primary');
            buttonElement.classList.add('glass-card'); // Apply the 'glass-card' style
            
            // 2. Update the coin display in the header
            document.querySelector('.glass-card.px-4.py-2.rounded-full.font-bold.text-yellow-300').textContent = `${state.userProfile.coins.toLocaleString('fr-FR')} `;
            document.querySelector('.glass-card.px-4.py-2.rounded-full.font-bold.text-yellow-300').innerHTML += `<i class="fa-solid fa-coins ml-1"></i>`;

            // DO NOT CALL render() here: render(); 
            checkRarityAchievement();
        }

        function openStatDetailsModal(statType) {
            const thisWeek = getWeeklyStats(0);
            const lastWeek = getWeeklyStats(1);

            let config = {};
            switch (statType) {
                case 'sessions':
                    config = { title: "Séances de la Semaine", icon: 'fa-dumbbell', value: thisWeek.sessions, lastValue: lastWeek.sessions, format: (v) => v };
                    break;
                case 'hours':
                    // On utilise formatDuration en convertissant les heures en millisecondes
                    config = { title: "Heures d'Entraînement", icon: 'fa-clock', value: thisWeek.hours, lastValue: lastWeek.hours, format: (v) => formatDuration(v * 3600000) };
                    break;
                case 'volume':
                    // On utilise formatVolume qui gère déjà les kg, tonnes, etc.
                    config = { title: "Volume Soulevé", icon: 'fa-weight-hanging', value: thisWeek.volume, lastValue: lastWeek.volume, format: (v) => formatVolume(v) };
                    break;
            }

            let percentageChange = 0;
            if (config.lastValue > 0) {
                percentageChange = ((config.value - config.lastValue) / config.lastValue) * 100;
            } else if (config.value > 0) {
                percentageChange = 100;
            }

            const isPositive = percentageChange >= 0;
            const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
            const changeIcon = isPositive ? 'fa-arrow-up' : 'fa-arrow-down';

            // Les fonctions de formatage incluent déjà l'unité, donc on les appelle directement
            const lastWeekDisplay = config.lastValue > 0 ? `${config.format(config.lastValue)}` : 'N/A';
            const comparisonText = (config.value > 0 || config.lastValue > 0) ? `<p class="text-sm mt-2 ${changeColor} font-semibold">
                        <i class="fa-solid ${changeIcon}"></i> ${percentageChange.toFixed(0)}% vs la semaine dernière
                    </p>` : `<p class="text-sm mt-2 text-gray-500">Aucune donnée à comparer</p>`;

            const modalContent = `
            <div class="glass-card p-8 rounded-3xl w-full max-w-sm text-center flex flex-col items-center">
                <i class="fa-solid ${config.icon} text-4xl text-violet-300 mb-4"></i>
                <h2 class="text-2xl font-bold">${config.title}</h2>
                
                <p class="text-6xl font-extrabold my-4">${config.format(config.value)}</p>
                
                <div class="w-full bg-black/20 p-4 rounded-xl">
                    <p class="text-xs font-bold text-gray-400">Semaine Passée</p>
                    <p class="text-4xl font-bold mt-1">${lastWeekDisplay}</p>
                    ${comparisonText}
                </div>

                <button class="close-modal w-full mt-8 glass-card p-3 rounded-lg font-bold">Fermer</button>
            </div>`;
            showModal(modalContent);
        }

        // === CETTE FONCTION EST LA SEULE VERSION À GARDER ===
        function handleAccueilEvents(e) {
            if (e.target.closest('#start-workout-btn') && !e.target.closest('#start-workout-btn').classList.contains('opacity-30')) {
                startWorkout(e.target.closest('#start-workout-btn').dataset.eventId);
            } else if (e.target.closest('#quick-add-food-btn')) {
                openQuickAddFood();
            } else if (e.target.closest('[data-action="open-streak-info"]')) {
                openStreakInfoModal(e.target.closest('[data-action="open-streak-info"]').dataset.type);
            }
            // === NOUVELLE PARTIE : Gérer le clic sur les cartes de stats ===
            else if (e.target.closest('[data-action="open-stat-modal"]')) {
                const statType = e.target.closest('[data-action="open-stat-modal"]').dataset.statType;
                openStatDetailsModal(statType);
            }
            // ==========================================================
        }

        function handleWorkoutsEvents(e) {
            const favoriteBtn = e.target.closest('.toggle-favorite-btn');
            if (favoriteBtn) {
                e.stopPropagation();
                const workoutId = favoriteBtn.dataset.id;
                const workout = state.workouts.find(w => w.id === workoutId);
                if (workout) {
                    workout.isFavorite = !workout.isFavorite;
                    render();
                }
                return;
            }

            const startBtn = e.target.closest('[data-action="start-now"]');
            if (startBtn) {
                e.stopPropagation();
                startWorkoutFromTemplate(startBtn.dataset.id);
                return;
            }

            const sortOption = e.target.closest('#workout-sort-options .custom-select-option');
            if (sortOption) {
                state.workoutsSortOrder = sortOption.dataset.value;
                optionsContainer.classList.remove('active');
                render();
                return;
            }

            if (e.target.closest('#add-workout-btn')) {
                const newWorkout = { id: generateId(), name: 'Nouvelle Séance', exercises: [], isFavorite: false, tags: [] };
                state.editingWorkout = newWorkout;
                navigate('WorkoutEditor', { id: newWorkout.id, isNew: true });
            }
        }

        function handleRepasEvents(e) {
            const favoriteBtn = e.target.closest('.toggle-meal-favorite-btn');
            if (favoriteBtn) {
                e.stopPropagation();
                const mealId = favoriteBtn.dataset.id;
                const meal = state.meals.find(m => m.id === mealId);
                if (meal) {
                    meal.isFavorite = !meal.isFavorite;
                    render();
                }
                return;
            }

            const sortOption = e.target.closest('#meal-sort-options .custom-select-option');
            if (sortOption) {
                state.mealsSortOrder = sortOption.dataset.value;
                optionsContainer.classList.remove('active');
render();
                return;
            }

            if (e.target.closest('[data-action="open-goals-modal"]')) {
                openGoalsModal();
                return;
            }

            if (e.target.closest('#add-meal-btn')) {
                const newMeal = { id: generateId(), name: 'Nouveau Repas', ingredients: [], nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }, isQuickAdd: false, isFavorite: false, tags: [] };
                state.editingMeal = newMeal;
                navigate('MealEditor', { id: newMeal.id, isNew: true });
            }
        }
        
        function handleDashboardEvents(e) {
            if (e.target.closest('#show-history-btn')) {
                openSessionHistoryModal();
            } else if (e.target.closest('[data-action="open-dashboard-help"]')) {
                updateAchievementProgress('rewarded_curiosity', 'dashboard_help', 'add_to_set');
                openDashboardHelpModal();
            } else if (e.target.closest('[data-action="open-sessions-details"]')) {
                openSessionsModal();
            } else if (e.target.closest('[data-action="open-time-details"]')) {
                openTimeModal();
            } else if (e.target.closest('[data-action="open-volume-details"]')) {
                openVolumeModal();
            }

            const option = e.target.closest('#exercise-select-options .custom-select-option');
            if (option && optionsContainer) {
                state.selectedChartExerciseId = option.dataset.value;
                optionsContainer.classList.remove('active');
                render();
            }
        }

        function handleProfilEvents(e) {
    const profileToEdit = state.tempUserProfile;
    if (!profileToEdit) return;

    // --- GESTION DES MODALES DE SÉLECTION D'OBJETS (INCHANGÉ) ---
    if (e.target.closest('#change-border-btn')) {
        openItemSelectorModal('border');
        return;
    }
    const equipTitleBtn = e.target.closest('#equip-title-btn');
    if (equipTitleBtn) {
        openItemSelectorModal('title');
        return;
    }
    const showcaseBtn = e.target.closest('[data-action="equip-showcase"]');
    if (showcaseBtn) {
        openItemSelectorModal('collectible', parseInt(showcaseBtn.dataset.slotIndex));
        return;
    }

    // --- NOUVELLE LOGIQUE POUR LA SÉLECTION DANS LES MENUS DÉROULANTS ---
    const countryOption = e.target.closest('#country-select-options .custom-select-option');
    if (countryOption) {
        profileToEdit.country = countryOption.dataset.value;
        render(); // Redessine pour afficher le nouveau pays
        return;
    }

    const sexOption = e.target.closest('#sex-select-options .custom-select-option');
    if (sexOption) {
        profileToEdit.sex = sexOption.dataset.value;
        render(); // Redessine pour afficher le nouveau choix
        return;
    }

    // --- LOGIQUE DE SAUVEGARDE ET AUTRES BOUTONS (INCHANGÉ) ---
    if (e.target.closest('#save-profile-btn')) {
        const nameInput = document.getElementById('profile-name');
        const dobInput = document.getElementById('profile-dob');
        const normalizedName = nameInput.value.trim().toLowerCase();
        const dob = dobInput.value;

        let titlesToUnlock = [];
        const titlesDatabase = {
            't-gymbro-originel': {
                names: ['léo liénard', 'mathéo duchemin', 'mathieu tornil', 'hugo revel', 'anouk le floch', 'nazim benhadid', 'léo pelofi', 'ewen lebourlay'],
                dobs: ['2004-01-03', '2004-09-07', '2004-05-26', '2004-06-04', '2003-11-05', '2004-03-26', '2004-07-13', '2004-06-12'],
                message: "Tu as débloqué le titre 'Gymbro Originel' !\nTu fais partie des fondateurs de FitFlow.\nTon soutien dès les débuts est inestimable.\nPorte fièrement ce titre !"
            },
            't-pompier-muscle': {
                names: ['guilhem papaseit'],
                dobs: ['2002-06-11'],
                message: "Tu as débloqué le titre 'Pompier Musclé' !\nUn grand bravo pour ta force et ton courage.\nPorte fièrement ce titre !"
            },
            't-the-bench-monster': {
                names: ['ewen lebourlay'],
                dobs: ['2004-06-12'],
                message: "Tu as débloqué le titre 'The Bench Monster' !\nTu êtes la force incarnée.\nPorte fièrement ce titre !"
            },
            't-createur-supreme': {
                names: ['lilian rivière'],
                dobs: ['2004-08-26'],
                message: "Tu as débloqué le titre 'The Gym Dev' !\nMerci pour ce travail acharné.\nPorte fièrement ce titre !"
            }
        };

        Object.keys(titlesDatabase).forEach(titleId => {
            const titleData = titlesDatabase[titleId];
            if (titleData.names.includes(normalizedName) && titleData.dobs.includes(dob) && !state.userProfile.inventory.titles.includes(titleId)) {
                titlesToUnlock.push({ id: titleId, message: titleData.message });
            }
        });

        state.userProfile.name = nameInput.value;
        state.userProfile.dob = dobInput.value;
        state.userGoals.bodyWeight = parseFloat(document.getElementById('goal-bodyweight').value) || 0;
        state.userProfile.country = profileToEdit.country;
        state.userProfile.sex = profileToEdit.sex;
        state.userProfile.equipped = JSON.parse(JSON.stringify(profileToEdit.equipped));
        state.userProfile.profilePicUrl = profileToEdit.profilePicUrl;

        if (state.userProfile.profilePicUrl) {
            localStorage.setItem('fitflow_profile_pic', state.userProfile.profilePicUrl);
        } else {
            localStorage.removeItem('fitflow_profile_pic');
        }
        
        state.tempUserProfile = null;

        if (titlesToUnlock.length > 0) {
            let gymbroTitle = titlesToUnlock.find(t => t.id === 't-gymbro-originel');
            let benchMonsterTitle = titlesToUnlock.find(t => t.id === 't-the-bench-monster');

            if (gymbroTitle && benchMonsterTitle) {
                const combinedMessage = `Tu as débloqué les titres '${TITLES_DATABASE.find(t => t.id === 't-the-bench-monster').name}' et '${TITLES_DATABASE.find(t => t.id === 't-gymbro-originel').name}' !\nFélicitations pour cette double performance.\nPorte-les fièrement !`;
                state.userProfile.inventory.titles.push('t-the-bench-monster');
                state.userProfile.inventory.titles.push('t-gymbro-originel');
                showUnlockModal(['t-the-bench-monster', 't-gymbro-originel'], combinedMessage);
            } else {
                titlesToUnlock.forEach(unlockedTitle => {
                    state.userProfile.inventory.titles.push(unlockedTitle.id);
                    if (unlockedTitle.id === 't-createur-supreme') {
        updateAchievementProgress('secret_dev_achievement', 1, 'set');
    }
                    showUnlockModal([unlockedTitle.id], unlockedTitle.message);
                });
            }
        } else {
            showToast('Profil sauvegardé avec succès !', 'success');
            navigate('Accueil');
        }
    } else if (e.target.closest('[data-action="cancel-profile-edit"]')) {
        state.tempUserProfile = null;
        navigate('Accueil');
    } else if (e.target.closest('#weight-info-btn')) {
        updateAchievementProgress('rewarded_curiosity', 'weight_info', 'add_to_set');
        const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center"><i class="fa-solid fa-weight-scale text-4xl text-violet-400 mb-4"></i><h2 class="text-xl font-bold mb-2">Importance du Poids</h2><p class="text-gray-300">Votre poids est essentiel pour calculer la justesse de vos Rangs. Il nous permet d'évaluer votre force relative (force/poids) sur de nombreux exercices et d'ajuster les scores pour une progression juste et personnalisée.</p><button class="close-modal w-full mt-6 glass-card p-3 rounded-lg font-bold">Compris !</button></div>`;
        showModal(modalContent);
    }
}

        function handleCalendarEvents(e) {
            if (e.target.closest('#prev-month-btn')) {
                state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
                render();
            } else if (e.target.closest('#next-month-btn')) {
                state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
                render();
            } else if (e.target.closest('.calendar-day:not(.past-day)')) {
                const dayDiv = e.target.closest('.calendar-day');
                const date = dayDiv.dataset.date;
                const events = state.calendarEvents.filter(ev => ev.date === date);
                if(events.length > 0) openDayDetailsModal(date, events);
            } 
            // Clic sur la flèche droite
            else if (e.target.closest('#scroll-story-right-btn')) {
                if (isStoryScrolling) return; // Si une animation est en cours, on ignore le clic
                isStoryScrolling = true; // On bloque les clics suivants

                const container = document.getElementById('story-container');
                const firstAsset = container.querySelector('.draggable');
                if (!firstAsset) {
                    isStoryScrolling = false;
                    return;
                }
                const assetWidthWithGap = firstAsset.offsetWidth + 12;
                const itemsToScroll = Math.max(1, Math.floor(container.clientWidth / assetWidthWithGap));
                container.scrollLeft += itemsToScroll * assetWidthWithGap;

                // On débloque les clics après 400ms (temps de l'animation)
                setTimeout(() => { isStoryScrolling = false; }, 400);

            } 
            // Clic sur la flèche gauche
            else if (e.target.closest('#scroll-story-left-btn')) {
                if (isStoryScrolling) return; // Si une animation est en cours, on ignore le clic
                isStoryScrolling = true; // On bloque les clics suivants

                const container = document.getElementById('story-container');
                const firstAsset = container.querySelector('.draggable');
                if (!firstAsset) {
                    isStoryScrolling = false;
                    return;
                }
                const assetWidthWithGap = firstAsset.offsetWidth + 12;
                const itemsToScroll = Math.max(1, Math.floor(container.clientWidth / assetWidthWithGap));
                container.scrollLeft -= itemsToScroll * assetWidthWithGap;
                
                // On débloque les clics après 400ms (temps de l'animation)
                setTimeout(() => { isStoryScrolling = false; }, 400);
            }
        }

        function handleStatsEvents(e) {
            if (e.target.closest('[data-action="open-rank-details"]')) {
                openRankDetailsModal(e.target.closest('[data-action="open-rank-details"]').dataset.exerciseId);
            } else if (e.target.closest('[data-action="open-global-rank-details"]')) {
                openGlobalRankDetailsModal();
            } else if (e.target.closest('[data-action="open-rank-info"]')) {
                updateAchievementProgress('rewarded_curiosity', 'rank_info', 'add_to_set');
                openRankInfoModal();
            }
        }

        // CORRECTION N°2 : Traiter la récompense ET mettre à jour l'interface.
function processRewardClaim(achId, tierIndex) {
    const achievement = ACHIEVEMENTS_DATABASE.find(ach => ach.id === achId);
    if (!achievement) return;

    if (!state.userProfile.achievements[achId]) {
        state.userProfile.achievements[achId] = { progress: 0, claimedTiers: [], qualifyingData: new Set() };
    }
    const achData = state.userProfile.achievements[achId];
    const tier = achievement.tiers[tierIndex];

    if (achData.claimedTiers.includes(tierIndex)) return;
    if (!tier || !tier.reward) return;

    let isUnlocked = false;
    if (achievement.checkCondition) {
        isUnlocked = achievement.checkCondition(state) >= tier.goal;
    } else {
        isUnlocked = achData.progress >= tier.goal;
    }

    if (!isUnlocked) {
        showToast("La condition pour ce succès n'est pas remplie.", "error");
        return;
    }

    const reward = tier.reward;
    let rewardMessage = 'Récompense récupérée !';

    // --- Distribution des récompenses ---
    switch(reward.type) {
        case 'coins':
            state.userProfile.coins += reward.amount;
            rewardMessage = `+${reward.amount} Pièces !`;
            break;
        case 'title':
            const title = TITLES_DATABASE.find(t => t.id === reward.id);
            if (title && !state.userProfile.inventory.titles.includes(reward.id)) {
                state.userProfile.inventory.titles.push(reward.id);
                rewardMessage = `Titre débloqué : "${title.name}"`;
            }
            break;
        case 'border':
            const border = BORDERS_DATABASE.find(b => b.id === reward.id);
            if (border && !state.userProfile.inventory.borders.includes(reward.id)) {
                state.userProfile.inventory.borders.push(reward.id);
                rewardMessage = `Bordure débloquée : "${border.name}"`;
            }
            break;
        case 'collectible':
            const collectible = COLLECTIBLES_DATABASE.find(c => c.id === reward.id);
            if (collectible && !state.userProfile.inventory.collectibles.includes(reward.id)) {
                state.userProfile.inventory.collectibles.push(reward.id);
                rewardMessage = `Objet obtenu : "${collectible.name}"`;
            }
            break;
    }

    showToast(rewardMessage, 'success');
    achData.claimedTiers.push(tierIndex);
    
    // --- NOUVEAU : MISE À JOUR DIRECTE DE L'INTERFACE ---
    const modalWrapper = document.querySelector('.modal-bg'); // Cible la modale entière
    if (modalWrapper) {
        const claimButton = modalWrapper.querySelector(`[data-action="claim-reward"][data-tier-index="${tierIndex}"]`);
        if (claimButton) {
            claimButton.innerHTML = `<i class="fa-solid fa-check mr-1.5"></i>Récupéré`;
            claimButton.disabled = true;
            claimButton.classList.remove('claim-btn');
            claimButton.classList.add('claimed-btn');
            claimButton.removeAttribute('data-action');
        }

        const tierItem = claimButton.closest('.tier-item');
        if (tierItem) {
            const rewardTextElement = tierItem.querySelector('.tier-reward');
            rewardTextElement.classList.remove('claimable');
            rewardTextElement.classList.add('claimed');
        }
    }

    // Mise à jour en arrière-plan pour les compteurs de notification
    if(state.activePage === 'Achievements' || state.activePage === 'Profil') {
        setTimeout(() => render(), 300);
    }
}

function showUnlockModal(titleIds, message) {
    if (!Array.isArray(titleIds) || titleIds.length === 0) return;

    const titlesHtml = titleIds.map(titleId => {
        const title = TITLES_DATABASE.find(t => t.id === titleId);
        if (!title) return '';

        // --- NOUVELLE LOGIQUE POUR LES TITRES SECRETS ---
        let titleClass = '';
        if (title.source === 'secret') {
            if (title.id === 't-gymbro-originel') titleClass = 'title-gymbro-originel';
            else if (title.id === 't-pompier-muscle' || title.id === 't-the-bench-monster') titleClass = 'title-pompier-muscle';
            else if (title.id === 't-createur-supreme') titleClass = 'title-createur-supreme';
            else titleClass = `rarity-${normalizeString(title.rarity)}-text`;
        } else {
            titleClass = `rarity-${normalizeString(title.rarity)}-text`;
        }
        // --- FIN DE LA LOGIQUE ---

        return `<p class="text-lg font-semibold truncate ${titleClass}">${title.name}</p>`;
    }).join('');

    const formattedMessage = message.replace(/\n/g, '<br>');

    const modalContent = `
    <div class="glass-card p-8 rounded-3xl w-full max-w-sm text-center flex flex-col items-center">
        <i class="fa-solid fa-trophy text-6xl text-yellow-400 animated-glow mb-4"></i>
        <h3 class="text-2xl font-bold">Titre débloqué !</h3>
        <div class="space-y-1">
            ${titlesHtml}
        </div>
        <p class="text-sm text-gray-400 mt-2 mb-6">${formattedMessage}</p>
        <button class="close-modal w-full btn-primary">Fermer</button>
    </div>`;

    showModal(modalContent, null, () => {
        showToast('Profil sauvegardé avec succès !', 'success');
        navigate('Accueil');
    });
}

// CORRECTION N°1 : Assurer que l'identifiant du succès est bien récupéré.
function openAchievementDetailsModal(achievementId) {
    const achievement = ACHIEVEMENTS_DATABASE.find(ach => ach.id === achievementId);
    if (!achievement) return;

    const userAchievementData = state.userProfile.achievements[achievement.id] || { progress: 0, claimedTiers: [] };
    
    let currentValue = userAchievementData.progress;
    if (achievement.checkCondition) {
        currentValue = achievement.checkCondition(state);
    }
    
    const claimedTiers = userAchievementData.claimedTiers;
    const hourglassAnimationHtml = `<div class="sablier"></div>`;

    const tiersHtml = achievement.tiers.map((tier, index) => {
        const isUnlocked = currentValue >= tier.goal;
        const isClaimed = claimedTiers.includes(index);
        const prevTierGoal = index > 0 ? achievement.tiers[index - 1].goal : 0;
        const isCurrent = currentValue < tier.goal && currentValue >= prevTierGoal && !achievement.checkCondition;
        const rewardText = getRewardText(tier.reward);
        
        let statusClass = 'locked';
        let rewardStatusClass = 'locked';
        if (isUnlocked) {
            statusClass = 'unlocked';
            rewardStatusClass = isClaimed ? 'claimed' : 'claimable';
        }
        if (isCurrent) {
            statusClass = 'current';
        }

        let actionHtml = '';
        if (isUnlocked) {
            if (isClaimed) {
                actionHtml = `<button class="reward-btn claimed-btn" disabled><i class="fa-solid fa-check mr-1.5"></i>Récupéré</button>`;
            } else {
                actionHtml = `<button class="reward-btn claim-btn" data-action="claim-reward" data-tier-index="${index}"><i class="fa-solid fa-gift mr-1.5"></i>Collecter</button>`;
            }
        } else {
            actionHtml = `<button class="reward-btn locked-btn" disabled><i class="fa-solid fa-lock mr-1.5"></i>Bloqué</button>`;
        }

        let tierIconContent = `<i class="fa-solid fa-lock"></i>`;
        if(isCurrent) {
            tierIconContent = hourglassAnimationHtml;
        } else if (isUnlocked) {
            tierIconContent = `<i class="fa-solid fa-check"></i>`;
        }

        return `
        <li class="tier-item ${statusClass}">
            <div class="tier-timeline">
                <div class="tier-icon">${tierIconContent}</div>
                <div class="tier-connector"></div>
            </div>
            <div class="tier-details">
                <div class="flex-grow">
                    <h4 class="font-bold">${achievement.name} - Niveau ${index + 1}</h4>
                    <p class="text-sm text-gray-400">${achievement.description(tier.goal)}</p>
                    <div class="flex items-center justify-between mt-2">
                        <div class="tier-reward ${rewardStatusClass}"><span>${rewardText}</span></div>
                        ${actionHtml}
                    </div>
                </div>
            </div>
        </li>
        `;
    }).join('');

    const modalContent = `
    <div class="relative glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto max-h-[80vh] flex flex-col" data-achievement-id="${achievementId}">
        <header class="text-center mb-4 pt-4">
            <h2 class="text-2xl font-bold">${achievement.name}</h2>
            <p class="text-sm text-gray-400">Suivez votre progression palier par palier.</p>
        </header>
        <ul class="tier-list-container flex-grow overflow-y-auto pr-2 scrollbar-hide">${tiersHtml}</ul>
        <button class="close-modal w-full mt-6 btn-primary">Fermer</button>
    </div>`;

    showModal(modalContent, (modalWrapper) => {
        modalWrapper.addEventListener('click', (e) => {
            const claimButton = e.target.closest('[data-action="claim-reward"]');
            const previewButton = e.target.closest('[data-action="preview-reward"]');

            if (claimButton) {
                // --- CORRECTION CLÉ ---
                // On cherche l'élément qui contient l'ID du succès DANS la modale.
                const contentElement = modalWrapper.querySelector('[data-achievement-id]');
                if (!contentElement) return; // Sécurité

                const achId = contentElement.dataset.achievementId;
                // --- FIN DE LA CORRECTION ---
                
                const tierIndex = parseInt(claimButton.dataset.tierIndex);
                processRewardClaim(achId, tierIndex);
            } 
            else if (previewButton) {
                e.stopPropagation();
                const { rewardType, rewardId } = previewButton.dataset;
                openRewardPreviewModal(rewardType, rewardId);
            }
        });
    });
}

function openRewardPreviewModal(rewardType, rewardId) {
    let item;
    let previewHtml = '';

    switch(rewardType) {
        case 'title':
            item = TITLES_DATABASE.find(t => t.id === rewardId);
            if(item) {
                const colorClass = `rarity-${normalizeString(item.rarity)}-text`;
                previewHtml = `<p class="text-4xl font-bold ${colorClass}">${item.name}</p>`;
            }
            break;
        case 'border':
            item = BORDERS_DATABASE.find(b => b.id === rewardId);
            if(item) {
                 previewHtml = `
                    <div class="w-48 h-48 rounded-full mx-auto relative" style="${item.style}">
                        <div class="w-full h-full rounded-full flex items-center justify-center" style="background-color: rgb(29, 31, 43);">
                            <i class="fa-solid fa-user text-8xl text-gray-500"></i>
                        </div>
                    </div>`;
            }
            break;
        case 'collectible':
            item = COLLECTIBLES_DATABASE.find(c => c.id === rewardId);
            if(item) {
                previewHtml = `<i class="fa-solid ${item.icon} text-9xl ${item.color}"></i>`;
            }
            break;
    }

    if (!item) {
        previewHtml = `<p class="text-gray-400">Aperçu indisponible.</p>`;
    }

    const modalContent = `
    <div class="glass-card p-8 rounded-3xl w-full max-w-sm text-center flex flex-col items-center">
        <h3 class="text-xl font-bold mb-2">Aperçu de la récompense</h3>
        <p class="text-sm text-gray-400 mb-6">${item ? item.name : ''} - ${item ? item.rarity : ''}</p>
        <div class="h-48 flex items-center justify-center">
            ${previewHtml}
        </div>
        <button class="close-modal w-full mt-8 btn-primary">Fermer</button>
    </div>`;

    showModal(modalContent);
}
        
        function renderStatsList() {
            const practicedExercises = EXERCISE_DATABASE.filter(exo => state.exerciseStats.hasOwnProperty(exo.id));
            
            const sortedExercises = [...practicedExercises].sort((a, b) => {
                const statsA = state.exerciseStats[a.id]?.rankPr || { score: 0 };
                const statsB = state.exerciseStats[b.id]?.rankPr || { score: 0 };
                switch(state.statsSortOrder) {
                    case 'rank_desc': return (statsB.score - statsA.score) || a.name.localeCompare(b.name);
                    case 'rank_asc': return (statsA.score - statsB.score) || a.name.localeCompare(b.name);
                    default: return a.name.localeCompare(b.name);
                }
            });

            if (sortedExercises.length === 0) {
                return `<div class="text-center py-16"><i class="fa-solid fa-ranking-star text-5xl text-gray-600 mb-4"></i><p class="font-semibold text-lg">Aucun rang</p><p class="text-sm text-gray-500">Terminez une séance pour voir vos rangs ici.</p></div>`;
            }

            return sortedExercises.map(exercise => {
                const rankPrScore = state.exerciseStats[exercise.id]?.rankPr?.score || 0;
                const rankInfo = getRankFromScore(rankPrScore, exercise.id);
                
                const progress = rankInfo.progress;
                const tier1Width = Math.min(100, Math.max(0, (progress - 0) * 3));
                const tier2Width = Math.min(100, Math.max(0, (progress - 33) * 3));
                const tier3Width = Math.min(100, Math.max(0, (progress - 66) * 3));
                const rankColor = rankInfo.color.main;

                return `
                <button class="w-full text-left glass-card p-4 rounded-xl hover:bg-white/10 transition-colors duration-200" data-action="open-rank-details" data-exercise-id="${exercise.id}">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 flex-shrink-0">${getRankBadgeSVG(rankInfo.name)}</div>
                            <span class="font-semibold flex-1 truncate">${exercise.name}</span>
                        </div>
                        <span class="text-sm font-bold text-gray-200 w-auto text-right flex-shrink-0">${rankInfo.name}</span>
                    </div>
                    <div class="mt-3">
                        <div class="progress-bar-tiers">
                            <div style="background: linear-gradient(90deg, ${rankColor} ${tier1Width}%, transparent ${tier1Width}%)" class="opacity-40"></div>
                            <div style="background: linear-gradient(90deg, ${rankColor} ${tier2Width}%, transparent ${tier2Width}%)" class="opacity-70"></div>
                            <div style="background: linear-gradient(90deg, ${rankColor} ${tier3Width}%, transparent ${tier3Width}%)"></div>
                        </div>
                        <p class="text-right text-xs text-gray-400 mt-1">${rankInfo.progress < 100 ? `${rankInfo.progress}% vers ${rankInfo.nextRankName}` : 'Rang Maximum Atteint'}</p>
                    </div>
                </button>
                `;
            }).join('');
        }
        
        function launchConfetti() {
            const container = document.getElementById('page-container');
            if (!container) return;
            const confettiCount = 100;
            const colors = ['#A78BFA', '#F87171', '#34D399', '#F59E0B', '#6366F1', '#fde047'];
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.top = '-20px';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                container.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }
        
        function renderRankInfoDetails(rankName) {
            const color = getRankColor(rankName);
            const description = RANK_DESCRIPTIONS[rankName] || "";
            return `
                <div class="p-4 text-center">
                    <div class="w-32 h-32 mx-auto mb-4">${getRankBadgeSVG(rankName + ' I')}</div>
                    <h3 class="text-3xl font-bold" style="color: ${color.main}">${rankName}</h3>
                    <p class="text-gray-400 mt-2 text-sm italic">"${description}"</p>
                </div>
                <div class="mt-6 space-y-4 px-2">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg font-mono font-bold text-lg" style="color:${color.accent}; opacity:0.5">III</div>
                        <div>
                             <h4 class="font-bold">Tiers III</h4>
                             <p class="text-sm text-gray-400">Le début de votre ascension dans ce nouveau rang.</p>
                        </div>
                    </div>
                     <div class="flex items-center gap-4">
                        <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg font-mono font-bold text-lg" style="color:${color.accent}; opacity:0.75">II</div>
                        <div>
                             <h4 class="font-bold">Tiers II</h4>
                             <p class="text-sm text-gray-400">Vous maîtrisez les bases, continuez comme ça.</p>
                        </div>
                    </div>
                     <div class="flex items-center gap-4">
                        <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg font-mono font-bold text-lg" style="color:${color.accent};">I</div>
                        <div>
                             <h4 class="font-bold">Tiers I</h4>
                             <p class="text-sm text-gray-400">La promotion est proche ! Donnez tout !</p>
                        </div>
                    </div>
                </div>
                 <div class="mt-6 p-4 bg-black/20 rounded-xl mx-2">
                    <h4 class="font-bold text-center mb-2">Progression</h4>
                    <div class="progress-bar-tiers">
                        <div style="background: ${color.main}" class="opacity-50"></div>
                        <div style="background: ${color.main}" class="opacity-75"></div>
                        <div style="background: ${color.main}"></div>
                    </div>
                    <p class="text-xs text-gray-400 text-center mt-2">Atteignez 100% pour passer au rang suivant.</p>
                </div>
            `;
        }

        function openRankInfoModal() {
            const initialRank = state.rankInfoModal.selectedRank;
            
            const modalContent = `
                <div id="rank-info-modal" class="glass-card w-full max-w-md p-0 rounded-t-3xl border-none h-[85vh] flex flex-col overflow-hidden">
                    <header class="p-4 flex items-center justify-between flex-shrink-0 border-b border-white/10">
                        <h2 class="text-2xl font-bold">Système de Rangs</h2>
                        <button class="close-modal w-8 h-8 rounded-full bg-white/10">&times;</button>
                    </header>
                    <div class="flex-grow flex overflow-hidden">
                        <div class="w-1/3 border-r border-white/10 overflow-y-auto scrollbar-hide">
                            ${RANK_NAMES.map(rankName => `
                                <button class="rank-info-list-item w-full p-3 text-left flex items-center gap-3 transition-colors hover:bg-white/5 ${initialRank === rankName ? 'bg-white/10' : ''}" data-rank="${rankName}">
                                    <div class="w-8 h-8 flex-shrink-0">${getRankBadgeSVG(rankName + ' I')}</div>
                                    <span class="font-semibold text-sm">${rankName}</span>
                                </button>
                            `).join('')}
                        </div>
                        <div id="rank-info-details" class="w-2/3 p-4 overflow-y-auto scrollbar-hide">
                            ${renderRankInfoDetails(initialRank)}
                        </div>
                    </div>
                </div>
            `;
            showModal(modalContent, (modalWrapper) => {
                 modalWrapper.querySelector('.close-modal').onclick = closeModal;
                 modalWrapper.onclick = (e) => {
                    const rankItem = e.target.closest('.rank-info-list-item');
                    if (rankItem) {
                         const rankName = rankItem.dataset.rank;
                         state.rankInfoModal.selectedRank = rankName;
                         modalWrapper.querySelector('#rank-info-details').innerHTML = renderRankInfoDetails(rankName);
                         
                         modalWrapper.querySelectorAll('.rank-info-list-item').forEach(item => {
                             item.classList.remove('bg-white/10');
                             if(item.dataset.rank === rankName) item.classList.add('bg-white/10');
                         });
                    }
                 }
            });
        }

        function openStreakInfoModal(type) {
            const workoutRulesData = [
                { icon: 'fa-plus', color: 'text-green-400', text: "Effectuez au moins <strong>une séance</strong> dans la journée pour gagner <strong>+1</strong>." },
                { icon: 'fa-couch', color: 'text-blue-400', text: "Vous avez le droit à <strong>2 jours de repos</strong> consécutifs." },
                { icon: 'fa-xmark', color: 'text-red-400', text: "Après <strong>3 jours d'inactivité</strong>, votre série retombe à zéro." }
            ];
            const nutritionRulesData = [
                { icon: 'fa-check-double', color: 'text-green-400', text: "Atteignez vos <strong>2 objectifs</strong> (calories & protéines) pour gagner <strong>+1</strong>." },
                { icon: 'fa-check', color: 'text-yellow-400', text: "Atteignez <strong>1 seul objectif</strong> pour <strong>maintenir</strong> votre série actuelle." },
                { icon: 'fa-xmark', color: 'text-red-400', text: "Si vous n'atteignez <strong>aucun objectif</strong>, votre série retombe à zéro." }
            ];

            const isWorkout = type === 'workout';
            const title = isWorkout ? "Série d'Entraînements" : "Série Nutrition";
            const icon = isWorkout ? '🔥' : '<i class="fa-solid fa-fire-flame-curved text-green-400"></i>';
            const rulesData = isWorkout ? workoutRulesData : nutritionRulesData;

            const modalContent = `
                <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto flex flex-col">
                    <div class="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4 flex-shrink-0"></div>
                    <div class="text-center mb-6">
                        <div class="text-4xl mb-2">${icon}</div>
                        <h2 class="text-2xl font-bold">${title}</h2>
                    </div>
                    
                    <div class="space-y-3">
                        ${rulesData.map(rule => `
                            <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                                <div class="w-8 h-8 mt-1 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-900/50">
                                    <i class="fa-solid ${rule.icon} ${rule.color}"></i>
                                </div>
                                <p class="text-gray-300 text-sm leading-relaxed">${rule.text}</p>
                            </div>
                        `).join('')}
                    </div>

                    <button class="close-modal w-full mt-8 btn-primary">J'ai compris !</button>
                </div>
            `;
            
            showModal(modalContent);
        }

function openTagSelectionModal(type) {
    const isWorkout = type === 'workout';
    const availableTags = isWorkout ? state.workoutTags : state.mealTags;
    const itemTags = (isWorkout ? state.editingWorkout.tags : state.editingMeal.tags) || [];

    const modalContent = `
    <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto flex flex-col">
        <header class="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 class="text-2xl font-bold">Sélectionner des Tags</h2>
            <button id="manage-tags-btn" data-type="${type}" class="text-sm font-semibold text-violet-400 hover:text-violet-300">Gérer les tags</button>
        </header>
        <div class="flex-grow flex flex-wrap gap-3 py-2">
            ${availableTags.map(tag => {
                const isSelected = itemTags.includes(tag.id);
                const bgColor = isSelected ? tag.color : `${tag.color}30`; // Fond opaque si sélectionné, transparent sinon
    const textColor = isSelected ? `black` : tag.color; // Texte noir si sélectionné, coloré sinon
    const border = isSelected ? `2px solid ${tag.color}` : '2px solid transparent';

    return `
    <button class="toggle-tag-btn text-base font-semibold px-4 py-2 rounded-full transition-all duration-200" 
            data-tag-id="${tag.id}" 
            style="background-color:${bgColor}; color:${textColor}; border: ${border};">
        ${tag.name}
    </button>`
            }).join('')}
        </div>
        <button class="close-modal btn-primary w-full mt-6">Valider</button>
    </div>`;

    showModal(modalContent, (modalWrapper) => {
        modalWrapper.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.toggle-tag-btn');
            const manageBtn = e.target.closest('#manage-tags-btn');

            if (toggleBtn) {
                const tagId = toggleBtn.dataset.tagId;
            const currentItem = isWorkout ? state.editingWorkout : state.editingMeal;

            // 1. On met à jour le tag dans l'état de l'application
            if (currentItem.tags[0] === tagId) {
                currentItem.tags = []; // Désélectionne
            } else {
                currentItem.tags = [tagId]; // Sélectionne
            }

            // 2. On met à jour l'apparence de TOUS les boutons dans la modale SANS la fermer
            const allTagButtons = modalWrapper.querySelectorAll('.toggle-tag-btn');
    allTagButtons.forEach(button => {
        const buttonTagId = button.dataset.tagId;
        const tagData = availableTags.find(t => t.id === buttonTagId);
        
        if (tagData) {
            if (currentItem.tags[0] === buttonTagId) {
                // Style "sélectionné"
                button.style.backgroundColor = tagData.color;
                button.style.color = 'black';
                button.style.border = `2px solid ${tagData.color}`;
            } else {
                // Style "non sélectionné" mais coloré
                button.style.backgroundColor = `${tagData.color}30`;
                button.style.color = tagData.color;
                button.style.border = '2px solid transparent';
            }
        }
    });

    render();
}
        
        if (manageBtn) {
            // Cette partie ne change pas et devrait déjà fonctionner
            openTagEditorModal(type);
        }
    });
});
}

function openTagEditorModal(type) {
    const isWorkout = type === 'workout';
    let tagList = isWorkout ? state.workoutTags : state.mealTags;

    const renderTagList = () => {
        return tagList.map(tag => `
            <div class="flex items-center justify-between p-2 glass-card rounded-lg">
                <div class="flex items-center gap-3">
                    <input type="color" class="tag-color-input w-8 h-8 bg-transparent border-none rounded-md cursor-pointer" value="${tag.color}" data-tag-id="${tag.id}">
                    <span class="font-semibold">${tag.name}</span>
                </div>
                <button class="delete-tag-btn text-red-400 p-2" data-tag-id="${tag.id}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `).join('');
    };

    const modalContent = `
    <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[80vh] flex flex-col">
        <header class="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 class="text-2xl font-bold">Gérer les Tags</h2>
            <button class="close-modal w-8 h-8 rounded-full bg-white/10">&times;</button>
        </header>
        <div id="tag-editor-list" class="flex-grow overflow-y-auto space-y-2 pr-2 scrollbar-hide">${renderTagList()}</div>
        <div class="mt-4 pt-4 border-t border-white/10">
            <h3 class="font-bold mb-2">Ajouter un tag</h3>
            <div class="flex gap-2">
                <input id="new-tag-name" type="text" class="input-glass flex-grow" placeholder="Nom du tag">
                <input id="new-tag-color" type="color" class="w-14 h-14 bg-transparent p-1 rounded-lg" value="#A78BFA">
                <button id="add-new-tag-btn" class="btn-primary flex-shrink-0 px-4">Ajouter</button>
            </div>
        </div>
    </div>`;

    showModal(modalContent, (modalWrapper) => {
        const listContainer = modalWrapper.querySelector('#tag-editor-list');

        modalWrapper.addEventListener('click', (e) => {
            if (e.target.closest('#add-new-tag-btn')) {
                const nameInput = modalWrapper.querySelector('#new-tag-name');
                const colorInput = modalWrapper.querySelector('#new-tag-color');
                const name = nameInput.value.trim();
                if (name) {
                    const newTag = { id: generateId(), name, color: colorInput.value };
                    tagList.push(newTag);
                    nameInput.value = '';
                    listContainer.innerHTML = renderTagList();
                }
            }
            
            const deleteBtn = e.target.closest('.delete-tag-btn');
            if (deleteBtn) {
                const tagId = deleteBtn.dataset.tagId;
                // Supprimer le tag de la liste principale
                tagList = tagList.filter(t => t.id !== tagId);
                if (isWorkout) state.workoutTags = tagList; else state.mealTags = tagList;
                // Le retirer de toutes les séances/repas qui l'utilisent
                const items = isWorkout ? state.workouts : state.meals;
                items.forEach(item => {
                    if (item.tags) {
                        item.tags = item.tags.filter(id => id !== tagId);
                    }
                });
                listContainer.innerHTML = renderTagList();
            }
        });

        modalWrapper.addEventListener('input', (e) => {
            const colorInput = e.target.closest('.tag-color-input');
            if (colorInput) {
                const tagId = colorInput.dataset.tagId;
                const tag = tagList.find(t => t.id === tagId);
                if (tag) {
                    tag.color = colorInput.value;
                }
            }
        });
        
        modalWrapper.querySelector('.close-modal').addEventListener('click', () => {
            render(); // Re-render la page en arrière plan pour refléter les changements
        });
    });
}

function openCollectionModal() {
            const rarityOrder = { 'Commun': 1, 'Rare': 2, 'Épique': 3, 'Légendaire': 4, 'Mythique': 5 };

            const renderCollectionGrid = (sortOrder) => {
                const ownedItems = state.userProfile.inventory.collectibles.map(id => 
                    COLLECTIBLES_DATABASE.find(item => item.id === id)
                ).filter(Boolean); // Filtre pour enlever les items non trouvés

                ownedItems.sort((a, b) => {
                    switch(sortOrder) {
                        case 'rarity_asc':
                            return rarityOrder[a.rarity] - rarityOrder[b.rarity] || a.name.localeCompare(b.name);
                        case 'rarity_desc':
                            return rarityOrder[b.rarity] - rarityOrder[a.rarity] || a.name.localeCompare(b.name);
                        case 'alpha':
                        default:
                            return a.name.localeCompare(b.name);
                    }
                });

                if (ownedItems.length === 0) {
                    return `<div class="text-center text-gray-500 pt-16">Votre collection est vide. Achetez des box pour la remplir !</div>`;
                }

                return `<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    ${ownedItems.map(item => `
                        <div class="glass-card p-3 rounded-xl text-center">
                            <i class="fa-solid ${item.icon} text-4xl ${item.color}"></i>
                            <p class="text-xs font-bold mt-2 truncate">${item.name}</p>
                            <p class="text-[10px] text-gray-400">${item.rarity}</p>
                        </div>
                    `).join('')}
                </div>`;
            };

            const modalContent = `
            <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[85vh] flex flex-col">
                <header class="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 class="text-2xl font-bold">Ma Collection</h2>
                    <div class="relative custom-select-container w-48">
                         <button id="collection-sort-button" class="custom-select-button !py-2 !text-sm">
                            <span>Trier par...</span><i class="fa-solid fa-chevron-down text-gray-500"></i>
                         </button>
                         <div id="collection-sort-options" class="custom-select-options">
                            <div class="custom-select-option" data-value="alpha">Alphabétique</div>
                            <div class="custom-select-option" data-value="rarity_desc">Rareté ⬇</div>
                            <div class="custom-select-option" data-value="rarity_asc">Rareté ⬆</div>
                         </div>
                    </div>
                </header>
                <div id="collection-grid" class="flex-grow overflow-y-auto pr-2 scrollbar-hide">
                    ${renderCollectionGrid(state.collectionSortOrder || 'alpha')}
                </div>
            </div>`;

            showModal(modalContent, (modalWrapper) => {
                modalWrapper.querySelector('#collection-sort-button').onclick = () => {
                    modalWrapper.querySelector('#collection-sort-options').classList.toggle('active');
                };
                modalWrapper.querySelector('#collection-sort-options').onclick = (e) => {
                    const option = e.target.closest('.custom-select-option');
                    if (option) {
                        state.collectionSortOrder = option.dataset.value;
                        modalWrapper.querySelector('#collection-grid').innerHTML = renderCollectionGrid(state.collectionSortOrder);
                        modalWrapper.querySelector('#collection-sort-options').classList.remove('active');
                    }
                };
            });
        }

        function openRankDetailsModal(exerciseId) {
            const exercise = getExerciseById(exerciseId);
            const stats = state.exerciseStats[exerciseId] || { rankPr: null, allTimeBest: null };
            const rankPr = stats.rankPr;
            const allTimeBest = stats.allTimeBest;

            const rankInfo = getRankFromScore(rankPr?.score || 0, exerciseId);

            const rankPrDate = rankPr?.dateAchieved ? new Date(rankPr.dateAchieved).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Jamais';

            let rankPrText = 'Aucune donnée';
            if (rankPr?.bestSet) {
                rankPrText = `${rankPr.bestSet.weight} kg x ${rankPr.bestSet.reps} reps`;
            }

            let allTimeBestText = '';
            if (allTimeBest?.bestSet) {
                const bestPerfText = `${allTimeBest.bestSet.weight} kg x ${allTimeBest.bestSet.reps} reps`;
                if (!rankPr?.bestSet || (rankPr.bestSet.weight !== allTimeBest.bestSet.weight || rankPr.bestSet.reps !== allTimeBest.bestSet.reps)) {
                     allTimeBestText = `<p class="text-xs text-gray-500 mt-1 italic">(Meilleure perf. brute: ${bestPerfText})</p>`;
                }
            }

            const modalContent = `
                <div class="rank-modal-content p-8 rounded-3xl w-full max-w-sm text-center flex flex-col items-center">
                    <h3 class="font-semibold text-lg text-gray-300 mb-2 z-10">${exercise.name}</h3>
                    <div class="relative w-32 h-32 mb-4 rank-badge-container">${getRankBadgeSVG(rankInfo.name)}</div>
                    <div class="relative z-10 w-full">
                        <h2 class="text-4xl font-extrabold mb-1">${rankInfo.name}</h2>
                        ${rankInfo.sr > 0 ? `<p class="text-2xl font-bold text-yellow-300">+${rankInfo.sr} SR</p>` : ''}
                        <p class="text-sm text-gray-400 mb-6">${rankPrDate !== 'Jamais' ? 'Atteint le ' + rankPrDate : 'Jamais atteint'}</p>
                        
                        <div class="w-full bg-black/20 p-4 rounded-xl text-center">
                            <p class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Record de Rang</p>
                            <p class="text-2xl font-bold mt-1">${rankPrText}</p>
                            ${rankPr?.bodyWeightAtPR ? `<p class="text-xs text-gray-400">(à ${rankPr.bodyWeightAtPR} kg de poids de corps)</p>` : ''}
                            ${allTimeBestText}
                        </div>

                        <button class="close-modal w-full mt-8 bg-white/10 hover:bg-white/20 p-3 rounded-lg font-bold">Fermer</button>
                    </div>
                </div>
            `;
            showModal(modalContent);
        }

        function calculateGlobalRank(muscleGroup = null) {
            const practicedExercises = EXERCISE_DATABASE.filter(exo => state.exerciseStats.hasOwnProperty(exo.id));
            
            // --- Logique pour les Rangs par Groupe Musculaire ---
            if (muscleGroup) {
                const exercisesInGroup = practicedExercises.filter(exo => exo.groups && exo.groups[muscleGroup]);
                if (exercisesInGroup.length === 0) return { globalRank: 'Non classé', points: 0, globalRankColor: getRankColor('Novice') };
                
                let totalWeightedPoints = 0;
                let totalWeight = 0;

                exercisesInGroup.forEach(exo => {
                    const rankInfo = getRankFromScore(state.exerciseStats[exo.id]?.rankPr?.score || 0, exo.id);
                    const weight = exo.groups[muscleGroup];
                    totalWeightedPoints += rankInfo.points * weight;
                    totalWeight += weight;
                });

                if (totalWeight === 0) return { globalRank: 'Non classé', points: 0, globalRankColor: getRankColor('Novice') };
                
                const averagePoints = totalWeightedPoints / totalWeight;
                const finalRank = getRankFromPoints(averagePoints);

                return { globalRank: finalRank.name, points: finalRank.points, globalRankColor: getRankColor(finalRank.baseName) };
            }

            // --- Logique pour le Rang Global (moyenne des rangs de chaque groupe) ---
            if (practicedExercises.length === 0) return { globalRank: 'Non classé', globalRankColor: getRankColor('Novice') };

            const muscleGroupPoints = [];
            Object.keys(MUSCLE_GROUPS).forEach(groupKey => {
                const groupRank = calculateGlobalRank(groupKey);
                if (groupRank.globalRank !== 'Non classé') {
                    muscleGroupPoints.push(groupRank.points);
                }
            });

            if (muscleGroupPoints.length === 0) return { globalRank: 'Non classé', globalRankColor: getRankColor('Novice') };
            
            const totalPoints = muscleGroupPoints.reduce((sum, points) => sum + points, 0);
            const averageGlobalPoints = totalPoints / muscleGroupPoints.length;
            const finalGlobalRank = getRankFromPoints(averageGlobalPoints);

            return { globalRank: finalGlobalRank.name, globalRankColor: getRankColor(finalGlobalRank.baseName) };
        }

        function openEditIngredientModal(ingredientId) {
    if (!state.editingMeal) return;
    const ingredient = state.editingMeal.ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) return;

    const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm text-center">
        <h2 class="text-xl font-bold mb-4">Modifier: ${ingredient.name}</h2>
        <div class="relative">
            <input id="quantity-input-edit" type="number" class="input-glass text-center" value="${ingredient.quantity}">
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">grammes</span>
        </div>
        <div class="flex gap-4 mt-6">
            <button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button>
            <button id="confirm-quantity-edit-btn" class="w-full btn-primary">Valider</button>
        </div>
    </div>`;

    showModal(modalContent, (modalWrapper) => {
        modalWrapper.querySelector('#confirm-quantity-edit-btn').onclick = () => {
            const newQuantity = parseFloat(modalWrapper.querySelector('#quantity-input-edit').value);
            if (!newQuantity || newQuantity <= 0) return;
            
            // Étant donné que tu as déjà toutes les valeurs pour 100g de l'ingrédient original,
            // tu peux les stocker avec l'ingrédient et les utiliser pour recalculer ici.
            // Si tu as bien ajouté `code: foodItem.code,` dans addIngredientToMeal, tu peux t'en servir.
            // Sinon, nous allons devoir le chercher. Pour l'instant, on va le simplifier.
            
            // Supposons que tu stockes les infos pour 100g au moment de l'ajout
            // Si ton API te renvoie les valeurs pour 100g, et tu les stockes avec l'ingrédient,
            // tu pourrais faire ceci :
            // const originalNutrition = ingredient.nutritionPer100g; // Si tu l'as stocké
            // Si tu n'as pas stocké l'original, tu devrais refaire une requête.
            // Pour l'instant, la solution la plus simple est de ne pas changer les macros
            // de l'ingrédient, et de laisser la fonction saveMeal recalculer les totaux.

            ingredient.quantity = newQuantity;

            // Il n'y a rien d'autre à faire ici, le recalcul des totaux
            // du repas se fera dans saveMeal().
            
            closeModal();
            render();
        };
    });
}

        function openItemSelectorModal(type, slotIndex = null) {
    const profileToEdit = state.tempUserProfile || state.userProfile;
    let items, inventory, equippedId;

    switch(type) {
        case 'border':
            items = BORDERS_DATABASE;
            inventory = profileToEdit.inventory.borders;
            equippedId = profileToEdit.equipped.border;
            break;
        case 'title':
            items = TITLES_DATABASE;
            inventory = profileToEdit.inventory.titles;
            equippedId = profileToEdit.equipped.title;
            break;
        case 'collectible':
            items = COLLECTIBLES_DATABASE;
            inventory = profileToEdit.inventory.collectibles;
            equippedId = profileToEdit.equipped.showcase[slotIndex];
            break;
    }

    const ownedItems = inventory.map(id => items.find(i => i.id === id)).filter(Boolean);
    
    const renderItemList = () => {
        const sortedItems = [...ownedItems].sort((a, b) => {
            const rarityA = RARITY_ORDER[a.rarity] || 0;
            const rarityB = RARITY_ORDER[b.rarity] || 0;
            const order = state.itemSelectorSortOrder === 'rarity_asc' ? 1 : -1;
            const rarityComparison = rarityA - rarityB;
            return (rarityComparison * order) || a.name.localeCompare(b.name);
        });

        return sortedItems.map(item => {
            const isSelected = equippedId === item.id;
            let itemHtml = '';

            if (type === 'title') {
                // --- LOGIQUE CORRIGÉE POUR SÉPARER LE STYLE DE L'ICÔNE ET DU TEXTE ---
                let titleClass = ''; // Pour le texte du titre
                let iconClass = '';  // Pour l'icône (fa-tag)

                // 1. Déterminer la classe de l'icône en fonction de la rareté
                if (item.rarity === 'Divin') {
                    iconClass = 'animated-icon-divin';
                } else if (item.rarity === 'Créateur') {
                    iconClass = 'animated-icon-createur';
                } else {
                    iconClass = `rarity-${normalizeString(item.rarity)}-text`; // Fallback pour les autres
                }

                // 2. Déterminer la classe du texte (inchangé, gère les titres secrets)
                if (item.source === 'secret') {
                    if (item.id === 't-gymbro-originel') titleClass = 'title-gymbro-originel';
                    else if (item.id === 't-pompier-muscle' || item.id === 't-the-bench-monster') titleClass = 'title-pompier-muscle';
                    else if (item.id === 't-createur-supreme') titleClass = 'title-createur-supreme';
                    else titleClass = `rarity-${normalizeString(item.rarity)}-text`;
                } else {
                    titleClass = `rarity-${normalizeString(item.rarity)}-text`;
                }
                // --- FIN DE LA LOGIQUE CORRIGÉE ---
                
                itemHtml = `<div class="flex items-center gap-4">
                                <div class="w-8 flex-shrink-0 flex justify-center">
                                    <i class="fa-solid fa-tag text-2xl ${iconClass}"></i>
                                </div>
                                <p class="font-bold truncate ${titleClass}">${item.name}</p>
                            </div>`;

            } else if (type === 'border') {
                itemHtml = `<div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center relative" style="${item.style}">
                                    <div class="w-full h-full rounded-full flex items-center justify-center" style="background-color: rgb(29, 31, 43);">
                                        <i class="fa-solid fa-user text-xl text-gray-500"></i>
                                    </div>
                                </div>
                                <p class="font-bold truncate ${'rarity-' + normalizeString(item.rarity) + '-text'}">${item.name}</p>
                            </div>`;
            } else { // Collectible
                itemHtml = `<div class="flex items-center gap-4">
                                <div class="w-8 flex-shrink-0 flex justify-center">
                                    <i class="fa-solid ${item.icon} text-3xl ${item.color}"></i>
                                </div>
                                <p class="font-bold truncate ${'rarity-' + normalizeString(item.rarity) + '-text'}">${item.name}</p>
                            </div>`;
            }
            return `<button class="item-select-btn w-full glass-card p-4 rounded-lg transition-colors hover:bg-white/20 text-left ${isSelected ? 'border-2 border-violet-400' : ''}" data-item-id="${item.id}">
                        ${itemHtml}
                    </button>`;
        }).join('');
    };
    
    const isSlotEmpty = type === 'collectible' && equippedId === null;

    const modalContent = `
    <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto max-h-[70vh] flex flex-col">
        <header class="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 class="text-2xl font-bold">Choisir un objet</h2>
            <button id="toggle-item-sort-btn" class="glass-card rounded-full w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white" title="Inverser l'ordre de tri">
                <i class="fa-solid fa-arrows-up-down"></i>
            </button>
        </header>
        <div id="item-selector-list-container" class="flex-grow overflow-y-auto pr-2 scrollbar-hide">
            <div class="space-y-3">
                ${type === 'collectible' ? `<button class="item-select-btn w-full glass-card p-4 rounded-lg text-gray-400 text-left flex items-center gap-4 ${isSlotEmpty ? 'border-2 border-violet-400' : ''}" data-item-id="null"><i class="fa-solid fa-ban text-2xl w-8 text-center"></i><span class="font-bold">Emplacement vide</span></button>` : ''}
                ${renderItemList()}
            </div>
        </div>
        <button class="close-modal w-full mt-6 btn-primary">Fermer</button>
    </div>`;
    
    showModal(modalContent, (modalWrapper) => {
        modalWrapper.addEventListener('click', e => {
            const selectBtn = e.target.closest('.item-select-btn');
            if (selectBtn) {
                const itemId = selectBtn.dataset.itemId === 'null' ? null : selectBtn.dataset.itemId;
                switch(type) {
                    case 'border': profileToEdit.equipped.border = itemId; break;
                    case 'title': profileToEdit.equipped.title = itemId; break;
                    case 'collectible': profileToEdit.equipped.showcase[slotIndex] = itemId; break;
                }
                closeModal();
                render();
            }
        });
        modalWrapper.querySelector('#toggle-item-sort-btn').onclick = () => {
            state.itemSelectorSortOrder = state.itemSelectorSortOrder === 'rarity_desc' ? 'rarity_asc' : 'rarity_desc';
            const listContent = modalWrapper.querySelector('#item-selector-list-container .space-y-3');
            if(listContent) {
                const emptySlotButtonHtml = type === 'collectible' ? `<button class="item-select-btn w-full glass-card p-4 rounded-lg text-gray-400 text-left flex items-center gap-4 ${equippedId === null ? 'border-2 border-violet-400' : ''}" data-item-id="null"><i class="fa-solid fa-ban text-2xl w-8 text-center"></i><span class="font-bold">Emplacement vide</span></button>` : '';
                listContent.innerHTML = emptySlotButtonHtml + renderItemList();
            }
        };
    });
}

        function openGlobalRankDetailsModal() {
            const { globalRank, globalRankColor } = calculateGlobalRank();
            
            let muscleGroupsHtml = Object.keys(MUSCLE_GROUPS).map(key => {
                const { globalRank: groupRank, globalRankColor: groupColor } = calculateGlobalRank(key);
                return `
                    <div class="flex items-center justify-between py-3 border-b border-white/10">
                        <span class="font-semibold">${MUSCLE_GROUPS[key]}</span>
                        <span class="font-bold" style="color: ${groupColor.main};">${groupRank}</span>
                    </div>
                `;
            }).join('');

            const modalContent = `
                <div class="rank-modal-content p-8 rounded-3xl w-full max-w-sm text-center flex flex-col items-center">
                    <h3 class="font-semibold text-lg text-gray-300 mb-2 z-10">Rank Global</h3>
                    <div class="relative w-32 h-32 mb-4 rank-badge-container">
                        ${getRankBadgeSVG(globalRank)}
                    </div>
                    <div class="relative z-10 w-full">
                        <h2 class="text-4xl font-extrabold mb-6">${globalRank}</h2>
                        
                        <div class="w-full bg-black/20 p-4 rounded-xl text-left space-y-2">
                            ${muscleGroupsHtml}
                        </div>

                        <button class="close-modal w-full mt-8 bg-white/10 hover:bg-white/20 p-3 rounded-lg font-bold">Fermer</button>
                    </div>
                </div>
            `;
            showModal(modalContent);
        }

function openSessionHistoryModal() {
            const historyHtml = state.sessionHistory.slice().reverse().map(session => {
                const workout = state.workouts.find(w => w.id === session.workoutId) || {name: 'Séance supprimée'};
                const date = new Date(session.date).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'});
                return `<div class="p-3 glass-card rounded-lg">
                    <p class="font-bold">${workout.name}</p>
                    <p class="text-sm text-gray-400">${date} - ${formatDuration(session.duration)}</p>
                </div>`;
            }).join('');

            const modalContent = `
            <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[85vh] flex flex-col">
                <header class="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 class="text-2xl font-bold">Historique des Séances</h2>
                    <button class="close-modal w-8 h-8 rounded-full bg-white/10">&times;</button>
                </header>
                <div class="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                    ${historyHtml || '<p class="text-gray-500 text-center mt-8">Aucune séance terminée pour le moment.</p>'}
                </div>
            </div>`;
            showModal(modalContent);
        }

        function openSessionRecapModal() {
            const modalContent = `
                <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[80vh] flex flex-col">
                    <h2 class="text-2xl font-bold mb-4">Récapitulatif de la séance</h2>
                    <div class="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                        ${state.activeWorkoutSession.workout.exercises.map((exo, index) => {
                             const exercise = getExerciseById(exo.exerciseId);
                             const perf = state.activeWorkoutSession.performance[index];
                             const setsDone = perf.sets.length;
                             const isCompleted = setsDone >= exo.sets;
                             let setsHtml = perf.sets.map((set, setIndex) => `<div class="text-sm text-gray-400">Série ${setIndex + 1}: ${set.weight} kg x ${set.reps} reps</div>`).join('');
                             if (setsDone === 0) setsHtml = `<div class="text-sm text-gray-600 italic">Pas encore commencé</div>`;
                            return `<div class="p-4 rounded-lg ${isCompleted ? 'bg-green-500/10' : 'bg-black/20'}">
                                <div class="flex justify-between items-center">
                                    <p class="font-bold">${exercise.name}</p>
                                    <p class="text-sm font-semibold ${isCompleted ? 'text-green-400' : 'text-gray-400'}">${setsDone}/${exo.sets} séries</p>
                                </div>
                                <div class="mt-2 pl-4 border-l-2 border-white/10">${setsHtml}</div>
                            </div>`;
                        }).join('')}
                    </div>
                    <button class="close-modal w-full mt-6 bg-white/10 hover:bg-white/20 p-3 rounded-lg font-bold">Retour</button>
                </div>
            `;
            showModal(modalContent);
        }

        function openAddExerciseModal() {
            const modalContent = `<div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[80vh] flex flex-col"><header class="flex justify-between items-center mb-4 flex-shrink-0"><h2 class="text-2xl font-bold">Ajouter un exercice</h2><button class="close-modal w-8 h-8 rounded-full bg-white/10">&times;</button></header><div class="relative mb-4 flex-shrink-0"><i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i><input id="search-exercise-input" type="text" placeholder="Rechercher..." class="input-glass pl-12 w-full"></div><div id="exercise-selection-list" class="flex-grow overflow-y-auto space-y-2 pr-2"></div></div>`;
            
            showModal(modalContent, (modalWrapper) => {
                const searchInput = modalWrapper.querySelector('#search-exercise-input');
                const selectionList = modalWrapper.querySelector('#exercise-selection-list');

                const renderList = (filter = '') => {
                    const normalizedFilter = filter.toLowerCase();
                    const filteredExercises = EXERCISE_DATABASE.filter(ex => ex.name.toLowerCase().includes(normalizedFilter));
                    selectionList.innerHTML = filteredExercises.map(ex => `<button class="select-exercise-btn w-full text-left glass-card hover:bg-white/20 p-3 rounded-lg" data-exercise-id="${ex.id}">${ex.name}</button>`).join('');
                };

                selectionList.onclick = (e) => {
                    const btn = e.target.closest('.select-exercise-btn');
                    if (btn) {
                        const newExercise = { id: generateId(), exerciseId: btn.dataset.exerciseId, sets: 3, reps: 10, rest: 60 };
                        state.editingWorkout.exercises.push(newExercise);
                        closeModal();
                        render();
                    }
                };
                
                searchInput.oninput = (e) => renderList(e.target.value);
                renderList();
            });
        }

        function openEditExerciseModal(instanceId) {
             const exercise = state.editingWorkout.exercises.find(ex => ex.id === instanceId);
             const modalContent = `<div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-[80vh] flex flex-col"><h2 class="text-2xl font-bold mb-4">${getExerciseById(exercise.exerciseId).name}</h2><div class="grid grid-cols-2 gap-4"><div><label class="text-sm text-gray-400">Séries</label><input id="sets-input" type="number" class="input-glass" value="${exercise.sets}"></div><div><label class="text-sm text-gray-400">Répétitions</label><input id="reps-input" type="number" class="input-glass" value="${exercise.reps}"></div><div><label class="text-sm text-gray-400">Repos (s)</label><input id="rest-input" type="number" class="input-glass" value="${exercise.rest}"></div></div><div class="flex gap-4 mt-auto pt-4"><button id="delete-exercise-btn" class="w-full glass-card p-3 rounded-lg text-red-400 font-bold">Supprimer</button><button id="save-exercise-btn" class="w-full btn-primary">OK</button></div></div>`;
             
             showModal(modalContent, (modalWrapper) => {
                modalWrapper.querySelector('#save-exercise-btn').onclick = () => {
                    exercise.sets = parseInt(modalWrapper.querySelector('#sets-input').value) || 0;
                    exercise.reps = parseInt(modalWrapper.querySelector('#reps-input').value) || 0;
                    exercise.rest = parseInt(modalWrapper.querySelector('#rest-input').value) || 0;
                    closeModal();
                    render();
                };
                modalWrapper.querySelector('#delete-exercise-btn').onclick = () => {
                    state.editingWorkout.exercises = state.editingWorkout.exercises.filter(ex => ex.id !== instanceId);
                    closeModal();
                    render();
                };
            });
        }

        function openPlanModal(itemId, date, type) {
            const item = type === 'workout' ? state.workouts.find(i => i.id === itemId) : state.meals.find(i => i.id === itemId);
            if (!item) return;

            const [year, month, day] = date.split('-');
            const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm"><h2 class="text-xl font-bold mb-2">Planifier: ${item.name}</h2><p class="text-gray-400 mb-6">${new Date(year, parseInt(month) - 1, day).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p><div class="space-y-4"><div><label class="text-sm text-gray-400">Heure</label><input id="plan-time-input" type="time" class="input-glass" value="12:00"></div><div><label class="text-sm text-gray-400">Note (optionnel)</label><input id="plan-note-input" type="text" class="input-glass" placeholder="Ex: Focus sur la technique"></div></div><div class="flex gap-4 mt-8"><button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button><button id="confirm-plan" class="w-full btn-primary">Planifier</button></div></div>`;
            
            showModal(modalContent, (modalWrapper) => {
                modalWrapper.querySelector('#confirm-plan').onclick = () => {
                    const newEvent = { id: generateId(), date, refId: item.id, title: item.name, time: modalWrapper.querySelector('#plan-time-input').value, note: modalWrapper.querySelector('#plan-note-input').value, type, completed: false, validated: false };
                    state.calendarEvents.push(newEvent);
                    closeModal();
                    render();
                };
            });
        }

        function openDayDetailsModal(date, events) {
            const [year, month, day] = date.split('-');
            const formattedDate = new Date(year, parseInt(month) - 1, day).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
            
            const modalContent = `<div class="glass-card p-6 rounded-3xl w-full max-w-sm"><h2 class="text-xl font-bold mb-6">${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</h2><div id="day-details-content" class="space-y-4 max-h-64 overflow-y-auto">${events.sort((a,b) => a.time.localeCompare(b.time)).map(event => `<div class="flex items-center justify-between glass-card p-3 rounded-lg"><div><p class="font-bold ${event.completed || event.validated ? 'text-gray-400 line-through' : ''}">${event.title} <span class="text-sm text-gray-400 font-normal">à ${event.time}</span></p>${event.note ? `<p class="text-sm text-gray-300 mt-1 italic">"${event.note}"</p>` : ''}</div><button class="delete-event-btn text-red-400 hover:text-red-300 p-2 ml-2" data-event-id="${event.id}"><i class="fa-solid fa-trash-can"></i></button></div>`).join('')}</div><button class="close-modal w-full mt-6 glass-card p-3 rounded-lg font-bold">Fermer</button></div>`;
            
            showModal(modalContent, (modalWrapper) => {
                modalWrapper.querySelector('#day-details-content').onclick = e => {
                    const deleteBtn = e.target.closest('.delete-event-btn');
                    if (deleteBtn) {
                        state.calendarEvents = state.calendarEvents.filter(ev => ev.id !== deleteBtn.dataset.eventId);
                        closeModal();
                        render();
                    }
                };
            });
        }

        function openDashboardHelpModal() {
            const modalContent = `
            <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto flex flex-col">
                <header class="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 class="text-2xl font-bold">Aide du Tableau de Bord</h2>
                    <button class="close-modal w-8 h-8 rounded-full bg-white/10">&times;</button>
                </header>
                <div class="flex-grow overflow-y-auto space-y-4 pr-2 text-gray-300">
                    <div>
                        <h3 class="font-bold text-lg text-white mb-1">Analyse de Progression</h3>
                        <p class="text-sm">Ce graphique montre l'évolution de votre force pour un exercice donné. L'axe vertical représente votre 1-Rep Max (1RM) estimé en kg, et l'axe horizontal représente le temps. Une courbe ascendante est le signe d'une belle progression !</p>
                    </div>
                     <div>
                        <h3 class="font-bold text-lg text-white mb-1">1-Rep Max (1RM) Estimé</h3>
                        <p class="text-sm">Le 1RM est la charge maximale que vous pourriez théoriquement soulever en une seule répétition. Nous l'estimons à partir de votre meilleure performance enregistrée sur l'exercice sélectionné. C'est un excellent indicateur de votre force maximale.</p>
                    </div>
                     <div>
                        <h3 class="font-bold text-lg text-white mb-1">Vos Insights</h3>
                        <p class="text-sm">Cette section analyse vos habitudes. Le 'Jour fétiche' est le jour où vous vous entraînez le plus souvent, et le 'Focus sur' est le groupe musculaire que vous sollicitez le plus fréquemment. Ces données deviennent fiables après 3 séances enregistrées.</p>
                    </div>
                </div>
            </div>`;
            showModal(modalContent);
        }

        function openVolumeModal() {
            let currentPeriod = 'all';

            const renderContent = (period) => {
                const volumeData = getVolumeDetails(period);
                const totalVolume = volumeData.reduce((sum, [, vol]) => sum + vol, 0);
                const contentEl = document.getElementById('details-content');
                
                if (contentEl) {
                    contentEl.innerHTML = volumeData.length > 0 ? volumeData.map(([group, vol]) => {
                        const percentage = totalVolume > 0 ? (vol / totalVolume * 100).toFixed(1) : 0;
                        return `
                        <div class="mb-2">
                            <div class="flex justify-between items-center text-sm mb-1">
                                <span class="font-bold">${MUSCLE_GROUPS[group]}</span>
                                <span class="text-gray-400">${formatVolume(vol)}</span>
                            </div>
                            <div class="w-full bg-black/20 rounded-full h-2.5">
                                <div class="bg-violet-500 h-2.5 rounded-full" style="width: ${percentage}%"></div>
                            </div>
                        </div>`;
                    }).join('') : '<p class="text-gray-500 text-center">Aucune donnée pour cette période.</p>';
                }
                
                // Met à jour le bouton actif
                document.querySelectorAll('#period-filter button').forEach(btn => {
                    btn.classList.toggle('btn-primary', btn.dataset.period === period);
                    btn.classList.toggle('glass-card', btn.dataset.period !== period);
                });
            };

            const modalContent = `
            <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto flex flex-col">
                <header class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">Volume par Groupe Musculaire</h2>
                    <button class="close-modal w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">&times;</button>
                </header>
                <div id="period-filter" class="flex justify-between gap-2 mb-4 text-sm">
                    <button data-period="7d" class="flex-1 p-2 rounded-lg glass-card">7j</button>
                    <button data-period="30d" class="flex-1 p-2 rounded-lg glass-card">30j</button>
                    <button data-period="365d" class="flex-1 p-2 rounded-lg glass-card">1a</button>
                    <button data-period="all" class="flex-1 p-2 rounded-lg glass-card">Total</button>
                </div>
                <div id="details-content" class="space-y-3"></div>
            </div>`;
            
            showModal(modalContent, (modal) => {
                modal.querySelector('#period-filter').addEventListener('click', e => {
                    if (e.target.dataset.period) {
                        currentPeriod = e.target.dataset.period;
                        renderContent(currentPeriod);
                    }
                });
                renderContent(currentPeriod); // Affichage initial
            });
        }

        function openGoalsModal() {
            const modalContent = `
            <div class="glass-card p-6 rounded-3xl w-full max-w-sm">
                <h2 class="text-xl font-bold mb-4">Modifier les Objectifs</h2>
                <div class="space-y-4">
                    <div>
                        <label for="goal-calories-modal" class="text-sm font-semibold text-gray-400">Calories (kcal)</label>
                        <input id="goal-calories-modal" type="number" class="input-glass mt-1" value="${state.userGoals.calories}">
                    </div>
                    <div>
                        <label for="goal-protein-modal" class="text-sm font-semibold text-gray-400">Protéines (g)</label>
                        <input id="goal-protein-modal" type="number" class="input-glass mt-1" value="${state.userGoals.protein}">
                    </div>
                </div>
                <div class="flex gap-4 mt-8">
                    <button class="cancel w-full glass-card p-3 rounded-lg font-bold">Annuler</button>
                    <button id="save-goals-btn-modal" class="w-full btn-primary">Valider</button>
                </div>
            </div>`;

            showModal(modalContent, (modal) => {
                modal.querySelector('#save-goals-btn-modal').onclick = () => {
                    state.userGoals.calories = parseInt(document.getElementById('goal-calories-modal').value) || 0;
                    state.userGoals.protein = parseInt(document.getElementById('goal-protein-modal').value) || 0;
                    showToast('Objectifs mis à jour !');
                    closeModal();
                    // On redessine la page d'accueil pour que les stats de calories/protéines se mettent à jour
                    if(state.activePage === 'Accueil') render(); 
                };
            });
        }

        function openTimeModal() {
            let currentPeriod = 'all';
            let currentUnit = 'time'; // 'time' ou 'percent'
            let timeChart = null;

            const renderChart = () => {
                if (timeChart) timeChart.destroy();
                const sessions = filterSessionsByPeriod(currentPeriod);
                const canvas = document.getElementById('time-day-chart');
                if (!canvas) return;

                const timeByDay = [0, 0, 0, 0, 0, 0, 0];
                sessions.forEach(session => {
                    let day = new Date(session.date).getDay() - 1;
                    if (day === -1) day = 6;
                    timeByDay[day] += session.duration;
                });

                const totalMs = timeByDay.reduce((sum, ms) => sum + ms, 0);
                const chartData = currentUnit === 'percent' ? timeByDay.map(ms => totalMs > 0 ? (ms / totalMs * 100).toFixed(1) : 0) : timeByDay;

                timeChart = new Chart(canvas.getContext('2d'), {
                    type: 'bar',
                    data: { 
                        labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], 
                        datasets: [{ 
                            data: chartData, 
                            backgroundColor: 'rgba(167, 139, 250, 0.6)',
                            borderColor: 'rgba(167, 139, 250, 1)',
                            borderWidth: 1,
                            borderRadius: 4
                        }] 
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => currentUnit === 'percent' ? `${ctx.raw}%` : formatDuration(ctx.raw)
                                }
                            }
                        },
                        scales: {
                            y: { 
                                beginAtZero: true, 
                                ticks: { 
                                    color: '#9CA3AF',
                                    callback: (value) => currentUnit === 'percent' ? `${value}%` : formatDuration(value).replace(/min|s/g, '')
                                }, 
                                grid: { color: 'rgba(255,255,255,0.05)' } 
                            },
                            x: { ticks: { color: '#9CA3AF' }, grid: { display: false } }
                        }
                    }
                });
            };

            const renderContent = () => {
                const timeData = getTimeDetails(currentPeriod);
                const contentEl = document.getElementById('details-content');
                if (contentEl) {
                    contentEl.innerHTML = `
                        <div class="grid grid-cols-3 gap-3 text-center">
                            <div class="glass-card p-3 rounded-xl"><p class="text-xs text-gray-400">Temps Total</p><p class="text-xl font-bold">${timeData.total}</p></div>
                            <div class="glass-card p-3 rounded-xl"><p class="text-xs text-gray-400">Durée Moyenne</p><p class="text-xl font-bold">${timeData.avg}</p></div>
                            <div class="glass-card p-3 rounded-xl"><p class="text-xs text-gray-400">Séance Max</p><p class="text-xl font-bold">${timeData.longest}</p></div>
                        </div>
                    `;
                }
                renderChart();
                document.querySelectorAll('#period-filter button').forEach(btn => btn.classList.toggle('btn-primary', btn.dataset.period === currentPeriod));
                document.querySelectorAll('#unit-toggle button').forEach(btn => btn.classList.toggle('btn-primary', btn.dataset.unit === currentUnit));
            };

            const modalContent = `
            <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto flex flex-col">
                <header class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">Analyse du Temps</h2>
                    <button class="close-modal w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">&times;</button>
                </header>
                <div id="period-filter" class="flex justify-between gap-2 mb-4 text-sm">
                    <button data-period="7d" class="flex-1 p-2 rounded-lg glass-card">7j</button>
                    <button data-period="30d" class="flex-1 p-2 rounded-lg glass-card">30j</button>
                    <button data-period="365d" class="flex-1 p-2 rounded-lg glass-card">1a</button>
                    <button data-period="all" class="flex-1 p-2 rounded-lg glass-card">Total</button>
                </div>
                <div id="details-content" class="mb-4"></div>
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-semibold">Répartition par jour</h3>
                    <div id="unit-toggle" class="flex text-xs border border-gray-700 rounded-full p-1">
                        <button data-unit="time" class="px-3 py-1 rounded-full">Temps</button>
                        <button data-unit="percent" class="px-3 py-1 rounded-full">Pourcent</button>
                    </div>
                </div>
                <div class="h-40"><canvas id="time-day-chart"></canvas></div>
            </div>`;

            showModal(modalContent, (modal) => {
                modal.addEventListener('click', e => {
                    const target = e.target.closest('button');
                    if (!target) return;

                    if (target.dataset.period) { 
                        currentPeriod = target.dataset.period; 
                        renderContent(); 
                    }
                    if (target.dataset.unit) { 
                        currentUnit = target.dataset.unit; 
                        renderContent(); 
                    }
                });
                renderContent();
            });
        }
        
        function openSessionsModal() {
            let currentPeriod = 'all';
            let currentUnit = 'count'; // 'count' ou 'percent'
            let dayChart = null;

            const renderChart = () => {
                if (dayChart) dayChart.destroy();
                const sessions = filterSessionsByPeriod(currentPeriod);
                const canvas = document.getElementById('sessions-day-chart');
                if (!canvas) return;

                const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Lundi -> Dimanche
                sessions.forEach(session => {
                    let day = new Date(session.date).getDay() - 1;
                    if (day === -1) day = 6;
                    dayCounts[day]++;
                });
                
                const total = dayCounts.reduce((sum, count) => sum + count, 0);
                const chartData = currentUnit === 'percent' ? dayCounts.map(c => total > 0 ? (c / total * 100).toFixed(1) : 0) : dayCounts;

                dayChart = new Chart(canvas.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
                        datasets: [{
                            data: chartData,
                            backgroundColor: 'rgba(167, 139, 250, 0.6)',
                            borderColor: 'rgba(167, 139, 250, 1)',
                            borderWidth: 1,
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { 
                            legend: { display: false }, 
                            tooltip: { callbacks: { label: (ctx) => `${ctx.raw}${currentUnit === 'percent' ? '%' : ''}` } } 
                        },
                        scales: { 
                            y: { beginAtZero: true, ticks: { color: '#9CA3AF', precision: 0 }, grid: { color: 'rgba(255,255,255,0.05)' } }, 
                            x: { ticks: { color: '#9CA3AF' }, grid: { display: false } } 
                        }
                    }
                });
            };

            const renderContent = () => {
                const sessionData = getSessionDetails(currentPeriod);
                const contentEl = document.getElementById('details-content');
                if (contentEl) {
                    contentEl.innerHTML = `
                        <div class="grid grid-cols-2 gap-3 text-center">
                            <div class="glass-card p-3 rounded-xl"><p class="text-xs text-gray-400">Séances</p><p class="text-2xl font-bold">${sessionData.total}</p></div>
                            <div class="glass-card p-3 rounded-xl"><p class="text-xs text-gray-400">Fréquence</p><p class="text-lg font-bold">${sessionData.avgPerWeek} <span class="text-xs">/sem</span></p></div>
                        </div>
                        <div class="glass-card p-3 rounded-xl mt-3 text-center">
                            <p class="text-xs text-gray-400">Séance Favorite</p>
                            <p class="font-bold truncate">${sessionData.mostFrequent}</p>
                        </div>
                    `;
                }
                renderChart();
                document.querySelectorAll('#period-filter button').forEach(btn => btn.classList.toggle('btn-primary', btn.dataset.period === currentPeriod));
                document.querySelectorAll('#unit-toggle button').forEach(btn => btn.classList.toggle('btn-primary', btn.dataset.unit === currentUnit));
            };
            
            const modalContent = `
            <div class="glass-card w-full max-w-md p-6 rounded-t-3xl border-none h-auto flex flex-col">
                <header class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">Analyse des Séances</h2>
                    <button class="close-modal w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">&times;</button>
                </header>
                <div id="period-filter" class="flex justify-between gap-2 mb-4 text-sm">
                    <button data-period="7d" class="flex-1 p-2 rounded-lg glass-card">7j</button>
                    <button data-period="30d" class="flex-1 p-2 rounded-lg glass-card">30j</button>
                    <button data-period="365d" class="flex-1 p-2 rounded-lg glass-card">1a</button>
                    <button data-period="all" class="flex-1 p-2 rounded-lg glass-card">Total</button>
                </div>
                <div id="details-content" class="mb-4"></div>
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-semibold">Répartition par jour</h3>
                    <div id="unit-toggle" class="flex text-xs border border-gray-700 rounded-full p-1">
                        <button data-unit="count" class="px-3 py-1 rounded-full">Nombre</button>
                        <button data-unit="percent" class="px-3 py-1 rounded-full">Pourcent</button>
                    </div>
                </div>
                <div class="h-40"><canvas id="sessions-day-chart"></canvas></div>
            </div>`;

            showModal(modalContent, (modal) => {
                modal.addEventListener('click', e => {
                    const target = e.target.closest('button');
                    if (!target) return;

                    if (target.dataset.period) { 
                        currentPeriod = target.dataset.period; 
                        renderContent(); 
                    }
                    if (target.dataset.unit) { 
                        currentUnit = target.dataset.unit; 
                        renderContent(); 
                    }
                });
                renderContent();
            });
        }

        function showModal(content, setupCallback, closeCallback) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fixed inset-0 modal-bg flex justify-center items-end sm:items-center p-0 sm:p-4 pointer-events-auto animate-fadeIn';
    wrapper.innerHTML = content;
    
    const performClose = () => closeModal(closeCallback);

    wrapper.addEventListener('click', (e) => { 
        if (e.target === wrapper) performClose();
    });

    wrapper.querySelectorAll('.close-modal, .cancel').forEach(btn => {
        btn.onclick = performClose;
    });

    modalContainer.innerHTML = '';
    modalContainer.appendChild(wrapper);
    modalContainer.classList.remove('pointer-events-none');
    
    if (setupCallback) setupCallback(wrapper);
}

        function closeModal(callback) {
    // Retire la modale du DOM immédiatement
    modalContainer.innerHTML = '';
    modalContainer.classList.add('pointer-events-none');
    
    // Déclenche le callback immédiatement pour une transition instantanée
    if (typeof callback === 'function') {
        callback();
    }
}
        
        // --- INITIAL RENDER ---
        function initializeApp() {
            const savedPic = localStorage.getItem('fitflow_profile_pic');
            if (savedPic) {
                state.userProfile.profilePicUrl = savedPic;
            }
            updateStreaks();
            render();
        }
        
        initializeApp();

    </script>
</body>
</html>
