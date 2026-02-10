"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";
import {
  MessageSquare,
  FileText,
  Image as ImageIcon,
  BarChart3,
  MapPin,
  Sparkles,
  CheckCircle2,
  Star,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              NanoReply
            </span>
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-background overflow-hidden"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-500/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <FadeIn delay={0.1} direction="up">
              <Badge variant="secondary" className="text-sm px-4 py-2 mb-4 border-primary/20 bg-primary/5 text-primary">
                🚀 AI-Powered Google Business Automation
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Never Miss a Review Again.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-blue-500 animate-gradient-x">
                  AI Handles It Instantly.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Automate replies, daily posts, and images on Google Business — without hiring staff.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto hover:bg-muted/50 transition-all hover:scale-105">
                  Connect Google Business
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} direction="up">
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Proof Removed */}
      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Everything You Need to Automate Your Business
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful AI features that work 24/7 to grow your online presence
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-muted h-full bg-background/50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-muted-foreground text-lg">
                No technical skills required. Set it up once and let AI handle the rest.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0" />

            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.2} direction="up" className="relative z-10">
                <div className="text-center space-y-6 bg-background/50 p-6 rounded-2xl backdrop-blur-sm border border-transparent hover:border-border transition-all">
                  <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-xl shadow-primary/20">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the plan that fits your business needs. Upgrade or cancel anytime.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card
                  className={`h-full flex flex-col relative transition-all duration-300 ${plan.popular
                    ? "border-primary shadow-2xl scale-105 z-10 bg-background"
                    : "border-muted hover:border-primary/50 hover:shadow-xl bg-background/60 backdrop-blur-sm"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full text-center">
                      <Badge variant="default" className="px-4 py-1.5 text-sm font-medium shadow-lg">
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
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Removed */}
      {/* Footer */}
      <footer className="border-t border-border py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">NanoReply</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered automation for Google Business Profile. Save time, improve rankings, and grow your business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal/dpa" className="hover:text-primary transition-colors">Data Processing Agreement</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="mailto:support@nanoreply.com" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 NanoReply. All rights reserved.</p>
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
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "24/7 AI Review Replies",
    description: "Instant, professional responses to every review. Never miss an opportunity to engage with customers.",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Daily SEO Blog Posts",
    description: "80-120 word SEO-optimized posts published automatically to boost your local search rankings.",
  },
  {
    icon: <ImageIcon className="h-6 w-6 text-primary" />,
    title: "AI-Generated Photos",
    description: "15 professional images per month to keep your profile visually engaging and fresh.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Smart Analytics",
    description: "Track performance, engagement, and ROI with detailed insights and reporting.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Multi-location Support",
    description: "Manage multiple business locations from a single dashboard with ease.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Custom AI Training",
    description: "AI learns your brand voice and adapts to your specific business needs over time.",
  },
];

const steps = [
  {
    title: "Connect Google Business",
    description: "Securely link your Google Business Profile in just one click.",
  },
  {
    title: "AI Generates Content",
    description: "Our AI analyzes your business and creates personalized content based on your industry.",
  },
  {
    title: "AI Publishes & Replies",
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
      "15 AI photos per month",
      "20 AI replies per day (auto-reset daily)",
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
      "20 AI photos per month",
      "30 AI replies per day (auto-reset daily)",
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
      "30 AI photos per month",
      "60 AI replies per day (auto-reset daily)",
      "3 Google Business locations",
      "Advanced analytics",
      "Custom AI tone control",
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
      "Custom AI usage limits",
      "Dedicated infrastructure",
      "SLA guarantee",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];
