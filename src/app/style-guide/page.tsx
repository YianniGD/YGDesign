
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import ThemeToggleButton from '@/components/theme/ThemeToggleButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Palette, Type, Square, CircleDot } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';

export const metadata: Metadata = {
  title: 'Style Guide | YGDesign',
  description: 'Visual representation of the YGDesign website stylesheet, including colors, typography, and common UI elements.',
};

interface ColorInfo {
  name: string;
  variableName: string; // e.g., --primary, --background
  description: string;
  textColorClass?: string; // Tailwind class for text on this swatch, e.g., text-white or text-black
}

// Updated to reflect current globals.css
const corePalette: ColorInfo[] = [
  { name: 'Background', variableName: '--background', description: 'Main page background.' },
  { name: 'Foreground', variableName: '--foreground', description: 'Primary text color.', textColorClass: 'text-background' }, // Text color that contrasts with foreground
  { name: 'Card', variableName: '--card', description: 'Card component background.' },
  { name: 'Card Foreground', variableName: '--card-foreground', description: 'Text color for cards.', textColorClass: 'text-card' },
  { name: 'Popover', variableName: '--popover', description: 'Popover component background.' },
  { name: 'Popover Foreground', variableName: '--popover-foreground', description: 'Text color for popovers.', textColorClass: 'text-popover' },
  { name: 'Primary', variableName: '--primary', description: 'Main interactive color.', textColorClass: 'text-primary-foreground' },
  { name: 'Primary Foreground', variableName: '--primary-foreground', description: 'Text on primary backgrounds.' },
  { name: 'Secondary', variableName: '--secondary', description: 'Secondary elements/backgrounds.' },
  { name: 'Secondary Foreground', variableName: '--secondary-foreground', description: 'Text on secondary backgrounds.', textColorClass: 'text-secondary' },
  { name: 'Muted', variableName: '--muted', description: 'Muted backgrounds/elements.' },
  { name: 'Muted Foreground', variableName: '--muted-foreground', description: 'Muted text color.', textColorClass: 'text-muted' },
  { name: 'Accent', variableName: '--accent', description: 'Accent color for highlights.', textColorClass: 'text-accent-foreground' },
  { name: 'Accent Foreground', variableName: '--accent-foreground', description: 'Text on accent backgrounds.' },
  { name: 'Destructive', variableName: '--destructive', description: 'Error/destructive actions.', textColorClass: 'text-destructive-foreground' },
  { name: 'Destructive Foreground', variableName: '--destructive-foreground', description: 'Text on destructive backgrounds.' },
  { name: 'Border', variableName: '--border', description: 'Default border color.' },
  { name: 'Input', variableName: '--input', description: 'Input field border/background.' },
  { name: 'Ring', variableName: '--ring', description: 'Focus ring color.', textColorClass: 'text-background' }, // Ring is often a bright color
];

const chartColors: ColorInfo[] = [
  { name: 'Chart 1', variableName: '--chart-1', description: 'Chart color 1', textColorClass: 'text-primary-foreground' },
  { name: 'Chart 2', variableName: '--chart-2', description: 'Chart color 2', textColorClass: 'text-primary-foreground' },
  { name: 'Chart 3', variableName: '--chart-3', description: 'Chart color 3', textColorClass: 'text-primary-foreground' },
  { name: 'Chart 4', variableName: '--chart-4', description: 'Chart color 4', textColorClass: 'text-foreground' },
  { name: 'Chart 5', variableName: '--chart-5', description: 'Chart color 5', textColorClass: 'text-primary-foreground' },
];

const radii = [
  { name: 'Small (sm)', class: 'rounded-sm', value: 'calc(var(--radius) - 4px)' },
  { name: 'Default (md)', class: 'rounded-md', value: 'calc(var(--radius) - 2px)' },
  { name: 'Large (lg)', class: 'rounded-lg', value: 'var(--radius)' },
  { name: 'Full', class: 'rounded-full', value: '9999px' },
];

const ColorSwatch = ({ name, variableName, description, textColorClass }: ColorInfo) => (
  <div className="border border-border rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
    <div
      style={{ backgroundColor: `hsl(var(${variableName}))` }}
      className={`h-28 w-full flex items-center justify-center p-3 ${textColorClass || 'text-foreground'}`}
    >
      <span className="text-sm font-medium bg-black/40 backdrop-blur-sm p-1.5 rounded-md">
        {/* Placeholder for actual HSL value, as it changes with theme */}
        {`hsl(var(${variableName}))`}
      </span>
    </div>
    <div className="p-4 bg-card">
      <h4 className="font-semibold text-card-foreground">{name}</h4>
      <p className="text-xs text-muted-foreground font-mono mt-0.5">{variableName}</p>
      <p className="text-xs text-muted-foreground mt-1.5">{description}</p>
    </div>
  </div>
);

export default function StyleGuidePage() {
  return (
    <PageWrapper>
      <Card className="mb-12 bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center">
          <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
            <Palette size={32} />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-center">Website Style Guide</CardTitle>
          <CardDescription className="text-center text-lg max-w-2xl mx-auto">
            A visual reference for the color palette, typography, and common UI elements that define the YGDesign aesthetic.
            Toggle between light and dark themes to see how styles adapt.
          </CardDescription>
          <div className="pt-6">
            <ThemeToggleButton />
          </div>
        </CardHeader>
      </Card>

      <section id="color-palette" className="mb-16">
        <h2 className="text-3xl font-bold mb-3 text-center text-primary flex items-center justify-center">
          <Palette className="mr-3" /> Color Palette
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          The core color variables that define the light and dark themes. Swatches dynamically update with theme changes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {corePalette.map((color) => (
            <ColorSwatch key={color.variableName} {...color} />
          ))}
        </div>
        <h3 className="text-2xl font-semibold mt-12 mb-6 text-center text-primary/90">Chart Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chartColors.map((color) => (
            <ColorSwatch key={color.variableName} {...color} />
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      <section id="typography" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary flex items-center justify-center">
          <Type className="mr-3" /> Typography
        </h2>
        <div className="space-y-10">
          <Card>
            <CardHeader><CardTitle className="text-xl">Headings (Roboto Flex - `font-sans`)</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-6">
              <h1 className="text-5xl font-extrabold tracking-tight">H1: The Quick Brown Fox</h1>
              <h2 className="text-4xl font-bold tracking-tight">H2: Jumps Over The Lazy Dog</h2>
              <h3 className="text-3xl font-semibold tracking-tight">H3: A Symphony of Styles</h3>
              <h4 className="text-2xl font-medium">H4: Exploring Typographic Nuances</h4>
              <h5 className="text-xl font-medium">H5: Detail and Precision</h5>
              <h6 className="text-lg font-medium">H6: Subtle Elegance</h6>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-xl">Body Text (Roboto Flex - `font-sans`)</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none p-6 text-base leading-relaxed">
              <p>
                This is a standard paragraph, demonstrating the default body text style. It uses Roboto Flex for optimal readability and a modern feel.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                <strong>This text is strong (bolded).</strong> <em>This text is emphasized (italic).</em>
                And here is <a href="#typography" className="hover:underline">a sample link</a> to demonstrate hyperlink styling.
              </p>
              <blockquote>
                This is a blockquote. It's typically used for highlighting a significant passage, a direct quote, or an important note.
                The styling should make it distinct yet harmonious with the surrounding content.
              </blockquote>
              <ul className="list-disc pl-5 space-y-1">
                <li>List item one, showcasing an unordered list.</li>
                <li>List item two, with some more text.
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Nested list item 2.1.</li>
                    <li>Nested list item 2.2.</li>
                  </ul>
                </li>
                <li>List item three.</li>
              </ul>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Ordered list item one.</li>
                <li>Ordered list item two.</li>
                <li>Ordered list item three.</li>
              </ol>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Monospace (Roboto Mono)</CardTitle></CardHeader>
              <CardContent className="p-6">
                <p className="font-mono text-sm">
                  This text employs Roboto Mono. Ideal for `code snippets`, technical labels, or any content requiring a fixed-width typeface.
                  <br />
                  Example: `console.log("Hello, Mono!");`
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Serif (Roboto Serif)</CardTitle></CardHeader>
              <CardContent className="p-6">
                <p className="font-serif text-base">
                  Roboto Serif offers a classic, more formal appearance. It can be suitable for extended reading or when a traditional typographic feel is desired.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Slab (Roboto Slab - Bold)</CardTitle></CardHeader>
              <CardContent className="p-6">
                <p className="font-slab text-base">
                  Roboto Slab (font-weight: 700) brings a strong, contemporary, and impactful character, excellent for bold headlines or display text.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      <section id="interactive-elements" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary flex items-center justify-center">
            <CircleDot className="mr-3" /> Interactive Elements
        </h2>
        <Card>
          <CardHeader><CardTitle className="text-xl">Buttons</CardTitle></CardHeader>
          <CardContent className="p-6 flex flex-wrap gap-4 items-center">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Button</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Alert Icon Button"><AlertCircle /></Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader><CardTitle className="text-xl">Alerts</CardTitle></CardHeader>
          <CardContent className="p-6 space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a standard informational alert.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Destructive Alert</AlertTitle>
              <AlertDescription>This alert indicates a critical error or warning.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-16" />

       <section id="radii" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary flex items-center justify-center">
            <Square className="mr-3" /> Border Radii
        </h2>
        <Card>
          <CardHeader><CardTitle className="text-xl">Radius Examples</CardTitle>
          <CardDescription>Visualizing the `--radius` variable and its derivatives.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-wrap gap-x-8 gap-y-6 items-end">
            {radii.map(r => (
              <div key={r.name} className="text-center">
                <div className={`w-28 h-28 bg-primary ${r.class} flex items-center justify-center shadow-lg border-2 border-primary-foreground/30`}>
                  <span className="text-sm text-primary-foreground font-medium">{r.name}</span>
                </div>
                <p className="text-xs mt-2 font-mono text-muted-foreground">{r.class}</p>
                <p className="text-xs text-muted-foreground">({r.value})</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageWrapper>
  );
}
