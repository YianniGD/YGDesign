
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PageWrapper from '@/components/layout/PageWrapper';

export const metadata: Metadata = {
  title: 'About Me | YGDesign',
  description: "Learn more about me, Yianni Galiatsatos, my passion for art and technology, and my creative journey.",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="max-w-[18rem] mx-auto mb-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md bg-muted">
          <Image
            src=""
            alt="Portrait of Yianni Galiatsatos"
            fill
            data-ai-hint="portrait person"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <Card className="max-w-3xl mx-auto overflow-hidden">
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold">About Me</CardTitle>
          </div>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">My Journey</h2>
            <p className="text-foreground/80 leading-relaxed">
              I'm Yianni, a graphic designer passionate about creating through collaboration. My enthusiasm for film is a significant influence when it comes to visual storytelling, shaping my work across all mediums. I firmly believe that learning as much as you can and dedicating attention to the finest detail are paramount to success. My strength lies in my comfort with technology and my proven ability to rapidly learn and leverage new software, ensuring efficient and impactful design solutions. I'm always looking for projects that will help me improve my skills.
            </p>
          </section>
          
          <Separator />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">My Vision</h2>
            <p className="text-foreground/80 leading-relaxed">
              My vision is to continuously explore the intersection of art and technology, creating experiences that are not only visually compelling but also deeply meaningful. I believe in the power of design to tell stories, evoke emotion, and inspire different perspectives. I strive to produce work that resonates, challenges conventions, and fosters connection.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">What You'll Find Here</h2>
            <p className="text-foreground/80 leading-relaxed">
              This platform showcases my personal brand, highlighting my passion for blending classic artistic principles with contemporary digital techniques.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Originating as a shared asset collection of flash drives, emails, my endeavor to share resources is now organized and readily available. Central to this initiative is my strong belief in the value of open-source resources. Knowledge should be freely shared, and financial constraints should never stifle creativity. Contributions are encouraged.
            </p>
          </section>
          
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
