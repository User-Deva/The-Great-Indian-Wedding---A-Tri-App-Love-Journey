# Security Policy

## Overview

The Great Indian Wedding takes security seriously. This document outlines our security policies, vulnerability reporting procedures, and best practices.

## Vulnerability Reporting

If you discover a security vulnerability, please email security@thegreatindianwedding.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

**Please do not open public issues for security vulnerabilities.**

## Security Standards

### OWASP Top 10 Prevention

1. **Injection Prevention**
   - Use parameterized queries for all database operations
   - Input validation for all user inputs
   - Output encoding for all displayed data
   - Content Security Policy headers

2. **Broken Authentication**
   - Implement OAuth 2.0 via Supabase
   - Enforce strong password policies
   - Use JWT tokens for stateless auth
   - Secure session management
   - MFA support ready for implementation

3. **Sensitive Data Exposure**
   - HTTPS/TLS for all communications
   - Data encryption at rest (database)
   - No sensitive data in logs
   - PCI-DSS compliance for payment processing
   - GDPR compliance for user data

4. **XML External Entities (XXE)**
   - Disable XML entity processing
   - Use allowlists for XML processing
   - Validate and sanitize XML input

5. **Broken Access Control**
   - Role-based access control (RBAC) implemented
   - Implement principle of least privilege
   - Test access controls thoroughly
   - Log all access attempts

6. **Security Misconfiguration**
   - Minimize attack surface
   - Remove unused features
   - Security headers configured
   - Framework security features enabled

7. **Cross-Site Scripting (XSS)**
   - Input validation and sanitization
   - Output encoding using React
   - CSP headers
   - Avoid `dangerouslySetInnerHTML`
   - Use DOMPurify for user-generated content

8. **Insecure Deserialization**
   - Avoid serializing sensitive objects
   - Use JSON only when possible
   - Validate deserialized data
   - Use allowlists for classes to deserialize

9. **Using Components with Known Vulnerabilities**
   - Regular dependency updates
   - `npm audit` and `pnpm audit` regularly
   - Automated security scanning in CI/CD
   - Keep framework and libraries updated

10. **Insufficient Logging & Monitoring**
    - Comprehensive logging of security events
    - Log aggregation and monitoring
    - Alerts for suspicious activities
    - Regular log reviews

## Implementation Guidelines

### Authentication & Authorization

```typescript
// ✓ Good - Use Zustand store with auth guards
const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// ✓ Good - Check permissions before actions
if (canPerformAction(user.role, 'edit_budget')) {
  // Allow action
}
```

### Data Handling

```typescript
// ✓ Good - Sanitize user input
const sanitized = DOMPurify.sanitize(userInput);

// ✓ Good - Encode output
<div>{escapeHtml(userContent)}</div>

// ✗ Bad - Never do this
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### API Security

```typescript
// ✓ Good - Use environment variables for secrets
const API_KEY = process.env.VITE_API_KEY;

// ✓ Good - Validate requests
const validateRequest = (data) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  return schema.parse(data);
};

// ✗ Bad - Never commit secrets
const API_KEY = 'sk_live_abc123...';
```

### Error Handling

```typescript
// ✓ Good - Generic error messages to users
throw new Error('Failed to process request');

// ✓ Good - Log detailed errors internally
logger.error('Database connection failed', { code, sqlState });

// ✗ Bad - Expose sensitive information
throw new Error('Database: connection refused at 192.168.1.1:5432');
```

## Security Headers

The following security headers are configured:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Dependencies Security

### Regular Audits

```bash
# Check for vulnerable packages
pnpm audit

# Update dependencies safely
pnpm up --latest

# Automated checks in CI/CD
npm audit --production
```

### Known Vulnerabilities

Review: https://nvd.nist.gov/

## Data Privacy

### GDPR Compliance
- User consent for data collection
- Right to access personal data
- Right to deletion ("right to be forgotten")
- Data portability
- Privacy by design

### Data Retention
- User data retained only as long as necessary
- Automatic deletion after account closure
- Regular data purges

## Testing Security

### Security Testing

```bash
# Run security tests
pnpm test:security

# OWASP ZAP scanning
docker run -t owasp/zap2docker-stable zap-baseline.py -t http://localhost:3001

# Dependency check
pnpm run audit:security
```

## Deployment Security

### Pre-Deployment Checklist
- [ ] All security tests passing
- [ ] No hardcoded secrets
- [ ] Environment variables configured
- [ ] Security headers enabled
- [ ] HTTPS enforced
- [ ] Database encryption enabled
- [ ] Backup strategy in place
- [ ] Monitoring and alerting configured
- [ ] Incident response plan updated

### Production Environment
- Minimal dependencies deployed
- No debug mode enabled
- Rate limiting configured
- DDoS protection enabled
- WAF rules configured
- Regular security patches applied

## Incident Response

1. **Detection**: Monitor logs for suspicious activities
2. **Containment**: Isolate affected systems
3. **Investigation**: Determine scope and impact
4. **Eradication**: Remove attacker access
5. **Recovery**: Restore systems to normal state
6. **Lessons Learned**: Document and improve

## Security Updates

Subscribe to:
- GitHub security advisories
- npm security alerts
- Framework security mailing lists
- OWASP alerts

## Compliance

- **PCI-DSS**: For payment processing
- **GDPR**: For EU user data
- **CCPA**: For California resident data
- **SOC 2**: For data security and privacy

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [OWASP Secure Coding Practices](https://cheatsheetseries.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

## License

Copyright © 2024 The Great Indian Wedding. All rights reserved.
