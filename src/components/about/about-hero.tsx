

export function AboutHero() {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-black/50 to-black/30 rounded-4xl">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-4xl"
        style={{
          backgroundImage: `url('/images/about-hero.png')`,
        }}
      />
      <div className="absolute inset-0 bg-black/30 rounded-4xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="text-4xl font-plus-jakarta md:text-6xl font-bold text-white mb-6">
            Our <span className="italic font-medium">Story</span>
          </h1>
          <p className="description !text-white font-normal  mb-8 max-w-xl mx-auto">
          Connecting passionate local hosts with curious travelers for authentic, immersive experiences around the world.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutHero