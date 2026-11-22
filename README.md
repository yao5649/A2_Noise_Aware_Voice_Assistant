# Noise-Aware Voice Assistant

## Project Overview

Noise-Aware Voice Assistant is an interactive web prototype designed to demonstrate how a voice assistant can respond to uncertainty caused by different environmental noise conditions.

The project focuses on an interaction problem: when voice commands are difficult to recognise, a system should not always execute the interpreted command immediately. Instead, it should provide clear feedback and allow users to confirm, cancel, or retry.

This prototype was developed for Assignment 2 and builds on earlier research into voice assistant interaction in noisy environments.

**Important:** The application simulates voice recognition confidence. It does not use a microphone, real speech recognition, or an external AI model.

## Project Status

The main interactive prototype has been implemented and tested in a web browser.

Implemented features include:

* Selection of environmental noise conditions.
* Selection of simulated voice commands.
* Calculation of predefined confidence values.
* Confidence-based interaction decisions.
* Confirmation and cancellation of uncertain commands.
* Retry functionality when confidence is low.
* Reset functionality.
* Interaction logging and system feedback.

The prototype does not perform real-world voice recognition or control physical devices.

## Technologies Used

* HTML5 — page structure and interactive elements.
* CSS3 — layout, styling, and visual feedback.
* JavaScript — confidence simulation, decision logic, and event handling.
* Visual Studio Code — development environment.
* Microsoft Edge — browser testing.
* Python HTTP server — local hosting during testing.

No external JavaScript frameworks or API keys are required.

## How to Run

1. Download or clone the project repository.
2. Open the project folder in Visual Studio Code.
3. Open a terminal in the project directory.
4. Run:

```bash
python -m http.server 8000
```

5. Open a browser and visit:

```text
http://localhost:8000
```

6. Select an environment noise level and a voice command.
7. Click **Simulate voice input** to observe the system's response.

The program runs locally. Python is used only to serve the files and is not responsible for the confidence simulation.

## How the System Works

The system uses three predefined noise conditions:

| Noise Condition | Simulated Confidence | System Behaviour                  |
| --------------- | -------------------- | --------------------------------- |
| Quiet           | 95%                  | Execute the command automatically |
| Medium          | 65%                  | Request user confirmation         |
| Noisy           | 30%                  | Request another attempt           |

The decision rules are implemented in JavaScript:

* Confidence of 80% or above: execute the selected command.
* Confidence from 50% to below 80%: ask the user to confirm or cancel.
* Confidence below 50%: do not execute the command and suggest retrying.

These confidence values are predefined demonstration values rather than measured speech recognition accuracy.

## User Interaction

The interface is organised into three sections.

### 1. Input Settings

Users select the environmental noise level and a simulated voice command.

Available voice commands include:

* Turn on the lights
* Play music
* Set an alarm

### 2. System Response

The system displays the simulated confidence value and a response based on its decision rules.

The interface supports confirmation, cancellation, retry, and reset actions. Buttons are enabled or disabled according to the current interaction state.

### 3. Interaction Log

The interaction log records events including simulated confidence values, confirmation requests, command execution, cancellation, and retry actions.

The log helps users and developers understand how the interaction progresses.

## Testing

The prototype was tested in Microsoft Edge using a local Python HTTP server.

| Test               | Expected Behaviour                         | Observed Result |
| ------------------ | ------------------------------------------ | --------------- |
| Quiet environment  | Display 95% and execute                    | Passed          |
| Medium environment | Display 65% and request confirmation       | Passed          |
| Confirm            | Execute the pending command                | Passed          |
| Noisy environment  | Display 30% and request retry              | Passed          |
| Try again          | Clear confidence and return to input       | Passed          |
| Reset              | Restore defaults and clear interaction log | Passed          |

Screenshots of the tested interaction states are stored in the `screenshots` directory.

These tests demonstrate the behaviour of the simulation, not the accuracy of a real speech recognition system.

## Development Record

### Stage 1 — Problem Identification

The project began by investigating difficulties experienced when people use voice assistants in noisy environments. Earlier literature research examined noise-robust speech recognition and highlighted the importance of user interaction and error recovery.

### Stage 2 — Interaction Design

The interaction design focused on preventing uncertain commands from being executed without appropriate user control.

Confirmation, cancellation, feedback, and retry mechanisms were selected to support recovery from uncertain recognition.

### Stage 3 — Prototype Implementation

A web-based prototype was developed using HTML, CSS, and JavaScript.

The implementation separates the interface, styling, and application behaviour into different files. A decision function uses simulated confidence scores to determine the appropriate system response.

### Stage 4 — Testing and Debugging

During development, inconsistencies were observed in the displayed confidence values, particularly when switching between noise levels or resetting the interface.

The HTML and JavaScript were reviewed to check whether the confidence element was being updated correctly.

The project was subsequently tested using a local Python HTTP server and an InPrivate browser window.

The final browser test sequence demonstrated correct confidence display, confirmation, retry, reset, and interaction logging behaviour.

### Stage 5 — Final Prototype Review

The implemented features were checked against the intended interaction design.

The final prototype illustrates how different levels of uncertainty can lead to different interaction choices without requiring real speech recognition hardware or services.

## Design Decisions

### Confidence-Based Feedback

Different confidence thresholds were used to illustrate how systems might respond differently to uncertain recognition results.

### Confirmation Before Execution

For medium-confidence commands, the user must confirm the proposed action before the simulation executes it.

This design reduces the risk of unintended actions.

### Retry for Low Confidence

When confidence is low, the system avoids executing the command and encourages another attempt.

### Visible Interaction History

The interaction log makes system behaviour more transparent and provides evidence of how the user and system interact.

### Simple Web Interface

A browser-based interface was selected to make the prototype easy to inspect and test without specialist hardware.

## Limitations

The current prototype has several limitations:

1. Noise conditions are selected manually rather than measured through a microphone.
2. Confidence values are predefined rather than calculated by a speech recognition model.
3. Commands produce simulated responses and do not control real devices.
4. The prototype has not been evaluated through a formal user study.
5. The current decision thresholds are design assumptions rather than experimentally validated thresholds.

Future development could include real microphone input, automatic speech recognition, confidence calibration, usability testing, and more accessible feedback mechanisms.

## AI Assistance

AI assistance was used during the development process for reviewing code, discussing debugging approaches, planning test cases, and helping structure project documentation.

Generated suggestions were reviewed against the project code and the results observed during browser testing. The implemented functionality and project limitations are described according to the actual prototype rather than assumed AI capabilities.

## Project Files

```text
A2_Noise_Aware_Voice_Assistant/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
```

* `index.html` contains the page structure.
* `style.css` contains the interface styling.
* `script.js` contains the simulation and interaction logic.
* `README.md` documents the project.
* `screenshots/` contains evidence of the interface and tests.

## Conclusion

Noise-Aware Voice Assistant demonstrates an interaction-oriented approach to managing simulated voice recognition uncertainty.

Instead of treating every recognised command as equally reliable, the prototype uses confidence-based decisions to support automatic execution, user confirmation, or retry.

The project highlights the importance of transparent feedback, user control, and error recovery in the design of voice assistant interfaces.
