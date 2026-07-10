# Powershell script to deploy build directly to gh-pages branch
$distDir = "c:\Users\Rashtra Bhushan\Downloads\RBK Portfolio\dist"

Write-Host "Navigating to dist directory..."
Set-Location -Path $distDir

Write-Host "Initializing temporary git repository..."
git init

Write-Host "Adding remote..."
# Check if remote already exists, if so remove it first
$remoteCheck = git remote
if ($remoteCheck -contains "origin") {
    git remote remove origin
}
git remote add origin https://github.com/Rashtra03/my-portfolio.git

Write-Host "Creating branch gh-pages..."
git checkout -b gh-pages

Write-Host "Staging files..."
git add .

Write-Host "Committing..."
git commit -m "deploy: static build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

Write-Host "Force pushing to branch gh-pages..."
git push -f origin gh-pages

Write-Host "Cleaning up temporary git files in dist..."
Remove-Item -Path ".git" -Recurse -Force

Write-Host "Deployment completed successfully!"
