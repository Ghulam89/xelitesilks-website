import requestIp from 'request-ip';

export const getClientIP = (req) => {
  // Get client IP with better detection
  let clientIp = requestIp.getClientIp(req);
  
  // Function to check if IP is localhost
  const isLocalhost = (ip) => {
    return ip === '::1' || 
           ip === '127.0.0.1' || 
           ip === '::ffff:127.0.0.1' ||
           ip?.startsWith('127.') ||
           ip?.startsWith('::ffff:127.');
  };
  
  // Handle localhost cases first
  if (isLocalhost(clientIp)) {
    clientIp = '';
  } else if (!clientIp) {
    // Fallback IP detection if requestIp fails
    clientIp = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.headers['x-client-ip'] || 
               req.connection?.remoteAddress || 
               req.socket?.remoteAddress || 
               req.ip ;
    
    // Clean up the IP address (remove port if present)
    if (clientIp && clientIp.includes(':')) {
      clientIp = clientIp.split(':')[0];
    }
    
    // If still localhost, try to get real IP
    if (isLocalhost(clientIp)) {
      clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim();
    }
  }
  
  // Final check for localhost
  if (isLocalhost(clientIp)) {
    clientIp = '';
  }
  
  // Ensure we always return a non-empty string
  if (!clientIp || clientIp.trim() === '') {
    clientIp = '';
  }
  
  return clientIp;
}; 