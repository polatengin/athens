
gh api repos/polatengin/athens/contributors --jq map(select(.login | endswith("[bot]") | not)) | .[].login
