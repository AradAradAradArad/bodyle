// Realistic human body SVG with gradients, shadows, and detailed anatomy
// This creates a high-quality anatomical illustration

function createRealisticBody(svg) {
    // Create definitions for gradients and filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Skin gradient - more realistic
    const skinGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    skinGradient.setAttribute('id', 'skinGradient');
    skinGradient.setAttribute('x1', '0%');
    skinGradient.setAttribute('y1', '0%');
    skinGradient.setAttribute('x2', '0%');
    skinGradient.setAttribute('y2', '100%');
    const skinStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    skinStop1.setAttribute('offset', '0%');
    skinStop1.setAttribute('stop-color', '#F5E6D3');
    const skinStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    skinStop2.setAttribute('offset', '50%');
    skinStop2.setAttribute('stop-color', '#E8D5C4');
    const skinStop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    skinStop3.setAttribute('offset', '100%');
    skinStop3.setAttribute('stop-color', '#D4B5A0');
    skinGradient.appendChild(skinStop1);
    skinGradient.appendChild(skinStop2);
    skinGradient.appendChild(skinStop3);
    defs.appendChild(skinGradient);
    
    // Darker skin gradient for shadows
    const skinShadowGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    skinShadowGradient.setAttribute('id', 'skinShadowGradient');
    skinShadowGradient.setAttribute('x1', '0%');
    skinShadowGradient.setAttribute('y1', '0%');
    skinShadowGradient.setAttribute('x2', '0%');
    skinShadowGradient.setAttribute('y2', '100%');
    const shadowStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    shadowStop1.setAttribute('offset', '0%');
    shadowStop1.setAttribute('stop-color', '#C4A082');
    const shadowStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    shadowStop2.setAttribute('offset', '100%');
    shadowStop2.setAttribute('stop-color', '#B89A7F');
    skinShadowGradient.appendChild(shadowStop1);
    skinShadowGradient.appendChild(shadowStop2);
    defs.appendChild(skinShadowGradient);
    
    // Shadow filter
    const shadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    shadowFilter.setAttribute('id', 'shadow');
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceAlpha');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    feOffset.setAttribute('dx', '2');
    feOffset.setAttribute('dy', '2');
    const feComponentTransfer = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
    feComponentTransfer.setAttribute('result', 'shadow');
    const feFuncA = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
    feFuncA.setAttribute('type', 'linear');
    feFuncA.setAttribute('slope', '0.3');
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'shadow');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    shadowFilter.appendChild(feGaussianBlur);
    shadowFilter.appendChild(feOffset);
    shadowFilter.appendChild(feComponentTransfer);
    feComponentTransfer.appendChild(feFuncA);
    shadowFilter.appendChild(feMerge);
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    defs.appendChild(shadowFilter);
    
    // Highlight gradient for 3D effect
    const highlightGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    highlightGradient.setAttribute('id', 'highlight');
    highlightGradient.setAttribute('cx', '50%');
    highlightGradient.setAttribute('cy', '30%');
    const highlightStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    highlightStop1.setAttribute('offset', '0%');
    highlightStop1.setAttribute('stop-color', '#FFFFFF');
    highlightStop1.setAttribute('stop-opacity', '0.3');
    const highlightStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    highlightStop2.setAttribute('offset', '100%');
    highlightStop2.setAttribute('stop-color', '#FFFFFF');
    highlightStop2.setAttribute('stop-opacity', '0');
    highlightGradient.appendChild(highlightStop1);
    highlightGradient.appendChild(highlightStop2);
    defs.appendChild(highlightGradient);
    
    svg.appendChild(defs);
    
    // Draw realistic human body with detailed paths
    const bodyGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    bodyGroup.setAttribute('filter', 'url(#shadow)');
    
    // Head - more detailed and realistic
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    head.setAttribute('d', 'M 160 25 Q 200 12 240 25 Q 275 28 278 55 Q 278 75 275 95 Q 272 110 265 120 Q 255 130 245 135 Q 200 142 155 135 Q 145 130 138 120 Q 132 110 128 95 Q 125 75 125 55 Q 128 28 160 25 Z');
    head.setAttribute('fill', 'url(#skinGradient)');
    head.setAttribute('stroke', '#C4A082');
    head.setAttribute('stroke-width', '2.5');
    bodyGroup.appendChild(head);
    
    // Head shadow (left side)
    const headShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    headShadow.setAttribute('d', 'M 160 25 Q 200 12 240 25 Q 275 28 278 55 Q 278 75 275 95 Q 272 110 265 120 Q 255 130 200 135 Q 155 135 Q 145 130 138 120 Q 132 110 128 95 Q 125 75 125 55 Q 128 28 160 25 Z');
    headShadow.setAttribute('fill', 'url(#skinShadowGradient)');
    headShadow.setAttribute('opacity', '0.3');
    bodyGroup.appendChild(headShadow);
    
    // Head highlight (3D effect)
    const headHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    headHighlight.setAttribute('cx', '200');
    headHighlight.setAttribute('cy', '60');
    headHighlight.setAttribute('rx', '55');
    headHighlight.setAttribute('ry', '45');
    headHighlight.setAttribute('fill', 'url(#highlight)');
    bodyGroup.appendChild(headHighlight);
    
    // Neck - with muscle definition
    const neck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    neck.setAttribute('d', 'M 165 135 Q 162 140 160 145 L 160 150 L 240 150 L 240 145 Q 238 140 235 135 Q 200 137 165 135 Z');
    neck.setAttribute('fill', 'url(#skinGradient)');
    neck.setAttribute('stroke', '#C4A082');
    neck.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(neck);
    
    // Torso - with more anatomical detail
    const torso = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    torso.setAttribute('d', 'M 160 150 Q 155 160 152 175 L 148 200 L 145 240 L 142 280 L 140 320 L 138 360 L 136 400 L 138 430 L 142 460 L 148 485 L 155 505 L 165 515 Q 200 520 235 515 L 245 505 L 252 485 L 258 460 L 262 430 L 264 400 L 262 360 L 260 320 L 258 280 L 255 240 L 252 200 L 248 175 Q 245 160 240 150 Q 200 150 160 150 Z');
    torso.setAttribute('fill', 'url(#skinGradient)');
    torso.setAttribute('stroke', '#C4A082');
    torso.setAttribute('stroke-width', '3');
    bodyGroup.appendChild(torso);
    
    // Torso shadow (left side for depth)
    const torsoShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    torsoShadow.setAttribute('d', 'M 160 150 Q 155 160 152 175 L 148 200 L 145 240 L 142 280 L 140 320 L 138 360 L 136 400 L 138 430 L 142 460 L 148 485 L 155 505 L 165 515 Q 200 520 200 515 L 200 150 Z');
    torsoShadow.setAttribute('fill', 'url(#skinShadowGradient)');
    torsoShadow.setAttribute('opacity', '0.25');
    bodyGroup.appendChild(torsoShadow);
    
    // Chest definition lines
    const chestLines = [
        { d: 'M 200 180 Q 200 200 200 220', opacity: 0.3 },
        { d: 'M 185 190 Q 180 210 185 230', opacity: 0.25 },
        { d: 'M 215 190 Q 220 210 215 230', opacity: 0.25 }
    ];
    chestLines.forEach(line => {
        const chestLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        chestLine.setAttribute('d', line.d);
        chestLine.setAttribute('fill', 'none');
        chestLine.setAttribute('stroke', '#B89A7F');
        chestLine.setAttribute('stroke-width', '1.5');
        chestLine.setAttribute('opacity', line.opacity);
        bodyGroup.appendChild(chestLine);
    });
    
    // Left shoulder and arm - more detailed
    const leftShoulder = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftShoulder.setAttribute('d', 'M 160 150 Q 145 152 130 160 Q 115 170 105 185');
    leftShoulder.setAttribute('fill', 'url(#skinGradient)');
    leftShoulder.setAttribute('stroke', '#C4A082');
    leftShoulder.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(leftShoulder);
    
    const leftArm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftArm.setAttribute('d', 'M 105 185 Q 85 195 70 220 Q 58 245 60 270 Q 62 290 68 310 Q 75 330 85 345 Q 95 355 105 360 Q 110 362 115 360');
    leftArm.setAttribute('fill', 'url(#skinGradient)');
    leftArm.setAttribute('stroke', '#C4A082');
    leftArm.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(leftArm);
    
    // Left hand - more detailed
    const leftHand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftHand.setAttribute('d', 'M 115 360 Q 110 365 108 370 Q 106 375 108 380 Q 110 385 113 382 Q 116 378 118 375 Q 120 370 118 365 Q 116 362 115 360 Z');
    leftHand.setAttribute('fill', 'url(#skinGradient)');
    leftHand.setAttribute('stroke', '#C4A082');
    leftHand.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(leftHand);
    
    // Right shoulder and arm
    const rightShoulder = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightShoulder.setAttribute('d', 'M 240 150 Q 255 152 270 160 Q 285 170 295 185');
    rightShoulder.setAttribute('fill', 'url(#skinGradient)');
    rightShoulder.setAttribute('stroke', '#C4A082');
    rightShoulder.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(rightShoulder);
    
    const rightArm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightArm.setAttribute('d', 'M 295 185 Q 315 195 330 220 Q 342 245 340 270 Q 338 290 332 310 Q 325 330 315 345 Q 305 355 295 360 Q 290 362 285 360');
    rightArm.setAttribute('fill', 'url(#skinGradient)');
    rightArm.setAttribute('stroke', '#C4A082');
    rightArm.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(rightArm);
    
    // Right hand
    const rightHand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightHand.setAttribute('d', 'M 285 360 Q 290 365 292 370 Q 294 375 292 380 Q 290 385 287 382 Q 284 378 282 375 Q 280 370 282 365 Q 284 362 285 360 Z');
    rightHand.setAttribute('fill', 'url(#skinGradient)');
    rightHand.setAttribute('stroke', '#C4A082');
    rightHand.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(rightHand);
    
    // Left hip and leg
    const leftHip = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftHip.setAttribute('d', 'M 160 510 Q 152 512 148 518');
    leftHip.setAttribute('fill', 'url(#skinGradient)');
    leftHip.setAttribute('stroke', '#C4A082');
    leftHip.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(leftHip);
    
    const leftLeg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftLeg.setAttribute('d', 'M 148 518 Q 142 525 138 540 L 135 560 L 132 580 L 128 595 L 130 600 L 138 608 L 148 605 L 152 595 L 150 580 L 148 560 Z');
    leftLeg.setAttribute('fill', 'url(#skinGradient)');
    leftLeg.setAttribute('stroke', '#C4A082');
    leftLeg.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(leftLeg);
    
    // Left foot
    const leftFoot = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leftFoot.setAttribute('d', 'M 130 600 Q 125 605 120 610 L 115 615 L 118 620 L 128 625 L 138 620 L 135 615 L 132 610 Z');
    leftFoot.setAttribute('fill', 'url(#skinGradient)');
    leftFoot.setAttribute('stroke', '#C4A082');
    leftFoot.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(leftFoot);
    
    // Right hip and leg
    const rightHip = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightHip.setAttribute('d', 'M 240 510 Q 248 512 252 518');
    rightHip.setAttribute('fill', 'url(#skinGradient)');
    rightHip.setAttribute('stroke', '#C4A082');
    rightHip.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(rightHip);
    
    const rightLeg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightLeg.setAttribute('d', 'M 252 518 Q 258 525 262 540 L 265 560 L 268 580 L 272 595 L 270 600 L 262 608 L 252 605 L 248 595 L 250 580 L 252 560 Z');
    rightLeg.setAttribute('fill', 'url(#skinGradient)');
    rightLeg.setAttribute('stroke', '#C4A082');
    rightLeg.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(rightLeg);
    
    // Right foot
    const rightFoot = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rightFoot.setAttribute('d', 'M 270 600 Q 275 605 280 610 L 285 615 L 282 620 L 272 625 L 262 620 L 265 615 L 268 610 Z');
    rightFoot.setAttribute('fill', 'url(#skinGradient)');
    rightFoot.setAttribute('stroke', '#C4A082');
    rightFoot.setAttribute('stroke-width', '2');
    bodyGroup.appendChild(rightFoot);
    
    // Add muscle definition lines (subtle)
    const muscleLines = [
        { d: 'M 200 200 Q 195 220 200 240', opacity: 0.2 },
        { d: 'M 200 240 Q 205 260 200 280', opacity: 0.2 },
        { d: 'M 180 220 Q 175 240 180 260', opacity: 0.15 },
        { d: 'M 220 220 Q 225 240 220 260', opacity: 0.15 }
    ];
    
    muscleLines.forEach(line => {
        const muscleLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        muscleLine.setAttribute('d', line.d);
        muscleLine.setAttribute('fill', 'none');
        muscleLine.setAttribute('stroke', '#B89A7F');
        muscleLine.setAttribute('stroke-width', '1');
        muscleLine.setAttribute('opacity', line.opacity);
        bodyGroup.appendChild(muscleLine);
    });
    
    svg.appendChild(bodyGroup);
    
    return bodyGroup;
}

