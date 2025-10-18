# PowerShell script to resolve merge conflicts by choosing the remote version (theirs)
$files = @(
    "app\page.tsx",
    "components\site-sidebar.tsx", 
    "components\site-navbar.tsx",
    "components\checkout-popup.tsx",
    "components\product-image.tsx",
    "app\signup\page.tsx",
    "app\rings\[slug]\page.tsx",
    "app\rings\page.tsx", 
    "app\profile\page.tsx",
    "app\necklaces\[slug]\page.tsx",
    "app\necklaces\page.tsx",
    "app\login\page.tsx",
    "app\earrings\[slug]\page.tsx",
    "app\earrings\page.tsx",
    "app\custom-design\page.tsx",
    "app\collections\page.tsx",
    "app\bracelets\[slug]\page.tsx",
    "app\bracelets\page.tsx",
    "app\globals.css",
    "postcss.config.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Resolving conflicts in $file"
        git checkout --theirs $file
    }
}
