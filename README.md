# Perplexity Proxy Deployment Guide

## Netlify Deployment
1. **Push to GitHub**: Upload all files to a new repository.
2. **Connect to Netlify**: Select "Import from Git" in Netlify.
3. **Configure Build**:
   - **Command**: `npm run build`
   - **Directory**: `dist`
4. **Set Environment Variables**:
   - Navigate to Site Settings -> Environment Variables.
   - Add `API_KEY`: [Your Gemini API Key]
5. **Ultraviolet Backend**:
   - If your UV worker is hosted elsewhere, update `netlify.toml` redirects to point to your UV server.

## Features
- **Ultraviolet Integration**: Secure web proxying via XOR encoding.
- **AI Assistant**: Powered by Gemini 3 Flash.
- **Stealth Mode**: Tab cloaking and About:Blank portal support.
- **Guardian Detection**: Real-time monitoring of classroom filters.