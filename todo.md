- [/] Class diagram
- [/] Rough documentation
- [/] Test and create Logger
- [/] Test and create ConfigService
- [/] Test and create HttpClient
- [/] Test and create OutageService
- [/] Test and create SiteService
- [/] Test and create OutageReporter
- [/] Logging
- [/] Global Error handling
- [ ] Create index.ts
- [ ] Manually check

Extra

- [ ] Extend httpClient to retry on 500

Extra (If I had infinite time!)

- [ ] JOI validation of config at runtime, early catching of missing values
- [ ] Would have added status in response from httpClient so services could make clever error handling decisions (i.e. site not found)
- [ ] Create functional test using nock etc.
- [ ] Implement nodeCache (write httpCache abstraction)
- [ ] Configurable siteID and filter dateTime from CLI / config file
