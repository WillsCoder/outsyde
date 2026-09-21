import React from 'react'
import prisma from '@/lib/prisma'
import HeroSection from './hero-section'
import PlacesCategory from './category'
import TopEvents from './top-events'
import HowItWork from './how-it-works'
import SocialProof from './social-proof'
import Waitlist from './waitlist'

const HomeComponents = async () => {

  const places = await prisma.place.findMany({
    where: { isPublished: true },
    include: { images: true },
    orderBy: { isFeatured: "desc" },
    take: 5,
  });

  const categories = await prisma.category.findMany({
    // where: { isPublished: true }, 
    orderBy: { order: "asc" },
  });

  return (
    <main>
        <HeroSection places={places}/>
        <PlacesCategory categories={categories}/>
        <TopEvents/>
        <HowItWork/>
        <SocialProof/>
        <Waitlist/>
    </main>
  )
}

export default HomeComponents