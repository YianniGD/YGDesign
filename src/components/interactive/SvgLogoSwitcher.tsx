
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RefreshCw, Palette } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Separator } from '@/components/ui/separator';

// Define the structure for color options
interface ColorOption {
  name: string;
  value: string; // For static colors, 'value' is the hex. For 'Satin', it's a key.
  isDynamic?: boolean;
  lightValue?: string; // Actual hex for light mode if dynamic
  darkValue?: string;  // Actual hex for dark mode if dynamic
  checkColorLight?: string; // Checkmark color for light theme
  checkColorDark?: string;  // Checkmark color for dark theme
}

// Palette configuration
const paletteColors: ColorOption[] = [
  {
    name: "Satin",
    value: 'satin-dynamic', // Key to identify this special color
    isDynamic: true,
    lightValue: '#303b37',  // Dark color in light mode
    darkValue: '#e8e8e8',   // Light color in dark mode
    checkColorLight: '#e8e8e8', // Light checkmark for dark swatch (Satin in light mode)
    checkColorDark: '#303b37'   // Dark checkmark for light swatch (Satin in dark mode)
  },
  {
    name: "Honeyed Glow",
    value: '#e7c78d',
    checkColorLight: '#000000', // Dark check for light swatch
    checkColorDark: '#000000'  // Dark check for light swatch
  },
  {
    name: "Golden Brown",
    value: '#a27035',
    checkColorLight: '#FFFFFF', // Light check for dark swatch
    checkColorDark: '#FFFFFF'  // Light check for dark swatch
  },
  {
    name: "Amazon",
    value: '#307d5c',
    checkColorLight: '#FFFFFF', // Light check for dark swatch
    checkColorDark: '#FFFFFF'  // Light check for dark swatch
  },
];

// Taplow Variant Logo (viewBox="0 0 289.15 57.05")
const TaplowVariantLogo = ({ color }: { color: string }) => (
  <svg
    id="Layer_1_Taplow_Main"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 289.15 57.05"
    className="w-auto h-auto max-h-24 max-w-full"
    style={{ color: color }}
  >
    <path fill="currentColor" d="M163.53,5.76V0h-26.76v3.15h5.26v5.75l-9.96-5.75h2.59V0h-12.9v3.15h4l8.91,5.13-6.28,6.29c-.41.36-.89.65-1.42.85-.54.2-1.13.31-1.76.31h-3.44v3.15h3.52c1.04-.02,2.03-.21,2.94-.57s1.7-.87,2.38-1.51l6.87-6.9,4.55,2.63v3.19h-5.26v3.15h13.66v-3.15h-5.26v-3.44s13.12,0,13.12,0v-3.15h-13.13V3.15h15.24v2.61h3.13Z"/>
    <rect fill="currentColor" x="16.16" y="27.86" width="6.73" height="6.73" transform="translate(-16.36 22.95) rotate(-45)"/>
    <rect fill="currentColor" x="16.16" y="44.56" width="6.73" height="6.73" transform="translate(-28.17 27.84) rotate(-45)"/>
    <rect fill="currentColor" x="7.93" y="35.91" width="6.73" height="6.73" transform="translate(-24.47 19.49) rotate(-45)"/>
    <rect fill="currentColor" x="265.83" y="44.37" width="6.73" height="6.73" transform="translate(45.09 204.33) rotate(-45)"/>
    <rect fill="currentColor" x="265.95" y="27.61" width="6.73" height="6.73" transform="translate(56.98 199.51) rotate(-45)"/>
    <rect fill="currentColor" x="274.11" y="36.08" width="6.73" height="6.73" transform="translate(53.38 207.76) rotate(-45)"/>
    <path fill="currentColor" d="M41.24,30.36h1.74l-5.89,3.4v-3.4h2.77v-1.38h-6.91v1.38h2.77v6.89h-2.77v1.39h6.91v-1.39h-2.77v-1.9l2.56-1.48,3.69,3.7c.34.33.75.58,1.21.76.46.18.96.28,1.5.29h1.71v-1.39h-1.67c-.35,0-.68-.06-.98-.17-.3-.11-.56-.27-.79-.48l-3.44-3.44,4.88-2.81h2v-1.38h-6.51v1.38Z"/>
    <polygon fill="currentColor" points="59.34 30.36 62.11 30.36 62.11 37.25 59.34 37.25 59.34 38.64 73.15 38.64 73.15 35.88 71.77 35.88 71.77 37.25 63.48 37.25 63.48 34.5 70.39 34.5 70.39 33.11 63.48 33.11 63.48 30.36 71.77 30.36 71.77 31.73 73.15 31.73 73.15 28.97 59.34 28.97 59.34 30.36"/>
    <polygon fill="currentColor" points="97.17 37.25 88.87 37.25 88.87 30.36 91.64 30.36 91.64 28.97 84.73 28.97 84.73 30.36 87.5 30.36 87.5 37.25 84.73 37.25 84.73 38.63 98.54 38.63 98.54 35.88 97.17 35.88 97.17 37.25"/>
    <polygon fill="currentColor" points="122.56 37.25 114.27 37.25 114.27 30.36 117.03 30.36 117.03 28.97 110.13 28.97 110.13 30.36 112.89 30.36 112.89 37.25 110.13 37.25 110.13 38.63 123.93 38.63 123.93 35.88 122.56 35.88 122.56 37.25"/>
    <path fill="currentColor" d="M141.46,34.5l2.31-4.13,2.29,4.13h-4.6ZM145.23,30.36h2.72v-1.38h-8.29v1.38h2.64l-4.02,6.89h-2.76v1.39h6.91v-1.39h-2.51l.78-1.37h6.14l.76,1.37h-2.42v1.39h6.91v-1.39h-2.83l-4.02-6.89Z"/>
    <path fill="currentColor" d="M173.41,34.5h-5.6v-4.14h5.6c.33,0,.64.06.93.16.29.11.53.26.74.44.21.18.38.4.49.65.12.25.18.52.18.81s-.06.56-.18.81c-.12.25-.28.47-.49.65s-.46.33-.74.44c-.29.11-.6.16-.93.16M175.46,37.08c-.3-.11-.56-.27-.79-.47l-.75-.75c.48-.05.92-.18,1.33-.38.41-.2.76-.45,1.07-.75s.54-.65.71-1.05c.17-.4.26-.81.26-1.25,0-.48-.1-.92-.3-1.35-.2-.42-.47-.79-.81-1.1-.34-.31-.75-.56-1.21-.74-.46-.18-.96-.27-1.48-.27h-9.82v1.38h2.77v6.9h-2.77v1.38h6.91v-1.38h-2.77v-1.37h4.19l1.7,1.7c.34.33.75.58,1.21.76s.96.28,1.49.29h1.46v-1.38h-1.42c-.35,0-.68-.06-.97-.17"/>
    <path fill="currentColor" d="M201.93,35.15c-.22.42-.51.78-.89,1.09-.38.31-.82.56-1.32.74-.5.18-1.04.27-1.61.27h-4.54v-6.89h4.54c.57,0,1.11.09,1.61.27s.94.43,1.32.74c.38.31.67.68.89,1.1.21.42.32.87.32,1.34s-.11.92-.32,1.34M202.09,30.39c-.5-.44-1.08-.78-1.75-1.04-.67-.25-1.39-.38-2.15-.38h-8.75v1.39h2.77v6.89h-2.77v1.38h8.75c.76,0,1.48-.13,2.15-.38.67-.25,1.25-.6,1.75-1.03.5-.44.89-.94,1.18-1.53.29-.58.43-1.21.43-1.88s-.15-1.3-.43-1.88c-.29-.59-.68-1.1-1.18-1.54"/>
    <polygon fill="currentColor" points="214.24 30.36 217 30.36 217 37.25 214.24 37.25 214.24 38.64 228.04 38.64 228.04 35.88 226.67 35.88 226.67 37.25 218.38 37.25 218.38 34.5 225.28 34.5 225.28 33.11 218.38 33.11 218.38 30.36 226.67 30.36 226.67 31.73 228.04 31.73 228.04 28.97 214.24 28.97 214.24 30.36"/>
    <polygon fill="currentColor" points="249.29 30.36 252.06 30.36 252.06 36.7 244.33 28.97 239.63 28.97 239.63 30.36 242.4 30.36 242.4 37.25 239.63 37.25 239.63 38.64 246.54 38.64 246.54 37.25 243.77 37.25 243.77 30.36 252.05 38.64 253.43 38.64 253.43 30.36 256.2 30.36 256.2 28.97 249.29 28.97 249.29 30.36"/>
    <polygon fill="currentColor" points="88.23 46.14 90.08 46.14 90.08 50.74 88.23 50.74 88.23 51.66 92.84 51.66 92.84 50.74 90.99 50.74 90.99 48.9 95.6 48.9 95.6 47.98 90.99 47.98 90.99 46.14 96.52 46.14 96.52 47.06 97.44 47.06 97.44 45.22 88.23 45.22 88.23 46.14"/>
    <path fill="currentColor" d="M115.49,48.9l1.54-2.75,1.53,2.75h-3.07ZM118.01,46.14h1.81v-.92h-5.53v.92h1.76l-2.68,4.6h-1.84v.92h4.61v-.92h-1.67l.52-.91h4.1l.51.91h-1.62v.92h4.61v-.92h-1.89l-2.68-4.6Z"/>
    <path fill="currentColor" d="M145.48,48.9h-3.74v-2.76h3.74c.22,0,.43.04.62.11s.36.17.5.29c.14.12.25.27.33.44.08.17.12.35.12.54s-.04.37-.12.54c-.08.17-.19.31-.33.43-.14.12-.31.22-.5.3-.19.07-.4.11-.62.11M146.85,50.62c-.2-.08-.38-.18-.53-.32l-.5-.5c.32-.04.61-.12.88-.25.27-.13.51-.3.71-.5s.36-.44.47-.7c.12-.26.17-.54.17-.83,0-.32-.07-.62-.2-.9-.13-.28-.31-.53-.54-.73-.23-.21-.5-.37-.8-.49-.31-.12-.64-.18-.99-.18h-6.55v.92h1.85v4.6h-1.85v.92h4.61v-.92h-1.85v-.91h2.79l1.13,1.13c.23.22.5.39.81.51.31.12.64.19.99.19h.97v-.92h-.95c-.23,0-.45-.04-.65-.11"/>
    <polygon fill="currentColor" points="170.89 49.94 168.17 45.22 164.85 45.22 164.85 46.14 166.7 46.14 166.7 50.74 164.85 50.74 164.85 51.66 169 51.66 169 50.74 167.61 50.74 167.61 46.12 170.82 51.66 170.96 51.66 173.62 46.12 173.62 50.74 172.78 50.74 172.78 51.66 176.92 51.66 176.92 50.74 175.09 50.74 175.09 46.14 176.92 46.14 176.92 45.22 173.62 45.22 170.89 49.94"/>
    <path fill="currentColor" d="M200.23,48.5c-.24-.13-.49-.21-.75-.27-.25-.05-.46-.09-.62-.1l-3-.29c-.42-.03-.75-.13-.99-.29-.24-.15-.36-.37-.36-.64,0-.13.05-.26.15-.39.1-.13.26-.24.48-.33.22-.1.5-.17.85-.23.35-.06.77-.09,1.26-.09.59,0,1.12.05,1.6.14.48.1.86.22,1.14.37v.67h.91v-1.84h-.91v.22c-.38-.13-.8-.24-1.27-.31-.46-.07-.95-.11-1.47-.11-.46,0-.91.03-1.36.09-.45.06-.85.16-1.21.31-.35.15-.64.34-.87.59-.22.25-.33.56-.33.94s.09.67.26.9c.18.23.39.41.63.53.24.13.49.21.74.27.25.05.46.09.62.11l3.01.29c.42.04.75.13.99.29.24.16.36.37.36.64,0,.14-.06.27-.17.39-.11.13-.28.24-.51.33s-.53.17-.88.23c-.36.06-.78.09-1.27.09-.64,0-1.22-.05-1.75-.15-.53-.1-.94-.22-1.24-.38v-.66h-.92v1.84h.92v-.25c.41.14.87.25,1.38.33.51.08,1.04.12,1.61.12.46,0,.92-.03,1.38-.09.46-.06.88-.16,1.25-.31.37-.15.67-.34.91-.59.23-.25.35-.56.35-.95s-.09-.67-.26-.9c-.18-.23-.39-.41-.63-.53"/>
    <polygon fill="currentColor" points="33.5 48.57 34.39 48.57 34.39 47.97 33.5 47.97 33.5 46.94 34.65 46.94 34.65 46.34 32.81 46.34 32.81 50.35 34.73 50.35 34.73 49.75 33.5 49.75 33.5 48.57"/>
    <path fill="currentColor" d="M37.67,47.28c0-.25.12-.39.34-.39.15,0,.34.1.37.44l.65-.07c-.06-.57-.39-.97-.95-.97-.68,0-1.06.36-1.06,1,0,1.15,1.4,1.36,1.4,2.15,0,.24-.16.37-.4.37-.22,0-.38-.2-.41-.6l-.65.09c.03.6.39,1.11,1.03,1.11s1.09-.37,1.09-1.03c0-1.09-1.4-1.41-1.4-2.09"/>
    <polygon fill="currentColor" points="41.24 46.94 41.9 46.94 41.9 50.35 42.59 50.35 42.59 46.94 43.26 46.94 43.26 46.34 41.24 46.34 41.24 46.94"/>
    <path fill="currentColor" d="M46.95,49.22c0,.42-.13.56-.49.56h-.24v-2.87h.24c.37,0,.49.14.49.56v1.75ZM46.55,46.34h-1.02v4h1.02c.71,0,1.09-.39,1.09-1.21v-1.58c0-.82-.38-1.21-1.09-1.21"/>
    <path fill="currentColor" d="M241.23,45.54c-.77,0-1.21.54-1.21,1.24v.22h.78v-.32c0-.29.13-.49.4-.49.22,0,.37.16.37.54,0,.7-.55,1.52-1.57,3v.64h2.28v-.67h-1.44c1.28-1.79,1.52-2.35,1.52-3.1,0-.55-.44-1.06-1.11-1.06"/>
    <path fill="currentColor" d="M245.91,49.33c0,.31-.14.46-.38.46s-.38-.15-.38-.46v-2.69c0-.31.14-.46.38-.46s.38.15.38.46v2.69ZM245.53,45.54c-.82,0-1.16.41-1.16,1.31v2.28c0,.9.34,1.31,1.16,1.31s1.16-.41,1.16-1.31v-2.28c0-.9-.34-1.31-1.16-1.31"/>
    <path fill="currentColor" d="M249.94,45.54c-.77,0-1.21.54-1.21,1.24v.22h.78v-.32c0-.29.13-.49.4-.49.22,0,.37.16.37.54,0,.7-.55,1.52-1.57,3v.64h2.28v-.67h-1.44c1.28-1.79,1.52-2.35,1.52-3.1,0-.55-.44-1.06-1.11-1.06"/>
    <path fill="currentColor" d="M254.2,48.61h-.81l.8-1.86h.01v1.86ZM254.93,45.61h-.79l-1.39,3.01v.61h1.42v1.15h.75v-1.15h.44v-.61h-.44v-3.01Z"/>
    <path fill="currentColor" d="M4.78,36.74l.69.69c.22.22.57.22.79,0l12.65-12.65c.22-.22.59-.22.81,0l6.32,6.32c.22.22.22.59,0,.81l-3.94,3.94c-.22.22-.22.59,0,.81l.67.67c.22.22.59.22.81,0l5.08-5.08c.41-.41.41-1.07,0-1.48l-6.24-6.24c-.21-.21-.06-.58.24-.58h242.77c.47,0,.71.57.37.9l-5.53,5.53c-.2.2-.31.46-.31.74s.11.54.31.74l14.44,14.44c.21.21.54.21.75,0l.73-.73c.21-.21.21-.54,0-.75l-13.33-13.33c-.21-.21-.21-.54,0-.75l5.99-5.99c.21-.21.54.21.75,0l4.84,4.84c.21.21.54.21.75,0l.73-.73c.21-.21.21-.54,0-.75l-5.96-5.96h0c-.19-.18-.45-.3-.73-.3H19.31c-.27,0-.54.1-.74.31l-13.79,13.79c-.22.22-.22.57,0,.79"/>
    <path fill="currentColor" d="M283.08,40.94l-13.21,13.21c-.21.21-.54.21-.75,0l-6.38-6.38c-.21-.21-.21-.54,0-.75l4.66-4.66c.21-.21.21-.54,0-.75l-.73-.73c-.21-.21-.54-.21-.75,0l-5.78,5.78c-.2.2-.31.46-.31.74s.11.54.31.74l5.92,5.92c.33.33.1.9-.37.9H22.67c-.21,0-.31-.25-.17-.4l6.03-6.03c.41-.41.41-1.07,0-1.48l-13.12-13.12c-.21-.21-.56-.21-.77,0l-.71.71c-.21.21-.21.56,0,.77l12.05,12.05c.18.18.18.48,0,.66l-6,6c-.23.23-.6.23-.83,0l-4.53-4.53c-.29-.29-.76-.29-1.06,0l-.42.42c-.29.29-.29.76,0,1.06l5.68,5.68h0c.19.18.45.3.73.3h249.91c.28,0,.54-.11.74-.31l14.33-14.33c.21-.21.21-.54,0-.75l-.73-.73c-.21-.21-.54-.21-.75,0"/>
    <path fill="currentColor" d="M17.93,41.57l-.66-.65c-.23-.23-.6-.23-.82,0l-5.86,5.89c-1.4,1.44-3.51,1.92-5.56,1.11-1.82-.72-2.96-2.52-2.93-4.47,0-.04,0-.08,0-.12,0-.26-.09-.51-.27-.69l-1.06-1.11c-.17-.18-.48-.09-.53.15-.11.58-.23,1.32-.23,1.7,0,3.88,3.15,7.03,7.03,7.03,1.92,0,3.72-.76,5.04-2.13l5.85-5.88c.23-.23.23-.6,0-.82"/>
    <path fill="currentColor" d="M8.07,45.96c.2.2.54.2.74,0l.74-.74c.2-.21.2-.54,0-.74l-5.93-5.9c-1.38-1.34-1.88-3.33-1.21-5.3.66-1.96,2.58-3.2,4.65-3.2.23,0,.3-.01.41,0,.19.02.38-.05.52-.19l1.09-1.09c.17-.17.11-.47-.12-.55-.66-.22-1.48-.26-1.9-.26C3.17,28,.02,31.15.02,35.03c0,1.92.76,3.72,2.13,5.04l5.92,5.89Z"/>
    <path fill="currentColor" d="M271.91,37.47c.21.21.55.21.76,0l5.89-5.92c.94-.97,2.2-1.51,3.55-1.51,2.72,0,4.94,2.22,4.94,4.94,0,.24-.02.48-.05.72-.03.2.05.47.19.6l1.14,1.11c.13.13.35.07.4-.11.22-.79.4-1.87.4-2.32,0-3.88-3.15-7.03-7.03-7.03-1.92,0-3.71.76-5.04,2.13l-5.88,5.91c-.21.21-.21.55,0,.76l.72.71Z"/>
    <path fill="currentColor" d="M286.63,38.58l-5.92-5.89c-.21-.21-.54-.21-.75,0l-.73.73c-.21.21-.21.54,0,.75l5.93,5.9c1.38,1.34,1.88,3.33,1.21,5.3-.69,2.03-2.68,3.28-4.82,3.19-.1,0-.19-.02-.33-.04-.35-.05-.73.39-.73.39l-.88.9c-.22.21-.1.59.2.63.67.1,1.55.21,1.91.21,3.88,0,7.03-3.15,7.03-7.03,0-1.92-.76-3.72-2.13-5.04"/>
  </svg>
);

// Barrow Variant Logo (viewBox="0 0 287.98 54.45")
const BarrowVariantLogo = ({ color }: { color: string }) => (
  <svg
    id="Layer_1_Barrow_Main"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 287.98 54.45"
    className="w-auto h-auto max-h-24 max-w-full"
    style={{ color: color }}
  >
    <path fill="currentColor" d="M164.09,6.02V0h-27.99v3.3h5.5v6.01l-10.42-6.01h2.71V0h-13.49v3.3h4.18l9.32,5.37-6.57,6.58c-.43.38-.93.68-1.49.89-.56.21-1.18.32-1.84.32h-3.6v3.3h3.68c1.09-.02,2.13-.22,3.07-.6.95-.38,1.78-.91,2.49-1.58l7.19-7.21,4.76,2.75v3.34h-5.5v3.3h14.29v-3.3h-5.5v-3.6s13.72,0,13.72,0v-3.3h-13.73V3.3h15.94v2.72h3.27Z"/>
    <rect fill="currentColor" x="9.67" y="29.53" width="7.04" height="7.04" transform="translate(-19.51 19.01) rotate(-45)"/>
    <rect fill="currentColor" x="9.67" y="45.95" width="7.04" height="7.04" transform="translate(-31.12 23.82) rotate(-45)"/>
    <rect fill="currentColor" x="1.46" y="37.74" width="7.04" height="7.04" transform="translate(-27.72 15.6) rotate(-45)"/>
    <rect fill="currentColor" x="271.27" y="45.95" width="7.04" height="7.04" transform="translate(45.5 208.8) rotate(-45)"/>
    <rect fill="currentColor" x="271.27" y="29.53" width="7.04" height="7.04" transform="translate(57.11 203.99) rotate(-45)"/>
    <rect fill="currentColor" x="279.48" y="37.74" width="7.04" height="7.04" transform="translate(53.71 212.2) rotate(-45)"/>
    <path fill="currentColor" d="M35.91,31.75h1.82l-6.17,3.56v-3.56h2.9v-1.45h-7.23v1.45h2.9v7.21h-2.9v1.45h7.23v-1.45h-2.9v-1.99l2.68-1.54,3.86,3.88c.36.34.78.61,1.26.8.48.19,1.01.3,1.57.3h1.79v-1.45h-1.75c-.37,0-.71-.06-1.02-.18-.31-.12-.59-.28-.83-.5l-3.6-3.6,5.1-2.94h2.1v-1.45h-6.81v1.45Z"/>
    <polygon fill="currentColor" points="54.84 31.75 57.74 31.75 57.74 38.96 54.84 38.96 54.84 40.41 69.28 40.41 69.28 37.53 67.84 37.53 67.84 38.96 59.17 38.96 59.17 36.08 66.4 36.08 66.4 34.63 59.17 34.63 59.17 31.75 67.84 31.75 67.84 33.19 69.28 33.19 69.28 30.3 54.84 30.3 54.84 31.75"/>
    <polygon fill="currentColor" points="94.4 38.96 85.73 38.96 85.73 31.75 88.63 31.75 88.63 30.3 81.4 30.3 81.4 31.75 84.29 31.75 84.29 38.96 81.4 38.96 81.4 40.41 95.84 40.41 95.84 37.53 94.4 37.53 94.4 38.96"/>
    <polygon fill="currentColor" points="120.96 38.96 112.29 38.96 112.29 31.75 115.18 31.75 115.18 30.3 107.96 30.3 107.96 31.75 110.85 31.75 110.85 38.96 107.96 38.96 107.96 40.41 122.4 40.41 122.4 37.53 120.96 37.53 120.96 38.96"/>
    <path fill="currentColor" d="M140.74,36.08l2.41-4.32,2.4,4.32h-4.81ZM144.68,31.75h2.84v-1.45h-8.68v1.45h2.76l-4.21,7.21h-2.88v1.45h7.23v-1.45h-2.62l.81-1.43h6.43l.8,1.43h-2.54v1.45h7.23v-1.45h-2.97l-4.21-7.21Z"/>
    <path fill="currentColor" d="M174.15,36.08h-5.86v-4.33h5.86c.35,0,.67.06.97.17s.56.27.78.46c.22.19.39.42.52.68.12.26.19.54.19.85s-.06.59-.19.85c-.12.26-.3.49-.52.68-.22.19-.48.35-.78.46s-.62.17-.97.17M176.3,38.78c-.31-.12-.59-.28-.83-.5l-.79-.79c.5-.05.96-.19,1.39-.39.43-.21.8-.47,1.12-.79.32-.32.56-.68.74-1.1.18-.41.27-.85.27-1.31,0-.5-.1-.97-.31-1.41-.21-.44-.49-.82-.85-1.15-.36-.33-.78-.58-1.26-.77-.48-.19-1-.28-1.55-.28h-10.27v1.45h2.9v7.21h-2.9v1.45h7.23v-1.45h-2.9v-1.43h4.39l1.78,1.78c.36.34.78.61,1.27.8.49.19,1.01.29,1.56.3h1.53v-1.45h-1.49c-.37,0-.71-.06-1.02-.18"/>
    <path fill="currentColor" d="M203.98,36.76c-.23.44-.54.82-.93,1.14-.4.33-.85.58-1.38.77-.53.19-1.09.28-1.68.28h-4.74v-7.21h4.74c.6,0,1.16.1,1.68.28.52.19.98.45,1.38.77.4.33.71.71.93,1.15.23.44.34.91.34,1.41s-.11.96-.34,1.4M204.15,31.79c-.52-.46-1.13-.82-1.83-1.08-.7-.27-1.45-.4-2.25-.4h-9.16v1.45h2.9v7.21h-2.9v1.45h9.16c.8,0,1.55-.13,2.25-.4.7-.27,1.31-.63,1.83-1.08s.93-.99,1.23-1.6.46-1.27.46-1.96-.15-1.36-.46-1.97-.71-1.15-1.23-1.61"/>
    <polygon fill="currentColor" points="216.86 31.75 219.75 31.75 219.75 38.96 216.86 38.96 216.86 40.41 231.29 40.41 231.29 37.53 229.86 37.53 229.86 38.96 221.19 38.96 221.19 36.08 228.41 36.08 228.41 34.63 221.19 34.63 221.19 31.75 229.86 31.75 229.86 33.19 231.29 33.19 231.29 30.3 216.86 30.3 216.86 31.75"/>
    <polygon fill="currentColor" points="253.52 31.75 256.42 31.75 256.42 38.38 248.34 30.3 243.41 30.3 243.41 31.75 246.31 31.75 246.31 38.96 243.41 38.96 243.41 40.41 250.64 40.41 250.64 38.96 247.74 38.96 247.74 31.75 256.4 40.41 257.85 40.41 257.85 31.75 260.75 31.75 260.75 30.3 253.52 30.3 253.52 31.75"/>
    <polygon fill="currentColor" points="85.06 48.26 86.99 48.26 86.99 53.07 85.06 53.07 85.06 54.04 89.88 54.04 89.88 53.07 87.95 53.07 87.95 51.15 92.76 51.15 92.76 50.18 87.95 50.18 87.95 48.26 93.73 48.26 93.73 49.22 94.68 49.22 94.68 47.3 85.06 47.3 85.06 48.26"/>
    <path fill="currentColor" d="M113.57,51.15l1.61-2.88,1.6,2.88h-3.21ZM116.2,48.26h1.89v-.97h-5.78v.97h1.84l-2.8,4.81h-1.92v.97h4.82v-.97h-1.75l.54-.96h4.28l.53.96h-1.69v.97h4.82v-.97h-1.98l-2.8-4.81Z"/>
    <path fill="currentColor" d="M144.94,51.15h-3.91v-2.89h3.91c.23,0,.45.04.65.12.2.08.37.18.52.31.15.13.26.28.35.46.08.17.12.36.12.56s-.04.39-.12.57c-.08.17-.2.33-.35.45-.15.13-.32.23-.52.31-.2.08-.41.12-.65.12M146.37,52.95c-.21-.08-.39-.19-.55-.33l-.52-.52c.33-.04.64-.12.92-.26.28-.14.53-.31.74-.52.21-.21.38-.46.5-.73.12-.28.18-.57.18-.87,0-.33-.07-.64-.21-.94-.14-.29-.33-.55-.56-.77-.24-.22-.52-.39-.84-.51s-.67-.19-1.03-.19h-6.85v.97h1.93v4.81h-1.93v.97h4.82v-.97h-1.93v-.96h2.92l1.19,1.19c.24.23.52.4.85.53.33.13.67.2,1.04.2h1.02v-.97h-.99c-.24,0-.47-.04-.68-.12"/>
    <polygon fill="currentColor" points="171.52 52.24 168.67 47.3 165.2 47.3 165.2 48.26 167.14 48.26 167.14 53.07 165.2 53.07 165.2 54.04 169.54 54.04 169.54 53.07 168.09 53.07 168.09 48.24 171.45 54.04 171.59 54.04 174.94 48.24 174.94 53.07 173.5 53.07 173.5 54.04 177.83 54.04 177.83 53.07 175.91 53.07 175.91 48.26 177.83 48.26 177.83 47.3 174.37 47.3 171.52 52.24"/>
    <path fill="currentColor" d="M202.21,50.73c-.25-.13-.51-.23-.78-.28-.27-.06-.48-.09-.65-.11l-3.13-.3c-.44-.04-.79-.14-1.04-.3-.25-.16-.38-.38-.38-.67,0-.14.05-.28.16-.41.1-.13.27-.25.5-.35.23-.1.53-.18.89-.24.36-.06.81-.09,1.32-.09.61,0,1.17.05,1.67.15.5.1.9.23,1.19.39v.7h.96v-1.92h-.96v.23c-.4-.14-.84-.25-1.32-.33-.48-.08-1-.12-1.53-.12-.48,0-.95.03-1.43.09-.47.06-.89.17-1.26.32-.37.15-.67.36-.91.62-.23.26-.35.59-.35.99s.09.7.28.94c.18.24.4.42.66.56.25.13.51.23.78.28.26.05.48.09.64.11l3.14.3c.44.04.79.14,1.03.3.25.16.37.38.37.67,0,.14-.06.28-.18.41-.12.13-.3.25-.54.35-.24.1-.55.18-.92.24-.37.06-.82.09-1.33.09-.67,0-1.28-.05-1.83-.15-.55-.1-.98-.23-1.3-.4v-.69h-.96v1.92h.96v-.26c.43.15.91.26,1.44.35.53.08,1.09.12,1.69.12.48,0,.96-.03,1.44-.09.48-.06.92-.17,1.31-.32.39-.15.7-.36.95-.62.24-.26.36-.59.36-.99s-.09-.7-.28-.94c-.18-.24-.4-.42-.66-.56"/>
    <polygon fill="currentColor" points="27.81 50.81 28.74 50.81 28.74 50.18 27.81 50.18 27.81 49.1 29.02 49.1 29.02 48.47 27.09 48.47 27.09 52.66 29.1 52.66 29.1 52.04 27.81 52.04 27.81 50.81"/>
    <path fill="currentColor" d="M32.18,49.45c0-.26.13-.41.36-.41.16,0,.35.1.38.46l.68-.08c-.06-.59-.41-1.01-1-1.01-.71,0-1.11.38-1.11,1.04,0,1.2,1.46,1.42,1.46,2.25,0,.25-.17.38-.42.38-.23,0-.4-.21-.43-.63l-.68.1c.03.63.41,1.16,1.08,1.16s1.14-.38,1.14-1.07c0-1.14-1.46-1.48-1.46-2.19"/>
    <polygon fill="currentColor" points="35.9 49.1 36.6 49.1 36.6 52.66 37.32 52.66 37.32 49.1 38.01 49.1 38.01 48.47 35.9 48.47 35.9 49.1"/>
    <path fill="currentColor" d="M41.88,51.48c0,.44-.13.59-.52.59h-.25v-3h.25c.38,0,.52.15,.52.59v1.83ZM41.46,48.47h-1.07v4.19h1.07c.74,0,1.14-.41,1.14-1.26v-1.66c0-.86-.39-1.26-1.14-1.26"/>
    <path fill="currentColor" d="M245.09,47.63c-.8,0-1.27.57-1.27,1.3v.23h.81v-.34c0-.3.14-.52.41-.52.23,0,.39.17.39.57,0,.73-.58,1.59-1.64,3.14v.67h2.38v-.7h-1.51c1.34-1.88,1.59-2.46,1.59-3.24,0-.58-.46-1.1-1.16-1.1"/>
    <path fill="currentColor" d="M249.98,51.6c0,.32-.14.48-.4.48s-.4-.15-.4-.48v-2.81c0-.32.15-.48.4-.48s.4.15.4.48v2.81ZM249.59,47.63c-.86,0-1.21.43-1.21,1.37v2.39c0,.94.36,1.37,1.21,1.37s1.21-.43,1.21-1.37v-2.39c0-.94-.36-1.37-1.21-1.37"/>
    <path fill="currentColor" d="M254.2,47.63c-.8,0-1.27.57-1.27,1.3v.23h.81v-.34c0-.3.14-.52.41-.52.23,0,.39.17.39.57,0,.73-.58,1.59-1.64,3.14v.67h2.38v-.7h-1.51c1.34-1.88,1.59-2.46,1.59-3.24,0-.58-.46-1.1-1.16-1.1"/>
    <path fill="currentColor" d="M258.65,50.85h-.85l.84-1.95h.01v1.95ZM259.43,47.7h-.83l-1.45,3.15v.63h1.49v1.2h.79v-1.2h.46v-.63h-.46v-3.15Z"/>
  </svg>
);

// Emblem Logo
const EmblemLogo = ({ color }: { color: string }) => (
  <svg
    id="Layer_1_Emblem"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51.09 109.07"
    className="w-auto h-auto max-h-24 max-w-full"
    style={{ color: color }}
  >
    <path fill="currentColor" d="M51.09,50.04v-7.04H18.35v3.86h6.43v7.03l-12.18-7.03h3.17v-3.86H0v3.86h4.89l10.9,6.27-7.69,7.69c-.5.44-1.09.79-1.74,1.04-.66.25-1.38.38-2.15.38H0v3.86h4.31c1.28-.02,2.49-.25,3.59-.7,1.11-.44,2.08-1.06,2.91-1.85l8.41-8.44,5.57,3.22v3.91h-6.43v3.86h16.71v-3.86h-6.43v-4.2s16.04,0,16.04,0v-3.86h-16.05v-7.33h18.65v3.19h3.83Z"/>
    <rect fill="currentColor" x="34.63" y="18.73" width="13.63" height="13.63" transform="translate(-5.92 36.79) rotate(-45)"/>
    <rect fill="currentColor" x="2.82" y="18.73" width="13.63" height="13.63" transform="translate(-15.24 14.3) rotate(-45)"/>
    <rect fill="currentColor" x="18.73" y="2.82" width="13.63" height="13.63" transform="translate(.67 20.89) rotate(-45)"/>
    <rect fill="currentColor" x="2.85" y="76.73" width="13.63" height="13.63" transform="translate(-56.24 31.3) rotate(-45)"/>
    <rect fill="currentColor" x="34.64" y="76.73" width="13.63" height="13.63" transform="translate(-46.93 53.78) rotate(-45)"/>
    <rect fill="currentColor" x="18.74" y="92.62" width="13.63" height="13.63" transform="translate(-62.83 47.2) rotate(-45)"/>
  </svg>
);

// Patch Logo
const PatchLogo = ({ color }: { color: string }) => (
  <svg
    id="Layer_1_Patch"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60.64 108.9"
    className="w-auto h-auto max-h-24 max-w-full"
    style={{ color: color }}
  >
    <rect fill="currentColor" x="39.7" y="21.47" width="15.63" height="15.63" transform="translate(-6.79 42.18) rotate(-45)"/>
    <rect fill="currentColor" x="3.24" y="21.47" width="15.63" height="15.63" transform="translate(-17.47 16.39) rotate(-45)"/>
    <rect fill="currentColor" x="21.47" y="3.24" width="15.63" height="15.63" transform="translate(.76 23.95) rotate(-45)"/>
    <path fill="currentColor" d="M9.49,47.98h1.99l-6.75,3.89v-3.89h3.17v-1.58H0v1.58h3.17v7.89H0v1.58h7.91v-1.58h-3.17v-2.17l2.93-1.69,4.23,4.24c.39.37.85.66,1.38.88.53.21,1.1.32,1.71.33h1.96v-1.58h-1.92c-.4,0-.78-.07-1.12-.2-.34-.13-.64-.31-.91-.54l-3.94-3.94,5.59-3.22h2.29v-1.58h-7.46v1.58Z"/>
    <polygon fill="currentColor" points="21.91 47.98 25.08 47.98 25.08 55.87 21.91 55.87 21.91 57.46 37.71 57.46 37.71 54.3 36.14 54.3 36.14 55.87 26.65 55.87 26.65 52.72 34.56 52.72 34.56 51.13 26.65 51.13 26.65 47.98 36.14 47.98 36.14 49.55 37.71 49.55 37.71 46.39 21.91 46.39 21.91 47.98"/>
    <polygon fill="currentColor" points="57.48 55.87 47.99 55.87 47.99 47.98 51.16 47.98 51.16 46.39 43.25 46.39 43.25 47.98 46.42 47.98 46.42 55.87 43.25 55.87 43.25 57.46 59.05 57.46 59.05 54.3 57.48 54.3 57.48 55.87"/>
    <polygon fill="currentColor" points="15.24 77.21 5.74 77.21 5.74 69.31 8.91 69.31 8.91 67.73 1 67.73 1 69.31 4.17 69.31 4.17 77.21 1 77.21 1 78.79 16.81 78.79 16.81 75.64 15.24 75.64 15.24 77.21"/>
    <path fill="currentColor" d="M27.13,74.05l2.64-4.72,2.63,4.72h-5.27ZM31.45,69.31h3.11v-1.58h-9.49v1.58h3.02l-4.6,7.89h-3.15v1.58h7.91v-1.58h-2.87l.89-1.57h7.03l.88,1.57h-2.78v1.58h7.91v-1.58h-3.25l-4.6-7.89Z"/>
    <path fill="currentColor" d="M54.18,74.05h-6.42v-4.74h6.42c.38,0,.74.06,1.06.19.33.13.61.29.85.5.24.21.43.46.57.75.14.29.2.6.2.93s-.07.64-.2.93c-.14.29-.32.54-.57.75-.24.21-.53.38-.85.51-.33.13-.68.19-1.06.19M56.53,77.01c-.34-.13-.64-.31-.91-.54l-.86-.86c.54-.06,1.05-.2,1.52-.43.47-.23.88-.51,1.22-.86.35-.35.62-.75.82-1.2.2-.45.29-.93.29-1.43,0-.54-.11-1.06-.34-1.54-.23-.48-.54-.9-.93-1.26-.39-.36-.85-.64-1.38-.85-.53-.21-1.09-.31-1.7-.31h-11.25v1.59h3.17v7.89h-3.17v1.59h7.91v-1.58h-3.17v-1.57h4.8l1.95,1.95c.39.37.86.66,1.39.88.53.21,1.1.32,1.71.33h1.68v-1.58h-1.63c-.4,0-.78-.07-1.12-.2"/>
    <path fill="currentColor" d="M15.04,95.33c-.25.48-.59.9-1.02,1.25-.43.36-.94.64-1.51.85-.57.21-1.19.31-1.84.31h-5.19v-7.89h5.19c.65,0,1.27.1,1.84.31.57.21,1.08.49,1.51.85.43.36.77.78,1.02,1.26.25.48.37,1,.37,1.54s-.12,1.05-.37,1.53M15.22,89.88c-.57-.5-1.24-.89-2-1.19-.76-.29-1.59-.44-2.46-.44H.74v1.58h3.17v7.89H.74v1.59h10.02c.88,0,1.7-.15,2.46-.44.76-.29,1.43-.69,2-1.19.57-.5,1.02-1.08,1.35-1.75.33-.67.5-1.39.5-2.15s-.17-1.48-.5-2.16c-.33-.67-.78-1.26-1.35-1.76"/>
    <polygon fill="currentColor" points="21.91 89.84 25.08 89.84 25.08 97.74 21.91 97.74 21.91 99.32 37.71 99.32 37.71 96.17 36.14 96.17 36.14 97.74 26.65 97.74 26.65 94.58 34.56 94.58 34.56 93 26.65 93 26.65 89.84 36.14 89.84 36.14 91.41 37.71 91.41 37.71 88.26 21.91 88.26 21.91 89.84"/>
    <polygon fill="currentColor" points="52.73 89.84 55.9 89.84 55.9 97.1 47.05 88.26 41.66 88.26 41.66 89.84 44.83 89.84 44.83 97.74 41.66 97.74 41.66 99.32 49.57 99.32 49.57 97.74 46.4 97.74 46.4 89.84 55.88 99.32 57.47 99.32 57.47 89.84 60.64 89.84 60.64 88.26 52.73 88.26 52.73 89.84"/>
    <polygon fill="currentColor" points=".74 105.37 .74 105.86 1.72 105.86 1.72 108.3 .74 108.3 .74 108.79 3.18 108.79 3.18 108.3 2.2 108.3 2.2 107.32 4.65 107.32 4.65 106.83 2.2 106.83 2.2 105.86 5.14 105.86 5.14 106.35 5.62 106.35 5.62 105.37 .74 105.37"/>
    <path fill="currentColor" d="M16.02,105.86l.81,1.46h-1.63l.82-1.46ZM14.56,105.37v.49h.93l-1.42,2.44h-.97v.49h2.44v-.49h-.89l.27-.49h2.17l.27.49h-.86v.49h2.44v-.49h-1l-1.42-2.44h.96v-.49h-2.93Z"/>
    <path fill="currentColor" d="M31.11,107.32h-1.98v-1.46h1.98c.12,0,.23.02.33.06.1.04.19.09.26.16.07.07.13.14.18.23.04.09.06.18.06.29s-.02.2-.06.29c-.04.09-.1.17-.18.23-.07.07-.16.12-.26.16-.1.04-.21.06-.33.06M31.84,108.24c-.11-.04-.2-.1-.28-.17l-.27-.27c.17-.02.32-.06.47-.13.14-.07.27-.16.38-.27.11-.11.19-.23.25-.37.06-.14.09-.29.09-.44,0-.17-.04-.33-.11-.48-.07-.15-.17-.28-.29-.39-.12-.11-.26-.2-.43-.26-.16-.06-.34-.1-.52-.1h-3.47v.49h.98v2.44h-.98v.49h2.44v-.49h-.98v-.49h1.48l.6.6c.12.11.26.21.43.27.16.07.34.1.53.1h.52v-.49h-.5c-.12,0-.24-.02-.35-.06"/>
    <polygon fill="currentColor" points="46.04 105.37 44.6 107.87 43.15 105.37 41.39 105.37 41.39 105.86 42.37 105.86 42.37 108.3 41.39 108.3 41.39 108.79 43.59 108.79 43.59 108.3 42.86 108.3 42.86 105.85 44.56 108.79 44.63 108.79 46.33 105.85 46.33 108.3 45.6 108.3 45.6 108.79 47.8 108.79 47.8 108.3 46.82 108.3 46.82 105.86 47.8 105.86 47.8 105.37 46.04 105.37"/>
    <path fill="currentColor" d="M60.16,107.11c-.13-.07-.26-.11-.4-.14-.14-.03-.25-.05-.33-.06l-1.59-.15c-.22-.02-.4-.07-.53-.15-.13-.08-.19-.2-.19-.34,0-.07.03-.14.08-.21.05-.07.14-.13.25-.18.12-.05.27-.09.45-.12.18-.03.41-.05.67-.05.31,0,.59.03.85.08.25.05.45.12.6.2v.35h.49v-.97h-.49v.12c-.2-.07-.43-.13-.67-.17-.25-.04-.51-.06-.78-.06-.24,0-.48.02-.72.05-.24.03-.45.09-.64.16-.19.08-.34.18-.46.32s-.18.3-.18.5.05.35.14.48c.09.12.2.22.33.28.13.07.26.11.39.14.13.03.24.05.33.06l1.6.15c.22.02.4.07.52.15.13.08.19.2.19.34,0,.07-.03.14-.09.21-.06.07-.15.13-.27.18-.12.05-.28.09-.47.12-.19.03-.42.05-.68.05-.34,0-.65-.03-.93-.08-.28-.05-.5-.12-.66-.2v-.35h-.49v.97h.49v-.13c.22.07.46.13.73.17.27.04.55.06.86.06.24,0,.49-.02.73-.05.24-.03.46-.09.66-.16.2-.08.36-.18.48-.32.12-.13.18-.3.18-.5s-.05-.35-.14-.48-.2-.21-.33-.28"/>
  </svg>
);

// Simple check icon, color can be passed as prop
const CheckIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function SvgLogoSwitcher() {
  const { theme } = useTheme();
  const [activeLogo, setActiveLogo] = useState<'taplow' | 'barrow'>('taplow');
  const [mounted, setMounted] = useState(false);

  const satinOption = paletteColors.find(c => c.name === "Satin")!;
  
  // Determine initial color based on server's default theme assumption ('dark')
  const serverDefaultSatinColor = satinOption.darkValue!;
  const [currentColor, setCurrentColor] = useState<string>(serverDefaultSatinColor);
  const [selectedColorName, setSelectedColorName] = useState<string>(satinOption.name);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) { // Only run this effect after client mount
      if (selectedColorName === "Satin") {
        setCurrentColor(theme === 'light' ? satinOption.lightValue! : satinOption.darkValue!);
      }
      // For other static colors, currentColor is set directly by handleColorChange
    }
  }, [theme, selectedColorName, satinOption, mounted]);

  const toggleLogo = () => {
    setActiveLogo(prev => prev === 'taplow' ? 'barrow' : 'taplow');
  };

  const handleColorChange = (colorOpt: ColorOption) => {
    setSelectedColorName(colorOpt.name);
    if (colorOpt.isDynamic) { // "Satin"
      // Use the current client-side theme when user actively clicks, if mounted
      setCurrentColor(mounted && theme === 'light' ? colorOpt.lightValue! : colorOpt.darkValue!);
    } else {
      setCurrentColor(colorOpt.value);
    }
  };

  // Render a placeholder or null if not mounted to avoid hydration mismatch
  // For currentColor, we already initialized it to server default.
  // The visual aspects of swatches also need to be consistent.

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        {/* SVG display */}
        <div
          className="flex justify-center items-center p-4 bg-muted/30 rounded-md min-h-[100px]"
          aria-live="polite"
        >
          {activeLogo === 'taplow' && <TaplowVariantLogo color={currentColor} />}
          {activeLogo === 'barrow' && <BarrowVariantLogo color={currentColor} />}
        </div>

        {/* Variant Name and Switcher Button - Centered Below Logo */}
        <div className="flex justify-center items-center gap-3 mt-4 mb-4">
          <p className="text-lg font-semibold text-foreground">
            {activeLogo === 'taplow' ? 'Taplow Variant' : 'Barrow Variant'}
          </p>
          <Button variant="outline" size="icon" onClick={toggleLogo} aria-label="Switch logo variant" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Emblem and Patch Section */}
        <div className="pt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Emblem Preview */}
            <div className="w-full sm:w-1/2">
              <div className="flex justify-center items-center p-4 bg-muted/30 rounded-md min-h-[100px]">
                <EmblemLogo color={currentColor} />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center mt-2">Emblem</h3>
            </div>
            {/* Patch Preview */}
            <div className="w-full sm:w-1/2">
              <div className="flex justify-center items-center p-4 bg-muted/30 rounded-md min-h-[100px]">
                <PatchLogo color={currentColor} />
              </div>
              <h3 className="text-lg font-semibold text-foreground text-center mt-2">Patch</h3>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Color Palette */}
        <div className="flex flex-col items-center space-y-3 pt-0">
          <div className="flex items-center justify-center space-x-2">
            <Palette className="h-5 w-5 text-muted-foreground mr-2" />
            {paletteColors.map((colorOpt) => {
              const isActive = selectedColorName === colorOpt.name;
              
              // Determine the actual hex to display for the swatch
              // For "Satin", before mount, use server default. After mount, use client theme.
              let displayHex;
              if (colorOpt.isDynamic) {
                displayHex = mounted 
                  ? (theme === 'light' ? colorOpt.lightValue! : colorOpt.darkValue!)
                  : serverDefaultSatinColor; // Use server's default for Satin before mount
              } else {
                displayHex = colorOpt.value;
              }
              
              let checkMarkColor = "currentColor"; // Default
              if (isActive) {
                 if (colorOpt.isDynamic && colorOpt.name === "Satin") {
                   // For "Satin" checkmark, use theme-dependent check color *after* mount
                   checkMarkColor = mounted 
                     ? (theme === 'light' ? colorOpt.checkColorLight! : colorOpt.checkColorDark!)
                     : (serverDefaultSatinColor === colorOpt.lightValue ? colorOpt.checkColorLight! : colorOpt.checkColorDark!); // Match check to server default swatch
                 } else if (colorOpt.checkColorLight && colorOpt.checkColorDark) {
                   const r = parseInt(displayHex.substring(1, 3), 16);
                   const g = parseInt(displayHex.substring(3, 5), 16);
                   const b = parseInt(displayHex.substring(5, 7), 16);
                   const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                   checkMarkColor = luma < 128 ? colorOpt.checkColorDark! : colorOpt.checkColorLight!; 
                   if (colorOpt.value === '#e7c78d' && colorOpt.checkColorLight) checkMarkColor = colorOpt.checkColorLight; 
                 }
              }

              return (
                <Button
                  key={colorOpt.name}
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full border-2 hover:opacity-80 transition-all",
                    isActive ? 'ring-2 ring-offset-2 ring-primary' : 'border-muted-foreground/20'
                  )}
                  style={{ backgroundColor: displayHex }}
                  onClick={() => handleColorChange(colorOpt)}
                  aria-label={`Set color to ${colorOpt.name}`}
                  title={colorOpt.name}
                >
                  {isActive && mounted && ( // Only show checkmark if active AND mounted
                    <CheckIcon color={checkMarkColor} />
                  )}
                </Button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">Selected: {selectedColorName}</p>
        </div>
      </CardContent>
    </Card>
  );
}
