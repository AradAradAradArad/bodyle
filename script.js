// Game state
let gameState = {
    currentDifficulty: 'bones',
    startPoint: null,
    endPoint: null,
    path: [],
    guesses: [],
    maxGuesses: 7,
    hintsUsed: 0,
    maxHints: 3,
    gameStarted: false,
    gameWon: false
};

// DOM elements
const difficultySelect = document.getElementById('difficultySelect');
const startPointSelect = document.getElementById('startPointSelect');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const guessesList = document.getElementById('guessesList');
const toggleGuesses = document.getElementById('toggleGuesses');
const messageDiv = document.getElementById('message');
const startPointSpan = document.getElementById('startPoint');
const endPointSpan = document.getElementById('endPoint');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const howToPlayModal = document.getElementById('howToPlayModal');
const closeModal = document.getElementById('closeModal');
const hintNext = document.getElementById('hintNext');
const hintAll = document.getElementById('hintAll');
const hintInitials = document.getElementById('hintInitials');

// Initialize game
function init() {
    updateDifficultyOptions();
    populateStartPointSelect();
    setupEventListeners();
    drawBodyMap();
}

// Update difficulty options and reset game
function updateDifficultyOptions() {
    const difficulty = difficultySelect.value;
    gameState.currentDifficulty = difficulty;
    gameState.gameStarted = false;
    gameState.startPoint = null;
    gameState.endPoint = null;
    gameState.path = [];
    gameState.guesses = [];
    gameState.hintsUsed = 0;
    gameState.gameWon = false;
    
    populateStartPointSelect();
    updateUI();
    clearMessage();
}

// Populate start point select dropdown
function populateStartPointSelect() {
    const difficulty = gameState.currentDifficulty;
    const structures = Object.keys(anatomyData[difficulty].structures);
    
    startPointSelect.innerHTML = '<option value="">-- בחר נקודת התחלה --</option>';
    structures.forEach(structure => {
        const option = document.createElement('option');
        option.value = structure;
        option.textContent = structure;
        startPointSelect.appendChild(option);
    });
}

// Start new game when start point is selected
function startGame() {
    const startPoint = startPointSelect.value;
    if (!startPoint) {
        showMessage('אנא בחר נקודת התחלה', 'error');
        return;
    }
    
    gameState.startPoint = startPoint;
    gameState.endPoint = selectRandomEndPoint();
    gameState.path = findShortestPath(gameState.startPoint, gameState.endPoint);
    
    // If no path found, try another end point
    if (gameState.path.length === 0) {
        gameState.endPoint = selectRandomEndPoint();
        gameState.path = findShortestPath(gameState.startPoint, gameState.endPoint);
    }
    
    // If still no path, show error
    if (gameState.path.length === 0) {
        showMessage('לא נמצא מסלול בין הנקודות. נסה נקודת התחלה אחרת.', 'error');
        return;
    }
    
    gameState.guesses = [];
    gameState.hintsUsed = 0;
    gameState.gameStarted = true;
    gameState.gameWon = false;
    
    updateUI();
    clearMessage();
    guessInput.focus();
}

// Select random end point (different from start)
function selectRandomEndPoint() {
    const difficulty = gameState.currentDifficulty;
    const structures = Object.keys(anatomyData[difficulty].structures);
    let endPoint;
    
    do {
        endPoint = structures[Math.floor(Math.random() * structures.length)];
    } while (endPoint === gameState.startPoint);
    
    return endPoint;
}

// Find shortest path using BFS
function findShortestPath(start, end) {
    const difficulty = gameState.currentDifficulty;
    const connections = anatomyData[difficulty].structures;
    
    if (!connections[start] || !connections[end]) {
        return [];
    }
    
    const queue = [[start]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];
        
        if (current === end) {
            return path;
        }
        
        const neighbors = connections[current] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([...path, neighbor]);
            }
        }
    }
    
    return [];
}

// Handle guess submission
function submitGuess() {
    if (!gameState.gameStarted) {
        showMessage('אנא בחר נקודת התחלה תחילה', 'error');
        return;
    }
    
    if (gameState.gameWon) {
        showMessage('כבר ניצחת! התחל משחק חדש', 'info');
        return;
    }
    
    if (gameState.guesses.length >= gameState.maxGuesses) {
        showMessage('סיימת את כל הניחושים!', 'error');
        return;
    }
    
    const guess = guessInput.value.trim();
    if (!guess) {
        showMessage('אנא הכנס ניחוש', 'error');
        return;
    }
    
    const difficulty = gameState.currentDifficulty;
    const structures = Object.keys(anatomyData[difficulty].structures);
    
    // Check if guess is a valid structure using fuzzy matching
    const validStructure = findBestMatch(guess, structures);
    
    if (!validStructure) {
        showMessage(`"${guess}" לא נמצא ברשימת המבנים. נסה שוב עם שם מדויק יותר.`, 'error');
        guessInput.value = '';
        return;
    }
    
    // If the guess is close but not exact, show a helpful message but accept it anyway
    const normalizedGuess = normalizeString(guess);
    const normalizedStructure = normalizeString(validStructure);
    if (normalizedGuess !== normalizedStructure) {
        // Show info message but continue with the guess
        // The message will be replaced by the result message below
    }
    
    // Check if already guessed
    if (gameState.guesses.includes(validStructure)) {
        showMessage('כבר ניחשת את זה!', 'error');
        guessInput.value = '';
        return;
    }
    
    // Add to guesses
    gameState.guesses.push(validStructure);
    
    // Check if on path
    const isOnPath = gameState.path.includes(validStructure);
    const isCorrect = validStructure === gameState.endPoint;
    
    if (isCorrect) {
        gameState.gameWon = true;
        showMessage(`🎉 ניצחת! הגעת ליעד ב-${gameState.guesses.length} ניחושים!`, 'success');
    } else if (isOnPath) {
        showMessage(`✓ "${validStructure}" נמצא במסלול!`, 'info');
    } else {
        showMessage(`✗ "${validStructure}" לא נמצא במסלול`, 'error');
    }
    
    guessInput.value = '';
    updateUI();
    
    // Check if lost
    if (!gameState.gameWon && gameState.guesses.length >= gameState.maxGuesses) {
        showMessage(`הפסדת! המסלול המלא מוצג במפה למטה.`, 'error');
        updateUI(); // Update to show full path
    }
}

// Normalize string for comparison (remove diacritics, spaces, parentheses, etc.)
function normalizeString(str) {
    return str
        .replace(/\([^)]*\)/g, '') // Remove parentheses and content inside
        .replace(/\s+/g, '') // Remove spaces
        .replace(/[^\u0590-\u05FFa-zA-Z0-9]/g, '') // Remove special characters
        .toLowerCase()
        .trim();
}

// Find best matching structure using fuzzy matching
function findBestMatch(guess, structures) {
    const normalizedGuess = normalizeString(guess);
    
    // First try exact match
    let exactMatch = structures.find(s => normalizeString(s) === normalizedGuess);
    if (exactMatch) return exactMatch;
    
    // Try matching Hebrew name only (before parentheses)
    const hebrewOnly = guess.split('(')[0].trim();
    const normalizedHebrew = normalizeString(hebrewOnly);
    let hebrewMatch = structures.find(s => {
        const sHebrew = s.split('(')[0].trim();
        return normalizeString(sHebrew) === normalizedHebrew;
    });
    if (hebrewMatch) return hebrewMatch;
    
    // Try partial match - check if guess is contained in structure name or vice versa
    // This is more lenient - accepts if one contains the other
    let partialMatch = structures.find(s => {
        const normalizedS = normalizeString(s);
        const sHebrew = normalizeString(s.split('(')[0].trim());
        const guessHebrew = normalizedHebrew;
        
        // Check if one contains the other (at least 3 characters for meaningful match)
        if (normalizedGuess.length >= 3 && normalizedS.length >= 3) {
            if (normalizedS.includes(normalizedGuess) || normalizedGuess.includes(normalizedS)) {
                return true;
            }
        }
        if (guessHebrew.length >= 3 && sHebrew.length >= 3) {
            if (sHebrew.includes(guessHebrew) || guessHebrew.includes(sHebrew)) {
                return true;
            }
        }
        return false;
    });
    if (partialMatch) return partialMatch;
    
    // Try fuzzy match - check similarity (Levenshtein-like)
    let bestMatch = null;
    let bestScore = Infinity;
    
    for (const structure of structures) {
        const normalizedS = normalizeString(structure);
        const sHebrew = normalizeString(structure.split('(')[0].trim());
        
        // Calculate similarity score (simple version)
        const score1 = calculateSimilarity(normalizedGuess, normalizedS);
        const score2 = calculateSimilarity(normalizedHebrew, sHebrew);
        const minScore = Math.min(score1, score2);
        
        if (minScore < bestScore && minScore < 0.5) { // Threshold for similarity (more lenient)
            bestScore = minScore;
            bestMatch = structure;
        }
    }
    
    return bestMatch;
}

// Calculate similarity between two strings (0 = identical, higher = more different)
function calculateSimilarity(str1, str2) {
    if (str1 === str2) return 0;
    if (str1.length === 0 || str2.length === 0) return 1;
    
    // Check if one contains the other
    if (str1.includes(str2) || str2.includes(str1)) {
        return 0.1;
    }
    
    // Simple Levenshtein distance approximation
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const editDistance = levenshteinDistance(str1, str2);
    return editDistance / longer.length;
}

// Simple Levenshtein distance calculation
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Update UI elements
function updateUI() {
    // Update start/end points display
    if (gameState.startPoint) {
        startPointSpan.textContent = gameState.startPoint;
    } else {
        startPointSpan.textContent = '?';
    }
    
    if (gameState.endPoint) {
        endPointSpan.textContent = gameState.endPoint;
    } else {
        endPointSpan.textContent = '?';
    }
    
    // Update guess button
    guessBtn.textContent = `נחש (${gameState.guesses.length}/${gameState.maxGuesses})`;
    guessBtn.disabled = !gameState.gameStarted || gameState.gameWon || gameState.guesses.length >= gameState.maxGuesses;
    
    // Update guesses list
    updateGuessesList();
    
    // Update hints
    hintNext.disabled = !gameState.gameStarted || gameState.hintsUsed >= gameState.maxHints || gameState.gameWon;
    hintAll.disabled = !gameState.gameStarted || gameState.hintsUsed >= gameState.maxHints || gameState.gameWon;
    hintInitials.disabled = !gameState.gameStarted || gameState.hintsUsed >= gameState.maxHints || gameState.gameWon;
    
    // Update body map
    drawBodyMap();
}

// Update guesses list display
function updateGuessesList() {
    guessesList.innerHTML = '';
    
    gameState.guesses.forEach(guess => {
        const item = document.createElement('div');
        item.className = 'guess-item';
        
        if (guess === gameState.endPoint) {
            item.classList.add('correct');
            item.textContent = `✓ ${guess} - נכון!`;
        } else if (gameState.path.includes(guess)) {
            item.classList.add('on-path');
            item.textContent = `→ ${guess} - במסלול`;
        } else {
            item.classList.add('incorrect');
            item.textContent = `✗ ${guess} - לא במסלול`;
        }
        
        guessesList.appendChild(item);
    });
}

// Show message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(clearMessage, 5000);
}

// Clear message
function clearMessage() {
    messageDiv.className = 'message';
    messageDiv.textContent = '';
}

// Helper function to draw a structure on the SVG
function drawStructure(svg, structureName, structureData, isHighlighted = false, isStart = false, isEnd = false) {
    const { x, y, shape, color, r, w, h, d } = structureData;
    let element;
    
    if (shape === 'circle') {
        element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        element.setAttribute('cx', x);
        element.setAttribute('cy', y);
        element.setAttribute('r', r);
    } else if (shape === 'rect') {
        element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        element.setAttribute('x', x - w / 2);
        element.setAttribute('y', y - h / 2);
        element.setAttribute('width', w);
        element.setAttribute('height', h);
    } else if (shape === 'path') {
        element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        element.setAttribute('d', d);
    }
    
    if (element) {
        // Determine fill color based on state
        let fillColor = color;
        if (isStart) {
            fillColor = '#ff6b9d';
        } else if (isEnd) {
            fillColor = '#4ecdc4';
        } else if (isHighlighted) {
            fillColor = '#4ecdc4';
        }
        
        element.setAttribute('fill', fillColor);
        element.setAttribute('opacity', isHighlighted || isStart || isEnd ? '0.8' : '0.4');
        element.setAttribute('stroke', isHighlighted || isStart || isEnd ? '#fff' : '#666');
        element.setAttribute('stroke-width', isHighlighted || isStart || isEnd ? '2' : '1');
        element.classList.add('anatomy-structure');
        element.setAttribute('data-structure', structureName);
        svg.appendChild(element);
        
        // Add label only if highlighted or start/end
        if (isHighlighted || isStart || isEnd) {
            const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            const shortName = structureName.split('(')[0].trim();
            const textLength = Math.min(shortName.length * 5, 80);
            labelBg.setAttribute('x', x - textLength / 2);
            labelBg.setAttribute('y', y + (r || h || 20) + 5);
            labelBg.setAttribute('width', textLength);
            labelBg.setAttribute('height', '14');
            labelBg.setAttribute('fill', '#1a1a1a');
            labelBg.setAttribute('opacity', '0.9');
            labelBg.setAttribute('rx', '2');
            svg.appendChild(labelBg);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y + (r || h || 20) + 15);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#fff');
            text.setAttribute('font-size', '9');
            text.setAttribute('font-weight', 'bold');
            text.textContent = shortName.length > 12 ? shortName.substring(0, 10) + '...' : shortName;
            svg.appendChild(text);
        }
    }
}

// Draw connection line between two structures
function drawConnection(svg, struct1, struct2, isHighlighted = false) {
    const difficulty = gameState.currentDifficulty;
    const structures = bodyAnatomy.structures[difficulty];
    
    if (!structures[struct1] || !structures[struct2]) {
        // Try to find alternative names or skip
        return;
    }
    
    const pos1 = { x: structures[struct1].x, y: structures[struct1].y };
    const pos2 = { x: structures[struct2].x, y: structures[struct2].y };
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', pos1.x);
    line.setAttribute('y1', pos1.y);
    line.setAttribute('x2', pos2.x);
    line.setAttribute('y2', pos2.y);
    line.setAttribute('stroke', isHighlighted ? '#4ecdc4' : '#666');
    line.setAttribute('stroke-width', isHighlighted ? '2' : '1');
    line.setAttribute('opacity', isHighlighted ? '0.6' : '0.2');
    line.setAttribute('stroke-dasharray', isHighlighted ? 'none' : '3,3');
    svg.appendChild(line);
}

// Draw body map visualization
function drawBodyMap() {
    const svg = document.getElementById('bodySvg');
    svg.innerHTML = '';
    
    // Draw body outline
    const outline = bodyAnatomy.bodyOutline;
    
    // Head
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    head.setAttribute('d', outline.head);
    head.setAttribute('fill', '#2a2a2a');
    head.setAttribute('stroke', '#555');
    head.setAttribute('stroke-width', '2');
    svg.appendChild(head);
    
    // Torso
    const torso = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    torso.setAttribute('d', outline.torso);
    torso.setAttribute('fill', '#2a2a2a');
    torso.setAttribute('stroke', '#555');
    torso.setAttribute('stroke-width', '2');
    svg.appendChild(torso);
    
    // Left arm
    const leftArm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftArm.setAttribute('d', outline.leftArm);
    leftArm.setAttribute('fill', 'none');
    leftArm.setAttribute('stroke', '#555');
    leftArm.setAttribute('stroke-width', '2');
    svg.appendChild(leftArm);
    
    // Right arm
    const rightArm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightArm.setAttribute('d', outline.rightArm);
    rightArm.setAttribute('fill', 'none');
    rightArm.setAttribute('stroke', '#555');
    rightArm.setAttribute('stroke-width', '2');
    svg.appendChild(rightArm);
    
    // Left leg
    const leftLeg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftLeg.setAttribute('d', outline.leftLeg);
    leftLeg.setAttribute('fill', 'none');
    leftLeg.setAttribute('stroke', '#555');
    leftLeg.setAttribute('stroke-width', '2');
    svg.appendChild(leftLeg);
    
    // Right leg
    const rightLeg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightLeg.setAttribute('d', outline.rightLeg);
    rightLeg.setAttribute('fill', 'none');
    rightLeg.setAttribute('stroke', '#555');
    rightLeg.setAttribute('stroke-width', '2');
    svg.appendChild(rightLeg);
    
    if (!gameState.gameStarted || !gameState.path.length) {
        // Add watermark
        const watermark = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        watermark.setAttribute('x', '200');
        watermark.setAttribute('y', '300');
        watermark.setAttribute('text-anchor', 'middle');
        watermark.setAttribute('fill', '#333');
        watermark.setAttribute('font-size', '24');
        watermark.setAttribute('opacity', '0.3');
        watermark.textContent = 'body guess';
        svg.appendChild(watermark);
        return;
    }
    
    const difficulty = gameState.currentDifficulty;
    const structures = bodyAnatomy.structures[difficulty];
    
    if (!structures) return;
    
    // Only show full path if game is won or lost
    const showFullPath = gameState.gameWon || gameState.guesses.length >= gameState.maxGuesses;
    
    // Get guessed structures that are on the path
    const guessedOnPath = gameState.guesses.filter(g => gameState.path.includes(g));
    
    // Draw connections between path structures
    for (let i = 0; i < gameState.path.length - 1; i++) {
        const current = gameState.path[i];
        const next = gameState.path[i + 1];
        
        const isCurrentGuessed = guessedOnPath.includes(current) || i === 0;
        const isNextGuessed = guessedOnPath.includes(next) || i + 1 === gameState.path.length - 1;
        const shouldShowConnection = isCurrentGuessed && isNextGuessed || showFullPath;
        
        if (shouldShowConnection) {
            drawConnection(svg, current, next, showFullPath || (isCurrentGuessed && isNextGuessed));
        }
    }
    
    // Draw all structures in the path
    gameState.path.forEach((structureName, index) => {
        if (!structures[structureName]) {
            console.warn(`Structure "${structureName}" not found in body-anatomy for difficulty "${difficulty}"`);
            return;
        }
        
        const isStart = index === 0;
        const isEnd = index === gameState.path.length - 1;
        const isGuessed = guessedOnPath.includes(structureName);
        const shouldShow = isStart || isEnd || isGuessed || showFullPath;
        
        if (shouldShow) {
            drawStructure(svg, structureName, structures[structureName], isGuessed || showFullPath, isStart, isEnd);
        }
    });
}

// Hint functions
function showNextHint() {
    if (gameState.hintsUsed >= gameState.maxHints) return;
    
    const guessedOnPath = gameState.guesses.filter(g => gameState.path.includes(g));
    const nextInPath = gameState.path.find(p => !guessedOnPath.includes(p) && p !== gameState.startPoint);
    
    if (nextInPath) {
        showMessage(`רמז: המבנה הבא במסלול הוא "${nextInPath}"`, 'info');
        gameState.hintsUsed++;
    } else {
        showMessage('כבר ניחשת את כל המבנים במסלול!', 'info');
    }
    
    updateUI();
}

function showAllHints() {
    if (gameState.hintsUsed >= gameState.maxHints) return;
    
    const pathStr = gameState.path.join(' → ');
    showMessage(`רמז: המסלול המלא הוא: ${pathStr}`, 'info');
    gameState.hintsUsed = gameState.maxHints;
    updateUI();
}

function showInitialsHint() {
    if (gameState.hintsUsed >= gameState.maxHints) return;
    
    const difficulty = gameState.currentDifficulty;
    const pathInitials = gameState.path.map(p => {
        const words = p.split(' ');
        return words.map(w => w[0]).join('');
    }).join(' - ');
    
    showMessage(`רמז: ראשי התיבות של המסלול: ${pathInitials}`, 'info');
    gameState.hintsUsed++;
    updateUI();
}

// Setup event listeners
function setupEventListeners() {
    difficultySelect.addEventListener('change', updateDifficultyOptions);
    startPointSelect.addEventListener('change', startGame);
    guessBtn.addEventListener('click', submitGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitGuess();
        }
    });
    toggleGuesses.addEventListener('click', () => {
        guessesList.classList.toggle('hidden');
    });
    howToPlayBtn.addEventListener('click', () => {
        howToPlayModal.classList.remove('hidden');
    });
    closeModal.addEventListener('click', () => {
        howToPlayModal.classList.add('hidden');
    });
    hintNext.addEventListener('click', showNextHint);
    hintAll.addEventListener('click', showAllHints);
    hintInitials.addEventListener('click', showInitialsHint);
    
    // Close modal on outside click
    howToPlayModal.addEventListener('click', (e) => {
        if (e.target === howToPlayModal) {
            howToPlayModal.classList.add('hidden');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);

