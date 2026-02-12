"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateWebSiteSchema,
  generateHowToSchema,
  generateFAQSchema,
} from "@/lib/seo";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Generate structured data for SEO
  const structuredData = [
    generateOrganizationSchema(),
    generateSoftwareApplicationSchema(),
    generateWebSiteSchema(),
    generateHowToSchema({
      name: "How to Automate Your Google Business Profile",
      description: "Set up automated review replies, blog posts, and image generation for your Google Business Profile in 3 simple steps.",
      steps: steps.map(step => ({ name: step.title, text: step.description })),
    }),
    generateFAQSchema([
      {
        question: "How does ReplyBuzz automate Google Business Profile management?",
        answer: "ReplyBuzz uses advanced AI to automatically respond to reviews 24/7, publish daily SEO-optimized blog posts, and generate professional images for your Google Business Profile. Simply connect your account and our AI handles everything on autopilot.",
      },
      {
        question: "Will the automated replies sound natural and professional?",
        answer: "Yes! Our AI learns your brand voice and creates personalized, contextual responses that sound human and professional. Each reply is tailored to the specific review content and your business type.",
      },
      {
        question: "How quickly are reviews responded to?",
        answer: "Reviews are responded to within minutes of being posted, 24/7. Our AI monitors your Google Business Profile continuously and generates appropriate responses instantly.",
      },
      {
        question: "Can I manage multiple business locations?",
        answer: "Yes! Our Pro plan supports up to 3 locations, and our Enterprise plan offers unlimited multi-location support with centralized management from a single dashboard.",
      },
      {
        question: "What happens if I exceed my daily reply limit?",
        answer: "If you exceed your daily reply limit, additional replies are available at ₹5 per 10 replies. Your daily limit automatically resets every 24 hours.",
      },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* SEO Structured Data */}
      <StructuredData data={structuredData} />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="h-8 w-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background overflow-hidden">
            <div className="p-4 space-y-4">
              <a
                href="#features"
                className="block text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 bg-white" aria-label="Hero section">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex">
              <Badge variant="secondary" className="text-sm px-4 py-2 mb-4 border-primary/20 bg-primary/5 text-primary">
                🚀 Google Business Automation
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-gray-900">
              Never Miss a Review Again.{" "}
              <span className="text-primary">
                We Handle It Instantly.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Automate replies, daily posts, and images on Google Business — without hiring staff.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-sm hover:shadow-md transition-all">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto hover:bg-gray-50 transition-all">
                  Connect Google Business
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Everything You Need to Automate Your Business
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features that work 24/7 to grow your online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-all duration-200 bg-white">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white border-y border-gray-100" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-muted-foreground text-lg">
              No technical skills required. Set it up once and let us handle the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gray-100 z-0" />

            {steps.map((step, index) => (
              <div key={index} className="relative z-10 text-center space-y-6 bg-white p-6 rounded-2xl">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg shadow-primary/20">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="pricing-heading" className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that fits your business needs. Upgrade or cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`h-full flex flex-col relative transition-all duration-200 ${plan.popular
                  ? "border-primary shadow-xl scale-105 z-10 bg-white"
                  : "border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full text-center">
                    <Badge variant="default" className="px-4 py-1.5 text-sm font-medium shadow-md">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Contact Us" && (
                      <span className="text-muted-foreground text-sm font-normal">/month</span>
                    )}
                  </div>
                  {plan.price !== "Contact Us" && (
                    <p className="text-xs text-muted-foreground mt-1">Billed monthly</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.popular ? "text-primary" : "text-primary/70"}`} />
                        <span className="text-muted-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block mt-auto pt-6">
                    <Button
                      className="w-full h-11 text-base shadow-sm hover:shadow-md transition-all"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="h-6 w-6" />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automated growth for Google Business Profile. Save time, improve rankings, and grow your business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal/dpa" className="hover:text-primary transition-colors">Data Processing Agreement</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="mailto:support@replybuzz.com" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 ReplyBuzz. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <span className="text-3xl">💬</span>,
    title: "24/7 Review Replies",
    description: "Instant, professional responses to every review. Never miss an opportunity to engage with customers.",
  },
  {
    icon: <span className="text-3xl">📝</span>,
    title: "Daily SEO Blog Posts",
    description: "80-120 word SEO-optimized posts published automatically to boost your local search rankings.",
  },
  {
    icon: <span className="text-3xl">📸</span>,
    title: "Professional Photos",
    description: "15 professional images per month to keep your profile visually engaging and fresh.",
  },
  {
    icon: <span className="text-3xl">📈</span>,
    title: "Smart Analytics",
    description: "Track performance, engagement, and ROI with detailed insights and reporting.",
  },
  {
    icon: <span className="text-3xl">📍</span>,
    title: "Multi-location Support",
    description: "Manage multiple business locations from a single dashboard with ease.",
  },
  {
    icon: <span className="text-3xl">📣</span>,
    title: "Brand Voice",
    description: "We learn your brand voice and adapt to your specific business needs over time.",
  },
];

const steps = [
  {
    title: "Connect Google Business",
    description: "Securely link your Google Business Profile in just one click.",
  },
  {
    title: "We Generate Content",
    description: "We analyze your business and create personalized content based on your industry.",
  },
  {
    title: "We Publish & Reply",
    description: "Sit back and watch your online presence grow on autopilot with daily updates.",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "₹299",
    popular: false,
    cta: "Get Started",
    features: [
      "15 blog posts per month",
      "15 professional photos per month",
      "20 replies per day (auto-reset daily)",
      "1 Google Business location",
      "₹5 per additional 10 replies after daily limit",
    ],
  },
  {
    name: "Growth",
    price: "₹499",
    popular: true,
    cta: "Get Started",
    features: [
      "20 blog posts per month",
      "20 professional photos per month",
      "30 replies per day (auto-reset daily)",
      "1 Google Business location",
      "Basic analytics dashboard",
      "Priority support",
      "₹5 per additional 10 replies after daily limit",
    ],
  },
  {
    name: "Pro",
    price: "₹999",
    popular: false,
    cta: "Get Started",
    features: [
      "30 blog posts per month",
      "30 professional photos per month",
      "60 replies per day (auto-reset daily)",
      "3 Google Business locations",
      "Advanced analytics",
      "Custom tone control",
      "₹5 per additional 10 replies after daily limit",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    popular: false,
    cta: "Contact Sales",
    features: [
      "Multi-location support",
      "Custom usage limits",
      "Dedicated infrastructure",
      "SLA guarantee",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];
