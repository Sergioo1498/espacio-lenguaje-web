// Allowlisted purchase attribution, shared by Checkout and PaymentIntent.
export function checkoutAttribution(input: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  const raw = input.attribution && typeof input.attribution === 'object'
    ? input.attribution as Record<string, unknown> : {};
  const clean = (value: unknown) => typeof value === 'string' && /^[\p{L}\p{N} _./-]{1,120}$/u.test(value.trim()) ? value.trim() : undefined;
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const value = clean(raw[key]);
    if (value) result[key] = value;
  }
  const campaign = clean(input.utmCampaign);
  if (campaign) result.utm_campaign = campaign;
  if (result.utm_source) result.ORIGEN_TRAFICO = result.utm_source;
  if (typeof input.referrerPath === 'string') {
    const pathname = input.referrerPath.split(/[?#]/)[0];
    if (/^\/(?!\/)[\p{L}\p{N}_./%-]{0,240}$/u.test(pathname)) result.referrer_path = pathname;
  }
  return result;
}
