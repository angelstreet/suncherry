# SunCherry TV - Skin System Implementation Guide

This guide explains how to implement and use the seasonal/event skin system in the SunCherry TV application. The system allows the interface to change appearance based on special events, holidays, or sports events.

## Overview

The skin system consists of:

1. **SkinContext**: Manages the active skin and provides skin data to components
2. **SkinOverlay**: Renders themed backgrounds and animated elements
3. **SkinSelector**: UI component for users to manually change skins
4. **CSS Animations**: Special effects for each skin

## Included Skins

The system comes with three pre-configured skins:

### 1. Valentine's Day
- **Theme**: Romantic, hearts and roses
- **Colors**: Pink/red accents
- **Background**: Subtle pink roses pattern
- **Animation**: Falling hearts and roses
- **Image URL**: https://images.unsplash.com/photo-1518199266791-5375a83190b7

### 2. Champions League
- **Theme**: Football/soccer tournament
- **Colors**: Blue accents
- **Background**: Stadium atmosphere
- **Animation**: Falling footballs and trophies
- **Image URL**: https://images.unsplash.com/photo-1574629810360-7efbbe195018

### 3. Christmas
- **Theme**: Winter holiday
- **Colors**: Red and green accents
- **Background**: Christmas decorati