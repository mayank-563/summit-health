$imagesDir = "images"
if (-not (Test-Path -Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

$images = @{
    "facility-bkc.jpg" = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "facility-andheri.jpg" = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "facility-powai.jpg" = "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "coe-cardio.jpg" = "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "coe-neuro.jpg" = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "coe-oncology.jpg" = "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "technology.jpg" = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    "doctor-sharma.jpg" = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    "doctor-patel.jpg" = "https://images.unsplash.com/photo-1594824436951-7f12bcce0a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    "doctor-rao.jpg" = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    "doctor-desai.jpg" = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    "hero-bg.jpg" = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
}

foreach ($key in $images.Keys) {
    $url = $images[$key]
    $dest = Join-Path -Path $imagesDir -ChildPath $key
    Write-Host "Downloading $key..."
    Invoke-WebRequest -Uri $url -OutFile $dest
}

Write-Host "All images downloaded successfully."
