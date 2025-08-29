// Helper function to check for ladders/snakes and return message
function checkLaddersAndSnakes() {
    let message = "";
    // Player ladders
    if (playerPosition === 4) { playerPosition = 42; message += `You hit a ladder and moved to ${playerPosition}.\n`; }
    else if (playerPosition === 10) { playerPosition = 90; message += `You hit a ladder and moved to ${playerPosition}.\n`; }
    else if (playerPosition === 28) { playerPosition = 75; message += `You hit a ladder and moved to ${playerPosition}.\n`; }
    else if (playerPosition === 36) { playerPosition = 76; message += `You hit a ladder and moved to ${playerPosition}.\n`; }
    // Player snakes
    if (playerPosition === 99) { playerPosition = 82; message += `You hit a snake and moved to ${playerPosition}.\n`; }
    else if (playerPosition === 87) { playerPosition = 14; message += `You hit a snake and moved to ${playerPosition}.\n`; }
    else if (playerPosition === 80) { playerPosition = 44; message += `You hit a snake and moved to ${playerPosition}.\n`; }
    else if (playerPosition === 20) { playerPosition = 1; message += `You hit a snake and moved to ${playerPosition}.\n`; }
    // Computer ladders
    if (computerPosition === 4) { computerPosition = 42; message += `Computer hit a ladder and moved to ${computerPosition}.\n`; }
    else if (computerPosition === 10) { computerPosition = 90; message += `Computer hit a ladder and moved to ${computerPosition}.\n`; }
    else if (computerPosition === 28) { computerPosition = 75; message += `Computer hit a ladder and moved to ${computerPosition}.\n`; }
    else if (computerPosition === 36) { computerPosition = 76; message += `Computer hit a ladder and moved to ${computerPosition}.\n`; }
    // Computer snakes
    if (computerPosition === 99) { computerPosition = 82; message += `Computer hit a snake and moved to ${computerPosition}.\n`; }
    else if (computerPosition === 87) { computerPosition = 14; message += `Computer hit a snake and moved to ${computerPosition}.\n`; }
    else if (computerPosition === 80) { computerPosition = 44; message += `Computer hit a snake and moved to ${computerPosition}.\n`; }
    else if (computerPosition === 20) { computerPosition = 1; message += `Computer hit a snake and moved to ${computerPosition}.\n`; }
    return message;
}
