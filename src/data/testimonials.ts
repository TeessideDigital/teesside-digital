/**
 * Testimonials from real clients
 * Phase 1: Empty (testimonials added after first real projects)
 * Phase 2: Can be migrated to Supabase if volume justifies it
 *
 * Structure is ready for testimonials once we have real client feedback.
 */

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  quote: string;
  content: string; // Optional longer testimonial
  image?: string; // Optional client photo
  rating?: number; // 1-5 star rating
  serviceUsed: string; // ID of service (e.g., 'web-development')
  date: string; // ISO date when testimonial was given
  featured?: boolean; // Show on homepage
}

/**
 * Testimonials array
 * Phase 1: Empty array
 * Add testimonials only after completing real client projects
 */
export const testimonials: Testimonial[] = [];

/**
 * Featured testimonials for homepage
 * Sorted by date, most recent first
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured === true).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get testimonials by service
 */
export function getTestimonialsByService(serviceId: string): Testimonial[] {
  return testimonials
    .filter((t) => t.serviceUsed === serviceId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
