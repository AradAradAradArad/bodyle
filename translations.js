// Translations for the application
const translations = {
    he: {
        appTitle: "Body Guess",
        gameObjective: "היום אני רוצה לטייל מ-",
        to: "ל-",
        difficultyLabel: "רמת קושי:",
        startPointLabel: "בחר נקודת התחלה:",
        selectStartPoint: "-- בחר נקודת התחלה --",
        guessPlaceholder: "הכנס שם של מבנה אנטומי...",
        guessButton: "נחש",
        pastGuesses: "ניחושים קודמים (לחץ להצגה/הסתרה):",
        hintsLabel: "קבל רמז",
        hintNext: "הצג את המבנה הבא",
        hintAll: "הצג את כל המבנים",
        hintInitials: "הצג ראשי תיבות",
        howToPlay: "איך לשחק",
        instructions: "תן שמות למבנים אנטומיים כדי לטייל מ-",
        startPoint: "נקודת ההתחלה",
        endPoint: "נקודת הסיום",
        instructionsEnd: "נסה להגיע במינימום ניחושים!",
        scoring: "ניקוד",
        connections: "חיבורים",
        credits: "קרדיטים",
        selectStartFirst: "אנא בחר נקודת התחלה תחילה",
        alreadyWon: "כבר ניצחת! התחל משחק חדש",
        noMoreGuesses: "סיימת את כל הניחושים!",
        enterGuess: "אנא הכנס ניחוש",
        notFound: "לא נמצא ברשימת המבנים",
        tryAgain: "נסה שוב עם שם מדויק יותר",
        alreadyGuessed: "כבר ניחשת את זה!",
        correct: "נכון!",
        onPath: "נמצא במסלול!",
        notOnPath: "לא נמצא במסלול",
        won: "ניצחת! הגעת ליעד ב-",
        guesses: "ניחושים!",
        lost: "הפסדת! המסלול המלא מוצג במפה למטה.",
        difficulty: {
            bones: "עצמות (קל)",
            organs: "איברים (קל)",
            muscles: "שרירים (בינוני)",
            vessels: "כלי דם (קשה)",
            nerves: "עצבים (קשה)"
        }
    },
    en: {
        appTitle: "Body Guess",
        gameObjective: "Today I'd like to travel from",
        to: "to",
        difficultyLabel: "Difficulty Level:",
        startPointLabel: "Select Starting Point:",
        selectStartPoint: "-- Select Starting Point --",
        guessPlaceholder: "Enter an anatomical structure name...",
        guessButton: "Guess",
        pastGuesses: "Past guesses (click to show/hide):",
        hintsLabel: "Get a hint",
        hintNext: "Show next structure",
        hintAll: "Show all structures",
        hintInitials: "Show initials",
        howToPlay: "How to Play",
        instructions: "Name anatomical structures to travel from",
        startPoint: "Starting Point",
        endPoint: "End Point",
        instructionsEnd: "Try to get there in the fewest guesses!",
        scoring: "Scoring",
        connections: "Connections",
        credits: "Credits",
        selectStartFirst: "Please select a starting point first",
        alreadyWon: "You already won! Start a new game",
        noMoreGuesses: "You've used all your guesses!",
        enterGuess: "Please enter a guess",
        notFound: "not found in the structures list",
        tryAgain: "Try again with a more accurate name",
        alreadyGuessed: "You already guessed that!",
        correct: "Correct!",
        onPath: "is on the path!",
        notOnPath: "is not on the path",
        won: "You won! Reached the destination in",
        guesses: "guesses!",
        lost: "You lost! The full path is shown on the map below.",
        difficulty: {
            bones: "Bones (Easy)",
            organs: "Organs (Easy)",
            muscles: "Muscles (Medium)",
            vessels: "Blood Vessels (Hard)",
            nerves: "Nerves (Hard)"
        }
    }
};

// Current language state
let currentLanguage = 'he';

// Function to translate text
function t(key, ...args) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    if (value === undefined) {
        return key; // Return key if translation not found
    }
    
    // Replace placeholders if any
    if (args.length > 0) {
        return value.replace(/\{(\d+)\}/g, (match, index) => {
            return args[parseInt(index)] || match;
        });
    }
    
    return value;
}

// Function to switch language
function switchLanguage() {
    currentLanguage = currentLanguage === 'he' ? 'en' : 'he';
    updateLanguage();
    // Save to localStorage
    localStorage.setItem('bodyGuessLanguage', currentLanguage);
}

// Function to update all text elements
function updateLanguage() {
    // Update document direction
    document.documentElement.dir = currentLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update header
    document.getElementById('appTitle').textContent = t('appTitle');
    document.getElementById('langText').textContent = currentLanguage === 'he' ? 'EN' : 'עב';
    
    // Update game objective
    const gameObjective = document.getElementById('gameObjective');
    gameObjective.innerHTML = `${t('gameObjective')} <span id="startPoint" class="start-color">?</span> ${t('to')} <span id="endPoint" class="end-color">?</span>`;
    
    // Update labels
    document.querySelector('.difficulty-selector label').textContent = t('difficultyLabel');
    document.querySelector('.start-point-selector label').textContent = t('startPointLabel');
    
    // Update select options
    const difficultySelect = document.getElementById('difficultySelect');
    difficultySelect.innerHTML = `
        <option value="bones">${t('difficulty.bones')}</option>
        <option value="organs">${t('difficulty.organs')}</option>
        <option value="muscles">${t('difficulty.muscles')}</option>
        <option value="vessels">${t('difficulty.vessels')}</option>
        <option value="nerves">${t('difficulty.nerves')}</option>
    `;
    
    const startPointSelect = document.getElementById('startPointSelect');
    if (startPointSelect.options.length > 0) {
        startPointSelect.options[0].textContent = t('selectStartPoint');
    }
    
    // Update input placeholder
    document.getElementById('guessInput').placeholder = t('guessPlaceholder');
    
    // Update buttons
    const guessBtn = document.getElementById('guessBtn');
    guessBtn.textContent = `${t('guessButton')} (0/7)`;
    
    document.getElementById('toggleGuesses').textContent = t('pastGuesses');
    document.querySelector('.hints-section p').textContent = `${t('hintsLabel')} (0/3):`;
    document.getElementById('hintNext').textContent = t('hintNext');
    document.getElementById('hintAll').textContent = t('hintAll');
    document.getElementById('hintInitials').textContent = t('hintInitials');
    
    // Update modal
    const modal = document.getElementById('howToPlayModal');
    if (modal) {
        const modalHeader = modal.querySelector('.modal-header h2');
        if (modalHeader) modalHeader.textContent = `? ${t('howToPlay')}`;
        
        const instructions = modal.querySelector('.instructions');
        if (instructions) {
            instructions.innerHTML = `${t('instructions')} <span class="start-color">${t('startPoint')}</span> ${t('to')} <span class="end-color">${t('endPoint')}</span>. ${t('instructionsEnd')}`;
        }
    }
    
    // Re-populate start point select if game is initialized
    if (typeof populateStartPointSelect === 'function') {
        populateStartPointSelect();
    }
    
    // Update UI
    if (typeof updateUI === 'function') {
        updateUI();
    }
}

// Load language from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('bodyGuessLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    updateLanguage();
});

