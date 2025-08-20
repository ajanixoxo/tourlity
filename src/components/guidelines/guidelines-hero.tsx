

export function GuidelinesHero() {
  return (
    <section className="relative h-[500px] lg:h-[400px] bg-gradient-to-r from-black/50 to-black/30 rounded-4xl mb-16">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-4xl"
        style={{
          backgroundImage: `url('/images/guideline.png')`,
        }}
      />
      <div className="absolute inset-0 bg-black/30 rounded-4xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="text-4xl font-plus-jakarta md:text-6xl font-bold text-white mb-6">
            Community <span className="italic font-medium">Guidelines</span>
          </h1>
          <p className="description font-light !text-white   mb-8 max-w-xl mx-auto">
        Helping you create safe, respectful, and memorable experiences on Tourlity.
          </p>
        </div>
      </div>
    </section>
  )
}

export default GuidelinesHero