#!/bin/bash
#
# RenderForge MkDocs Integration Setup Script
#
# This script sets up the MkDocs override template for unified navigation.
#
# Usage:
#   ./setup.sh [project-path]
#
# If project-path is not provided, uses current directory.
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_DIR="${1:-.}"

echo "RenderForge MkDocs Integration Setup"
echo "====================================="
echo ""

# Check if mkdocs.yml exists
if [ ! -f "$PROJECT_DIR/mkdocs.yml" ]; then
    echo "Error: mkdocs.yml not found in $PROJECT_DIR"
    echo "Please run this script from your MkDocs project directory or provide the path."
    exit 1
fi

# Create docs/overrides directory
OVERRIDES_DIR="$PROJECT_DIR/docs/overrides"
mkdir -p "$OVERRIDES_DIR"
echo "Created: $OVERRIDES_DIR"

# Copy main.html template
cp "$PACKAGE_DIR/templates/main.html" "$OVERRIDES_DIR/main.html"
echo "Copied: main.html template"

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit docs/overrides/main.html and update:"
echo "   - YOUR-DOMAIN.com -> your actual domain"
echo "   - Brand configuration (title, logo, etc.)"
echo "   - Menu items"
echo "   - Theme colors"
echo ""
echo "2. Update mkdocs.yml to add:"
echo ""
echo "   theme:"
echo "     custom_dir: docs/overrides"
echo ""
echo "   extra_css:"
echo "     - https://your-domain.com/css/mkdocs-nav-offset.css"
echo ""
echo "3. Host these files on your main domain:"
echo "   - /js/lit-navbar.js"
echo "   - /css/mkdocs-nav-offset.css (or mkdocs-theme-dark.css)"
echo ""
echo "4. Deploy: mkdocs gh-deploy --force"
echo ""
