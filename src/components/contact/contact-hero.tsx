
export  function ContactHero() {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-black/50 to-black/30 rounded-4xl">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-4xl"
        style={{
          backgroundImage: `url('/images/contact-hero.png')`,
        }}
      />
      <div className="absolute inset-0 bg-black/30 rounded-4xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="text-4xl font-plus-jakarta md:text-6xl font-bold text-white mb-6">
            Get in <span className="italic font-medium">Touch</span>
          </h1>
          <p className="description !text-white font-normal  mb-8 max-w-3xl mx-auto">
          Have questions or need assistance? We&apos;re here to help you create unforgettable travel experiences.
          </p>
          
        </div>
      </div>
    </section>
  )
}

export default ContactHero