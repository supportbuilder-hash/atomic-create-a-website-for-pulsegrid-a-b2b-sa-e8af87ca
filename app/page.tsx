"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Activity, User, Sparkles, GitBranch, ArrowUpDown, Mail, Bell, Lock, Unlock, AlertTriangle, FileText, Check, ArrowRight, Star } from 'lucide-react';

type IconType = typeof Activity;
type FunnelStep = { label: string; value: number };
type DashboardStat = { value: string; label: string };
type FeatureItem = { title: string; description: string; statValue: string; statLabel: string };
type IntegrationItem = { name: string; description: string };
type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  features: string[];
  ctaLabel: string;
  highlighted: boolean;
  badge?: string;
};
type SecurityItem = { title: string; description: string };

const FEATURE_ICONS: IconType[] = [Activity, User, Sparkles];
const INTEGRATION_ICONS: IconType[] = [GitBranch, ArrowUpDown, Mail, Bell, Sparkles, User];
const SECURITY_ICONS: IconType[] = [Lock, FileText, Unlock, User, Check, AlertTriangle];
const TEAM_SIZE_FALLBACK = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export default function HomePage() {
  const t = useTranslations();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", workEmail: "", company: "", teamSize: "" });

  const funnelSteps = (Array.isArray(t.raw("home.hero.funnel")) ? t.raw("home.hero.funnel") : []) as FunnelStep[];
  const dashboardStats = (Array.isArray(t.raw("home.hero.dashboardStats")) ? t.raw("home.hero.dashboardStats") : []) as DashboardStat[];
  const logoItems = (Array.isArray(t.raw("home.logos.items")) ? t.raw("home.logos.items") : []) as string[];
  const featureItems = (Array.isArray(t.raw("home.features.items")) ? t.raw("home.features.items") : []) as FeatureItem[];
  const integrationItems = (Array.isArray(t.raw("home.integrations.items")) ? t.raw("home.integrations.items") : []) as IntegrationItem[];
  const pricingPlans = (Array.isArray(t.raw("home.pricing.plans")) ? t.raw("home.pricing.plans") : []) as PricingPlan[];
  const securityBadges = (Array.isArray(t.raw("home.security.badges")) ? t.raw("home.security.badges") : []) as string[];
  const securityItems = (Array.isArray(t.raw("home.security.items")) ? t.raw("home.security.items") : []) as SecurityItem[];
  const teamSizeOptions = (Array.isArray(t.raw("home.contact.teamSizeOptions")) ? t.raw("home.contact.teamSizeOptions") : TEAM_SIZE_FALLBACK) as string[];
  const expectItems = (Array.isArray(t.raw("home.contact.expectItems")) ? t.raw("home.contact.expectItems") : []) as string[];

  function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      {/* Hero */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t("home.hero.titleMain")} <span className="text-gradient">{t("home.hero.titleAccent")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {t("home.hero.secondaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {t("home.hero.primaryCta")}
                </Link>
              </div>
            </div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="glass-strong rounded-2xl border border-border p-6 shadow-glow"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/70">{t("home.hero.dashboardTitle")}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t("home.hero.dashboardLive")}
                </span>
              </div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
                {funnelSteps.map((step) => (
                  <motion.div key={step.label} variants={fadeInUp}>
                    <div className="mb-1 flex justify-between text-xs text-foreground/70">
                      <span>{step.label}</span>
                      <span className="font-medium text-foreground">{step.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${step.value}%` }} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {dashboardStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-card p-3 text-center">
                    <div className="font-display text-xl font-semibold text-gradient">{stat.value}</div>
                    <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Logo strip */}
      <Reveal>
        <section className="border-y border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-center text-sm uppercase tracking-wide text-muted-foreground">{t("home.logos.title")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {logoItems.map((name) => (
                <span key={name} className="font-display text-xl font-semibold text-foreground/40">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Features */}
      <Reveal>
        <section id="features" className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("home.features.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("home.features.title")}
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70">
                {t("home.features.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-8 md:grid-cols-3"
            >
              {featureItems.map((item, index) => {
                const Icon = FEATURE_ICONS[index] ?? Activity;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="rounded-2xl border border-border bg-card p-8 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-semibold text-gradient">{item.statValue}</span>
                      <span className="text-xs text-muted-foreground">{item.statLabel}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Integrations */}
      <Reveal>
        <section id="integrations" className="border-t border-border bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("home.integrations.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("home.integrations.title")}
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70">
                {t("home.integrations.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {integrationItems.map((item, index) => {
                const Icon = INTEGRATION_ICONS[index] ?? Sparkles;
                return (
                  <motion.div
                    key={item.name}
                    variants={fadeInUp}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">{item.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="border-t border-border bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("home.pricing.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("home.pricing.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/70">
                {t("home.pricing.subtitle")}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card p-1">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    billing === "monthly" ? "bg-primary text-primary-foreground" : "text-foreground/70"
                  )}
                >
                  {t("home.pricing.monthlyLabel")}
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    billing === "annual" ? "bg-primary text-primary-foreground" : "text-foreground/70"
                  )}
                >
                  {t("home.pricing.annualLabel")}
                </button>
              </div>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-8",
                    plan.highlighted ? "border-primary bg-card shadow-glow" : "border-border bg-card"
                  )}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{plan.description}</p>
                  <div className="mt-6 font-display text-3xl font-semibold text-foreground">
                    {billing === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#contact"
                    className={cn(
                      "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    )}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Security */}
      <Reveal>
        <section id="security" className="border-t border-border bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("home.security.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("home.security.title")}
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70">
                {t("home.security.subtitle")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {securityBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/70">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {securityItems.map((item, index) => {
                const Icon = SECURITY_ICONS[index] ?? Lock;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
        <section id="contact" className="border-t border-border bg-background py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                {t("home.contact.eyebrow")}
              </span>
              <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("home.contact.title")}
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70">
                {t("home.contact.subtitle")}
              </p>
              <ul className="mt-8 space-y-3">
                {expectItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              {submitted ? (
                <p className="text-center text-sm font-medium text-foreground">{t("home.contact.successMessage")}</p>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("home.contact.nameLabel")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="workEmail" className="text-sm font-medium text-foreground">
                      {t("home.contact.emailLabel")}
                    </label>
                    <input
                      id="workEmail"
                      type="email"
                      required
                      value={formState.workEmail}
                      onChange={(e) => setFormState((prev) => ({ ...prev, workEmail: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      {t("home.contact.companyLabel")}
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState((prev) => ({ ...prev, company: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="teamSize" className="text-sm font-medium text-foreground">
                      {t("home.contact.teamSizeLabel")}
                    </label>
                    <select
                      id="teamSize"
                      value={formState.teamSize}
                      onChange={(e) => setFormState((prev) => ({ ...prev, teamSize: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
                    >
                      <option value="">{t("home.contact.teamSizePlaceholder")}</option>
                      {teamSizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90"
                  >
                    {t("home.contact.submitLabel")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
