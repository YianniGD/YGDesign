
import { getArtworks } from '../lib/artworkData';
import HomePageClient from '../components/home/HomePageClient';
import type { Artwork } from '../types';

export default async function HomePage() {
  const allArtworks: Artwork[] = await getArtworks();
  const artworks = allArtworks;

  return <HomePageClient initialArtworks={artworks} />;
}
