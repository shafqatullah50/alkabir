import { Search, Calendar, CheckCircle, ArrowRight, ArrowDown } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Choose Service',
    description: 'Browse our categories and select the service you need for your home or office',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    numberBg: 'bg-emerald-600 dark:bg-emerald-500',
  },
  {
    icon: Calendar,
    title: 'Book Instantly',
    description: 'Pick your preferred date, time, and professional. Get instant confirmation',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
    numberBg: 'bg-teal-600 dark:bg-teal-500',
  },
  {
    icon: CheckCircle,
    title: 'Get It Done',
    description: 'Sit back and relax. Our verified professionals will deliver quality service',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    numberBg: 'bg-emerald-600 dark:bg-emerald-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Simple & Fast Process</span>
          </div>
          <h2 className="mb-3 md:mb-4">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto">
            Get professional services in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        {/* Mobile: Vertical layout with down arrows */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-card rounded-2xl p-6 shadow-md border-2 border-border relative">
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div className={`${step.numberBg} text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <span>0{index + 1}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`${step.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="!mb-0">{step.title}</h3>
                      </div>
                      <p className="text-sm !mb-0">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Down Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-3">
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-full"></div>
                      <ArrowDown className="w-6 h-6 text-emerald-500 dark:text-emerald-400 -mt-1 animate-bounce" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tablet & Desktop: Horizontal layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-emerald-300 dark:hover:border-emerald-600 relative z-10 card-hover">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${step.color} w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:scale-110`}>
                      <Icon className="w-12 h-12" />
                    </div>
                    <div className={`absolute -top-4 -left-4 w-14 h-14 ${step.numberBg} text-white rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-card`}>
                      <span className="text-xl">0{index + 1}</span>
                    </div>
                    <h3 className="!mb-3">{step.title}</h3>
                    <p className="!mb-0">{step.description}</p>
                  </div>
                </div>
                
                {/* Arrow connector between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 xl:-right-8 transform -translate-y-1/2 z-0 items-center justify-center">
                    <div className="flex items-center">
                      <div className="w-8 xl:w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-full"></div>
                      <div className="relative">
                        <ArrowRight className="w-8 h-8 text-emerald-500 dark:text-emerald-400 -ml-2 animate-pulse" strokeWidth={3} />
                        <div className="absolute inset-0 bg-emerald-400/20 dark:bg-emerald-500/20 blur-lg rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-12 text-center">
          {/* Mobile: Full-width button */}
          <div className="md:hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm text-white">Ready to get started?</span>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Desktop: Inline badge */}
          <div className="hidden md:block">
            <div className="inline-flex items-center space-x-3 bg-card rounded-full px-6 py-3 shadow-lg border-2 border-emerald-200 dark:border-emerald-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Ready to get started? Book your first service now!</span>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
