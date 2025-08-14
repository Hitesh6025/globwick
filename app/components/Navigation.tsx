"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Gamepad2, ChevronDown, Smartphone, Globe, Code, Palette, BarChart3, Cloud, ShoppingCart, Megaphone, Wallet, ArrowUpRight, Cpu } from "lucide-react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

const navItems = [
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Hire Developer", href: "/hire-developer" },
  { name: "Blog", href: "/blog" },
]

// Animation variants for dropdown
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.1,
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.1,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.1,
    }
  }
}

const categoryVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
}

const linkVariants = {
  hidden: {
    opacity: 0,
    x: -10
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    }
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2,
    }
  }
}

const servicesDropdown = [
  {
    category: "DEVELOPMENT",
    services: [
      {
        name: "Frontend Development",
        description: "Learn more about frontend development",
        href: "/services/frontend-development",
        icon: Globe,
        iconColor: "from-blue-500 to-blue-600"
      },
      {
        name: "Backend Development",
        description: "Learn more about backend development",
        href: "/services/backend-development",
        icon: Code,
        iconColor: "from-purple-500 to-purple-600"
      },
      {
        name: "Full Stack Development",
        description: "Learn more about full stack development",
        href: "/services/fullstack-development",
        icon: Cpu,
        iconColor: "from-green-500 to-green-600"
      },
      {
        name: "E-commerce Development",
        description: "Learn more about e-commerce development",
        href: "/services/ecommerce-development",
        icon: ShoppingCart,
        iconColor: "from-orange-500 to-orange-600"
      }
    ]
  },
  {
    category: "MOBILE DEVELOPMENT",
    services: [
      {
        name: "iOS Development",
        description: "Learn more about iOS development",
        href: "/services/ios-development",
        icon: Smartphone,
        iconColor: "from-blue-400 to-blue-500"
      },
      {
        name: "Android Development",
        description: "Learn more about Android development",
        href: "/services/android-development",
        icon: Smartphone,
        iconColor: "from-green-500 to-green-600"
      },
      {
        name: "React Native",
        description: "Learn more about React Native development",
        href: "/services/react-native",
        icon: Smartphone,
        iconColor: "from-blue-500 to-blue-600"
      },
      {
        name: "Flutter Development",
        description: "Learn more about Flutter development",
        href: "/services/flutter",
        icon: Smartphone,
        iconColor: "from-blue-600 to-blue-700"
      }
    ]
  },
  {
    category: "GAME DEVELOPMENT",
    services: [
      {
        name: "Poker Game Development",
        description: "Learn more about poker game development",
        href: "/services/poker-game-development",
        icon: Gamepad2,
        iconColor: "from-red-500 to-red-600"
      },
      {
        name: "Casino Game Development",
        description: "Learn more about casino game development",
        href: "/services/casino-game-development",
        icon: Gamepad2,
        iconColor: "from-yellow-500 to-yellow-600"
      },
      {
        name: "Mobile Game Development",
        description: "Learn more about mobile game development",
        href: "/services/mobile-game-development",
        icon: Gamepad2,
        iconColor: "from-purple-500 to-purple-600"
      },
      {
        name: "Browser Game Development",
        description: "Learn more about browser game development",
        href: "/services/browser-game-development",
        icon: Gamepad2,
        iconColor: "from-green-500 to-green-600"
      }
    ]
  }
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(".nav-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2 })
  }, [])

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      // Focus the mobile menu container when it opens
      mobileMenuRef.current.focus()
      // Prevent background scrolling when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable background scrolling when menu is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand - Left Side */}
          <Link href="/" className="flex items-center space-x-3 nav-item">
            <div className="flex flex-col">
              <div className=" h-8 flex items-center justify-center">
                <img src="/Globwick-icon.png" alt="Globwick Logo" className="size-12 mt-6" />
              </div>
              <span className="text-gray-400 text-[10px] text-center mt-4">We Create Your Dreams</span>
            </div>
          </Link>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <button className="nav-item text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium flex items-center">
                      {item.name}
                      <motion.div
                        animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 mt-2 w-[800px] bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
                        >
                          <div className="p-6">
                            <motion.div
                              className="grid grid-cols-3 gap-8"
                            >
                              {servicesDropdown.map((category) => (
                                <motion.div
                                  key={category.category}
                                  className="space-y-4"
                                >
                                  <h3 className="text-sm font-bold text-white mb-4">{category.category}</h3>
                                  <div className="space-y-3">
                                    {category.services.map((service) => {
                                      const IconComponent = service.icon
                                      return (
                                        <motion.div
                                          key={service.name}
                                          variants={linkVariants}
                                          whileHover="hover"
                                          onMouseEnter={() => setHoveredService(service.name)}
                                          onMouseLeave={() => setHoveredService(null)}
                                          className={`p-3 rounded-lg transition-all duration-200 ${hoveredService === service.name ? 'bg-gray-800/50' : ''
                                            }`}
                                        >
                                          <Link href={service.href} className="flex items-start space-x-3">
                                            <div className={`w-8 h-8 bg-gradient-to-r ${service.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                              <IconComponent className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="flex-1">
                                              <h4 className="text-sm font-semibold text-white">{service.name}</h4>
                                              <p className="text-xs text-gray-400 mt-1">{service.description}</p>
                                            </div>
                                          </Link>
                                        </motion.div>
                                      )
                                    })}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="nav-item text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Right Side */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-item bg-gradient-to-r from-magenta-500 to-purple-600 hover:from-magenta-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Contact
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-blue-400 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 max-h-[calc(100vh-5rem)] overflow-y-auto z-40"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #1f2937' }}
            tabIndex={-1}
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        className="flex w-full text-left py-3 px-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all items-center justify-between"
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-2 space-y-4 bg-gray-900/50 rounded-lg p-4"
                        >
                          {servicesDropdown.map((category) => (
                            <div key={category.category}>
                              <h3 className="text-sm font-bold text-white mb-3">{category.category}</h3>
                              <div className="space-y-2">
                                {category.services.map((service) => {
                                  const IconComponent = service.icon
                                  return (
                                    <Link
                                      key={service.name}
                                      href={service.href}
                                      className="flex items-center space-x-3 py-2 px-3 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/30 rounded transition-all"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      <div className={`w-6 h-6 bg-gradient-to-r ${service.iconColor} rounded flex items-center justify-center`}>
                                        <IconComponent className="h-3 w-3 text-white" />
                                      </div>
                                      <span>{service.name}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block w-full text-left py-3 px-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Contact Button for Mobile */}
              <div className="pt-4 border-t border-gray-800 mt-6">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
                    >
                      Contact
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
