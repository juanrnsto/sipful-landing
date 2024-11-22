javascript
const redirectConfig = {
  // Default redirect if no specific mapping is found
  default: 'https://haveasipful.com',
  
  // Individual business card mappings
  mappings: {
    'juan-card': 'https://haveasipful.com',
    'lenes-card': 'https://haveasipful.com',
    'general-brochure': 'https://haveasipful.com/products',
    'packaging': 'https://haveasipful.com/care'
  }
};

exports.handler = async function(event, context) {
  // Get query parameters
  const params = new URLSearchParams(event.queryStringParameters);
  const source = params.get('source');
  const timestamp = new Date().toISOString();
  
  // Get user agent and IP for analytics
  const userAgent = event.headers['user-agent'] || 'Unknown';
  const clientIP = event.headers['client-ip'] || 'Unknown';
  
  // Enhanced logging with card owner tracking
  console.log(JSON.stringify({
    timestamp,
    source,
    owner: source.includes('juan') ? 'Juan' : source.includes('lenes') ? 'Lenes' : 'Other',
    userAgent,
    clientIP,
    referrer: event.headers.referer || 'Direct'
  }));

  // Determine redirect URL
  const redirectUrl = source && redirectConfig.mappings[source] 
    ? redirectConfig.mappings[source] 
    : redirectConfig.default;

  return {
    statusCode: 302,
    headers: {
      'Location': redirectUrl,
      'Cache-Control': 'no-cache'
    }
  };
};