
import { getArtworkById, getArtworks } from '../../../lib/artworkData';
import ArtworkDetailClient from '../../../components/artwork/ArtworkDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import PageWrapper from '@/components/layout/PageWrapper';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const artworks = await getArtworks();
  return artworks.map(artwork => ({
    id: artwork.id,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const artwork = await getArtworkById(params.id);
  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    };
  }
  const plainTitle = artwork.title.replace(/<br \/>/g, ' ');
  const plainDescription = artwork.description.replace(/<br \/>/g, ' ');
  return {
    title: `${plainTitle} | YGDesign`,
    description: plainDescription.substring(0, 150) || `Details for ${plainTitle}`,
    openGraph: {
        images: [artwork.imageUrl],
    }
  };
}


export default async function ArtworkPage({ params }: Props) {
  const artwork = await getArtworkById(params.id);

  if (!artwork) {
    notFound();
  }

  return (
    <PageWrapper>
        <ArtworkDetailClient initialArtwork={artwork} />
    </PageWrapper>
  );
}
