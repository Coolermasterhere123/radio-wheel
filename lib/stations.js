/**
 * Curated station list — verified open stream URLs.
 * Canadian stations sourced from online-radio-canada.com listings.
 * Rogers/Corus/Bell stations use the streamtheworld redirect pattern.
 * 181.FM, Radio Paradise, laut.fm, RauteMusik all confirmed working from browsers.
 */

export const CURATED_GENRES = [

  // ── Alternative ───────────────────────────────────────────────────────────
  {
    id: 'alternative',
    label: 'Alternative',
    color: '#7b2ff7',
    glow: '#a855f7',
    stations: [
      // 181.FM
      { name: '181.FM – The Buzz (Alt Rock)',      url: 'https://listen.181fm.com/181-buzz_128k.mp3',         country: 'US' },
      { name: '181.FM – Classic Buzz',             url: 'https://listen.181fm.com/181-classicbuzz_128k.mp3',  country: 'US' },
      { name: '181.FM – 90s Alternative',          url: 'https://listen.181fm.com/181-90salt_128k.mp3',       country: 'US' },
      // Canada
      { name: 'CITR 101.9 FM (Vancouver UBC)',     url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CITRFMAAC.aac', country: 'CA' },
      { name: 'CJSF 90.1 FM (Burnaby SFU)',        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJSFFMAAC.aac', country: 'CA' },
      { name: 'KEXP 90.3 FM (Seattle)',            url: 'https://kexp-mp3-128.streamguys1.com/kexp128.mp3',   country: 'US' },
      { name: 'NTS Radio 1 (UK)',                  url: 'https://stream-relay-geo.ntslive.net/stream',        country: 'UK' },
      { name: 'NTS Radio 2 (UK)',                  url: 'https://stream-relay-geo.ntslive.net/stream2',       country: 'UK' },
      { name: 'Nightride FM (Synthwave)',           url: 'https://stream.nightride.fm/nightride.mp3',          country: 'US' },
      { name: 'Radio Paradise – Main Mix',         url: 'https://stream.radioparadise.com/mp3-128',           country: 'US' },
      { name: 'Radio Paradise – Eclectic Mix',     url: 'https://stream.radioparadise.com/eclectic-128',      country: 'US' },
      { name: 'Triple J (AU)',                     url: 'http://live-radio01.mediahubaustralia.com/2TJW_MP3_128k/', country: 'AU' },
      { name: 'Absolute Radio (UK)',               url: 'https://icecast.absoluteradio.co.uk/absoluteradio.mp3',   country: 'UK' },
      { name: 'Absolute Radio 90s (UK)',           url: 'https://icecast.absoluteradio.co.uk/absolute90s.mp3',    country: 'UK' },
    ],
  },

  // ── Rock ─────────────────────────────────────────────────────────────────
  {
    id: 'rock',
    label: 'Rock',
    color: '#e53e3e',
    glow: '#fc8181',
    stations: [
      // 181.FM
      { name: '181.FM – The Eagle (Classic Rock)',  url: 'https://listen.181fm.com/181-eagle_128k.mp3',        country: 'US' },
      { name: '181.FM – Rock 181',                  url: 'https://listen.181fm.com/181-rock_128k.mp3',         country: 'US' },
      { name: '181.FM – Rock 40',                   url: 'https://listen.181fm.com/181-rock40_128k.mp3',       country: 'US' },
      { name: '181.FM – 80s Hairband',              url: 'https://listen.181fm.com/181-hairband_128k.mp3',     country: 'US' },
      { name: '181.FM – Chloe (Modern Rock)',       url: 'https://listen.181fm.com/181-chloe_128k.mp3',        country: 'US' },
      { name: '181.FM – The Rock! (Hard Rock)',     url: 'https://listen.181fm.com/181-hardrock_128k.mp3',     country: 'US' },
      { name: '181.FM – Super 70s',                 url: 'https://listen.181fm.com/181-70s_128k.mp3',          country: 'US' },
      { name: '181.FM – Awesome 80s',               url: 'https://listen.181fm.com/181-awesome80s_128k.mp3',   country: 'US' },
      { name: '181.FM – Star 90s',                  url: 'https://listen.181fm.com/181-star90s_128k.mp3',      country: 'US' },
      { name: '181.FM – Yacht Rock',                url: 'https://listen.181fm.com/181-yachtrock_128k.mp3',    country: 'US' },
      { name: 'Radio Paradise – Rock Mix',          url: 'https://stream.radioparadise.com/rock-128',          country: 'US' },
      // Canada — Rogers/Corus via streamtheworld
      { name: 'CHEZ 106 Ottawa (Mainstream Rock)',  url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHEZFMAAC.aac', country: 'CA' },
      { name: '92.1 CITI FM Winnipeg (Rock)',       url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CITIFMAAC.aac', country: 'CA' },
      { name: 'Q107 Toronto (Classic Rock)',        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CILQFMAAC.aac', country: 'CA' },
      { name: 'CHOM 97.7 Montreal (Rock)',          url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHOMFMAAC.aac', country: 'CA' },
      { name: 'The Bear 100.3 Edmonton',            url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKBEARFMAAC.aac', country: 'CA' },
      { name: 'JACK 96.9 Vancouver (Adult Hits)',   url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJAXFMAAC.aac', country: 'CA' },
      { name: '101.3 Giant FM (Classic Rock)',      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKOTFMAAC.aac', country: 'CA' },
      // UK
      { name: 'Absolute Classic Rock (UK)',         url: 'https://icecast.absoluteradio.co.uk/absoluteclassicrock.mp3', country: 'UK' },
      { name: 'Absolute Radio 80s (UK)',            url: 'https://icecast.absoluteradio.co.uk/absolute80s.mp3',         country: 'UK' },
      { name: 'Radio X (UK)',                       url: 'https://media-ice.musicradio.com/RadioX.mp3',        country: 'UK' },
      { name: 'Triple M Sydney (AU)',               url: 'http://live-radio01.mediahubaustralia.com/2MMM_MP3_128k/', country: 'AU' },
    ],
  },

  // ── Metal ─────────────────────────────────────────────────────────────────
  {
    id: 'metal',
    label: 'Metal',
    color: '#a0aec0',
    glow: '#e2e8f0',
    stations: [
      { name: '181.FM – The Rock! (Hard Rock)',     url: 'https://listen.181fm.com/181-hardrock_128k.mp3',     country: 'US' },
      { name: '181.FM – 80s Hairband',              url: 'https://listen.181fm.com/181-hairband_128k.mp3',     country: 'US' },
      { name: 'All Rock Radio Metal (CH)',          url: 'https://allrockradiometal.ice.infomaniak.ch/allrockradiometal-128.mp3', country: 'CH' },
      { name: 'laut.fm – Metal (DE)',               url: 'https://stream.laut.fm/metal',                      country: 'DE' },
      { name: 'laut.fm – Power Metal (DE)',         url: 'https://stream.laut.fm/powermetal',                  country: 'DE' },
      { name: 'RauteMusik – Metal (DE)',            url: 'https://streams.rautemusik.fm/metal',                country: 'DE' },
      { name: 'RauteMusik – Heavy Metal (DE)',      url: 'https://streams.rautemusik.fm/heavymetal',           country: 'DE' },
      { name: 'Brutal Metal Radio (US)',            url: 'http://radio.brutalmetal.com:8000/brutalmetal',      country: 'US' },
      { name: 'The Edge 102.1 (Toronto)',           url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CFNYAAC.aac', country: 'CA' },
      { name: 'The Rock (New Zealand)',             url: 'http://therock.lm.net.nz:8100/therock.mp3',          country: 'NZ' },
    ],
  },

  // ── Country ───────────────────────────────────────────────────────────────
  {
    id: 'country',
    label: 'Country',
    color: '#d69e2e',
    glow: '#faf089',
    stations: [
      // 181.FM
      { name: "181.FM – Kickin' Country",           url: 'https://listen.181fm.com/181-kickincountry_128k.mp3', country: 'US' },
      { name: '181.FM – Real Country',              url: 'https://listen.181fm.com/181-realcountry_128k.mp3',   country: 'US' },
      { name: '181.FM – Highway 181',               url: 'https://listen.181fm.com/181-highway_128k.mp3',       country: 'US' },
      { name: '181.FM – 80s Country',               url: 'https://listen.181fm.com/181-80scountry_128k.mp3',    country: 'US' },
      { name: '181.FM – 90s Country',               url: 'https://listen.181fm.com/181-90scountry_128k.mp3',    country: 'US' },
      { name: '181.FM – Front Porch (Bluegrass)',   url: 'https://listen.181fm.com/181-frontporch_128k.mp3',    country: 'US' },
      { name: 'RFD-TV Rural Radio',                 url: 'https://rfdrural.streamguys1.com/rural128.mp3',       country: 'US' },
      // Canada
      { name: 'Country 94 (CHSJ-FM Saint John)',    url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHSJFMAAC.aac', country: 'CA' },
      { name: 'Cat Country 99.5 (CKTY-FM Sarnia)',  url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKTYFMAAC.aac', country: 'CA' },
      { name: 'CISN Country 103.9 (Edmonton)',      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CISNFMAAC.aac', country: 'CA' },
      { name: 'Country 105 Calgary (CKRY-FM)',      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKRYFMAAC.aac', country: 'CA' },
      { name: 'Big Country Ottawa (CISS-FM)',       url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CISSFMAAC.aac', country: 'CA' },
      { name: 'Oldies 96.7 (CJWV-FM)',             url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJWVFMAAC.aac', country: 'CA' },
      { name: 'Absolute Radio Country (UK)',        url: 'https://icecast.absoluteradio.co.uk/absolutecountry.mp3', country: 'UK' },
    ],
  },

  // ── Pop ───────────────────────────────────────────────────────────────────
  {
    id: 'pop',
    label: 'Pop',
    color: '#ed64a6',
    glow: '#fbb6ce',
    stations: [
      // 181.FM
      { name: '181.FM – Power 181 (Top 40)',        url: 'https://listen.181fm.com/181-power_128k.mp3',         country: 'US' },
      { name: '181.FM – The Office (Soft AC)',      url: 'https://listen.181fm.com/181-office_128k.mp3',        country: 'US' },
      { name: '181.FM – The Mix',                   url: 'https://listen.181fm.com/181-themix_128k.mp3',        country: 'US' },
      { name: '181.FM – UK Top 40',                 url: 'https://listen.181fm.com/181-uktop40_128k.mp3',       country: 'US' },
      { name: '181.FM – The Heart (Love Songs)',    url: 'https://listen.181fm.com/181-heart_128k.mp3',         country: 'US' },
      { name: '181.FM – Smooth AC',                 url: 'https://listen.181fm.com/181-smoothac_128k.mp3',      country: 'US' },
      { name: 'Radio Paradise – Mellow Mix',        url: 'https://stream.radioparadise.com/mellow-128',         country: 'US' },
      // Canada
      { name: '98.1 CHFI Toronto (Adult Contemp)',  url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHFIFMAAC.aac', country: 'CA' },
      { name: 'KiSS 92.5 Toronto (Top 40)',         url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKISFMAAC.aac', country: 'CA' },
      { name: '99.9 Virgin Radio Toronto',          url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKFMFMAAC.aac', country: 'CA' },
      { name: 'CHUM 104.5 Toronto (Hot AC)',        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHUMFMAAC.aac', country: 'CA' },
      { name: 'KiSS 91.7 Edmonton (Top 40)',        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHBNFMAAC.aac', country: 'CA' },
      { name: 'Jack 92.9 Calgary (Adult Hits)',     url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CFLTFMAAC.aac', country: 'CA' },
      { name: 'Jack 96.9 Calgary (Adult Hits)',     url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJAQFMAAC.aac', country: 'CA' },
      { name: '95.9 Star Calgary (Easy)',           url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHFMFMAAC.aac', country: 'CA' },
      // UK / Ireland / AU
      { name: 'Capital FM (UK)',                    url: 'https://media-ice.musicradio.com/Capital.mp3',         country: 'UK' },
      { name: 'Heart FM (UK)',                      url: 'https://media-ice.musicradio.com/Heart.mp3',           country: 'UK' },
      { name: 'Heart 80s (UK)',                     url: 'https://media-ice.musicradio.com/Heart80s.mp3',        country: 'UK' },
      { name: 'Kiss FM (UK)',                       url: 'https://media-ice.musicradio.com/Kiss.mp3',            country: 'UK' },
      { name: 'Radio Nova (Ireland)',               url: 'https://icecast3.nova.ie/stream128.mp3',               country: 'IE' },
      { name: 'Nova 96.9 (Sydney AU)',              url: 'http://live-radio01.mediahubaustralia.com/NOVAW_MP3_128k/', country: 'AU' },
    ],
  },

  // ── Oldies & Classics ─────────────────────────────────────────────────────
  {
    id: 'oldies',
    label: 'Oldies',
    color: '#f6ad55',
    glow: '#fbd38d',
    stations: [
      // 181.FM
      { name: '181.FM – Classic Hits 181',          url: 'https://listen.181fm.com/181-greatoldies_128k.mp3',  country: 'US' },
      { name: '181.FM – Good Time Oldies',          url: 'https://listen.181fm.com/181-goodtime_128k.mp3',     country: 'US' },
      { name: '181.FM – Mellow Gold',               url: 'https://listen.181fm.com/181-mellow_128k.mp3',       country: 'US' },
      { name: '181.FM – Soul',                      url: 'https://listen.181fm.com/181-soul_128k.mp3',         country: 'US' },
      { name: '181.FM – Beatles',                   url: 'https://listen.181fm.com/181-beatles_128k.mp3',      country: 'US' },
      { name: '181.FM – Super 70s',                 url: 'https://listen.181fm.com/181-70s_128k.mp3',          country: 'US' },
      { name: '181.FM – Awesome 80s',               url: 'https://listen.181fm.com/181-awesome80s_128k.mp3',   country: 'US' },
      { name: '181.FM – Lite 80s',                  url: 'https://listen.181fm.com/181-lite80s_128k.mp3',      country: 'US' },
      { name: '181.FM – Lite 90s',                  url: 'https://listen.181fm.com/181-lite90s_128k.mp3',      country: 'US' },
      { name: '181.FM – Yacht Rock',                url: 'https://listen.181fm.com/181-yachtrock_128k.mp3',    country: 'US' },
      { name: 'Classic Vinyl HD (320k)',             url: 'https://icecast.walmradio.com:8443/classic',         country: 'US' },
      { name: 'WALM – Old Time Radio',              url: 'https://icecast.walmradio.com:8443/otr',             country: 'US' },
      // Canada
      { name: 'Oldies 96.7 (CJWV-FM)',             url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJWVFMAAC.aac', country: 'CA' },
      { name: 'Jack 102.1 Calgary (Classic Hits)',  url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJCYFMAAC.aac', country: 'CA' },
      { name: 'Jack 102.3 London (Adult Contemp)',  url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHSTFMAAC.aac', country: 'CA' },
      { name: 'Heart 80s (UK)',                     url: 'https://media-ice.musicradio.com/Heart80s.mp3',       country: 'UK' },
    ],
  },

  // ── Talk Radio ────────────────────────────────────────────────────────────
  {
    id: 'talk',
    label: 'Talk Radio',
    color: '#38b2ac',
    glow: '#81e6d9',
    stations: [
      // Canada — CBC (stable direct URLs)
      { name: 'CBC Radio One (Vancouver)',          url: 'https://cbcmp3.ic.llnwd.net/stream/cbcmp3_cbc_r1_van', country: 'CA' },
      { name: 'CBC Radio One (Toronto)',            url: 'https://cbcmp3.ic.llnwd.net/stream/cbcmp3_cbc_r1_tor', country: 'CA' },
      { name: 'CBC Radio One (Calgary)',            url: 'https://cbcmp3.ic.llnwd.net/stream/cbcmp3_cbc_r1_cal', country: 'CA' },
      { name: 'CBC Radio One (Montreal – Eng)',     url: 'https://cbcmp3.ic.llnwd.net/stream/cbcmp3_cbc_r1_mtl', country: 'CA' },
      { name: 'CBC Radio One (Winnipeg)',           url: 'https://cbcmp3.ic.llnwd.net/stream/cbcmp3_cbc_r1_wpg', country: 'CA' },
      // Canada — Rogers/Corus News/Talk via streamtheworld
      { name: 'CKNW 980 AM (Vancouver)',            url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CKNWAMAAC.aac', country: 'CA' },
      { name: 'Newstalk 1010 Toronto (CFRB)',       url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CFRBAMAAC.aac', country: 'CA' },
      { name: '640 Toronto (CFIQ)',                 url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CFIQAMAAC.aac', country: 'CA' },
      { name: '880 CHED Edmonton (News)',           url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHEDAMAAC.aac', country: 'CA' },
      { name: 'QR Calgary 770 AM (CHQR)',           url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CHQRAMAAC.aac', country: 'CA' },
      { name: '680 CJOB Winnipeg (News/Talk)',      url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CJOBAMAAC.aac', country: 'CA' },
      { name: '590 VOCM St. Johns NL',           url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/VOCMAMAAC.aac', country: 'CA' },
      // USA
      { name: 'NPR News',                          url: 'https://npr-ice.streamguys1.com/live.mp3',            country: 'US' },
      { name: 'WNYC 93.9 FM (New York)',           url: 'https://fm939.wnyc.org/wnycfm.aac',                  country: 'US' },
      { name: 'WTOP News Radio (Washington DC)',   url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/WTOPFMAAC.aac', country: 'US' },
      { name: 'KFI AM 640 (Los Angeles)',          url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/KFIAMAAC.aac', country: 'US' },
      // BBC
      { name: 'BBC World Service',                 url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service',  country: 'UK' },
      { name: 'BBC Radio 4',                       url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_fourfm',   country: 'UK' },
      { name: 'BBC Radio 5 Live',                  url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_five_live', country: 'UK' },
      { name: 'talkSPORT (UK)',                    url: 'https://stream-mz.planetradio.co.uk/talksport.mp3',   country: 'UK' },
      { name: 'LBC News (UK)',                     url: 'https://media-ice.musicradio.com/LBCNews.mp3',        country: 'UK' },
      // International
      { name: 'Deutsche Welle (English)',          url: 'https://dw.streamabc.net/dw-worldservice-mp3-128-1950491', country: 'DE' },
      { name: 'ABC News Radio (AU)',               url: 'http://live-radio01.mediahubaustralia.com/PBBW_MP3_128k/', country: 'AU' },
      { name: 'Radio New Zealand National',        url: 'https://radionz-ice.streamguys.com/national.mp3',    country: 'NZ' },
    ],
  },
];

export const LOCAL_GENRE = { id: 'local', label: 'Local', color: '#00d4aa', glow: '#00ffcc' };
