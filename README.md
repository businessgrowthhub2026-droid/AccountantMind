@'
# AccountWise — Local AI Accounting Tutor

AccountWise is a local AI accounting tutor that helps students understand accounting notes and ask questions about accounting concepts.

The app uses the **QVAC SDK** to run AI inference locally on the user's computer. No cloud AI API key is required for the tutoring inference.

## Project Links

- **GitHub Repository:** https://github.com/businessgrowthhub2026-droid/AccountWise
- **QVAC:** https://qvac.tether.io/

## What the App Does

AccountWise lets a student:

- Paste accounting notes
- Save notes inside the app
- Ask accounting questions
- Receive AI-generated accounting explanations
- Clear notes and conversation
- Use the tutor with local AI inference

## QVAC Integration

AccountWise uses the QVAC SDK:

- `loadModel()` loads the local QVAC language model
- `completion()` generates the accounting tutor response

QVAC SDK version:

```text
@qvac/sdk 0.19.1