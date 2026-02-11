# Script to push code to GitHub
# Run this script in a separate PowerShell terminal (not in Cursor)

Write-Host "Removing old .git if exists..."
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "Initializing git repository..."
git init

Write-Host "Configuring git..."
git config user.name "SpiritWalker84"
git config user.email "spiritwalker84@users.noreply.github.com"

Write-Host "Adding files..."
git add .

Write-Host "Creating commit..."
git commit -m "Initial commit: Weather Telegram Bot"

Write-Host "Adding remote..."
git remote add origin https://github.com/SpiritWalker84/VPD04_Weather_bot.git

Write-Host "Renaming branch to main..."
git branch -M main

Write-Host "Pushing to GitHub..."
Write-Host "Note: Authentication may be required (Personal Access Token)"
git push -u origin main

Write-Host "Done!"
