# Remove merge conflict markers from files
$files = @(
    "app\page.tsx",
    "app\cart\page.tsx",
    "components\site-navbar.tsx",
    "components\site-sidebar.tsx",
    "components\checkout-popup.tsx",
    "components\product-image.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Cleaning $file"
        $content = Get-Content $file -Raw
        $content = $content -replace '<<<<<<< HEAD.*?=======.*?>>>>>>> [a-f0-9]+', ''
        $content = $content -replace '<<<<<<< HEAD.*?>>>>>>> [a-f0-9]+', ''
        Set-Content $file $content
    }
}
