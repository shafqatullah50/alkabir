import {MapPin} from "lucide-react";

export default function ServiceCoverage() {
  const coverageAreas = {
    dubai: [
      "Dubai Marina",
      "Downtown Dubai",
      "Palm Jumeirah",
      "Business Bay",
      "JBR",
      "JLT",
      "DIFC",
      "Al Barsha",
      "Jumeirah",
      "Arabian Ranches",
      "Motor City",
      "Deira",
      "Bur Dubai",
      "Al Karama",
      "Mirdif",
    ],
    abuDhabi: [
      "Al Raha Beach",
      "Yas Island",
      "Al Reef",
      "Al Reem Island",
      "Khalifa City",
      "Masdar City",
      "Saadiyat Island",
    ],
    sharjah: [
      "Al Nahda",
      "Al Majaz",
      "Muwaileh",
      "Al Khan",
      "Al Qasimia",
      "University City",
    ],
    other: ["Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
  };

  return (
    <section className='py-8 md:py-12 bg-background transition-colors duration-300'>
      <div className='w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8'>
        <div className='text-center mb-6 md:mb-8'>
          <h2 className='text-foreground mb-3 md:mb-4'>
            <span className='inline-block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
              Service Coverage Across UAE
            </span>
          </h2>
          <p className='text-base md:text-lg text-muted-foreground'>
            We serve all major areas in the Emirates
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          <div className='bg-card rounded-xl p-5 md:p-6 border border-border hover:shadow-lg transition-all duration-300'>
            <div className='flex items-center space-x-2 mb-4'>
              <MapPin className='w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400' />
              <h3 className='text-lg md:text-xl text-foreground font-semibold'>
                Dubai
              </h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {coverageAreas.dubai.slice(0, 10).map((area, i) => (
                <span
                  key={i}
                  className='text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800'>
                  {area}
                </span>
              ))}
              <span className='text-xs text-muted-foreground px-2 py-1'>
                +5 more
              </span>
            </div>
          </div>

          <div className='bg-card rounded-xl p-5 md:p-6 border border-border hover:shadow-lg transition-all duration-300'>
            <div className='flex items-center space-x-2 mb-4'>
              <MapPin className='w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400' />
              <h3 className='text-lg md:text-xl text-foreground font-semibold'>
                Abu Dhabi
              </h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {coverageAreas.abuDhabi.map((area, i) => (
                <span
                  key={i}
                  className='text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded border border-blue-200 dark:border-blue-800'>
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className='bg-card rounded-xl p-5 md:p-6 border border-border hover:shadow-lg transition-all duration-300'>
            <div className='flex items-center space-x-2 mb-4'>
              <MapPin className='w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400' />
              <h3 className='text-lg md:text-xl text-foreground font-semibold'>
                Sharjah
              </h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {coverageAreas.sharjah.map((area, i) => (
                <span
                  key={i}
                  className='text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded border border-purple-200 dark:border-purple-800'>
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className='bg-card rounded-xl p-5 md:p-6 border border-border hover:shadow-lg transition-all duration-300'>
            <div className='flex items-center space-x-2 mb-4'>
              <MapPin className='w-5 h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400' />
              <h3 className='text-lg md:text-xl text-foreground font-semibold'>
                Other Emirates
              </h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {coverageAreas.other.map((area, i) => (
                <span
                  key={i}
                  className='text-xs bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded border border-orange-200 dark:border-orange-800'>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
