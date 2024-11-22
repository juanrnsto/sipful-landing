// Configuration object that defines where each QR code should redirect to
const redirectConfig = {
  // This is the default URL if no source parameter is provided or if the source doesn't match any mapping
  default: 'https://haveasipful.com',
  
  // Each key-value pair defines a different QR code redirect
  mappings: {
    // When scanned, Juan's business card QR code (haveasipful.com/qr?source=juan-card) 
    // will redirect to the main website
    'juan-card': 'https://haveasipful.com',

    // When scanned, Lenes's business card QR code (haveasipful.com/qr?source=lenes-card) 
    // will redirect to the main website
    'lenes-card': 'https://haveasipful.com',

    // Additional redirects can be added here for other marketing materials
    'general-brochure': 'https://haveasipful.com/products',
    'packaging': 'https://haveasipful.com/care'
  }
};

// This is the main function that Netlify will run when someone scans a QR code
exports.handler = async function(event, context) {
  // Get the query parameters from the URL
  const params = new URLSearchParams(event.queryStringParameters);
  // Get the 'source' parameter (juan-card, lenes-card, etc.)
  const source = params.get('source');
  // Get the current time for logging
  const timestamp = new Date().toISOString();
  
  // Get information about the device that scanned the QR code
  const userAgent = event.headers['user-agent'] || 'Unknown';
  const clientIP = event.headers['client-ip'] || 'Unknown';
  
  // Log the scan event with detailed information
  console.log(JSON.stringify({
    timestamp,
    source,
    // Determine if it was Juan's or Lenes's card that was scanned
    owner: source.includes('juan') ? 'Juan' : source.includes('lenes') ? 'Lenes' : 'Other',
    userAgent,
    clientIP,
    referrer: event.headers.referer || 'Direct'
  }));

  // Determine which URL to redirect to
  // If the source exists in our mappings, use that URL; otherwise use the default
  const redirectUrl = source && redirectConfig.mappings[source] 
    ? redirectConfig.mappings[source] 
    : redirectConfig.default;

  // Return a redirect response
  return {
    // 302 is the status code for temporary redirect
    statusCode: 302,
    headers: {
      // Tell the browser where to redirect to
      'Location': redirectUrl,
      // Prevent caching so we can change the redirect destination later
      'Cache-Control': 'no-cache'
    }
  };
};