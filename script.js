
// Get the elements from the HTML page
const noise = document.getElementById('noise');
const command = document.getElementById('command');
const confidence = document.getElementById('confidence');
const feedback = document.getElementById('feedback');

const simulate = document.getElementById('simulate');
const confirm = document.getElementById('confirm');
const cancel = document.getElementById('cancel');
const retry = document.getElementById('retry');
const reset = document.getElementById('reset');

const log = document.getElementById('log');
const emptyLog = document.getElementById('empty-log');

// Simulated confidence values
const scores = {
    quiet: 0.95,
    medium: 0.65,
    noisy: 0.30
};

let pendingCommand = '';

// Decide how to respond based on confidence
function decide(score) {
    if (score >= 0.80) {
        return 'execute';
    }

    if (score >= 0.50) {
        return 'confirm';
    }

    return 'retry';
}

// Add an interaction to the log
function addLog(message) {
    const item = document.createElement('li');
    item.textContent = message;
    log.appendChild(item);
    emptyLog.hidden = true;
}

// Enable or disable controls
function setState(state) {
    const waiting = state === 'confirm';

    simulate.disabled = waiting;
    noise.disabled = waiting;
    command.disabled = waiting;

    confirm.disabled = !waiting;
    cancel.disabled = !waiting;

    retry.disabled =
        state !== 'retry' && state !== 'cancelled';

    reset.disabled = false;
}

// Simulate executing a command
function executeCommand(text) {
    feedback.textContent =
        'Command executed (simulated): ' + text;

    addLog('Executed (simulated): ' + text);

    pendingCommand = '';
    setState('executed');
}

// Simulate voice input
simulate.addEventListener('click', function () {
    const score = scores[noise.value];
    pendingCommand = command.value;

    confidence.textContent =
        Math.round(score * 100) + '%';

    addLog(
        noise.value + ' | ' +
        pendingCommand + ' | ' +
        confidence.textContent
    );

    const decision = decide(score);

    if (decision === 'execute') {
        executeCommand(pendingCommand);

    } else if (decision === 'confirm') {
        feedback.textContent =
            'Did you mean: ' + pendingCommand +
            '? Please confirm or cancel.';

        addLog('Confirmation requested.');
        setState('confirm');

    } else {
        feedback.textContent =
            'Confidence is too low. No action taken. Please try again.';

        addLog('Retry requested.');
        pendingCommand = '';
        setState('retry');
    }
});

// Confirm a command
confirm.addEventListener('click', function () {
    addLog('User confirmed.');
    executeCommand(pendingCommand);
});

// Cancel a command
cancel.addEventListener('click', function () {
    feedback.textContent =
        'Command cancelled. No action taken.';

    addLog('User cancelled: ' + pendingCommand);

    pendingCommand = '';
    setState('cancelled');
});

// Return to the input settings
retry.addEventListener('click', function () {
    pendingCommand = '';
    confidence.textContent = 'Not available';

    feedback.textContent =
        'Choose your settings and simulate again.';

    addLog('User chose to try again.');
    setState('ready');
});

// Reset the prototype
reset.addEventListener('click', function () {
    noise.value = 'quiet';
    command.selectedIndex = 0;

    pendingCommand = '';
    confidence.textContent = 'Not available';
    feedback.textContent = 'Waiting for input.';

    log.textContent = '';
    emptyLog.hidden = false;

    setState('ready');
});

// Initial state
setState('ready');