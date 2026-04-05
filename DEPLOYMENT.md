# Production Deployment Guide

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] TypeScript compilation successful (`pnpm type-check`)
- [ ] Security audit passed (`pnpm audit:security`)
- [ ] Bundle size optimized (`pnpm analyze:bundle`)

### Security
- [ ] No hardcoded secrets in code
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Database encryption enabled

### Performance
- [ ] Lighthouse scores acceptable (>75 for all metrics)
- [ ] Load tests completed
- [ ] Database queries optimized
- [ ] Cache strategy implemented
- [ ] CDN configured for static assets

### Monitoring & Logging
- [ ] Error tracking configured (e.g., Sentry)
- [ ] Application monitoring setup (e.g., Datadog)
- [ ] Log aggregation configured (e.g., ELK)
- [ ] Alerting rules created
- [ ] Dashboards setup

## Environment Setup

### Production Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.thegreatindianwedding.com
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
VITE_ENVIRONMENT=production
VITE_LOG_LEVEL=warn
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### Database Setup

```bash
# Supabase configuration
1. Enable Row Level Security (RLS)
2. Configure backup strategy
3. Enable monitoring
4. Setup replication (if required)
5. Configure database roles
```

## Build & Deployment

### Building for Production

```bash
# Build all applications
pnpm build

# Verify build size
pnpm analyze:bundle

# Run production build locally
pnpm preview

# Test production build
pnpm test
```

### Deployment Steps

#### Step 1: Prepare Release

```bash
# Create release branch
git checkout -b release/v1.0.0

# Update version numbers
pnpm version major/minor/patch

# Create changelog
git log --oneline <last-tag>..HEAD > CHANGELOG.md

# Commit version bump
git commit -am "Bump version to 1.0.0"
```

#### Step 2: CI/CD Pipeline

The GitHub Actions workflow will:
1. Run all tests
2. Run security audits
3. Build applications
4. Run Lighthouse audits
5. Deploy to staging
6. Run smoke tests

```yaml
# Verify workflow status
gh workflow view ci.yml --ref main
gh run list --workflow ci.yml --status completed
```

#### Step 3: Staging Deployment

```bash
# Deploy to staging environment
npm run deploy:staging

# Run smoke tests
npm run test:smoke

# Load testing
npm run test:load -- --env staging

# Monitor staging metrics
# Check Datadog/monitoring dashboard
```

#### Step 4: Production Deployment

```bash
# Deploy to production
npm run deploy:production

# Verify deployment
curl -I https://thegreatindianwedding.com/health

# Monitor metrics
# Watch error rate, response time, etc.
```

## Server Configuration

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/thegreatindianwedding.com

upstream rishta {
  server localhost:3001;
}

upstream shaadi {
  server localhost:3002;
}

upstream jannat {
  server localhost:3003;
}

server {
  listen 443 ssl http2;
  server_name thegreatindianwedding.com *.thegreatindianwedding.com;

  ssl_certificate /etc/letsencrypt/live/thegreatindianwedding.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/thegreatindianwedding.com/privkey.pem;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" always;

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss;
  gzip_min_length 1000;

  # Rate limiting
  limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

  location / {
    proxy_pass http://rishta;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /shaadi {
    proxy_pass http://shaadi;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /jannat {
    proxy_pass http://jannat;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api {
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://api;
    proxy_set_header Host $host;
  }
}

# HTTP to HTTPS redirect
server {
  listen 80;
  server_name thegreatindianwedding.com *.thegreatindianwedding.com;
  return 301 https://$server_name$request_uri;
}
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/apps/*/dist ./public
COPY --from=builder /app/packages/*/dist ./packages

ENV NODE_ENV=production

EXPOSE 3000
CMD ["pnpm", "start:production"]
```

## Post-Deployment

### Verification

```bash
# Health checks
curl https://api.thegreatindianwedding.com/health
curl https://rishta.thegreatindianwedding.com/health
curl https://shaadi.thegreatindianwedding.com/health
curl https://jannat.thegreatindianwedding.com/health

# Monitor errors
# Check Sentry dashboard
# Check application logs

# Performance monitoring
# Check Lighthouse CI results
# Monitor Datadog metrics
```

### Rollback Procedure

```bash
# If critical issues detected:

# 1. Revert to previous version
git revert <commit-hash>

# 2. Rebuild and redeploy
pnpm build
npm run deploy:production

# 3. Monitor metrics
# Watch error rates and user impact

# 4. Post-incident review
# Document what went wrong
# Create action items to prevent recurrence
```

## Monitoring & Maintenance

### Daily Checks

- [ ] Error rate < 0.1%
- [ ] Response times < 200ms (p95)
- [ ] Uptime > 99.9%
- [ ] Database query times < 100ms
- [ ] No critical security alerts

### Weekly Checks

- [ ] Review error logs
- [ ] Check dependency updates
- [ ] Review performance trends
- [ ] Validate backups

### Monthly Checks

- [ ] Security audit
- [ ] Performance analysis
- [ ] Capacity planning
- [ ] Cost review

## Disaster Recovery

### Backup Strategy

```bash
# Automated daily backups
# Database: Supabase automated backups
# Files: S3 versioning
# Code: Git remote repository

# Backup verification
# Monthly restore tests to ensure recovery works
```

### Recovery Procedures

```bash
# Database recovery
supabase db restore --backup-id=<backup-id>

# File recovery
aws s3 sync s3://backup-bucket/latest ./restored-files

# Code recovery
git checkout <backup-commit>
pnpm install
pnpm build
```

## Scaling Considerations

### Horizontal Scaling

```bash
# Load balancer configuration
# Multiple app instances behind load balancer
# Database read replicas for read-heavy workloads
# Cache layer (Redis) for session management
```

### Performance Optimization

```bash
# CDN for static assets
# Database indexing review
# Query optimization
# Cache strategy review
```

## Support & Documentation

- **Documentation**: https://docs.thegreatindianwedding.com
- **Status Page**: https://status.thegreatindianwedding.com
- **Support**: support@thegreatindianwedding.com
- **Security**: security@thegreatindianwedding.com

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-12-01 | Initial production release |

---

**Last Updated**: 2024-12-01
**Maintainer**: DevOps Team
