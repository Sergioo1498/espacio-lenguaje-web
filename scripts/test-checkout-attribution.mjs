import assert from 'node:assert/strict';
import { checkoutAttribution } from '../src/lib/checkout-attribution.ts';
assert.deepEqual(checkoutAttribution({ attribution: {utm_source:'pinterest',utm_medium:'social',utm_campaign:'septiembre'},utmCampaign:'tripwire-fichas',referrerPath:'/gracias/fichas-gratis'}),{utm_source:'pinterest',utm_medium:'social',utm_campaign:'tripwire-fichas',ORIGEN_TRAFICO:'pinterest',referrer_path:'/gracias/fichas-gratis'});
assert.deepEqual(checkoutAttribution({utmCampaign:'tripwire-fichas-pdf',referrerPath:'/recursos/fichas-articulacion?email=private@example.com'}),{utm_campaign:'tripwire-fichas-pdf',referrer_path:'/recursos/fichas-articulacion'});
assert.deepEqual(checkoutAttribution({attribution:{utm_source:'<script>',utm_medium:4},referrerPath:'https://attacker.example/'}),{});
assert.deepEqual(checkoutAttribution({}),{});
console.log('PASS: first-touch source, tripwire override, privacy, invalid input, unattributed visit');
