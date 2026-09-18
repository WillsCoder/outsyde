import React from 'react'
import HeroSection from './hero-section'
import PlacesCategory from './category'
import TopEvents from './top-events'
import HowItWork from './how-it-works'
import SocialProof from './social-proof'
import Waitlist from './waitlist'

const HomeComponents = () => {
  return (
    <main>
        <HeroSection/>
        <PlacesCategory/>
        <TopEvents/>
        <HowItWork/>
        <SocialProof/>
        <Waitlist/>
    </main>
  )
}

export default HomeComponents